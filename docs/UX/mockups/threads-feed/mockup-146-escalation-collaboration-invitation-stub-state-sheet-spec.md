# M146 — THR-E Escalation / collaboration invitation stub

Status: Proposed — active semantic SSOT for this artboard  
Surface: `BoardIssuePost` / `IssueThreadBlock` on `/board` and `/issue/:id`  
Parent compositions: M143 / THR-P revision 1.1; M144 / THR-T; M145 / THR-R  
Scope: visual/product specification only; no implementation contract  
Priority: MUST

## 1. Purpose

Define a compact, honest placeholder for the future collaboration handoff from an Issue discussion. The control invites future cooperation; it does not create an administrative escalation, organization assignment, case, ticket, queue item, or SLA.

The stub must never behave like a dead button. If active, it provides immediate explanatory feedback. If unavailable, it explains that the capability is coming later.

## 2. Naming and resident-facing meaning

Preferred primary label:

`Invite organization`

The label communicates a soft invitation into cooperation. Avoid resident-facing labels such as:

- `Escalate case`;
- `Assign authority`;
- `Open ticket`;
- `Submit to municipality`;
- `Create request`;
- `Start SLA`.

`THR-E` and `Escalation stub` remain internal specification names only.

## 3. Core semantic locks

- The control is secondary to the Issue title, civic status, `Open issue`, discussion, and composer.
- It sits inside the existing `BoardIssuePost` / `IssueThreadBlock` chrome and does not create a parallel product surface.
- Activation does not silently do nothing.
- The current stub does not send an invitation, persist a request, select an organization, open a case, or promise follow-up.
- Feedback must explicitly state that the collaboration handoff is not connected yet.
- Do not claim `Request saved`, `Invitation sent`, `We will contact you`, or equivalent unless a future contract actually supports it.
- No organization directory, org chart, department selector, assignee, priority, SLA, queue, workflow status, admin dashboard, or API screen.
- No endpoint name, payload, request id, or invented backend field.

## 4. State matrix

| ID | State | Required visual result |
|---|---|---|
| THR-E-A | Idle | Compact secondary `Invite organization` affordance visible in post/thread chrome |
| THR-E-B | Activated | Lightweight toast/popover/modal explains that handoff is not connected; no false success |
| THR-E-C | Soon / disabled | Unavailable control has persistent honest helper copy |

## 5. Placement and hierarchy

- The stub appears in the social-like action row or immediately below the thread actions established by M143.
- Recommended sibling actions: `React`, `Discussion`, `Invite organization`.
- It must not replace `Open issue`, the composer, or an existing civic action.
- Idle visual treatment is neutral icon + text or restrained outline.
- Signal yellow is reserved for the principal active action on the post; the idle stub should normally remain neutral.
- Feedback floats above or next to the same post without obscuring the Issue title or detaching the user from context.

## 6. State specifications

### THR-E-A — Idle affordance

Show a cropped continuous DOGEstonia post/thread shell with:

- compact Issue context `Issue · DE-042`;
- existing action row;
- visible secondary control `Invite organization`;
- a neutral collaboration/people icon that is not a government seal, ticket, or org-chart symbol;
- optional concise tooltip or accessible description: `Invite an organization to join the discussion`.

The control must look available and intentional, but less prominent than `Open issue`, `Write a comment`, or another current primary action.

### THR-E-B — Activated feedback

After activation, show one lightweight anchored toast, popover, or small modal. Preferred copy:

**Title**  
`Collaboration handoff isn’t connected yet`

**Body**  
`No invitation was sent. This capability will be connected in a future release.`

**Action**  
`Got it`

Requirements:

- feedback appears immediately and is visually associated with the originating control;
- it is informational, not success-confirmation styling;
- `No invitation was sent` is explicit;
- dismissal is clear through `Got it`, close, or equivalent;
- closing returns focus to `Invite organization`;
- repeated activation produces the same predictable feedback rather than stacking duplicate toasts;
- no email, organization search, comment field, priority, due date, or form appears.

### THR-E-C — Soon / disabled variant

Show the same placement with unavailable styling:

- label remains `Invite organization`;
- `Soon` or `Coming soon` badge may be used;
- persistent helper copy: `Collaboration invitations are coming soon.`;
- disabled/unavailable state is conveyed by text and treatment, not low contrast alone;
- helper copy is visible without relying exclusively on hover.

This variant does not open feedback because its unavailability is already explicit. It must not resemble a permissions error or imply that verification, payment, role, or plan upgrade will unlock it.

## 7. Feedback behavior

