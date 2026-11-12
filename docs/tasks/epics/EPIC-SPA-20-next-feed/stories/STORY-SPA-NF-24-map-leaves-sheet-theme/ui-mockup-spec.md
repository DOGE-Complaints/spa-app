# ui-mockup-spec — STORY-SPA-NF-24 (Path A)

> Path A · p13UxReady · no UX gen · P1.3 `2026-10-23T13:29:56Z` · **NO BRIEF**  
> Continuity: Interview **M1** · [ARCH-DELTA §12](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · [evidence 01](../../../../../analysis/evidence/op-residual-wave4-2026-10-23/01-map-leaves-sheet-dark-on-light.png) Present

## Target

- Interview **M1** — leaves sheet + pin popup + MapIssuePreview follow `data-theme` (light→light)
- Naming: pin atom = `IssueMapPin` · cluster UI = **leaves sheet** (`board-issues-map-leaves`)
- Code home: `BoardIssuesMap.css` · soft `MapIssuePreview` / `MapChrome.css`

## Delta vs AS-IS

Hardcoded navy fill on leaves/popup may ignore light theme → bind surface/text tokens to `data-theme` · soft MapIssuePreview dark-only fallback removed in light · dark readability held.

## Partial

OP eye Absent → visual gate **BLOCK** · no invent OP PASS · no invent basemap.

## @mockup

```text
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave4-2026-10-23/01-map-leaves-sheet-dark-on-light.png
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md
```
