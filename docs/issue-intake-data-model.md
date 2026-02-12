# Issue Intake Data Model (from GPT instructions)

**Статус:** canon for intake payload  
**Источник:** `GPT-UI/instructions/dogecomplaints-gpt-instructions.pdf`  
**Назначение:** опорная модель для доменных типов EPIC-00 и фасада `createIssue()`

---

## 1) Scope

Этот документ описывает **модель входных данных для приёма issues**, которую формирует Custom GPT до передачи в API/адаптеры.

Он фиксирует:

- поля и типы intake payload;
- правила валидации из GPT-инструкций;
- совместимость профилей (GPT JSON, OpenAPI/webhook, legacy gateway envelope).

---

## 2) Canonical Intake Object (GPT layer)

```json
{
  "user": {
    "first_name": "John",
    "last_name": "Doe"
  },
  "problem_categories": ["infrastructure", "road safety", "storm damage"],
  "description": "Detailed issue text...",
  "location": {
    "details": "Los Angeles"
  },
  "media_files": [
    { "type": "image", "url": "https://example.com/image1.jpg" },
    { "type": "video", "url": "https://example.com/video1.mp4" }
  ],
  "time": {
    "type": "date_range",
    "value": {
      "start_date": "2025-01-10",
      "end_date": "2025-01-15"
    }
  },
  "severity": "high",
  "impact_estimation": "city/town",
  "problem_status": "ongoing",
  "related_events": ["#storm2025", "#LAStorm"],
  "metadata": {
    "source": "GPT-system",
    "tokenized": false
  }
}
```

---

## 3) Field Model and Validation

### 3.1 user

- `user.first_name`: string, alphabetic, short, required
- `user.last_name`: string, alphabetic, short, required

### 3.2 problem_categories

- `problem_categories`: `string[]`, 2-5 suggested by GPT then confirmed/edited by user
- expected for aggregation/statistics

### 3.3 description

- `description`: string, required
- max length from instructions: 5000 chars
- must preserve user wording (no semantic rewriting)

### 3.4 location

- `location.details`: string, required
- max length: 250 chars

### 3.5 media_files

- optional array of objects:
  - `type`: `"image" | "video"`
  - `url`: valid URI

### 3.6 time

GPT instructions specify richer variants:

- `exact`
- `date`
- `date_range`
- `time_interval`
- `datetime_range`
- `approx_period`

`value` format depends on `type`.

### 3.7 severity

- enum: `low | medium | high | critical`

### 3.8 impact_estimation

- enum: `personal | city/town | state | country | Earth`

### 3.9 problem_status

- enum: `ongoing | resolved | worsened`

### 3.10 related_events

- `string[]`, hashtags expected
- each item should start with `#`
- duplicates should be removed

### 3.11 metadata

- object, currently:
  - `source: string` (e.g. `GPT-system`)
  - `tokenized: boolean`

---

## 4) Transport Profiles and Compatibility

### Profile A — GPT canonical (primary)

- object as in section 2.
- suitable for domain/facade normalization.

### Profile B — OpenAPI snippet in GPT instructions

Observed differences in the same source:

- `time.type` in OpenAPI snippet appears as:
  - `exact_date`
  - `date_range`
  - `approximate_period`
- while earlier instruction section uses:
  - `exact`, `date`, `date_range`, `time_interval`, `datetime_range`, `approx_period`

### Profile C — Legacy gateway envelope (current backend)

Current gateway endpoint expects wrapper:

```json
{ "complaint": { /* payload */ } }
```

Source confirmation:

- `doge-complaints-gateway/app/services/submit_complaint.py`
- `doge-complaints-gateway/complaint-input-demo.json`

---

## 5) Normalization Rule for SPA Domain (EPIC-00)

Для доменной модели SPA рекомендуется:

1. хранить **canonical internal model** (superset of GPT fields);
2. поддерживать mapping adapters:
   - GPT payload -> domain model;
   - domain model -> backend envelope `{ complaint: ... }` (если нужен legacy path);
   - domain model -> Arweave/Broadcast payloads (EPIC-04/05).

### Time normalization (required)

Normalize all incoming aliases to canonical `IssueTimeType`:

- `exact` and `exact_date` -> `exact`
- `approx_period` and `approximate_period` -> `approx_period`
- preserve `date`, `date_range`, `time_interval`, `datetime_range`

---

## 6) What EPIC-00 must take from this model

- Domain types are based on sections 2-3.
- Repository/facade contracts accept normalized model.
- TDD tests for S00-1 must include at least:
  - severity enum validation;
  - impact_estimation enum validation;
  - problem_status enum validation;
  - time alias normalization cases.

