# DOGEstonia — M159 Mobile & Responsive Critical States State-Sheet Specification v1.0

**Package:** M159, tenth in the approved M149–M160 sequence  
**Status:** **accepted** for handoff (revision 3); written implementation contract remains authoritative · residual → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Date:** 2026-10-08  
**Target:** current light dashboard at 390×844, 360×800, 320×700, 768×1024 and 1024×768 CSS px  
**Predecessors:** M149–M155, M157 and M158 **accepted** at their latest recorded revisions (handoff 2026-10-08); M156 accepted separately as stub sheet.  

**Artboard:** `generated_images/exec-e61f7f46-9353-4e77-aa27-91fde54c17fe.png`, revision 3.

**Visual audit, 2026-10-08:** Revision 1 used unapproved `Reacts` at 320 px, treated the third loaded comment as composer draft, duplicated E2 for the full people sheet, and put the full wordmark where the mobile app bar should show active node context. Revision 2 corrected these semantics and exposed reply context above the keyboard. Revision 3 corrects the remaining E3 label. A–D show the principal widths; E1/E2/E3, F, G and H are linked crops. Tiny tablet caption typography and illustrative people/media/map geometry are visual-sheet limitations; the exact CSS geometry and data boundaries in this specification govern implementation. Product acceptance pending.

## 1. Purpose and authority

Turn the schematic Mobile Responsive Design Pack into current high-fidelity critical-state compositions. Validate shared Issue, discussion, reaction and map components through narrow widths, keyboard and tablet rail boundaries. This is a layout/parity sheet, not a new mobile product or a new component specification. M156 follows to cover collaboration stub; M160 later stress-tests theme, localization and interaction states.

Authority: approved Current Design State-Artboard Backlog M159, Mobile Responsive Design Pack v1.0, Dashboard Layout Specification, Unified State Inventory §§8, 11–17 and 21, Component & Variants Specification, M149–M158 accepted written state sheets and current light reference images. The earlier schematic mobile SVG is a geometry guide. Written specs govern semantics when raster text/spacing is imperfect.

## 2. Shared responsive contract

| Width | Shell | Content |
|---|---|---|
| 320–479 | 56 px app bar + safe area, one feed column; 64 px bottom nav + safe area when keyboard/sheet closed | 16 px gutters at 360/390, 12 px at 320 |
| 480–767 | One centered feed column | 20 px gutters, max 720 px |
| 768–1023 | Centered feed max 760 px; right modules follow content or drawer | 24 px gutters; bottom nav may persist through 899 px |
| 1024–1199 | Optional 216 px left rail, flexible feed at least 640 px | Right rail not a permanent third column |
| ≥1200 | Existing three-column board | M149 desktop baseline |

Frames are QA targets, not device detection. Use available width and container space; preserve the same normalized Issue/thread states. `BoardIssuePost` is one continuous civic card with `IssueThreadBlock` directly below four equal `React | Comment | Share | Reactions` zones. All literal loaded comment bodies are text. No gray rectangles after successful read, fake author/time, unsourced people/media/count or new route.

## 3. Artboard frame matrix

| Frame | Exact viewport | Critical presentation | Panel |
|---|---|---|---|
| Populated board feed | 390×844 | Header, search/chips, List/Map, current Issue post and bottom nav | A |
| Open Issue sheet | 360×800 | Full-screen Issue content + thread, one scroll | B |
| Narrow post/actions/tree | 320×700 | Four labelled actions and three visual comment levels | C |
| Keyboard-open reply | 390×844 | Composer above keyboard, reply context retained, bottom nav hidden | D |
| Reaction picker | 390×844 | Labelled groups in ≤70dvh bottom sheet, explicit React trigger | E1 |
| Compact/all distribution people | 390×844 | Compact sheet no Connect; full sheet tabs+conditional Connect | E2/E3 |
| Map + selected Issue | 390×844 | Same active filters, eligible pins and bottom preview | F |
| Centered tablet feed | 768×1024 | One centered feed, contextual modules after feed | G |
| Left-rail boundary | 1024×768 | 216 px optional rail, feed ≥640, no fixed right rail | H |

One consolidated landscape artboard may show 4 large primary mobile panels A–D and legible linked E/F/G/H crops. Do not shrink every UI frame into unreadable miniature. Use labels outside the UI, a geometry strip for exact widths, and a separate annotation for fixture/API boundaries.

