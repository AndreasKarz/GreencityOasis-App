# Architecture – GreencityOasis

## Stack

- **Sprache:** Kotlin (latest stable)
- **UI:** Jetpack Compose + Material 3
- **Min SDK:** 26 / **Target SDK:** 35
- **Build:** Gradle Kotlin DSL (`build.gradle.kts`)
- **HTTP:** Ktor Client (Android Engine)
- **Serialisierung:** kotlinx.serialization
- **Async:** Kotlin Coroutines + Flow
- **DI:** Manuell via `AppContainer` (Service Locator Pattern) – bewusst ohne Hilt/Koin für Einfachheit

## Architektur-Pattern: MVVM + UiState

```
UI (Compose)  ──►  ViewModel  ──►  Repository  ──►  API Client
   ▲                  │                │               │
   │                  ▼                ▼               ▼
   └──── UiState ◄── Flow ◄──── Result<T> ◄──── Notion API
```

## Schichten

### 1. UI Layer (`ui/`)
- **Composables only** – keine Business-Logik
- State kommt als `UiState` vom ViewModel via `collectAsStateWithLifecycle()`
- Events gehen als Funktionsaufrufe zurück ans ViewModel
- Tablet-adaptive Layouts via `WindowSizeClass`

### 2. ViewModel Layer (`viewmodel/`)
- Hält `StateFlow<UiState>`
- Ruft Repository in `viewModelScope` auf
- Übersetzt `Result<T>` in `UiState.Success / Error / Loading`

### 3. Data Layer (`data/`)
- **Repository:** Einziger Einstiegspunkt für ViewModels
- **ApiClient:** Ktor-Setup, Headers, Base URL
- **Mapper:** Notion-JSON → Domain-Modelle
- **Storage:** EncryptedSharedPreferences für Token

## UiState Pattern

```kotlin
sealed interface UiState<out T> {
    data object Loading : UiState<Nothing>
    data class Success<T>(val data: T) : UiState<T>
    data class Error(val message: String) : UiState<Nothing>
}
```

## Result Pattern (Data Layer)

```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val exception: Throwable) : Result<Nothing>()
}
```

## Package-Struktur

```
com.andreas.greencityoasis/
├── ui/
│   ├── theme/         # Theme, Color, Type, Shape
│   ├── components/    # Wiederverwendbare Composables (GlassCard, etc.)
│   └── screens/       # Screen-Composables (HomeScreen, etc.)
├── viewmodel/         # ViewModels + UiState-Definitionen
├── data/
│   ├── notion/        # NotionApiClient, NotionRepository, NotionMapper
│   ├── storage/       # EncryptedSharedPreferences-Wrapper
│   └── model/         # Domain-Modelle
└── di/                # AppContainer (Service Locator)
```

## Entscheidungen & Begründungen

| Entscheidung | Grund |
|---|---|
| Jetpack Compose statt XML | Moderne, deklarative UI, beste AI-Unterstützung |
| Manueller DI statt Hilt | Weniger Boilerplate, ausreichend für App-Grösse |
| Ktor statt Retrofit | Multiplatform-fähig, Kotlin-nativ, weniger Setup |
| kotlinx.serialization statt Moshi/Gson | Offizieller Kotlin-Standard, typsicher |
| EncryptedSharedPreferences | Sichere Token-Ablage ohne grosse Dependencies |
| Ein Repository pro Bounded Context | Klare Trennung, testbar |

## Fehlerbehandlung

- **Data Layer:** wirft nicht, retourniert `Result<T>`
- **ViewModel:** mappt `Result.Error` auf `UiState.Error` mit benutzerfreundlicher Nachricht
- **UI:** zeigt Error-State mit Retry-Button

## Threading

- **UI:** Main Thread (Compose)
- **ViewModel:** `viewModelScope` (Main, wechselt bei Bedarf)
- **Network:** Ktor nutzt intern `Dispatchers.IO`
- **Regel:** Keine `GlobalScope`, keine blockierenden Calls auf Main

## Tablet-Spezifika

- `WindowSizeClass` via `calculateWindowSizeClass(activity)` in `MainActivity`
- Layouts reagieren auf `Compact / Medium / Expanded` Width
- `ListDetailPaneScaffold` für Master-Detail ab Medium+
- Edge-to-Edge via `enableEdgeToEdge()` in `MainActivity`
