# DOGEstonia — M154 Current `reactions.v1` Strip & Picker (THR-R v2) State-Sheet Specification v1.0

**Package:** M154, sixth in the approved M149–M160 queue  
**Status:** **accepted** for handoff (revision 2); written implementation contract remains authoritative · residual → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Date:** 2026-10-08  
**Target:** current light `BoardIssuePost` / expanded `IssueThreadBlock`, comment and thread-root reactions, desktop and mobile  
**Predecessors:** M152 rev4 and M153 rev2 **accepted** (handoff 2026-10-08).  

**Artboard:** `generated_images/exec-6303cca4-a4e7-4a8c-a3e7-38c20e88d2d2.png`, revision 2.

**Visual audit, 2026-10-08:** Revision 1 incorrectly displayed Support selected alongside `0 of 3 selected`, with an inactive-looking commit, and did not clearly mark Disagree selected after the exclusion transition. Revision 2 shows `1 of 3 selected`, an active Add reactions action, and a selected Disagree in the after state. The compact strip keeps Issue/comment text intact across empty, loading and error. The comment picker has three labelled groups, while the root inset has no selectable Moderation; mobile uses the same comment eligibility. Fixture icons and their visual treatment are illustrative; stable ids and localized labels in this specification govern implementation. Product acceptance pending.

## 1. Purpose and authority

Connect the compact `React` action and aggregate in the current post/thread to a clear, accessible picker that preserves the three semantic layers of the accepted `reactions.v1` catalog. Translate historical M145's state logic into the current light visual language. The full catalog appears only in the picker, not permanently in the feed row. M155 handles the separate people-list surfaces.

Authority: approved Current Design State-Artboard Backlog M154, accepted reactions catalog dated 2026-09-18, Unified State Inventory §16, Component & Variants Specification §§22, 29–31, Interaction & Behavior Specification §§24–25, Data-to-UI Contract §§13, 18–20, 26–27, and Accessibility & Localization Pack. Historical M145 is semantic scaffolding; its dark design and abstract comment bars are not the current skin. Written rules override generated pixels.

## 2. Core locks and data boundary

- Stable catalog version `reactions.v1`. Resident labels are localized ET/RU/EN; ids are implementation annotations only.
- `Emotional`, `Epistemic`, `Moderation` are visibly separate groups in a **comment** picker. Moderation is absent/unavailable at the **thread root**, never a selectable control.
- Emotional and epistemic options can target comment or root where node-enabled; moderation targets comments only. The node's `reactions_enable` intersects the approved catalog. Disabled Topic-guarded defaults `hopeful` and `amused` do not appear as selectable entries.
- Multi-select maximum comes from `knobs.max_reactions_per_actor`; the fixture uses the recommended default 3. `agree` and `disagree` are mutually exclusive on the same target, replacing one another directly.
- `React` always opens the picker; it does not silently add a default Like. Hover/long press are optional accelerators. First unverified write uses the existing verify gate; read/open need not commit.
- The aggregate is confirmed `aggregate_count` plus `summary_marks`; selected state comes only from authenticated `selected[]`. Top-mark ordering must be deterministic and must not treat API id order as popularity order.
- The reviewed API names `reactions.v1` but does not deliver labels/layers/icons as a versioned catalog response. Approved local catalog or API delivery remains an integration decision. Never invent metrics, people, reaction ranking impact or sanctions.

## 3. Approved fixture choices

| Layer | Visible enabled example labels | Catalog-only or default-disabled examples |
|---|---|---|
| Emotional | `Acknowledge`, `Support`, `Empathy`, `Concerned`, `Sad`, `This is unacceptable` | `Hopeful`, `Amusing` omitted under Topic-guarded default |
| Epistemic | `Agree`, `Disagree`, `Useful fact`, `Insightful`, `Needs evidence` | — |
| Moderation, comment only | `Off-topic`, `Aggressive` | Entire group unavailable on root |

All are actual `reactions.v1` meanings. Icons are small visual aids; labels carry meaning. `This is unacceptable` explicitly refers to the situation, not the commenter. No `like`, `love`, `care`, `wow`, `angry`, `haha`, `downvote`, `report`, `escalate` or volunteer pledge entries. The artboard can show a readable representative subset in the large picker and an external note that the scrollable picker contains the other enabled catalog entries; it must not imply a disabled entry is selectable. The implementation must provide all enabled entries.

