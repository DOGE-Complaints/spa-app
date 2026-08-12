# UI mockup spec — PhoneVerificationFlow (M32 anchor)

- **Story:** STORY-SPA-ID-04-phone-verification-flow
- **Task:** SPA-ID-04-T02 (ui_anchor)
- **Mockup SSOT:** [mockup-32-phone-verification-flow-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.md)
- **PNG:** [mockup-32-phone-verification-flow-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-32-phone-verification-flow-sheet-spec.png)
- **Scaffolded:** 2026-06-28T16:53:10Z

## Layout hierarchy (M32 §2–§3)

1. Flow header (title + optional close/dismiss)
2. Active panel region (one of A–E)
3. Footer action row (primary + secondary CTAs)

## Flow phases (runtime: one panel at a time)

| Phase | Artboard ref | Panel task |
|-------|----------------|------------|
| A Disclosure | M32 State A | T03 |
| B Phone Input | M32 State B | T03 |
| C OTP Entry | M32 State C | T04 |
| D Processing | M32 State D | T04 |
| E Success | M32 State E | T04 |

## Copy overrides (backlog wins over M32 artboard)

- Disclosure primary CTA: **`Send code`** (not M32 `Continue`)
- Disclosure secondary CTA: **`Not now`** (not M32 `Cancel`)
- Disclosure body: verbatim from [DOC-IDS-ONB-02](../../../../../../../doge-identity-service/docs/tasks/backlog-stories/identity-onboarding/DOC-IDS-ONB-02-disclosure-copy.md) (T03)

## Forbidden terms (FR-04.7)

Do not use: `KYC`, `government identity check`, `bank verification`, `legal identity`.

## P3 UI gate checklist

- [x] UI-0 baseline capture in `ui-baseline/` (component absent at intake)
- [x] UI-1 compare regions vs this spec + PNG
- [x] UI-2 implement panels T03–T04 in shell
- [x] UI-3 spot-check on `/verify` host (T05)
