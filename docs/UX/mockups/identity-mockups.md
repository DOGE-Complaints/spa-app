# DOGEstonia UX Mockups Roadmap

## EPIC-04 — User Cabinet

## EPIC-05 — Redirect Authorization & Verification

Source context:

* Existing visual canon: dark DOGEstonia shell, Jira/Linear-like civic dashboard, yellow accent, fixed header/sidebar/footer.
* Existing mockups M01–M20 cover Issue Board, filters, cards, status badges, loading/empty/error states, details route, i18n/header.
* New mockups continue numbering from M21.

---

# EPIC-04 — User Cabinet

## Epic Goal

Create the DOGEstonia user cabinet as the personal civic control center.

The cabinet is not a social profile. It is a structured civic account surface showing:

* account status;
* phone verification state;
* user story activity;
* draft/resume state;
* future wallet connection;
* future receipts and reputation placeholders.

The cabinet should visually remain inside the existing DOGEstonia app shell.

---

## S04-1 — Profile Cabinet Shell

### Goal

Define the main layout of the user cabinet using the existing fixed shell pattern.

### Functional UX Requirements

* Reuse existing app shell: header, sidebar, footer.
* Add active sidebar item: `Profile` or `Cabinet`.
* Main content area should be structured into cards/sections.
* Must support loading/error states.
* Must not look like a marketing profile or social media page.

### Mockups

#### M21 — User Cabinet Overview / Default

Type: full-screen mockup
Target function: show the default cabinet screen with account summary, civic status, story activity, wallet placeholder, and contribution placeholder.

#### M22 — User Cabinet Loading

Type: full-screen state mockup
Target function: show cabinet shell with skeleton blocks while `/me` and profile data load.

#### M23 — User Cabinet Load Error

Type: full-screen state mockup
Target function: show profile loading failure with neutral retry affordance.

#### M24 — User Cabinet Empty / New User

Type: full-screen state mockup
Target function: show a newly created user with no stories, no wallet, no receipts, and unverified civic status.

---

## S04-2 — Account Summary Block

### Goal

Define the account identity block shown inside the cabinet.

### Functional UX Requirements

* Show account-level information, not public identity.
* Email may be absent until backend supports it.
* Display name can be null.
* Phone number must not be shown.
* No emotional copy.
* Avoid KYC/government/bank language.

### Mockups

#### M25 — Account Summary Block / Complete

Type: component fragment
Target function: show account email/display name/role/status when available.

#### M26 — Account Summary Block / Minimal Data

Type: component fragment
Target function: show cabinet account block when only backend `/me` fields are available.

#### M27 — Account Summary Block / Missing Email

Type: component fragment
Target function: show current backend gap where `/me.email` may not yet exist.

---

## S04-3 — Civic Verification Status

### Goal

Show whether the account is verified as a civic participant.

### Functional UX Requirements

Canonical labels:

* `Civic account not verified yet`
* `Verified civic participant`

Verification means:

* `phone_verified=true`

Must also show:

* phone verification date if available;
* dial prefix if available;
* no raw phone number.

### Mockups

#### M28 — Civic Status / Unverified

Type: component fragment
Target function: show user can browse but protected actions require one-time phone verification.

#### M29 — Civic Status / Verified

Type: component fragment
Target function: show verified civic participant state with calm confirmation.

#### M30 — Civic Status / Verification Available

Type: component fragment
Target function: show optional `Verify when needed` or `Verify now` action from cabinet.

#### M31 — Civic Status / Already Verified

Type: component fragment
Target function: show non-repeatable verification state; no repeated prompt.

---

## S04-4 — Phone Verification From Cabinet

### Goal

Allow the user to start phone verification from the cabinet.

### Functional UX Requirements

* Verification is inline inside SPA.
* Modal or focused panel format is acceptable.
* Disclosure must appear before phone input.
* User enters Estonian phone number `+372…`.
* Then user enters 6-digit OTP.
* Show 5-minute expiry and 60-second resend cooldown.
* After success, refresh `/me`.

