# Styleguide — Greencity Oasis App

> Design-System und Referenz für die Entwicklung der Greencity Oasis App
> (Tablet-App im Querformat, später auch Smartphone und Web).
> Stand: April 2026 · Version 1.0

---

## 1. Einleitung

Die Greencity Oasis App ist die digitale Begleiterin für unsere Gäste während ihres
Aufenthalts in unserem Apartment in der Überbauung Greencity Zürich-Manegg. Sie soll
sich anfühlen wie die Wohnung selbst:

- **Warm und einladend** — wie ein Schweizer Wohnzimmer mit Plaids und Tee.
- **Ruhig und klar** — ohne visuelles Rauschen, keine grellen Farben.
- **Modern und technisch** — moderne Glassmorphism-Optik für die Bedienelemente.
- **International** — von Anfang an mehrsprachig gedacht (DE, EN, AR, ZH, JA, KO, RU).

Dieser Styleguide beschreibt alle gestalterischen Regeln. Er richtet sich an
Entwickler, Designer und alle, die am Produkt mitarbeiten.

---

## 2. Designprinzipien

1. **Ruhe vor Reiz.** Weisse Flächen, grosszügige Abstände, eine einzige Primärfarbe
   als Akzent. Kein Feuerwerk aus Farben.
2. **Gast zuerst.** Jede Information muss in unter 3 Sekunden auffindbar sein. Die
   häufigsten Gastfragen (WLAN, Kaffeemaschine, Müll) sind nie mehr als einen Tap
   entfernt.
3. **Natur als Leitmotiv.** Grün, Stein, warmes Grau. Niemals kalte Blautöne als
   Primärfarbe.
4. **Konsistenz vor Kreativität.** Ein Button sieht überall gleich aus. Ein Widget
   folgt immer demselben Aufbau.
5. **International by Design.** Texte sind nie in Grafiken eingebrannt. Layouts
   funktionieren auch auf Arabisch (rechts nach links).
6. **Qualität in den Details.** Schatten, Radien, Übergänge — alles mit derselben
   Sorgfalt wie die Wohnungsdekoration.

---

## 3. Logo

### 3.1 Varianten

| Variante | Einsatz |
|---|---|
| **Logo gross** (Symbol + Wortmarke untereinander) | Splash-Screen, Titelseiten, Impressum, Print |
| **Logo klein** (nur Symbol) | App-Icon, Favicon, Navigation, Footer, Briefpapier als Wasserzeichen |
| **Logo horizontal** (Symbol neben Wortmarke) | Optional, später ergänzen für Header-Leisten |

Pfade im Repo:

- `/Design/Logo gross.png` / `/Design/Logo gross.svg`
- `/Design/Logo klein.png` / `/Design/Logo klein.svg`

**Empfehlung:** Für die App primär die SVG-Version nutzen (skaliert verlustfrei).

### 3.2 Schutzzone

Rund um das Logo muss eine freie Schutzzone von **mindestens 1/4 der Höhe des
Symbols** bleiben. Kein Text, keine Grafik, keine Kante darf in diese Zone hineinragen.

### 3.3 Mindestgrössen

- **Bildschirm:** Symbol mindestens 32 px hoch. Grosses Logo (mit Wortmarke)
  mindestens 96 px hoch.
- **Druck:** Symbol mindestens 10 mm. Grosses Logo mindestens 25 mm.

### 3.4 Hintergründe

- Auf hellen Hintergründen (Soft White, Warm Mist): Logo in Originalfarben.
- Auf dunklen Hintergründen (Dark Jade, Schwarz): Wortmarke in Soft White,
  Symbol bleibt Calm Jade.
- Auf Fotos: nur wenn der Bildausschnitt ruhig ist. Bei Bedarf Logo in Soft White
  mit leichtem Schlagschatten.

### 3.5 Was nicht erlaubt ist

- Logo nicht verzerren, drehen oder spiegeln.
- Logo nicht in anderen Farben als den CI-Farben darstellen.
- Symbol und Wortmarke nicht neu zueinander anordnen.
- Logo nicht mit Effekten (Glow, Verlauf, 3D) versehen.
- Logo nicht vor unruhigem Bildhintergrund ohne Abdunklung platzieren.

---

## 4. Farben

### 4.1 Primärpalette (CI)

| Name | Hex | RGB | Rolle |
|---|---|---|---|
| **Calm Jade** | `#78AA8C` | 120 · 170 · 140 | Marke, Logo-Symbol, H1-Überschriften, primäre Buttons, aktive Zustände |
| **Warm Gray** | `#464B50` | 70 · 75 · 80 | H2-Überschriften, Wortmarke, Fliesstext, Icons |
| **Stone Line** | `#C8C3BA` | 200 · 195 · 186 | Trennlinien, Rahmen, inaktive Zustände |
| **Warm Mist** | `#E7E4DD` | 231 · 228 · 221 | Hintergrund-Flächen, Karten-Rückseiten, Hover-Zustand |
| **Soft White** | `#F7F7F4` | 247 · 247 · 244 | Haupt-Hintergrund, Karten auf Farbhintergrund |

