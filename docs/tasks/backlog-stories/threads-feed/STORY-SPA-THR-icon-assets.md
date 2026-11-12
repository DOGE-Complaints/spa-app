# STORY-SPA-THR — Каталог иконок/визуалов (Threads feed shell)

> Референс для вёрстки: functional chrome icons + reactions.v1 emoji aids + reuse PH/handoff.  
> Mockup SSOT: [`docs/UX/mockups/threads-feed/`](../../../UX/mockups/threads-feed/README.md) · intake [ADMIN-THR-02](ADMIN-THR-02-ux-mockup-intake.md).  
> **PNG status:** ✅ ON DISK via Lucide catalog `thr` (`python3 scripts/generate-icons-from-lucide.py --catalog thr` + validate). Dir: [`public/icons/threads-feed/`](../../../../public/icons/threads-feed/).  
> **Дедуп:** [PH](../public-home/STORY-SPA-PH-icon-assets.md) · [handoff](../identity-auth/STORY-SPA-ID-12-icon-assets.md) · [ES](../early-signal-dashboard/STORY-SPA-ES-icon-assets.md). Master: [`ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md).  
> **Inventory date:** 2026-09-22 (M143–M148 specs Read; reuse paths ls-verified).

**Traceability:** THR-01…05 · [ADMIN-THR-03](ADMIN-THR-03-icon-assets-catalog.md).

**Hard lock (M145):** resident UI must **not** display internal `ic-*` filenames. Localized text is authoritative; emoji/icon is a visual aid only.

## Конвенции

### Functional icons (`ic-*`)

| Param | Value |
|-------|-------|
| Directory | [`public/icons/threads-feed/`](../../../../public/icons/threads-feed/) |
| Runtime | `/icons/threads-feed/ic-<kebab>.png` |
| Format | PNG RGBA, **256×256**, ~15% padding, no text/frame/shadow |
| Style | thin stroke ~2px, Lucide-like, dark civic-tech UI |
| Colors | нейтраль **#f5f7fa**; accent yellow sparingly for active only |

### Layers (не путать)

| Layer | Handling |
|-------|----------|
| A Functional `ic-*` (chrome) | §NEW / §Reuse |
| B Brand logo | §Reuse assets |
| C reactions.v1 aids | §Not ic-* — Unicode emoji from Emotional reactions catalog |
| D Loading / skeleton | CSS / §Reuse spinner — **not** new art |
| E Artboard chrome (devices, state letters) | docs-only — skip |

---

## Inventory by artboard

### M143 — THR-P BoardIssuePost · THR-01

| Graphic | Layer | Disposition | Path / note |
|---------|-------|-------------|-------------|
| Brand logo (shell) | Brand | **Reuse** | `/assets/DOGEstonia-logo-big.png` / horizontal |
| Issue type / Open issue / overflow | IssueCard | **Reuse** | existing IssueCard chrome (no new extract) |
| Action: React | ic | **NEW** ✅ | `/icons/threads-feed/ic-react.png` · [`public/icons/threads-feed/ic-react.png`](../../../../public/icons/threads-feed/ic-react.png) · lucide `smile-plus` |
| Action: Discussion | ic | **NEW** ✅ | `/icons/threads-feed/ic-discussion.png` · [`public/icons/threads-feed/ic-discussion.png`](../../../../public/icons/threads-feed/ic-discussion.png) · lucide `messages-square` |
| Action: Invite organization | ic | **NEW** ✅ | `/icons/threads-feed/ic-invite-organization.png` · [`public/icons/threads-feed/ic-invite-organization.png`](../../../../public/icons/threads-feed/ic-invite-organization.png) · lucide `users` (not seal/ticket) |
| Discussion unavailable | ic | **Reuse** | `/icons/story-handoff/ic-cloud-error.png` or `/icons/story-handoff/ic-info.png` |
| Thread loading | ic/CSS | **Reuse** | `/icons/story-handoff/ic-spinner.png` + CSS skeleton |
| Reaction summary marks | emoji | **Not ic-*** | see §Not ic-* / reactions.v1 |

### M144 — THR-T Tree + composer · THR-02

| Graphic | Layer | Disposition | Path / note |
|---------|-------|-------------|-------------|
| Reply | ic | **NEW** ✅ | `/icons/threads-feed/ic-reply.png` · [`public/icons/threads-feed/ic-reply.png`](../../../../public/icons/threads-feed/ic-reply.png) · lucide `reply` |
| Attach | ic | **NEW** ✅ | `/icons/threads-feed/ic-attach.png` · [`public/icons/threads-feed/ic-attach.png`](../../../../public/icons/threads-feed/ic-attach.png) · lucide `paperclip` |
| Remove attachment | ic | **NEW** ✅ | `/icons/threads-feed/ic-remove-attachment.png` · [`public/icons/threads-feed/ic-remove-attachment.png`](../../../../public/icons/threads-feed/ic-remove-attachment.png) · lucide `x` |
| Attachment chip generic file | ic | **Reuse** | prefer handoff doc glyph `/icons/story-handoff/ic-doc-new.png` on chip; else `/icons/threads-feed/ic-attach.png` |
| Try again | ic | **Reuse** | `/icons/story-handoff/ic-auto-resubmit.png` |
| Soft-fail / attach denied | ic | **Reuse** | `/icons/story-handoff/ic-warning-triangle.png` or `/icons/story-handoff/ic-info.png` |
| Comment-level React | ic | **NEW** ✅ (same) | `/icons/threads-feed/ic-react.png` · [`public/icons/threads-feed/ic-react.png`](../../../../public/icons/threads-feed/ic-react.png) |

### M145 — THR-R reactions.v1 · THR-03

| Graphic | Layer | Disposition | Path / note |
|---------|-------|-------------|-------------|
| React trigger | ic | **NEW** ✅ | `/icons/threads-feed/ic-react.png` · [`public/icons/threads-feed/ic-react.png`](../../../../public/icons/threads-feed/ic-react.png) (same as M143) |
| Per-reaction marks | emoji | **Not ic-*** | Emotional reactions catalog emoji column — **no** `ic-acknowledge` etc. this wave (M145 forbids inventing ic-* for reactions) |
| Picker close / chevron | ic | **Reuse** | `/icons/public-home/ic-chevron-right.png` or `/icons/identity/ic-chevron-down.png` if needed |

### M146 — THR-E Invite organization · THR-04

| Graphic | Layer | Disposition | Path / note |
|---------|-------|-------------|-------------|
| Invite organization | ic | **NEW** ✅ | `/icons/threads-feed/ic-invite-organization.png` · [`public/icons/threads-feed/ic-invite-organization.png`](../../../../public/icons/threads-feed/ic-invite-organization.png) (same as M143) |
| Activated info feedback | ic | **Reuse** | `/icons/story-handoff/ic-info.png` |

### M147 — THR-V Verify gate · THR-05

| Graphic | Layer | Disposition | Path / note |
|---------|-------|-------------|-------------|
| Verify CTA leading (optional) | ic | **Reuse** | `/icons/story-handoff/ic-verify-shield.png` — method **not** encoded by icon (M147) |
| Opaque success | ic | **Reuse** | `/icons/story-handoff/ic-success-check.png` |

### M148 — THR-I Issue page mount · THR-01

Same thread chrome inventory as M143–M147 (shared component). No additional glyphs.

---

## §NEW (consolidated) — ON DISK

| Filename | Lucide | Runtime | Disk | Stories | Artboard |
|----------|--------|---------|------|---------|----------|
| `ic-react.png` | `smile-plus` | `/icons/threads-feed/ic-react.png` | [`public/icons/threads-feed/ic-react.png`](../../../../public/icons/threads-feed/ic-react.png) | THR-01, THR-03 | M143/M145 |
| `ic-discussion.png` | `messages-square` | `/icons/threads-feed/ic-discussion.png` | [`public/icons/threads-feed/ic-discussion.png`](../../../../public/icons/threads-feed/ic-discussion.png) | THR-01 | M143 |
| `ic-invite-organization.png` | `users` | `/icons/threads-feed/ic-invite-organization.png` | [`public/icons/threads-feed/ic-invite-organization.png`](../../../../public/icons/threads-feed/ic-invite-organization.png) | THR-01, THR-04 | M143/M146 |
| `ic-reply.png` | `reply` | `/icons/threads-feed/ic-reply.png` | [`public/icons/threads-feed/ic-reply.png`](../../../../public/icons/threads-feed/ic-reply.png) | THR-02 | M144 |
| `ic-attach.png` | `paperclip` | `/icons/threads-feed/ic-attach.png` | [`public/icons/threads-feed/ic-attach.png`](../../../../public/icons/threads-feed/ic-attach.png) | THR-02 | M144 |
| `ic-remove-attachment.png` | `x` | `/icons/threads-feed/ic-remove-attachment.png` | [`public/icons/threads-feed/ic-remove-attachment.png`](../../../../public/icons/threads-feed/ic-remove-attachment.png) | THR-02 | M144 |

**Итого ON DISK (6)** — wiring SSOT:

1. [`public/icons/threads-feed/ic-react.png`](../../../../public/icons/threads-feed/ic-react.png) → runtime `/icons/threads-feed/ic-react.png`
2. [`public/icons/threads-feed/ic-discussion.png`](../../../../public/icons/threads-feed/ic-discussion.png) → runtime `/icons/threads-feed/ic-discussion.png`
3. [`public/icons/threads-feed/ic-invite-organization.png`](../../../../public/icons/threads-feed/ic-invite-organization.png) → runtime `/icons/threads-feed/ic-invite-organization.png`
4. [`public/icons/threads-feed/ic-reply.png`](../../../../public/icons/threads-feed/ic-reply.png) → runtime `/icons/threads-feed/ic-reply.png`
5. [`public/icons/threads-feed/ic-attach.png`](../../../../public/icons/threads-feed/ic-attach.png) → runtime `/icons/threads-feed/ic-attach.png`
6. [`public/icons/threads-feed/ic-remove-attachment.png`](../../../../public/icons/threads-feed/ic-remove-attachment.png) → runtime `/icons/threads-feed/ic-remove-attachment.png`

Manifest: `icon-manifest.yaml` `catalog: thr` · generator: `python3 scripts/generate-icons-from-lucide.py --catalog thr`.

---

## §Reuse (ls-verified 2026-09-22)

| Function | Runtime | Disk |
|----------|---------|------|
| Brand | `/assets/DOGEstonia-logo-big.png` | `public/assets/DOGEstonia-logo-big.png` |
| Discussion unavailable / load fail | `/icons/story-handoff/ic-cloud-error.png` | `public/icons/story-handoff/ic-cloud-error.png` |
| Info / soft feedback | `/icons/story-handoff/ic-info.png` | `public/icons/story-handoff/ic-info.png` |
| Warning / attach denied | `/icons/story-handoff/ic-warning-triangle.png` | `public/icons/story-handoff/ic-warning-triangle.png` |
| Try again | `/icons/story-handoff/ic-auto-resubmit.png` | `public/icons/story-handoff/ic-auto-resubmit.png` |
| Spinner | `/icons/story-handoff/ic-spinner.png` | `public/icons/story-handoff/ic-spinner.png` |
| Verify shield CTA | `/icons/story-handoff/ic-verify-shield.png` | `public/icons/story-handoff/ic-verify-shield.png` |
| Success check | `/icons/story-handoff/ic-success-check.png` | `public/icons/story-handoff/ic-success-check.png` |
| Generic doc chip | `/icons/story-handoff/ic-doc-new.png` | `public/icons/story-handoff/ic-doc-new.png` |
| External (if needed) | `/icons/public-home/ic-external-link.png` | `public/icons/public-home/ic-external-link.png` |

---

## §Not ic-* — reactions.v1 aids

Source: [Emotional reactions catalog](../../../../../docs/requirements%20backlog/DOGEstonia%20—%20Threads%20—%20Emotional%20reactions.md) · M145 §2.

| reaction_id | Layer | Emoji aid (catalog) |
|-------------|-------|---------------------|
| `acknowledge` | emotional | 👀 |
| `support` | emotional | 🙌 |
| `empathy` | emotional | 🫶 |
| `concern` | emotional | ⚠️ |
| `hopeful` | emotional | 🌱 |
| `sad` | emotional | 😔 |
| `outraged_situation` | emotional | ⚡ |
| `amused` | emotional | 🙂 (default disabled) |
| `agree` | epistemic | ✅ |
| `disagree` | epistemic | ↔️ |
| `useful_fact` | epistemic | 📌 |
| `insightful` | epistemic | 💡 |
| `needs_evidence` | epistemic | 🔎 |
| `off_topic` | moderation | 🧭 |
| `aggressive` | moderation | 🛑 |

Do **not** invent per-id `ic-*` PNGs in this wave. Text labels remain primary.

---

## Generator follow-up

1. ✅ `catalog: thr` rows in [`scripts/icons/icon-manifest.yaml`](../../../../scripts/icons/icon-manifest.yaml) for the six §NEW files.  
2. ✅ `python3 scripts/generate-icons-from-lucide.py --catalog thr` + validate from `spa-app`.  
3. ✅ Disk **ON DISK** marked in this catalog.

## Traceability

- Stories: THR-01…05 §Иконки cite this file.  
- ADMIN: [ADMIN-THR-03](ADMIN-THR-03-icon-assets-catalog.md) Done when catalog + dir + story patches land.