### Mockups

#### M32 — Phone Verification Disclosure Modal

Type: focused modal / component state
Target function: explain why phone verification is needed before asking for the number.

#### M33 — Phone Number Input

Type: focused modal / component state
Target function: collect phone number with `+372` expectation and `Send code` CTA.

#### M34 — OTP Code Input

Type: focused modal / component state
Target function: collect 6-digit SMS code with expiry and resend timer.

#### M35 — OTP Confirm Loading

Type: focused modal / component state
Target function: show code confirmation in progress.

#### M36 — Phone Verification Success

Type: focused modal / component state
Target function: confirm account is verified and return to cabinet.

---

## S04-5 — Phone Verification Error States

### Goal

Cover all backend-driven phone verification errors.

### Functional UX Requirements

Must map real backend errors to UX states:

* `COUNTRY_NOT_ALLOWED`
* `RATE_LIMITED`
* `CODE_MISMATCH`
* `CODE_EXPIRED`
* `TOO_MANY_ATTEMPTS`
* `PROVIDER_UNAVAILABLE`
* `SEND_FAILED`
* `profile_conflict`
* `AUTHENTICATION_REQUIRED`
* `session_expired`
* `network_error`

### Mockups

#### M37 — Country Not Supported / Waitlist

Type: focused screen or modal
Target function: explain +372-only limitation and offer waitlist email capture.

#### M38 — OTP Rate Limited

Type: modal state
Target function: show resend cooldown timer and prevent repeated send.

#### M39 — Wrong Code

Type: modal state
Target function: show incorrect code message and remaining attempts.

#### M40 — Code Expired

Type: modal state
Target function: show expired code and offer resend.

#### M41 — Too Many Attempts

Type: modal state
Target function: show lockout and restart verification flow.

#### M42 — SMS Provider Unavailable

Type: modal state
Target function: show provider failure and retry-later affordance.

#### M43 — Phone Conflict

Type: focused modal/screen
Target function: show “this number is already used” without auto-merge; offer login to correct account or use another number.

#### M44 — Authentication Required During Verification

Type: modal state
Target function: show session lost and route back to login.

---

## S04-6 — Story Activity in Cabinet

### Goal

Show the user’s civic activity.

### Functional UX Requirements

Display:

* submitted stories;
* drafts;
* story statuses;
* timestamps;
* whether a draft is waiting for verification/resume.

This should not duplicate the public board. It is the user’s personal activity ledger.

### Mockups

#### M45 — Story Activity List

Type: cabinet section / component fragment
Target function: show submitted stories with status and date.

#### M46 — Story Activity Empty

Type: cabinet section / empty state
Target function: show user has not submitted any stories yet.

#### M47 — Drafts List

Type: cabinet section / component fragment
Target function: show saved drafts waiting for submit or verification.

#### M48 — Draft Resume Required

Type: cabinet section / state fragment
Target function: show draft saved before verification and action to resume.

#### M49 — Story Activity Error

Type: cabinet section / error state
Target function: show failure to load user stories without breaking whole cabinet.

---

## S04-7 — Wallet Placeholder

### Goal

Reserve the future DOGE wallet layer without implementing full wallet UX yet.

### Functional UX Requirements

Show:

* `Wallet not linked`;
* future explanation of wallet signatures;
* no blocker for MVP;
* no financial speculation language.

### Mockups

#### M50 — Wallet Not Linked

Type: cabinet section / component fragment
Target function: show future wallet area with inactive state.

#### M51 — Wallet Linked Placeholder

Type: cabinet section / component fragment
Target function: show future state where Dogecoin address is connected.

#### M52 — Wallet Coming Later

Type: cabinet section / info fragment
Target function: explain that wallet signatures will later prove authorship cryptographically.

---

## S04-8 — Receipts & Contribution Placeholder

