# ============================================================
# Creative Studio — Bild- & Musikgenerierung auf Intel CPU
# Nutzt OpenVINO für optimierte Inferenz auf Intel-Prozessoren
# ============================================================

FROM python:3.11-slim AS base

# System-Abhängigkeiten
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsndfile1 \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Python-Abhängigkeiten
COPY app/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

# Applikation kopieren
COPY app/ /app/
WORKDIR /app

# Modell-Verzeichnisse (werden als Volume gemountet)
RUN mkdir -p /models/stable-diffusion /models/musicgen

# Port
EXPOSE 7860

# Health-Check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:7860/health')" || exit 1

# Start
CMD ["python", "main.py"]
