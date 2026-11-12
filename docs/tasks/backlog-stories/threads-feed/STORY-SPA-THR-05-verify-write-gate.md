# STORY-SPA-THR-05 — Verify-before-write gate

## Meta

- **Key:** `STORY-SPA-THR-05-verify-write-gate`
- **orientation:** ui_first
- **ui_scope:** mixed
- **Status:** Done
- **Blocked-on:** — (P3 `pkg-000081` · STOP before P4)
- **Depends on:** [M147](../../../UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.md); identity [TECH-ARCH `identity_verified`](../../../../../doge-identity-service/docs/architecture/TECH-ARCH-threads-verification-boolean.md); [icon catalog](STORY-SPA-THR-icon-assets.md); host composer [M144](../../../UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md)
- **Package:** [threads-feed/](INDEX.md)
- **Architecture:** [04-verify-and-fail-soft](../../../architecture/threads-feed-ux/04-verify-and-fail-soft.md)
- **Parent REQ:** §2, §4.3, AC-SPA-THR-05; interview Q3

## Артборд (SSOT дизайна)

| Мокап | Состояние / фокус | Спека | PNG |
|-------|-------------------|-------|-----|
| **M147** THR-V | Unverified gate · `/verify` handoff · opaque Verified return · optional pack/integration near CTA | [mockup-147-…-spec.md](../../../UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.md) | [mockup-147-…-spec.png](../../../UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.png) |

## Зачем простыми словами

Перед comment/react/attach — проверка `identity_verified`; иначе уход на существующий `/verify` и возврат; в результате проверки метод не светится.

## Verified related (code)

- Route `/verify`: [`App.jsx`](../../../../src/App.jsx) · `VerifyPage`
- Me client: `identityService.js` `GET /me` (mock includes `identity_verified`)
- Wire boolean (sibling Done): **`identity_verified`** — not `phone_verified` as sole gate
- **SPA threads write gate (As-of-Done · THR-05 / `pkg-000081`):** `isIdentityVerifiedForWrite` + `VerifyWriteGate` + `CommentComposer` intercept — **on disk**. VerifyPage/cabinet may still show phone chrome (as-is coexistence); threads write gate does **not** use phone alone.

## Функциональные требования (FR)

### Gate contract (M147 §2–3 · AC-SPA-THR-05)

- **FR-THR-05.1** Write actions gated on opaque **`identity_verified`** (comment post, react, attach-ref as listed in M147 gated actions) (M147 §2–3; arch Q3).
- **FR-THR-05.2** Do **not** treat `phone_verified` alone as the threads write gate (identity TECH-ARCH; M147 core identity contract).

### States THR-V-A…D (M147 §4, §6)

- **FR-THR-05.3** **THR-V-A:** Unverified write blocked with clear reason + CTA to verify (e.g. verify-to-join copy per M147) (M147 §THR-V-A).
- **FR-THR-05.4** **THR-V-B:** Handoff navigates to **existing `/verify`** with explicit return-to-post/detail expectation — **not** an inline duplicate verify form inside the thread (M147 §THR-V-B; AC-SPA-THR-05).
- **FR-THR-05.5** **THR-V-C:** After success, return to same thread; success chrome says only **`Verified`** (or L10N opaque equiv.) — **never** phone/eID/method in the result (M147 §THR-V-C; AC-SPA-THR-05).
- **FR-THR-05.6** **THR-V-D (optional):** pack type + integration/product name may appear **only near the CTA** before handoff; THR-V-C result remains simply Verified. **Consumer lock ([ADMIN-THR-04](ADMIN-THR-04-api-requirements.md)):** pack JSON keys are **Unknown / Open** — do **not** invent key strings. Until Closed: either **omit** pack-specific CTA line, or use only the M147 optional civic line (`Civic node · DOGEstonia Identity` / L10N `threadsFeed.verify.civicNodeLine`) without binding unnamed pack fields.

### Return & draft (M147 §7–8)

