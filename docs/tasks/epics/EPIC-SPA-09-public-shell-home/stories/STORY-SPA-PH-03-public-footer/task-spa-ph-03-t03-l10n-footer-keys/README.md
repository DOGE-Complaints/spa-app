# SPA-PH-03-T03 — L10N publicHome.footer.*

**Status:** Done — P3 2026-08-04T10:46:36Z  
**Story:** [`../STORY-SPA-PH-03-public-footer.md`](../STORY-SPA-PH-03-public-footer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md) FR-PH-03.L10N  
**Depends on:** T01–T02 footer structure  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T10:35:41Z

**Copy SSOT:** [mockup-133-public-how-it-works-localized-copy-appendix.md](../../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) §footer → namespace `publicHome.footer.*`

## Purpose
Add EN/ET/RU keys `publicHome.footer.*` to `publicHomeDictionary.js` (+ FLAT_KEYS). Wire PublicFooter to `t('publicHome.footer.*')`. **Do not** reuse `appShell.footer` / legacy `footer`.

## Risk
Reusing marketing one-liner keys; inventing tagline copy; missing locale parity.

## Code Facts (re-verify at execute)
- [`publicHomeDictionary.js`](../../../../../../../src/i18n/publicHomeDictionary.js) — nav + account only; **no** `publicHome.footer.*` yet.
- Legacy one-liners in `dictionaries.js` / identity — **не reuse** as product Footer A.
- Canonical strings: backlog L10N table + M133 appendix §3.9 / 4.9 / 5.9.
- Brand **DOGEstonia** untranslated; tagline `[TAGLINE_TBD]` all locales.

### Keys (verbatim)

| key | en | et | ru |
|-----|----|----|----|
| `publicHome.footer.brand` | DOGEstonia | DOGEstonia | DOGEstonia |
| `publicHome.footer.tagline` | [TAGLINE_TBD] | [TAGLINE_TBD] | [TAGLINE_TBD] |
| `publicHome.footer.about` | About | Meist | О проекте |
| `publicHome.footer.privacy` | Privacy | Privaatsus | Конфиденциальность |
| `publicHome.footer.contact` | Contact | Kontakt | Контакты |

## AC / DoD
- [x] (P0) All `publicHome.footer.*` keys present EN/ET/RU + FLAT_KEYS (FR-PH-03.L10N) → backlog AC #3.
- [x] (P0) PublicFooter uses these keys; **not** `appShell.footer` / `footer`.
- [x] (P0) Tagline remains `[TAGLINE_TBD]` in all locales → backlog AC #2.

## Where to change
- `spa-app/src/i18n/publicHomeDictionary.js`
- `spa-app/src/components/PublicFooter/` (wire `t(...)`)

## Out of scope
Final tagline approval; CMS; social; inventing extra footer keys; changing Board `board-footer` legacy one-liner beyond PublicFooter mount (unless needed for chrome consistency — prefer PublicFooter swap).

## Verification
```bash
rg -n 'publicHome\.footer' spa-app/src/i18n/publicHomeDictionary.js
rg -n 'appShell\.footer|t\(.footer.\)' spa-app/src/components/PublicFooter || echo 'no_legacy_reuse_ok'
```
