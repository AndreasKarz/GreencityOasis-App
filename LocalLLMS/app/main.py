"""
Creative Studio — Offline Bild- & Musikgenerierung (Intel CPU / OpenVINO)

Endpoints:
  - POST /sdapi/v1/txt2img  — Bild generieren (AUTOMATIC1111-kompatibel für Open WebUI)
  - GET  /sdapi/v1/sd-models — Verfügbare Modelle
  - GET  /sdapi/v1/options    — Aktuelle Einstellungen
  - POST /api/music/generate  — Musik generieren
  - GET  /                    — Web-UI
  - GET  /health              — Health-Check
"""

import base64
import io
import logging
import os
import time
from pathlib import Path
from typing import Optional

import numpy as np
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, StreamingResponse
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Konfiguration
# ---------------------------------------------------------------------------
SD_MODEL_PATH: str = os.environ.get("SD_MODEL_PATH", "/models/stable-diffusion")
MUSICGEN_MODEL_PATH: str = os.environ.get("MUSICGEN_MODEL_PATH", "/models/musicgen")
HOST: str = os.environ.get("HOST", "0.0.0.0")
PORT: int = int(os.environ.get("PORT", "7860"))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("creative-studio")

app = FastAPI(
    title="Creative Studio",
    description="Offline Bild- & Musikgenerierung mit OpenVINO (Intel CPU)",
)

# ---------------------------------------------------------------------------
# Lazy Model Loading — Modelle werden erst beim ersten Request geladen
# ---------------------------------------------------------------------------
_sd_pipeline = None
_musicgen_model = None
_musicgen_processor = None


def _check_model_exists(model_path: str, marker_file: str) -> bool:
    """Prüft ob ein Modell im angegebenen Pfad existiert."""
    return Path(model_path).exists() and any(Path(model_path).iterdir())


def get_sd_pipeline():
    """Lädt die Stable Diffusion Pipeline (OpenVINO-optimiert für Intel CPU)."""
    global _sd_pipeline
    if _sd_pipeline is not None:
        return _sd_pipeline

    if not _check_model_exists(SD_MODEL_PATH, "model_index.json"):
        raise HTTPException(
            status_code=503,
            detail=(
                f"Stable Diffusion Modell nicht gefunden in {SD_MODEL_PATH}. "
                "Bitte zuerst das Setup-Script ausführen."
            ),
        )

    from optimum.intel import OVStableDiffusionPipeline

    logger.info("Lade Stable Diffusion Pipeline (OpenVINO)...")
    start_time = time.time()
    _sd_pipeline = OVStableDiffusionPipeline.from_pretrained(SD_MODEL_PATH)
    elapsed = time.time() - start_time
    logger.info("Stable Diffusion geladen in %.1f Sekunden.", elapsed)
    return _sd_pipeline


def get_musicgen():
    """Lädt MusicGen Modell und Processor."""
    global _musicgen_model, _musicgen_processor
    if _musicgen_model is not None:
        return _musicgen_model, _musicgen_processor

    if not _check_model_exists(MUSICGEN_MODEL_PATH, "config.json"):
        raise HTTPException(
            status_code=503,
            detail=(
                f"MusicGen Modell nicht gefunden in {MUSICGEN_MODEL_PATH}. "
                "Bitte zuerst das Setup-Script ausführen."
            ),
        )

    from transformers import AutoProcessor, MusicgenForConditionalGeneration

    logger.info("Lade MusicGen Modell...")
    start_time = time.time()
    _musicgen_processor = AutoProcessor.from_pretrained(MUSICGEN_MODEL_PATH)
    _musicgen_model = MusicgenForConditionalGeneration.from_pretrained(
        MUSICGEN_MODEL_PATH
    )
    _musicgen_model.eval()
    elapsed = time.time() - start_time
    logger.info("MusicGen geladen in %.1f Sekunden.", elapsed)
    return _musicgen_model, _musicgen_processor


# ---------------------------------------------------------------------------
# AUTOMATIC1111-kompatible API (für Open WebUI Integration)
# ---------------------------------------------------------------------------
class Txt2ImgRequest(BaseModel):
    prompt: str
    negative_prompt: str = ""
    steps: int = 20
    width: int = 512
    height: int = 512
    cfg_scale: float = 7.0
    seed: int = -1
    batch_size: int = 1


class Txt2ImgResponse(BaseModel):
    images: list[str]
    parameters: dict = {}
    info: str = ""


