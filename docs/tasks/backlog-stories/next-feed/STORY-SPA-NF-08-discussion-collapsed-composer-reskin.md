# STORY-SPA-NF-08 — Discussion collapsed + composer reskin (M152/M153)

## Meta
- **Key:** `STORY-SPA-NF-08-discussion-collapsed-composer-reskin`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-08-discussion-collapsed-composer-reskin/STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md)
- **Status:** Done · P3 (`2026-10-11T13:41:25Z`) · **`pkg-000110`**
- **Depends on:** NF-04 Done (Closed mount); NF-07 preferred for strip hierarchy; [ARCH-DELTA](ARCH-DELTA-visual-parity-wave-2026-10-11.md) **AD-VP-01**, **AD-VP-02**, **AD-VP-04**
- **Related:** parity audit F1, F4, F5 · H2/H5
- **Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`. Visual Done = live vs M152/M153 — not expanded-tree Path A alone.
- **Code home:** `features/feed/` presentation over Closed threads semantics · `#/next/feed*`
- **ui_scope:** `feed`
- **Arch:** [02 §1a–1b](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) — reskin mandatory; presentation boundary

## Зачем
Заменить classic DISCUSSION chrome (3 large buttons + always-expanded tree) на M152 collapsed THR-P-C + M153 tree/composer after expand.

## UX SSOT
- [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png)
- [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png)
- Must-states: `THR-P-A` loading · `THR-P-B` empty · `THR-P-C` **collapsed** (Reactions from residents / View discussion · **do not** expand full tree here) · `THR-P-D` unavailable · `THR-P-E` 390 · M153 tree/composer on expand
- Historical M143 actions (`Discussion`/`Invite` as primary row) **superseded** by M152

## Arch delta (откуда ноги)
Arch always said reuse **behind** presentation / reskin. NF-04 Path A must-state set THR-P-C = «literal bodies · reply» → expanded classic; P4 PASS. **AD-VP-01/02** make reskin + presentation boundary explicit so this story is authorized correction, not invent.

## Функциональные требования (FR)
- **FR-NF-08.1** Default populated = collapsed summary rows per M152 THR-P-C (not inline full CommentTree).
- **FR-NF-08.2** Remove duplicate primary React/Discussion action row inside Discussion when civic strip owns actions (F4).
- **FR-NF-08.3** Expand «View discussion» → M153 tree + oval composer (paperclip + circular send geometry).
- **FR-NF-08.4** States loading / empty+composer / unavailable+retry; fail-soft Issue intact.
- **FR-NF-08.5** Closed paths only; invite stub honesty remains (M156) without classic 3-button primary row.
- **FR-NF-08.L10N** `nextFeed.thread.*` / reuse `threadsFeed.*` where valid.

## Verify / edge matrix (local-five)
| Direction | Expect |
|-----------|--------|
| Loading | THR-P-A chrome; Issue intact |
| Empty | Invitation + composer entry |
| Populated collapsed | Summary rows; **no** full tree until expand |
| Expand | Nested tree; reply; max_depth honesty |
| Unavailable | Try again; Issue intact |
| Attach denied / post fail | Local honesty (M153) |
| Narrow 390 | THR-P-E |
| Live screenshots | vs M152 A–E + M153 tree/composer |

## Вне scope
M155; invent threads URLs; multipart blob; shell; weaken collapsed must-state

## Acceptance Criteria
- [x] Live THR-P-C collapsed per M152 (local-five)
- [x] No classic primary DISCUSSION 3-button row competing with civic strip
- [x] Expand → M153 tree + oval composer
- [x] Edges in matrix exercised; cites AD-VP-01/02
- [x] Closed client reuse; no second HTTP plane
