# Story acceptance gate — STORY-SPA-G10-button-system-ds-btn

- **Story:** Button system (DS-BTN)
- **Package:** `pkg-000044-20260802-epic-spa-08-g10-button-system-ds-btn.yaml`
- **Result:** PASS
- **Date:** 2026-08-02T20:34:22Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| `Button` supports primary/secondary/tertiary/link-style; destructive independent; S/M/L; icons; loading; disabled; focus. | PASS | `src/components/Button/Button.jsx` + `Button.css`; axes hierarchy/intent/size/loading/disabled |
| `IconButton`, `ButtonGroup`, `MenuAction` ship per spec. | PASS | `IconButton.jsx`, `ButtonGroup.jsx`, `MenuAction.jsx` + `index.js` exports |
| Colors from G9 tokens; primary label contrast compliant. | PASS | `tokens.css` `--button-primary-*` / `--color-btn-on-primary: var(--doge-ink)`; no new brand hex |
| Product CTAs migrated (Waves 2–4); no **new** page-specific button styling. | PASS | Login/Phone/Session/StoryGate/Handoff/Cabinet/Board/Issue/ResetFilters/Sidebar/Locale on `Button`; legacy `*-btn` CSS removed |
| Vitest covers states + a11y; visual gate PASS vs M134 semantics. | PASS | Button suite 14/14; full suite **436/2**; semantics vs written spec §8/§36. **Operator waive (SPA-G10-T14 / post-audit F2):** M134/PNG pixel comparison and story `screenshots/` **not required**; PNG artboard remains non-authoritative (§40). No fabricated SPA button screenshots. |
| Developer guide live; engineers use it for new UI. | PASS | `docs/runtime-docs/button-system-developer-guide.md`; `design-system.md` §4.0 → component + guide |
| Spec §43 AC satisfied; INDEX G10 → Done. | PASS | INDEX / bullrun / dashboard / EPIC-SPA-08 synced this gate |

## Exceptions (documented)

- Filter chips / triggers / search clear — raw `<button>` (guide §8 G10 T10).
- `CountrySelector` combobox/listbox — raw `<button>` (guide §8 G10 T11).
- Product raw `<button` inventory (excl. tests + Button package): **22**.

## Visual evidence waive (SPA-G10-T14 · post-audit F2)

**Waive:** live/pixel M134 PNG shots and story-tree `screenshots/` are **not** required for G10 Done. Visual AC is satisfied by written [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md) §8/§36 hierarchy/states; [design-system-buttons-spec.png](../../../../../UX/design-system-buttons-spec.png) is reference only (§40 written spec wins). Do **not** add fabricated board/login/cabinet button SPA screenshots under this story.

Post-audit commit HEAD: `d767a13` (SPA-G10-T13).

## Commands (live verification)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npx vitest run --pool=forks --maxWorkers=2
# claim: Test Files 96 passed; Tests 436 passed | 2 skipped (438)
rg -n '<button' spa-app/src --glob '*.jsx' | rg -v '__tests__|/Button/' | wc -l
# claim: 22
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