### Goal

Prepare space for DOGE OS reputation and contribution system.

### Functional UX Requirements

No DeFi framing. No market framing. No rewards promise.

Show future civic infrastructure:

* story receipts;
* contribution records;
* reputation placeholders;
* public-good participation.

### Mockups

#### M53 — Receipts Placeholder

Type: cabinet section / component fragment
Target function: reserve area for future story receipts.

#### M54 — Contribution Summary Placeholder

Type: cabinet section / component fragment
Target function: show future contribution layer without live metrics.

#### M55 — Reputation Placeholder

Type: cabinet section / component fragment
Target function: show future reputation surface as civic trust, not financial score.

---

# EPIC-05 — Redirect Authorization & Verification

## Epic Goal

Create the UX layer for users arriving from Custom GPT or protected actions.

This epic covers:

* `/verify`;
* GPT-originated verification;
* login/signup continuation;
* protected action gate;
* draft preservation;
* return-to-GPT state;
* future OAuth authorize screens.

Important: OAuth backend is currently blocked/501, so OAuth screens may be designed but not released end-to-end until backend is ready.

---

## S05-1 — `/verify` Entry Page

### Goal

Create universal verification landing page.

### Functional UX Requirements

Route examples:

* `/verify`
* `/verify?context=custom_gpt`
* `/verify?context=story&draft_id=<uuid>`

The page must:

* resolve current session;
* route unauthenticated users to login/signup;
* check `/me.phone_verified`;
* start phone verification if needed;
* show return/continue instruction after success.

### Mockups

#### M56 — Verify Page / Resolving Session

Type: full-screen mockup
Target function: show shell/page while session and context are being resolved.

#### M57 — Verify Page / Auth Required

Type: full-screen mockup
Target function: tell user they need to login/signup before verification can continue.

#### M58 — Verify Page / Already Verified

Type: full-screen mockup
Target function: show user is already verified and no OTP is needed.

#### M59 — Verify Page / Verification Required

Type: full-screen mockup
Target function: show entry into phone verification flow.

#### M60 — Verify Page / Invalid Context

Type: full-screen error state
Target function: handle missing/unknown context or invalid draft id.

---

## S05-2 — GPT-Originated Verification

### Goal

Support the Custom GPT handoff path.

### Functional UX Requirements

Context:

`/verify?context=custom_gpt`

Flow:

* user arrives from ChatGPT;
* if no session → login/signup;
* if not phone verified → phone verification;
* after success → show instruction to return to ChatGPT.

Important:

* number and OTP are entered only on DOGEstonia web page;
* no credentials or OTP inside GPT;
* copy must be calm and clear.

### Mockups

#### M61 — GPT Verification Landing

Type: full-screen mockup
Target function: explain that DOGEstonia needs a one-time phone verification before continuing from GPT.

#### M62 — GPT Login Required

Type: full-screen mockup
Target function: show login/signup requirement for GPT-originated user.

#### M63 — GPT Phone Verification Required

Type: full-screen + modal entry
Target function: show GPT context with phone verification CTA.

#### M64 — GPT Verification Success / Return to ChatGPT

Type: full-screen success state
Target function: tell user they are ready and should return to ChatGPT.

#### M65 — GPT Already Ready

Type: full-screen success state
Target function: show already verified user can return to GPT immediately.

---

## S05-3 — Login / Signup Continuation

### Goal

Design auth screens in the redirect flow.

### Functional UX Requirements

Login/signup is email-first through Supabase Auth.

Phone is not asked during normal signup.

States:

* login;
* signup;
* magic link sent;
* invalid credentials;
* network error;
* session expired;
* return to previous verification context.

### Mockups

#### M66 — Login Screen / Default

Type: full-screen auth mockup
Target function: normal email login screen within DOGEstonia style.

#### M67 — Signup Screen / Default

Type: full-screen auth mockup
Target function: account creation without phone input.

#### M68 — Magic Link Sent

