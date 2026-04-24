# Image2 Prompt – GreencityOasis Tablet Start Screen

> Zur Verwendung in ChatGPT Image2. Logo und Hintergrundfoto werden separat als Referenzbilder hochgeladen.

---

## Attachments (werden im selben Chat hochgeladen und MÜSSEN eingebettet werden)
1. **Logo-Bild** → pixelgenau ins Header rechts einsetzen (nicht neu zeichnen, nicht stilisieren, Proportionen beibehalten, Höhe ~40 dp). Falls das Logo farbig ist: Originalfarben erhalten; falls monochrom: in Calm Jade `#78AA8C` einfärben.
2. **Greencity-Hintergrundfoto** → als ganzflächiger Background-Layer direkt einbetten (nicht ersetzen, nicht durch KI-Fantasie-Szene austauschen). Darauf anwenden: starker Gaussian Blur (~60 px), zusätzlich Warm-Mist `#E7E4DD` → Soft-White `#F7F7F4` Gradient-Overlay bei ~40% Deckkraft, damit die Glass-Cards lesbar werden. Das Foto muss als Basis erkennbar durchscheinen.

**Wichtig für Image2:** Beide Assets sind vorgegeben. Keine Platzhalter generieren, keine alternativen Logos/Fotos erfinden – ausschließlich die angehängten Bilder verwenden.

---

## Prompt

Create a **high-fidelity UI mockup** of an Android tablet home screen in **landscape orientation, exactly 1920 × 1200 px**. Photorealistic rendering of the UI itself (not a device photo, no bezels, no hands — just the pure screen content, edge to edge).

### Visual Style
- **Material 3 (Material You)** expressive design language, light theme
- **Glassmorphism**: every card is a `GlassCard` — semi-transparent soft-white fill (~55% opacity), fine 1 dp border in `rgba(255,255,255,0.35)`, 24 dp rounded corners, soft diffused drop-shadow, clear backdrop-blur so the background photo shimmers through
- **Background**: the attached blurred Greencity photo, strong gaussian blur (~60 px), subtle Warm-Mist `#E7E4DD` → Soft-White `#F7F7F4` gradient overlay from top-left to bottom-right, very soft Calm Jade `#78AA8C` bloom spots for depth
- **Typography**: Lexend Exa for headings, Inter/Roboto Flex for body. Clean hierarchy, generous letter-spacing on headers
- **Color palette (strict, no other colors):**
  - Primary: Calm Jade `#78AA8C`
  - Text/Icons: Warm Gray `#464B50`
  - Dividers/Muted: Stone Line `#C8C3BA`
  - Surface tints: Warm Mist `#E7E4DD`
  - Base surface: Soft White `#F7F7F4`
- **Spacing**: 32 dp outer padding, 20 dp gutter between cards, comfortable breathing room
- **UI language**: Swiss German (Deutsch)

### Layout — three horizontal zones

#### 1) Header bar (top, ~12% of height)
- **Left**: Greeting block
  - Line 1 (large, Lexend Exa, Warm Gray): `Guten Morgen, Martin`
  - Line 2 (small, Stone Line): `Freitag, 24. April 2026  ·  08:42`
- **Center**: Room selector — 4 pill-shaped segmented buttons in a glass container, each with Material Symbols icon + label, the active one filled Calm Jade with Soft-White text, the others transparent with Warm-Gray text:
  1. `Living Room` (icon: weekend) — **active**
  2. `Bedroom` (icon: bed)
  3. `Kitchen` (icon: countertops)
  4. `Bathroom` (icon: bathtub)
- **Right**: horizontal group
  - Language selector chip `DE ▾` (globe icon, glass pill)
  - GreencityOasis logo (use attached wordmark, height ~40 dp, Calm Jade)

#### 2) Tile grid (main area) — **2 rows × 4 columns, all tiles equal height**, Row 1 has one tile spanning 2 columns so it contains 3 cards, Row 2 contains 4 cards.

**Row 1**

- **1.1 Webcam Üetliberg** *(spans 2 columns, double width)*
  - Card title top-left: `Live · Üetliberg → Zürich`
  - Red pulsing LIVE dot + timestamp `08:42`
  - Content: cinematic panoramic still of Zürich city from Üetliberg seen through a live webcam, morning light, slight haze, lake visible. Inside a rounded inner frame with 16 dp radius.
  - Bottom-right mini control: fullscreen icon
- **1.2 Wetter**
  - Title: `Wetter heute`
  - Big weather icon (sun behind soft cloud, Calm Jade accent)
  - Temperature `18°` huge, below `Zürich · leicht bewölkt`
  - Row of mini stats: 💧 42% · 🌬 9 km/h · ☀️ UV 4
  - CTA pill button bottom: `3-Tage Vorschau →`
- **1.3 Balkon Beschallung**
  - Title: `Balkon · Soundscape`
  - Two selectable chips, one active: `Sommerwald` (active, Calm Jade fill) / `Meeresrauschen`
  - Material 3 switch row: `Tag / Nacht` (currently Tag)
  - Horizontal volume slider with Calm Jade track, value 45%, speaker icon left, + right
  - Tiny hint text Stone Line, italic: `Balkon-Gerät muss eingeschaltet sein.`

**Row 2**

- **2.1 Fahrplan**
  - Title: `Fahrplan → Zürich HB`
  - Transport mode icon row (4 icons, only one active Calm Jade filled circle): 🚆 Zug **(active)** · 🚌 Bus · ⛴ Schiff · 🚡 Seilbahn
  - List of 3 visible departures (suggest more by fade at bottom + scroll indicator):
    - `S10 · Gl. 2  ·  08:56  · in 14 Min`
    - `S4  · Gl. 1  ·  09:12  · in 30 Min`
    - `IR75· Gl. 3  ·  09:24  · in 42 Min`
- **2.2 Events**
  - Title: `Events heute`
  - List of 2 events with tiny Calm Jade dot marker:
    - `19:30 · Jazz am See · Bürkliplatz`
    - `20:00 · Filmpodium · «Perfect Days»`
  - CTA pill: `3-Tage Vorschau →`
- **2.3 Kontakt**
  - Title: `Host kontaktieren`
  - Round avatar (stylized illustration, Calm Jade)
  - Name under avatar: `Laura`
  - Big primary Material 3 filled button, Calm Jade, Telegram paper-plane icon + text: `Nachricht senden`
- **2.4 WLAN**
  - Title: `WLAN`
  - Centered QR-code block (black modules on Soft-White), 24 dp rounded frame
  - SSID below in mono: `GreencityOasis_Guest`
  - Small hint: `Scan zum Verbinden`

### Finishing touches
- Add gentle realistic highlights on the top edge of each glass card to sell the glass material
- Everything perfectly aligned on a consistent 8 dp grid
- No lorem ipsum, no watermarks, no keyboard, no device frame
- Output: a single crisp 1920 × 1200 PNG, full-bleed, ready to use as a design reference

**Goal**: warm, calm, premium "digital concierge" feeling — nature-inspired, airy, modern Swiss hospitality.