The illustrative comment target contains the literal body `I can help coordinate a shared pet-care group for neighbours.` No person/name/avatar/time is implied. Any numerical reaction counts on the sheet are labelled externally `Illustrative confirmed aggregate`, never presented as real production measurement.

## 4. State matrix and visual composition

| State | Trigger | Required visible state | Panel |
|---|---|---|---|
| `THR-R-A` | Confirmed aggregate | Compact top marks/count and explicit `React`, no full catalog | A |
| `REACTION-STRIP-EMPTY` | Successful zero | React affordance, no fake zero theatre | A inset |
| `REACTION-STRIP-LOADING` | Read pending | Bounded small skeleton/status in reaction slot only | A inset |
| `REACTION-STRIP-ERROR` | Read failed | Unavailable/retry only in reaction slot; comment/Issue intact | A inset |
| `THR-R-B/C` | Comment picker open | Labelled three groups, node-enabled entries only, capacity hint | B |
| `THR-R-D` | Desktop activation | Popover anchored to explicit button; hover optional | B annotation |
| `THR-R-E` | Mobile activation | Explicit `React` button opens bounded bottom sheet | C |
| `THR-R-F` | Keyboard | Focus ring and ordered trigger/options/close path | B/C focus inset |
| `THR-R-G` | Choose opposite epistemic mark | Agree replaced by Disagree (or converse) | D before/after |
| `REACTION-CAPACITY` | At maximum 3 | Further compatible choice unavailable; deselect first | D inset |
| `REACTION-SAVING` / `REACTION-SAVE-ERROR` | Mutation pending/fails | Bounded pending then restore confirmed selection + scoped error/retry | D inset |
| `THREAD-ROOT-SCOPE` | Root target | Emotional + Epistemic; no active Moderation | B small inset |

Use 3–4 primary panels and linked insets, with large B three-group picker as visual anchor and C mobile sheet large enough for readable labels. Do not shrink the whole UI to fit every state as tiny cards. State labels live outside functional UI.

## 5. Panel A — compact aggregate and local strip states

Show a cropped current civic Issue/action context and one text comment. A compact summary can use two or three confirmed top marks (`Acknowledge`, `Support`, `Agree` as illustrative fixture), small icon stack and a confirmed count, plus a visible `React` action. Count and top marks are from response data, not a proxy for people lists; M155 owns reactor identities. The post row remains exactly `React | Comment | Share | Reactions`. A comment row has its own `React` and eligible `Reply`, not `Share` or a repeated four-action strip.

Empty: keep React without theatrical `0`. Loading: short status/skeleton only in aggregate slot, not the loaded comment body or civic Issue. Error: `Reactions unavailable` with scoped `Try again` where appropriate, leaving text and other controls intact. Anonymous read has no actor-selected styling.

## 6. Panel B — desktop comment picker, enabled catalog and root scope

An anchored popover appears beside a clear `React` trigger, without obscuring the target body. Show group headings `Emotional`, `Epistemic`, `Moderation`; choices have readable English fixture labels, restrained icons, selected checkmark and visible focus ring. The comment picker includes representative enabled options from each layer: Acknowledge, Support, Concerned, Agree, Disagree, Useful fact, Needs evidence, Off-topic, Aggressive. Other enabled choices remain reachable by scrolling. Helper: `Choose up to 3 reactions` for this fixture; production uses knob value. Footer can show `Done`/`Close` if the commit interaction requires it. Outside click/Escape closes and returns focus to React; pointer movement into popover does not close it immediately.

A compact root-target inset reads `Thread root`: Emotional and Epistemic remain, `Moderation reactions are available on comments only.` Do not show a selectable moderation option at root. If the node disables entries, omit them from the normal list and include a small explanatory note `Only reactions enabled for this node are shown`. Disabled `Hopeful`/`Amusing` never look clickable.

## 7. Panel C — mobile bottom sheet

At 390 × 844, show current Issue/comment context above a bounded bottom sheet (up to roughly 70dvh). `React` is a visible tap target; long press is optional. Group headings and option labels are readable, options at least 44 px high, internal scrolling with a visible sheet close/Done affordance and safe-area padding. No horizontal scrolling, emoji-only grid or bottom navigation covering the sheet. The same selection and root/comment eligibility rules apply. Localized labels may expand 30–40%; sheet scrolls vertically without clipping.

## 8. Panel D — selection, capacity, pending and error

