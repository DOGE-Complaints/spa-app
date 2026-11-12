# STORY-SPA-CR-07 — `#/lab/feed` cutover → ReactionsMount

## Meta

- **Key:** `STORY-SPA-CR-07-lab-feed-cutover`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Present · P5 TASKED=0 · P8 Done · `pkg-000143` · `2026-10-15T11:11:48Z`
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md) · lab context sibling [next-feed-lab](../next-feed-lab/INDEX.md)
- **Depends on:** [CR-05](STORY-SPA-CR-05-strip-open-dismiss.md) · [CR-06](STORY-SPA-CR-06-picker-chrome-layout.md) · [CR-api](STORY-SPA-CR-api-requirements.md)
- **Blocks:** CR-08…10 (composition wave)
- **UX mirror:** [OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md](OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.4
- **Code home:** `src/features/feed-lab/post/` (+ discussion) · mount `ReactionsMount` from `features/reactions-mount/`

## Зачем

Заменить lab-local `FeedReactionPlane` на greenfield **`ReactionsMount`**, чтобы OP тестировал strip/picker (CR-05/06) **в контексте поста и треда** на `#/lab/feed`.

## Current (verified)

| Piece | Path / fact |
|-------|-------------|
| Route | `#/lab/feed` · `App.jsx` |
| Plane today | [`FeedReactionPlane.jsx`](../../../../src/features/feed-lab/post/reactions/FeedReactionPlane.jsx) · `data-testid="feed-reaction-plane"` |
| Aggregate / picker today | `FeedReactionAggregate` · `FeedReactionPicker` (feed-lab local) |
| Mount sites | e.g. [`FeedDiscussionPlane.jsx`](../../../../src/features/feed-lab/post/discussion/FeedDiscussionPlane.jsx) (+ post card / detail paths that use plane) |
| Package target | [`ReactionsMount`](../../../../src/features/reactions-mount/ReactionsMount.jsx) |

## UX SSOT

- Mirror §3.4 · CR-05/06 interaction+layout locks  
- Slot: PostActionStrip / comment reaction zone (PRODUCT-BRIEF — no fifth strip)  
- **OOS:** `#/next/feed` production cutover; M155; invent HTTP

## API

- Lab default: FixtureAdapter (or equivalent in-memory contract compatible with CR-api) — **no invent PUT**  
- Optional LiveAdapter thin wrap later — fail-closed; not required for lab AC if fixtures cover states  
- Reuse `reactions.v1` catalog / knobs semantics — no second client  

## FR

- **FR-CR-07.1** On `#/lab/feed`, reaction UI for post-root + comment nodes uses **`ReactionsMount`** (not `FeedReactionPlane` as active path)  
- **FR-CR-07.2** CR-05 open/dismiss + CR-06 layout visible in post/thread context  
- **FR-CR-07.3** Root: no selectable Moderation; comment: three groups  
- **FR-CR-07.4** Tests updated: prefer `reactions-mount` / strip/picker testids; deprecate assertions that **require** `feed-reaction-plane` as sole plane  
- **FR-CR-07.5** Deprecated / classic `ReactionChrome` / Controls.css remain banned on greenfield path  
- **FR-CR-07.6** Document retire/keep of `FeedReaction*` modules (delete or Deprecated suffix — implement choice; no dual live planes)

## Вне scope

Production `#/next/feed` · M155 people · new HTTP · invent icons  

## Acceptance Criteria

- [ ] `#/lab/feed` shows ReactionsMount on root + comment reaction slots  
- [ ] Hover/empty-React/outside-close/light-X/hint-footer/hug-width behave per CR-05/06 in feed context  
- [ ] No invent HTTP; FixtureAdapter (or lab-local adapter with same props contract)  
- [ ] Vitest/lab smoke updated for new mount  
- [ ] `data-m155-oos` / no people UI  
- [ ] Verify URL: `http://127.0.0.1:5173/#/lab/feed`  

## DoD

OP can full-cycle test reactions on a civic post + thread without `#/lab/reactions` stands-only. `#/lab/reactions` may remain as stress/fixture stands (CR-03/04) — not deleted by this story unless redundant.
