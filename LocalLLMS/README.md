# Offline LLM Stack

Vollständig offline-fähiger KI-Stack mit Text-Chat, RAG, GraphRAG, Bildgenerierung und Musikgenerierung.
Optimiert für **Intel CPU** (kein NVIDIA GPU nötig), nutzt **OpenVINO** für maximale Performance.

## Was ist enthalten?

| Service | Funktion | Port | Technologie |
|---------|----------|------|-------------|
| **Open WebUI** | Chat, RAG (Dokument-Upload), Modellwechsel | `3000` | Open WebUI |
| **Ollama** | Text-LLM Runtime | `11434` | Ollama |
| **Creative Studio** | Bildgenerierung, Musikgenerierung | `7860` | OpenVINO + FastAPI |
| **Neo4j** | Graph-Datenbank für GraphRAG | `7475` (HTTP) / `7688` (Bolt) | Neo4j Community |
| **SearXNG** | Web Search für Chat (Google, DuckDuckGo, etc.) | `8888` | SearXNG |

### Text-Modelle (via Ollama)
- **Qwen2.5:14b** — Haupt-Allrounder (Alibaba, China)
- **DeepSeek-R1:14b** — Komplexes Reasoning (DeepSeek, China)
- **Qwen2.5-Coder:7b** — Code-Generierung (Alibaba, China)
- **Llama3.1:8b** — Allrounder (Meta)
- **Nomic-Embed-Text** — RAG Embeddings

### Bild-Generierung
- **Stable Diffusion v1.5** via OpenVINO (Intel-optimiert, ~60-120s pro Bild)

### Musik-Generierung
- **MusicGen Small** (Meta, ~2-5 Min pro 10s Audio)

---

## Voraussetzungen

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installiert und gestartet
- **64 GB RAM** empfohlen (mind. 32 GB)
- **~50 GB freier Speicherplatz** (SSD empfohlen)
- Internet-Zugang für den erstmaligen Download

> **Batch-Size:** Ollama ist mit `OLLAMA_NUM_BATCH=2048` konfiguriert, damit Embedding-Modelle
> auch bei grösseren Inputs (>512 Tokens) keine Fehler werfen.

---

## Erstmaliges Setup (zu Hause mit Internet)

```powershell
cd LocalLLMS
.\scripts\setup.ps1
```

Das Script:
1. Erstellt die Verzeichnisstruktur
2. Baut die Docker-Images
3. Startet alle Services
4. Lädt alle Modelle herunter (~33 GB Text + ~4 GB Creative)

> **Dauer:** 30-90 Minuten je nach Internetgeschwindigkeit.

---

## Transport ins Geschäft

### Option A: Nur Code via GitHub, Modelle via USB

1. **Zu Hause** — Code pushen:
   ```powershell
   git add -A
   git commit -m "Offline LLM Stack"
   git push
   ```

2. **Zu Hause** — Export für USB:
   ```powershell
   .\scripts\export.ps1
   ```
   Kopiere auf USB-Stick:
   - `export/docker-images.tar` (~5 GB)
   - `data/` Ordner (~37 GB)

3. **Im Geschäft** — Repo klonen & Import:
   ```powershell
   git clone <dein-repo-url>
   cd LocalLLMS
   # USB-Daten hierhin kopieren:
   #   export/docker-images.tar
   #   data/ Ordner
   .\scripts\import.ps1
   ```

### Option B: Alles via USB

Kopiere den gesamten `LocalLLMS/` Ordner inkl. `data/` und `export/` auf einen USB-Stick.
Im Geschäft: `.\scripts\import.ps1`

---

## Tägliche Nutzung

### Starten
```powershell
cd LocalLLMS
docker compose up -d
```