@app.post("/sdapi/v1/txt2img", response_model=Txt2ImgResponse)
async def txt2img(request: Txt2ImgRequest):
    """Generiert ein Bild aus einem Text-Prompt (AUTOMATIC1111-kompatibel)."""
    pipeline = get_sd_pipeline()

    seed: int = request.seed
    if seed < 0:
        seed = int(time.time()) % (2**32)

    np.random.seed(seed)
    logger.info(
        "Generiere Bild: prompt='%s', steps=%d, size=%dx%d, seed=%d",
        request.prompt[:80],
        request.steps,
        request.width,
        request.height,
        seed,
    )

    start_time = time.time()
    result = pipeline(
        prompt=request.prompt,
        negative_prompt=request.negative_prompt,
        num_inference_steps=request.steps,
        width=request.width,
        height=request.height,
        guidance_scale=request.cfg_scale,
    )
    elapsed = time.time() - start_time
    logger.info("Bild generiert in %.1f Sekunden.", elapsed)

    images_base64: list[str] = []
    for image in result.images:
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")
        images_base64.append(encoded)

    return Txt2ImgResponse(
        images=images_base64,
        parameters={"seed": seed, "steps": request.steps},
        info=f"Seed: {seed}, Time: {elapsed:.1f}s",
    )


@app.get("/sdapi/v1/sd-models")
async def sd_models():
    """Listet verfügbare Stable Diffusion Modelle."""
    return [
        {
            "title": "stable-diffusion-v1-5 (OpenVINO)",
            "model_name": "stable-diffusion-v1-5",
            "filename": SD_MODEL_PATH,
        }
    ]


@app.get("/sdapi/v1/options")
async def sd_options():
    """Gibt aktuelle SD-Optionen zurück."""
    return {"sd_model_checkpoint": "stable-diffusion-v1-5"}


# ---------------------------------------------------------------------------
# Musik-Generierung API
# ---------------------------------------------------------------------------
class MusicRequest(BaseModel):
    prompt: str
    duration: int = 10  # Sekunden


@app.post("/api/music/generate")
async def generate_music(request: MusicRequest):
    """Generiert Musik aus einem Text-Prompt."""
    import soundfile as sf
    import torch

    model, processor = get_musicgen()

    logger.info(
        "Generiere Musik: prompt='%s', duration=%ds",
        request.prompt[:80],
        request.duration,
    )

    inputs = processor(text=[request.prompt], padding=True, return_tensors="pt")

    # MusicGen generiert bei ~50 Tokens pro Sekunde Audio
    max_new_tokens: int = int(request.duration * 50)

    start_time = time.time()
    with torch.no_grad():
        audio_values = model.generate(**inputs, max_new_tokens=max_new_tokens)
    elapsed = time.time() - start_time
    logger.info("Musik generiert in %.1f Sekunden.", elapsed)

    audio_data = audio_values[0, 0].cpu().numpy()
    sample_rate: int = model.config.audio_encoder.sampling_rate

    buffer = io.BytesIO()
    sf.write(buffer, audio_data, sample_rate, format="WAV")
    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="audio/wav",
        headers={
            "Content-Disposition": f'attachment; filename="music_{int(time.time())}.wav"'
        },
    )


# ---------------------------------------------------------------------------
# Web-UI
# ---------------------------------------------------------------------------
@app.get("/", response_class=HTMLResponse)
async def root():
    """Zeigt die Creative Studio Web-UI."""
    template_path = Path(__file__).parent / "templates" / "index.html"
    if not template_path.exists():
        return HTMLResponse("<h1>Creative Studio</h1><p>Template nicht gefunden.</p>")
    content: str = template_path.read_text(encoding="utf-8")
    return HTMLResponse(content)


# ---------------------------------------------------------------------------
# Health-Check
# ---------------------------------------------------------------------------
@app.get("/health")
async def health():
    """Health-Check Endpoint."""
    sd_ready: bool = _sd_pipeline is not None or _check_model_exists(
        SD_MODEL_PATH, "model_index.json"
    )
    music_ready: bool = _musicgen_model is not None or _check_model_exists(
        MUSICGEN_MODEL_PATH, "config.json"
    )
    return {
        "status": "ok",
        "sd_model_available": sd_ready,
        "musicgen_model_available": music_ready,
    }


# ---------------------------------------------------------------------------
# Startup
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    logger.info("Creative Studio startet auf %s:%d", HOST, PORT)
    uvicorn.run(app, host=HOST, port=PORT)
