# Domain & Facade Contract (SPA MVP, read-side)

**Scope:** `spa-app`  
**Status:** canonical reference for EPIC-00 integrations  
**Related:** `docs/epics/EPIC-00-domain-and-facade.md`, `spa-app/docs/issue-intake-data-model.md`

---

## 1. Purpose

This document defines stable contracts for the SPA domain and service facade so adapters can be implemented without reverse-engineering code.

MVP boundary:
- SPA is **read-side only**.
- Issue creation flow is outside SPA (`Custom GPT -> Edge ingest`).
- DTOs `CreateIssueCommand/CreateIssueResult` are documented as ingest contracts, not SPA runtime API methods.

---

## 2. Domain Types

Source of truth in code: `spa-app/src/domain/types.js`.

### 2.1 `Issue`

Required:
- `id: string`
- `type: IssueType`
- `title: string`
- `status: IssueStatus`
- `labels: string[]`

Optional:
- `description?: string`
- `arweave_txid?: string`
- `image_txid?: string`
- `image_hash?: string`
- `created_at?: string`

### 2.2 `IssueStatus`

- `NEW`
- `VERIFIED`
- `IN_REVIEW`
- `ARCHIVED`

### 2.3 `IssueType`

- `complaint`
- `observation`
- `absurdity`
- `system_bug`

### 2.4 `IssueIntakePayload` (intake source model)

Primary source: `spa-app/docs/issue-intake-data-model.md`.

Key fields:
- `user.first_name`, `user.last_name`
- `problem_categories: string[]`
- `description: string`
- `location.details: string`
- `media_files?: { type: 'image' | 'video', url: string }[]`
- `time?: { type: IssueTimeType, value: unknown }`
- `severity: 'low' | 'medium' | 'high' | 'critical'`
- `impact_estimation: 'personal' | 'city/town' | 'state' | 'country' | 'Earth'`
- `problem_status: 'ongoing' | 'resolved' | 'worsened'`
- `related_events?: string[]`
- `metadata?: { source: string, tokenized: boolean }`

### 2.5 `CreateIssueCommand` (ingest-side command DTO)

- `title: string`
- `description?: string`
- `type: IssueType`
- `labels: string[]`
- `image?: { kind: 'url' | 'blob', value: string }`
- `intake_payload?: IssueIntakePayload`

### 2.6 `CreateIssueResult` (ingest-side result DTO)

Minimum fields:
- `issue_id: string`
- `content_hash: string`
- `duplicate: boolean`
- `existing_issue_id?: string`
- `arweave_txid?: string`
- `image_txid?: string`
- `tx_hash?: string`
- `status: string`

Semantics:
- `duplicate = true` means idempotent dedup hit; `existing_issue_id` may be returned.
- `content_hash` is the deterministic identity anchor for dedup decisions.

---

## 3. Mapping: `IssueIntakePayload -> CreateIssueCommand`

Recommended normalization path:
1. Validate intake payload.
2. Normalize aliases for time type (`exact_date -> exact`, `approximate_period -> approx_period`).
3. Produce command DTO for ingest boundary.

Typical mapping:
- `command.title` <- derived from intake summary/title policy
- `command.description` <- `intake.description`
- `command.labels` <- `intake.problem_categories` (plus optional enrich labels)
- `command.intake_payload` <- full normalized intake object

This mapping exists for ingest integrations, not for local SPA submit.

---

## 4. Repository Contract (SPA runtime)

Source of truth: `spa-app/src/domain/IssueRepository.js`.

`IssueRepository` is read-only in MVP and defines:
- `getIssues(options?) -> Promise<Issue[]>`
- `getIssue(id) -> Promise<Issue | null>`

`createIssue` is intentionally absent from SPA repository contract.

---

## 5. Service Facade Contract (SPA runtime)

Source of truth: `spa-app/src/services/issueService.js`.

Facade methods:
- `getIssues(options?) -> Promise<Issue[]>`
- `getIssue(id) -> Promise<Issue | null>`

Creation APIs are out of scope for SPA runtime in MVP.

---

## 6. Usage Example

```js
import { createIssueService } from '../src/services/issueService.js'
import { createInMemoryIssueRepository } from '../src/repositories/InMemoryIssueRepository.js'

const repository = createInMemoryIssueRepository()
const service = createIssueService(repository)

const items = await service.getIssues({ status: 'NEW' })
const item = await service.getIssue('DE-001')
```

Default dev wiring also exists:

```js
import { issueService } from '../src/services/issueService.js'

const items = await issueService.getIssues()
```

---

## 7. Integration Notes for Other Epics

- **EPIC-04 / EPIC-06:** implement read adapters that satisfy `IssueRepository` (`getIssues/getIssue`).
- **EPIC-09 / EPIC-10 / EPIC-11:** use `IssueIntakePayload`, `CreateIssueCommand`, `CreateIssueResult` as ingest boundary DTOs.
- Keep runtime split explicit: SPA read-side API vs ingest/write-side contracts.
