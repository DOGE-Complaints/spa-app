# DOGEstonia — M160 Theme, Localization & Interaction-State Stress Sheet Specification v1.0

**Package:** M160, twelfth and final package in the approved M149–M160 production queue  
**Status:** **accepted** for handoff (revision 1); written implementation contract remains authoritative · residual → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Date:** 2026-10-08  
**Target:** the same current `BoardIssuePost`, `IssueThreadBlock` and Issue modal at light/dark, ET/RU/EN, pointer/keyboard, 200% text and 320 CSS px.  
**Predecessors:** M149–M155 and M157–M159 **accepted** at their latest revisions; M156 revision 1 **accepted** (handoff 2026-10-08).  

**Artboard:** `generated_images/exec-54fdd85b-1ed5-485d-b4e0-0b54c5e2b630.png`, revision 1.

**Visual audit, 2026-10-08:** A and B preserve the same Issue, four actions, literal loaded root and reply between light and dark. C shows EN/ET/RU/pseudo as QA fixtures; its illustrative translated Issue prose is not approved shipping copy. D distinguishes all five control and four feedback states; its success sample is explicitly a QA fixture, separate from the invitation info state. E retains all four labelled actions on two rows at the 320/200% reflow target. The same illustrative media appears in both themes despite being optional in the written composition; it is not evidence of an API media field. Tiny labels and exact token colors in generated pixels are illustrative; implementation must use the written values and browser checks for contrast, 200% reflow, forced colors and reduced motion. No semantic correction required before product review.

## 1. Purpose, authority and limits

M160 is a consolidated QA reference for cross-cutting variants of the **already approved** design. It compares the same Issue and thread in two themes and checks localization, control states, feedback, reflow and accessibility environment preferences. It creates no new component, product flow, API field, data claim or theme direction. A generated image is a visual acceptance reference; implementation screenshots at the agreed viewports become the visual regression goldens. Written specifications govern semantics and exact behavior if raster details differ.

Authority: approved Current Design State-Artboard Coverage & Backlog M160, Design Tokens Package v1.0, Accessibility & Localization Pack v1.0, Design QA & Visual Regression Pack v1.0, and the accepted current-design state sheets M149–M159/M156. Current light-first geometry, civic hierarchy and fixed post action strip remain intact. Token corrections in the accessibility pack override earlier raw token examples: light focus `#B54708` and normal-size light secondary text `#667085`.

## 2. Shared fixture and state matrix

The light and dark comparisons reuse the **identical** illustrative Issue fixture: `UV-024`, `OPEN`, `A trusted neighbour network for pet care`, summary `Residents need a simple way to find trusted neighbours for dog sitting, cat visits and short-term pet care close to home.`, and loaded comment body `I can help coordinate a shared pet-care group for neighbours.` A loaded reply says `A simple sign-up list would make it easier to start.` These are layout examples, not production resident records. No invented author, timestamp, people identity, count, media URL or location appears. Image media is omitted from the principal parity comparison so copy/contrast remains the test.

| ID | Comparison | State and outcome | Primary panel |
|---|---|---|---|
| `THEME-POST-L/D` | Same Issue/post | Identical hierarchy, four actions and loaded comment text in light and dark | A |
| `THEME-THREAD-L/D` | Same modal/thread | Identical Issue identity, comment tree and composer in light and dark | B |
| `L10N-LONG` | ET/RU/EN + pseudo-localization | Long labels and body wrap without clipping or semantic loss | C |
| `CTRL-5` | rest/hover/focus/selected/disabled | Explicit labelled examples and visible keyboard focus | D inset |
| `FEEDBACK-4` | info/success/warning/error | Inline text + semantic icon, no color-only meaning | D inset |
| `REFLOW-320-200` | 320 CSS px at 200% text | One column; no page-level horizontal scroll; key actions remain reachable | E |
| `PREF-ENV` | reduced motion / forced colors | Behavioral annotations, not invented theme screenshots | Margin note |
| `ICON-COLOR` | approved icon set | Icons inherit `currentColor`; status/meaning has text | Margin note |

## 3. Canonical anatomy and tokens

Light: page `#F7F6F2`, surface `#FFFFFF`, warm Issue surface `#FFFDF8`, subtle `#F1EFE9`, primary text `#101828`, secondary `#667085`, border `#E7E4DC`, focus ring `#B54708`. Dark: page `#141417`, surface `#1B1C1F`, warm surface `#202125`, subtle `#25262B`, primary text `#F2F2F2`, secondary `#B7BAC2`, border `#34353B`, focus ring `#F5C542`. Shared yellow `#F5C542` remains the primary/selected accent with navy `#101828` on yellow. Preserve the same radii, spacing, content order and hit areas. The dark version must make input boundaries, comment connectors, disabled affordances and text legible without simply inverting a screenshot.