### 4.2 Erweiterte Grün-Skala (für Abstufungen)

| Name | Hex | Einsatz |
|---|---|---|
| **Jade 50** | `#EEF4F0` | sehr helle Hintergründe, Hinweisboxen |
| **Jade 100** | `#D6E4DB` | Hover-Flächen, Badges-Hintergrund |
| **Jade 300** | `#A8C4B4` | Sekundär-Akzent, Diagramme |
| **Jade 500** | `#78AA8C` | **Calm Jade — Hauptfarbe** |
| **Jade 700** | `#5C8A6F` | Hover-Zustand primärer Buttons, aktive Links |
| **Jade 900** | `#2F4A3B` | Dark-Mode-Akzent, Text auf hellem Jade |

### 4.3 Neutral-Skala

| Name | Hex | Einsatz |
|---|---|---|
| **Neutral 900** | `#1C1E20` | Dark-Mode-Hintergrund, Text auf hellem Hintergrund bei maximalem Kontrast |
| **Neutral 700** | `#464B50` | **Warm Gray — Haupttext** |
| **Neutral 500** | `#6E7479` | Sekundärtext, Platzhalter |
| **Neutral 300** | `#C8C3BA` | **Stone Line — Rahmen** |
| **Neutral 200** | `#E7E4DD` | **Warm Mist — Hintergrund** |
| **Neutral 100** | `#F7F7F4` | **Soft White — Basis** |

### 4.4 Semantische Farben

| Zweck | Name | Hex | Einsatz |
|---|---|---|---|
| Erfolg | **Success Green** | `#5C8A6F` | Bestätigungen, erfolgreiche Aktionen |
| Warnung | **Amber Sand** | `#D8A864` | Hinweise, gelbe Badges |
| Fehler | **Terracotta** | `#C96A5A` | Fehlermeldungen, Notfall-Button |
| Info | **Sky Slate** | `#7A9DB5` | neutrale Info-Boxen, Wetter-Akzente |

Die semantischen Farben sind bewusst gedämpft gehalten und passen zur warmen
Grundpalette. Keine reinen Primärfarben (kein `#FF0000`, kein `#00FF00`).

### 4.5 Glassmorphism-Palette (für Widgets über Fotohintergrund)

Für die Smart-Home-Widgets über dem Wohnzimmer-Hintergrundbild (vgl.
`screen.webp`) verwenden wir halbtransparente Flächen:

| Name | Wert | Einsatz |
|---|---|---|
| **Glass Dark** | `rgba(28, 30, 32, 0.55)` + `backdrop-filter: blur(24px)` | Widget-Hintergrund dunkler Modus |
| **Glass Light** | `rgba(247, 247, 244, 0.65)` + `backdrop-filter: blur(24px)` | Widget-Hintergrund heller Modus |
| **Glass Border** | `rgba(255, 255, 255, 0.12)` | feine Kante auf Glass Dark |
| **Glass Border Light** | `rgba(70, 75, 80, 0.10)` | feine Kante auf Glass Light |

### 4.6 Light- und Dark-Mode

| Element | Light Mode | Dark Mode |
|---|---|---|
| App-Hintergrund | Soft White `#F7F7F4` | Neutral 900 `#1C1E20` |
| Karte / Panel | Weiss `#FFFFFF` mit Rand Stone Line | `#262A2D` mit Rand `rgba(255,255,255,0.08)` |
| Text primär | Warm Gray `#464B50` | Soft White `#F7F7F4` |
| Text sekundär | Neutral 500 `#6E7479` | `#B0B5B8` |
| Akzent | Calm Jade `#78AA8C` | Jade 300 `#A8C4B4` |
| Trennlinie | Stone Line `#C8C3BA` | `rgba(255,255,255,0.08)` |

**Regel:** Die App startet standardmässig im Light Mode. Der Gast kann manuell
wechseln oder das Systemverhalten (`prefers-color-scheme`) übernehmen lassen.

### 4.7 Kontrast-Anforderungen

Alle Text-Hintergrund-Kombinationen erfüllen mindestens **WCAG AA** (Kontrast ≥ 4.5:1
für Fliesstext, ≥ 3:1 für Grosstext ab 18 pt). Für Überschriften und Buttons streben
wir AAA an.

Kritische Kombinationen wurden geprüft:

- Warm Gray auf Soft White: 8.9:1 ✔ AAA
- Calm Jade auf Soft White: 3.1:1 ✔ AA (nur für Grosstext / Icons)
- Calm Jade auf Warm Gray (Dark Button): 4.8:1 ✔ AA
- Soft White auf Jade 700: 5.2:1 ✔ AA

**Regel:** Calm Jade nie als kleinen Fliesstext auf Soft White verwenden — nur für
Überschriften, Icons und Buttons.

---

## 5. Typografie

### 5.1 Schriftfamilien

