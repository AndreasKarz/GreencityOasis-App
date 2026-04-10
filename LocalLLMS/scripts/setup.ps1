# ============================================================
# Setup-Script — Offline LLM Stack (Windows PowerShell)
# ============================================================
# Dieses Script:
#   1. Erstellt die Verzeichnisstruktur
#   2. Baut und startet die Docker-Container
#   3. Lädt alle Modelle herunter (Text, Bild, Musik)
#
# Voraussetzung: Docker Desktop muss laufen
# Ausführung:    .\scripts\setup.ps1
# ============================================================

param(
    [switch]$SkipTextModels,
    [switch]$SkipImageModel,
    [switch]$SkipMusicModel
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Offline LLM Stack — Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# -----------------------------------------------------------
# 1. Verzeichnisse erstellen
# -----------------------------------------------------------
Write-Host "[1/5] Erstelle Verzeichnisse..." -ForegroundColor Yellow

$directories = @(
    "data/ollama",
    "data/open-webui",
    "data/models/stable-diffusion",
    "data/models/musicgen",
    "data/neo4j/data",
    "data/neo4j/logs",
    "data/neo4j/plugins"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  Erstellt: $dir"
    }
}
Write-Host "  OK" -ForegroundColor Green

# -----------------------------------------------------------
# 2. Docker-Images bauen (inkl. Embedding-Modell im llama-embed Image)
# -----------------------------------------------------------
Write-Host ""
Write-Host "[2/5] Baue Docker-Images (GGUF wird ins Image integriert)..." -ForegroundColor Yellow

docker compose build
if ($LASTEXITCODE -ne 0) {
    Write-Host "FEHLER: Docker Build fehlgeschlagen!" -ForegroundColor Red
    exit 1
}
Write-Host "  OK" -ForegroundColor Green

# -----------------------------------------------------------
# 3. Container starten
# -----------------------------------------------------------
Write-Host ""
Write-Host "[3/5] Starte Container..." -ForegroundColor Yellow

docker compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "FEHLER: Docker Compose fehlgeschlagen!" -ForegroundColor Red
    exit 1
}

# Warten bis Ollama bereit ist
Write-Host "  Warte auf Ollama..."
$maxRetries = 30
$retryCount = 0
do {
    Start-Sleep -Seconds 2
    $retryCount++
    try {
        $null = docker exec ollama ollama list 2>$null
        $ollamaReady = $true
    } catch {
        $ollamaReady = $false
    }
} while (-not $ollamaReady -and $retryCount -lt $maxRetries)

if (-not $ollamaReady) {
    Write-Host "WARNUNG: Ollama nicht bereit nach ${maxRetries} Versuchen" -ForegroundColor Yellow
}
Write-Host "  OK" -ForegroundColor Green

# -----------------------------------------------------------
# 4. Text-Modelle herunterladen (Ollama)
# -----------------------------------------------------------
if (-not $SkipTextModels) {
    Write-Host ""
    Write-Host "[4/5] Lade Text-Modelle herunter (kann 30-60 Min dauern)..." -ForegroundColor Yellow

    $textModels = @(
        @{ Name = "qwen2.5:14b";          Desc = "Qwen 2.5 14B — Haupt-Allrounder (Alibaba)" },
        @{ Name = "deepseek-r1:14b";      Desc = "DeepSeek R1 14B — Reasoning (DeepSeek)" },
        @{ Name = "qwen2.5-coder:7b";     Desc = "Qwen 2.5 Coder 7B — Code (Alibaba)" },
        @{ Name = "llama3.1:8b";          Desc = "Llama 3.1 8B — Allrounder (Meta)" }
    )

    foreach ($model in $textModels) {
        Write-Host ""
        Write-Host "  Lade: $($model.Desc)" -ForegroundColor Cyan
        docker exec ollama ollama pull $model.Name
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  WARNUNG: $($model.Name) konnte nicht geladen werden" -ForegroundColor Yellow
        } else {
            Write-Host "  OK: $($model.Name)" -ForegroundColor Green
        }
    }
} else {
    Write-Host ""
    Write-Host "[4/5] Text-Modelle übersprungen (--SkipTextModels)" -ForegroundColor Gray
}

# -----------------------------------------------------------
# 5. Bild- & Musik-Modelle herunterladen
# -----------------------------------------------------------
if (-not $SkipImageModel -or -not $SkipMusicModel) {
    Write-Host ""
    Write-Host "[5/5] Lade Creative-Modelle herunter (kann 10-20 Min dauern)..." -ForegroundColor Yellow

    docker exec creative-studio python /app/download_models.py
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  WARNUNG: Creative-Modelle konnten nicht vollständig geladen werden" -ForegroundColor Yellow
    } else {
        Write-Host "  OK" -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "[5/5] Creative-Modelle übersprungen" -ForegroundColor Gray
}

# -----------------------------------------------------------
# Zusammenfassung
# -----------------------------------------------------------
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Setup abgeschlossen!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Open WebUI (Chat + RAG):     http://localhost:3000" -ForegroundColor White
Write-Host "  Creative Studio (Bild/Musik): http://localhost:7860" -ForegroundColor White
Write-Host "  Neo4j Browser:                http://localhost:7475" -ForegroundColor White
Write-Host "  Neo4j Bolt:                   bolt://localhost:7688" -ForegroundColor White
Write-Host "  Ollama API:                   http://localhost:11434" -ForegroundColor White
Write-Host ""
Write-Host "  Stoppen:  docker compose down" -ForegroundColor Gray
Write-Host "  Starten:  docker compose up -d" -ForegroundColor Gray
Write-Host ""
