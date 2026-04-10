# Offline LLM Analyse — CPU-Only (Intel i7/i9, 64GB RAM)

> Stand: April 2025 | Hardware: Intel Core i7/i9 12.–14. Gen, 64 GB RAM, keine dedizierte GPU

---

## 1. Text & RAG — Modelle

| Modell | Herkunft | Parameter | Grösse (Q4) | RAM-Bedarf | Stärke | Empfehlung |
|--------|----------|-----------|-------------|------------|--------|------------|
| **Qwen2.5:14b** | 🇨🇳 Alibaba | 14B | ~9 GB | ~12 GB | Bester chinesischer Allrounder, mehrsprachig, top bei Coding & RAG | ⭐ Haupt-Modell |
| **DeepSeek-R1:14b** | 🇨🇳 DeepSeek | 14B | ~9 GB | ~12 GB | Exzellentes Reasoning, Mathe, Logik, Analyse | ⭐ Reasoning |
| **Qwen2.5-Coder:7b** | 🇨🇳 Alibaba | 7B | ~5 GB | ~7 GB | Spezialisiert auf Code-Generierung | ⭐ Coding |
| **Yi:9b** | 🇨🇳 01.AI | 9B | ~5 GB | ~7 GB | Stark bei mehrsprachigen Aufgaben | Optional |
| **Llama3.1:8b** | 🇺🇸 Meta | 8B | ~5 GB | ~7 GB | Solider Allrounder, grosse Community | Backup |
| **Phi-4:14b** | 🇺🇸 Microsoft | 14B | ~9 GB | ~12 GB | Effizient, gut bei Reasoning | Alternative |
| **Nomic-Embed-Text** | 🇺🇸 Nomic | 137M | ~275 MB | ~1 GB | Embedding-Modell für RAG-Vektorsuche | ⭐ Pflicht für RAG |

### Empfohlene Kombination (~33 GB Disk)
1. **Qwen2.5:14b** — Hauptassistent für alles (Deutsch, Englisch, Chinesisch)
2. **DeepSeek-R1:14b** — Komplexe Analysen, Mathe, Logik
3. **Qwen2.5-Coder:7b** — Code schreiben und verstehen
4. **Llama3.1:8b** — Englisch-Fallback, gute Community
5. **Nomic-Embed-Text** — Pflicht für RAG (Dokument-Embeddings)

### Warum chinesische Modelle?
- **Qwen2.5** schlägt Llama3.1 gleicher Grösse in den meisten Benchmarks
- **DeepSeek-R1** ist der beste Open-Source-Reasoning-Modell
- Beide funktionieren exzellent auf Deutsch und Englisch
- Quantisierte Versionen (Q4_K_M) laufen flüssig auf CPU

---

## 2. Bild-Generierung — Modelle

| Modell | Herkunft | Grösse | CPU-Zeit (512×512) | Qualität | Bemerkung |
|--------|----------|--------|-------------------|----------|-----------|
| **Stable Diffusion 1.5** | 🇬🇧 Stability AI | ~2 GB (OV) | ~60–120s | ★★★☆ | Bester Kompromiss Geschwindigkeit/Qualität auf CPU |
| **SDXL Turbo** | 🇬🇧 Stability AI | ~6 GB | ~90–180s | ★★★★ | Bessere Qualität, aber langsamer |
| **Kolors** | 🇨🇳 Kuaishou | ~12 GB | ~10+ min | ★★★★★ | Top-Qualität, aber zu langsam auf CPU |
| **HunyuanDiT** | 🇨🇳 Tencent | ~8 GB | ~15+ min | ★★★★★ | Exzellent, aber GPU-optimiert |
| **FLUX.1-schnell** | 🇩🇪 Black Forest Labs | ~12 GB | ~15+ min | ★★★★★ | State-of-the-Art, aber zu gross für CPU |

### Empfehlung
**Stable Diffusion 1.5 mit OpenVINO** — Intel-optimiert, ~60–120 Sekunden pro Bild.
Die chinesischen Modelle (Kolors, HunyuanDiT) sind qualitativ besser, aber auf CPU nicht praktikabel.
OpenVINO nutzt die Intel-spezifischen Instruktionen (AVX2/VNNI) für deutlich bessere Performance.

---

## 3. Musik-Generierung — Modelle

| Modell | Herkunft | Grösse | CPU-Zeit (10s Audio) | Qualität | Bemerkung |
|--------|----------|--------|---------------------|----------|-----------|
| **MusicGen Small** | 🇺🇸 Meta | ~1 GB | ~2–5 min | ★★★☆ | Beste Option für CPU |
| **MusicGen Medium** | 🇺🇸 Meta | ~3.3 GB | ~5–10 min | ★★★★ | Bessere Qualität, längere Wartezeit |
| **MusicGen Large** | 🇺🇸 Meta | ~7 GB | ~15–30 min | ★★★★★ | Top-Qualität, aber langsam |
| **Bark** | 🇺🇸 Suno | ~5 GB | ~3–8 min | ★★★☆ | Eher Speech + Sound Effects |

### Empfehlung
**MusicGen Small** — Gute Qualität bei akzeptabler Wartezeit auf CPU.
Upgrade auf Medium möglich, wenn längere Wartezeiten OK sind.

> **Hinweis:** Es gibt keine weit verbreiteten Open-Source-Musikmodelle aus China.

---

## 4. Hardware-Schätzung (Gesamtsystem)

| Komponente | Speicherbedarf |
|------------|---------------|
| Docker Images (Ollama + Open WebUI + Creative Studio) | ~10 GB |
| Text-Modelle (5 Modelle) | ~33 GB |
| Stable Diffusion 1.5 (OpenVINO) | ~3 GB |
| MusicGen Small | ~1 GB |
| Open WebUI Daten + RAG-Index | ~2 GB |
| **Gesamt** | **~49 GB** |

> Passt komfortabel in 100–250 GB verfügbaren Speicher.

### RAM-Nutzung zur Laufzeit
- Text-Modell (1 aktiv): ~12 GB
- Bild-Generierung: ~4 GB
- Musik-Generierung: ~3 GB
- System + Docker: ~4 GB
- **Peak (alle gleichzeitig): ~23 GB** — 64 GB sind mehr als ausreichend.

---

## 5. Architektur-Übersicht

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Compose                        │
│                                                         │
│  ┌──────────┐   ┌──────────────┐   ┌────────────────┐  │
│  │  Ollama   │   │  Open WebUI   │   │ Creative Studio│  │
│  │          │   │              │   │                │  │
│  │ • Qwen2.5│◄──│ • Chat UI    │──►│ • Stable Diff  │  │
│  │ • DeepSk │   │ • RAG Engine │   │ • MusicGen     │  │
│  │ • Coder  │   │ • Doc Upload │   │ • Web UI       │  │
│  │ • Llama  │   │ • History    │   │ • REST API     │  │
│  │ • Embed  │   │              │   │                │  │
│  └──────────┘   └──────────────┘   └────────────────┘  │
│   Port 11434      Port 3000          Port 7860          │
└─────────────────────────────────────────────────────────┘
```

- **Ollama**: Verwaltet alle Text-LLMs, einfaches Model-Management
- **Open WebUI**: Browser-UI für Chat, RAG (Dokumente hochladen), Modellwechsel
- **Creative Studio**: Eigener Service für Bild- und Musikgenerierung mit OpenVINO
