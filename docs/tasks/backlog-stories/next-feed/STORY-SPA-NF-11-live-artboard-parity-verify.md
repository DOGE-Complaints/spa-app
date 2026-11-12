# STORY-SPA-NF-11 — Live artboard parity verify (gate)

## Meta
- **Key:** `STORY-SPA-NF-11-live-artboard-parity-verify`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-11-live-artboard-parity-verify/STORY-SPA-NF-11-live-artboard-parity-verify.md)
- **Status:** Done · gate **PASS** (P6 F5 CLOSED · `2026-10-11T15:47:08Z`) · T01–T05 Done
- **Depends on:** NF-07 · NF-08 · NF-09 · NF-10 · **NF-12 Done** (OP reorder — gate after search enable)
- **Evidence:** [`parity-report-STORY-SPA-NF-11-2026-10-11.md`](../../../analysis/evidence/next-feed-live-artboard-parity-2026-10-11-nf11/parity-report-STORY-SPA-NF-11-2026-10-11.md)
- **Related:** [parity audit](../../../analysis/analysis-next-feed-live-artboard-parity-audit-2026-10-10.md) · [ARCH-DELTA](ARCH-DELTA-visual-parity-wave-2026-10-11.md) **AD-VP-04**
- **Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh` **mandatory**
- **Code home:** evidence under `docs/analysis/evidence/` · **no product invent**
- **ui_scope:** `feed`
- **Arch:** [03 §1 live↔artboard](../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)

## Зачем
Ship gate visual wave: live `#/next/feed*` vs M149–M160 written sheets. Closes H3/H6 process gap. Fail = reopen owning story — no silent PASS.

## UX SSOT
- Full matrix min: M149, M150, M152, M153, M154, M158, M159 + search (M149) after NF-12
- M155 OOS; shell chrome Info only

## Arch delta (откуда ноги)
**AD-VP-04** — visual Done requires live↔artboard; Path A packs alone invalidated by 2026-10-10 audit.

## Функциональные требования (FR)
- **FR-NF-11.1** Capture live evidence @ 1440 and 390 (and 320 sample) with local-five.
- **FR-NF-11.2** Score F1–F7 + search against artboards: Match / Partial / Mismatch / NR / OOS.
- **FR-NF-11.3** Any Blocker/Major Mismatch → **fail** gate; cite owning NF-07…12; do not WAIVE without operator.
- **FR-NF-11.4** Write/update analysis evidence report (progressive on prior parity audit or sibling dated report).
- **FR-NF-11.5** No product code changes in this story (verify-only) unless operator opens fix wave.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Civic 4-zone | F2 closed |
| Discussion collapsed | F1 closed |
| No duplicate DISCUSSION row | F4 closed |
| Oval composer on expand | F5 closed |
| Reactions chrome | F3 closed |
| Light cards | F6 closed |
| Search live | NF-12 |
| Modal/sheet/route | M158 smoke |
| Loading/empty/error samples | Honest Present or NR documented |
| Invite stub / verify | Smoke if reachable |

## Вне scope
Implement remediations; invent fixtures to fake Match; M155; shell redesign

## Acceptance Criteria
- [x] Evidence pack Present under `docs/analysis/evidence/…` — [`parity-report-STORY-SPA-NF-11-2026-10-11.md`](../../../analysis/evidence/next-feed-live-artboard-parity-2026-10-11-nf11/parity-report-STORY-SPA-NF-11-2026-10-11.md)
- [x] Matrix scored; no Blocker/Major open without operator WAIVE — F5 CLOSED P6
- [x] Cites AD-VP-04 · local-five
- [x] Report links INDEX / epic tip