Order inside a post: civic Issue identity/status/title/summary → `Open issue` where present → exactly four equal `React | Comment | Share | Reactions` action zones → attached `Discussion` with literal loaded comment bodies and composer entry. The modal has one scrollable body, a clear close, focus containment and return. Dark mode changes color tokens, not API capability or hierarchy.

## 4. Panel A — same Issue post, light vs dark

Two large, aligned crops at a comparable desktop feed width. Keep the same fixture, same content truncation boundary and same one loaded comment in both. Show status `OPEN` with a word, four readable post actions, `Discussion`, literal comment body and `Write a comment`. The light crop uses the accepted warm civic card; dark uses semantic dark surfaces. If card media would dominate, omit it in both. Label the panels `LIGHT` and `DARK` outside UI; annotate token mapping and unchanged geometry outside the crops. No gray skeleton rectangles in loaded comments.

## 5. Panel B — same Issue modal/thread, light vs dark

Two aligned modal/thread crops showing Issue `UV-024`, title, close control, one root comment, the literal reply and a composer entry. Maintain the M158 one-product parity: modal and direct `/issue/:id` use the same thread component/state; this sheet compares modal theme only. A visible keyboard focus example on the close or composer may appear, but should not accidentally imply focus and selection are the same state. At narrow widths the modal becomes the accepted full-screen sheet; do not redesign thread hierarchy for dark mode. Comment text must remain actual text, not loading bars.

## 6. Panel C — ET/RU/EN and pseudo-localization pressure

Use a labelled four-column or four-row comparison of a **single action/feedback layout** with compact but readable text. To avoid unapproved copy being mistaken for final translation, label the localized strings as **QA fixtures**. Retain known reaction labels from the approved catalog when available: `Support` / `Toetan` / `Поддерживаю`; a longer reaction such as `Needs evidence` / `Vajab tõendeid` / `Нужны подтверждения`. For pseudo-localization, use a visibly bracketed expansion fixture, e.g. `[!! Invite organization — extended label for layout testing !!]`, clearly marked `PSEUDO · QA ONLY`. This long stub label can wrap onto its own line inside Discussion; it never becomes a fifth post action. Keep EN, ET, RU language tags visible outside UI, do not pretend machine-crafted translation is released copy.

Stress rules: allow 30–40% string growth and arbitrary longer words; title, body and feedback wrap; filter chips/tabs scroll within their own row; fixed post actions keep four semantic targets, visible labels or approved localized short forms with full accessible names. No elision of a critical error or action meaning. Do not add author/time data for a language example.

## 7. Panel D — controls and feedback

Use linked insets at useful reading size. `CTRL-5` shows **one identical secondary control** in rest, hover, keyboard focus, selected and disabled states. Label each outside UI. Hover cannot be the only way to expose a feature; selected has shape/check/text in addition to color; disabled remains legible and accompanied by persistent explanation. Focus ring is ≥2 px with ≥2 px offset, light `#B54708` / dark `#F5C542`, not the earlier light yellow ring. Targets prefer ≥44 px, primary mobile ≥48 px. Focus and selected may coexist in actual implementation, but these samples isolate state appearance.

`FEEDBACK-4` shows four distinct inline semantic examples with icon **and** text, not color-only chips:

| Kind | Fixture copy | Meaning |
|---|---|---|
| Info | `Collaboration handoff isn’t connected yet. No invitation was sent.` | Local M156 stub feedback; no write claimed |
| Success | `Your draft is saved on this device.` | QA illustration of confirmed local state only; never imply server persistence |
| Warning | `This attachment can’t be added. Choose another file.` | Nonfatal actionable problem |
| Error | `Discussion is unavailable. Try again.` | Read failure with recovery action |

These feedback rows are independent component-state fixtures, not a four-message live stack in the same Issue. An actual success must correspond to a confirmed outcome; if local draft saving is not implemented, use the row strictly as a component QA sample and never place it in the Issue workflow.

## 8. Panel E — 320 CSS px / 200% text reflow

Show a meaningful narrow crop of the **same** Issue/thread at 320 CSS px with text size doubled: wrapped title and comment body, single column, four semantic post actions retained as wrapping/stacking labelled controls, readable composer and accessible focus. This is a reflow expectation, not a claim that a literal 320-pixel bitmap at 200% can show an entire page above the fold. Vertical scroll is expected. Avoid horizontal **page** scroll, clipped labels, overlapping nav/composer and fixed heights that cut content. Comment nesting stops visual indentation after three levels, preserving explicit parent context. The sheet may use a magnified callout to keep this panel inspectable.

