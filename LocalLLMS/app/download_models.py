"""
Download-Script für alle Modelle (Creative Studio).
Wird im Creative Studio Container ausgeführt.

Verwendung:
  docker exec creative-studio python /app/download_models.py
"""

import logging
import os
import sys
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("model-download")


def download_stable_diffusion(output_path: str) -> None:
    """Lädt Stable Diffusion v1.5 herunter und konvertiert zu OpenVINO-Format."""
    from optimum.intel import OVStableDiffusionPipeline

    logger.info("Lade Stable Diffusion v1.5 und konvertiere zu OpenVINO...")
    logger.info("Dies kann 10-20 Minuten dauern (einmalig).")

    pipeline = OVStableDiffusionPipeline.from_pretrained(
        "stable-diffusion-v1-5/stable-diffusion-v1-5",
        export=True,
    )
    pipeline.save_pretrained(output_path)
    logger.info("Stable Diffusion gespeichert in: %s", output_path)


def download_musicgen(output_path: str) -> None:
    """Lädt MusicGen Small Modell herunter."""
    from transformers import AutoProcessor, MusicgenForConditionalGeneration

    logger.info("Lade MusicGen Small Modell...")

    processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
    model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

    processor.save_pretrained(output_path)
    model.save_pretrained(output_path)
    logger.info("MusicGen gespeichert in: %s", output_path)


def main() -> None:
    sd_model_path: str = os.environ.get("SD_MODEL_PATH", "/models/stable-diffusion")
    musicgen_model_path: str = os.environ.get("MUSICGEN_MODEL_PATH", "/models/musicgen")

    # Stable Diffusion
    sd_target = Path(sd_model_path)
    if sd_target.exists() and any(sd_target.iterdir()):
        logger.info("Stable Diffusion Modell existiert bereits in: %s", sd_model_path)
    else:
        sd_target.mkdir(parents=True, exist_ok=True)
        download_stable_diffusion(sd_model_path)

    # MusicGen
    musicgen_target = Path(musicgen_model_path)
    if musicgen_target.exists() and any(musicgen_target.iterdir()):
        logger.info("MusicGen Modell existiert bereits in: %s", musicgen_model_path)
    else:
        musicgen_target.mkdir(parents=True, exist_ok=True)
        download_musicgen(musicgen_model_path)

    logger.info("Alle Modelle bereit.")


if __name__ == "__main__":
    main()