### Öffnen
- **Chat & RAG:** [http://localhost:3000](http://localhost:3000)
- **Bild & Musik:** [http://localhost:7860](http://localhost:7860)
- **SearXNG (optional):** [http://localhost:8888](http://localhost:8888)

### Stoppen
```powershell
docker compose down
```

---

## Neo4j & GraphRAG

Neo4j läuft auf **Nicht-Standard-Ports** (damit es nicht mit einer bestehenden Instanz kollidiert):

| Dienst | URL |
|--------|-----|
| Neo4j Browser | [http://localhost:7475](http://localhost:7475) |
| Neo4j Bolt | `bolt://localhost:7688` |

**Zugangsdaten:** `graphmaster` / `Kn0wl3dg3Graph!2024` (konfigurierbar in `.env`)

### MCP Neo4j GraphRAG

Um `mcp-neo4j-graphrag` ([guerinjeanmarc/mcp-neo4j-graphrag](https://github.com/guerinjeanmarc/mcp-neo4j-graphrag)) zu verwenden:

```json
{
  "mcpServers": {
    "neo4j-graphrag": {
      "command": "npx",
      "args": ["-y", "mcp-neo4j-graphrag"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7688",
        "NEO4J_USERNAME": "graphmaster",
        "NEO4J_PASSWORD": "Kn0wl3dg3Graph!2024",
        "OLLAMA_BASE_URL": "http://localhost:11434",
        "LLM_MODEL": "qwen2.5:14b",
        "EMBEDDING_MODEL": "nomic-embed-text"
      }
    }
  }
}
```

---

## Web Search (SearXNG)

SearXNG ist als selbst-gehostete Meta-Suchmaschine integriert und ermöglicht **Web Search direkt im Chat**.
Open WebUI nutzt SearXNG intern — du brauchst das SearXNG-UI nicht separat zu öffnen.

### Verwendung im Chat
1. Öffne [http://localhost:3000](http://localhost:3000)
2. Aktiviere die Web-Suche über das **🌐 Globus-Icon** im Chat-Eingabefeld
3. Stelle deine Frage — Open WebUI sucht automatisch im Web und nutzt die Ergebnisse als Kontext

### Konfigurierte Suchmaschinen
- Google, DuckDuckGo, Bing, Wikipedia

### Hinweis
- Web Search benötigt **Internet-Zugang** (funktioniert nur wenn Google etc. erreichbar sind)
- Im Offline-Modus einfach das Globus-Icon deaktiviert lassen — der Chat funktioniert normal weiter
- SearXNG-Konfiguration unter `config/searxng/settings.yml`

---

## RAG (Retrieval Augmented Generation)

1. Öffne [http://localhost:3000](http://localhost:3000)
2. Erstelle ein Konto (rein lokal, kein Internet)
3. Klicke auf **Workspace** → **Documents**
4. Lade PDFs, Word-Dateien oder Textdateien hoch
5. Im Chat: Referenziere Dokumente mit `#dateiname` in deiner Frage

Open WebUI nutzt `nomic-embed-text` für die Vektorsuche und zeigt Quellen an.

---

## Modell wechseln

Im Open WebUI Chat oben links das aktive Modell auswählen:
- **qwen2.5:14b** — Für allgemeine Fragen, Zusammenfassungen, Deutsch
- **deepseek-r1:14b** — Für Logik, Mathe, komplexe Analyse
- **qwen2.5-coder:7b** — Für Code schreiben/erklären
- **llama3.1:8b** — Für englische Texte

---

## Creative Studio

Erreichbar unter [http://localhost:7860](http://localhost:7860):

### Bildgenerierung
- Prompt eingeben (Englisch funktioniert am besten)
- Qualität über Steps regeln (20 = Standard, 30 = besser, 10 = schneller)
- Auflösung: 512×512 empfohlen (höher = langsamer)
- **Erwartete Dauer:** 60-120 Sekunden pro Bild

### Musikgenerierung
- Stil beschreiben (z.B. "calm piano jazz with soft drums")
- Dauer 3-30 Sekunden wählbar
- **Erwartete Dauer:** 2-5 Minuten für 10 Sekunden

> Open WebUI kann auch Bilder generieren: Im Chat die Bildgenerierung aktivieren
> (Settings → Images → Enable Image Generation).

---

## Hinweise

### Performance-Tipps
- **Weniger Steps** (10-15) für schnellere Bildgenerierung bei akzeptabler Qualität
- **Nur ein Modell gleichzeitig** aktiv halten spart RAM
- **SSD ist entscheidend** — die Modelle laden deutlich schneller von SSD

### Speicherbedarf
| Komponente | Disk | RAM (aktiv) |
|------------|------|-------------|
| Text-Modelle (alle) | ~33 GB | ~12 GB (je 1 aktiv) |
| Stable Diffusion | ~3 GB | ~4 GB |
| MusicGen | ~1 GB | ~3 GB |
| Neo4j | ~0.5 GB | ~1.5 GB |
| SearXNG | ~0.1 GB | ~0.2 GB |
| Docker Images | ~12 GB | ~2 GB |
| **Gesamt** | **~51 GB** | **~23 GB (Peak)** |

---

## Verzeichnisstruktur

```
LocalLLMS/
├── .env                    # Port-Konfiguration + Neo4j Credentials
├── .gitignore              # Ignoriert data/ und export/
├── docker-compose.yml      # Multi-Service Orchestrierung
├── Dockerfile              # Creative Studio Image
├── Dockerfile.embed        # Embedding-Server Image (GGUF integriert)
├── ANALYSE.md              # Detaillierte Modell-Analyse
├── README.md               # Diese Datei
├── app/
│   ├── main.py             # FastAPI Server (Bild + Musik)
│   ├── download_models.py  # Modell-Download Script
│   ├── requirements.txt    # Python Dependencies
│   └── templates/
│       └── index.html      # Creative Studio Web-UI
├── config/
│   └── searxng/
│       └── settings.yml    # SearXNG Suchmaschinen-Konfiguration
├── scripts/
│   ├── setup.ps1           # Erstmaliges Setup
│   ├── export.ps1          # Export für Transport
│   └── import.ps1          # Import am Zielrechner
└── data/                   # (gitignored) Modelldaten
    ├── ollama/             # Ollama-Modelle
    ├── open-webui/         # Open WebUI Daten
    ├── neo4j/              # Neo4j Graph-Daten
    │   ├── data/
    │   ├── logs/
    │   └── plugins/
    └── models/
        ├── stable-diffusion/
        └── musicgen/
```
