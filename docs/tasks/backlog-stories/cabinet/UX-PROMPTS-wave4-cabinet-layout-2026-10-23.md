# UX Prompts — Cabinet layout residual (wave4 mark 5 → CAB-08)

> **Package:** [cabinet](INDEX.md)  
> **Interview:** [INTERVIEW-NF-24-plus…](../next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) **P5**  
> **Cite:** [M45 Story Activity](../../../UX/mockups/user%20profile/mockup-45-story-activity-state-sheet-spec.md) · [M28 Civic](../../../UX/epic-04/mockup-28-civic-status-state-sheet-spec.md) · [M99 assembly](../../../UX/mockups/user%20profile/mockup-99-user-cabinet-final-assembly-spec.md)  
> **Evidence:** [05-profile-layout…](../../../analysis/evidence/op-residual-wave4-2026-10-23/05-profile-layout-story-activity.png)  
> **Wave:** docs 1A · gen **done** · intake **PASS** · [M170](../../../UX/mockups/user%20profile/DOGEstonia-M170-cabinet-layout-no-wallet-contrib-spec-v1.0.md) · [intake](../../../analysis/analysis-wave4-ux-intake-m169-m172-2026-10-23.md) · no invent OP PASS · no invent story rows

## Sufficiency

| Check | Result |
|-------|--------|
| Layout float / verified huge / Story Activity width / hide wallet+contrib | **UX** + code — cite M45/M28/M99 · residual tip if assembly gaps |

---

## Global constraints

```text
DOGEstonia User Cabinet /profile inside next shell.
Reuse M45 story table states · M28 civic badge · M99 assembly hierarchy.
Hide Wallet + Contribution Layer this wave (gate, keep code).
Story Activity full-width when wallet/contrib hidden.
Verified Civic = compact meaningful badge, not oversized card dominating layout.
Data from GET /story-activity when wired — do not invent demo as Done.
CTA Go to Feed → /next/feed (not /board).
```

---

## Prompt 1 — Cabinet residual assembly (no wallet/contrib)

### State matrix

| Block | Must show |
|-------|-----------|
| Account summary | Held (CAB-02) |
| Verified civic | Compact badge / slim card per tip — not floating huge center plate |
| Story Activity | Full-width · M45 active/empty states · table when data Present |
| Wallet | Hidden (annotate deferred) |
| Contribution | Hidden (annotate deferred) |

### Prompt body

```text
Artboard: DOGEstonia M170-cabinet-layout-no-wallet-contrib-v1.
Show /profile cabinet light theme. Account summary top. Compact Verified Civic
badge (shield + short status) — not a large floating plate overlapping content.
Story Activity card full content width below: empty state OR active table citing M45
(metrics + story rows). Explicitly omit Wallet and Contribution Layer from layout
(annotate "gated / later"). Fix prior overlap/float. Primary empty CTA label
"Go to Feed" destination /next/feed. Narrow ~390 optional. No invent story IDs.
```

---

## Intake status

**PASS** — [M170](../../../UX/mockups/user%20profile/DOGEstonia-M170-cabinet-layout-no-wallet-contrib-spec-v1.0.md). Soft M45/M28/M99 reconcile on Apply.

## Out of gen

Brand PNG · HIW deep · invent contribution API