| Rolle | Familie | Quelle | Fallback |
|---|---|---|---|
| **Display / Überschriften** | **Lexend Exa** SemiBold, Uppercase | [Google Fonts](https://fonts.google.com/specimen/Lexend+Exa) | `"Lexend Exa", "Helvetica Neue", Helvetica, Arial, sans-serif` |
| **Fliesstext** | **Inter** Light / Regular | [Google Fonts](https://fonts.google.com/specimen/Inter) | `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` |
| **Monospace (Code, QR-Labels)** | **JetBrains Mono** | [Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono) | `"JetBrains Mono", Menlo, Consolas, monospace` |

### 5.2 Mehrsprachige Fallbacks

Da die App in sieben Sprachen verfügbar ist, laden wir sprachspezifische Noto-Fonts
nach. Browser wählt automatisch die passende Schrift via `unicode-range`:

| Sprache | Schrift | Rolle |
|---|---|---|
| Arabisch | **Noto Kufi Arabic** (Display) + **Noto Sans Arabic** (Body) | RTL-Layout |
| Chinesisch (vereinfacht) | **Noto Sans SC** | Body |
| Japanisch | **Noto Sans JP** | Body |
| Koreanisch | **Noto Sans KR** | Body |
| Russisch | Inter unterstützt Kyrillisch direkt | Body |

> Lexend Exa hat keine arabischen oder CJK-Glyphen. Für Überschriften in diesen
> Sprachen nutzen wir jeweils die Display-Variante von Noto (z.B. Noto Serif SC für
> chinesische Headlines), ebenfalls in Versalien bzw. Extrabold-Gewicht.

### 5.3 Typografische Skala (Tablet, Basis 16 px)

| Stil | Familie · Gewicht | Grösse / Zeilenhöhe | Tracking | Einsatz |
|---|---|---|---|---|
| **Display** | Lexend Exa SemiBold, UPPERCASE | 40 / 48 px | +2 % | Splash, Hero-Titel |
| **H1** | Lexend Exa SemiBold, UPPERCASE | 32 / 40 px | +2 % | Seitentitel, Farbe Calm Jade |
| **H2** | Lexend Exa SemiBold, UPPERCASE | 24 / 32 px | +2 % | Sektionstitel, Farbe Warm Gray |
| **H3** | Inter SemiBold | 20 / 28 px | 0 | Kartentitel |
| **H4** | Inter Medium | 16 / 24 px | 0 | kleine Abschnitte |
| **Body Large** | Inter Regular | 18 / 28 px | 0 | Haupttext Tablet |
| **Body** | Inter Regular | 16 / 24 px | 0 | Standardtext |
| **Body Small** | Inter Regular | 14 / 20 px | 0 | Sekundärtext, Meta |
| **Caption** | Inter Medium | 12 / 16 px | +4 % | Labels, Badges |
| **Button** | Inter SemiBold | 15 / 20 px | +2 % | Button-Text |
| **Mono** | JetBrains Mono Regular | 14 / 20 px | 0 | Codes, IDs, QR-Unterschriften |

### 5.4 Zeilenlängen

- Fliesstext nie über **72 Zeichen** pro Zeile (Lesbarkeit).
- In Widgets: maximal **45 Zeichen** pro Zeile.
- Lange Gastanleitungen nach spätestens **4 Zeilen** mit einem Absatz trennen.

### 5.5 Emphase

- **Hervorhebung:** `font-weight: 600` in derselben Farbe.
- **Links:** Calm Jade `#78AA8C`, Unterstreichung nur beim Hover.
- **Kein Kursiv** für Emphase, nur für Werktitel, Fremdwörter und Zitate.

---

## 6. Iconografie

### 6.1 Stil

- **Familie:** [Lucide Icons](https://lucide.dev/) als Basisset, ergänzt durch
  eigens gestaltete Piktogramme für Apartment-spezifische Objekte (Kaffeemaschine,
  Fondue-Set, Herrendiener).
- **Strichstärke:** 1.75 px bei 24 px Icon-Grösse (entspricht dem ruhigen, etwas
  organischen Charakter).
- **Enden:** rund (`stroke-linecap: round`, `stroke-linejoin: round`).
- **Farbe:** immer einfarbig, passend zum Textkontext (Warm Gray oder Calm Jade
  für Akzente).

### 6.2 Grössen

| Grösse | Einsatz |
|---|---|
| **16 px** | Inline im Text, kleine Badges |
| **20 px** | Listen-Icons, Buttons |
| **24 px** | Navigation, Widgets (Standard) |
| **32 px** | Widget-Header, Kategorien |
| **48 px** | Onboarding, leere Zustände |

### 6.3 Kategorien-Icons (Beispiele für die App)

| Bereich | Icon | Bemerkung |
|---|---|---|
| Wohnung-Karte | `home` | Grundriss-Ansicht |
| Küche | `coffee` | Kaffeemaschine, Küchenbereich |
| Bad | `shower-head` | Waschmaschine, Duschen |
| Multimedia | `tv` | Smart TV, Soundbar |
| Balkon | `trees` | Balkon-Beschallung |
| Wetter | `cloud-sun` | Wetter-Widget |
| ÖV | `tram-front` | Zug, Bus, Schiff |
| Einkauf | `shopping-bag` | Supermärkte |
| Freizeit | `bike` | Sport, Wellness |
| Sehenswürdigkeiten | `landmark` | Zoo, Üetliberg |
| Gebet | `church` | Kirchen, Moscheen, Tempel |
| Notfall | `life-buoy` | Notfallnummern |
| Veranstaltungen | `calendar-days` | Events |
| Restaurant | `utensils` | Essen |

### 6.4 Qualitäts-Regeln

- Icons nie verzerren oder mischen (nicht zwei Stile in einer Ansicht).
- Eigens gezeichnete Icons auf 24×24 Grid, 1.75 px Stroke.
- SVG-Export mit sauber benannten `<title>`-Tags für Screenreader.

---

## 7. Layout und Grid

### 7.1 Breakpoints

Die App wird **primär für Tablet im Querformat** entwickelt, soll aber ebenfalls auf
Smartphone und Desktop sinnvoll funktionieren.

| Breakpoint | Breite | Gerätebeispiel | Spalten |
|---|---|---|---|
| **sm** | ab 0 px | Handy Hochformat | 4 |
| **md** | ab 640 px | Handy Querformat / kleines Tablet | 6 |
| **lg** | ab 1024 px | **Tablet Querformat (Primärziel)** | 12 |
| **xl** | ab 1280 px | Desktop / grosses Tablet | 12 |
| **2xl** | ab 1536 px | Hochauflösende Desktops | 12 |

### 7.2 Container

- **Maximale Breite Inhalt:** 1440 px, horizontal zentriert.
- **Seitenabstände:** 24 px (sm) / 32 px (md) / 48 px (lg+).

### 7.3 Grid

- Zwölf-Spalten-Grid auf `lg` und darüber.
- **Gutter:** 24 px.
- Widgets belegen typischerweise 3, 4 oder 6 Spalten (vgl. `screen.webp`).

### 7.4 Tablet-Layout (Primäransicht, Querformat)

Gemäss `screen.webp`:

- **Oben Mitte:** Top-Navigation (Raum- oder Kategorie-Tabs), auf Glass-Background.
- **Oben rechts:** Benachrichtigungen, Einstellungen, Profil (3 runde Icons).
- **Oben links:** Burger-Menü (Seitennavigation).
- **Hintergrund:** hochauflösendes Foto unseres Wohnzimmers oder Balkons,
  jahreszeitlich wechselnd.
- **Widgets:** floaten als Glassmorphism-Karten über dem Hintergrund. Unregelmässig
  angeordnet, aber im 12er-Grid ausgerichtet.
- **Unten Mitte:** Aktion «Widget hinzufügen» als gestrichelter Rahmen.

---

## 8. Spacing

Wir nutzen eine **4-px-Basis-Skala**, weil sie präziser ist als 8 px und sowohl für
kompakte Widget-Innenabstände als auch für grosszügige Sektionsabstände funktioniert.

| Token | px | Einsatz |
|---|---|---|
| `space-0` | 0 | — |
| `space-1` | 4 | Mikro-Abstand (Icon-Label) |
| `space-2` | 8 | kleine Lücken |
| `space-3` | 12 | Abstand innerhalb eines Widgets |
| `space-4` | 16 | Standard-Padding in Karten |
| `space-5` | 20 | zwischen Listeneinträgen |
| `space-6` | 24 | Widget-Innenabstand, Spalten-Gutter |
| `space-8` | 32 | zwischen Sektionen |
| `space-10` | 40 | grosse Sektionsabstände |
| `space-12` | 48 | Seitenrand auf `lg+` |
| `space-16` | 64 | Hero-Abstände |
| `space-20` | 80 | grosse Hero-Abstände |

---

## 9. Radius

Weich und wohnlich — aber nie verspielt rund.

| Token | px | Einsatz |
|---|---|---|
| `radius-none` | 0 | QR-Codes, technische Elemente |
| `radius-sm` | 6 | kleine Badges, Inputs |
| `radius-md` | 12 | Buttons, Inputs, kleine Karten |
| `radius-lg` | 20 | **Widgets, Glassmorphism-Karten** |
| `radius-xl` | 28 | grosse Hero-Karten |
| `radius-full` | 9999 | Avatare, runde Icon-Buttons, Toggle-Griffe |

---

## 10. Elevation und Schatten

Unsere Schatten sind **weich und warm**, nicht hart-schwarz.

| Token | Wert | Einsatz |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(70, 75, 80, 0.06)` | Inputs, Hover |
| `shadow-md` | `0 4px 12px rgba(70, 75, 80, 0.08)` | Karten in Ruhe |
| `shadow-lg` | `0 12px 32px rgba(70, 75, 80, 0.12)` | schwebende Widgets |
| `shadow-xl` | `0 24px 64px rgba(70, 75, 80, 0.18)` | Modals, Popovers |
| `shadow-glass` | `0 8px 32px rgba(0, 0, 0, 0.25)` + `inset 0 1px 0 rgba(255,255,255,0.1)` | Glassmorphism-Widget über Bild |

---

## 11. UI-Komponenten

### 11.1 Buttons

**Primär** — für die eine wichtigste Aktion pro Ansicht.

```
Hintergrund: Calm Jade #78AA8C
Text:        Soft White #F7F7F4
Höhe:        48 px
Padding:     0 24 px
Radius:      12 px
Font:        Inter SemiBold, 15 px, +2 % Tracking
Hover:       Jade 700 #5C8A6F
Active:      Jade 900 #2F4A3B
Disabled:    Stone Line #C8C3BA, Text Neutral 500
```

**Sekundär** — für gleichwertige, weniger prominente Aktionen.

```
Hintergrund: transparent
Rahmen:      1.5 px Warm Gray
Text:        Warm Gray #464B50
Sonst identisch zu Primär.
Hover:       Hintergrund Warm Mist, Rahmen Calm Jade
```

**Ghost** — für dritte Optionen, Abbrechen, Links.

```
Hintergrund: transparent
Text:        Calm Jade #78AA8C
Hover:       Hintergrund Jade 50
```

**Icon-Button** — rund, 40×40 oder 48×48 px, `radius-full`.

**Notfall-Button** — für den Notfallnummern-Screen.

```
Hintergrund: Terracotta #C96A5A
Text:        Soft White
Sonst wie Primär.
```

### 11.2 Widget-Karten (Haupt-Komponente der App)

Die Widgets sind das Herzstück — sie transportieren Informationen und Aktionen.

**Light Widget** (bei hellem Hintergrund, z.B. Listenansicht):

```
Hintergrund: Weiss #FFFFFF
Rahmen:      1 px Stone Line
Radius:      20 px
Padding:     24 px
Schatten:    shadow-md
Titel:       H3 (Inter SemiBold 20)
Meta:        Body Small (Inter 14, Neutral 500)
```

**Glass Widget** (über Fotohintergrund, vgl. `screen.webp`):

```
Hintergrund: Glass Dark — rgba(28,30,32,0.55) + backdrop-filter: blur(24px)
Rahmen:      1 px rgba(255,255,255,0.12)
Radius:      20 px
Padding:     20 px
Schatten:    shadow-glass
Titel:       H4 (Inter Medium 16), Farbe Soft White
Wert / KPI:  Lexend Exa SemiBold 28–40 px, Farbe Soft White
Meta:        Inter Regular 13, Farbe rgba(255,255,255,0.6)
Akzent-Icon: Calm Jade oder situativ (Wetter: Sky Slate)
```

**Widget-Struktur (einheitlich):**

```
[Icon klein 20 px]  [Titel H4]                    [Toggle oder Aktion]

                    [Hauptwert GROSS]
                    [Einheit klein]

[Meta-Zeile: Status, Zeit, Quelle]
```

### 11.3 Toggle-Switches

```
Breite:   44 px, Höhe 24 px
Aus:      Stone Line Hintergrund, Griff Soft White
Ein:      Calm Jade Hintergrund, Griff Soft White
Radius:   full
Übergang: 200 ms ease-out
```

### 11.4 Slider

```
Schiene aus:  Stone Line, 4 px hoch
Schiene ein:  Calm Jade (bis Griff)
Griff:        16 px, Soft White, shadow-sm, 1 px Calm Jade
Skala:        5 Schritte oder stufenlos
Label:        Caption über dem Griff
```

### 11.5 Input-Felder

```
Höhe:     48 px
Padding:  0 16 px
Radius:   12 px
Rahmen:   1.5 px Stone Line, Warm Mist Hintergrund
Fokus:    Rahmen Calm Jade, Hintergrund Soft White
Fehler:   Rahmen Terracotta, Hilfetext darunter
Label:    Caption über dem Feld, Warm Gray
Font:     Inter Regular 16 px
```

### 11.6 Listen

Einträge mit Icon links, Text Mitte, Chevron rechts.

```
Höhe:      64 px minimum (Touch-Ziel!)
Padding:   16 px horizontal, 12 px vertikal
Trenner:   1 px Stone Line, nur zwischen Einträgen, nicht oben/unten
Hover:    Warm Mist
Aktiv:    Jade 100
Titel:    Body (Inter Regular 16)
Meta:     Body Small (Inter 14, Neutral 500)
Icon:     24 px Warm Gray, im aktiven Zustand Calm Jade
```

### 11.7 Navigation

**Top-Navigation** (wie in `screen.webp`): Pillen-förmig, Glass-Background,
aktiver Tab mit subtiler Jade-Hinterlegung.

**Seitennavigation** (Burger): öffnet von links, 320 px breit, Soft White,
shadow-xl.

**Tab-Bar** (nur auf Smartphone): fix unten, 4–5 Einträge, aktiver Eintrag
Calm Jade.

### 11.8 Modals und Dialoge

```
Hintergrund:     Weiss
Overlay:         rgba(28, 30, 32, 0.4), Klick schliesst
Radius:          20 px
Padding:         32 px
Max-Breite:      560 px
Schatten:        shadow-xl
Animation:       Fade in 200 ms, Scale von 0.96 → 1
Close-Icon:      oben rechts, 24 px, Warm Gray
```

### 11.9 QR-Codes

QR-Codes werden in der App für Google Maps, Event-Links und Fahrpläne eingesetzt.

```
Grösse:        mindestens 160 px auf Bildschirm, 40 mm im Druck
Farbe:         Schwarz #1C1E20 auf Weiss
Rahmen:        keiner — oder weisser «Quiet Zone»-Rand von mindestens 16 px
Label darunter: Caption in JetBrains Mono, zentriert
Logo im QR:    optional Greencity-Symbol in der Mitte, maximal 20 % der Fläche
Error Correction: Level H (30 %), wenn Logo eingebettet ist
Radius:        radius-md am Container, nicht am QR selbst
```

### 11.10 Badges und Tags

```
Padding:    4 px 10 px
Radius:     full
Font:       Caption (Inter Medium 12, +4 % Tracking)
Standard:   Jade 100 Hintergrund, Jade 900 Text
Warnung:    Amber Sand 20 % Opacity, Amber Sand Text
Fehler:     Terracotta 20 % Opacity, Terracotta Text
Neutral:    Warm Mist Hintergrund, Warm Gray Text
```

### 11.11 Avatare

```
Grössen: 32 / 40 / 48 / 64 / 96 px
Radius:  full
Rahmen:  2 px Soft White (auf farbigem Hintergrund)
Fallback: Initialen in Calm Jade Hintergrund, Soft White Text
```

---

## 12. Motion und Animation

### 12.1 Prinzipien

- **Ruhig und glaubwürdig.** Bewegungen unterstützen, lenken nicht ab.
- **Schnell, aber nicht hektisch.** Zielgruppe sind auch ältere Gäste.
- **Konsistente Kurven.** Alles mit derselben Easing-Funktion, falls nicht anders
  nötig.

### 12.2 Standard-Werte

| Token | Dauer | Easing | Einsatz |
|---|---|---|---|
| `motion-fast` | 150 ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover, Fokus |
| `motion-base` | 250 ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard-Übergang |
| `motion-slow` | 400 ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Modals, Navigation |
| `motion-enter` | 500 ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Onboarding, Splash |

### 12.3 Typische Animationen

- **Karten erscheinen:** Fade + leichter Scale (0.96 → 1) + Versatz von 8 px nach
  oben, gestaffelt 50 ms pro Karte.
- **Toggle:** Griff wandert, Hintergrundfarbe crossfade in 200 ms.
- **Seitenwechsel:** alte Seite Fade-out 150 ms, neue Seite Fade-in 250 ms mit
  8-px-Versatz.
- **Tabs:** aktiver Indikator gleitet in 250 ms mit `motion-slow` Easing.

### 12.4 Reduzierte Bewegung

```
@media (prefers-reduced-motion: reduce) {
  alle Animationen auf 0 ms, nur Opacity-Crossfade belassen
}
```

---

## 13. Bildsprache

### 13.1 Themen

- **Architektur Greencity** — ruhige Aufnahmen, vorwiegend Tageslicht.
- **Apartment-Details** — Nahaufnahmen (Kaffeemaschine, Plaid, Balkon).
- **Umgebung** — Zürichsee, Üetliberg, Sihltal, Manegg, jahreszeitlich wechselnd.
- **Gäste** — nie aus der Agentur, lieber echte Momentaufnahmen oder gar keine
  Menschen auf den Bildern.

### 13.2 Stilregeln

- **Farbe:** leicht warm getönt (Weissabgleich +200 K), nicht kalt/bläulich.
- **Beschnitt:** 16:9 für Hintergründe, 4:3 für Karten-Cover, 1:1 für Symbolbilder.
- **Kein Filter-Kitsch:** keine Fake-Bokeh-Filter, keine schrägen Farblooks.
- **Texttauglich:** für Hintergründe immer mit ruhiger Zone für Overlay-Text
  (z.B. durch leichten Verlauf von 0→40 % Schwarz von oben nach unten).

### 13.3 Formate

- Fotos als `.webp` oder `.avif` im Web.
- Immer in zwei Auflösungen: 1× für Standard, 2× für Retina.
- Dateinamen: `greencity-{raum}-{jahreszeit}-{variante}.webp`
  (z.B. `greencity-balkon-sommer-01.webp`).

---

## 14. Mehrsprachigkeit

### 14.1 Unterstützte Sprachen (Priorität)

| Code | Sprache | Schreibrichtung | Schrift |
|---|---|---|---|
| `de-CH` | **Deutsch (Standard, Schweiz)** | LTR | Inter · Lexend Exa |
| `en` | Englisch | LTR | Inter · Lexend Exa |
| `ar` | Arabisch | **RTL** | Noto Sans Arabic · Noto Kufi Arabic |
| `zh-CN` | Chinesisch (vereinfacht) | LTR | Noto Sans SC |
| `ja` | Japanisch | LTR | Noto Sans JP |
| `ko` | Koreanisch | LTR | Noto Sans KR |
| `ru` | Russisch | LTR | Inter (Kyrillisch) |

### 14.2 RTL-Regeln für Arabisch

- Gesamtes Layout spiegeln (`dir="rtl"`).
- Icons mit Richtungsbezug (Pfeile, Chevrons) mitspiegeln.
- Logos, Zahlen und Markennamen **nicht** spiegeln.
- Padding/Margin-Utilities verwenden, die RTL-aware sind (z.B. Tailwind
  `ps-*`/`pe-*` statt `pl-*`/`pr-*`).

### 14.3 Schrift-Stacks pro Sprache

```css
:lang(de), :lang(en), :lang(ru) { font-family: Inter, sans-serif; }
:lang(ar)                       { font-family: "Noto Sans Arabic", sans-serif; }
:lang(zh)                       { font-family: "Noto Sans SC", sans-serif; }
:lang(ja)                       { font-family: "Noto Sans JP", sans-serif; }
:lang(ko)                       { font-family: "Noto Sans KR", sans-serif; }
```

### 14.4 Textlängen

Übersetzungen sind unterschiedlich lang. Als Planungsfaktor:

- Deutsch: **+35 %** gegenüber Englisch.
- Französisch (später): +20 %.
- Arabisch: etwa gleich wie Englisch, aber visuell «breiter».
- CJK: oft kürzer, aber höhere Zeilenhöhe einplanen.

→ Buttons und Karten nie auf englische Minimalbreite zuschneiden.

### 14.5 Keine Gendersonderzeichen

Wir verwenden konsequent **durchgehende Standardsprache ohne Gendersonderzeichen**
(kein `:innen`, kein `*`, kein `_`). Formulierungen bevorzugen: «Gäste»,
«Benutzer», «Bewohner» — als Gattungsbegriffe verwendet.

### 14.6 Schweizer Besonderheiten

- **Kein «ß»** — immer «ss» (gross, Strasse, Fussballstadion).
- Datumsformat: `DD.MM.YYYY`.
- Zeitformat: 24 h mit Doppelpunkt, z.B. `14:30`.
- Zahlenformat: Tausender mit **Apostroph** — `CHF 1'200.50`.
- Währung: `CHF` vor Betrag, nie `SFr.`.

---

## 15. Barrierefreiheit

Die App soll mindestens **WCAG 2.2 Level AA** erfüllen.

### 15.1 Touch-Ziele

- **Minimum 44×44 px** für alle interaktiven Elemente.
- Abstand zwischen zwei Tap-Zielen: mindestens 8 px.

### 15.2 Tastatur

- Alle interaktiven Elemente sind über Tastatur erreichbar.
- Sichtbarer Fokus-Ring: 2 px Calm Jade, 2 px Offset, radius passend zum Element.
- Keine Tastaturfallen in Modals (Escape schliesst).

### 15.3 Screenreader

- Alle Icons bekommen `aria-label` oder `<title>`.
- Widget-Titel sind `<h3>`, nicht `<div>`.
- Statusmeldungen per `aria-live="polite"`.
- Keine rein farblichen Hinweise (zusätzlich Icon oder Text).

### 15.4 Audio und Video

- Balkon-Beschallung hat einen klar sichtbaren Lautstärkeregler und Stop-Button.
- Keine Auto-Play-Sounds beim App-Start.

### 15.5 Text

- Mindestgrösse Fliesstext: 16 px auf Tablet, 15 px auf Smartphone.
- Nie Text in Bilder einbrennen.
- Zoom bis 200 % muss ohne Layout-Bruch funktionieren.

---

## 16. Tone of Voice

### 16.1 Haltung

- **Herzlich, aber nicht kumpelhaft.** Wir siezen auf Deutsch grundsätzlich —
  ausser der Gast wechselt aktiv auf «Du» via Einstellung.
- **Kompetent, aber nicht technisch.** Keine Fachbegriffe ohne Erklärung.
- **Ruhig.** Keine Ausrufezeichen-Gewitter. Maximal ein «!» pro Absatz, meist gar
  keines.
- **Konkret.** «Die Kaffeemaschine steht links der Spüle.», nicht «in der Küche
  finden Sie diverse Geräte».

### 16.2 Beispiele

| Schlecht | Besser |
|---|---|
| «Error 404 — Die Seite wurde nicht gefunden!!!» | «Diese Seite gibt es nicht mehr. Gern zurück zur Übersicht.» |
| «Herzlich willkommen, liebe Gäste*innen!» | «Herzlich willkommen in Ihrer Greencity Oasis.» |
| «Bitte befolgen Sie die nachfolgenden Instruktionen präzise.» | «So funktioniert das Dusch-WC:» |
| «Loading...» | «Einen Moment.» |

### 16.3 Emojis

Sparsam. Ein Emoji pro Widget-Titel ist die Obergrenze. In Gastnachrichten gar
keine.

---

## 17. Design Tokens

Für die Implementierung stellen wir alle Werte als CSS-Variablen bereit. Diese
können 1:1 in eine `tokens.css` oder ein Tailwind-Config-File übernommen werden.

```css
:root {
  /* ---------- Farben — Marke ---------- */
  --color-calm-jade:    #78AA8C;
  --color-warm-gray:    #464B50;
  --color-stone-line:   #C8C3BA;
  --color-warm-mist:    #E7E4DD;
  --color-soft-white:   #F7F7F4;

  /* ---------- Farben — Jade-Skala ---------- */
  --color-jade-50:  #EEF4F0;
  --color-jade-100: #D6E4DB;
  --color-jade-300: #A8C4B4;
  --color-jade-500: #78AA8C;
  --color-jade-700: #5C8A6F;
  --color-jade-900: #2F4A3B;

  /* ---------- Farben — Neutral ---------- */
  --color-neutral-100: #F7F7F4;
  --color-neutral-200: #E7E4DD;
  --color-neutral-300: #C8C3BA;
  --color-neutral-500: #6E7479;
  --color-neutral-700: #464B50;
  --color-neutral-900: #1C1E20;

  /* ---------- Farben — Semantik ---------- */
  --color-success:   #5C8A6F;
  --color-warning:   #D8A864;
  --color-error:     #C96A5A;
  --color-info:      #7A9DB5;

  /* ---------- Glass ---------- */
  --glass-dark:         rgba(28, 30, 32, 0.55);
  --glass-light:        rgba(247, 247, 244, 0.65);
  --glass-border-dark:  rgba(255, 255, 255, 0.12);
  --glass-border-light: rgba(70, 75, 80, 0.10);
  --glass-blur:         24px;

  /* ---------- Typografie ---------- */
  --font-display: "Lexend Exa", "Helvetica Neue", Arial, sans-serif;
  --font-body:    Inter, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono:    "JetBrains Mono", Menlo, Consolas, monospace;

  /* ---------- Spacing ---------- */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* ---------- Radius ---------- */
  --radius-sm:   6px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --radius-xl:  28px;
  --radius-full: 9999px;

  /* ---------- Schatten ---------- */
  --shadow-sm:    0 1px 2px rgba(70, 75, 80, 0.06);
  --shadow-md:    0 4px 12px rgba(70, 75, 80, 0.08);
  --shadow-lg:    0 12px 32px rgba(70, 75, 80, 0.12);
  --shadow-xl:    0 24px 64px rgba(70, 75, 80, 0.18);
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.25),
                  inset 0 1px 0 rgba(255, 255, 255, 0.10);

  /* ---------- Motion ---------- */
  --motion-fast:  150ms;
  --motion-base:  250ms;
  --motion-slow:  400ms;
  --motion-enter: 500ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-smooth:   cubic-bezier(0.16, 1, 0.3, 1);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #1C1E20;
    --color-surface:      #262A2D;
    --color-text:         #F7F7F4;
    --color-text-muted:   #B0B5B8;
    --color-accent:       #A8C4B4;
    --color-border:       rgba(255, 255, 255, 0.08);
  }
}
```

---

## 18. Umsetzung und nächste Schritte

### 18.1 Empfohlener Tech-Stack

- **Framework:** React oder Vue (beides passt, Team-Präferenz entscheidet).
- **Styling:** Tailwind CSS mit Custom-Theme aus den Tokens oben.
- **Icons:** Lucide React / Lucide Vue.
- **Fonts:** Selbst gehostet via `@fontsource/inter`, `@fontsource/lexend-exa`,
  `@fontsource/noto-sans-arabic` etc. (Datenschutz, schneller Ladevorgang).
- **i18n:** `i18next` oder `vue-i18n`, JSON-Sprachdateien im Repo.
- **Animation:** CSS-Transitions als Basis, `framer-motion` / `@vueuse/motion`
  für komplexere Animationen.

### 18.2 Was als Nächstes ansteht

1. **Figma-Datei anlegen** mit allen Tokens als Styles und den Komponenten aus
   Kapitel 11 als Library.
2. **Icon-Set festlegen** (Lucide-Import + eigene SVG für Apartment-Spezifika).
3. **Erste Screens gestalten:** Splash, Startseite Tablet, «Wo ist was»-Karte.
4. **Prototyp in React/Vue**, basierend auf den Tokens.
5. **Test mit echten Gästen** — je eine Sprache pro Testrunde.

---

## 19. Inspirationen und Referenzen

- App-Layout-Inspiration: `Design/screen.webp` (Smart-Home-Dashboard Glassmorphism).
- Print-Inspiration: `Design/print.webp` und
  [Dribbble — Green Home Decor Brochure](https://dribbble.com/shots/26684230-Green-Home-Decor-Brochure-Template).
- Farbstimmung: skandinavische Interior-Magazine, Schweizer Natur im Spätsommer.
- Typografie: [Lexend Exa](https://fonts.google.com/specimen/Lexend+Exa) · [Inter](https://fonts.google.com/specimen/Inter) · [Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic) · [Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC).

---

## 20. Versionierung

| Version | Datum | Änderung |
|---|---|---|
| **1.0** | 19.04.2026 | Erstfassung: Farben, Typografie, Logo, Komponenten, Tokens, Mehrsprachigkeit, Barrierefreiheit. |

> Änderungen am Styleguide bitte immer mit einem PR, der sowohl das Markdown-Dokument
> als auch die Tokens (`tokens.css`) aktualisiert. So bleibt Design und Code synchron.