## 4. Panel A — 390×844 populated feed

Show 56 px app bar with square DOGEstonia mark/menu target, `Uus Veerenni`, search and one account/notification control. Board title 24/32, support sentence 14/20. Search 44 px, horizontally scrollable filter chips 36 px, result context with `List | Map` near toolbar. One Issue UV-024 card (viewport minus 32 px, radius 10, 16 px padding), 40 px civic icon, wrapped 18/24 title, 14/20 summary, labels and `Open issue`; optional media only if clearly marked illustration. The action row is 52 px high with all four visible labels and ≥44 px targets. Below it, populated collapsed Discussion shows literal preview `I can help coordinate a shared pet-care group for neighbours.`, `View discussion` and composer entry. Bottom navigation has Board, My stories, Tell a story, Profile, icon+label; page padding keeps thread controls above nav and safe area. No right/left rail on mobile.

## 5. Panel B — 360×800 Issue sheet

Full-screen `100vw × 100dvh` sheet, no rounded desktop mini-modal. Header 56 px plus safe top with back/close and Issue UV-024. One body scroll in order: civic identity/title/full summary/labels → optional approved detail/media → four actions → Discussion → literal comment bodies and reply → composer. `A simple sign-up list would make it easier to start.` remains a real readable reply. Sticky composer above bottom safe area; global bottom nav hidden. Back closes to exact board scroll/filter state. A direct `/issue/:id` route uses the same content in page chrome, not a second comments product.

## 6. Panel C — 320×700 boundary

Outer gutter 12 px, card width 296 px, card inner padding 12 px. Title/summary wrap; no horizontal page scroll or fixed-width card overflow. Four logical action targets retain meanings and available short approved localized labels at 52 px; icon-only is not the default. If full `Reactions` does not fit alongside three labels, use a documented short localized label with full accessible name, not a vanished control. Show root, child and grandchild with 24 px indentation and thin connectors; at visual level 3 stop further indentation and use explicit parent context for deeper logical replies. The configured `max_depth` still determines whether Reply exists; visual cap alone does not block it. Literal bodies wrap without small type. No placeholder author circles or extra Share control on individual comments.

## 7. Panel D — keyboard-open composer

Same 390 px Issue sheet as B with selected reply context. Exact draft `I can help draft the sign-up list this week.` remains in multiline field. Composer, Attach and `Post reply` are above software keyboard and device safe area. Hide global bottom nav while typing; keep parent excerpt visible or one reachable scroll gesture away. Single intentional sheet scroll, dynamic viewport size, no content trapped behind keyboard. Closing keyboard does not post or discard. Verification return and soft failure retain draft; do not illustrate an inline verification form.

## 8. E1–E3 — reactions and people sheets

E1 picker: explicit React tap opens ≤70dvh bottom sheet with labelled `Emotional`, `Epistemic`, and comment-only `Moderation`, localized labels primary, selectable ≥44 px rows, capacity from knob (fixture 3), `agree`/`disagree` exclusion, Done/close and safe-area padding. Thread root omits Moderation. Long press optional only.

E2 compact all-reactors mobile sheet: combined people list, badge overlaps avatar, **no tabs or Connect**. E3 full distribution mobile sheet: ≤88dvh, title row 56 px, horizontally scrollable type tabs 48 px, people rows 64 px, badge on avatar, `Connect` only where conceptually eligible and `You` on self. Since current API returns aggregates but not reactor people, E2/E3 are **illustrative target UI fixtures pending `DUI-Q08/Q17`**, not inferred production users. Keep two surfaces visibly distinct even when both are bottom sheets.

## 9. Panel F — mobile map and selected Issue

Same filters/query and `List | Map` position as A. Map contains only Issues with numeric lat+lon; provider-neutral surface with eligible pins and selected Issue UV-024 preview as a bottom card above bottom navigation. Preview uses public civic title/status/location where source-provided and `Open issue`, not author data. If 3 of 7 filtered Issues are eligible, any `3 of 7 on map` helper is explicitly a deterministic fixture derived from complete responses; list still contains all 7. Zero eligible disables/hides Map with honest reason. Loading/error remain scoped to map, with a return-to-list path. Do not draw private coordinates, invented streets, provider branding or clustering controls.

## 10. Panels G/H — tablet boundaries

