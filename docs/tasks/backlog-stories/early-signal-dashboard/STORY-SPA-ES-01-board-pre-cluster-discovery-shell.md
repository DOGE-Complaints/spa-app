# STORY-SPA-ES-01 — Board Pre-Cluster Discovery Shell

## Meta
- **Key:** `STORY-SPA-ES-01-board-pre-cluster-discovery-shell`
- **Epic:** [EPIC-SPA-12](../../epics/EPIC-SPA-12-early-signal-dashboard/EPIC-SPA-12-early-signal-dashboard.md)
- **Pipeline:** [pipeline story](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md)
- **Package:** [early-signal-dashboard/](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [UX-PROMPTS.md](UX-PROMPTS.md)
- **Status:** Done
- **Severity:** 🔴 HIGH
- **Depends on:** [M136](../../../UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md); [api-req §1](STORY-SPA-ES-api-requirements.md); [icon catalog](STORY-SPA-ES-icon-assets.md); PH-04 board host; PH chrome

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека |
|-------|-----------|-------|
| **M136** ESD-D | Zero Issues → Pre-Cluster discovery composition (five blocks) | [mockup-136-…-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md) |

## Зачем простыми словами
Когда на `/board` нет Issues, пользователь видит **discovery composition** (Network Pulse · Picture Forming · Emerging · What's Missing · Help), а не единственный placeholder «No Issues Yet».

## Текущее состояние (verified)

**As-of-Done / Current** (P3 gate `2026-08-17T10:32:24Z` · T07):
- `/` → `/board` ([`App.jsx`](../../../../src/App.jsx)); Issues via `issueService.getIssues` → `GET /tallinn/issues` ([`GatewayIssueRepository.js:76`](../../../../src/repositories/GatewayIssueRepository.js)).
- Unfiltered empty: `showEmptyBoard` ([`BoardPage.jsx`](../../../../src/pages/BoardPage.jsx) L162) → `<EarlySignalDiscovery />` L326 · `data-testid="board-early-signal-discovery"` ([`EarlySignalDiscovery.jsx`](../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L21–24). `board-empty` **absent** in BoardPage.
- Pulse / Emerging HTTP consumers in `spa-app/src`: still **0** (titled placeholder slots; ES-02…04).
- Host chrome: PH Header / Footer / Submit — reuse; do not reopen PH-01…06.

**Historical** (pre-ES-01 cutover):
- Empty was `data-testid="board-empty"` + `publicHome.board.empty.*` as the **sole** empty message.

## Функциональные требования (FR)
- **FR-ES-01.1** When `issues.length === 0` (unfiltered empty dataset), `/board` renders Pre-Cluster **discovery root** with `data-testid="board-early-signal-discovery"` (AC-SPA-ES-01).
- **FR-ES-01.2** Composition hosts slots for five conceptual blocks (PRODUCT-BRIEF #3); child blocks may ship in ES-02…04 — shell must not collapse to sole `board-empty` copy.
- **FR-ES-01.3** Route stays **`/board` only** — no REQ-12 `/dashboard` surface.
- **FR-ES-01.4** Topic/taxonomy language ≠ Issue language in discovery chrome (AC-SPA-ES-02).
- **FR-ES-01.5** No Offers/Solutions on Issue-less board (AC-SPA-ES-06).
- **FR-ES-01.6** Load / error for Issues list: reuse PH-04 patterns (`publicHome.board.error.*`, `ic-cloud-error`); discovery does not invent a parallel Issues error API.
- **FR-ES-01.7** Filtered-empty (filters active, zero match) remains PH-04 `filteredEmpty` — **not** discovery shell.
- **FR-ES-01.L10N** Namespace `earlySignal.discovery.*` (+ block titles shared with child stories). Forbidden: AC-SPA-ES-03 patterns (§22–23).

## Субтаски
| Таск | Folder | Суть |
|------|--------|------|
| **T01** | [task-spa-es-01-t01-discovery-root-testid](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/task-spa-es-01-t01-discovery-root-testid/README.md) | Discovery root + testid |
| **T02** | [task-spa-es-01-t02-slot-layout-m136](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/task-spa-es-01-t02-slot-layout-m136/README.md) | Slot layout M136 |
| **T03** | [task-spa-es-01-t03-preserve-filtered-error](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/task-spa-es-01-t03-preserve-filtered-error/README.md) | Preserve filtered/error |
| **T04** | [task-spa-es-01-t04-l10n-discovery-keys](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/task-spa-es-01-t04-l10n-discovery-keys/README.md) | L10N discovery + dictionary bootstrap |
| **T05** | [task-spa-es-01-t05-vitest-discovery-empty](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/task-spa-es-01-t05-vitest-discovery-empty/README.md) | Vitest discovery empty |
| **T06** | [task-spa-es-01-t06-story-gate-es-01](../../epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/task-spa-es-01-t06-story-gate-es-01/README.md) | Story gate ES-01 |

## Иконки (из каталога)
> Источник: [STORY-SPA-ES-icon-assets.md](STORY-SPA-ES-icon-assets.md). NEW PNG **ON DISK** (2026-08-17). ES-01 wires **shell chrome** only.

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| Brand | `/assets/DOGEstonia-logo-big.png` | `public/assets/DOGEstonia-logo-big.png` | reuse Header/Footer |
| ETM band | `/icons/public-home/etm-floral-band.png` | `public/icons/public-home/etm-floral-band.png` | PH ETM |
| Submit CTA | `/icons/public-home/ic-external-link.png` | `public/icons/public-home/ic-external-link.png` | PH-06 handoff |
| Load error | `/icons/story-handoff/ic-cloud-error.png` | `public/icons/story-handoff/ic-cloud-error.png` | Issues list fail |
| Try again | `/icons/story-handoff/ic-auto-resubmit.png` | `public/icons/story-handoff/ic-auto-resubmit.png` | retry |
| Slot glyphs (Pulse / Emerging / Missing / Help) | — | — | **ES-02…04** — [ES-02](STORY-SPA-ES-02-network-pulse-block.md) · [ES-03](STORY-SPA-ES-03-emerging-signals-provisional.md) · [ES-04](STORY-SPA-ES-04-coverage-gaps-contribution.md) |
| Viz (pulse/graph/skeleton) | — | — | CSS/component — **not** `ic-*` |

## Routes / API
- [api-req §1](STORY-SPA-ES-api-requirements.md): trigger = client `issues.length === 0` after existing `getIssues` — **no new list API**.
- Child data: Pulse/Emerging — ES-02/03.

## Зависимости
- PH-04 feed host · PH-01 chrome · PH-06 Submit (Help CTA surface may land in ES-04).
- ES-02…04 fill slots; ES-01 can ship shell with omit/placeholder slots.

## Вне scope
- Invent gateway paths. Voices. Offers. `/dashboard`. Changing clustering thresholds. Sole reliance on `publicHome.board.empty` as the only zero-Issues product message.

## Тексты и переводы (en / et / ru)

> EN — канон M136. Namespace `earlySignal.*`.

### `earlySignal.discovery.*`

| key | en | et | ru |
|-----|----|----|----|
| `earlySignal.discovery.rootLabel` | Early Signal discovery | Varajase signaali avastus | Обнаружение раннего сигнала |
| `earlySignal.discovery.intro` | Stories are entering the system and beginning to form a shared picture. | Lood sisenevad süsteemi ja hakkavad looma ühist pilti. | Истории поступают в систему и начинают формировать общую картину. |
| `earlySignal.pulse.title` | Network Pulse | Võrgu pulss | Пульс сети |
| `earlySignal.forming.title` | The Picture Is Forming | Pilt kujuneb | Картина формируется |
| `earlySignal.emerging.title` | Emerging Signals | Ilmnevad signaalid | Формирующиеся сигналы |
| `earlySignal.missing.title` | What's Missing | Mis puudub | Чего не хватает |
| `earlySignal.help.title` | Help Complete the Picture | Aita pilti täiendada | Помогите дополнить картину |

> Forbidden in this namespace: «% understood», «N more Stories to unlock Issue», «trending/majority/consensus» for small-N (AC-SPA-ES-03).

## Acceptance Criteria
- [x] Zero Issues (unfiltered) → discovery root with `data-testid="board-early-signal-discovery"` (AC-SPA-ES-01).
- [x] Not solely `board-empty` / `publicHome.board.empty` as the only product message.
- [x] Topic ≠ Issue language in chrome (AC-SPA-ES-02); no Offers (AC-SPA-ES-06); no forbidden strings (AC-SPA-ES-03).
- [x] Links: M136 · icon catalog · api-req §1 · L10N table above.

## Швы
- [`BoardPage.jsx`](../../../../src/pages/BoardPage.jsx), new discovery shell component(s), i18n dictionary (ADMIN-06), PH AppShell.
