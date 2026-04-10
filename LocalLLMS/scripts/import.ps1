# ============================================================
# Import-Script — Container & Modelle aus Export laden
# ============================================================
# Lädt exportierte Docker-Images und startet den Stack.
#
# Voraussetzung:
#   - Docker Desktop läuft
#   - export/docker-images.tar vorhanden
#   - data/ Ordner vorhanden (von USB kopiert)
#
# Verwendung:  .\scripts\import.ps1
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Offline LLM Stack — Import" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# -----------------------------------------------------------
# 1. Prüfungen
# -----------------------------------------------------------
Write-Host "[1/3] Pruefe Voraussetzungen..." -ForegroundColor Yellow

if (-not (Test-Path "export/docker-images.tar")) {
    Write-Host "  FEHLER: export/docker-images.tar nicht gefunden!" -ForegroundColor Red
    Write-Host "  Bitte kopiere die Datei vom USB-Stick hierhin." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "data/ollama")) {
    Write-Host "  FEHLER: data/ Ordner nicht gefunden!" -ForegroundColor Red
    Write-Host "  Bitte kopiere den data/ Ordner vom USB-Stick hierhin." -ForegroundColor Red
    exit 1
}

Write-Host "  OK" -ForegroundColor Green

# -----------------------------------------------------------
# 2. Docker-Images laden
# -----------------------------------------------------------
Write-Host ""
Write-Host "[2/3] Lade Docker-Images (kann einige Minuten dauern)..." -ForegroundColor Yellow

docker load -i "export/docker-images.tar"
if ($LASTEXITCODE -ne 0) {
    Write-Host "  FEHLER: Image-Import fehlgeschlagen!" -ForegroundColor Red
    exit 1
}
Write-Host "  OK" -ForegroundColor Green

# -----------------------------------------------------------
# 3. Stack starten
# -----------------------------------------------------------
Write-Host ""
Write-Host "[3/3] Starte Container..." -ForegroundColor Yellow

docker compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "  FEHLER: Docker Compose fehlgeschlagen!" -ForegroundColor Red
    exit 1
}
Write-Host "  OK" -ForegroundColor Green

# -----------------------------------------------------------
# Zusammenfassung
# -----------------------------------------------------------
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Import abgeschlossen — Stack laeuft!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Open WebUI (Chat + RAG):     http://localhost:3000" -ForegroundColor White
Write-Host "  Creative Studio (Bild/Musik): http://localhost:7860" -ForegroundColor White
Write-Host ""
