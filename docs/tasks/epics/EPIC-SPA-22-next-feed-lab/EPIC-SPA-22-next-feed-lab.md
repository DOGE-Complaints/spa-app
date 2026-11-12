# EPIC-SPA-22 — Next Feed Lab (isolated visual debug)

> **ID:** `EPIC-SPA-22` · **Статус:** In Progress — tip **LAB-10** P3 structure Done · gate BLOCK (`pkg-000136` · `2026-10-13T19:24:46Z`) · LAB-01–02/06 Done · LAB-03/04/05/07/08/09/10 residual Blocked (OP eye)  
> **Тип:** Product / UX lab canvas `#/lab/feed` · greenfield deprecate + clean post plane · later port `#/next/feed` (LAB-05 after LAB-10)  
> **source:** [`../../backlog-stories/next-feed-lab/INDEX.md`](../../backlog-stories/next-feed-lab/INDEX.md) · [PRODUCT-BRIEF.md](../../backlog-stories/next-feed-lab/PRODUCT-BRIEF.md) · [VISUAL-DoD.md](../../backlog-stories/next-feed-lab/VISUAL-DoD.md)  
> **Sibling Related only (do not reopen):** [EPIC-SPA-20-next-feed](../EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md) · [EPIC-SPA-21-next-feed-vl](../EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)  
> **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md)  
> **Process lock:** lab-first · greenfield LAB-06…10 (`*Deprecated` + clean plane) · Partial=**BLOCK** · then LAB-05 port  
> **Route:** `#/lab/feed` inside `AppShellLayout` · port target `#/next/feed`  
> **Mode:** LAB-01–02/06 Done · LAB-03/04/05/07/08/09/10 Blocked residual (OP eye) · LAB-10 cutover Present

---

## Назначение

Доставить **изолированный lab canvas** для визуальной отладки feed; зафиксировать shallow lab plane как **Deprecated** (LAB-06); greenfield LAB-07…10; затем (LAB-05) перенести proven chrome на `#/next/feed` **после** LAB-10.

## Anti-mixing (epic lock)

| Rule | Enforcement |
|------|-------------|
| Lab Done | DS/greenfield compose + **visual gates** · Partial visual = **BLOCK** |
| Shallow LAB-03/04 plane | Deprecate via LAB-06 · not visual SSOT |
| Shared `features/feed/**` VL | **Do not rename** for lab deprecate tips |
| Greenfield Done path | `feed-lab/post/` only · ban `*Deprecated` · Controls.css · product hosts |
| Port (LAB-05) | After LAB-10 PASS · not before |
| `#/board` | Classic plane preserved |
| EPIC-20 / EPIC-21 | Related only — **do not reopen** |

## Состав

| Story | Тема | Tip | Status | Backlog |
|-------|------|-----|--------|---------|
| LAB-01 | Lab route + blank page | — | Done · P3 (foundation · not visual PASS) | [STORY](../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-01-lab-route-blank-page.md) |
| LAB-02 | Fixtures five cards + media stub | — | Done · P3 (data foundation) | [STORY](../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md) |
| LAB-03 | Atom compose (shallow) | — | Blocked · not visual SSOT | [STORY](../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md) |
| LAB-04 | Modal (shallow) | — | Blocked · not visual SSOT | [STORY](../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md) |
| LAB-05 | Port lab-proven to next-feed | — | Blocked / after LAB-10 | [STORY](../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md) |
| LAB-06 | Deprecate lab shallow plane | — | **Done** · P3 (`pkg-000132`) · gate PASS · NOT visual PASS | [STORY](../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md) |
| LAB-07 | Greenfield post card chrome | — | Blocked · P8 Done · OP eye Absent · Partial visual | [STORY](../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md) |
| LAB-08 | Greenfield reactions plane | — | Blocked · P8 Done · OP eye Absent · Partial visual | [STORY](../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md) · [pipeline](stories/STORY-SPA-NF-LAB-08-greenfield-reactions-plane/STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md) |
| LAB-09 | Greenfield discussion plane | — | Blocked · P8 Done · OP eye Absent · Partial visual | [STORY](../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md) · [pipeline](stories/STORY-SPA-NF-LAB-09-greenfield-discussion-plane/STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md) |
| LAB-10 | Greenfield overlay + cutover | — | Blocked · P3 structure Done · gate BLOCK · OP eye Absent | [STORY](../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md) · [pipeline](stories/STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates/STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md) |

## Порядок

```
LAB-01 → LAB-02 → LAB-06 → LAB-07 → LAB-08 → LAB-09 → LAB-10 → LAB-05
```

(LAB-03/04 shallow residual · superseded for visual SSOT by LAB-10)

## Active tip

**P3 LAB-10 structure Done · gate BLOCK `2026-10-13T19:24:46Z`.** [`pkg-000136`](../../spa-active-packages/pkg-000136-20261013-epic-spa-22-nf-lab-10-greenfield-overlay-cutover-gates.yaml) · T01–T04 Done · greenfield overlay + cutover Present · shots md5 `da88697b5523` · `14bbd48d4419` · `a2c67a961659` · `2e6facc1b3c7` · `0df2a2245d53` · **OP eye Absent** · Partial=**BLOCK** · `data-lab-visual-done=false`. Await OP P4. Do not invent OP PASS. Do not git push unless operator asks.
