# Interview SSOT — OP residual after Apply (marks 1–6)

- **Дата:** 2026-10-21  
- **Тип:** Markstack intake · post-Apply residual on `#/next/feed`  
- **Source:** [analysis-next-feed-op-residual-after-apply-2026-10-21.md](../../../analysis/analysis-next-feed-op-residual-after-apply-2026-10-21.md) · [evidence/op-residual-2026-10-21/](../../../analysis/evidence/op-residual-2026-10-21/)  
- **Пакеты:** [next-feed](INDEX.md) · sibling [component-thread](../component-thread/INDEX.md) · threads REQ-05 (link only)  
- **Prior interview:** [INTERVIEW-NF-13-plus…](INTERVIEW-NF-13-plus-live-civic-residual-2026-10-21.md) (NF-13…16 · CT-30) — holds except where superseded below  
- **Слои:** **L1** FR/AC · **L1.5** ARCH / ARCH-DELTA · **L2** tech subtasks  
- **Wave delivery lock:** **1A** — docs only (interview · stories · arch). **No** product Apply this wave.  
- **Method:** [markstack.md](../../../../../docs/methodology/Zeya888-builder-queue/guides/markstack.md)

## Решения оператора

| # | Тема | Решение |
|---|------|---------|
| W1 | Delivery | Docs Markstack only (**1A**) · Apply / P1.3 отдельно |
| C1 | Strip under media (mark 1) | Убрать hairline: neutralize `.feed-civic-post-actions { border-top }` under media |
| C2 | Icons (mark 2) | Primary **24** held · **reaction marks** bump tip **20 CSS px** (was 14) |
| C3 | Spacing (mark 3) | Tighten strip vertical empty vs OP/M162: tip `padding-top` **4** · `margin-top` **0** · keep touch **≥44** |
| C5 | Summary font (mark 5) | Bump `.feed-civic-post-summary` tip **1rem** (was 0.875rem / ~12.25px) |
| C4 | Discussion unavailable (mark 4) | **HOLD** — intermittent; no STORY until reproducible probe |
| A6 | Attach preview broken (mark 6) | Citizen must see image when tree has `published_url` · **policy Open A\|B** (block Apply until OP lock) |
| A6-A | Policy A (tip default for SPA L2) | SPA `fetch(published_url, Authorization)` → blob → objectURL in preview |
| A6-B | Policy B | Threads signed/public GET for `<img>` · **HTTP-09** + REQ-05 AC amend · **name ≠ create** until OP picks B |
| OOS | — | Invent CDN · invent OP PASS · multipart on comment POST · reopen NF-13/14/16 structure Done · empty pipeline trees |

## Факты из кода (не обсуждаемо)

1. NF-13 type icon · NF-14 hit-target · NF-16 more deferred — structure **Present** (prior Apply + residual §4).  
2. NF-15 density/unframe — Partial visual vs OP eye (marks 2–3).  
3. `.feed-civic-post-actions { border-top: 1px solid }` Present — mark 1.  
4. `.feed-civic-post-icon` **24** · `.feed-civic-post-reaction-mark` **14** — mark 2.  
5. Actions `padding-top: 8` · `margin-top: 4` · `min-height: 44` — mark 3 OP excess.  
6. `.feed-civic-post-summary { font-size: 0.875rem }` → computed ~12.25px — mark 5.  
7. CT-30: `uploadAttachment` + tree map `published_url` Present · GET attach **Bearer required** · `CommentAttachmentPreview` bare `<img src>` → **401** without Bearer — mark 6.  
8. Mark 4: OP shot Present · puppeteer on `5111bcba…` discussion loaded this run — intermittent.

## Story allocation

| Gap | Artifact | Package |
|-----|----------|---------|
| Chrome marks 1 · 2 · 3 · 5 | **NF-17** | next-feed |
| Attach preview consumable (mark 6) | **CT-31** | component-thread |
| GET auth change (only if B) | **HTTP-09** (deferred · no file) | doge-threads |
| Discussion unavailable (mark 4) | — | HOLD |

**Order (docs tip):** NF-17 ‖ CT-31 (independent) · CT-31 Apply blocked on A\|B lock · if B then HTTP-09 → CT-31.  
**Apply:** separate OP go-ahead (lock W1).

## Explicit non-goals

Product JSX this wave · invent OP PASS · invent CDN · invent HTTP-09 file without policy B · invent REQ-06 · reopen NF-13/14/16 structure · mark 4 story · empty epic pipeline folders

## Sufficiency

| Need | Verdict |
|------|---------|
| UX gen | **No** — CSS/code lock from OP + M162; mark 6 = contract |
| Sibling REQ | **Maybe** amend REQ-05 if policy **B**; else SPA-only CT-31 |
| CSS/code lock | **Yes** NF-17 |
