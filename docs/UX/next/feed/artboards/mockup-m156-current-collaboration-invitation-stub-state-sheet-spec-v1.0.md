# DOGEstonia — M156 Collaboration Invitation Stub (THR-E v2) State-Sheet Specification v1.0

**Package:** M156, eleventh production package in the approved queue despite its numeric ID  
**Status:** **accepted** for handoff (revision 1 · stub honesty); written implementation contract remains authoritative · residual → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Date:** 2026-10-08  
**Target:** current light `BoardIssuePost` / `IssueThreadBlock` in feed, Issue modal/detail and narrow mobile  
**Queue note:** M159 rev3 remains awaiting product acceptance. Preparing M156 now follows the user's request without treating M159 as accepted.  
**Artboard:** `generated_images/exec-ffca21c6-5e3d-4c88-adc2-87188b466d3e.png`, revision 1.

**Visual audit, 2026-10-08:** A/B/C/D keep the current four-action post strip; Invite organization sits below the Discussion composer as a secondary control. B and D explicitly say no invitation was sent and offer Got it; C provides persistent Coming soon copy. The green checkmarks in the external bottom annotation strip are sheet checklist marks, not success UI after activation. The informational panels themselves use neutral info treatment. No recipient, ticket, sending or persistence state is depicted. Product acceptance pending.

## 1. Purpose and authority

Re-skin historical M146's non-dead collaboration invitation stub in the current DOGEstonia Issue-as-post design. Show idle, activated feedback, soon/unavailable and mobile placement. The present control is an honest preview of possible future organization participation: **no invitation is sent or stored**. The sheet does not invent a recipient picker, ticketing, municipality assignment, queue, case status, SLA, callback or new API.

Approved backlog M156, historical M146 as semantic scaffold, Unified State Inventory §18, Component & Variants Specification §35, Interaction & Behavior Specification §29, Mobile Responsive Design Pack §12 and accepted M152/M153/M158 visual language govern the design. M146's suggested slot inside the action row is **superseded** by the current fixed `React | Comment | Share | Reactions` strip. The user's confirmed Share decision remains binding. Written semantics override generated pixels.

## 2. Ownership and placement

```text
BoardIssuePost / Issue detail parent
├─ IssueCardChrome → fixed four-action strip
└─ IssueThreadBlock
   ├─ Discussion/reaction/comment/composer
   └─ EscalationStub → secondary Invite organization slot
```

The stub sits **inside the existing Discussion region** after its primary summary/composer entry or at the lower edge of the thread block. It is not a fifth or replacement post action. It remains subordinate to civic title/status, `Open issue`, Discussion, `Write a comment` and four-action row. Feed can show a compact line; modal/detail can give it modest space. The same state model and copy apply on all mounts; narrow layout stacks the text naturally. Do not create a separate social card, organization dashboard or parallel workflow surface.

Preferred visible label: `Invite organization` with a neutral cooperation icon. Accessible description: `Invite an organization to join the discussion` where appropriate. Do not promise an actual invitation until the handoff is connected. Internal component name `EscalationStub` and THR-E are never resident-facing escalation terminology.

## 3. State matrix and example fixture

| ID | Condition | Resident sees | Panel |
|---|---|---|---|
| `THR-E-A` | Stub visible, idle | Neutral secondary `Invite organization` within Discussion | A |
| `THR-E-B` | User activates available stub | Anchored info feedback stating no invitation was sent | B |
| `THR-E-C` | Soon/unavailable presentation | Disabled/quiet action plus persistent explanatory text | C |
| `ESCALATION-FOCUS` | Keyboard focus | Visible focus ring and reachable feedback/dismissal | B inset |
| `THR-E-NARROW` | 390 px mobile | Same secondary placement; bottom feedback stays in viewport | D |

All panels reuse illustrative Issue `UV-024`, title `A trusted neighbour network for pet care`, current `OPEN` civic status and a compact literal comment preview `I can help coordinate a shared pet-care group for neighbours.` The post action row is exactly `React`, `Comment`, `Share`, `Reactions` in every full context. Sample Issue/comment text is layout fixture, not fabricated production resident data; no author/name/time. The stub never changes Issue or thread status.

## 4. A — idle

Show current light Issue post and directly attached `Discussion`, with a real text preview, `View discussion` and `Write a comment` entry. Beneath those, put a small neutral outline/text action `Invite organization`. A small cooperation/people icon may aid scanning, but should not resemble a government seal, org chart or ticket. Its visual weight is below Comment and civic Open issue. The action has a ≥44 px touch target without becoming a yellow main CTA. No `Invite organization` inside the fixed post strip.

## 5. B — activated feedback

On activation, show a lightweight anchored info popover, toast with persistent accessible explanation, or small dialog, associated with the originating stub. Preferred exact copy:

- Title: `Collaboration handoff isn’t connected yet`
- Body: `No invitation was sent. This capability will be connected in a future release.`
- Action: `Got it`

