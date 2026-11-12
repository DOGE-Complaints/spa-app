# SPA-CT-29-T02 — Same stub on detail mount

**Status:** Done  
**Story:** [`../STORY-SPA-CT-29-next-feed-civic-media-stub.md`](../STORY-SPA-CT-29-next-feed-civic-media-stub.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-29-next-feed-civic-media-stub.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-29-next-feed-civic-media-stub.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T21:25:23Z`  
**Done:** `2026-10-20T21:34:58Z`  
**Package:** `pkg-000188`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · stub `/assets/dogefeed.png`

## Purpose

FR-CT-29.2: Issue detail / mount civic surface uses the **same** stub asset (no second placeholder).

## Code Facts (verify)

- `FeedIssueDetail.jsx` mounts `FeedCivicPost` · **Present**
- Parity via shared `CIVIC_MEDIA_STUB_PATH` · list+detail Match · **Present**

## Constraints

- Single asset path · no second placeholder · no invent image-gen HTTP/OP PASS  
- Path A gap + stub · NO BRIEF · Partial=**BLOCK**

## AC / DoD

- [x] Detail shows same stub as list
- [x] Single `/assets/dogefeed.png` path
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedIssueDetail.jsx` unchanged (shared FeedCivicPost media) · Path A stand detail surface · feed.ct29

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed
```

P3: feed.ct29 detail Match · shot 03 `cb6cd7402a0b`
