# SPA-NF-13-T04 — Vitest 5 keys + unknown omit

**Status:** Done  
**Story:** [`../STORY-SPA-NF-13-issue-type-identity-icon.md`](../STORY-SPA-NF-13-issue-type-identity-icon.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T11:28:13Z`  
**Done:** `2026-10-21T11:33:57Z`  
**Package:** `pkg-000189`  
**Path A:** [M161](../../../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md)

## Purpose

FR-NF-13.7: Vitest — each of 5 keys → src Present · unknown → omit · no silent lowercase alias.

## Code Facts (verify)

- `feed.nf13.test.jsx` · **Present** · `issueTypeIcons.nf13.test.js` · **Present** · `feedLab.nf13` · **Present**
- Path A `scripts/tmp-nf13-capture.mjs` · shots 01–05 · **Present**

## Constraints

- No invent type aliases / HTTP / OP PASS · Path A M161 · Partial=**BLOCK**

## AC / DoD

- [x] Vitest 5+1 (keys + unknown)
- [x] Exact key map only asserted
- [x] Unknown omit held

## Where changed

`src/features/feed/__tests__/feed.nf13.test.jsx` · `src/i18n/__tests__/issueTypeIcons.nf13.test.js` · `feedLab.nf13.test.jsx` · `tmp-nf13-capture.mjs`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/i18n/__tests__/issueTypeIcons.nf13.test.js src/features/reactions-mount src/features/thread-mount
```

P3: suite **451/451** · feed.nf13 **4/4** · issueTypeIcons.nf13 **3/3** · feedLab.nf13 **2/2** · md5 `0e4f1a74b5f7` · `d1b10d8ac787` · `2751186b0b27` · `d81c6bb487c0` · `9fdca31ce6c3`
