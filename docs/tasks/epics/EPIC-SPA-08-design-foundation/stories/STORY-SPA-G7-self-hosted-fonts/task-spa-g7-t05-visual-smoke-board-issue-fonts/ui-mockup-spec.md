# ui-mockup-spec — G7 self-hosted fonts (visual parity)

**SSOT typography:** [design-system.md §2.2](../../../../../../../../UX/design-system.md)  
**Local assets rule:** [ui-mockups-and-states-requirements.md](../../../../../../../../UX/ui-mockups-and-states-requirements.md) §24 (no external CDN/fonts)  
**Baseline:** [ui-baseline/pre-implement/](./ui-baseline/pre-implement/)  
**No artboard PNG** — font/token contract story (same class as G4).

## Target delta

Self-hosted **Inter** on body (not system-ui fallback) and **JetBrains Mono** wherever `--font-family-mono` applies. Rejected: CDN font requests; missing shell regions; material layout break beyond glyph metric shift.

## States to smoke

| Surface | Route | Gate |
|---------|-------|------|
| Board | `/#/board` | `.board-shell` + Inter loaded (`document.fonts.check`) |
| Issue details | board card / UUID | shell; mono class when txid present (ENV may omit fields) |

## Human gate

Parity-only + font contract. Proceed without palette/artboard interview.
