# Next Feed Lab — Product Brief (isolated feed visual debug)

> **Locked intent:** operator interview 2026-10-13 — blank lab page to debug feed post / reactions / thread / modal **in isolation** from gateway/threads HTTP and from feed-host chrome (toolbar/map).  
> **Status:** Materialized постановка · Todo implement  
> **Route:** `#/lab/feed` inside `AppShellLayout` (shell present, not visual Done subject)  
> **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) · sibling [next-feed-vl](../next-feed-vl/INDEX.md) (Related only)  
> **Gap SSOT:** [analysis-next-feed-ds-component-implementation-gaps-2026-10-12.md](../../../analysis/analysis-next-feed-ds-component-implementation-gaps-2026-10-12.md)  
> **DS SSOT:** [DOGEstonia-next-feed-component-design-system-v1.0.md](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md)  
> **Artboards:** M149 (list rhythm) · M150 (post+media) · M152–M153 (discussion) · M154 (reactions) · M158 (modal)  
> **Interview locks:** [zeya888.feed-lab-interview-next-feed-lab-2026-10-13.md](../../../analysis/zeya888.feed-lab-interview-next-feed-lab-2026-10-13.md)  
> **Visual DoD:** [VISUAL-DoD.md](VISUAL-DoD.md) — Partial=**BLOCK** · ban classic CSS/shelter · checklist+screenshot+OP  
> **Process lock (OP 2026-10-13):** Lab-first + visual DoD (Partial=BLOCK) · **greenfield wave LAB-06…10** (scoped `*Deprecated` + clean `feed-lab/post/`) — [approach](../../../analysis/analysis-next-feed-lab-greenfield-deprecate-approach-2026-10-13.md) · then **LAB-05** port · prior A+C restyle-in-place **superseded for residual** by OP greenfield ask

## One-liner

Собрать **пустой canvas** `#/lab/feed` с **заново смонтированными DS-атомами** (не product hosts), **5 fixture-карточек**, одна media-заглушка, клик по тексту/картинке → modal — довести вид до артбордов по hard visual DoD, **затем** перенести proven chrome на `#/next/feed`.

## Operator locks (interview)

| # | Lock |
|---|------|
| Q1 | Route **inside** shell; content = lab canvas only (**B**) |
| Q2 | Compose from **DS atoms only** — no `FeedCivicPost` / `FeedDiscussionBlock` / `BoardIssuePost` on lab Done path (**A**) |
| Q3 | **5** fixture cards, same image (**B**) |
| Q4 | Modal open = click **title/summary + media** only; action strip excluded (**A**) |
| Q5 | Identity demo ids `DOGEstonia-UusVeerenni-001`…`005` (JIRA-like; fixture-only, not production API) (**A**+OP) |
| Q6 | Package **4 stories** LAB-01…04 (**A**) — extended → LAB-05 port · **+ LAB-06…10 greenfield** (OP 2026-10-13) |
| Q7 | URL `#/lab/feed` (**A**) |

## Process / anti-failure locks (post-interview)

| Lock | Detail |
|------|--------|
| Lab-first + F | Lab visual SSOT · checklist **and** OP eye |
| Greenfield scoped | Lab-owned `*Deprecated` · new `feed-lab/post/**` · **no** shared VL rename |
| Partial visual | **BLOCK** (not documentable PASS) |
| Classic CSS | Ban `ReactionControls.css` / board `*Controls.css` on lab Done |
| Shelter | Ban `BoardIssuePost` on lab; remove from next list on LAB-05 |
| Export-exists | ≠ Done |
| Port | Only LAB-05 after lab gates; do not mutate `#/next/feed` early |
| Written > PNG | Artboard written § SSOT over generated pixels |
| name ≠ create | Asset/screenshot paths named until implement |

## Defaults closed without extra turn

| Topic | Default |
|-------|---------|
| HTTP | **None** — fixtures only; no gateway/threads clients on lab page |
| Reactions | Local in-memory selection from fixture catalog; **no** PUT |
| Discussion in list | Collapsed summary + expand; full tree OK in modal |
| `IssueTypeIcon` | Locked-omit until Promote path (no invent SVG) |
| Media file | `/assets/dogefeed.png` — target **1600×900** (16:9); may be absent until OP drops file |
| Schema overlay | OOS (M150 SSR-C future) |
| DISCUSSION copy | Not Done on lab — use DS/lab strings |
| Product publicLabel | Do not invent Closed field; fixture ids lab-only until API |

## In scope

- Lab route + blank page  
- 5 fixtures + shared media stub slot  
- Atom composition: identity, text, media stub, post actions, ReactionChrome atoms, discussion atoms  
- Modal via `OverlayHost` + `IssuePresentationLayout`  
- Visual gates per [VISUAL-DoD.md](VISUAL-DoD.md)  
- Port wave LAB-05 after gates  

## Out of scope

- Mutate `#/next/feed` **before** lab visual PASS  
- Reopen NF / VL story bodies (except Required cites for port)  
- Classic `#/board` mutate  
- Real media resolver / invent API  
- Shell redesign  
- M155 people reactions  
- PASS by unit «export exists» / Partial visual as Done  

## Tip order

Foundation: `LAB-01 → LAB-02`  
Shallow (history): `LAB-03 → LAB-04` (not visual SSOT after greenfield)  
**Active:** `LAB-06 → LAB-07 → LAB-08 → LAB-09 → LAB-10 → LAB-05`
