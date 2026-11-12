# Acceptance verification — STORY-SPA-NF-VL-10

**Stamp:** `2026-10-12T16:14:56Z` · **pkg-000124** · **Result:** **PASS**  
**Path A:** M151 · DS §9 · AD-VL-01/02 · live Vite `:5173` + gateway `:8000` + threads `:8001` UP (local-five)

## Tasks

| Task | Status | Evidence |
|------|--------|----------|
| T01 as-is / shelter map | Done | FeedMapArea `feed-map-partial` / BoardIssuesMap cites · ban classic map Done without DS |
| T02 DS map modules | Done | `features/feed/map/*` · vitest nfvl10 |
| T03 semantics seam | Done | `listPinCapableIssues` / issueGeo Closed · no invent map HTTP |
| T04 wire / displace shelter | Done | MapSubsetNotice + BoardMap + MapIssuePreview + MapAttribution + MapStatePanel |
| T05 anti-mixing + verify | Done | this gate · screenshots · `#/board?view=map` smoke 05 |
| T06 docs residual | Done | surface map `map/` Present |

## UI / Path A

- [x] Live BoardMap + MapAttribution (01) · sips 1536×1024
- [x] Map crop honest dims (02) · sips **768×564** (filename matches)
- [x] Map host Present; pin-preview Path A miss labelled (03) · MapIssuePreview wired in code/vitest
- [x] MapStatePanel error Present (04)
- [x] `#/board?view=map` smoke — no VL BoardMap / MapSubsetNotice / MapIssuePreview / MapStatePanel (05)
- [x] Story-root screenshots Present
- [x] Vitest nfvl10 + nf03 + dictionary + BoardIssuesMap PASS
- [x] Anti-mixing / no invent map API

## Locks honored

No invent map API/tiles · no mutate classic `#/board` beyond smoke · no git push · pkg-000124 immutable
