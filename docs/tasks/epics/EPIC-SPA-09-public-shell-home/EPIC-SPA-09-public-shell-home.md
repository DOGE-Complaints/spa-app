# EPIC-SPA-09 — Public Shell + Home (spa-app)

> **ID:** `EPIC-SPA-09` · **Статус:** Done — PH-01…PH-07 · PH-10 Done (`pkg-000056` gate 2026-08-07T20:53:02Z); prior Wave 4 PH-07 (`pkg-000052` gate 2026-08-06T13:45:10Z)
> **Тип:** Product / UX
> **source:** [`../../backlog-stories/public-home/README.md`](../../backlog-stories/public-home/README.md)
> **Prerequisite:** [G8 AppShell](../../backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md) Done (`pkg-000040`)
> **Admin:** ADMIN-PH-01…06 intake complete → backlog ready for P1.3/P3

---

## Назначение

Пересобрать **public chrome** и **home dashboard**:

1. Header: brand + horizontal nav (Dashboard · How it works · Submit a story) + locale + account slot
2. Account control: guest Sign in / auth Profile + Log out (`supabase.auth.signOut`)
3. Footer A: brand + `[TAGLINE_TBD]` + About · Privacy · Contact
4. `/board` single issue **feed** (columns removed) + SEARCH filters + loader/empty/error
5. `/how-it-works` public tutorial (4 steps)
6. Submit CTAs → `VITE_STORY_GPT_URL` (no hardcoded ChatGPT URL)
7. Board feed **backdrop** for chrome/CTA evidence (intentional results/empty vs labeled load-error)
8. Header **horizontal** logo + favicon polish (post PH-01)

Мокапы SSOT: [`docs/UX/mockups/home/`](../../../UX/mockups/home/README.md) M129–M133 + L10N appendix.

## Контекст (verified)

- G8 Done — Board mounts shared [`AppShell`](../../../src/components/AppShell/) + [`Header.jsx`](../../../src/components/AppShell/Header.jsx) / Sidebar.
- Board **feed** (PH-04 Done) — status columns removed; SEARCH filters reused; Submit GPT CTA via env helper (PH-06 Done).
- `/how-it-works` full tutorial (PH-05 Done).
- API: [STORY-SPA-PH-api-requirements.md](../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) — no new list API; logout is FE-only.
- PH-07 (Wave 4) — chrome evidence must not inherit accidental `board-load-error` backdrop (from PH-06 audit F6).
- PH-10 (Wave 5) — public header brand = horizontal wordmark-in-image + explicit favicon; supersedes PH-01 FR-PH-01.2 text name when Done.

## Состав

