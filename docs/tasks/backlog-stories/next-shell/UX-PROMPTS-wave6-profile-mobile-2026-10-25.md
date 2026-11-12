# UX Prompts — Profile mobile layout (wave6 mark 3 → NS-18)

> **Package:** [next-shell](INDEX.md) · soft [cabinet](../cabinet/INDEX.md)  
> **Interview:** [INTERVIEW-NF-26-plus…](../next-feed/INTERVIEW-NF-26-plus-op-residual-wave6-mobile-2026-10-25.md) **M3**  
> **Evidence:** [03…](../../../analysis/evidence/op-residual-wave6-mobile-2026-10-25/03-profile-viewport-broken.png)  
> **Prior:** NS-11 profile next-shell · CAB-08 layout · AccountSummary  
> **Wave:** docs 1A · gen **done** · intake **PASS** · [M178](../../../UX/next/feed/artboards/DOGEstonia-M178-profile-mobile-layout-spec-v1.0.md) · [intake](../../../analysis/analysis-wave6-ux-intake-m177-m179-2026-10-25.md) · no invent OP PASS

## Sufficiency

| Check | Result |
|-------|--------|
| Profile mobile: Account card broken · vertical text · wasted viewport | **UX** — mobile profile composition redesign |

---

## Global constraints

```text
DOGEstonia /profile on mobile next-shell.
Account summary must read as normal label|value rows (email, created) — never vertical
character stacking or crushed columns.
Shell: single-column main · no empty desktop right rail stealing width on phone/tablet
portrait.
Keep CAB-08 gates (no invent Wallet/Contribution unfreeze). Soft: Story Activity continuity.
Light + dark. Reuse existing copy keys — no invent RU/ET.
No invent OP PASS / new APIs.
```

---

## Prompt 1 — Profile mobile composition

### State matrix

| State | Must show |
|-------|-----------|
| Profile phone light | H1 Profile · Account card with horizontal label/value · readable email |
| Same dark | Token continuity |
| Soft tablet | Still no crushed Account column |

### Prompt body

```text
Artboard: DOGEstonia M178-profile-mobile-layout-v1.
Panel A (light, phone): /profile — full-width main, Account card with Email and
Account Created as horizontal rows (label left / value right or stacked label above value),
never single-character vertical column. Brand AppBar continuity with M177.
Panel B: soft include Story Activity / status blocks if present under CAB-08 — readable stack.
Panel C: dark theme.
Annotate min content width, padding, card radius. Do not invent Wallet/Contribution panels.
```

---

## Intake status

**PASS** — tip [M178](../../../UX/next/feed/artboards/DOGEstonia-M178-profile-mobile-layout-spec-v1.0.md) + PNG. Story **NS-18** Ready for Apply.

## Out of gen

Burger drawer (NS-17) · invent cabinet APIs
