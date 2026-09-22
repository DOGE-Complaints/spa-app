# M145 — THR-R reactions.v1 strip + picker

Status: Proposed — active semantic SSOT for this artboard  
Surface: `IssueThreadBlock` comments and thread root on `/board` and `/issue/:id`  
Parent compositions: M143 / THR-P revision 1.1; M144 / THR-T  
Catalog SSOT: `doge-threads-reactions-catalog-2026-09-18.md`, `reactions.v1`  
Scope: visual/product specification only; no implementation contract  
Priority: MUST

## 1. Purpose

Define the compact reaction summary strip and the full `reactions.v1` picker for Issue discussions. The UI must keep emotional response, epistemic judgement, and moderation signals semantically distinct while remaining familiar and lightweight in the feed.

M145 elaborates the reaction slot established by M143 and the comment-level actions shown by M144. It does not define voice-weight mathematics, ranking, sanctions, or cabinet analytics.

## 2. Catalog authority

Only ids present in `reactions.v1` may appear. Stable ids are developer annotations; localized labels are the primary resident-facing text.

### Emotional layer

| reaction_id | English label | Topic-guarded default |
|---|---|---|
| `acknowledge` | Acknowledge | enabled |
| `support` | Support | enabled |
| `empathy` | Empathy | enabled |
| `concern` | Concerned | enabled |
| `hopeful` | Hopeful | disabled |
| `sad` | Sad | enabled |
| `outraged_situation` | This is unacceptable | enabled |
| `amused` | Amusing | disabled |

### Epistemic layer

| reaction_id | English label | Topic-guarded default |
|---|---|---|
| `agree` | Agree | enabled |
| `disagree` | Disagree | enabled |
| `useful_fact` | Useful fact | enabled |
| `insightful` | Insightful | enabled |
| `needs_evidence` | Needs evidence | enabled |

### Moderation layer

| reaction_id | English label | Topic-guarded default |
|---|---|---|
| `off_topic` | Off-topic | enabled |
| `aggressive` | Aggressive | enabled |

Do not introduce `like`, `love`, `care`, `wow`, `angry`, `haha`, `dislike`, `downvote`, `report`, `escalate`, or `ready_to_help` as ids.

## 3. Core semantic locks

- Catalog version is explicitly `reactions.v1`.
- Picker uses three visibly labelled groups: `Emotional`, `Epistemic`, and `Moderation`.
- Localized text is authoritative. Emoji/icon is a secondary visual aid only.
- Do not display internal icon filenames such as `ic-*`.
- The feed summary strip is compact; the complete enabled catalog appears only in the picker.
- Emotional and epistemic entries may apply to comments and thread root.
- Moderation entries apply to comments only.
- On thread root, the moderation group is omitted or replaced by explicit unavailable helper copy. It must never look selectable.
- Multi-select is allowed up to `max_reactions_per_actor`; Topic-guarded recommended default is 3.
- `agree` and `disagree` are mutually exclusive on the same target.
- Do not show voice-weight values, overlap values, cabinet metrics, ranking impact, or sanctions.
- Disabled node entries are omitted from the normal picker or clearly unavailable; they cannot look selectable.

## 4. State matrix

| ID | State | Required visual result |
|---|---|---|
| THR-R-A | Summary strip | Compact aggregate count and top reaction marks without the full catalog |
| THR-R-B | Picker open | Three labelled layers visible for a comment target |
| THR-R-C | Enabled-only catalog | Enabled ids visible; disabled entries omitted or clearly unavailable |
| THR-R-D | Desktop open | Hover or explicit button opens an anchored picker; button path remains available |
| THR-R-E | Mobile open | Long-press may open picker, but explicit button is present and sufficient |
| THR-R-F | Keyboard / focus | Visible keyboard focus path through trigger, groups, choices, and close |
| THR-R-G | Mutual exclusion | Selecting `agree` deselects `disagree`, and vice versa |

## 5. Shared target context

Panels use a cropped comment row from M144:

- neutral actor placeholder;
- `Comment preview` and abstract content lines;
- `React` action;
- no fabricated person, prose, timestamp, or popularity context.

Where thread-root behavior must be shown, use a concise context label `Thread root` rather than duplicating the full Issue card.

## 6. Summary strip

The compact strip may include:

- up to three top marks represented by restrained icon + localized label or small icon stack;
- total aggregate count;
- the resident's current selection state when applicable;
- one clear affordance to open the picker or reaction details.

The strip must not become a Facebook-style single Like counter. It must not display the full catalog or three full layer sections inline in the feed.

For the state-sheet only, any numeric aggregate is explicitly annotated `Illustrative aggregate` and is not a production metric claim.

## 7. State specifications

### THR-R-A — Compact summary strip

Show one comment with a low-height strip beneath it:

