- Ich plane eine App für Android Tablets im Querformat. Sie soll mit den https://m3.material.io/ Komponenten und Custom glass morphism component: `GlassCard.kt` erstellt werden.
- Das Layout/Raster soll aussehen wie https://dribbble.com/shots/26979063-Smart-Home-Dashboard-UI-Modern-Home-Automation
- Das Design soll aber hell sein, wie https://dribbble.com/shots/22405764-Food-Delivery-Material-You-m3-Design-system

# Farben
Unsere Farben sind 'Calm Jade' #78AA8C (Hauptfarbe) | 'Warm Gray' #464B50 | 'Stone Line' #C8C3BA | 'Warm Mist' #E7E4DD | 'Soft White' #F7F7F4

# Logo
Im Anhang

# UI & Design Requirements
- Material 3 dynamic theming (light + dark mode support)
- Custom glass morphism component: `GlassCard.kt`
  - Background: semi-transparent white/dark with blur effect using `RenderEffect` (API 31+) and fallback for lower APIs
  - Subtle border: 1dp with 20% white alpha
  - Rounded corners: 24dp
  - Elevation shadow
- Tablet-optimized landscape-oriented layout

# Struktur der Startseite
## Header
- Links begrüssung mit Uhrzeit und Datum
- in der Mitte die Selektion wie im Layout raster, aber 'Dining room' mit 'Kitchen' ersetzen. und als Buttons mit Icon und Text
- Rechts Sprachauswahl und das logo

## Kacheln

### 1.1 Webcam
Diese Kachel soll die Breite von 2 Kacheln haben. Webcam vom Üetliberg auf die Stadt Zürich - life stream im Widget. https://uetliberg.roundshot.com/#/

### 1.2 Wetter
Wetterbericht heute mit button für 3-Tage vorschau

### 1.3 Balkon Beschallung
Auswahl von Sommerwald, Meeresrauschen mit Toggle Switch Tag/Nacht und Lautstärkewahl. Hinweis, dass die Device auf dem Balkon eingeschaltet sein muss.

### 2.1 Fahrplan
Zug, Bus, Schiff, Seilbahn als Icon zum Auswählen. Zug default. Aktuelle Abfahrszeiten Richtung Zürich ab aktuellem Zeitpunkt bis Tagesende. Scrollbar, wenn mehr als 3 Abfahrten.

### 2.2 Events
Wie Wetterbericht, heute mit button für 3-Tage vorschau

### 2.3 Kontakt
Host kontaktieren via Telegram 

### 2.4 WLAN
QR-Code des WLAN zum einscannen