No green success check, `Sending…`, saved-request number, pending status or implied network mutation. The Issue and comments remain readable. Repeated activation reuses a single feedback layer, not stacked duplicates. `Got it`, close or Escape dismisses; focus returns to `Invite organization`. If the UI uses a transient toast, the same substantive message must stay accessible long enough and be retrievable from the control; the preferred artboard is a dismissible anchored info panel.

## 6. C — soon/unavailable

Same placement, label and hierarchy. Show `Invite organization` with `Soon` badge or unavailable treatment plus persistent helper `Collaboration invitations are coming soon.` The helper is visible without hover and understandable without color. There is no click action on a truly disabled control, but its explanation is reachable by keyboard/screen reader through adjacent text. This is a product capability state, not a verification, account-role, payment or permission error. It does not falsely suggest the resident can unlock the feature today.

## 7. D — 390 px mobile

The current Issue post/sheet remains one column with four labelled post actions. In Discussion, `Invite organization` wraps below the primary composer entry. If horizontal space is tight, visible label may shorten to `Invite` only when approved localization retains the accessible full name; default is the full label on its own row. Activated info becomes a viewport-safe small sheet/panel above bottom safe area, with `Got it` easy to reach. It does not cover Issue identity or strand controls under navigation. The same lack of persistence/sending is explicit. On 320 px, stack controls and wrap copy; no icon-only stub.

## 8. Interaction, data and accessibility

No endpoint or persisted entity is reviewed for the collaboration handoff. Current `EscalationStub` is a UI capability hint with local feedback only. There is no organization directory, recipient, eligibility, invitation record, delivery status or follow-up promise. `DUI-Q18` decides eventual outcome/data boundary. The active stub needs no fabricated write or verification gate; if it later becomes a real write, product/API must define permission and verification separately.

Keyboard Tab reaches available stub; Enter/Space opens feedback; Escape/Got it closes and restores focus. Info state announced once without repeated focus theft; disabled helper remains perceivable. ET/RU/EN expansion 30–40% must wrap; buttons ≥44 px on touch. Icon/color cannot be sole status signal. The stub's local info feedback does not replace or block separate thread error, reaction or composer behavior. Thread unavailable can omit the stub if its placement would imply a live action despite unavailable discussion; the current sheet shows a successful thread.

## 9. Light/dark and visual continuity

Light canvas `#F7F6F2`, warm Issue surface `#FFFDF8`, navy `#101828`, muted `#667085`, hairline `#E7E4DC`. Yellow `#F5C542` belongs to selected/current primary actions and focus; the idle stub is neutral. Activated info uses restrained cool/warm neutral tint, not green success or red failure. Dark theme follows semantic geometry; M160 compares it explicitly. Do not revive M146's dark default or replace Share with Invite.

## 10. Artboard directions

Title `M156 · COLLABORATION INVITATION STUB · THR-E v2 · rev 1`. One consolidated sharp light state sheet with three readable A/B/C desktop Discussion crops and D 390 px mobile. At least A and B show enough current Issue post to prove the fixed four actions above Discussion; C can crop the same thread region. B receives room for full feedback copy. State IDs sit outside functional UI; small annotations: `Secondary inside IssueThreadBlock`, `No invitation sent or stored`, `Not a fifth post action`, `No ticket or organization workflow`. No logo regeneration, fake data field, directory, admin UI, case id or email composer.

## 11. Forbidden representations

- Replacing `Share` or adding a fifth equal zone in the current post action strip.
- Primary yellow `Invite organization` competing with `Open issue` or `Write a comment`.
- Sending animation, green success, `Invitation sent`, `Request saved`, recipient/name, promised response or persistence claim.
- Organization picker, municipality department, admin queue, ticket, priority, deadline, SLA, moderation report or workflow status.
- Dead active button with no feedback; disabled button with hover-only explanation.
- Verify/payment/role unlock copy, inline new permission flow, endpoint/JSON/request id.
- Detached social card or a modal obscuring the civic Issue for a stub action.

## 12. Acceptance checklist

- [ ] A/B/C show idle, activated and soon states with identical lower-thread placement and current post strip intact.
- [ ] B says explicitly `No invitation was sent` and has Got it/close; focus returns to trigger.
- [ ] C gives persistent honest explanation without implying a permission or payment problem.
- [ ] D retains full/accessible action label and safe feedback at 390 px.
- [ ] Civic Issue/comment text remains readable; no false mutation, ticket, recipient or stored request.
- [ ] Artboard pixels audited against this written contract; semantic errors corrected before acceptance.

## 13. Open decision

| ID | Decision | M156 handling |
|---|---|---|
| `DUI-Q18` | What future collaboration handoff creates, who can receive it and what privacy/permission boundary applies | Present a local honest stub only; no request is sent or stored. |
| Placement eligibility | Whether every public Issue shows the stub or only configured types | This sheet shows an enabled fixture; unavailable variant is explicit. |
| Mobile short label | Approved ET/RU/EN shortened visible action at 320 px | Prefer full label in its own row; never icon-only. |
