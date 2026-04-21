# Farben

* Calm Jade #78AA8C
Marke, Logo, Überschriften
* Warm Gray #464B50
* Stone Line #C8C3BA
* Warm Mist #E7E4DD
* Soft White #F7F7F4

# Logo

## Klein

\[PNG]](Design\\Logo klein.png) / \[SVG](Design\\Logo klein.svg)

## Gross

\[PNG]](Design\\Logo gross.png) / \[SVG](Design\\Logo gross.svg)

# Design System
https://m3.material.io/ 
https://www.figma.com/community/file/1035203688168086460 
https://dribbble.com/tags/material-3 
https://m3.material.io/blog/building-with-m3-expressive 

# Development
https://developer.android.com/studio 

# Inspirationen

* [Inspiration für die App Struktur](https://dribbble.com/shots/26979063-Smart-Home-Dashboard-UI-Modern-Home-Automation) `Design\screen aufbau.webp`
* [Inspiration für die Farbgebung/visueller Eindruck](https://dribbble.com/shots/22405764-Food-Delivery-Material-You-m3-Design-system) - aber mit unseren Farben umgesetzt.

https://claude.ai/chat/87ab3142-17e6-4847-a5cf-eba48600f207 

Copilot Prompt für Kotlin + Jetpack Compose + Material 3 Setup
```
You are an expert Android developer. Set up a production-ready Android tablet app project in this workspace with the following stack and requirements:

## Stack
- Language: Kotlin (latest stable)
- UI Framework: Jetpack Compose with Material 3
- Min SDK: 26 (Android 8.0), Target SDK: 35
- Build System: Gradle with Kotlin DSL (build.gradle.kts)
- Architecture: MVVM + UiState pattern

## Project Structure
Create the following package structure under `app/src/main/java/com/<appname>/`:
- `ui/theme/` – Theme, Color, Type, Shape definitions
- `ui/components/` – Reusable Composables (GlassCard, etc.)
- `ui/screens/` – Screen Composables
- `viewmodel/` – ViewModels
- `data/` – Repository and data layer (placeholder)

## UI & Design Requirements
- Material 3 dynamic theming (light + dark mode support)
- Custom glass morphism component: `GlassCard.kt`
  - Background: semi-transparent white/dark with blur effect using `RenderEffect` (API 31+) and fallback for lower APIs
  - Subtle border: 1dp with 20% white alpha
  - Rounded corners: 24dp
  - Elevation shadow
- Tablet-optimized layouts:
  - Use `WindowSizeClass` for adaptive layouts
  - Two-pane layout support via `ListDetailPaneScaffold` or manual split at w600dp+
- Custom typography scale defined in `Type.kt`
- Custom color palette in `Color.kt` with primary, secondary, surface, and glass surface tokens

## Dependencies to add in build.gradle.kts
- `androidx.compose.bom` (latest stable)
- `androidx.activity:activity-compose`
- `androidx.lifecycle:lifecycle-viewmodel-compose`
- `androidx.navigation:navigation-compose`
- `androidx.compose.material3:material3`
- `androidx.compose.material3:material3-window-size-class`
- `androidx.compose.ui:ui-tooling-preview`
- `androidx.core:core-splashscreen`

## Deliverables
1. Full `build.gradle.kts` (app-level) with all dependencies and Compose compiler options
2. `Theme.kt` with MaterialTheme setup, light/dark ColorScheme
3. `Color.kt` with full color palette
4. `Type.kt` with custom typography
5. `GlassCard.kt` – reusable Composable with blur/glass effect
6. `MainActivity.kt` with edge-to-edge support and theme wrapper
7. A demo `HomeScreen.kt` that showcases the GlassCard component on a gradient background
8. `HomeViewModel.kt` with a simple UiState example
9. Update `AndroidManifest.xml` for landscape + tablet support (screen size declarations)

## Code Quality Rules
- All Composables have `@Preview` annotations with tablet-sized device spec
- All files have proper package declarations
- No hardcoded strings – use string resources where appropriate
- Compose compiler metrics enabled in build.gradle.kts
- Enable `strongSkipping` mode in Compose compiler options

Start by reading the existing project structure, then create or modify all necessary files. Do not ask for confirmation between steps – complete the full setup autonomously.
```

Copilot Prompt für Notion Layer (erst wenn der API Key vorhandenist!)
```
Add a Notion API integration layer to the existing project:

## Notion API Client
- Use Ktor as HTTP client with kotlinx.serialization
- Base URL: https://api.notion.com/v1/
- Required headers: Authorization: Bearer <token>, Notion-Version: 2022-06-28
- Store the API token securely via EncryptedSharedPreferences, not hardcoded

## Data Layer – create in `data/notion/`:
- `NotionApiClient.kt` – Ktor client setup with headers
- `NotionRepository.kt` – Repository with suspend functions:
  - `queryDatabase(databaseId: String, filter: JsonObject? = null): List<JsonObject>`
  - `getPage(pageId: String): JsonObject`
  - `createPage(databaseId: String, properties: JsonObject): JsonObject`
  - `updatePage(pageId: String, properties: JsonObject): JsonObject`
- `NotionMapper.kt` – Helper to extract typed values from Notion property objects (title, rich_text, number, select, date, checkbox)

## ViewModel Integration
- Extend HomeViewModel with a sample call to NotionRepository
- Use UiState with Loading / Success / Error states
- Use viewModelScope + coroutines

## Security
- Read API token from EncryptedSharedPreferences
- Provide a `TokenSetupScreen.kt` Composable where the token can be entered on first launch and saved encrypted

Use Notion API version 2022-06-28. Handle HTTP errors gracefully with a sealed Result class.
```