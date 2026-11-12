# STORY-SPA-NF-13 — Issue-type identity icon

## Meta

- **Key:** `STORY-SPA-NF-13-issue-type-identity-icon`
- **Package:** [next-feed](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCH-DELTA…](ARCH-DELTA-live-civic-residual-2026-10-21.md) §1 · **L2** tech subtasks
- **Status:** P3 Done · gate BLOCK · T01–T04 Done · `pkg-000189` · [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-13-issue-type-identity-icon/STORY-SPA-NF-13-issue-type-identity-icon.md) · activation active · Await **P4/P5**
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) · M150 identity · [NF-icon-assets](STORY-SPA-NF-icon-assets.md)
- **Depends on:** NF-02 / NF-07 Present
- **Interview:** [INTERVIEW-NF-13-plus…](INTERVIEW-NF-13-plus-live-civic-residual-2026-10-21.md) **M1**
- **Artboard tip:** [M161 written](../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md) · [M161 PNG](../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.png)
- **Intake:** [analysis-m161-m162…](../../../analysis/analysis-m161-m162-generation-intake-2026-10-21.md) **PASS**
- **Assets Present:** `public/icons/next-feed/types/ic-issue-type-{INCIDENT,complaint,system_bug,observation,absurdity}.svg`
- **Code home:** `IssueTypeIcon.jsx` · `FeedCivicPost.jsx` · `issueTypeIcons.js` (new map) · icon catalog

## Зачем

Live card shows grey omit square beside issue id. OP: show icon matching `issue.type` (e.g. INCIDENT), not author avatar.

## L1 — FR

- **FR-NF-13.1** Identity slot binds `iconSrc` from explicit catalog map keyed by **exact** `issue.type` wire string (case-sensitive; `incident` ≠ `INCIDENT`).  
- **FR-NF-13.2** Catalog URLs (M161 §3 · §8):

  | Exact key | Runtime URL |
  |-----------|-------------|
  | `INCIDENT` | `/icons/next-feed/types/ic-issue-type-INCIDENT.svg` |
  | `complaint` | `/icons/next-feed/types/ic-issue-type-complaint.svg` |
  | `system_bug` | `/icons/next-feed/types/ic-issue-type-system_bug.svg` |
  | `observation` | `/icons/next-feed/types/ic-issue-type-observation.svg` |
  | `absurdity` | `/icons/next-feed/types/ic-issue-type-absurdity.svg` |

- **FR-NF-13.3** Geometry: slot **48×48** · radius **12** · glyph render **24×24** centered (M161 §4).  
- **FR-NF-13.4** Unknown / missing / unmapped type → honest omit (grey slot OK) · no invent glyph · `data-civic-identity-icon` honesty.  
- **FR-NF-13.5** No invent synonyms / glob discovery / HTTP.  
- **FR-NF-13.6** Glyph decorative vs type label: keep textual type badge authoritative (M161 §5 · §9).  
- **FR-NF-13.7** Vitest: each of 5 keys → src Present · unknown → omit.  
- **FR-NF-13.8** [NF-icon-assets](STORY-SPA-NF-icon-assets.md) rows for `types/*` Present after promote (intake already promoted files).

## Вне scope

Author avatar · topic-label chip rewrite · image-gen posters · NF-14…16 · invent OP PASS · invent type aliases

## L1 — Acceptance Criteria

- [ ] Known type shows catalog icon in 48×48 slot (glyph 24)  
- [ ] Exact key map only (no silent lowercase alias)  
- [ ] Unknown omit held  
- [ ] Map module explicit · no glob  
- [ ] Vitest 5+1  
- [ ] Icon catalog docs updated  
- [ ] OP eye after Apply (Absent = BLOCK)

## L1.5 — Arch locks

Cite [ARCH-DELTA §1](ARCH-DELTA-live-civic-residual-2026-10-21.md) · M161 SSOT · supersedes “Await UX gen” / invent SVG.

## L2 — Technical subtasks

> Skill: `react-expert` · assets **Present** · bind only

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-nf-13-t01-catalog-docs` | Await | Register 5 type icons in NF-icon-assets + disk count | STORY-SPA-NF-icon-assets.md | 13.8 |
| `task-spa-nf-13-t02-map` | Await | `issueTypeIconForType(type)` exact Object.freeze map | `src/i18n/issueTypeIcons.js` (or `features/feed/identity/`) | 13.1 · 13.2 · 13.5 |
| `task-spa-nf-13-t03-bind` | Await | FeedCivicPost `iconSrc={issueTypeIconForType(issue.type)}` · IssueTypeIcon geometry | FeedCivicPost · IssueTypeIcon | 13.3 · 13.4 · 13.6 |
| `task-spa-nf-13-t04-vitest` | Await | 5 keys + unknown omit | `__tests__` | 13.7 |

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Identity slot shows type icon for the five catalogued exact keys; omit otherwise.