- **FR-THR-05.7** Return restores originating feed or detail thread context; preserve recoverable draft where M147 requires (M147 §7–8).
- **FR-THR-05.8** Interruption/failure on verify path must not claim false verified state in thread chrome (M147 §8).

### Boundaries

- **FR-THR-05.9** Do not redesign full Verify page body in this story — crop CTA + return chrome per M147 artboard composition (M147 §13).
- **FR-THR-05.10** No invent verify HTTP path (AC-SPA-THR-01).

## Вне scope

- Inline eID/phone forms in thread  
- **AC-SPA-THR-03** / REQ8: cabinet metrics  
- **AC-SPA-THR-07:** rate-limit / near-dup UX  
- Invent identity endpoints / invent pack JSON keys  

## §Иконки

> SSOT: [STORY-SPA-THR-icon-assets.md](STORY-SPA-THR-icon-assets.md). Wiring: **Runtime** в `<img src>` / CSS; **Disk** = путь от `spa-app/`. Все PNG **ON DISK**. Method **not** encoded by icon (M147) — do not invent method-specific glyphs.

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| Verify CTA (optional leading) | `/icons/story-handoff/ic-verify-shield.png` | `public/icons/story-handoff/ic-verify-shield.png` | Reuse · optional |
| Opaque success (Verified) | `/icons/story-handoff/ic-success-check.png` | `public/icons/story-handoff/ic-success-check.png` | Reuse · method-opaque |

## §L10N

> EN — канон M147. Namespace `threadsFeed.verify.*`. Result method-opaque. Dictionary merge → ADMIN-06 / P1.3.

| key | en | et | ru |
|-----|----|----|----|
| `threadsFeed.verify.cta` | Verify to participate | Kinnita osalemiseks | Подтвердите участие |
| `threadsFeed.verify.body` | Verification is required before you can write in this discussion. | Enne arutelusse kirjutamist on vaja kinnitust. | Перед тем как писать в обсуждении, нужна верификация. |
| `threadsFeed.verify.goToVerification` | Go to verification | Mine kinnitama | Перейти к проверке |
| `threadsFeed.verify.notNow` | Not now | Mitte praegu | Не сейчас |
| `threadsFeed.verify.resultOpaque` | Verified | Kinnitatud | Подтверждено |
| `threadsFeed.verify.continueHelper` | You can continue your comment. | Saad oma kommentaari jätkata. | Можете продолжить комментарий. |
| `threadsFeed.verify.civicNodeLine` | Civic node · DOGEstonia Identity | Kodanikussõlm · DOGEstonia Identity | Гражданский узел · DOGEstonia Identity |

## Субтаски

> Projected pipeline IDs — folders **not** created (ADMIN-THR-06). Arch: [04-verify](../../../architecture/threads-feed-ux/04-verify-and-fail-soft.md). Gate on `identity_verified`; method-opaque result.

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-thr-05-t01-write-gate-identity-verified` | Block write when `identity_verified` false/unavailable |
| **T02** | `task-spa-thr-05-t02-verify-returnto-handoff` | Navigate existing `/verify` + returnTo to thread context |
| **T03** | `task-spa-thr-05-t03-opaque-verified-chrome` | Success chrome says only Verified (no method) |
| **T04** | `task-spa-thr-05-t04-l10n-verify-keys` | `threadsFeed.verify.*` dictionary keys |
| **T05** | `task-spa-thr-05-t05-vitest-gate-opaque` | Vitest gate + opaque result + draft not auto-submit |
| **T06** | `task-spa-thr-05-t06-story-gate-thr-05` | Story gate THR-05 |

## Acceptance Criteria

- [x] THR-V-A…D match M147
- [x] Gate uses `identity_verified`; handoff to existing `/verify`; result method-opaque (AC-SPA-THR-05)
- [x] Optional pack/integration copy only near CTA, never in result
- [x] Links: M147 · identity TECH-ARCH · REQ-17 · arch 04
- [x] Gap F1–F3 CLOSED (`spa_thr_05_audit_2026_09_22`)