Type: full-screen auth state
Target function: confirm email/magic link was sent.

#### M69 — Auth Error / Invalid Credentials

Type: full-screen auth state
Target function: show incorrect login credentials without emotional copy.

#### M70 — Auth Error / Network

Type: full-screen auth state
Target function: show retryable network/backend issue.

#### M71 — Session Expired

Type: full-screen auth state
Target function: tell user session expired and login is required again.

---

## S05-4 — Protected Action Gate

### Goal

Design the lazy verification gate for protected actions.

### Functional UX Requirements

Canonical protected action:

* submit story

Flow:

* user composes or arrives with pending story;
* frontend checks `/me.phone_verified`;
* if false → save draft;
* open verification;
* after success → resume draft;
* backend may still return `verification_required`.

### Mockups

#### M72 — Protected Action Gate / Verification Required

Type: focused modal or screen fragment
Target function: explain that submitting requires one-time phone verification.

#### M73 — Save Draft Before Verification

Type: focused modal/state
Target function: show draft is saved before starting verification.

#### M74 — Draft Saved / Verify and Continue

Type: focused modal/state
Target function: let user proceed to verification without losing content.

#### M75 — Resume Draft After Verification

Type: focused modal/state
Target function: show verification completed and original action can continue.

#### M76 — Backend Rejected / Verification Required

Type: focused error state
Target function: handle backend source-of-truth rejection even if local `/me` looked verified.

---

## S05-5 — Phone Verification Shared Component Sheet

### Goal

Create reusable state sheet for phone verification component used by cabinet, `/verify`, and protected action gate.

### Functional UX Requirements

This sheet should not be tied to one route.

It should define:

* disclosure;
* phone input;
* OTP input;
* loading;
* success;
* resend;
* error states;
* disabled states.

### Mockups

#### M77 — Phone Verification Component Sheet / Core States

Type: component state sheet
Target function: show disclosure, phone input, OTP input, loading, success in one sheet.

#### M78 — Phone Verification Component Sheet / Error States

Type: component state sheet
Target function: show country not supported, wrong code, expired code, rate limit, too many attempts, provider unavailable.

#### M79 — OTP Resend Timer States

Type: component state sheet
Target function: show resend disabled, countdown active, resend available.

#### M80 — Phone Verification Accessibility Sheet

Type: component/state annotation sheet
Target function: show focus order, autocomplete one-time-code, error text placement, keyboard behavior.

---

## S05-6 — Country Waitlist

### Goal

Handle users with non-Estonian phone numbers.

### Functional UX Requirements

Triggered by:

`COUNTRY_NOT_ALLOWED`

Show:

* only +372 supported for now;
* why;
* optional email waitlist;
* no blame;
* no hard political framing.

### Mockups

#### M81 — Country Not Supported / Info

Type: focused screen or modal
Target function: explain Estonia-only phone verification.

#### M82 — Country Waitlist Email Form

Type: focused screen or modal
Target function: collect email for expansion waitlist.

#### M83 — Country Waitlist Joined

Type: focused success state
Target function: confirm user joined waitlist.

---

## S05-7 — Phone Conflict Recovery

### Goal

Handle one phone number already attached to another account.

### Functional UX Requirements

Triggered by:

`409 profile_conflict`

Must not auto-merge.

Must offer:

* login to existing account;
* try another number;
* contact/support later if needed.

### Mockups

#### M84 — Phone Conflict / This Number Is Already Used

Type: focused modal/screen
Target function: explain conflict calmly.

#### M85 — Phone Conflict / Login To Existing Account

Type: focused modal/screen
Target function: guide user to login to the account already using the number.

#### M86 — Phone Conflict / Use Another Number

Type: focused modal/screen
Target function: return user to phone input.

---

## S05-8 — OAuth Authorize Placeholder

### Goal

Prepare future OAuth-style authorization flow for Custom GPT.

### Functional UX Requirements

