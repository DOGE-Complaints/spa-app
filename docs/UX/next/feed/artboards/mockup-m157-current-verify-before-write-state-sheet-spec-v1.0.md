# DOGEstonia — M157 Current Verify-Before-Write Gate (THR-V v2) State-Sheet Specification v1.0

**Package:** M157, eighth in approved M149–M160 sequence (after M155; M156 intentionally later)  
**Status:** **accepted** for handoff (revision 2); written implementation contract remains authoritative · residual → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Date:** 2026-10-08  
**Target:** current light Issue discussion and composer, existing `/verify` handoff, desktop and mobile  
**Predecessors:** M152 rev4, M153 rev2, M154 rev2 and M155 rev3 **accepted** (handoff 2026-10-08).  

**Artboard:** `generated_images/exec-db0b17b7-be46-4450-b123-fedfe0764b1a.png`, revision 2.

**Visual audit, 2026-10-08:** Revision 1 conflated the unknown-denial inset with the adjacent closed-Issue state by asserting that discussion no longer accepts comments. Revision 2 gives the unknown denial neutral copy, states that the reason is unconfirmed and keeps a Back to draft action. A/C/D/E/F repeat the same literal parent and draft; C says only Verified and leaves Post reply for deliberate activation. B is a crop of existing `/verify` without method controls. The footer warns that a bare 403 does not prove unverified status. Product acceptance pending.

## 1. Purpose and scope

Re-skin historical M147's verify-before-write interruption in the accepted current light Issue modal/thread context. Show how an unverified resident is stopped before a thread write, handed to existing `/verify`, and returned to the same Issue, parent comment and recoverable draft. Cover cancelled/failed return and an Issue that has changed while away. The Issue and public discussion remain readable throughout. This sheet does not redesign Verify itself or choose a phone/eID method; M158 later proves mount parity.

Approved backlog M157, Unified State Inventory §19, Component & Variants Specification §36, Interaction & Behavior Specification §§20–21 and 28, Data-to-UI Contract §21 and historical M147 provide behavior. Current light Issue modal reference and M152/M153 fix visual hierarchy. Written semantics override illustrative pixels.

## 2. Identity and permission boundary

- The UI consumes an opaque verified outcome. Resident-facing copy says `Verify to continue` and, on success, only `Verified`.
- Protected write intents include start/submit comment, Reply, commit reaction and opening an attachment picker where configured. M157 illustrates a reply draft. Public read and opening reaction/people surfaces are unaffected.
- A known unverified state can present `VerifyWriteGate` before active write. A bare Threads `403 FORBIDDEN` is **not** a reliable proof of unverified identity: it can also reflect missing verification data or Identity outage. Do not redirect every 403 to `/verify`; show a scoped write-blocked error until `DUI-Q07` supplies a stable discriminator. `401` means authentication required, not verified false.
- The existing `/verify` route owns method selection and method-specific errors. Never expose phone number, eID/Smart-ID/Mobile-ID, document, provider, score or method in the thread/result chrome.
- Verification success restores intent for user review; it **never auto-posts** a comment or auto-commits a reaction. No new verification route or inline form is created.

## 3. Fixed fixture and ownership

Use Issue `UV-024` with current civic title `A trusted neighbour network for pet care`, current four-action strip `React | Comment | Share | Reactions` and an expanded Discussion. The target comment literal body is `A simple sign-up list would make it easier to start.` The reply draft is exactly `I can help draft the sign-up list this week.` Reuse this same draft and parent context in every return panel. No invented author identity/time/avatar. The fixture is illustrative, not a production resident.

`VerifyWriteGate` owns blocked/redirecting/return feedback; `ThreadComposer` owns the recoverable draft and selected reply target; the app navigation layer owns return route, board query/filter/list-map mode, scroll anchor and overlay origin; existing Verify owns its method flow. This state sheet depicts the handoff, not a new verification product. Persist draft/context across navigation according to the app's session behavior without revealing it in URL/query/analytics.

## 4. State matrix and artboard mapping

