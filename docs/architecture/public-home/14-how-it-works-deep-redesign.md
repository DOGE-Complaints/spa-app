# PH-14 — How It Works deep redesign (structure Present · visual BLOCKED)

> **UTC:** 2026-10-23T15:11:02Z (P8 local close · reaudit stamp)  
> **Package:** `pkg-000218` · EPIC-SPA-09  
> **Code home:** `HowItWorksPage` · `howItWorksDictionary` · `HowItWorksPage.css` · `telegramInterviewUrl`  
> **Normative:** Interview **H6** · [M171](../../UX/mockups/home/DOGEstonia-M171-how-it-works-approved-copy-spec-v1.0.md) · Path A  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual) · Story **BLOCKED**

## Surface

| Piece | Rule |
|-------|------|
| Steps | observation → Telegram private Story → public Issues → profile/discussion |
| Copy | RU verbatim M171 §3 · EN §4/§5 · ET = EN structural fill (no invent ET) |
| Telegram CTA | Step 02 · `VITE_TELEGRAM_INTERVIEW_URL` env helper · no invent t.me |
| Feed CTAs | Inline step 03 + final primary → `/next/feed` |
| Landing FAQ | Final secondary · leftward group with Feed · uus-veerenni…`#how-it-works` |
| GPT | Removed from HIW page (Header Submit elsewhere still uses `VITE_STORY_GPT_URL`) |
| Visuals | Soft public `m171-step-0{1–4}-*.png` · decorative |

## Touchpoints

- `pages/HowItWorksPage.jsx` · `.css` · `i18n/howItWorksDictionary.js` · `config/telegramInterviewUrl.js`
- Tests: `HowItWorksPage.test.jsx` · Path A `scripts/tmp-ph14-capture.mjs`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent ET · no invent Telegram/GPT URL · PH-15 static pages OOS.
