# EPIC-SPA-24 — Component Thread mount + `#/lab/feed` wire (M152 / M153 / M157)

> **ID:** `EPIC-SPA-24` · **Статус:** In Progress — tip **CT-35 P8** · `pkg-000228` · gate **BLOCK** · Story **BLOCKED** OP eye · SHAs `425ba43`/`9dcc699`/`4517b27` · soft CT-34 P8 BLOCK · prior CT-33 P8 · soft CT-32/31  

> **Тип:** Product / UX thread component (lab-first · pluggable · next/feed cutover)  
> **source:** [`../../backlog-stories/component-thread/INDEX.md`](../../backlog-stories/component-thread/INDEX.md)  
> **Parent REQ:** [`22-feed-visual-redesign-phase-1.md`](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4 · M152–M157 · M153a/b · M153c/d · M158  
> **Sibling:** [EPIC-SPA-23-component-reactions](../EPIC-SPA-23-component-reactions/EPIC-SPA-23-component-reactions.md) · CR-23  
> **Brief:** [`PRODUCT-BRIEF.md`](../../backlog-stories/component-thread/PRODUCT-BRIEF.md)  
> **Tip mirror:** [`INTERVIEW-CT-28-plus…`](../../backlog-stories/component-thread/INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md) · prior [`INTERVIEW-CT-25-plus…`](../../backlog-stories/component-thread/INTERVIEW-CT-25-plus-attach-density-share-residual-2026-10-20.md)  
> **Gap analysis:** [next/feed cutover](../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · [CT-25…27 Present](../../../analysis/analysis-ct25-ct27-code-present-vs-intake-2026-10-20.md) · [intake M153c/d](../../../analysis/analysis-m153c-m153d-generation-intake-2026-10-20.md)  
> **Architecture:** [`ARCHITECTURE.md`](../../backlog-stories/component-thread/ARCHITECTURE.md) §13–15 · [human](../../backlog-stories/component-thread/ARCHITECTURE-human-guide.md)  
> **Code home:** `src/features/thread-mount/` · CT-16…35 Present · tip **CT-35** P8 local close (BLOCKED OP eye)  


> **Route tip:** `#/lab/feed` · cutover target `#/next/feed` (CT-28)  


---

## Назначение

Greenfield **ThreadMount** (IssueThreadBlock + CommentTree + ThreadComposer + AttachmentRef + lab VerifyWriteGate) + wire into `#/lab/feed` with reactions plugged via existing `reactions-mount`. Post is first host; package stays pluggable. Configurable `max_depth` / `maxAttachments`.

## Состав

| Story | Тема | Status | Backlog |
|-------|------|--------|---------|
| CT-01 | M152 IssueThreadBlock states | P3 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-01-issue-thread-block-states/STORY-SPA-CT-01-issue-thread-block-states.md) · `pkg-000159` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-01-issue-thread-block-states.md) |
| CT-02 | Host Comment strip composition | P3 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-02-host-comment-strip-composition/STORY-SPA-CT-02-host-comment-strip-composition.md) · `pkg-000160` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-02-host-comment-strip-composition.md) |
| CT-03 | CommentTree nesting · max_depth | P3 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-03-comment-tree-nesting/STORY-SPA-CT-03-comment-tree-nesting.md) · `pkg-000161` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-03-comment-tree-nesting.md) |
| CT-04 | ThreadComposer | P3/P5 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-04-thread-composer/STORY-SPA-CT-04-thread-composer.md) · `pkg-000162` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-04-thread-composer.md) |
| CT-05 | Attachments · maxAttachments | P3/P5 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-05-attachments-max-config/STORY-SPA-CT-05-attachments-max-config.md) · `pkg-000163` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-05-attachments-max-config.md) |
| CT-06 | Branch disclosure local | P3/P5 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-06-branch-disclosure/STORY-SPA-CT-06-branch-disclosure.md) · `pkg-000164` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-06-branch-disclosure.md) |
| CT-07 | M157 VerifyWriteGate lab | P3/P5 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-07-verify-write-gate-lab/STORY-SPA-CT-07-verify-write-gate-lab.md) · `pkg-000165` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-07-verify-write-gate-lab.md) |
| CT-08 | Lab feed cutover | P3/P5/P8 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-08-lab-feed-cutover/STORY-SPA-CT-08-lab-feed-cutover.md) · `pkg-000166` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-08-lab-feed-cutover.md) |
| CT-09 | Reactions plug on nodes | P1.3 activated · gate BLOCK · [pipeline](stories/STORY-SPA-CT-09-reactions-plug-comment-nodes/STORY-SPA-CT-09-reactions-plug-comment-nodes.md) · `pkg-000167` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-09-reactions-plug-comment-nodes.md) |
| CT-10 | Empty entry + empty icon | P3/P5 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-10-empty-entry-chrome/STORY-SPA-CT-10-empty-entry-chrome.md) · `pkg-000168` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md) |
| CT-11 | Composer icon chrome | P3/P5 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-11-composer-icon-chrome/STORY-SPA-CT-11-composer-icon-chrome.md) · `pkg-000169` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md) |
| CT-12 | Inline reply placement | P3/P5 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-12-inline-reply-placement/STORY-SPA-CT-12-inline-reply-placement.md) · `pkg-000170` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-12-inline-reply-placement.md) |
| CT-13 | Comment React/Reply chrome | P3/P5 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-13-comment-action-chrome/STORY-SPA-CT-13-comment-action-chrome.md) · `pkg-000171` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-13-comment-action-chrome.md) |
| CT-14 | Spine · bubbles · fixtures | P3/P5 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-14-spine-bubbles-fixtures/STORY-SPA-CT-14-spine-bubbles-fixtures.md) · `pkg-000172` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-14-spine-bubbles-fixtures.md) |
| CT-15 | Lab host residual | P6 T06 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-15-lab-host-residual/STORY-SPA-CT-15-lab-host-residual.md) · `pkg-000173` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md) |
| CT-16 | Dual-append post ownership | P6 T05 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-16-dual-append-post-ownership/STORY-SPA-CT-16-dual-append-post-ownership.md) · `pkg-000174` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-16-dual-append-post-ownership.md) |
| CT-17 | M153a attachment picker path | P6 T06 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-17-attachment-picker-path/STORY-SPA-CT-17-attachment-picker-path.md) · `pkg-000175` · `run_mode=spa_ct17_p5_gap` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md) |
| CT-18 | M153b depth-2 token chrome A–D | P6 T06 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-18-depth2-token-chrome/STORY-SPA-CT-18-depth2-token-chrome.md) · `pkg-000176` · `run_mode=spa_ct18_p5_gap` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md) |
| CT-19 | AttachmentRef Ready/Denied paint | P6 T05 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-19-attachment-ref-token-paint/STORY-SPA-CT-19-attachment-ref-token-paint.md) · `pkg-000177` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md) |
| CT-20 | Lab audit fixtures + Puppeteer | P3 Done · gate BLOCK · [pipeline](stories/STORY-SPA-CT-20-lab-audit-fixtures/STORY-SPA-CT-20-lab-audit-fixtures.md) · `pkg-000178` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-20-lab-audit-fixtures.md) |
| CT-21 | Preview node budget · default expanded | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](stories/STORY-SPA-CT-21-preview-node-budget-default-expanded/STORY-SPA-CT-21-preview-node-budget-default-expanded.md) · `pkg-000179` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-21-preview-node-budget-default-expanded.md) |
| CT-22 | Comment attachment preview (+ `.md`) | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](stories/STORY-SPA-CT-22-comment-attachment-preview/STORY-SPA-CT-22-comment-attachment-preview.md) · `pkg-000180` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md) |
| CT-23 | Density · artboard frames only | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](stories/STORY-SPA-CT-23-thread-density-artboard-frames/STORY-SPA-CT-23-thread-density-artboard-frames.md) · `pkg-000181` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-23-thread-density-artboard-frames.md) |
| CT-24 | Share Issue link sheet | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](stories/STORY-SPA-CT-24-share-issue-link-sheet/STORY-SPA-CT-24-share-issue-link-sheet.md) · `pkg-000182` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-24-share-issue-link-sheet.md) |
| CT-25 | Composer attach chip preview + filename | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](stories/STORY-SPA-CT-25-composer-attach-chip-preview-filename/STORY-SPA-CT-25-composer-attach-chip-preview-filename.md) · `pkg-000183` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-25-composer-attach-chip-preview-filename.md) |
| CT-26 | Density v2 borderless fill | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](stories/STORY-SPA-CT-26-density-v2-borderless-fill/STORY-SPA-CT-26-density-v2-borderless-fill.md) · `pkg-000184` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-26-density-v2-borderless-fill.md) |
| CT-27 | Share IG disabled · Copy text-only | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](stories/STORY-SPA-CT-27-share-instagram-disabled-copy-text/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md) · `pkg-000185` | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md) |
| CT-28 | `#/next/feed` ThreadMount Live cutover | P5 APPLY · gate BLOCK · F1/F2 WAIVED · TASKED=0 · [disposition](../../../analysis/p5-disposition-STORY-SPA-CT-28-2026-10-20.md) · `pkg-000186` | [pipeline](stories/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md) | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md) |
| CT-29 | `#/next/feed` civic media stub dogefeed | P5 APPLY · gate BLOCK · F1/F2 WAIVED · TASKED=0 · `pkg-000188` | [pipeline](stories/STORY-SPA-CT-29-next-feed-civic-media-stub/STORY-SPA-CT-29-next-feed-civic-media-stub.md) | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-29-next-feed-civic-media-stub.md) |
| CT-30 | Live attach upload + tree map | P5 APPLY · gate BLOCK · F1/F2 WAIVED · TASKED=0 · `pkg-000193` · Await P8 | [pipeline](stories/STORY-SPA-CT-30-live-attach-ref-wire/STORY-SPA-CT-30-live-attach-ref-wire.md) | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-30-live-attach-ref-wire.md) |
| CT-31 | Live attach preview consumable (policy A) | P5 APPLY · gate BLOCK · `pkg-000195` · soft Await P8 | [pipeline](stories/STORY-SPA-CT-31-live-attach-preview-consumable/STORY-SPA-CT-31-live-attach-preview-consumable.md) | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md) |
| CT-32 | Thread dark chrome residual (OP D5·D6) | soft prior · [pipeline](stories/STORY-SPA-CT-32-thread-dark-chrome/STORY-SPA-CT-32-thread-dark-chrome.md) | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md) |
| CT-33 | Composer dark residual | soft P8 · [pipeline](stories/STORY-SPA-CT-33-composer-dark-residual/STORY-SPA-CT-33-composer-dark-residual.md) | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-33-composer-dark-residual.md) |
| CT-34 | Comment attach preview residual | P8 local close · gate **BLOCK** · `pkg-000227` | [pipeline](stories/STORY-SPA-CT-34-comment-attach-preview-residual/STORY-SPA-CT-34-comment-attach-preview-residual.md) | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-34-comment-attach-preview-residual.md) |
| CT-35 | Comment React empty/filled vs Reply (M174) | P8 local close · gate **BLOCK** · Story **BLOCKED** · `pkg-000228` · **tip** · SHAs `425ba43`/`9dcc699`/`4517b27` | [pipeline](stories/STORY-SPA-CT-35-comment-react-empty-harmony/STORY-SPA-CT-35-comment-react-empty-harmony.md) | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-35-comment-react-empty-harmony.md) |
| CT-api | Knobs/adapter docs | Todo | [backlog](../../backlog-stories/component-thread/STORY-SPA-CT-api-requirements.md) |