| State ID | Activation | Required visible result | Panel |
|---|---|---|---|
| `THR-V-A` | Known unverified resident attempts reply/write | In-context gate; draft intact, write not sent | A |
| `THR-V-B` | User chooses verification | Existing `/verify` shell/crop with return notice | B |
| `VERIFY-AWAY` | Existing Verify owns method flow | Origin retained; no duplicate thread form | B annotation |
| `THR-V-C` | Opaque success returns | Same Issue/target/draft; `Verified`; manual Post reply | C |
| `THR-V-D` | Optional support near gate CTA | `Civic node · DOGEstonia Identity` near pre-handoff CTA only | A inset |
| `VERIFY-CANCELLED` | User returns without success | Draft/target restored; still blocked, CTA available | D |
| `VERIFY-FAILED` | Verify returns unsuccessful | No Verified badge; draft intact, existing Verify owns detail | D inset |
| `VERIFY-RETURN-STALE` | Issue changed/closed while away | Current Issue status, draft retained, submit safely unavailable | E |
| `WRITE-DENIED-UNKNOWN` | Bare 403 or Identity failure | Honest scoped permission error, no guessed verify redirect | E inset |
| `MOBILE-GATE` | Known unverified mobile writer | Readable gate sheet with composer context and safe area | F |

Use three or four large panels A/B/C/F, with D/E and optional support as linked legible insets. Do not reduce all states to microscopic duplicate pages.

## 5. A — blocked write in current Issue discussion

Show the civic Issue and thread still readable under a compact gate anchored above or within the active reply composer. Actual parent excerpt and exact draft remain visible. The attempted `Post reply` did not submit or produce a pending comment. Gate title `Verify to participate`; body `Verification is required before you can write in this discussion.` Primary yellow `Go to verification`, neutral `Not now`. Explain a capability boundary, not punishment, lockout or account failure. The `React`, `Share`, Issue open and read-only discussion remain usable.

Optional THR-V-D inset adds only pre-handoff informational line `Civic node · DOGEstonia Identity` near the CTA. This name never appears as a method or a result detail. No method chooser, QR, phone/eID button, password, signup or in-thread verification inputs.

## 6. B — handoff to existing `/verify`

Illustrate a cropped existing Verify surface with explicit route label `/verify`, heading `Verify your identity`, and return notice `After verification, you’ll return to Issue UV-024 and continue your reply.` Include Back/cancel affordance. Do not draw any Verify method controls or claim to design its internal flow. External annotation: `Origin: Issue UV-024 · reply target · draft · board query/scroll retained`. This context is navigation/session state, not user-visible URL data.

A cancel in Verify returns to the originating thread with unchanged draft and still-unverified write state; the user may read or try the CTA later. If Verify itself fails, method-specific explanation stays in Verify; the origin only reports that writing remains blocked. No automatic retry of a pending write.

## 7. C — verified return and manual continuation

Return to the same Issue UV-024, selected parent text and **exact draft**. Show small neutral-positive `Verified` confirmation plus `You can continue your reply.` and an enabled `Post reply` button. No “Phone verified”, provider, integration name or public method badge. Focus returns to composer/draft (or intended Post reply control) predictably; no comment is inserted until the resident deliberately submits. The result is opaque and temporary, not a new profile achievement.

For a reaction intent, reopen/restored picker selection without committing automatically. For an attachment intent, restore draft and ask the user to resume picker explicitly; do not upload automatically. Do not accidentally duplicate a comment after a return or retry.

## 8. D — cancelled/failed return

D main: `Verification not completed` with CTA `Verify to continue`, the exact reply target and draft still visible, `Post reply` unavailable. Reading and unrelated civic actions continue. No `Verified` result. The failed inset reads `Verification could not be completed` without method details and offers `Try verification again` only through existing `/verify`. Existing Verify owns any specific reason. Preserve same origin and no auto-submit.

## 9. E — stale origin and unknown denial

On return, re-read the Issue and thread. If UV-024 changed status or no longer accepts replies, show current status (`Issue closed` as the illustrative fixture) and `This discussion changed while you were away. Your draft is still here.` Keep draft selectable/copyable and offer a safe navigation/return action; disable the invalid Post reply. Do not silently post to a different target, fabricate a new parent or discard text. If the parent is removed, show a neutral unavailable parent context and require user to choose a valid target before proceeding.

