# STORY-SPA-THR-01 — BoardIssuePost + IssueThreadBlock mounts

## Meta

- **Key:** `STORY-SPA-THR-01-board-issue-post-mounts`
- **orientation:** ui_first
- **ui_scope:** visual
- **Status:** Done
- **Blocked-on:** — (P3 Done `pkg-000077`)
- **Depends on:** [M143](../../../UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.md); [M148](../../../UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.md); [icon catalog](STORY-SPA-THR-icon-assets.md); PH-04 board host; [PRODUCT-BRIEF](PRODUCT-BRIEF.md)
- **Package:** [threads-feed/](INDEX.md)
- **Architecture:** [01-composition-and-mounts](../../../architecture/threads-feed-ux/01-composition-and-mounts.md)
- **Parent REQ:** [17](../../../requirements/17-issue-thread-feed-ux-and-reactions.md) AC-SPA-THR-02/04

## Артборд (SSOT дизайна)

| Мокап | Состояние / фокус | Спека | PNG |
|-------|-------------------|-------|-----|
| **M143** THR-P | Feed post slot: loading · empty · populated · unavailable · narrow (rev 1.1 continuous shell) | [mockup-143-…-spec.md](../../../UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.md) | [mockup-143-…-spec.png](../../../UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.png) |
| **M148** THR-I | `/issue/:id` shared thread: detail+thread · parity · narrow | [mockup-148-…-spec.md](../../../UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.md) | [mockup-148-…-spec.png](../../../UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.png) |

Visual SSOT = PNG; states/locks/copy SSOT = spec markdown. Implement **exactly** M143 rev 1.1 continuous post shell (not two separate rounded boxes with a large gap).

## Зачем простыми словами

На `/board` Issue читается как Facebook-like пост: civic-карточка + discussion shell в одной непрерывной оболочке. Тот же `IssueThreadBlock` на `/issue/:id`. Страницу Issue не удалять.

## Текущее состояние (As-of-Done · P3 `pkg-000077` 2026-09-22)

- `/board` feed wraps each Issue in [`BoardIssuePost`](../../../../src/components/threads/BoardIssuePost.jsx) + shared [`IssueThreadBlock`](../../../../src/components/threads/IssueThreadBlock.jsx) (status presentation local; no invent social HTTP)
- `/issue/:id` mounts the same `IssueThreadBlock` ([`IssuePage.jsx`](../../../../src/pages/IssuePage.jsx)); route retained ([`App.jsx`](../../../../src/App.jsx))
- L10N: [`threadsFeedDictionary.js`](../../../../src/i18n/threadsFeedDictionary.js) on disk · namespace `threadsFeed.post.*`
- Continuous shell rev 1.1 + testids `board-issue-post` / `issue-thread-block`
- Pipeline Meta **Done** · gate PASS · screenshots Happy + Edge (P6 T08)

### Historical (pre-mount · before P3)

- Feed mapped `IssueCard` only; no `BoardIssuePost` / `IssueThreadBlock` in src (REQ-17 §3 baseline).

## Функциональные требования (FR)

### Composition (M143 §2–3 · AC-SPA-THR-02/04)

- **FR-THR-01.1** Each feed row with an Issue uses outer wrapper projected `data-testid="board-issue-post"` containing (1) existing civic Issue card chrome and (2) `IssueThreadBlock` directly beneath (M143 §3.1–3.3).
- **FR-THR-01.2** Civic Issue remains the root object: title, summary, type/labels/status/dates, and existing **Open issue** affordance stay primary; thread never replaces the Issue card (M143 §2).
- **FR-THR-01.3** Visual revision **1.1**: one continuous outer card/shell; Issue vs thread separated by **internal hairline dividers**, not two independent nested rounded boxes with a large gap (M143 §1 Visual revision 1.1, §3.1).
- **FR-THR-01.4** Vertical rhythm: compact Issue identity row → title/summary/civic metadata → engagement/action row → comment summary/tree → composer (M143 §3.1, §3.4). Must **not** invent a human author/avatar social header for the Issue (M143 §3.2).
- **FR-THR-01.5** Product placement primary = `/board` feed (D30 / AC-SPA-THR-04). Do not rewrite M132 artboard file.

