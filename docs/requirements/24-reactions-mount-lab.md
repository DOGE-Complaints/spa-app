# 24. Reactions mount (greenfield) + shell lab `#/lab/reactions`

Parent: operator ask 2026-10-13 — REQ only: greenfield pluggable reactions + lab page inside shell (like `#/lab/feed`); discuss locks confirmed; **no deviation from REQ-22**  
Parent-id: spa-reactions-mount-lab  
Parent epic: [22-feed-visual-redesign-phase-1.md](22-feed-visual-redesign-phase-1.md) — especially **FR-22.6** / **AC-SPA-REQ22-06** (M154)  
Status: Draft — awaiting implement / story wave  
Дата: 2026-10-13  

**UX anchors (same authority chain as REQ-22):**  
- [M154 written](../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  
- [Component & Variants](../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) §§17–18, **22**, **23**, **29–31**  
- Interaction & Behavior §§24–25 (via feed INDEX); Data-to-UI §13/18–20/26–27; DUI-Q08/Q09  

**Authority when sources disagree:** REQ-22 product locks → this REQ (scoped delivery of FR-22.6 lab slice) → Phase 1 decision record → Component & Variants → Interaction → Tokens → Data-to-UI → **written M154** → generated PNG (**tone only**). Written specs override imperfect pixels. **Do not amend REQ-22 composition** (`PostActionStrip` four zones, `BoardIssuePost` = chrome + thread).

**Scope class:** requirements only. Code paths below = **acceptance targets** — create only on explicit implement / story waves (analysis.mdc: name ≠ create).

**Parents / siblings (do not duplicate):**
- [22-feed-visual-redesign-phase-1.md](22-feed-visual-redesign-phase-1.md) — epic; this REQ **narrows** FR-22.6 into a pluggable mount + lab, does **not** reopen Phase 1 scope  
- [17-issue-thread-feed-ux-and-reactions.md](17-issue-thread-feed-ux-and-reactions.md) — prior-skin threads; not visual SSOT for this mount  
- [19-req10-threads-reaction-reload-honesty.md](19-req10-threads-reaction-reload-honesty.md) — honesty of `selected` reload (data plane); reuse contracts, do not reinvent  
- Lab pattern as-is: `#/lab/feed` · [`FeedLabPage.jsx`](../../src/pages/FeedLabPage.jsx) · [`App.jsx`](../../src/App.jsx) shell Routes  

---

## 1) Goal

1. Поставить **с нуля** (greenfield) pluggable **Reactions mount** — feature-пакет презентации `reactions.v1` strip + picker, согласованный с DS атомами и M154 / FR-22.6.  
2. Выставить его на отдельной **lab-странице внутри shell** `#/lab/reactions` (паттерн `#/lab/feed`): стенды состояний без cutover production `#/next/feed` и без обязательной подмены текущего `#/lab/feed` в той же волне.  
3. API mount — **host-agnostic** (пристегивается к post-root и comment; позже — к любому shell-хосту с тем же контрактом).  
4. Композиция поста **как в REQ-22 / DS**: media → **`PostActionStrip`** (React + aggregate = этот mount) → **`IssueThreadBlock`** → у комментариев снова тот же mount с другой конфигурацией.

---

## 2) Locked decisions (operator 2026-10-13)

| # | Lock |
|---|------|
| L1 | **Не отклоняемся от REQ-22** и Component & Variants: нет отдельной «пятой полосы» реакций между media и action strip; aggregate/React живут в зонах `PostActionStrip` (§22). |
| L2 | Один **feature-пакет** (рабочее имя `ReactionsMount` / package under `features/…`) = `ReactionSummaryStrip` + `ReactionPicker` + `ReactionOption` + props/adapter. Не три несвязанных продукта и не отдельный `CommentReactions extends …`, пока UI закрывается variants. |
| L3 | Variants: `target = thread-root \| comment`; `density = feed \| comment \| detail`; moderation **eligible only** on `comment` (M154 / §30). |
| L4 | **No double root strip:** thread-root reactions на post/`PostActionStrip`; comment reactions на узле комментария. Anatomy §23 «ReactionSummaryStrip» для feed root = orchestration/slot, не второй визуальный root-strip. |
| L5 | Lab route: **`#/lab/reactions`** under shell Routes (как `#/lab/feed`). Не `#/lab/feed/reactions`. |
| L6 | Lab AC: минимум **два хоста** — fake post-root + fake comment; fixtures only. Live HTTP / knobs wire — later (fail-closed if absent; no invent). |
| L7 | Catalog SSOT = **written M154** + accepted `reactions.v1`; PNG = tone. Full enabled set + omit Hopeful/Amusing as selectable; scroll for remainder. |
| L8 | **M155 / ReactorsPopover / people — OOS.** Aggregate activate: no-op or explicit «M155 later» stub — no people UI. |
| L9 | Эта волна **не** требует cutover `#/lab/feed` / `#/next/feed` на новый mount. Интеграция в feed-lab / next-feed — отдельные stories после accept. |
| L10 | Agree/Disagree mutually exclusive; max selection from knob default **3** in fixtures; React always opens picker (no silent Like); empty strip = no fake zeros; loading/error scoped to reaction slot. |

---

## 3) Scope / Out of scope

### In scope (FR)

| ID | Тема | Anchor |
|----|------|--------|
| FR-24.1 | Greenfield presentation package for strip + picker + option; DS names §§29–31 | M154 · C&V |
| FR-24.2 | Host-agnostic mount props: `target`, `density`, enabled ids, aggregate, `selected[]`, capacity, open/save/error callbacks | §30 logical inputs |
| FR-24.3 | Post-root config: Emotional + Epistemic; no selectable Moderation | M154 THREAD-ROOT-SCOPE |
| FR-24.4 | Comment config: three labelled groups incl. Moderation when node-enabled | M154 THR-R-B/C |
| FR-24.5 | States: empty / loading / populated / unavailable (+ retry); picker open / saving / save-error + rollback to confirmed | M154 A–D |
| FR-24.6 | Desktop popover + mobile sheet presentations; keyboard path; ≥44 px touch | M154 · §30 |
| FR-24.7 | Shell lab page `#/lab/reactions` + route registration under `AppShellLayout` Routes | LAB-01 pattern |
| FR-24.8 | Lab stands covering M154 primary panels (compact strip states, comment picker, root scope inset, capacity/XOR/save-error) on two hosts | M154 §4–8 |
| FR-24.9 | Localized labels primary (ET/RU/EN fixture keys); ids not user copy | M154 §2, §9 |
| FR-24.10 | Documented slot contract for future `PostActionStrip` / `CommentNode` hosts (no mandatory production wiring this REQ) | REQ-22 FR-22.6 |

### Out of scope (explicit)

- Amending REQ-22 home/shelter/shell D2 / Phase 1 FR matrix.  
- M155 people lists, Connect, ReactorsPopover production UI.  
- Invent gateway/threads fields or treating PNG as regression golden.  
- Mandatory cutover of classic `ReactionControls` / `#/lab/feed` / `#/next/feed` in this REQ.  
- Production verify-gate product surface (M157) — lab may stub writeCapability; full gate stays REQ-22 FR-22.8.  
- Second SPA / Storybook-only delivery as substitute for shell lab.  
- Stub files «so paths exist» outside this REQ markdown + requested index/sibling links.

---

## 4) Target composition (REQ-22 aligned)

```
BoardIssuePost                          ← later host (REQ-22)
├─ IssueCardChrome
│  ├─ … MediaFrame
│  └─ PostActionStrip                   ← §22 four zones
│     ├─ React  → opens ReactionPicker
│     ├─ Comment | Share
│     └─ ReactionSummaryStrip           ← ReactionsMount (target=thread-root)
└─ IssueThreadBlock
   └─ CommentTree / CommentNode
      └─ ReactionsMount (target=comment, moderation eligible)
```

Lab `#/lab/reactions` mounts the same package on **fixture hosts** that mimic post-root strip slot and comment row — not a parallel visual language.

---

## 5) Verified current state (facts only)

| Fact | Evidence |
|------|----------|
| REQ-22 maps FR-22.6 → M154; people gated | [22 §2 FR-22.6](22-feed-visual-redesign-phase-1.md), [22 §5 M154/M155](22-feed-visual-redesign-phase-1.md) |
| DS atoms for reactions named | C&V §§29–31; `PostActionStrip` §22; thread §23 |
| M154 accepted written + PNG colocated | `artboards/mockup-m154-…md` / `.png` |
| Shell lab pattern Present | `#/lab/feed` in [`App.jsx`](../../src/App.jsx); [`FeedLabPage.jsx`](../../src/pages/FeedLabPage.jsx) |
| `#/lab/reactions` **not** Present | no route/page by that path (acceptance target) |
| Greenfield ReactionsMount package **not** Present as REQ deliverable | prior lab/classic reaction chrome exists under feed-lab / threads — **out of this REQ’s reuse mandate**; new package is greenfield |

---

## 6) Acceptance criteria

| ID | Criterion |
|----|-----------|
| **AC-24-01** | Greenfield package implements strip states empty/loading/populated/unavailable per M154 without fake zero theatre |
| **AC-24-02** | Picker shows Emotional / Epistemic / Moderation on comment; root has no selectable Moderation |
| **AC-24-03** | Max 3 (fixture knob) + Agree/Disagree XOR + save-error restores confirmed selection |
| **AC-24-04** | Desktop popover + mobile sheet paths both exist; React control always available |
| **AC-24-05** | `#/lab/reactions` registered under shell Routes; page renders M154 stands on post-root + comment fixture hosts |
| **AC-24-06** | No M155 people UI; no invent HTTP; PNG not used as golden |
| **AC-24-07** | Mount API is props-driven (host-agnostic); comment = same package + config, not a separate inheritance tree |
| **AC-24-08** | Composition contract documented: reactions slot inside `PostActionStrip` / comment node — **no** DS amendment to insert a free-floating strip between media and actions |
| **AC-24-09** | This REQ does not claim REQ-22 Phase 1 Done; satisfies a **lab-scoped** slice toward FR-22.6 / AC-SPA-REQ22-06 |

---

## 7) Named future paths (not created by this REQ)

| Path / symbol | Role when implement wave runs |
|---------------|-------------------------------|
| `#/lab/reactions` | Shell lab route |
| `src/pages/…Lab…Reactions…` (name TBD on implement) | Page under shell |
| `src/features/…` reactions mount package (name TBD) | Greenfield UI |
| Optional Vitest under feature `__tests__/` | Lab/route smoke |

Naming TBD at implement; **name ≠ create** until story wave.

---

## 8) Open / deferred (not blocking REQ accept)

1. Exact package folder name under `features/` (feed vs reactions-lab).  
2. Whether lab save path is pure local fixture state or optional read-only threads adapter (fail-closed).  
3. Timing of `#/lab/feed` cutover story after this lab ships.  
4. Durable backend enforcement of moderation-on-comment (`DUI-Q23`) — client omit remains.

---

## 9) Dependencies

- REQ-22 authority + FR-22.6 / AC-SPA-REQ22-06.  
- M154 written + C&V §§22, 29–31.  
- Shell + `#/lab/feed` pattern (REQ-21 / lab stories) as route precedent.  
- Implement / backlog stories — **not** started by writing this file.
