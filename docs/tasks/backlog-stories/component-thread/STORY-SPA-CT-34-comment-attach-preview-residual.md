# STORY-SPA-CT-34 — Comment attach preview residual (Selected image)

## Meta

- **Key:** `STORY-SPA-CT-34-comment-attach-preview-residual`
- **Package:** [component-thread](INDEX.md)
- **Status:** P5 APPLY Done · T01–T03 **Done** · gate **BLOCK** · `pkg-000227` · activation **none** · Await **P8** · Partial visual=**BLOCK** · OP eye Absent · F1/F2 WAIVED · P6 skipped · soft [wave5 intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) · no invent OP PASS / CDN / policy B · [disposition](../../run-reports/p5-disposition-STORY-SPA-CT-34-2026-10-24.md)  
- **Interview:** [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) **M11**
- **Depends on:** CT-31 policy A · CT-22 preview host  
- **Evidence:** [11…](../../../analysis/evidence/op-residual-wave5-2026-10-24/11-comment-attach-selected-image-text.png)  
- **Code home:** `CommentAttachmentPreview.jsx` · soft composer local preview · LiveAdapter  
- **L1.5:** [arch](../../../architecture/component-thread/34-comment-attach-preview-residual.md)

## L1 — FR

- **FR-CT-34.1** Citizen sees **image preview** for comment attachments (local ready + published) — not sole «Selected image» / «Local preview · not published» text plate.  
- **FR-CT-34.2** Hold CT-31 policy **A** (auth fetch+blob) · honesty when bytes deny.  
- **FR-CT-34.3** Local composer ready files: objectURL / thumb Present.  
- **FR-CT-34.4** Vitest · OP eye — no invent PASS · no invent CDN · no invent policy B/HTTP-09.

## OOS

Comment React UX (CT-35) · invent storage vendor

## AC

- [x] Preview image renders (local + published happy path) — structure · visual **BLOCK**  
- [x] Text-only plate gone on happy path — structure · visual **BLOCK**  
- [x] Vitest · OP eye Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ct-34-t01-local` | Done · BLOCK | Local ready thumb/objectURL | 34.1 · 34.3 |
| `task-spa-ct-34-t02-published` | Done · BLOCK | Close CT-31 residual published path | 34.1 · 34.2 |
| `task-spa-ct-34-t03-vitest` | Done · BLOCK | Markers | 34.4 |

### Order

`t01` ‖ `t02` → `t03` · skill `react-expert`