- top marks using real enabled ids, for example localized labels `Acknowledge`, `Support`, and `Agree`;
- small aggregate count or count slot;
- `React` trigger;
- optional `View reactions` affordance.

Keep the strip visually subordinate to the comment. Do not show every enabled entry, layer configuration, moderation controls, or voice weighting.

### THR-R-B — Picker open with three labelled layers

Show an anchored picker for a **comment** target. It contains three explicit sections:

1. `Emotional` — sample enabled entries: `Acknowledge` (`acknowledge`), `Support` (`support`), `Concerned` (`concern`), `Empathy` (`empathy`).
2. `Epistemic` — sample enabled entries: `Agree` (`agree`), `Disagree` (`disagree`), `Useful fact` (`useful_fact`), `Needs evidence` (`needs_evidence`).
3. `Moderation` — enabled comment-only entries: `Off-topic` (`off_topic`) and `Aggressive` (`aggressive`).

Each option uses localized text as the main label, with an icon/emoji only as aid. Stable ids may appear beneath labels as small implementation annotations.

Show capacity helper: `Choose up to 3 reactions`. Avoid progress meters, unlock language, streaks, rewards, or game-like celebration.

### THR-R-C — Enabled-only entries

Show a compact catalog view for the Topic-guarded default:

- enabled ids are available normally;
- disabled `hopeful` and `amused` do not appear as active choices;
- preferred pattern is omission with helper copy `Only reactions enabled for this node are shown`;
- if an unavailable example is included for specification clarity, it must be clearly disabled, non-focusable, and annotated `Unavailable in this node`, not merely low contrast.

Do not expose JSON switches, node settings, overlap thresholds, or admin controls in the resident picker.

### THR-R-D — Desktop open gesture

Show the `React` button in hover/focus-ready state and the picker anchored close to it.

- hover may reveal or open the picker according to the chosen desktop interaction;
- click/explicit button activation must always open it independently of hover;
- the picker does not cover the target comment's essential context;
- moving pointer into the picker does not immediately dismiss it;
- dismissal is available through outside click and explicit close.

The artboard annotation must state `Hover is optional; button activation is authoritative`.

### THR-R-E — Mobile gesture

Show a narrow mobile comment row and picker/bottom popover:

- visible `React` button is the primary discoverable trigger;
- long-press may open the same picker as a shortcut;
- no interaction depends exclusively on long-press;
- groups remain labelled and scroll within a bounded surface if required;
- touch targets meet the existing minimum size.

Use annotation `Long-press shortcut · explicit button always available`.

### THR-R-F — Keyboard and focus path

Show a desktop picker with visible focus rings and numbered focus annotations:

1. `React` trigger;
2. first enabled option in `Emotional`;
3. enabled option in `Epistemic`;
4. enabled option in `Moderation` for a comment target;
5. `Close`.

Interaction annotation:

- `Enter / Space: open or toggle`;
- `Arrow keys: move within a labelled group`;
- `Tab: move between groups and controls`;
- `Esc: close and return focus to React`.

Disabled entries are skipped. Focus order follows visible reading order.

### THR-R-G — `agree` / `disagree` mutual exclusion

Show two sequential mini-states or a before/after inset:

- State 1: `Agree` selected; `Disagree` unselected.
- State 2: selecting `Disagree` removes `Agree` and selects `Disagree`.

Show helper copy `Agree and Disagree cannot be selected together.`

Other enabled cross-layer selections may remain selected while within capacity. Show a neutral capacity hint such as `2 of 3 selected`; do not show voice weight, score, influence, or a competitive meter.

## 8. Selection behavior

- One actor may select multiple compatible reactions up to the configured maximum.
- Topic-guarded recommended default is 3; UI copy may state `Choose up to 3 reactions` for this artboard.
- Selecting an already selected reaction toggles it off.
- Selecting a fourth reaction at the default maximum does not silently replace an unrelated selection; show clear capacity feedback and let the resident deselect first.
- `agree` and `disagree` replace each other directly because they are mutually exclusive.
- Selection feedback is immediate, reversible, and text-labelled.

## 9. Root versus comment availability

### Comment target

- Emotional: available according to node-enabled catalog.
- Epistemic: available according to node-enabled catalog.
- Moderation: available according to node-enabled catalog.

### Thread root

- Emotional: available according to node-enabled catalog.
- Epistemic: available according to node-enabled catalog.
- Moderation: unavailable.

Preferred thread-root helper: `Moderation reactions are available on comments only.`

Do not redirect root moderation toward a Story author or treat the Issue as a person.

## 10. Visual system

