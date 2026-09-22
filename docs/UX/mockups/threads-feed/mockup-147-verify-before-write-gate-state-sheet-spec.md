# M147 — THR-V Verify-before-write gate

Status: Proposed — active semantic SSOT for this artboard  
Surface: write actions inside `IssueThreadBlock` on `/board` and `/issue/:id`  
Existing handoff destination: `/verify`  
Parent compositions: M143 / THR-P revision 1.1; M144 / THR-T; M145 / THR-R; M146 / THR-E  
Scope: visual/product specification only; no implementation contract  
Priority: MUST

## 1. Purpose

Define the verify-before-write experience for Issue discussions. An unverified resident may read the Issue and thread, but a write attempt is intercepted by a compact gate that routes to the existing `/verify` surface and returns the resident to the originating feed/post context after a successful opaque verification result.

M147 does not redesign the full Verify product, expose verification methods, or introduce another route.

## 2. Core identity contract

- The write gate consumes one opaque verification outcome: `identity_verified`.
- Resident-facing language uses `Verified` / `Verify to continue`.
- Do not make `phone_verified`, `eid_verified`, or another method-specific flag the user story.
- The check result never reveals whether verification used phone, eID, or another integration method.
- The Issue, thread, and existing public read interactions remain visible to an unverified resident.
- The gate appears only when the resident attempts an action that requires verified write access.
- The gate routes to the existing `/verify`; no inline verification form is embedded in the thread.
- After successful verification, the resident returns to the originating Issue/post and may continue the interrupted write flow.

## 3. Gated actions

The gate may apply to thread write actions such as:

- posting a root comment;
- posting a reply;
- submitting or changing a reaction when treated as a write;
- other explicitly governed thread mutations.

The artboard focuses on `Post comment` as the representative write attempt. It does not expand the gate into a general permissions matrix.

## 4. State matrix

| ID | State | Required visual result |
|---|---|---|
| THR-V-A | Unverified write attempt | Write is blocked with clear reason and CTA to verification |
| THR-V-B | Handoff to `/verify` | Existing Verify surface is entered with explicit return-to-post expectation |
| THR-V-C | Return after verification | Resident returns to the same thread; success chrome says only `Verified` |
| THR-V-D | Optional supporting identity copy | Pack type and integration/product name appear only near the CTA, never in the result |

## 5. Continuity and placement

- Preserve the M143 continuous post shell and M144 in-context composer.
- Do not replace the Issue card with an authentication page.
- Gate feedback appears inside or immediately above the active composer.
- The full `/verify` page is not redesigned; the artboard shows only the relevant handoff header/context crop.
- Return state restores the same Issue and thread position rather than landing on a generic dashboard.
- The originating target must remain understandable: root comment, selected parent reply, or reaction target.

## 6. State specifications

### THR-V-A — Unverified resident attempts write

Show a resident activating `Post comment` in the existing composer. The write is not submitted. Display a compact gate card or popover with:

**Title**  
`Verify to participate`

**Body**  
`Verification is required before you can write in this discussion.`

**Primary CTA**  
`Go to verification`

**Secondary action**  
`Not now`

Requirements:

- composer draft remains visible and is not presented as posted;
- the gate explains the write boundary without implying punishment or account failure;
- public Issue and thread content remain readable;
- no phone number field, eID button, QR code, method logo, or inline verification steps;
- no new account creation flow;
- primary CTA is the only strong yellow action in the gate.

### THR-V-B — Handoff to existing `/verify`

Show a cropped transition into the existing Verify surface, not a redesigned full page.

Required visible context:

- route label `/verify`;
- existing Verify shell/header treatment;
- title `Verify your identity` or existing equivalent;
- return-context notice: `After verification, you’ll return to Issue DE-042 and continue your comment.`;
- optional back/cancel action returning to the unchanged draft.

Do not design method cards or show phone/eID choices in this artboard. The crop represents ownership transfer to the existing Verify product.

No new routes such as `/thread/verify`, `/verify/comment`, or `/identity/check` may appear.

### THR-V-C — Return after opaque success

Show the same Issue/thread context after successful verification:

- composer and draft restored;
- originating comment/reply context retained;
- compact success/confirmation chrome: `Verified`;
- supporting copy: `You can continue your comment.`;
- resident can resume or activate `Post comment`.

The result must not say:

- `Phone verified`;
- `eID verified`;
- `Verified by [method]`;
- masked phone number;
- identity provider or integration used;
- verification score or assurance details.

The temporary result is method-opaque and visually restrained. It must not become a public profile badge unless specified elsewhere.

### THR-V-D — Optional pack and integration name near CTA

Show an alternate version of the THR-V-A gate where supporting copy may include configured product context:

- eyebrow/supporting line `Civic node · DOGEstonia Identity`;
- title and CTA remain `Verify to participate` / `Go to verification`;
- the product/integration name is informational, not a method disclosure;
- do not add phone, eID, Smart-ID, Mobile-ID, document, biometric, or provider-specific result language.

This supporting identity line is optional and appears only before the handoff. THR-V-C remains simply `Verified` even when the integration name was shown in THR-V-D.

## 7. Return-context behavior