### States THR-P-A…E (M143 §4)

- **FR-THR-01.6** **THR-P-A Loading:** full readable Issue card + restrained discussion loading chrome beneath; no fake comments/counts (M143 §4).
- **FR-THR-01.7** **THR-P-B Empty:** honest empty discussion + composer affordance; no fabricated activity (M143 §4).
- **FR-THR-01.8** **THR-P-C Populated:** collapsed discussion summary, open-tree affordance, reaction-summary slot, composer slot, soft escalation (`Invite organization`) slot — placement only; full interactions owned by THR-02/03/04 (M143 §3.3–3.4, §4).
- **FR-THR-01.9** **THR-P-D Unavailable:** Issue card remains fully readable + compact `Discussion unavailable` (or L10N equiv.); social failure must not remove Open issue / civic actions (M143 §2 progressive/fail-soft, §4).
- **FR-THR-01.10** **THR-P-E Narrow:** vertical Issue → thread stack; no horizontal overflow; same hierarchy (M143 §4).

### Action row (M143 §3.4)

- **FR-THR-01.11** Full-width action row with evenly distributed labelled actions: **React**, **Discussion**, **Invite organization** (DOGEstonia labels/icons — paths in §Иконки). **Open issue** remains a distinct civic navigation control and must not be replaced by the social action row.

### Issue page mount (M148 · AC-SPA-THR-02)

- **FR-THR-01.12** `/issue/:id` keeps civic detail body and mounts the **same** `IssueThreadBlock` (`data-testid="issue-thread-block"`) — no second detail-only social product (M148 §2–3, §6).
- **FR-THR-01.13** **THR-I-A:** detail primary + populated shared thread below without replacing detail (M148 §4, §7).
- **FR-THR-01.14** **THR-I-B:** empty / populated / unavailable thread semantics and copy match feed (M148 §4, §8).
- **FR-THR-01.15** **THR-I-C:** narrow/mobile one readable column stacking detail + thread (M148 §4, §7).
- **FR-THR-01.16** Shared parity: loading/empty/populated/unavailable, tree/composer/reactions/stub/verify chrome follow M143/M144/M145/M146/M147 contracts on both mounts (M148 §8).

### Testids

- **FR-THR-01.17** Projected: `board-issue-post`, `issue-thread-block` (M143 §3.1–3.3; M148 §14).

## Вне scope

- THR-02 tree/attach interaction detail beyond placement slots  
- THR-03 full picker; THR-04 stub feedback detail; THR-05 verify gate detail (siblings)  
- **AC-SPA-THR-03** / REQ8: cabinet / votes / hold-shadow  
- **AC-SPA-THR-07:** rate-limit / near-dup UX  
- Invent HTTP (AC-SPA-THR-01); Facebook/Meta branding/assets  
- Two-box “technical panels” layout from pre-1.1 drafts  
- Rewriting M132; deleting `/issue/:id`

## §Иконки

> SSOT: [STORY-SPA-THR-icon-assets.md](STORY-SPA-THR-icon-assets.md). Wiring: **Runtime** в `<img src>` / CSS; **Disk** = путь от `spa-app/`. Все PNG **ON DISK**. Не показывать `ic-*` filenames резиденту (M145).

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| React (action row) | `/icons/threads-feed/ic-react.png` | `public/icons/threads-feed/ic-react.png` | thr NEW |
| Discussion (action row) | `/icons/threads-feed/ic-discussion.png` | `public/icons/threads-feed/ic-discussion.png` | thr NEW |
| Invite organization (action row) | `/icons/threads-feed/ic-invite-organization.png` | `public/icons/threads-feed/ic-invite-organization.png` | thr NEW · shared THR-04 |
| Discussion unavailable / load fail | `/icons/story-handoff/ic-cloud-error.png` | `public/icons/story-handoff/ic-cloud-error.png` | Reuse · primary |
| Soft info (alt unavailable) | `/icons/story-handoff/ic-info.png` | `public/icons/story-handoff/ic-info.png` | Reuse · alt to cloud-error |
| Thread loading spinner | `/icons/story-handoff/ic-spinner.png` | `public/icons/story-handoff/ic-spinner.png` | Reuse + CSS skeleton |
| Brand (shell) | `/assets/DOGEstonia-logo-big.png` | `public/assets/DOGEstonia-logo-big.png` | Reuse |
| Issue type / Open issue / overflow | — | — | existing IssueCard chrome — **no** new extract |
| Reaction summary marks | emoji aids | — | **Not ic-*** · see catalog §Not ic-* / THR-03 |

