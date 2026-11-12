# STORY-SPA-CR-01 — Reactions mount strip

## Meta

- **Key:** `STORY-SPA-CR-01-reactions-mount-strip`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Done · P5 TASKED=0 · `pkg-000137` · Await P8 residual
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md) · FR-24.1/2/3/5 · AC-24-01/07/08
- **Depends on:** [CR-icon](STORY-SPA-CR-icon-assets.md) · [CR-api](STORY-SPA-CR-api-requirements.md)
- **Blocks:** CR-02, CR-03
- **Code home:** `src/features/reactions-mount/` · lab `#/lab/reactions`

## Зачем

Greenfield **ReactionSummaryStrip** + mount props (`target`, `density`, aggregate, `selected[]`, capacity, callbacks) — pluggable, host-agnostic. Slot = zone inside `PostActionStrip` (no DS amend / no free-floating strip between media and actions).

## UX SSOT

- Spec/PNG: [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png) — panels A / empty / loading / error; THREAD-ROOT-SCOPE
- **OOS artboard:** [M155](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md) people — no UI
- DS: Component & Variants §§22, 29

## Icons

SSOT: [CR-icon §Reuse](STORY-SPA-CR-icon-assets.md) — **13** mark SVGs + chrome. Origin (prior vs Gap-8) irrelevant.

| Catalog id / slot | Runtime URL |
|-------------------|-------------|
| `acknowledge` | `/icons/next-feed/reactions/acknowledge.svg` |
| `support` | `/icons/next-feed/reactions/support.svg` |
| `empathy` | `/icons/next-feed/reactions/empathy.svg` |
| `concern` | `/icons/next-feed/reactions/concern.svg` |
| `sad` | `/icons/next-feed/reactions/sad.svg` |
| `outraged_situation` | `/icons/next-feed/reactions/outraged-situation.svg` |
| `agree` | `/icons/next-feed/reactions/agree.svg` |
| `disagree` | `/icons/next-feed/reactions/disagree.svg` |
| `useful_fact` | `/icons/next-feed/reactions/useful-fact.svg` |
| `insightful` | `/icons/next-feed/reactions/insightful.svg` |
| `needs_evidence` | `/icons/next-feed/reactions/needs-evidence.svg` |
| `off_topic` | `/icons/next-feed/reactions/off-topic.svg` |
| `aggressive` | `/icons/next-feed/reactions/aggressive.svg` (comment only) |
| `react` | `/icons/next-feed/actions/react.svg` |
| `retry` | `/icons/next-feed/actions/retry.svg` |
| `unavailable` | `/icons/next-feed/status/unavailable.svg` |
| `warning` / `error` / `success` / `info` | `/icons/next-feed/status/{warning,error,success,info}.svg` |

## API

- [CR-api](STORY-SPA-CR-api-requirements.md): FixtureAdapter default; props from fixtures (`summary_marks`, `aggregate_count`, `selected[]`); LiveAdapter optional later via `ThreadsSocialClient` — **no second client**
- Aggregate activate → no people UI (M155 OOS)

## FR

- **FR-CR-01.1** States: empty (no fake zeros) / loading / populated / unavailable (+ retry) scoped to reaction slot  
- **FR-CR-01.2** Props: `target=thread-root|comment`, `density`, enabled ids, aggregate, `selected[]`, open/save/error callbacks compatible with `onReact` seam  
- **FR-CR-01.3** Root vs comment config (moderation not selectable on root)  
- **FR-CR-01.4** Composition: slot inside `PostActionStrip` / comment node — document contract; no fifth strip between media and actions  
- **FR-CR-01.L10N** reuse `threadsFeed.reactions.*` where Present  

## Вне scope

M155 people; invent HTTP; `#/next/feed` cutover; classic `ReactionControls` reuse mandate; separate `CommentReactions extends …`

## Тексты и переводы

### Reuse (Present)

[`threadsFeedDictionary.js`](../../../../src/i18n/threadsFeedDictionary.js): `threadsFeed.reactions.react` · `unavailable` · `id.*` (omit hopeful/amused as selectable) · layer keys as needed for strip a11y

### Draft (if missing)

| key | en | et | ru |
|-----|----|----|----|
| `reactions.strip.retry` | Try again | Proovi uuesti | Попробовать снова |
| `reactions.strip.unavailable` | Reactions unavailable | Reaktsioonid pole saadaval | Реакции недоступны |

(Prefer reuse `threadsFeed.reactions.unavailable` over new key when identical.)

## Acceptance Criteria

- [ ] Strip states match M154 A insets; no theatrical `0`  
- [ ] Mount props host-agnostic; comment = same package + config  
- [ ] Slot contract = PostActionStrip / comment node (AC-24-08)  
- [ ] Icons = Runtime URLs from CR-icon §Reuse (13 marks + chrome); no invent filenames; no emoji interim for selectable marks  
- [ ] API = fixtures / CR-api reuse map; no invent HTTP; M155 OOS  
- [ ] L10N: ids never user copy; hopeful/amused not selectable  
