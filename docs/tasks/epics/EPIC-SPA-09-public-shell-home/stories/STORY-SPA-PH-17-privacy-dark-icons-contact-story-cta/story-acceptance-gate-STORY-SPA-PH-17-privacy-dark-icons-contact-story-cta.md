# Story acceptance gate — STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta

- **Story:** Privacy dark icons + Contact story CTA
- **Package:** `pkg-000223-20261024-epic-spa-09-ph-17-privacy-dark-icons-contact-story-cta.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-24T10:13:01Z
- **Note:** P3 Execute Done · T01–T03 **Done** · Privacy dark `filter: invert(1)` · Contact CTA → `getStoryGptHref` · CAPTURE-META `fails: []` · StaticPublic **5/5** · OP eye **Absent** · Partial visual=**BLOCK** · **no invent PASS / new art / GPT URL** · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Privacy icons visible dark | Structure Present | dark invert filter · probe · shot 01 · md5 `3989c3a7d01b` |
| Contact CTA button Present · env href | Structure Present | `public-static-contact-story-cta` · `getStoryGptHref` · shot 02 · md5 `ea1450b31cb3` |
| Vitest · OP eye | Vitest Present · visual **BLOCK** | StaticPublicPage **5/5** · OP eye Absent → Partial=**BLOCK** |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/StaticPublicPage.test.jsx
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" PH17_BASE=http://127.0.0.1:5173 node scripts/tmp-ph17-capture.mjs
```

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