- Preserve M143/M144 dark civic-tech continuum.
- Canvas: approximately `#141417`.
- Surface: approximately `#1B1C1F` with thin cool-grey dividers.
- Primary text: `#F2F2F2`; muted: `#9A9DA6`.
- Signal yellow: approximately `#F5C542` for current selection, focus, and the principal trigger only.
- Layer groups use headings and spacing, not three arbitrary bright colors.
- Moderation may use a restrained warning accent, but must not look like an automatic sanction.
- Icons/emoji remain small aids beside text and never carry meaning alone.
- Picker corners, shadows, density, and attachment to trigger follow M143/M144.
- No Facebook reaction bubble row, blue Like button, branded emojis, or personality-centred social styling.

## 11. Responsive behavior

- Feed strip remains one compact row and truncates secondary labels before obscuring the total or trigger.
- Desktop picker is an anchored popover sized to show three labelled groups without covering essential comment context.
- Mobile picker may use a bounded bottom popover/sheet while preserving the comment context above.
- Long labels wrap inside their option; stable ids may truncate as developer annotations but localized labels do not.
- Picker content can scroll internally when localization expands; the page is not forced into horizontal scroll.

## 12. Accessibility and localization

- Every reaction has an accessible localized name including the target meaning where needed.
- `This is unacceptable` must remain situation-directed; icon alone is insufficient.
- Group headings are programmatically and visually associated with their options.
- Selected, unselected, disabled, and focused states are distinguishable without color alone.
- Capacity and mutual-exclusion feedback are announced and persist long enough to understand.
- Keyboard opening and closing restore focus predictably.
- Hover is never the only discovery or activation mechanism.
- Long-press is never the only mobile activation mechanism.
- Labels allow approximately 30–40% expansion and support Estonian, English, and Russian copy.

## 13. Data and privacy boundaries

The artboard must not show or invent:

- voice-weight numbers or curves;
- actor overlap values;
- cabinet metrics, influence, rank, or trust score;
- raw catalog JSON or enable/disable admin UI;
- API routes, request/response fields, or icon filenames;
- moderation outcomes, sanctions, or private report workflows;
- fabricated identities or comment content.

## 14. Artboard composition

Produce one consolidated landscape state sheet titled:

`DOGEstonia — reactions.v1 Strip + Picker — M145 / THR-R`

Recommended hierarchy:

- large upper-left: THR-R-B full picker with three labelled layers;
- upper-center/right: THR-R-A compact strip and THR-R-C enabled-only behavior;
- lower-left: THR-R-D desktop opening;
- lower-center: THR-R-E mobile opening;
- lower-right: THR-R-F keyboard focus and THR-R-G mutual exclusion;
- narrow annotation rail: catalog, target scope, capacity, accessibility, and prohibited patterns.

Panels use cropped M144 comment context, not a full Issue-card repetition.

## 15. Required annotations

- `Catalog: reactions.v1`
- `Localized text is authoritative; icon is an aid`
- `Three labelled layers — never emoji soup`
- `Full enabled catalog lives in picker; feed strip stays compact`
- `Moderation: comments only; unavailable on thread root`
- `Multi-select · default max 3`
- `agree ⟂ disagree`
- `Hover optional; button authoritative`
- `Long-press shortcut; button always available`
- `No voice-weight numbers or cabinet metrics`

## 16. Anti-patterns

- Single Facebook-style Like row used as the reaction system.
- Unlabelled emoji soup mixing all semantic layers.
- Invented reaction id, renamed stable id, or invented `ic-*` filename.
- Moderation choices on thread root.
- Showing disabled catalog entries as apparently selectable.
- Hover-only desktop control or long-press-only mobile control.
- `agree` and `disagree` selected simultaneously.
- Game-like capacity, unlock, streak, reward, or popularity language.
- Voice weight, overlap, influence, cabinet score, or ranking metric.
- Moderation reaction displayed as an automatic punishment.
- Raw JSON, API path, admin catalog editor, or node-settings surface.

## 17. Acceptance checklist

- [ ] All seven labelled states THR-R-A…G appear on one sheet.
- [ ] Catalog is visibly identified as `reactions.v1`.
- [ ] Emotional, Epistemic, and Moderation are separate labelled groups.
- [ ] Every visible choice uses a real catalog id and authoritative localized label.
- [ ] Compact strip does not expose the full catalog.
- [ ] Disabled Topic-guarded defaults are omitted or unmistakably unavailable.
- [ ] Moderation is active only for comments and explicitly unavailable at thread root.
- [ ] Desktop has an explicit button path independent of hover.
- [ ] Mobile has an explicit button path independent of long-press.
- [ ] Keyboard focus order and return behavior are indicated.
- [ ] `agree` and `disagree` mutual exclusion is unambiguous.
- [ ] Default capacity hint is clear and non-gamey.
- [ ] No voice-weight values, cabinet metrics, invented ids, API routes, or JSON appear.

## 18. Design goal

A resident should immediately understand not only that they can react, but what kind of civic signal each reaction carries. A developer should be able to implement one compact strip and one accessible picker without collapsing emotional, epistemic, and moderation semantics into a generic social-media Like system.
