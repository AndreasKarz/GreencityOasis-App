# ============================================================
# Export-Script — Container & Modelle für Offline-Transport
# ============================================================
# Exportiert alle Docker-Images und Volumes in eine Datei,
# die via USB-Stick / externe Festplatte transportiert werden kann.
#
# Verwendung:  .\scripts\export.ps1
# Import:      .\scripts\import.ps1
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$exportDir = "export"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Offline LLM Stack — Export" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Export-Verzeichnis erstellen
if (-not (Test-Path $exportDir)) {
    New-Item -ItemType Directory -Path $exportDir -Force | Out-Null
}

# -----------------------------------------------------------
# 1. Docker-Images exportieren
# -----------------------------------------------------------
Write-Host "[1/2] Exportiere Docker-Images..." -ForegroundColor Yellow

$images = @(
    "ollama/ollama:latest",
    "ghcr.io/open-webui/open-webui:main",
    "neo4j:community",
    "searxng/searxng:latest"
)

# Custom Image Names ermitteln (von docker compose build)
$composeName = (Get-Item .).Name.ToLower() -replace '[^a-z0-9]', ''
$images += "${composeName}-creative-studio:latest"
$images += "${composeName}-llama-embed:latest"

Write-Host "  Exportiere $($images.Count) Images:"
foreach ($img in $images) {
    Write-Host "    - $img" -ForegroundColor Gray
}
Write-Host "  Speichere in: $exportDir/docker-images.tar"
Write-Host "  Dies kann einige Minuten dauern..."

docker save $images -o "$exportDir/docker-images.tar"
Write-Host "  OK" -ForegroundColor Green

# -----------------------------------------------------------
# 2. Hinweis zu Modelldaten
# -----------------------------------------------------------
Write-Host ""
Write-Host "[2/2] Modelldaten..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  Die Modelldaten befinden sich im Ordner 'data/'." -ForegroundColor White
Write-Host "  Kopiere den gesamten 'data/' Ordner auf deinen Transport-Datentraeger." -ForegroundColor White
Write-Host ""
Write-Host "  Geschaetzte Groessen:" -ForegroundColor Gray
Write-Host "    data/ollama/           ~33 GB (Text-Modelle)" -ForegroundColor Gray
Write-Host "    data/models/           ~4 GB  (Bild + Musik)" -ForegroundColor Gray
Write-Host "    export/docker-images.tar  ~5 GB  (Container-Images)" -ForegroundColor Gray
Write-Host ""

# Grösse anzeigen
$tarSize = (Get-Item "$exportDir/docker-images.tar").Length / 1GB
Write-Host "  docker-images.tar: $([math]::Round($tarSize, 2)) GB" -ForegroundColor Cyan

$dataSize = (Get-ChildItem -Path "data" -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1GB
Write-Host "  data/ Ordner:      $([math]::Round($dataSize, 2)) GB" -ForegroundColor Cyan

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Export abgeschlossen!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Transportiere folgende Ordner/Dateien:" -ForegroundColor White
Write-Host "    1. Gesamtes LocalLLMS/ Repo (via GitHub)" -ForegroundColor White
Write-Host "    2. export/docker-images.tar (via USB)" -ForegroundColor White
Write-Host "    3. data/ Ordner (via USB)" -ForegroundColor White
Write-Host ""
