# STORY-SPA-ES — Каталог иконок/визуалов (Early Signal / Pre-Cluster)

> Референс для вёрстки: functional icons + brand/ETM reuse + Help mascot для M136–M140.  
> Mockup SSOT: [`docs/UX/mockups/early-discovery-dashboard/`](../../../UX/mockups/early-discovery-dashboard/) · intake [ADMIN-ESD-02](ADMIN-ESD-02-ux-mockup-intake.md).  
> **NEW delivered (2026-08-17):** 15 `ic-*` ON DISK via Lucide `catalog: es` + Help mascot ON DISK. Stories wire these paths; L10N/UI stories are not blocked by missing binaries.  
> Wave: [`SPA-CATALOG-IMAGE-WAVE.md`](../../../UX/SPA-CATALOG-IMAGE-WAVE.md) · manifest [`icon-manifest.yaml`](../../../../scripts/icons/icon-manifest.yaml) `catalog: es`.  
> **Дедуп:** plan catalogs [ID-12](../identity-auth/STORY-SPA-ID-12-icon-assets.md) · [CAB](../cabinet/STORY-SPA-CAB-icon-assets.md) · [EPIC-SPA-04](../icons/EPIC-SPA-04-icon-assets.md) · [PH](../public-home/STORY-SPA-PH-icon-assets.md) + пути уже wired в spa UI. Master: [`ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md).  
> **Inventory date:** 2026-08-16 (PNG artboards read). **Disk verify:** 2026-08-17 (ls/Pillow).

**Traceability:** ES-01…05 · [ADMIN-ESD-03](ADMIN-ESD-03-icon-assets-catalog.md).

## Конвенции

### Functional icons (`ic-*`)

| Param | Value |
|-------|-------|
| Directory | [`public/icons/early-signal-dashboard/`](../../../../public/icons/early-signal-dashboard/) |
| Runtime | `/icons/early-signal-dashboard/ic-<kebab>.png` |
| Format | PNG RGBA, **256×256**, ~15% padding, no text/frame/shadow |
| Style | thin stroke ~2px, Lucide-like, dark civic-tech UI |
| Colors | нейтраль **#f5f7fa**; акцент **#F5A623** / Signal Orange where needed |

### Brand / ETM / illustration

- Logo: `public/assets/DOGEstonia-logo-*` (reuse).
- ETM bands: PH `etm-*` (reuse).
- Help mascot: disk `public/assets/es-help-mascot.png` · runtime `/assets/es-help-mascot.png` (illustration — not Lucide).

### Layers (не путать)

| Layer | Handling |
|-------|----------|
| A Functional `ic-*` | §NEW / §Reuse |
| B Brand logo | §Reuse assets |
| C Mascot | §NEW illustration |
| D ETM textile | §Reuse PH |
| E Data viz (pulse/network/density) | §Viz — **не** `ic-*` PNG |
| F Artboard chrome (devices, A/B/C letters) | docs-only — skip |

---

## Inventory by artboard

### M136 — ESD-D Early Signal Discovery Composition · ES-01

| Graphic | Layer | Disposition | Path / note |
|---------|-------|-------------|-------------|
| Shield dog logo (header/footer) | Brand | **Reuse** | `/assets/DOGEstonia-logo-big.png` · horizontal in Header |
| Folk geometric band | ETM | **Reuse** | `/icons/public-home/etm-floral-band.png` (+ PH `etm-*`) |
| Submit CTA external-link | ic | **Reuse** | `/icons/public-home/ic-external-link.png` (wired Board/Header) |
| Load error ! | ic | **Reuse** | `/icons/story-handoff/ic-cloud-error.png` (wired BoardPage) |
| Try again refresh | ic | **Reuse** | `/icons/story-handoff/ic-auto-resubmit.png` |
| Loading skeleton / dashed circles | Viz/CSS | **Not ic-*** | CSS skeleton |
| Network Pulse constellation A–D | Viz | **Not ic-*** | §Viz |
| Picture-forming node field | Viz | **Not ic-*** | §Viz |
| Emerging card mini-cluster | Viz + marker | Marker → **NEW** | `/icons/early-signal-dashboard/ic-emerging-marker.png` · full cluster = Viz |
| What’s Missing: Areas pin | ic | **Reuse** | `/icons/story-handoff/ic-field-location.png` |
| What’s Missing: Languages chat | ic | **NEW** | `/icons/early-signal-dashboard/ic-gap-languages.png` |
| What’s Missing: Groups people | ic | **Reuse** | `/icons/identity/ic-profile-conflict.png` |
| What’s Missing: Other ellipsis | ic | **NEW** | `/icons/early-signal-dashboard/ic-gap-ellipsis.png` |
| Help strip people-circle | ic | see M139 Help | share / together / mascot |
| Sidebar check / go-to-board / my-stories | ic | **Reuse** | `/icons/story-handoff/ic-success-check.png` · `/icons/story-handoff/ic-go-to-board.png` · `/icons/story-handoff/ic-my-stories.png` |
| Device outlines | docs | **Skip** | artboard only |

### M137 — ESD-P Network Pulse · ES-02

| Graphic | Layer | Disposition | Path / note |
|---------|-------|-------------|-------------|
| Brand + folk band | Brand/ETM | **Reuse** | same as M136 |
| Pulse header starburst (gold/green) | ic + Viz | **NEW** compact mark | `/icons/early-signal-dashboard/ic-pulse-mark.png`; large field = §Viz |
| Particle scatter P-A / P-B | Viz | **Not ic-*** | §Viz |
| Mode density A–D key | Viz | **Not ic-*** | §Viz |
| Metric Stories (speech) | ic | **NEW** | `/icons/early-signal-dashboard/ic-pulse-stories.png` |
| Metric Contributors (person) | ic | **Reuse** | `/icons/user-cabinet/ic-field-role.png` (AccountControl) |
| Metric Areas (pin) | ic | **Reuse** | `/icons/story-handoff/ic-field-location.png` |
| Metric Activity (active gauge) | ic | **NEW** | `/icons/early-signal-dashboard/ic-pulse-activity.png` — **not** CAB `ic-story-activity` (clipboard ledger) |
| Listening info box | ic | **Reuse** | `/icons/story-handoff/ic-info.png` |
| External / success / error legend | ic | **Reuse** | `/icons/public-home/ic-external-link.png` · `/icons/story-handoff/ic-success-check.png` · `/icons/story-handoff/ic-cloud-error.png` |
| Database cylinder (sidebar) | docs | **Skip** | meta only |

### M138 — ESD-E Emerging Signals · ES-03

| Graphic | Layer | Disposition | Path / note |
|---------|-------|-------------|-------------|
| Brand + folk band | Brand/ETM | **Reuse** | same |
| Density clusters provisional/strengthen/weaken/disappear | Viz | **Not ic-*** | §Viz |
| Card leading marker | ic | **NEW** | `/icons/early-signal-dashboard/ic-emerging-marker.png` |
| Empty dotted magnifier | ic | **NEW** | `/icons/early-signal-dashboard/ic-emerging-empty.png` (soft empty; not identity search UX) |
| Ladder Story bubble | ic | **Reuse NEW** | `/icons/early-signal-dashboard/ic-pulse-stories.png` |
| Ladder Issue L3 shield | Brand | **Reuse** | `/assets/DOGEstonia-logo-big.png` (prefer over inventing crest) |
| External / check / X / info | ic | **Reuse** | `/icons/public-home/ic-external-link.png` · `/icons/story-handoff/ic-success-check.png` · `/icons/story-handoff/ic-info.png` |

### M139 — ESD-C Coverage Trio · ES-04 · **mascot**

| Graphic | Layer | Disposition | Path / note |
|---------|-------|-------------|-------------|
| Brand + folk band | Brand/ETM | **Reuse** | same |
| Picture-forming network + topic color dots | Viz | **Not ic-*** | §Viz + CSS legend |
| Gap Areas pin | ic | **Reuse** | `/icons/story-handoff/ic-field-location.png` |
| Gap Languages | ic | **NEW** | `/icons/early-signal-dashboard/ic-gap-languages.png` |
| Gap Groups | ic | **Reuse** | `/icons/identity/ic-profile-conflict.png` |
| Gap Themes building | ic | **Reuse** | `/icons/story-handoff/ic-field-institution.png` |
| Narrow chevron | ic | **Reuse** | `/icons/public-home/ic-chevron-right.png` (IssueCard) |
| **Shiba hoodie character** | Illustration | **NEW** | disk `public/assets/es-help-mascot.png` · runtime `/assets/es-help-mascot.png` — continuity [`docs/UX/references/DogeEstonia Character.png`](../../../UX/references/DogeEstonia%20Character.png); wave Contour B |
| Help mini share/story | ic | **NEW** | `/icons/early-signal-dashboard/ic-help-share.png` |
| Help mini eye | ic | **Reuse** | `/icons/identity/ic-eye.png` |
| Help mini network/together | ic | **NEW** | `/icons/early-signal-dashboard/ic-help-together.png` |
| Submit external | ic | **Reuse** | `/icons/public-home/ic-external-link.png` |
| Lock secure connection | ic | **Reuse** | `/icons/story-handoff/ic-lock.png` |
| Process diagram 5 glyphs / devices | docs | **Skip** | pedagogy |

### M140 — ESD-I Issue Continuum + Residual Discovery · ES-05

| Graphic | Layer | Disposition | Path / note |
|---------|-------|-------------|-------------|
| Brand + folk band | Brand/ETM | **Reuse** | same |
| Nav globe / user / search | ic | **Reuse** | `/icons/identity/ic-globe.png` · `/icons/user-cabinet/ic-field-role.png` · `/icons/identity/ic-search.png` |
| Issue topic: transit (bus) | ic | **NEW** | `/icons/early-signal-dashboard/ic-issue-topic-transit.png` |
| Issue topic: greenspace (tree) | ic | **NEW** | `/icons/early-signal-dashboard/ic-issue-topic-greenspace.png` |
| Issue topic: lighting | ic | **NEW** | `/icons/early-signal-dashboard/ic-issue-topic-lighting.png` |
| Issue topic: waste | ic | **NEW** | `/icons/early-signal-dashboard/ic-issue-topic-waste.png` |
| Issue topic: housing | ic | **NEW** | `/icons/early-signal-dashboard/ic-issue-topic-housing.png` |
| Rail Emerging sparkle | ic | **Reuse NEW** | `/icons/early-signal-dashboard/ic-emerging-marker.png` |
| Rail What’s Missing | ic | **NEW** | `/icons/early-signal-dashboard/ic-rail-missing.png` |
| Rail Help | ic | **Reuse NEW** | `/icons/early-signal-dashboard/ic-help-share.png` (same affordance family) |
| View all / Submit external | ic | **Reuse** | `/icons/public-home/ic-external-link.png` |
| Load spinner (optional) | ic | **Reuse** | `/icons/story-handoff/ic-spinner.png` |
| Error + Try again | ic | **Reuse** | `/icons/story-handoff/ic-cloud-error.png` · `/icons/story-handoff/ic-auto-resubmit.png` |
| Density continuum dots | Viz | **Not ic-*** | §Viz |
| Issue crest | Brand | **Reuse** | `/assets/DOGEstonia-logo-big.png` |

---

## §NEW functional — `public/icons/early-signal-dashboard/`

| # | Смысл | Mockup | Story | file | disk | runtime | lucide_id | color | status |
|---|--------|--------|-------|------|------|---------|-----------|-------|--------|
| 1 | Pulse metric Stories | M137 | ES-02 | `ic-pulse-stories.png` | `public/icons/early-signal-dashboard/ic-pulse-stories.png` | `/icons/early-signal-dashboard/ic-pulse-stories.png` | `message-square` | #f5f7fa | **ON DISK** |
| 2 | Pulse metric Activity | M137 | ES-02 | `ic-pulse-activity.png` | `public/icons/early-signal-dashboard/ic-pulse-activity.png` | `/icons/early-signal-dashboard/ic-pulse-activity.png` | `activity` | #f5f7fa | **ON DISK** |
| 3 | Pulse compact header mark | M137 | ES-02 | `ic-pulse-mark.png` | `public/icons/early-signal-dashboard/ic-pulse-mark.png` | `/icons/early-signal-dashboard/ic-pulse-mark.png` | `radio` | #F5A623 | **ON DISK** |
| 4 | What’s Missing — Languages | M136/M139 | ES-01/04 | `ic-gap-languages.png` | `public/icons/early-signal-dashboard/ic-gap-languages.png` | `/icons/early-signal-dashboard/ic-gap-languages.png` | `message-circle` | #f5f7fa | **ON DISK** |
| 5 | What’s Missing — Other | M136 | ES-01 | `ic-gap-ellipsis.png` | `public/icons/early-signal-dashboard/ic-gap-ellipsis.png` | `/icons/early-signal-dashboard/ic-gap-ellipsis.png` | `ellipsis` | #f5f7fa | **ON DISK** |
| 6 | Emerging provisional marker | M138/M140 | ES-03/05 | `ic-emerging-marker.png` | `public/icons/early-signal-dashboard/ic-emerging-marker.png` | `/icons/early-signal-dashboard/ic-emerging-marker.png` | `sparkles` | #f5f7fa | **ON DISK** |
| 7 | Emerging empty | M138 | ES-03 | `ic-emerging-empty.png` | `public/icons/early-signal-dashboard/ic-emerging-empty.png` | `/icons/early-signal-dashboard/ic-emerging-empty.png` | `search` | #f5f7fa | **ON DISK** |
| 8 | Help — share your story | M139/M140 rail | ES-04/05 | `ic-help-share.png` | `public/icons/early-signal-dashboard/ic-help-share.png` | `/icons/early-signal-dashboard/ic-help-share.png` | `message-square-plus` | #f5f7fa | **ON DISK** |
| 9 | Help — stronger together | M139 | ES-04 | `ic-help-together.png` | `public/icons/early-signal-dashboard/ic-help-together.png` | `/icons/early-signal-dashboard/ic-help-together.png` | `share-2` | #f5f7fa | **ON DISK** |
| 10 | Continuum rail — What’s Missing | M140 | ES-05 | `ic-rail-missing.png` | `public/icons/early-signal-dashboard/ic-rail-missing.png` | `/icons/early-signal-dashboard/ic-rail-missing.png` | `scan-search` | #f5f7fa | **ON DISK** |
| 11 | Issue topic — transit | M140 | ES-05 | `ic-issue-topic-transit.png` | `public/icons/early-signal-dashboard/ic-issue-topic-transit.png` | `/icons/early-signal-dashboard/ic-issue-topic-transit.png` | `bus` | #f5f7fa | **ON DISK** |
| 12 | Issue topic — greenspace | M140 | ES-05 | `ic-issue-topic-greenspace.png` | `public/icons/early-signal-dashboard/ic-issue-topic-greenspace.png` | `/icons/early-signal-dashboard/ic-issue-topic-greenspace.png` | `tree-deciduous` | #f5f7fa | **ON DISK** |
| 13 | Issue topic — lighting | M140 | ES-05 | `ic-issue-topic-lighting.png` | `public/icons/early-signal-dashboard/ic-issue-topic-lighting.png` | `/icons/early-signal-dashboard/ic-issue-topic-lighting.png` | `lamp-floor` | #f5f7fa | **ON DISK** |
| 14 | Issue topic — waste | M140 | ES-05 | `ic-issue-topic-waste.png` | `public/icons/early-signal-dashboard/ic-issue-topic-waste.png` | `/icons/early-signal-dashboard/ic-issue-topic-waste.png` | `trash-2` | #f5f7fa | **ON DISK** |
| 15 | Issue topic — housing | M140 | ES-05 | `ic-issue-topic-housing.png` | `public/icons/early-signal-dashboard/ic-issue-topic-housing.png` | `/icons/early-signal-dashboard/ic-issue-topic-housing.png` | `home` | #f5f7fa | **ON DISK** |

**Итого NEW functional:** 15 файлов — **ON DISK** (Lucide `catalog: es`, 2026-08-17). RGBA 256×256, corners alpha 0.

**Lucide ids (actual in manifest):** `message-square`, `activity`, `radio`, `message-circle`, `ellipsis`, `sparkles`, `search`, `message-square-plus`, `share-2`, `scan-search`, `bus`, `tree-deciduous`, `lamp-floor`, `trash-2`, `home`.  
Note: seed listed `lamp-street`/`lightbulb`; `lamp-street` absent in `lucide-static` → `lamp-floor`.

Depict (meaning docs; not GenerateImage for these rows):

1. Stories — speech-bubble, 2–3 lines inside, no letter glyphs.  
2. Activity — sparkline/wave in circle; not clipboard, not trophy.  
3. Pulse mark — circular cluster / radiating ticks; `#F5A623`; not a numbered chart.  
4. Languages — bubble with three dots; not a flag.  
5. Other — three horizontal dots.  
6. Emerging marker — sparkles / concentric dots; no shield.  
7. Emerging empty — magnifier; not a loud search CTA.  
8. Help share — bubble with plus (`message-square-plus`).  
9. Help together — three nodes / `share-2`.  
10. Rail missing — `scan-search`.  
11–15. Topics — bus / tree / floor-lamp / trash-2 / home.

---

## §NEW illustration — Help mascot

| Asset | Mockup | Story | disk | runtime | status | Notes |
|-------|--------|-------|------|---------|--------|-------|
| Help Complete character | **M139** | ES-04 | `public/assets/es-help-mascot.png` | `/assets/es-help-mascot.png` | **ON DISK** | GenerateImage + character sheet 2026-08-17. Continuity SSOT: [`docs/UX/references/DogeEstonia Character.png`](../../../UX/references/DogeEstonia%20Character.png). Wave Contour B. Do **not** deep-link landing into spa runtime. RGBA cutout. |

---

## §Reuse — НЕ генерировать

| Иконка / asset | Путь | Source catalog / UI | Mockup / контекст |
|----------------|------|---------------------|-------------------|
| App logo (shield) | `/assets/DOGEstonia-logo-big.png` (+ horizontal, fallback SVG) | assets · Header/Footer/AppShell | all M136–M140 |
| ETM floral band (+ PH etm-*) | `/icons/public-home/etm-floral-band.png` | [PH](../public-home/STORY-SPA-PH-icon-assets.md) ETM | artboard textile |
| External handoff | `/icons/public-home/ic-external-link.png` | PH · Board/Header/Handoff | Submit CTAs |
| Empty board calm | `/icons/public-home/ic-empty-board.png` | PH · BoardPage | discovery empty |
| Chevron right | `/icons/public-home/ic-chevron-right.png` | PH · IssueCard | M139 narrow gaps |
| Board/load error | `/icons/story-handoff/ic-cloud-error.png` | ID-12 · BoardPage | ERR |
| Try again / refresh | `/icons/story-handoff/ic-auto-resubmit.png` | ID-12 | Try again |
| Info | `/icons/story-handoff/ic-info.png` | ID-12 · Handoff | Pulse listening |
| Areas / location | `/icons/story-handoff/ic-field-location.png` | ID-12 | Pulse Areas · gap Areas |
| Themes / institution | `/icons/story-handoff/ic-field-institution.png` | ID-12 | gap Themes |
| Lock secure | `/icons/story-handoff/ic-lock.png` | ID-12 · Submit | Help secure note |
| Spinner | `/icons/story-handoff/ic-spinner.png` | ID-12 · Submit | optional load |
| Success check | `/icons/story-handoff/ic-success-check.png` | ID-12 | legends |
| Go to board | `/icons/story-handoff/ic-go-to-board.png` | ID-14 | routing parity |
| My stories | `/icons/story-handoff/ic-my-stories.png` | ID-14 | routing parity |
| Account / contributors person | `/icons/user-cabinet/ic-field-role.png` | CAB · AccountControl | Pulse Contributors · Sign in |
| Eye (help see) | `/icons/identity/ic-eye.png` | EPIC-04 | M139 Help |
| Groups (users) | `/icons/identity/ic-profile-conflict.png` | EPIC-04 | gap Groups |
| Globe | `/icons/identity/ic-globe.png` | EPIC-04 | M140 chrome |
| Search | `/icons/identity/ic-search.png` | EPIC-04 | M140 chrome |

**Не reuse:** CAB `ic-story-activity.png` для Pulse Activity (другой смысл: ledger clipboard).

---

## Disk completeness (2026-08-17 · ls/Pillow)

**NEW required by this catalog:** 15 `ic-*` + 1 mascot = **16**. Missing: **0**.

| file | method | disk | exists |
|------|--------|------|--------|
| `ic-pulse-stories.png` | Lucide `message-square` | `public/icons/early-signal-dashboard/ic-pulse-stories.png` | yes |
| `ic-pulse-activity.png` | Lucide `activity` | `public/icons/early-signal-dashboard/ic-pulse-activity.png` | yes |
| `ic-pulse-mark.png` | Lucide `radio` | `public/icons/early-signal-dashboard/ic-pulse-mark.png` | yes |
| `ic-gap-languages.png` | Lucide `message-circle` | `public/icons/early-signal-dashboard/ic-gap-languages.png` | yes |
| `ic-gap-ellipsis.png` | Lucide `ellipsis` | `public/icons/early-signal-dashboard/ic-gap-ellipsis.png` | yes |
| `ic-emerging-marker.png` | Lucide `sparkles` | `public/icons/early-signal-dashboard/ic-emerging-marker.png` | yes |
| `ic-emerging-empty.png` | Lucide `search` | `public/icons/early-signal-dashboard/ic-emerging-empty.png` | yes |
| `ic-help-share.png` | Lucide `message-square-plus` | `public/icons/early-signal-dashboard/ic-help-share.png` | yes |
| `ic-help-together.png` | Lucide `share-2` | `public/icons/early-signal-dashboard/ic-help-together.png` | yes |
| `ic-rail-missing.png` | Lucide `scan-search` | `public/icons/early-signal-dashboard/ic-rail-missing.png` | yes |
| `ic-issue-topic-transit.png` | Lucide `bus` | `public/icons/early-signal-dashboard/ic-issue-topic-transit.png` | yes |
| `ic-issue-topic-greenspace.png` | Lucide `tree-deciduous` | `public/icons/early-signal-dashboard/ic-issue-topic-greenspace.png` | yes |
| `ic-issue-topic-lighting.png` | Lucide `lamp-floor` | `public/icons/early-signal-dashboard/ic-issue-topic-lighting.png` | yes |
| `ic-issue-topic-waste.png` | Lucide `trash-2` | `public/icons/early-signal-dashboard/ic-issue-topic-waste.png` | yes |
| `ic-issue-topic-housing.png` | Lucide `home` | `public/icons/early-signal-dashboard/ic-issue-topic-housing.png` | yes |
| `es-help-mascot.png` | GenerateImage | `public/assets/es-help-mascot.png` | yes |

**§Reuse (20 paths):** all exist under `spa-app/public/` (logo, `etm-floral-band`, PH/handoff/CAB/identity `ic-*` listed above). Missing: **0**.

**§Viz / skip:** no PNG generated (constellations, density, skeletons, device chrome, folk bands as `ic-*`).

---

## §Viz / out of catalog (не `ic-*`)

Do **not** generate Lucide PNG for:

- Network Pulse particle / constellation fields (M136/M137)
- Picture-forming connected graphs + topic color dots (M136/M139)
- Emerging density clusters by strength state (M138)
- Mode A–D density keys / continuum density diagrams (M137/M140)
- Loading skeletons (CSS)
- Artboard device wireframes, lettered A/B/C/D chrome, database cylinder meta

Implement later as components/CSS/canvas. Catalog forbids inventing fake numeric metric icons for these surfaces.

---

## Заметки

- Host route remains `/board` (continuum with PH-04) — icons extend board, not a separate app chrome.
- Issue topic icons (M140) are **feed category affordances**, not `ic-field-category` (tag) from handoff.
- Generator: [`SPA-CATALOG-IMAGE-WAVE.md`](../../../UX/SPA-CATALOG-IMAGE-WAVE.md) · `catalog: es` in [`icon-manifest.yaml`](../../../../scripts/icons/icon-manifest.yaml); mascot = Contour B + character sheet.
- Methodology: keep this catalog beside future ES L10N tables (ADMIN-ESD-05).
