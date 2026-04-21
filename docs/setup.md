# Setup – GreencityOasis

## Voraussetzungen

| Tool | Version | Zweck |
|---|---|---|
| Android Studio | Hedgehog (2023.1) oder neuer | IDE |
| JDK | 17 (bundled mit Android Studio) | Build |
| Git | latest | Versionskontrolle |
| GitHub Copilot Plugin | latest | AI-Assistant |

## Schritt-für-Schritt

### 1. Repository klonen / öffnen

```bash
cd /pfad/zum/workspace
git clone <repo-url> GreencityOasis
cd GreencityOasis
```

### 2. Android Studio öffnen

- **Nicht** "New Project" wählen
- **File → Open** → den `GreencityOasis/`-Ordner auswählen
- Android Studio erkennt beim ersten Öffnen, dass noch kein `app/`-Modul existiert

### 3. App-Modul via Copilot erstellen

Copilot Chat öffnen (Agent Mode aktivieren) und den Initial-Prompt aus `docs/setup.md` → Abschnitt "Initial Copilot Prompt" abfeuern.

### 4. Erster Sync

- Android Studio zeigt "Sync Now" → klicken
- Gradle lädt Dependencies (dauert beim ersten Mal 3–5 Minuten)
- Bei Fehlern: **File → Invalidate Caches → Invalidate and Restart**

### 5. Tablet-Emulator einrichten

- **Tools → Device Manager → Create Virtual Device**
- Kategorie: **Tablet** → z.B. `Pixel Tablet` (2560 x 1600, 276 dpi)
- System Image: **API 35** (Android 15) mit Google APIs
- Finish → Play-Button

### 6. Erster Run

- Build-Config: `app` auswählen
- Target Device: Emulator wählen
- Run (Shift + F10)

## Notion-Token einrichten

Siehe `docs/notion-api.md` für Details zur Token-Erstellung.

Nach erstem App-Start öffnet sich der `TokenSetupScreen` – Token dort einmalig eingeben, wird in `EncryptedSharedPreferences` gespeichert.

## Copilot-Konfiguration

Die Datei `.github/copilot-instructions.md` im Repo-Root wird automatisch von Copilot gelesen. Sie enthält:

- Stack-Informationen
- Code-Konventionen
- Verweise auf Styleguide und Specs

## GitHub Copilot Modell-Auswahl

- **Standard-Entwicklung:** Claude Sonnet 4 (schnell, ausreichend)
- **Komplexe Architektur-Fragen:** Claude Opus 4 (im Claude-Chat, nicht in Copilot)

Modell wechseln: Copilot Chat → unten rechts Modell-Dropdown.

## Häufige Stolperfallen

| Problem | Lösung |
|---|---|
| "SDK location not found" | `local.properties` prüfen, `sdk.dir=...` setzen |
| Gradle-Sync-Fehler nach Dependency-Update | Caches invalidieren |
| Compose-Preview lädt nicht | Build → Clean Project → Rebuild |
| `INTERNET` permission fehlt | `AndroidManifest.xml` prüfen |
| Emulator hängt | Cold Boot: Device Manager → Dropdown → Cold Boot Now |

## Gradle-Befehle (Terminal)

```bash
./gradlew clean              # Build-Artefakte löschen
./gradlew assembleDebug      # Debug-APK bauen
./gradlew installDebug       # Auf verbundenes Device installieren
./gradlew test               # Unit-Tests
./gradlew lint               # Lint-Check
```

## Git-Workflow (empfohlen)

```bash
git checkout -b feature/xyz
# ... arbeiten ...
git add .
git commit -m "feat: kurze beschreibung"
git push origin feature/xyz
```

## Initial Copilot Prompt

Siehe separaten Chat-Verlauf – der Prompt für das initiale Setup wird direkt im Copilot Chat eingegeben, nicht über die Dokumentation.