## Порядок

```text
Structure: CT-01 → CT-02 → CT-03 → CT-04 → CT-05 → CT-06 → CT-07 → CT-08 → CT-09
Chrome residual: CT-12 → CT-13 → CT-11 → CT-14 → CT-10 → CT-15
M153a/b gap coverage: CT-16 → CT-17 → CT-18 → CT-19 → CT-20
Interview residual: CT-21 → CT-22 → CT-23 → CT-24
Manual residual: CT-25 → CT-26 → CT-27
Next/feed cutover: CT-28 → CR-23 → CT-29
Live attach (REQ-05 bytes): HTTP-08 → HTTP-07 → CT-30 → CT-31 (policy A)
```

## Forbidden

Invent threads/attachment/Identity HTTP · invent CDN/URL · invent MIME/denied-submit · invent denser-than-accepted-sheet · invent Instagram upload API · invent image-gen HTTP · people inside thread-mount · hardcode maxAttachments/depth/previewBudget without config · invent OP PASS · Write runtime before P1.3 · `#/board` retire · Early Signal · reaction summary HOLD redesign

## Bullrun tip

**P8 CT-35 local close:** [`pkg-000228`](../../spa-active-packages/pkg-000228-20261024-epic-spa-24-ct-35-comment-react-empty-harmony.yaml) · gate **BLOCK** · Story **BLOCKED** (OP eye) · SHAs feat `425ba43` · test `9dcc699` · docs `4517b27` · NO PUSH. Wave `OP-spa nf25-wave5-20261024`. No invent OP PASS.

**Prior tip CT-34 P8 · `pkg-000227`:** soft BLOCK (OP eye) · superseded by CT-35 P8 above.

