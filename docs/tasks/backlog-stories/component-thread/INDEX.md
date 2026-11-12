# component-thread — INDEX

> **Пакет:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4 / related M152–M157 · sibling [REQ-24 reactions](../../../requirements/24-reactions-mount-lab.md)  
> **Режим:** ADMIN Variant B (UX-ready) · **omit ADMIN-01/02**  
> **Admin:** omit 01/02 · catalogs via artboards + CT-api  
> **Epic:** [EPIC-SPA-24-component-thread](../../epics/EPIC-SPA-24-component-thread/EPIC-SPA-24-component-thread.md) · tip **CT-35 P1.3** `pkg-000228` · soft **CT-34** P8 BLOCK · [intake M174](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) **PASS** · soft **CT-33** P8 · prior CT-32 P8 · soft CT-31 · interview [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md)
 

> **OP UX mirrors:** [interview NF-21+ wave3](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) · [interview NF-18+ wave2](../next-feed/INTERVIEW-NF-18-plus-op-residual-map-dark-2026-10-21.md) · [interview NF-17+](../next-feed/INTERVIEW-NF-17-plus-op-residual-chrome-attach-2026-10-21.md) · [interview NF-13+](../next-feed/INTERVIEW-NF-13-plus-live-civic-residual-2026-10-21.md) · [interview CT-28+](INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md) · [interview CT-25+](INTERVIEW-CT-25-plus-attach-density-share-residual-2026-10-20.md)  
> **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md) · [human guide](ARCHITECTURE-human-guide.md) · method [markstack](../../../../../docs/methodology/Zeya888-builder-queue/guides/markstack.md) · [L1/L1.5/L2 analysis](../../../analysis/method-l1-l15-l2-story-intake-and-retrospective-2026-10-21.md)  
> **Gap analysis:** [wave3 evidence](../../../analysis/evidence/op-residual-wave3-2026-10-22/) · [wave2 evidence](../../../analysis/evidence/op-residual-wave2-2026-10-21/) · [OP residual after Apply](../../../analysis/analysis-next-feed-op-residual-after-apply-2026-10-21.md) · [next/feed cutover](../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · [CT-25…27 Present](../../../analysis/analysis-ct25-ct27-code-present-vs-intake-2026-10-20.md)  
> **Sync lock:** [arch-mirror-component-thread-sync](../../../analysis/arch-mirror-component-thread-sync-2026-10-18.md)  
> **Reactions boundary:** [arch-mirror-reactions…](../../../analysis/arch-mirror-reactions-scalable-hosts-and-strip-actions-2026-10-18.md) · sibling [CR-23](../component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md)  

> **Code home:** `src/features/thread-mount/` · lab CT-16…27 Present · CT-28 P5 tip (next/feed Live)  



> **Lab host tip:** `#/lab/feed` · cutover target `#/next/feed`

## Product stories

| Key | Backlog | Status | Depends | Artboard |
|-----|---------|--------|---------|----------|
| CT-01 | [STORY-SPA-CT-01-issue-thread-block-states.md](STORY-SPA-CT-01-issue-thread-block-states.md) | P3 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-01-issue-thread-block-states/STORY-SPA-CT-01-issue-thread-block-states.md) · `pkg-000159` | — | M152 A–E |
| CT-02 | [STORY-SPA-CT-02-host-comment-strip-composition.md](STORY-SPA-CT-02-host-comment-strip-composition.md) | P3 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-02-host-comment-strip-composition/STORY-SPA-CT-02-host-comment-strip-composition.md) · `pkg-000160` | CT-01 | M152 strip |
| CT-03 | [STORY-SPA-CT-03-comment-tree-nesting.md](STORY-SPA-CT-03-comment-tree-nesting.md) | P3 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-03-comment-tree-nesting/STORY-SPA-CT-03-comment-tree-nesting.md) · `pkg-000161` | CT-01 | M153 A/B |
| CT-04 | [STORY-SPA-CT-04-thread-composer.md](STORY-SPA-CT-04-thread-composer.md) | P3/P5 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-04-thread-composer/STORY-SPA-CT-04-thread-composer.md) · `pkg-000162` | CT-03 | M153 C/F/G |
| CT-05 | [STORY-SPA-CT-05-attachments-max-config.md](STORY-SPA-CT-05-attachments-max-config.md) | P3/P5 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-05-attachments-max-config/STORY-SPA-CT-05-attachments-max-config.md) · `pkg-000163` | CT-04 | M153 D/E |
| CT-06 | [STORY-SPA-CT-06-branch-disclosure.md](STORY-SPA-CT-06-branch-disclosure.md) | P3/P5 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-06-branch-disclosure/STORY-SPA-CT-06-branch-disclosure.md) · `pkg-000164` | CT-03 | M153 branch |
| CT-07 | [STORY-SPA-CT-07-verify-write-gate-lab.md](STORY-SPA-CT-07-verify-write-gate-lab.md) | P3/P5 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-07-verify-write-gate-lab/STORY-SPA-CT-07-verify-write-gate-lab.md) · `pkg-000165` | CT-04 | M157 A–F |
| CT-08 | [STORY-SPA-CT-08-lab-feed-cutover.md](STORY-SPA-CT-08-lab-feed-cutover.md) | P3/P5/P8 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-08-lab-feed-cutover/STORY-SPA-CT-08-lab-feed-cutover.md) · `pkg-000166` | CT-01…07 | lab wire |
| CT-09 | [STORY-SPA-CT-09-reactions-plug-comment-nodes.md](STORY-SPA-CT-09-reactions-plug-comment-nodes.md) | P1.3 activated · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-09-reactions-plug-comment-nodes/STORY-SPA-CT-09-reactions-plug-comment-nodes.md) · `pkg-000167` | CT-03 · CR package | M153 React |
| CT-10 | [STORY-SPA-CT-10-empty-entry-chrome.md](STORY-SPA-CT-10-empty-entry-chrome.md) | P3/P5 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-10-empty-entry-chrome/STORY-SPA-CT-10-empty-entry-chrome.md) · `pkg-000168` | CT-01 | G-H1 · G-M1 |
| CT-11 | [STORY-SPA-CT-11-composer-icon-chrome.md](STORY-SPA-CT-11-composer-icon-chrome.md) | P3/P5 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-11-composer-icon-chrome/STORY-SPA-CT-11-composer-icon-chrome.md) · `pkg-000169` | CT-04 · CT-05 | G-H2 · G-H6 |
| CT-12 | [STORY-SPA-CT-12-inline-reply-placement.md](STORY-SPA-CT-12-inline-reply-placement.md) | P3/P5 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-12-inline-reply-placement/STORY-SPA-CT-12-inline-reply-placement.md) · `pkg-000170` | CT-03 · CT-04 | G-H4 |
| CT-13 | [STORY-SPA-CT-13-comment-action-chrome.md](STORY-SPA-CT-13-comment-action-chrome.md) | P3/P5 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-13-comment-action-chrome/STORY-SPA-CT-13-comment-action-chrome.md) · `pkg-000171` | CT-09 · soft CR | G-H5 |
| CT-14 | [STORY-SPA-CT-14-spine-bubbles-fixtures.md](STORY-SPA-CT-14-spine-bubbles-fixtures.md) | P3/P5 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-14-spine-bubbles-fixtures/STORY-SPA-CT-14-spine-bubbles-fixtures.md) · `pkg-000172` | CT-03 · CT-08 | G-H7 · G-H8 · G-L2 |
| CT-15 | [STORY-SPA-CT-15-lab-host-residual.md](STORY-SPA-CT-15-lab-host-residual.md) | P6 T06 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-15-lab-host-residual/STORY-SPA-CT-15-lab-host-residual.md) · `pkg-000173` | CT-01 · CT-06 · CT-08 · soft CR | G-M2…M4 · G-L5 |
| CT-16 | [STORY-SPA-CT-16-dual-append-post-ownership.md](STORY-SPA-CT-16-dual-append-post-ownership.md) | P6 T05 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-16-dual-append-post-ownership/STORY-SPA-CT-16-dual-append-post-ownership.md) · `pkg-000174` | CT-03 · CT-08 | BUG-1 dual-append |
| CT-17 | [STORY-SPA-CT-17-attachment-picker-path.md](STORY-SPA-CT-17-attachment-picker-path.md) | P6 T06 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-17-attachment-picker-path/STORY-SPA-CT-17-attachment-picker-path.md) · `pkg-000175` · `run_mode=spa_ct17_p5_gap` | CT-05 · CT-11 · CT-16 | M153a v1.1 |
| CT-18 | [STORY-SPA-CT-18-depth2-token-chrome.md](STORY-SPA-CT-18-depth2-token-chrome.md) | P6 T06 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-18-depth2-token-chrome/STORY-SPA-CT-18-depth2-token-chrome.md) · `pkg-000176` | CT-13 · CT-14 | M153b A–D |
| CT-19 | [STORY-SPA-CT-19-attachment-ref-token-paint.md](STORY-SPA-CT-19-attachment-ref-token-paint.md) | P6 T05 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-19-attachment-ref-token-paint/STORY-SPA-CT-19-attachment-ref-token-paint.md) · `pkg-000177` | CT-05 · CT-17 · soft CT-18 | M153b §7 · M153a C–E |
| CT-20 | [STORY-SPA-CT-20-lab-audit-fixtures.md](STORY-SPA-CT-20-lab-audit-fixtures.md) | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-20-lab-audit-fixtures/STORY-SPA-CT-20-lab-audit-fixtures.md) · `pkg-000178` | CT-15 · CT-16 · CT-17 | LAB-1…4 |
| CT-21 | [STORY-SPA-CT-21-preview-node-budget-default-expanded.md](STORY-SPA-CT-21-preview-node-budget-default-expanded.md) | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-21-preview-node-budget-default-expanded/STORY-SPA-CT-21-preview-node-budget-default-expanded.md) · `pkg-000179` | CT-01 · CT-03 · CT-08 · CT-15 | [M152c](../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md) |
| CT-22 | [STORY-SPA-CT-22-comment-attachment-preview.md](STORY-SPA-CT-22-comment-attachment-preview.md) | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-22-comment-attachment-preview/STORY-SPA-CT-22-comment-attachment-preview.md) · `pkg-000180` | CT-05 · CT-17 · CT-19 | M153/M153a AttachmentRef |
| CT-23 | [STORY-SPA-CT-23-thread-density-artboard-frames.md](STORY-SPA-CT-23-thread-density-artboard-frames.md) | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-23-thread-density-artboard-frames/STORY-SPA-CT-23-thread-density-artboard-frames.md) · `pkg-000181` | CT-18 · soft CT-21 | M152/M153/M153b density frames |
| CT-24 | [STORY-SPA-CT-24-share-issue-link-sheet.md](STORY-SPA-CT-24-share-issue-link-sheet.md) | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-24-share-issue-link-sheet/STORY-SPA-CT-24-share-issue-link-sheet.md) · `pkg-000182` | CT-02 · CT-08 | [M152d](../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) |
| CT-25 | [STORY-SPA-CT-25-composer-attach-chip-preview-filename.md](STORY-SPA-CT-25-composer-attach-chip-preview-filename.md) | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-25-composer-attach-chip-preview-filename/STORY-SPA-CT-25-composer-attach-chip-preview-filename.md) · `pkg-000183` | CT-17 · CT-19 · CT-22 | [M153c](../../../UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.md) |
| CT-26 | [STORY-SPA-CT-26-density-v2-borderless-fill.md](STORY-SPA-CT-26-density-v2-borderless-fill.md) | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-26-density-v2-borderless-fill/STORY-SPA-CT-26-density-v2-borderless-fill.md) · `pkg-000184` | CT-18 · CT-23 | [M153d](../../../UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.md) |
| CT-27 | [STORY-SPA-CT-27-share-instagram-disabled-copy-text.md](STORY-SPA-CT-27-share-instagram-disabled-copy-text.md) | P5 APPLY · gate BLOCK · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-27-share-instagram-disabled-copy-text/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md) · `pkg-000185` | CT-24 | [M152d](../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) IG disabled |
| CT-28 | [STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md](STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md) | P5 APPLY · gate BLOCK · F1/F2 WAIVED · TASKED=0 · [disposition](../../analysis/p5-disposition-STORY-SPA-CT-28-2026-10-20.md) · `pkg-000186` | CT-08 · soft CT-21…27 · CR-23 | next/feed ThreadMount Live |
| CT-29 | [STORY-SPA-CT-29-next-feed-civic-media-stub.md](STORY-SPA-CT-29-next-feed-civic-media-stub.md) | P5 APPLY · gate BLOCK · F1/F2 WAIVED · TASKED=0 · [disposition](../../analysis/p5-disposition-STORY-SPA-CT-29-2026-10-20.md) · `pkg-000188` · tip structure | soft CT-28 | dogefeed stub |
| CT-30 | [STORY-SPA-CT-30-live-attach-ref-wire.md](STORY-SPA-CT-30-live-attach-ref-wire.md) | P5 APPLY · gate BLOCK · F1/F2 WAIVED · TASKED=0 · [disposition](../../analysis/p5-disposition-STORY-SPA-CT-30-2026-10-21.md) · `pkg-000193` | CT-28 · CT-22 · HTTP-08 · HTTP-07 Done | Live `uploadAttachment` + tree map |
| CT-31 | [STORY-SPA-CT-31-live-attach-preview-consumable.md](STORY-SPA-CT-31-live-attach-preview-consumable.md) | P5 APPLY · F1/F2 WAIVED · TASKED=0 · gate **BLOCK** · T01–T05 Done · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-31-live-attach-preview-consumable/STORY-SPA-CT-31-live-attach-preview-consumable.md) · `pkg-000195` · policy **A** · Await P8 | CT-30 · CT-22 · HTTP-07/08 · **no** HTTP-09 | Live preview consumable (auth fetch+blob) |
| CT-32 | [STORY-SPA-CT-32-thread-dark-chrome.md](STORY-SPA-CT-32-thread-dark-chrome.md) | P8 local close · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-32-thread-dark-chrome/STORY-SPA-CT-32-thread-dark-chrome.md) · `pkg-000200` | soft CT-28 · soft NF IssueTypeIcon · soft NS-07 | Thread dark bubbles · show more · type · close · soft feed icons |
| CT-33 | [STORY-SPA-CT-33-composer-dark-residual.md](STORY-SPA-CT-33-composer-dark-residual.md) | P1.3 APPLY · T01–T04 Todo · gate **PENDING** · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-33-composer-dark-residual/STORY-SPA-CT-33-composer-dark-residual.md) · `pkg-000207` · soft · Await P2 · ARCH §19 | soft CT-32 | Composer/attach/post dark residual (marks 5–6) |
| CT-34 | [STORY-SPA-CT-34-comment-attach-preview-residual.md](STORY-SPA-CT-34-comment-attach-preview-residual.md) | P8 local close · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000227` · [arch](../../../architecture/component-thread/34-comment-attach-preview-residual.md) | soft CT-31 | [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-34-comment-attach-preview-residual/STORY-SPA-CT-34-comment-attach-preview-residual.md) · Interview **M11** |
| CT-35 | [STORY-SPA-CT-35-comment-react-empty-harmony.md](STORY-SPA-CT-35-comment-react-empty-harmony.md) | P1.3 activated · T01 Done · T02–T03 Todo · gate PENDING · `pkg-000228` · activation active · Await P2 · [M174](../../../UX/next/feed/artboards/DOGEstonia-M174-comment-react-reply-harmony-spec-v1.0.md) PASS · [arch](../../../architecture/component-thread/35-comment-react-empty-harmony.md) | soft CT-13 | [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-35-comment-react-empty-harmony/STORY-SPA-CT-35-comment-react-empty-harmony.md) · Interview **M12** |
| CT-api | [STORY-SPA-CT-api-requirements.md](STORY-SPA-CT-api-requirements.md) | Todo · docs | — | knobs/adapters |

**Order (structure):** CT-01 → … → CT-09.  
**Order (chrome residual):** CT-12 → CT-13 → CT-11 → CT-14 → CT-10 → CT-15.  
**Order (M153a/b gap coverage):** CT-16 → CT-17 → CT-18 → CT-19 → CT-20.  
**Order (interview residual):** CT-21 → CT-22 → CT-23 → CT-24.  
**Order (manual residual):** CT-25 → CT-26 → CT-27.  
**Order (next/feed cutover):** CT-28 → CR-23 → CT-29 (CT-29 parallelizable).  
**Order (live attach · REQ-05 bytes):** threads **HTTP-08** → **HTTP-07** → **CT-30**.  
**Order (preview consumable · OP residual mark 6):** OP **A locked** → **CT-31** (no HTTP-09).  
**Order (dark chrome · OP wave 2):** **CT-32** ‖ **NS-07** ‖ soft NF-18…20.  
**Order (composer residual · OP wave 3):** **CT-33** (after CT-32 structure).  
**Order (wave5):** **CT-35** (P1.3 tip) ‖ soft **CT-34** P8 BLOCK · [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md).

## UX input

M152 · M153 · M157 · M153a/b · M152c/d · M153c/d — table in BRIEF.  
Interview tip: [INTERVIEW-CT-28-plus…](INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md) · prior [CT-25+](INTERVIEW-CT-25-plus-attach-density-share-residual-2026-10-20.md).  
UX prompts **landed** (lab): [attach/density v2](UX-PROMPTS-thread-attach-chip-and-density-v2-2026-10-20.md) · **no gen** for CT-28…29.  
Wave5: [M174](../../../UX/next/feed/artboards/DOGEstonia-M174-comment-react-reply-harmony-spec-v1.0.md) · [intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) **PASS**.

## Notes

- Layers: **L1** FR/AC · **L1.5** ARCH §13–19 · **L2** tech subtasks — [markstack](../../../../../docs/methodology/Zeya888-builder-queue/guides/markstack.md) · **CT-33 P1.3 tip** `pkg-000207` · Await P2 · soft CT-32 P8.  

- CT-25…27 **Present** in code · [validation](../../../analysis/analysis-ct25-ct27-code-present-vs-intake-2026-10-20.md) · Await OP eye.  
- CT-28/CT-29 P5 structure Present · disposition WAIVED F1/F2 · Path A shots · no invent HTTP / OP PASS / image-gen.  
- CT-30 Apply structure Present · CT-31 policy **A** Present (auth fetch+blob).  
- CT-31 P5 APPLY · F1/F2 WAIVED · TASKED=0 · HTTP-09 **Absent** · no invent OP PASS · P6 not needed.  
- CT-32 P8 local close · structure Present · gate BLOCK · Story BLOCKED (OP eye) OK.  
- CT-33 P1.3 APPLY · T01–T04 Todo · composer residual · ARCH §19 · Path A · Partial=BLOCK · no invent OP PASS.  
- Reaction summary redesign remains **HOLD**. · Discussion unavailable **HOLD**.  