- THR-E-B is a non-dead preview response, not a simulated transaction.
- No optimistic success checkmark.
- No temporary `Sending…` state that implies a network request.
- No notification preference or `Notify me` capture unless separately specified later.
- No persistence claim and no identifier generated.
- Feedback can use an info icon and restrained yellow focus accent.
- The feedback layer must not block reading the Issue or discussion.

## 8. Visual system

- Continue the M143–M145 dark civic-tech system.
- Canvas: approximately `#141417`.
- Post/thread surface: approximately `#1B1C1F`.
- Primary text: `#F2F2F2`; muted: `#9A9DA6`.
- Hairline dividers and neutral outlined controls use cool greys.
- Signal yellow `#F5C542` may mark focus, activation source, or the single acknowledgement action, but not turn the stub into the primary civic CTA.
- Feedback uses an informational treatment, not green success or red failure.
- Preserve the Facebook-like feed rhythm established by M143 without Facebook colors, assets, copy, or reaction language.

## 9. Responsive behavior

- Desktop: keep the control inside the evenly distributed action row or as a small secondary action below it.
- Mobile: shorten visible label to `Invite` only if the full accessible name remains `Invite organization`; prefer wrapping before ambiguous icon-only treatment.
- Toast/popover remains within the viewport and points back to the originating control.
- A small modal may be used on narrow screens if an anchored popover cannot remain readable.
- No horizontal scrolling or full-screen administrative flow.

## 10. Accessibility and localization

- Control has visible text; icon is not the only carrier.
- Idle, focused, activated, and unavailable states are distinguishable without color alone.
- Activated feedback receives an appropriate announcement without repeatedly stealing focus.
- `Got it` and close are keyboard accessible.
- Dismissal returns focus to the originating control.
- Disabled helper copy remains perceivable to keyboard and screen-reader users; do not depend only on a hover tooltip.
- Copy containers allow approximately 30–40% expansion for Estonian and Russian localization.

## 11. Data and system boundaries

The artboard must not show or invent:

- organization directory or organization records;
- recipient, department, administrator, assignee, or owner;
- ticket/case/request number;
- priority, deadline, SLA, queue position, or workflow stage;
- sent/pending/accepted/declined status;
- notification capture or promised follow-up;
- HTTP route, endpoint, JSON, internal id, or payload;
- permission, verification method, subscription, or payment unlock.

## 12. Artboard composition

Produce one small consolidated landscape state sheet titled:

`DOGEstonia — Collaboration Invitation Stub — M146 / THR-E`

Recommended arrangement:

- three large horizontal panels: THR-E-A Idle, THR-E-B Activated, THR-E-C Soon / disabled;
- each panel shows the same cropped `BoardIssuePost` action-row context;
- THR-E-B receives the most vertical room for its anchored informational feedback;
- a narrow annotation rail summarizes hierarchy and prohibited workflow implications.

Do not repeat the full Issue card or full comment tree. The focus is the compact stub behavior.

## 13. Required annotations

- `Soft invitation — not administrative escalation`
- `Secondary to Issue and discussion`
- `Active click always produces feedback`
- `No invitation is sent in stub state`
- `No request is stored`
- `No organization picker, ticket, queue, or SLA`
- `No endpoint names or JSON`

## 14. Anti-patterns

- Silent no-op on click.
- Green success toast claiming an invitation was sent.
- `Request received` or `We’ll contact you` without a supporting contract.
- Municipality/organization picker, org chart, department tree, or contact directory.
- Ticket form, case number, priority, deadline, status tracker, queue board, or SLA timer.
- Administrative dashboard or moderation workflow.
- Disabled control with no explanation.
- Disabled variant implying verification, payment, role, or plan unlock.
- Oversized yellow CTA that competes with the civic Issue.
- New API, endpoint, or payload annotations.

## 15. Acceptance checklist

- [ ] THR-E-A, THR-E-B, and THR-E-C appear on one small sheet.
- [ ] Idle affordance is visible but clearly secondary.
- [ ] Activated state gives immediate, non-success informational feedback.
- [ ] Activated copy explicitly states that no invitation was sent.
- [ ] Soon/disabled state has persistent honest helper copy.
- [ ] No state implies stored interest, follow-up, delivery, assignment, or SLA.
- [ ] No organization selection or administrative workflow appears.
- [ ] Existing M143 post/thread chrome remains recognizable.
- [ ] No endpoints, JSON, ids, tickets, queues, or invented system behavior appear.

## 16. Design goal

The stub should feel intentional rather than broken: residents can see the future collaboration direction and receive honest feedback when they try it, while developers cannot mistake the mockup for a connected organization workflow.