- Store enough opaque navigation context to return to the originating feed/post and thread location; do not expose that implementation detail in UI.
- Restore the resident to Issue DE-042 in the artboard example.
- Preserve recoverable draft text and reply target where supported by the write-flow contract.
- Do not auto-submit the draft immediately after verification without a deliberate resident action.
- Avoid duplicate comments or reactions if the resident retries.
- If the resident cancels verification, return to the unchanged readable thread with the draft recoverable where possible.

## 8. Failure and interruption boundary

M147 defines the successful gate handoff and return, not the full Verify error model. If verification is cancelled or unavailable:

- do not mark the resident Verified;
- do not submit the pending write;
- return or remain on the existing Verify surface according to its own contract;
- preserve honest return navigation where possible;
- do not invent method-specific failure copy inside the thread.

## 9. Visual system

- Continue the M143–M146 dark civic-tech system.
- Canvas: approximately `#141417`.
- Post/thread surface: approximately `#1B1C1F`.
- Primary text: `#F2F2F2`; muted text: `#9A9DA6`.
- Signal yellow `#F5C542` is used for the primary `Go to verification` CTA and active focus only.
- Gate and result use thin cool-grey borders and compact information hierarchy.
- `Verified` may use a restrained positive check treatment without exposing method or creating promotional celebration.
- Preserve familiar social-feed rhythm; verification is an interruption layer, not a marketing hero or full-screen redesign.

## 10. Responsive behavior

- Desktop: gate may be an anchored card above the composer or compact inline block.
- Mobile: gate becomes a readable bottom popover or inline card without covering the Issue identity.
- Handoff crop clearly shows `/verify` and the return notice on both widths.
- Return toast/chrome remains within the thread context and does not obscure the composer action.
- No horizontal scrolling or inline method form.

## 11. Accessibility and localization

- Gate title and reason are announced when the blocked write is attempted.
- Focus moves to `Go to verification` without trapping the user.
- `Not now` returns focus to the originating composer control.
- After return, success is announced as `Verified`; focus returns to the draft or intended post action.
- Method is not encoded through an icon, logo, or inaccessible tooltip.
- All route/handoff and return-context copy allows approximately 30–40% localization expansion.
- Estonian, English, and Russian versions must preserve method-opaque semantics.

## 12. Data and privacy boundaries

The artboard may annotate the opaque contract `identity_verified`, but it must not show or invent:

- verification method;
- phone number, personal code, document data, biometric data, or provider response;
- assurance score, risk result, or internal identity attributes;
- method-specific boolean such as `phone_verified` as the product contract;
- new route, endpoint, callback URL, query string, token, JSON, or payload;
- inline verification form inside the thread.

## 13. Artboard composition

Produce one consolidated landscape state sheet titled:

`DOGEstonia — Verify-before-write Gate — M147 / THR-V`

Recommended arrangement:

- four clearly labelled panels in a 2×2 grid;
- THR-V-A: composer with blocked write and CTA gate;
- THR-V-B: cropped existing `/verify` handoff with return-context notice;
- THR-V-C: returned thread with opaque `Verified` confirmation and restored draft;
- THR-V-D: optional CTA-supporting copy using `Civic node · DOGEstonia Identity`;
- narrow annotation rail: opaque contract, existing route, return behavior, and privacy locks.

Use the same Issue DE-042/thread context across the flow so continuity is visually obvious.

## 14. Required annotations

- `Opaque gate contract: identity_verified`
- `Resident-facing result: Verified`
- `Existing route only: /verify`
- `No inline verification form in thread`
- `Return to originating Issue/post and write context`
- `Draft is not auto-submitted after return`
- `Success result never reveals method`
- `Integration/product name may appear near CTA only`
- `No new verify routes, endpoints, or JSON`

## 15. Anti-patterns

- Inline phone/eID form inside `IssueThreadBlock`.
- Method chooser recreated in the thread mockup.
- `phone_verified` used as the only identity story.
- Success copy exposing phone, eID, provider, integration, number, or method.
- Redirect to a new invented verification route.
- Returning to a generic home/dashboard instead of the originating post.
- Clearing the draft or reply target during handoff.
- Automatically submitting the pending comment after return.
- Public method-specific verification badge.
- New account signup, identity admin, KYC dashboard, or provider API UI.

## 16. Acceptance checklist

- [ ] THR-V-A…D appear on one consolidated sheet.
- [ ] Unverified write is clearly blocked before submission.
- [ ] CTA routes only to existing `/verify`.
- [ ] No inline method form is shown inside the thread.
- [ ] Handoff communicates return to Issue DE-042/comment context.
- [ ] Return state restores the draft and does not auto-submit it.
- [ ] Success chrome says only `Verified` and does not reveal method.
- [ ] Optional `DOGEstonia Identity` name appears only near the CTA.
- [ ] Public Issue/thread reading remains intact.
- [ ] No new route, endpoint, token, JSON, or method-specific field appears.

## 17. Design goal

The resident should experience verification as a brief, understandable interruption to a specific write action—not as a second identity product embedded in the thread. The developer should see one opaque gate, one existing route, and one reliable return path with method-private success chrome.
