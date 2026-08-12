# SPA-PH-02-T06 — L10N publicHome.account.*

**Status:** Done — P3 2026-08-04T09:57:03Z  
**Story:** [`../STORY-SPA-PH-02-account-logout-chrome.md`](../STORY-SPA-PH-02-account-logout-chrome.md)  
**Decision Ref:** backlog FR-PH-02.L10N · AC «L10N keys listed»  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T08:32:36Z

## Purpose
Add `publicHome.account.*` keys (et/ru/en) to `publicHomeDictionary.js` + `PUBLIC_HOME_FLAT_KEYS`. EN = M130 canon. Optional reuse note for `appShell.nav.profile` if string parity.

## Risk
Missing locale parity; forbidden marketing copy.

## Code Facts (re-verify at execute)
- [`publicHomeDictionary.js`](../../../../../../../src/i18n/publicHomeDictionary.js) — nav keys from PH-01; extend account.*
- Merge via [`dictionaries.js`](../../../../../../../src/i18n/dictionaries.js); forbiddenTerms FLAT_KEYS pattern.

### Keys (verbatim backlog)

| key | en | et | ru |
|-----|----|----|----|
| `publicHome.account.signIn` | Sign in | Logi sisse | Войти |
| `publicHome.account.profile` | Profile | Profiil | Профиль |
| `publicHome.account.logOut` | Log out | Logi välja | Выйти |
| `publicHome.account.openMenu` | Open account menu | Ava konto menüü | Открыть меню аккаунта |

## AC / DoD
- [ ] (P0) All four keys in et/ru/en + listed in `PUBLIC_HOME_FLAT_KEYS` (FR-PH-02.L10N / AC #4).
- [ ] (P0) UI strings via `t()` for account control.

## Where to change
- `spa-app/src/i18n/publicHomeDictionary.js`
- `spa-app/src/i18n/forbiddenVerificationTerms.js` if FLAT_KEYS sweep needs account keys
- Dictionary tests

## Out of scope
Nav keys (PH-01); inventing extra account copy.

## Verification
```bash
rg -n 'publicHome.account' spa-app/src/i18n/publicHomeDictionary.js
cd spa-app && npm test -- --run publicHomeDictionary
```