| Story | Тема | Wave | Mockups | Pipeline |
|-------|------|------|---------|----------|
| PH-01 | Header brand + nav | 1 | M129 | **Done** · [pipeline](stories/STORY-SPA-PH-01-header-brand-nav/STORY-SPA-PH-01-header-brand-nav.md) · [backlog](../../backlog-stories/public-home/STORY-SPA-PH-01-header-brand-nav.md) |
| PH-02 | Account + logout | 1 | M130 | **Done** · gate PASS 2026-08-04T09:57:03Z · [pipeline](stories/STORY-SPA-PH-02-account-logout-chrome/STORY-SPA-PH-02-account-logout-chrome.md) · [backlog](../../backlog-stories/public-home/STORY-SPA-PH-02-account-logout-chrome.md) |
| PH-03 | Public footer A | 1 | M131 | **Done** · gate PASS 2026-08-04T10:46:36Z · [pipeline](stories/STORY-SPA-PH-03-public-footer/STORY-SPA-PH-03-public-footer.md) · [backlog](../../backlog-stories/public-home/STORY-SPA-PH-03-public-footer.md) |
| PH-04 | Board feed home | 2 | M132 | **Done** · gate PASS 2026-08-04T12:16:21Z · `pkg-000048` · [pipeline](stories/STORY-SPA-PH-04-board-feed-home/STORY-SPA-PH-04-board-feed-home.md) · [backlog](../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) |
| PH-05 | How it works page | 3 | M133 | **Done** · gate PASS 2026-08-04T13:22:05Z · `pkg-000050` · [pipeline](stories/STORY-SPA-PH-05-how-it-works-page/STORY-SPA-PH-05-how-it-works-page.md) · [backlog](../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md) |
| PH-06 | Submit GPT CTA (env) | 3 | M129/M133 CTA | **Done** · gate PASS 2026-08-05T10:31:01Z · `pkg-000051` · [pipeline](stories/STORY-SPA-PH-06-submit-story-gpt-cta/STORY-SPA-PH-06-submit-story-gpt-cta.md) · [backlog](../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md) |
| PH-07 | Board feed backdrop (chrome evidence) | 4 | M132 / M129 | **Done** · gate PASS 2026-08-06T13:45:10Z · `pkg-000052` · [pipeline](stories/STORY-SPA-PH-07-board-feed-backdrop-evidence/STORY-SPA-PH-07-board-feed-backdrop-evidence.md) · [backlog](../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md) |
| PH-10 | Header horizontal logo + favicon | 5 | M129 context | **Done** · gate PASS 2026-08-07T20:53:02Z · `pkg-000056` · [pipeline](stories/STORY-SPA-PH-10-header-horizontal-logo-favicon/STORY-SPA-PH-10-header-horizontal-logo-favicon.md) · [backlog](../../backlog-stories/public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md) |

## Порядок волн

```
Wave 1: PH-01 → PH-02 → PH-03 (chrome)
Wave 2: PH-04 (board feed cutover; no columns)
Wave 3: PH-05 Done (`pkg-000050`) → PH-06 Done (`pkg-000051`, gate 2026-08-05T10:31:01Z)
Wave 4: PH-07 Done (`pkg-000052`, gate 2026-08-06T13:45:10Z) — intentional board backdrop for chrome/CTA evidence
Wave 5: PH-10 Done (`pkg-000056`, gate 2026-08-07T20:53:02Z) — horizontal logo + favicon polish
```

## Cross-epic references

| Epic / Story | Relation |
|--------------|----------|
| [EPIC-SPA-08](../EPIC-SPA-08-design-foundation/EPIC-SPA-08-design-foundation.md) | G8 AppShell prerequisite |
| [EPIC-SPA-03](../EPIC-SPA-03-search-and-filters/EPIC-SPA-03-search-and-filters.md) | SEARCH filters reuse on board |
| [EPIC-SPA-04](../EPIC-SPA-04-identity-and-auth/EPIC-SPA-04-identity-and-auth.md) | Session shell / `/me` / login |
| [EPIC-SPA-07](../EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md) | `/profile` destination for account menu |
| [EPIC-SPA-11](../EPIC-SPA-11-uat-inbound-2026-08/EPIC-SPA-11-uat-inbound-2026-08.md) | BUG-02 logo pad Done — prerequisite for PH-10 lean |

## Локализация (L10N)

- **SSOT:** §«Тексты и переводы» в каждой PH backlog story + M133 appendix for `howItWorks.*`
- **Код (execute):** `publicHomeDictionary.js` + `PUBLIC_HOME_FLAT_KEYS`
- **Namespaces:** `publicHome.nav.*` / `account.*` / `footer.*` / `board.*` + `howItWorks.*`
- **Не reuse:** legacy `createIssue` / marketing `footer` one-liner
- **PH-10:** product name via `img` alt (hardcode or reuse `auth.brand.logoAlt` / publicHome key — implementation choice)

## Вне scope эпика

- New gateway list/aggregate API; collective metrics; CMS footer/tutorial
- Backend logout endpoint; PNG icon generation execute (catalog already exists)
- bullrun queue insert / pkg activate (operator separate step)
- Transparent re-export of horizontal logo pad (optional follow-up story/bug)
