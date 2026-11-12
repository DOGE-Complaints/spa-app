# SPA-CT-02-T02 — Card Comment zone → apiRef

**Status:** Done  
**Story:** [`../STORY-SPA-CT-02-host-comment-strip-composition.md`](../STORY-SPA-CT-02-host-comment-strip-composition.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-02-host-comment-strip-composition.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-02-host-comment-strip-composition.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:07:07Z`  
**Package:** `pkg-000160`  
**@mockup:** OP-UX-MIRROR §4.1 P-strip  
**extends ui-mockup:** `../task-spa-ct-02-t01-thread-api-ref/ui-mockup-spec.md` (on P3)  
**Runtime:** P3 Done · Await P4 · depends T01

## Purpose

FR-CT-02.1 · 02.5: Wire `onZone('comment')` on `FeedPostCard` / detail → ThreadMount apiRef. Preserve expand. React/Reactions zones unchanged.

## Constraints

- Strip stays dumb — no ThreadMount import in strip  
- Hold reactions pattern · no invent HTTP/OP PASS

## AC / DoD

- [x] Comment zone → expand + focus Present
- [x] React/Reactions held

## Where to change

`FeedPostCard.jsx` · `FeedIssueDetailBody.jsx` · `FeedLabThreadMount` host wire (P3)

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed-lab
```
