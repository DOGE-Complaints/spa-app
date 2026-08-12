# Task acceptance — SPA-G7-T03

- **Story:** STORY-SPA-G7 — Self-hosted fonts
- **Package:** `pkg-000039-20260728-epic-spa-08-g7-self-hosted-fonts.yaml`
- **Result:** PASS
- **Date:** 2026-07-28T21:57:46Z
- **Scaffolded:** 2026-07-28T21:48:40Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| 5 mono sites → var(--font-family-mono) | PASS | `index.css:458`, `StoryHandoff.css:149`, `AppErrorState.css:46`, `ContributionLayer.css:123`, `WalletStatus.css:73`; `rg ui-monospace` on those files → 0 |

IssuePage already mounts `.issue-details-metadata-monospace` for txid/hash when fields present (`IssuePage.jsx:185-197`).
