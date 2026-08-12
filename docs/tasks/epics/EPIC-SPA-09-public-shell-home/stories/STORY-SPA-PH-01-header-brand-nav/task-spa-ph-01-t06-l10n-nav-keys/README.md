# SPA-PH-01-T06 — L10N publicHome.nav.*

**Status:** Done — P3 PASS 2026-08-04T07:07:39Z  
**Story:** [`../STORY-SPA-PH-01-header-brand-nav.md`](../STORY-SPA-PH-01-header-brand-nav.md)  
**Decision Ref:** backlog FR-PH-01.L10N + §Тексты и переводы  
**Depends on:** T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-03T13:49:59Z

## Purpose
Create `publicHomeDictionary.js` + `PUBLIC_HOME_FLAT_KEYS`; register with i18n. Keys/values **verbatim** from backlog L10N table. Brand wordmark DOGEstonia not translated. Forbidden: landing fluff, «Oops».

## Risk
Hardcoded EN in chrome; key drift vs flat-keys guard; forbidden marketing terms.

## Code Facts (re-verify at execute)
- `spa-app/src/i18n/publicHomeDictionary.js` — **absent** (P1.3).
- Pattern: existing dictionaries under `spa-app/src/i18n/` + [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md).
- Locale selector strings — **reuse** existing locale keys (do not duplicate).

### Keys (verbatim)

| key | en | et | ru |
|-----|----|----|----|
| `publicHome.nav.dashboard` | Dashboard | Juhtpaneel | Доска |
| `publicHome.nav.howItWorks` | How it works | Kuidas see töötab | Как это работает |
| `publicHome.nav.submitStory` | Submit a story | Esita lugu | Подать историю |
| `publicHome.nav.menuOpen` | Open menu | Ava menüü | Открыть меню |
| `publicHome.nav.menuClose` | Close menu | Sulge menüü | Закрыть меню |

## AC / DoD
- [ ] (P0) Keys above en/et/ru present (AC #4).
- [ ] (P0) `PUBLIC_HOME_FLAT_KEYS` listed.
- [ ] (P0) Nav labels via `t()`; no forbidden marketing terms.

## Where to change
- `spa-app/src/i18n/publicHomeDictionary.js` (new)
- `spa-app/src/i18n/` registration (provider / index)

## Out of scope
Account/footer/board/`howItWorks.*` keys (other PH stories).

## Verification
```bash
test -f spa-app/src/i18n/publicHomeDictionary.js
rg -n 'publicHome\.nav\.|PUBLIC_HOME_FLAT_KEYS' spa-app/src/i18n/
```
