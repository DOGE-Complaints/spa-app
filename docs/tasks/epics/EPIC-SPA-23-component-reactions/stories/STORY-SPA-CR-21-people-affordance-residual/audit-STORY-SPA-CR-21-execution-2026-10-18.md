# Hard audit — STORY-SPA-CR-21 people affordance residual (P4 Validate RO)

> **UTC:** 2026-10-18T12:16:49Z (`date -u` · vitest end)  
> **Mode:** P4 Validate RO — code + screenshots vs Path A **OP-UX-MIRROR residual §4** · M155 A · findings only · **not** implementation  
> **ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
> **Pipeline:** [STORY-SPA-CR-21-people-affordance-residual.md](./STORY-SPA-CR-21-people-affordance-residual.md)  
> **Backlog AC:** [STORY-SPA-CR-21-…](../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md) · Partial=**BLOCK**  
> **Normative UX:** [OP-UX-MIRROR residual §4](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · [M155 Panel A](../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)  
> **Package:** [`pkg-000157`](../../../spa-active-packages/pkg-000157-20261018-epic-spa-23-cr-21-people-affordance-residual.yaml) · P3 gate claimed **BLOCK** `2026-10-18T12:15:16Z`  
> **This P4:** Read/Grep/`ls`/md5/image-read/`vitest` · **no invent OP PASS** · no invent SVG/people HTTP · no product code · no git push

## Verdict

**BLOCK** — Phase A hard AC structure **PASS**: `data-rm-people-anchor=trigger` · Reactions inner chip (`feed-post-action-reactions-chip` · CSS chip hover) · Reactions≠picker · aggregate→people · Gap v2 `reactions.svg` **Present** · vitest **140/140** · FixtureAdapter held. Phase B: Path A shots `01`–`05` Present · OP column **Absent** → Partial visual = **BLOCK** (expected). Gate **BLOCK** confirmed. Validator **does not invent** OP PASS.

| Layer | Result |
|-------|--------|
| Hard AC structure (anchor · chip · ≠picker · aggregate · Gap v2) | **PASS** |
| Visual Done · Partial=BLOCK | **BLOCK** (OP Absent) |
| Gate Result=**BLOCK** | **confirmed** |
| OPEN High/Medium implement TASKED | **0** |
| Story Done | ❌ **Blocked** (visual OP) · structure Done held |

---

## Hard AC map (this fence)

| Hard AC | Fact | Score |
|---------|------|-------|
| `peopleAnchor=trigger` | [`ReactionsMount.jsx`](../../../../../../src/features/reactions-mount/ReactionsMount.jsx) `peopleAnchorRef` + `data-rm-people-anchor=trigger` · vitest cr21 · capture assert | **PASS** |
| Reactions chip hover | [`FeedPostActionStrip`](../../../../../../src/features/feed-lab/post/FeedPostActionStrip.jsx) chip testid · CSS CR-16/21 chip-only hover · `data-lab-reactions-chip` | **PASS** |
| Reactions≠picker | zone → `activateAggregate` · picker closed · `data-rm-picker-open=false` | **PASS** |
| aggregate→people | aggregate click · people open · `peopleAnchor=trigger` | **PASS** |
| Gap v2 glyph Present | `public/icons/next-feed/actions/reactions.svg` **Present** · cr21 + cr20 | **PASS** |
| OP eye PASS | **Absent** | **BLOCK** |

---

## Normative map (residual §4 · M155 A)

| Source | Rule | This P4 |
|--------|------|---------|
| §4.1 | React → picker · Reactions/aggregate → people | structure **PASS** · shots 01/03/04 |
| §4.2 | Anchor to Reactions trigger (not React slot alone) | structure **PASS** · `peopleAnchor=trigger` · gate popLeft claim |
| §4.2 | Chip hover parity CR-16 | structure **PASS** · chip Present |
| §4.2 | OP eye click AC | **Absent** → Partial **BLOCK** |
| CR-20 consume | dual-circle glyph | **Present** |

---

## Backlog / gate AC

| AC | Fact | Score |
|----|------|-------|
| `#/lab/feed` Reactions → people · picker closed | shot 01 · vitest | **PASS** (structure) |
| Popover near Reactions | gate popLeft≡reactionsLeft `732.5` · capture | **PASS** (structure) |
| Reactions hover = chip | chip testid + CSS | **PASS** (structure) |
| Aggregate → people | shot 03 · vitest | **PASS** (structure) |
| Vitest | cr21 · suite **140/140** | **PASS** |
| OP eye · light/dark verify | OP **Absent** · shots Present | **BLOCK** |

---

## 1. Phase A — code findings

| Check | Path / fact | Score |
|-------|-------------|-------|
| Anchor trigger | `handleOpenPeople({anchorEl})` · `peopleAnchorKind=trigger` | **PASS** |
| Popover measure | `peopleAnchorRef \|\| anchorRef` → `measurePopoverPosition` | **PASS** |
| Chip | `feed-post-action-reactions-chip` · zone hover paints chip | **PASS** |
| ≠ picker | Reactions zone does not open `ReactionPicker` | **PASS** |
| Aggregate | `onAggregateActivate` / summary → people | **PASS** |
| Gap v2 | `reactions.svg` Present · strip URL | **PASS** |
| Vitest | **31 files · 140 passed** this fence | **PASS** |

---

## 2. Phase B — visual findings

### Inventory (md5 ≡ full-cycle README · story-root README Present)

| # | File | md5 prefix | This P4 |
|---|------|------------|---------|
| 01 | reactions-people-anchor | `f8ece5e9790c` | Evidence Present · Visual **BLOCK** · OP Absent · **≡ CR-20-03** |
| 02 | people-dark | `f46008479efa` | Evidence Present · Visual **BLOCK** · OP Absent |
| 03 | aggregate-people | `2829221be5d5` | Evidence Present · Visual **BLOCK** · OP Absent |
| 04 | react-picker-hold | `cb1aa4b84a11` | Evidence Present · Visual **BLOCK** · OP Absent · **≡ CR-20-04** |
| 05 | people-narrow-390 | `3dd696d65b22` | Evidence Present · Visual **BLOCK** · OP Absent |

### Dual match (structure)

| State | Shot | Match |
|-------|------|-------|
| Reactions → people · anchor | 01 | pass (structure) |
| Dark | 02 | pass (structure) |
| Aggregate → people | 03 | pass (structure) |
| React → picker hold | 04 | pass (structure) |
| Narrow + Gap v2 | 05 | pass (structure) |
| OP eye PASS | — | **missing** → **BLOCK** |

OOS: invent OP PASS · invent SVG/people HTTP · CR-22 media · `#/next/feed`.

---

## 3. Gaps / blockers

| ID | Sev | Finding | How to close |
|----|-----|---------|--------------|
| **F1** | **High (BLOCK)** | OP eye **Absent** — Partial visual = **BLOCK** | OP eye sign-off · re-gate; **do not** invent PASS |
| **F2** | Info | Checklist OP column Absent | OP eye then polish vs §4 |
| **F3** | Info | Shots 01≡CR-20-03 · 04≡CR-20-04 md5 (byte reuse honesty) | Optional re-capture unique frames |
| **F4** | Info | `tmp-cr21-capture.mjs` naming | Optional promote note |

**OPEN actionable High/Medium implement TASKED:** _(empty)_.  
**Story blocker:** **F1 BLOCK** (OP eye).

---

## RETURN_TO_ROOT

**BLOCK** · hard AC structure **PASS** · OP eye **Absent** · Gap v2 **Present** · OPEN Medium+ **0** ·  
`…/STORY-SPA-CR-21-people-affordance-residual/audit-STORY-SPA-CR-21-execution-2026-10-18.md`
