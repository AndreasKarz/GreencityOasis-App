# Notion API – GreencityOasis

## Token-Setup (einmalig im Browser)

### 1. Integration erstellen

1. **https://www.notion.so/my-integrations** öffnen
2. **+ New integration** klicken
3. Name: `GreencityOasis Android`
4. Associated workspace: eigenen Workspace wählen
5. Type: **Internal**
6. Capabilities: `Read content`, `Update content`, `Insert content`
7. **Submit** → Token wird generiert (`secret_xxx...` oder `ntn_xxx...`)
8. Token kopieren und sicher ablegen

### 2. Datenbanken freigeben

Für **jede** Datenbank, die die App lesen oder schreiben soll:

1. Datenbank in Notion öffnen
2. Oben rechts **...** → **Connections**
3. **Connect to** → `GreencityOasis Android` auswählen
4. Bestätigen

> Ohne diesen Schritt retourniert die API `object_not_found`, auch wenn der Token korrekt ist.

### 3. Datenbank-ID finden

- Datenbank in Notion öffnen → URL kopieren
- Format: `https://www.notion.so/<workspace>/<DATABASE_ID>?v=<VIEW_ID>`
- Die `DATABASE_ID` ist der 32-stellige Hash zwischen Workspace und `?v=`
- Für API-Calls mit Bindestrichen formatieren: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

## API-Grundlagen

### Base URL

```
https://api.notion.com/v1/
```

### Pflicht-Header bei jedem Request

```
Authorization: Bearer <token>
Notion-Version: 2022-06-28
Content-Type: application/json
```

### Wichtigste Endpoints

| Method | Endpoint | Zweck |
|---|---|---|
| POST | `/databases/{database_id}/query` | Einträge einer DB lesen |
| GET | `/pages/{page_id}` | Einzelne Seite lesen |
| POST | `/pages` | Neue Seite in DB erstellen |
| PATCH | `/pages/{page_id}` | Seite aktualisieren |
| GET | `/databases/{database_id}` | DB-Schema lesen |

## Request-Beispiele

### Datenbank abfragen (ohne Filter)

```http
POST /v1/databases/{database_id}/query
{
  "page_size": 100
}
```

### Mit Filter (Beispiel: Checkbox = true)

```json
{
  "filter": {
    "property": "Done",
    "checkbox": { "equals": true }
  },
  "sorts": [
    { "property": "Created", "direction": "descending" }
  ]
}
```

### Neue Seite erstellen

```http
POST /v1/pages
{
  "parent": { "database_id": "xxx-xxx-xxx" },
  "properties": {
    "Name": { "title": [{ "text": { "content": "Neuer Eintrag" } }] },
    "Status": { "select": { "name": "Offen" } }
  }
}
```

## Notion Property Types (wichtigste)

| Typ | JSON-Struktur zum Lesen |
|---|---|
| `title` | `properties.Name.title[0].plain_text` |
| `rich_text` | `properties.Desc.rich_text[0].plain_text` |
| `number` | `properties.Count.number` |
| `select` | `properties.Status.select.name` |
| `multi_select` | `properties.Tags.multi_select[].name` |
| `date` | `properties.Due.date.start` |
| `checkbox` | `properties.Done.checkbox` |
| `url` | `properties.Link.url` |
| `relation` | `properties.Rel.relation[].id` |

## Rate Limits

- **3 Requests pro Sekunde** pro Integration
- Bei Überschreitung: HTTP `429` mit `Retry-After`-Header
- Empfehlung: Client-seitig throttlen, bei `429` mit exponentiellem Backoff retryen

## Pagination

Grosse Datenbanken liefern nicht alle Einträge auf einmal:

```json
{
  "results": [...],
  "has_more": true,
  "next_cursor": "xyz..."
}
```

Nächste Seite: erneut POST mit `"start_cursor": "xyz..."`

## Häufige Fehler

| HTTP | `code` | Ursache |
|---|---|---|
| 401 | `unauthorized` | Token falsch oder fehlt |
| 404 | `object_not_found` | DB/Page nicht mit Integration geteilt |
| 400 | `validation_error` | Property-Name falsch, Typ stimmt nicht |
| 429 | `rate_limited` | Zu viele Requests |
| 409 | `conflict_error` | Gleichzeitige Änderung |

## Security (App-seitig)

- Token **niemals** in Git committen
- Token **niemals** hardcoden
- Speicherung via `EncryptedSharedPreferences` (siehe `data/storage/`)
- Bei Verdacht auf Leak: Integration in Notion neu generieren → alter Token wird sofort ungültig

## Notion-Version

Immer `Notion-Version: 2022-06-28` senden. Neuere Versionen existieren, aber diese ist stabil und breit dokumentiert. Upgrade nur bewusst und nach Test.

## Weiterführende Referenzen

- Offizielle API-Docs: https://developers.notion.com/reference
- Property-Typen im Detail: https://developers.notion.com/reference/property-value-object
- Filter-Syntax: https://developers.notion.com/reference/post-database-query-filter