## 9. Motion, forced colors, icons and behavior

- `prefers-reduced-motion: reduce`: remove nonessential animation/transitions; loading, selection, submission and error remain expressed through text/structure. Preserve focus management and state changes.
- `forced-colors: active`: use system color semantics and visible borders/focus; selection/check and labels remain perceivable. Do not rely on custom background fills or a yellow-only selected cue. This sheet annotates the expectation; browser implementation needs separate QA.
- Approved icons should use `currentColor` for light/dark/hover/focus/disabled inheritance. If the final icon set is still pending, this is an implementation rule and **not** approval of invented icon geometry. Do not use icon alone for reaction meaning, feedback, status or action labels.
- Keyboard sequence follows DOM order. Dialog focus is contained and restored to the trigger on close; error action and text remain reachable. No hover-only or long-press-only behavior. Disabled control with explanation is not a dead mystery target.

## 10. Data/API and localization boundaries

All principal light/dark content is a shared deterministic fixture. Current APIs do not license invented comment author/time, reactor identities, media, recipient or organization invitation records. The M156 local stub has no send/persistence outcome. Numeric analytics, geographic coordinates, case status and verification method UI are outside M160. Final ET/RU/EN translations and any short 320 action labels require localization approval; the sheet records expansion and semantic requirements rather than freezing sample strings as production copy.

For implementation, use semantic tokens and accessible component states. Capture actual application screenshots at the QA pack's 1440×1024, 1024×768, 768×1024, 390×844, 360×800 and 320×700 viewports as relevant, plus 200% text, forced-colors and reduced-motion checks. A generated raster is not a pixel-perfect regression golden.

## 11. Artboard composition

Title `M160 · THEME / LOCALIZATION / INTERACTION STRESS · rev 1`. One landscape consolidated sheet: **A** large same-post light/dark pair; **B** same modal/thread light/dark pair; **C** readable ET/RU/EN/pseudo label pressure; **D** linked five-control and four-feedback insets; **E** 320/200% reflow crop. A/B are the main visual weight, with C/D/E large enough to read. Keep state IDs and explanatory labels on the board margin. External note strip: `Same fixture and geometry across themes`, `Loaded comments are literal text`, `Translations are QA fixtures`, `200% reflows vertically`, `Reduced motion / forced colors / currentColor require implementation QA`. Use the current DOGEstonia visual language, restrained yellow accent, no logo regeneration or fake dashboard metrics.

## 12. Forbidden representations

- Dark mode as a different product or rearranged component tree.
- Light yellow `#F5C542` focus ring as the sole focus indicator against a light surface; invisible dark borders or muted low-contrast text.
- Skeleton bars inside successful loaded comments; fabricated author/time, people list, media, invitation sent state or API record.
- Fifth post action, missing Share, icon-only essential actions or inaccessible 320 controls.
- Pseudo or sample translations presented as approved shipping copy.
- Color-only status/selection, hover-only explanation, disabled control without adjacent explanation, motion-only outcome.
- Four independent feedback fixtures depicted as simultaneous actual messages, or false success in the M156 invitation flow.
- Raster image treated as implementation regression golden or proof of forced-colors/reduced-motion runtime behavior.

## 13. Acceptance checklist

- [ ] A compares identical Issue text, civic hierarchy, four actions and literal comment text under light/dark tokens.
- [ ] B compares identical modal/thread content and composer, preserving one thread product.
- [ ] C labels ET/RU/EN/pseudo as QA fixtures, demonstrates expansion without losing meaning.
- [ ] D distinguishes rest/hover/focus/selected/disabled and info/success/warning/error with icon+text; focus tokens corrected.
- [ ] E shows 320 CSS px with 200% text wrapping vertically, labelled reachable actions and no horizontal page overflow.
- [ ] Reduced-motion, forced-colors and `currentColor` behavior are explicitly annotated as implementation QA.
- [ ] No invented data/capability or loaded-comment skeleton; image audited against written semantics before product acceptance.

## 14. Open implementation decisions

| Item | Boundary for M160 |
|---|---|
| Final ET/RU/EN copy and 320 short action labels | Localization owner supplies approved wording; preserve full accessible names and wrap now. |
| Icon set approval | Apply `currentColor` to approved assets; this sheet does not approve new icon artwork. |
| Actual local draft persistence | Success row is isolated QA fixture unless a real local-save behavior is implemented and confirmed. |
| Browser-specific 200%/forced-colors behavior | Verify in implementation; generated sheet conveys target, not runtime proof. |
