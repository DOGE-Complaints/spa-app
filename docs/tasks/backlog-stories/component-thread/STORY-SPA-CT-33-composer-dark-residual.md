# STORY-SPA-CT-33 — Composer / attach dark residual

## Meta

- **Key:** `STORY-SPA-CT-33-composer-dark-residual`
- **Package:** [component-thread](INDEX.md)
- **Layers:** L1 · L1.5 [ARCHITECTURE §19](ARCHITECTURE.md) · L2
- **Status:** P8 local close · T01–T04 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000207` · tip · `activation: none` · `2026-10-22T14:53:58Z`
- **Pipeline:** [STORY-SPA-CT-33-composer-dark-residual](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-33-composer-dark-residual/STORY-SPA-CT-33-composer-dark-residual.md)
- **Interview:** [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **T5–6**
- **Disposition:** [p5-disposition-STORY-SPA-CT-33-2026-10-22.md](../../../analysis/p5-disposition-STORY-SPA-CT-33-2026-10-22.md)
- **P7:** [reaudit-STORY-SPA-CT-33-p7-2026-10-22.md](../../../analysis/reaudit-STORY-SPA-CT-33-p7-2026-10-22.md)
- **Arch:** [33-composer-dark-residual.md](../../../architecture/component-thread/33-composer-dark-residual.md)
- **Depends on:** CT-32 structure Present (Partial eye)
- **Code home:** `ThreadComposer.css` · `AttachmentRef.css` · soft CommentAttachmentPreview

## L1 — FR

- **FR-CT-33.1** Composer textarea background + typed text contrast readable in dark (no white field + white text).  
- **FR-CT-33.2** Attachment chips / “Selected image” / local preview plates theme-safe (no fixed cream `#fffdf8` as only fill).  
- **FR-CT-33.3** Post button label contrast: dark text on accent (icon already black) — readable.  
- **FR-CT-33.4** Attach control readable on dark (not lost into background).  
- **FR-CT-33.5** Light theme held.  
- **FR-CT-33.6** Vitest · OP eye — no invent PASS.

## OOS

CR-24 React · invent CDN · CT-31 policy

## AC

- [x] Dark composer text visible (structure)  
- [x] Attach plates themed (structure)  
- [x] Post label + Attach readable (structure)  
- [x] Light held · Vitest · Path A  
- [ ] OP eye — Absent → gate **BLOCK**  

## L1.5

Cite ARCHITECTURE §19.

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ct-33-t01-textarea` | **Done** | Tokenize composer input colors | 33.1 |
| `task-spa-ct-33-t02-attach` | **Done** | AttachmentRef / preview fills | 33.2 · 33.4 |
| `task-spa-ct-33-t03-post` | **Done** | Post label contrast | 33.3 |
| `task-spa-ct-33-t04-vitest` | **Done** | Markers | 33.5 · 33.6 |

### Order

`t01` → `t02` → `t03` → `t04` · skill `react-expert`