G 768×1024: one centered feed max 760 px under compact 60 px top app bar, 24 px side gutter. Right-context modules relocate after feed or drawer; no persistent third column. Bottom nav may remain at this width. Issue sheet may become viewport-safe centered modal only if ≥32 px margins remain.

H 1024×768: optional 216 px left rail, flexible feed width at least 640 px, no fixed right rail. Search, chips, List/Map and Issue card retain M149/M151 order. Do not let sidebar squeeze actions, summary or comments. The modal width is `min(960px, 100vw - 64px)`; reaction distribution is centered dialog. Tablet frames validate layout transitions; they do not redefine thread/reaction state.

## 11. Navigation, focus, a11y and localization

App bar actions ≥44 px, bottom-nav targets ≥48 px and labels visible at 360/390. Sheet/Dialog focus contained and restored to triggering control; closing Issue sheet restores feed scroll/query. Escape/Back dismisses topmost overlay first. Comment hierarchy is programmatically linked, not indentation-only. Picker group/selection semantics and people row reaction names remain accessible. ET/RU/EN can expand 30–40%; Issue title unrestricted wrap, feed summary clamp only with explicit open path, comment body unrestricted wrap, filter chips scroll in their own row, reaction tabs in their row. 200% zoom and 320 px reflow avoid two-dimensional page scroll (map canvas exception). Reduced motion keeps all outcomes legible. Icon/color alone conveys no state.

## 12. Visual and data constraints

Current light page `#F7F6F2`, warm surface `#FFFDF8`, primary `#101828`, secondary `#667085`, border `#E7E4DC`, yellow `#F5C542`. M160 handles dark parity. Use the accepted Issue UV-024 and literal comments across frames to make component parity obvious. Current API supports comment body/parent/depth/reaction aggregate, but not comment authors/times/media or reactor people. The map requires numeric coordinates; Issue media rendering remains partially contract-blocked. Mark illustrative media/people/coordinates outside functional UI. No Facebook/Meta assets or new product branding.

## 13. Artboard instructions and forbidden representations

Title `M159 · MOBILE / RESPONSIVE CRITICAL STATES · rev 1`. One sharp light landscape sheet. Main A 390 feed, B 360 sheet, C 320 boundary and D keyboard-open should be visually large. E1–E3, F, G and H may be linked crops but must keep labels/controls readable. Include exact viewport labels and a compact responsive breakpoint legend. Avoid repeating decorative full-size media in every frame; no desktop-only layout compressed into a phone. External notes: `Same components, responsive placement`, `Loaded comment bodies are text`, `People sheets illustrative pending API`, `Map shows only eligible pins`, `One body scroll in Issue sheet`.

Forbidden: icon-only four-action default; missing Share; bottom nav over composer; verification method UI; active moderation on thread root; Connect in compact people sheet; people list fabricated from aggregate; author/time/media presented as production; gray bars for loaded comment body; map with ineligible pins; permanent right rail at 1024; four visual comment indents; tiny 320 text; horizontal page scroll; invented mobile-only thread product.

## 14. Acceptance checklist

- [ ] A has current 390 board shell, card, four labelled actions, literal thread preview and uncovered bottom nav.
- [ ] B has 360 full-screen sheet and strict civic-before-social order with one scroll.
- [ ] C keeps four actions and three readable visual comment depths at 320, without page overflow.
- [ ] D keeps draft, reply context and actions above keyboard while nav hides.
- [ ] E1 picker, E2 compact people and E3 full people sheet maintain distinct semantics.
- [ ] F has eligible map pins and selected public Issue preview; filters/list parity remains.
- [ ] G/H show centered 768 feed and 1024 optional left-rail boundary without fixed right rail.
- [ ] All illustrative people/media/map data is marked; no loaded comment skeletons or unsupported author/time.
- [ ] Focus, safe area, localization, labels and state parity can be implemented from this spec and the audited image.

## 15. Open decisions

| ID | Why it matters | M159 handling |
|---|---|---|
| `DUI-Q03` | Public Issue media URL/alt unavailable | Illustration only, optional media in implementation. |
| `DUI-Q08/Q17` | Reactor identities/Connect contract absent | E2/E3 target visuals only. |
| `DUI-Q10` | Comment ordering/branch loading absent | No sort or fake pagination. |
| `DUI-Q14` | Public map label/privacy precision unresolved | Generic public label, no private geo. |
| Mobile short labels | Approved ET/RU/EN short forms for 320 actions | Preserve semantic accessible names; localization owner supplies final abbreviations. |
