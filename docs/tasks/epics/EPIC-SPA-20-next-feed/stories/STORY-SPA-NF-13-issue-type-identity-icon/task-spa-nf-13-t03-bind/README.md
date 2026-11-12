# SPA-NF-13-T03 — FeedCivicPost iconSrc bind · IssueTypeIcon geometry

**Status:** Done  
**Story:** [`../STORY-SPA-NF-13-issue-type-identity-icon.md`](../STORY-SPA-NF-13-issue-type-identity-icon.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T11:28:13Z`  
**Done:** `2026-10-21T11:33:57Z`  
**Package:** `pkg-000189`  
**Path A:** [M161](../../../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md) · [PNG](../../../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.png)

## Purpose

FR-NF-13.3 · 13.4 · 13.6: FeedCivicPost `iconSrc={issueTypeIconForType(issue.type)}` · IssueTypeIcon geometry 48×48 / glyph 24×24 · unknown omit · type badge authoritative.

## Code Facts (verify)

- `FeedCivicPost.jsx` binds `issueTypeIconForType(issue.type)` · **Present**
- `IssueTypeIcon` glyph **24×24** · slot 48×48 · radius 12 · **Present**
- Types SVG · **Present**

## Constraints

- Path A M161 · NO BRIEF · Partial=**BLOCK**  
- `@mockup:` M161 md + PNG · no invent glyph / OP PASS / type aliases

## AC / DoD

- [x] Known type shows catalog icon in 48×48 slot (glyph 24)
- [x] Unknown omit held
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedCivicPost.jsx` · `IssueTypeIcon.jsx` · `IssueTypeIcon.css` · `FeedLabNf13Stand.jsx`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed
```

@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md  
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.png

P3: shot 02 `d1b10d8ac787` · shot 05 `9fdca31ce6c3`