A separate small inset for a write rejection with no verification discriminator says `Writing is unavailable right now. Try again later.` or a mapped error. It does **not** claim the user is unverified or jump to `/verify` on any 403. This is a contract gap, not a new authentication workflow.

## 10. F — 390 px mobile gate

Use current full-screen Issue sheet with one body scroll and compact reply composer. Known-unverified write opens a readable bottom gate/inline block above safe area: title, reason, `Go to verification`, `Not now`. Keep Issue identity and parent context available, hide global bottom navigation while active, do not cover draft with keyboard/sheet. Existing `/verify` takes over on CTA; return reopens the same Issue sheet and focuses the draft. At 320 px labels wrap and controls stack without horizontal scroll.

## 11. Accessibility, localization and theme

Gate heading/reason announced at blocked attempt. Focus moves into gate to primary CTA; `Not now` returns to originating composer control. Handoff announces destination/return context. After success, `Verified` is announced politely, then focus returns to draft/submit control without auto-action. Failed/cancelled/stale messages remain persistent and text-labelled, not color-only. Escape closes topmost gate without discarding draft. Touch controls at least 44 px. ET/RU/EN copy may expand 30–40%; sheet and buttons wrap.

Light page `#F7F6F2`, warm Issue surface `#FFFDF8`, navy `#101828`, secondary `#667085`, border `#E7E4DC`, yellow CTA `#F5C542`. Success uses a restrained check and text. The historical dark M147 sheet is a semantic scaffold; M160 owns full dark parity. Same component and outcome semantics apply desktop/mobile.

## 12. Data/implementation boundary

| Source/state | Confirmed behavior | Design boundary |
|---|---|---|
| Identity `/me` write gate | Opaque verified boolean is enforced by Threads | No method exposed in thread. |
| Threads `401` | Authentication required | Do not call it failed verification. |
| Threads `403` | Write denied; reason not stable | No automatic `/verify` redirect solely from 403; `DUI-Q07`. |
| Verify result/return | Existing `/verify` product | Restore context and draft; no automatic mutation. |
| Reply draft | Local recoverable composer state | Preserve across handoff/cancel/error; no sensitive analytics or URL payload. |
| Issue/thread refresh | Current state may differ | Revalidate target and capability before enabling submit. |

## 13. Artboard instructions and forbidden imagery

Title `M157 · VERIFY BEFORE WRITE · THR-V v2 · rev 1`. One consolidated current light landscape state sheet with clear A–F labels and linked D/E insets. Reuse same Issue, target body and draft to make return continuity visually verifiable. Put state ownership and data-contract notes outside functional UI. Show B as an existing `/verify` shell crop, no form fields or method logos. No invented endpoints, token, callback URL, query string, verification score or phone/eID result. The gate is a scoped interruption inside the civic discussion, not a replacement dashboard. No giant marketing identity card, punishment styling or automatic submitted-comment success.

## 14. Acceptance checklist

- [ ] A blocks a known-unverified write while preserving literal parent body, exact draft and readable Issue.
- [ ] B shows only existing `/verify` shell and explicit return to UV-024/reply, with no method UI.
- [ ] C restores same parent/draft, says only `Verified`, and requires manual Post reply.
- [ ] Optional D support line appears near CTA only, never in result.
- [ ] Cancelled/failed return remains unverified and preserves draft/context.
- [ ] Stale Issue return shows current status, keeps draft and blocks invalid submit.
- [ ] Unknown 403/Identity failure is not misrepresented as verified=false.
- [ ] F mobile gate and return are safe around keyboard/safe area.
- [ ] No method-specific data, inline Verify form, new route or auto-commit appears.
- [ ] Image audited against this written spec; only semantic misrepresentation requires regeneration.

## 15. Open decision

| ID | Decision | M157 handling |
|---|---|---|
| `DUI-Q07` | Stable error reason distinguishing unverified user from Identity outage/malformed data, and approved return target | Preflight known-unverified gate is illustrated; ambiguous 403 has generic scoped error, no guessed redirect. |
| Draft persistence | Session/route ownership and expiry | Preserve recoverable draft across approved handoff; no cross-device guarantee. |
| Stale origin policy | Reply target removed or Issue closed while away | Keep draft; require safe new target/explicit review, no automatic post. |
