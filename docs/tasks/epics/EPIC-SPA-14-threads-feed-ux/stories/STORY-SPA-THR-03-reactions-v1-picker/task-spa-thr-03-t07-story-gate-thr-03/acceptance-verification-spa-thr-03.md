# Acceptance verification — STORY-SPA-THR-03

- **Date:** 2026-09-22T21:34:00Z
- **Package:** `pkg-000079-20260922-epic-spa-14-thr-03-reactions-v1-picker.yaml`
- **Story:** STORY-SPA-THR-03-reactions-v1-picker
- **Mockup Path A:** M145

## Result: **PASS**

| Check | Evidence |
|-------|----------|
| FR-THR-03.1–03.3 catalog + 3 layers + enabled-only | `reactionsV1Catalog.js` · `ReactionControls.jsx` · screenshots 02–03 |
| FR-THR-03.4–03.5 strip + picker | screenshots 01–02 |
| FR-THR-03.6 moderation omitted on thread-root | vitest · `target="thread-root"` |
| FR-THR-03.7–03.8 agree ⟂ disagree + capacity 3 | vitest · screenshot 04 |
| FR-THR-03.9–03.11 desktop button / mobile / keyboard | screenshots 01/05/06 |
| FR-THR-03.12–03.13 no invent HTTP / voice-weight | presentation-only harness force |
| L10N `threadsFeed.reactions.*` | `threadsFeedDictionary.js` |
| Icons §Иконки | `ic-react` + emoji aids (not invent `ic-*` reaction ids) |
| Screenshots story-root | `screenshots/README.md` · 6 PNGs |
| Vitest | **601** passed / 2 skipped |
| `--verify` | ok 7 paths · pkg-000079 |

## Guards

- Only reactions.v1 ids · React write Open → chrome + fail-soft  
- No invent social HTTP  
- THR-04…06 not started  
- No git push · P4 not run (OP → Validator)