Current backend state:

* `/oauth/*` not ready;
* backend returns 501;
* do not release end-to-end until OAUTH-01 is complete.

Design can still define target UX.

### Mockups

#### M87 — OAuth Authorize / Resolving Request

Type: full-screen mockup
Target function: show request validation/loading.

#### M88 — OAuth Authorize / Need Login

Type: full-screen mockup
Target function: route unauthenticated user to login.

#### M89 — OAuth Authorize / Consent Optional

Type: full-screen mockup
Target function: optional consent screen if product decides it is needed.

#### M90 — OAuth Authorize / Issuing Code

Type: full-screen mockup
Target function: show authorization code issuing/redirect preparation.

#### M91 — OAuth Authorize / Invalid Client

Type: full-screen error state
Target function: show invalid client/request error.

#### M92 — OAuth Authorize / Invalid Redirect URI

Type: full-screen error state
Target function: show redirect URI validation failure.

#### M93 — OAuth Authorize / Backend Not Ready

Type: full-screen error/blocked state
Target function: show internal unavailable state while OAuth is not implemented.

---

# Mockup Format Policy

Not every mockup must be a full-screen view.

Use full-screen mockups for:

* new routes;
* shell layout;
* login/signup;
* `/verify`;
* GPT return;
* cabinet overview;
* major load/error states.

Use component fragments for:

* account summary;
* civic status card;
* wallet block;
* receipt placeholder;
* contribution summary;
* verification modal states.

Use component state sheets for:

* OTP flow;
* errors;
* resend timer;
* accessibility/focus order;
* reusable verification component.

---

# Numbering Summary

EPIC-04 User Cabinet:

* M21–M55

EPIC-05 Redirect Authorization & Verification:

* M56–M93

Previous EPIC-03 Issue Board:

* M01–M20

Total new mockups:

* 73 mockup identifiers
* not all require full-screen generation
* many can be generated as fragments/state sheets


# Revised Mockup Strategy (заменяет текущие секции Mockups)

## EPIC-04 — User Cabinet

### S04-1 Profile Cabinet Shell

Сохраняем отдельные полноэкранные мокапы:

| ID  | Mockup                                    | Тип                     |
| --- | ----------------------------------------- | ----------------------- |
| M21 | User Cabinet Overview / Default           | Full Screen             |
| M22 | User Cabinet Loading / Error States Sheet | Full Screen State Sheet |
| M23 | User Cabinet Empty / New User             | Full Screen             |

---

### S04-2 Account Summary Block

Объединить:

| Старые |
| ------ |
| M25    |
| M26    |
| M27    |

в:

| Новый                             |
| --------------------------------- |
| M25 — Account Summary State Sheet |

Состояния на одном артборде:

* Complete
* Minimal Data
* Missing Email

---

### S04-3 Civic Verification Status

Объединить:

| Старые |
| ------ |
| M28    |
| M29    |
| M30    |
| M31    |

в:

| Новый                          |
| ------------------------------ |
| M28 — Civic Status State Sheet |

Состояния:

* Unverified
* Verified
* Verification Available
* Already Verified

---

### S04-4 Phone Verification From Cabinet

Объединить:

| Старые |
| ------ |
| M32    |
| M33    |
| M34    |
| M35    |
| M36    |

в:

| Новый                         |
| ----------------------------- |
| M32 — Verification Flow Sheet |

Шаги:

* Disclosure
* Phone Input
* OTP Input
* Confirmation Loading
* Success

---

### S04-5 Phone Verification Errors

Объединить:

| Старые  |
| ------- |
| M37–M44 |

в:

| Новый                                |
| ------------------------------------ |
| M37 — Verification Error State Sheet |

Состояния:

* Country Not Allowed
* Rate Limited
* Wrong Code
* Code Expired
* Too Many Attempts
* Provider Unavailable
* Phone Conflict
* Authentication Required

---

### S04-6 Story Activity