Two small sequential snapshots: `Agree` selected → choose `Disagree` → `Agree` unselected and `Disagree` selected. Other compatible selected marks remain within capacity. Show `Agree and Disagree cannot be selected together.` At the fixture maximum show `3 of 3 selected` and a clear `Deselect one to choose another`; do not silently evict an unrelated mark or use gamified progress.

During a write, show a pending state tied to the target and lock duplicate commits. On confirmed success replace actor selection and aggregate atomically. On failure restore the last confirmed selection and counts, show `Reaction wasn’t saved. Try again.` in the picker/strip scope. Do not leave a false confirmed mark. A generic auth or `403` response must not automatically claim verification is required without the agreed discriminator; existing gate handles known preconditions. No reaction people list or private actor data in this sheet.

## 9. Focus, a11y, localization and motion

Keyboard path: focus `React` → activate with Enter/Space → focus first selected or first enabled option → Tab through visible choices/groups/Close; arrow keys may move inside a group → Escape closes and restores focus to React. Disabled options are omitted/skipped. Programmatic group labels and pressed/selected state match visible text. Selection uses checkmark/outline plus color; counts are spoken with meaning. Focus ring is clearly visible on light surface. Reduced motion removes hover animation without changing access. Mobile long press never becomes the only path.

ET/RU/EN labels are authoritative and can wrap; do not expose ids or machine translation as user copy. The catalog's Estonian and Russian labels may differ in length; `This is unacceptable` remains situation-directed in screen-reader text. Touch targets at least 44 px. Any status remains long enough to read and is announced without stealing focus.

## 10. Data handoff and open decisions

| Item | Source / constraint | M154 handling |
|---|---|---|
| Aggregate | `summary_marks[]`, `aggregate_count` | Render confirmed values; illustrative numbers externally labelled. |
| Own selection | Authenticated `selected[]` | No selected claim on anonymous read. |
| Capacity/enabled | `GET /threads/knobs` | Missing knob fails closed; never assume permissive default. |
| Catalog labels/layers | Accepted `reactions.v1` document; API does not supply metadata | Approved shipped catalog or future endpoint decision `DUI-Q09`. |
| Moderation root restriction | Approved UX, server error contract incomplete | Omit client choices and resolve durable backend enforcement `DUI-Q23`. |
| Ambiguous mutation | No idempotency/revision contract | Reconcile before blind repeat `DUI-Q21`. |
| People distribution | No reactor identities from reviewed API | M155 is a target visual; this sheet shows aggregate only `DUI-Q08`. |

## 11. Artboard directions and forbidden representations

Title `M154 · reactions.v1 STRIP + PICKER · THR-R v2 · rev 1`. Light DOGEstonia palette: page `#F7F6F2`, warm Issue surface `#FFFDF8`, navy text `#101828`, muted `#667085`, border `#E7E4DC`, restrained yellow `#F5C542` for chosen/focused actions. Use the accepted M152/M153 visual scale and current Issue identity. No old dark sheet as default. The signal groups differ by heading/spacing, not arbitrary loud color. The full picker is anchored desktop and a sheet on mobile. External annotations include `reactions.v1`, `localized label first`, `moderation comments only`, `button always available`, `default max 3 fixture`.

Forbidden: Facebook Like default; unlabelled emoji soup; fabricated ids/icons; moderation selectable at root; disabled entries presented as active; Agree and Disagree simultaneously selected; root author/personal targeting; voice weight, overlap, rank, influence or sanctions; people identities from aggregate count; raw API/JSON/admin settings; loading skeleton over loaded comment body; hover-only or long-press-only access.

## 12. Acceptance checklist

- [ ] THR-R-A through G and compact empty/loading/error, capacity, save error, root scope are represented with legible state labels.
- [ ] Comment picker clearly separates three layers and shows real catalog labels; root has no active Moderation.
- [ ] Enabled-only behavior omits default-disabled Hopeful/Amusing as active options.
- [ ] Compact aggregate is distinct from full picker, with confirmed count semantics and no invented people.
- [ ] Desktop explicit button and mobile explicit button paths are visible.
- [ ] Focus return, Enter/Space/Escape and ≥44 px touch targets are clear.
- [ ] Agree/Disagree exclusion, capacity, pending and rollback are unambiguous.
- [ ] No fake author/time, loaded-body skeleton, voice score, invented API or Facebook reaction model.
- [ ] Generated pixels are audited against this written specification; only implementation-relevant errors require regeneration.
