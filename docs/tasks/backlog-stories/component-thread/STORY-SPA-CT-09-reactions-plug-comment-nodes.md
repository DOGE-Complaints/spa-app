# STORY-SPA-CT-09 — Reactions plug on CommentNode

## Meta

- **Key:** `STORY-SPA-CT-09-reactions-plug-comment-nodes`
- **Package:** [component-thread](INDEX.md)
- **Status:** P3 Done · tip · `pkg-000167` · gate BLOCK · `2026-10-18T14:42:44Z` · Await P4
- **Depends on:** CT-03 · [component-reactions](../component-reactions/INDEX.md) Present
- **UX mirror:** §4.2 T-react · §4.4 R-plug/R-bound
- **Arch:** §5 diagram · reactions peer package
- **Reactions lock:** [arch-mirror-reactions…](../../../analysis/arch-mirror-reactions-scalable-hosts-and-strip-actions-2026-10-18.md) §7

## Зачем

На каждом комментарии — тот же `ReactionsMount` (`target=comment`), без Share/Reactions зон на ноде и без people UI внутри thread-mount.

## FR

- **FR-CT-09.1** Each CommentNode renders reactions slot via `FeedLabReactionsMount` / `ReactionsMount` `target=comment` + `commentId`.  
- **FR-CT-09.2** Node actions: React (+ Reply if eligible) only — no Share/Reactions strip on comment.  
- **FR-CT-09.3** Thread package does not import ReactorsPopover / open people.  
- **FR-CT-09.4** Root post reactions remain in card strip reactSlot (unchanged).  
- **FR-CT-09.5** Lab FixtureAdapter for comment reactions · Live fail-closed held.

## Вне scope

People on comment aggregate invent · CR-20…22 icon residual · dual reaction stacks

## Acceptance Criteria

- [x] Nested comments show React control from reactions-mount  
- [x] Opening React opens picker · not thread composer steal  
- [x] Vitest comment target + no people import in thread-mount  
- [ ] OP eye  

## Technical subtasks

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-09-t01-node-reaction-slot` | Done | Render prop / slot for reactions on CommentNode | `tree/CommentNode.jsx` · ThreadMount | 09.1–09.2 |
| `task-spa-ct-09-t02-lab-wire` | Done | FeedLabReactionsMount per comment id | FeedLabThreadMount / node | 09.1 · 09.5 |
| `task-spa-ct-09-t03-boundary-guard` | Done | Ensure no people/popover import in thread-mount | package lint/test | 09.3–09.4 |
| `task-spa-ct-09-t04-vitest-plug` | Done | data-rm-target=comment on nodes | tests | AC |

## DoD

Reactions stay pluggable peer; thread stays discussion-only.