Объединить:

| Старые  |
| ------- |
| M45–M49 |

в:

| Новый                            |
| -------------------------------- |
| M45 — Story Activity State Sheet |

Состояния:

* Stories List
* Empty
* Drafts
* Resume Required
* Error

---

### S04-7 Wallet Placeholder

Объединить:

| Старые |
| ------ |
| M50    |
| M51    |
| M52    |

в:

| Новый                    |
| ------------------------ |
| M50 — Wallet State Sheet |

Состояния:

* Not Linked
* Linked
* Coming Later

---

### S04-8 Receipts & Contributions

Объединить:

| Старые |
| ------ |
| M53    |
| M54    |
| M55    |

в:

| Новый                                |
| ------------------------------------ |
| M53 — Contribution Layer State Sheet |

Состояния:

* Story Receipts
* Contributions
* Reputation

---

# EPIC-05 — Redirect Authorization & Verification

### S05-1 Verify Entry Page

Оставить отдельными экранами:

| ID  |
| --- |
| M56 |
| M57 |
| M58 |
| M59 |
| M60 |

Это route-level состояния.

---

### S05-2 GPT Verification

Объединить:

| Старые  |
| ------- |
| M61–M65 |

в:

| Новый                             |
| --------------------------------- |
| M61 — GPT Verification Flow Sheet |

Состояния:

* Landing
* Login Required
* Verification Required
* Success
* Already Ready

---

### S05-3 Login / Signup Continuation

Объединить:

| Старые  |
| ------- |
| M66–M71 |

в:

| Новый                  |
| ---------------------- |
| M66 — Auth State Sheet |

Состояния:

* Login
* Signup
* Magic Link Sent
* Invalid Credentials
* Network Error
* Session Expired

---

### S05-4 Protected Action Gate

Объединить:

| Старые  |
| ------- |
| M72–M76 |

в:

| Новый                                     |
| ----------------------------------------- |
| M72 — Protected Action Verification Sheet |

Состояния:

* Verification Required
* Draft Saved
* Verify & Continue
* Resume Draft
* Backend Rejected

---

### S05-5 Shared Verification Component

Объединить:

| Старые |
| ------ |
| M77    |
| M78    |
| M79    |
| M80    |

в:

| Новый                                           |
| ----------------------------------------------- |
| M77 — Phone Verification Master Component Sheet |

Содержит:

* Disclosure
* Phone Input
* OTP Input
* Loading
* Success
* Resend States
* Error States
* Accessibility States

---

### S05-6 Country Waitlist

Объединить:

| Старые |
| ------ |
| M81    |
| M82    |
| M83    |

в:

| Новый                             |
| --------------------------------- |
| M81 — Country Waitlist Flow Sheet |

Состояния:

* Not Supported
* Waitlist Form
* Waitlist Joined

---

### S05-7 Phone Conflict

Объединить:

| Старые |
| ------ |
| M84    |
| M85    |
| M86    |

в:

| Новый                           |
| ------------------------------- |
| M84 — Phone Conflict Flow Sheet |

Состояния:

* Conflict
* Login Existing Account
* Use Another Number

---

### S05-8 OAuth Placeholder

Объединить:

| Старые  |
| ------- |
| M87–M93 |

в:

| Новый                                 |
| ------------------------------------- |
| M87 — OAuth Authorization State Sheet |

Состояния:

* Resolving
* Need Login
* Consent
* Issuing Code
* Invalid Client
* Invalid Redirect URI
* Backend Not Ready

---

# Итоговая нумерация

### Реальные отдельные экраны

```text
M21
M22
M23
M56
M57
M58
M59
M60
```

### State Sheets

```text
M25
M28
M32
M37
M45
M50
M53
M61
M66
M72
M77
M81
M84
M87
```

Итого вместо 73 отдельных мокапов получается примерно **22–25 файлов**, сохраняя все user stories и UX-покрытие из исходного документа. 