## §L10N

> EN — канон M143/M148. Namespace `threadsFeed.*`.  
> `src/i18n/threadsFeedDictionary.js` — **on disk** (P3 T05 · `pkg-000077`). Tables here remain docs SSOT.

### `threadsFeed.post.*`

| key | en | et | ru |
|-----|----|----|----|
| `threadsFeed.post.action.react` | React | Reageeri | Реакция |
| `threadsFeed.post.action.discussion` | Discussion | Arutelu | Обсуждение |
| `threadsFeed.post.action.inviteOrganization` | Invite organization | Kutsu organisatsioon | Пригласить организацию |
| `threadsFeed.post.empty.title` | No comments yet | Kommentaare pole veel | Пока нет комментариев |
| `threadsFeed.post.empty.helper` | Start a constructive discussion about this Issue. | Alusta konstruktiivset arutelu selle teema üle. | Начните конструктивное обсуждение этой темы. |
| `threadsFeed.post.composerPlaceholder` | Write a comment | Kirjuta kommentaar | Написать комментарий |
| `threadsFeed.post.discussionUnavailable` | Discussion unavailable | Arutelu pole saadaval | Обсуждение недоступно |
| `threadsFeed.post.discussionUnavailableHelper` | The Issue is still available. Try again later. | Teema on endiselt saadaval. Proovi hiljem uuesti. | Тема по-прежнему доступна. Попробуйте позже. |
| `threadsFeed.post.tryAgain` | Try again | Proovi uuesti | Попробовать снова |

### Reuse (не дублировать в `threadsFeed.*`)

| key | en | et | ru | Note |
|-----|----|----|----|------|
| `publicHome.board.openIssue` | Open issue → | Ava teema → | Открыть тему → | existing civic nav (PH dictionary) |

## Субтаски

> Projected pipeline IDs — folders **not** created (ADMIN-THR-06). Arch: [01-composition](../../../architecture/threads-feed-ux/01-composition-and-mounts.md). **No invent HTTP.**

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-thr-01-t01-board-issue-post-wrap` | BoardIssuePost wrap IssueCard on `/board` |
| **T02** | `task-spa-thr-01-t02-thread-block-board-mount` | IssueThreadBlock mount under feed post |
| **T03** | `task-spa-thr-01-t03-thread-block-issue-mount` | Same IssueThreadBlock on `/issue/:id` |
| **T04** | `task-spa-thr-01-t04-continuous-shell-testids` | Continuous shell M143 + `board-issue-post` / `issue-thread-block` |
| **T05** | `task-spa-thr-01-t05-l10n-post-dictionary` | Bootstrap `threadsFeedDictionary.js` + `threadsFeed.post.*` (**on disk** · P3) |
| **T06** | `task-spa-thr-01-t06-vitest-mount-states` | Vitest loading/empty/unavailable (fail-soft; no mock social) |
| **T07** | `task-spa-thr-01-t07-story-gate-thr-01` | Story gate THR-01 |

## Acceptance Criteria

- [x] Feed row matches M143 PNG hierarchy (continuous shell rev 1.1) for states A–E
- [x] `board-issue-post` wraps Issue card + `issue-thread-block`
- [x] Fail-soft unavailable keeps Issue readable (AC-SPA-THR-02 spirit; M143 P-D)
- [x] `/issue/:id` mounts same thread block per M148; route not removed (AC-SPA-THR-02)
- [x] No Facebook trademarks; no invent endpoints (AC-SPA-THR-01)
- [ ] Links: M143 · M148 · PRODUCT-BRIEF · arch 01
