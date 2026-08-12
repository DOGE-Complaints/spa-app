# Story acceptance gate — STORY-SPA-PH-03-public-footer

- **Story:** Public Footer A
- **Package:** `pkg-000047-20260804-epic-spa-09-ph-03-public-footer.yaml` (immutable; not rewritten)
- **Result:** PASS
- **Date:** 2026-08-04T10:46:36Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Footer A on public chrome: brand + tagline TBD + About/Privacy/Contact (M131). | PASS | `PublicFooter.jsx` on Board/Issue/HowItWorks; vitest structure; full-cycle H1–H3 |
| No social/icon clusters; tagline remains `[TAGLINE_TBD]` in all locales. | PASS | vitest no-social + locale TBD; dict en/et/ru tagline literal |
| L10N table complete; api-req §3.2 linked; icon catalog notes (no NEW) respected. | PASS | `publicHome.footer.*` + FLAT_KEYS; `#` link placeholders (no CMS); logo reuse `public/assets/` only |

## UI visual pipeline

| Gate | Status | Evidence |
|------|--------|----------|
| UI-0 / UI-1 Path A M131 | PASS | T01 `ui-baseline/` + [`ui-mockup-spec.md`](../task-spa-ph-03-t01-public-footer-layout/ui-mockup-spec.md) |
| UI-3 + story-root screenshots | PASS | [`screenshots/README.md`](../screenshots/README.md) + `screenshots/full-cycle/` live happy |

## Commands (live verification)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run PublicFooter publicHome
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:public-footer-ph03
cd spa-app && npm run test:ui:public-footer-ph03-full
rg -n 'publicHome\.footer' spa-app/src/i18n/publicHomeDictionary.js
rg -n 'TAGLINE_TBD' spa-app/src/components/PublicFooter spa-app/src/i18n/publicHomeDictionary.js
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)

## Mockups (Path A)

- `spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.png`
- `spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec-estonia.png`
- Copy SSOT: `spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md` §footer
