# DOGEstonia Accessibility & Localization Pack v1.0

**Scope:** public `/board`, Issue overlay, `/issue/:id`, list/map, filters, posts, threads, comments, reactions, composer, verification handoff and dashboard rails

**Target:** React.js implementation, Storybook, localization pipeline and design QA

**Languages:** Estonian (`et`), Russian (`ru`), English (`en`)

**Themes:** light and dark

**Status:** implementation handoff

**Pack date:** 2026-10-06

## 1. Purpose

This package makes accessibility and localization part of the DOGEstonia component contract rather than a final visual check.

It defines:

- conformance target and measurable acceptance rules;
- semantic structure, keyboard and screen-reader behavior;
- contrast, zoom, reflow, motion and target-size requirements;
- component-level accessible names, roles, states and announcements;
- ET/RU/EN string architecture, formatting and content-resilience rules;
- test fixtures, assistive-technology coverage and release gates;
- known blockers created by missing runtime data.

This package extends the existing Design Tokens, Mobile Responsive, Unified State Inventory, Component & Variants, Interaction & Behavior and Data-to-UI packages. It does not replace their product semantics.

## 2. Standards baseline

### Required target

DOGEstonia responsive web targets **WCAG 2.2 Level AA**.

The implementation also follows applicable WAI-ARIA Authoring Practices patterns where native HTML does not provide the necessary widget behavior.

Primary references:

- [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2 Understanding documents](https://www.w3.org/WAI/WCAG22/Understanding/)
- [WAI-ARIA Authoring Practices patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [Declaring language in HTML](https://www.w3.org/International/questions/qa-html-language-declarations)
- [Language tags in HTML and XML](https://www.w3.org/International/articles/language-tags/)

### European alignment

The pack is structured so the product can be evaluated against the web/mobile clauses of EN 301 549 and the accessibility expectations used for public-sector websites and mobile applications in the EU. This is an engineering target, not a legal conclusion about whether a particular DOGEstonia node is legally in scope.

References:

- [ETSI EN 301 549](https://www.etsi.org/technical-groups/hf/)
- [Directive (EU) 2016/2102](https://eur-lex.europa.eu/eli/dir/2016/2102)

### Product-enhanced targets

The design system intentionally exceeds bare AA minimums in selected areas:

- preferred touch target: 44 CSS px;
- primary mobile target: 48 CSS px;
- visible two-pixel focus ring with offset;
- no interaction available only through hover, drag or long press;
- 320 CSS px reflow acceptance;
- all critical flows usable with keyboard and screen reader;
- light and dark themes carry identical semantic information.

## 3. Conformance boundaries

### Included

- React-rendered application chrome and content;
- all first-party controls and overlays;
- Issue and thread data presentation;
- error, loading, empty, permission and recovery states;
- responsive behavior from 320 CSS px upward;
- localization and language switching;
- content generated from confirmed API data;
- accessibility of embedded map controls owned by DOGEstonia.

### External dependencies

External map canvases, identity/verification surfaces, browser viewers and third-party media players require their own conformance evidence. DOGEstonia remains responsible for:

- an accessible entry and exit path;
- an accessible alternative to the external surface;
- correct accessible name and state at the integration boundary;
- preserving focus and return context;
- not claiming conformance for inaccessible third-party content.

### Conformance is per complete flow

A component passing automated checks does not establish flow conformance. The board-to-Issue-to-comment path must be tested as one user journey, including errors, verification handoff and return.

## 4. Core accessibility principles

1. **Native first.** Use native button, link, input, select, heading, list and dialog semantics before ARIA reconstruction.
2. **No hidden meaning.** Color, position, icon, emoji or motion never carries the only representation of state.
3. **Issue survives social failure.** Thread accessibility failures do not remove civic Issue content.
4. **Visible equals named.** The visible control label is included in its accessible name.
5. **Focus is intentional.** User action, not background refresh, determines focus movement.
6. **Localization is layout input.** Strings may expand, wrap and change grammatical shape.
7. **Errors stay local.** Recovery is attached to the affected control or region.
8. **No fake certainty.** Missing counts, authors, translations or alternative text are not invented.
9. **Equivalent paths.** Pointer, touch, keyboard and assistive technology reach the same outcome.
10. **Progressive enhancement.** The semantic reading order remains useful without advanced visual behavior.

## 5. Document and landmark structure

Every rendered route uses this landmark order where present:

1. skip link;
2. `header` with primary brand/navigation;
3. `nav` with an accessible name;
4. `main` with one route-level `h1`;
5. optional complementary left/right rails;
6. `footer`.

Rules:

- only one primary `main` landmark;
- every repeated `nav` or `aside` has a distinct localized accessible name;
- skip link targets the first stable main heading or feed container;
- DOM order follows reading order and does not depend on CSS column placement;
- desktop rails may visually flank the feed but do not precede it unpredictably in keyboard order;
- headings do not skip levels merely to achieve a visual size;
- component titles use the heading level appropriate to their route context, not a fixed level baked into the component.

### Recommended route outline

```text
h1 Board
  h2 Filters
  h2 Issues
    article: h3 Issue title
      h4 Discussion
  h2 My stories
```

The exact levels adapt when the same component is mounted in an Issue route or modal, while preserving a coherent hierarchy.

## 6. Page title and route announcements

The browser document title must identify route and node:

| Context | Pattern |
|---|---|
| Board | `{Board} — {Node} — DOGEstonia` |
| Issue | `{Issue title} — {Node} — DOGEstonia` |
| Verification return | `{Verification result} — DOGEstonia` |

On client-side route change:

- update `document.title`;
- move focus to the route heading only for true route navigation;
- do not move focus for filter refresh, reaction updates or background data refresh;
- announce a short route/result change when screen-reader context would otherwise be ambiguous.

## 7. Keyboard contract

### Global keys

| Key | Context | Required result |
|---|---|---|
| `Tab` / `Shift+Tab` | Global | Move through interactive elements in DOM order |
| `Enter` | Link/button | Activate native action |
| `Space` | Button/toggle | Activate without scrolling page |
| `Escape` | Transient surface | Close topmost dismissible surface |
| Arrow keys | Tabs/radio/segmented control | Follow the chosen native/APG pattern |
| `Home` / `End` | Tabs where implemented | Move to first/last tab |
| `Ctrl/Cmd+Enter` | Multiline composer | Submit valid draft |
| `Enter` | Multiline composer | Insert line break |

Rules:

- no positive `tabindex`;
- no generic `div`/`span` click targets;
- no keyboard trap outside an intentional modal dialog;
- card title/open action is a real link or button;
- nested post actions do not activate the card;
- hover and long press are accelerators only;
- drag gestures always have button/keyboard alternatives;
- browser and assistive-technology shortcuts are not intercepted.

## 8. Focus visibility and focus order

### Focus indicator

Every keyboard-focusable control has a visible `:focus-visible` state.

Required geometry:

- minimum 2 CSS px ring;
- minimum 2 CSS px offset where geometry permits;
- ring is not clipped by `overflow:hidden`;
- focused element remains visible beneath sticky header, composer and bottom navigation;
- focus styling does not depend only on color change inside the control.

### Required token corrections

The current Design Tokens v1.0 contains two light-theme combinations that do not meet the intended accessibility use:

| Existing token/use | Current value | Measured issue | Required implementation override |
|---|---:|---|---|
| `color.semantic.border.focus` on light surfaces | `#D99A00` | approximately 2.27–2.45:1 against page/white | use `#B54708` or another verified ≥3:1 ring color |
| `color.semantic.text.muted` for 12–14 px text on light surfaces | `#7A7D86` | approximately 4.11:1 on white | use `#667085` for normal-size metadata |

The dark focus token `#F5C542` remains suitable on the canonical dark surfaces. If a focus ring may cross an unknown or multicolored background, use a two-color inner/outer ring so at least one boundary remains perceivable.

These overrides are normative for implementation until folded into a future Design Tokens revision.

### Focus movement

- modal opens: focus moves inside;
- modal closes: focus returns to exact trigger when it still exists;
- inline disclosure opens: focus stays on disclosure control unless the user explicitly requested a child action;
- comment submit success: focus may move to the new comment only when necessary to confirm placement;
- errors are announced without moving focus unless the error cannot otherwise be found;
- background refresh never resets focus;
- virtualized/remounted elements preserve logical focus or move to a documented safe fallback.

## 9. Contrast and non-color meaning

### Minimum ratios

| Content | Minimum |
|---|---:|
| Normal text | 4.5:1 |
| Large text | 3:1 |
| Essential icons/control boundaries/focus indicators | 3:1 against adjacent color |
| Decorative graphics | No ratio requirement, but must not communicate state alone |

Large text follows WCAG sizing/weight definitions; component names such as `heading` do not automatically qualify.

### State redundancy

| State | Required non-color signal |
|---|---|
| Selected filter/reaction | text/state plus `aria-pressed`, checked or selected semantics |
| Error | error copy and association, not red border alone |
| Success | success copy/state, not green alone |
| Status | localized text label, not colored dot alone |
| Map selection | selected marker shape/state plus accessible selected-Issue summary |
| Verification | localized `Verified` text; no method disclosure |
| Disabled | semantic disabled state and explanatory copy when needed |

### Forced colors and high contrast

- preserve native control boundaries in `forced-colors` mode;
- do not suppress system focus outlines without a verified replacement;
- icons using current color remain visible;
- selected and error states retain text/semantic distinctions;
- background images and shadows are never required to perceive control boundaries.

## 10. Text sizing, zoom, spacing and reflow

The application must remain operable with:

- browser text resized to 200%;
- page zoom at 400%;
- a 320 CSS px wide reflow viewport;
- user text-spacing overrides;
- system font substitution or increased default font size.

Required behavior:

- no horizontal page scrolling at 320 CSS px, except an intentionally two-dimensional map surface;
- the map has a complete non-map Issue list alternative;
- sticky regions do not leave too little usable viewport;
- controls wrap or stack rather than shrink below readable/target sizes;
- no essential text is clipped;
- no fixed-height text containers unless content is explicitly scrollable and labelled;
- `line-height` has no unit where practical;
- layout survives letter spacing `0.12em`, word spacing `0.16em`, line height `1.5`, and paragraph spacing `2em` without loss of content/function;
- `rem`/relative units are used for typography and scalable spacing.

## 11. Pointer and touch targets

WCAG 2.2 AA requires a 24 by 24 CSS px target or an applicable spacing/exception condition. DOGEstonia uses a stronger product target:

| Context | Product target |
|---|---:|
| Standard touch action | 44 × 44 CSS px |
| Primary mobile action | 48 × 48 CSS px |
| Desktop compact icon action | visible glyph may be smaller; hit area remains at least 32 px and WCAG spacing passes |

Rules:

- adjacent reaction/comment/share actions have distinct hit areas;
- chips never rely on tiny close icons without expanded hit regions;
- pin selection has a list alternative;
- drag-to-dismiss is never the only dismissal method;
- map pan/zoom does not block page zoom;
- target enlargement does not create overlapping activation areas.

## 12. Motion, animation and timing

Honor `prefers-reduced-motion: reduce`.

Reduced-motion behavior:

- remove sheet and dialog transforms;
- replace spatial transitions with near-instant opacity/state changes;
- disable parallax and decorative continuous motion;
- replace shimmer with a static skeleton or restrained opacity change;
- preserve focus movement and announcements;
- never use motion as the only explanation of hierarchy or completion.

No civic action uses a time limit by default. If a future session/security timeout is introduced, it requires warning and extension behavior outside this package.

## 13. Semantic post/feed structure

Each `BoardIssuePost` is an `article` or list item containing an article, labelled by its Issue title.

Preferred default:

- semantic list of articles for the current finite result set;
- use native headings/links/buttons;
- expose type, status and metadata as text;
- keep actions inside the article but outside the heading link.

Do not apply ARIA `feed` merely because the UI resembles a social feed. The APG feed pattern establishes additional keyboard and assistive-technology behavior and is appropriate only if infinite loading/virtualization is deliberately implemented and tested.

### Post action row

Each action has localized visible text or an accessible name:

- React;
- Comment;
- Share;
- optional overflow.

Counts are included in accessible names only when authoritative. A zero is not announced if the visual design intentionally omits it.

## 14. Issue card and Issue detail

### Accessible structure

| Region | Semantic requirement |
|---|---|
| Title | Heading containing a real open link/button |
| Summary/description | Paragraph structure; no forced single-line truncation |
| Status/type | Text label; list/group semantics when multiple |
| Labels | List or grouped text, not unlabelled decorative pills |
| Date | Semantic `time` with machine-readable ISO value when available |
| Location | Text group with localized label |
| Media | Alternative text policy in §27 |
| Additional details | Named section/disclosure when data exists |

### Long content

- title wraps without ellipsis;
- feed summary may use approved clamp only with an explicit open/expand path;
- detail text is not clamped;
- labels wrap as a group;
- canonical dotted paths use `overflow-wrap:anywhere` when visible in diagnostic annotations only;
- full accessible text is not placed only in a hover tooltip.

## 15. Filters, search and view controls

### Filter panel

- use a named form/region;
- every input has a persistent label;
- groups use `fieldset`/`legend` or equivalent semantic grouping;
- selected chips expose pressed/checked state;
- removing a chip has a specific accessible name such as `Remove filter: District — Kesklinn`;
- Clear all identifies its scope;
- active-filter count is announced only after a committed change.

### Search

- visible label or programmatic label remains stable;
- loading/status text uses a polite live region;
- suggestions, if added, follow a real combobox pattern;
- placeholder is never the only label;
- because the reviewed API has no server text-search contract, the control must not falsely announce authoritative search results until that product/API decision is resolved.

### List/Map toggle

Implement as a labelled two-option control with clear selected state. Native radio buttons or an APG-compliant tab/segmented pattern are acceptable; behavior must match the chosen semantics.

- `List` is the complete accessible result representation;
- `Map` is unavailable when no current Issue has both numeric coordinates;
- disabled state includes helper copy;
- partial-map helper is associated with the Map option;
- switching views does not discard filters or move focus unpredictably.

## 16. Map accessibility

The map never replaces the list as the only way to access an Issue.

Required:

- every pin corresponds to an Issue available in the list;
- pin controls have an accessible name derived from public Issue/location data;
- selecting a pin updates a nearby accessible summary;
- selected pin state is programmatically exposed;
- zoom/pan controls are keyboard-operable and named;
- instructions do not depend on gestures alone;
- map canvas may scroll/pan in two dimensions, but the surrounding page still reflows;
- no street-level/private geo is exposed beyond the approved allowlist;
- subset copy such as `3 of 7 Issues shown on map` is announced once when it changes, not on every pin movement.

## 17. Modal Issue overlay

Desktop Issue overlay follows the modal dialog pattern.

Required:

- `dialog` element or `role="dialog"` with `aria-modal="true"`;
- localized accessible name from visible title;
- background is inert while open;
- focus moves into the dialog;
- `Tab` and `Shift+Tab` remain inside;
- visible Close button is always available;
- `Escape` closes only when dismissal is safe;
- focus returns to the feed trigger;
- page scroll position is restored;
- only one internal dialog scroll owner;
- sticky close/header/composer never obscures focused content.

Mobile full-screen sheet uses the same dialog semantics and state contract. Visual presentation does not create a second product language.

## 18. Disclosure and progressive content

Use the disclosure pattern for:

- collapsed thread summary;
- Show more Issue copy;
- collapsed reply branches;
- many-leaf schema overlay;
- optional detailed errors.

The control exposes:

- `aria-expanded`;
- an accessible name describing the content;
- optional `aria-controls` when stable and useful;
- Enter/Space activation.

Collapsed content is removed from the accessibility tree. Do not leave visually hidden focusable descendants.

## 19. Comment tree semantics

Preferred structure:

- a named Discussion section;
- nested ordered/unordered lists for parent-child relationships;
- each comment is a list item or article-like region;
- visual indentation is not the sole parent/child signal;
- reply context is available in text/accessible description;
- collapsed replies expose count and expanded state.

### Current API limitation

The reviewed tree response does not contain author, timestamp, attachment refs, deletion or moderation states. The UI must not invent them.

Until author data exists:

- do not render fake avatar/name;
- use a neutral comment structure;
- reply action is named `Reply to comment`, not `Reply to {person}`;
- demo-only author fixtures remain isolated from production adapters.

Comment ordering is also unspecified. Do not announce `Newest`, `Most relevant` or chronological meaning without a confirmed contract.

## 20. Composer accessibility

The composer contains:

- persistent localized label;
- multiline text input;
- reply-context region when replying;
- attachment action only when capability is available;
- submit button;
- inline status/error region.

Rules:

- placeholder supplements but never replaces the label;
- draft text is not announced on each keystroke;
- reply context includes a Cancel reply action;
- submit-disabled reason is discoverable;
- submission sets busy/pending state without destroying the draft;
- error text is programmatically associated with the field/action;
- `Ctrl/Cmd+Enter` submits; Enter inserts a line break;
- mobile composer remains above the software keyboard;
- global bottom navigation hides while the keyboard owns the composer;
- keyboard dismissal never submits or clears content;
- no character limit/count is shown until the API defines one.

## 21. Reaction strip and picker

### Compact strip

- aggregate is a button only if it opens distribution details;
- React is a separate button/toggle;
- visible text remains primary;
- emoji/icon is decorative or has an empty alternative when the text already names the reaction;
- current actor selection is represented by `aria-pressed` or checked semantics;
- saving state remains understandable without color or animation.

### Picker

The picker has a localized name and three labelled groups:

- Emotional;
- Epistemic;
- Moderation.

Each option exposes localized label, selected state and disabled/unavailable state. Reaction ids are never the user-facing label.

Rules:

- enabled ids are intersected with the approved `reactions.v1` catalog;
- moderation group is absent/unavailable on thread root;
- `agree` and `disagree` exclusion is announced when one replaces the other;
- capacity hint uses localized plural-aware copy;
- reaching the maximum is announced once;
- full catalog is not an emoji-only toolbar;
- desktop hover-open always has click and keyboard equivalents;
- mobile long-press always has an explicit button equivalent.

## 22. Reaction distribution

When actor data becomes available, the full dialog/sheet requires:

- accessible title with authoritative total;
- All tab plus enabled reaction-id tabs with localized labels;
- tablist semantics and keyboard behavior;
- person rows with name, self state and optional Connect action;
- reaction badge described through text, not emoji alone;
- loading, empty and error states per tab;
- focus return to aggregate trigger.

Current Threads API exposes aggregates but no people. Therefore actor rows, `You` and `Connect` are accessibility-blocked as well as data-blocked. Do not synthesize anonymous rows from counts.

## 23. Attachments

### Composer

- attach control identifies accepted types in user language;
- each pending item has name/type/status and Remove action;
- per-item failure is associated with that item;
- attach denial does not clear comment text;
- no control offers to disable the legal/safety floor.

### Published attachment

An image/file requires:

- resolvable safe source;
- media type;
- accessible name or alternative text policy;
- open/download action with type/size when available;
- visible and announced error state if unavailable.

The current API can bind an attachment ref but cannot read it back or resolve it. Published comment media is blocked until that contract exists.

## 24. Verification and authentication

The write gate uses opaque `verified` language. Result chrome never exposes phone/eID or another method.

Accessibility requirements:

- unverified write attempt explains why the action is blocked;
- Verify is a real link/button to the existing `/verify` flow;
- return context includes Issue, thread, reply target and draft intent;
- no automatic resubmission after return;
- success is announced and focus returns to the intended composer/action;
- verification/authentication must allow password managers, paste and assistive technology;
- no cognitive-function puzzle is the only authentication path;
- OTP/code inputs, if used by the existing Verify product, support paste and semantic autocomplete;
- errors identify the affected field and recovery action.

The current Threads `403` does not distinguish unverified identity from Identity service failure. Automatic redirect on every `403` remains blocked by `DUI-Q07` in the Data-to-UI Contract.

## 25. Loading, empty, error and status announcements

### Live-region policy

| Event | Announcement mode | Focus move |
|---|---|---|
| Initial region loading | Usually none or one polite status after delay | No |
| Results updated | Polite, only after committed user action | No |
| Thread unavailable | Polite; persistent inline error | No |
| Comment posted | Polite success | Optional new-comment focus only by rule |
| Comment failed | Assertive only if immediate action required; persistent inline error | Usually no |
| Attachment denied | Polite/inline, tied to item | No |
| Reaction selected/removed | State change on control; additional polite copy only when needed | No |
| Agree/disagree replacement | Polite concise explanation | No |
| Verification success | Polite | Return to intended target |
| Offline/recovered | Polite and deduplicated | No |
| Destructive/critical failure | Alert/dialog only when interruption is justified | Defined by modal rule |

Rules:

- do not announce every skeleton row;
- do not announce background count churn;
- live-region nodes remain stable so updates are detected;
- persistent recovery copy remains visible when action is required;
- toast never contains the only actionable information;
- toast does not steal focus;
- interactive toast pauses timeout on hover and focus.

## 26. Accessible names and descriptions inventory

| Control | Accessible-name pattern |
|---|---|
| Logo/home | `DOGEstonia home` |
| Node switcher | `Active node: {nodeName}` |
| Open Issue | `{Issue title}` or `Open Issue: {Issue title}` |
| More actions | `More actions for {Issue title}` |
| React | `React to {target}`; selected state separate |
| Reaction aggregate | `View {count, plural, ...} on {target}` |
| Comment | `Comment on {Issue title}` |
| Reply | `Reply to comment` or author-specific when real author exists |
| Share | `Share {Issue title}` |
| Map pin | `{Issue title}, {public location}` |
| Remove filter | `Remove filter: {filterLabel} — {value}` |
| Remove attachment | `Remove attachment: {filename}` |
| Close overlay | `Close {dialogTitle}` |
| Language selector | `Language` plus selected language |

Visible localized text must be contained in the accessible name. Do not create English-only `aria-label` values for ET/RU pages.

## 27. Images, icons and illustrations

### Decision tree

| Asset | Alternative treatment |
|---|---|
| Functional icon with visible text | Decorative icon; text names action |
| Icon-only button | Localized accessible name on button |
| Decorative Doge/ornament | Empty `alt` / hidden from accessibility tree |
| Informative Issue image | Localized/appropriate alt from authoritative content source |
| Image already fully described by adjacent copy | Empty alt when no additional information is added |
| Complex civic diagram | Short alt plus nearby long text description |
| User/comment image | Author-provided or moderation-approved alt policy required |

Never put functional copy only inside an image. Logo asset retains the accessible brand name on its link; internal decorative text paths are not separately exposed.

### Current data blockers

Gateway exposes image transaction/hash metadata but no renderable URL or alt contract. Threads exposes no attachment read data. Informative media must not ship with guessed alternative text such as a filename or hash.

## 28. Language model and tags

### Supported tags

Use BCP 47 language tags:

| Product language | Tag | Direction |
|---|---|---|
| Estonian | `et` | LTR |
| Russian | `ru` | LTR |
| English | `en` | LTR |

Set the active application language on `<html lang="…">`. When a visible fragment is known to be in another language, wrap it with the appropriate `lang` value.

`original_locale[]` on an Issue identifies known source-story languages; it does not automatically determine the language of every displayed field.

### Language names in selector

Show languages in their own language:

- Eesti;
- Русский;
- English.

The selected state must be programmatic and visible. A flag is not a language label.

### Locale-selection precedence

The application needs one documented precedence rule across routes. For implementation handoff, use:

1. explicit signed-in user preference when available;
2. explicit anonymous session preference;
3. supported browser language match;
4. node/application default.

The exact Uus Veerenni node default must remain configurable rather than hard-coded into reusable components.

## 29. Translation key architecture

Use stable semantic keys, not English source strings.

Recommended namespaces:

```text
shell.*
nav.*
board.*
filters.*
issue.*
schemaRuntime.cardField.*
thread.*
comment.*
composer.*
reaction.layer.*
reaction.id.*
attachment.*
verify.*
profile.*
storyActivity.*
status.*
error.*
a11y.*
date.*
```

Examples:

```text
board.view.list
board.view.map
board.mapSubset
thread.discussionUnavailable
comment.replyToComment
reaction.layer.emotional
reaction.id.acknowledge
schemaRuntime.cardField.signals.desired_outcome
a11y.openIssue
```

Rules:

- keys describe meaning, not current wording;
- no concatenation of translated fragments;
- interpolation variables are named semantically;
- HTML is not embedded in translator strings unless the i18n framework provides safe rich-text placeholders;
- component names, route names and backend ids are not used as visible untranslated fallback copy;
- ARIA/accessibility strings live in the same localization system as visible UI.

## 30. Message formatting and plurals

Use ICU-style messages or an equivalent plural/select system.

Required plural behavior:

| Locale | Categories relevant to cardinal UI copy |
|---|---|
| `et` | `one`, `other` |
| `en` | `one`, `other` |
| `ru` | `one`, `few`, `many`, `other` |

Do not construct messages as `{count} + translated noun`.

Conceptual examples:

```text
commentsCount(count)
reactionsCount(count)
mapSubset(mapped, total)
selectedReactions(selected, maximum)
replyCount(count)
```

Counts are announced only when authoritative under the Data-to-UI Contract.

## 31. Dates, times and numbers

Use platform internationalization APIs or an equivalent CLDR-backed library:

- `Intl.DateTimeFormat`;
- `Intl.RelativeTimeFormat`;
- `Intl.NumberFormat`;
- `Intl.PluralRules` or ICU messages.

Rules:

- API timestamps remain ISO/UTC in data state;
- Uus Veerenni civic display uses the node time zone `Europe/Tallinn` unless the product explicitly labels viewer-local time;
- full machine-readable value remains in semantic `time` metadata;
- avoid ambiguous numeric-only dates in critical contexts;
- relative dates have an accessible absolute date in text or description;
- relative time refresh does not generate repeated live announcements;
- decimal/group separators follow locale;
- counts use tabular numerals visually where they update in place;
- do not abbreviate small civic counts into `1.2K` unless the exact value remains available and abbreviation policy is approved.

## 32. Source language and translation indication

Issue fields contain ET/RU/EN values and may include `original_locale[]`.

Rules:

- show the active locale value;
- if active locale is absent from `original_locale[]`, translation indication may be shown using localized copy;
- do not claim which source is definitive when several original locales exist;
- `See original` is not implemented unless the API identifies and supplies the original text;
- machine-translated and human-authored text must not be inferred from string comparison;
- comments currently have only `body` and no language metadata, so automatic `See translation` controls are unsupported.

## 33. Canonical labels and missing translations

Backend ids remain stable and untranslated:

- Issue type ids;
- status ids;
- canonical labels;
- reaction ids;
- dotted schema paths.

Visible copy comes from localization mappings.

### Missing-key behavior

1. Try active locale.
2. Use an approved human-readable fallback mapping where one exists.
3. If no mapping exists, show a deterministic safely humanized canonical key only when hiding it would remove necessary meaning.
4. Report the canonical `label_key` and locale through the existing anonymous label-miss telemetry contract.
5. Never include user text, Issue content, session identifiers or PII in telemetry.

Client telemetry should be deduplicated to avoid repeated reports of the same key/locale during one session. The API currently documents no rate limit, so the client must not create a request storm.

## 34. Localization content rules

### Tone

Across all languages, copy is:

- civic and direct;
- calm rather than bureaucratic;
- honest about unavailable functionality;
- non-gamified;
- method-opaque for verification;
- clear about partial map/thread data;
- free of invented authority or certainty.

### Language-specific resilience

| Locale | Design concern | Required handling |
|---|---|---|
| Estonian | Long compound words | wrap naturally; permit safe overflow breaking only as last resort |
| Russian | Longer labels and complex plural forms | allocate expansion; use plural engine; avoid narrow fixed buttons |
| English | Often shorter source copy | never optimize fixed widths only around English |

### Capitalization

- sentence case is default for controls and headings;
- do not apply CSS uppercase to translated sentences;
- preserve canonical brand spelling `DOGEstonia`;
- backend enum casing never leaks into user copy.

## 35. Content expansion and truncation

Test every component with at least 30–40% string expansion and long unbroken tokens.

| Content | Rule |
|---|---|
| Issue title | Full wrap |
| Detail description | Full wrap |
| Feed summary | Optional approved clamp plus explicit open path |
| Navigation drawer | Up to two lines |
| Mobile bottom navigation | Approved short locale label; one line |
| Filter chips | Wrap/scroll group; text remains readable |
| Reaction tabs | Horizontal scroll rather than tiny text |
| Person name | One-line ellipsis; full name available programmatically |
| Comment body | Full wrap |
| Error message | Full wrap |
| Button label | Prefer wrap/width growth; do not ellipsize primary actions |
| Dotted path | `overflow-wrap:anywhere` |
| URL | Safe break without page overflow |

Tooltip-only full text is not an acceptable mobile or screen-reader strategy.

## 36. Responsive accessibility

### 320–767 CSS px

- one primary content column;
- full-screen dialog/sheet presentation;
- bottom navigation and composer include safe areas;
- focus remains above software keyboard;
- no hover dependency;
- actions retain visible labels where space permits;
- icon-only fallback requires a localized accessible name and must not obscure meaning.

### 768–1199 CSS px

- drawers/sheets remain keyboard and screen-reader operable;
- column reduction does not reorder semantics;
- no off-screen focus in hidden rails.

### 1200+ CSS px

- side rails do not become independent keyboard-scroll traps;
- centered modal remains within zoomed viewport;
- line lengths remain readable;
- pointer affordances retain keyboard parity.

Orientation is never locked. Landscape mobile remains usable with condensed chrome.

## 37. Component accessibility matrix

| Component | Role/semantics | State exposed | Keyboard | Announcement |
|---|---|---|---|---|
| `AppHeader` | banner/nav | active node/route | natural tab | route change only |
| `LanguageSelector` | button + listbox/menu or native select | selected language | chosen standard pattern | language change once |
| `FilterPanel` | named form/region | values/errors | native controls | committed result update |
| `ViewToggle` | radio/tab/segmented semantic | selected List/Map | arrows or native radio | view and subset helper |
| `BoardIssuePost` | article | civic status/thread state | links/buttons | no background-count noise |
| `IssueCardChrome` | labelled article content | type/status | natural | none |
| `SchemaCardOverlay` | named section/disclosure | expanded | Enter/Space | optional concise state |
| `IssueThreadBlock` | named section | loading/empty/populated/error | natural | load/unavailable once |
| `CommentItem` | nested list item | expanded/reactions | natural | branch change if requested |
| `ThreadComposer` | labelled form | dirty/submitting/error | Ctrl/Cmd+Enter | submit result |
| `ReactionStrip` | group of buttons | selected/count | natural | state change |
| `ReactionPicker` | popover/dialog + grouped toggles | selected/disabled/capacity | Tab/arrows by chosen pattern | exclusions/capacity |
| `ReactionsDialog` | dialog + tabs/list | selected tab/load state | APG dialog/tabs | result state |
| `MapPanel` | named region | selected Issue | named controls | subset/selection summary |
| `IssueOverlay` | modal dialog | open/busy | trap/Escape | title/context |
| `Toast` | status/alert as appropriate | message | only if interactive | deduplicated |
| `VerifyGate` | inline message/dialog | blocked/returned | link/button | success/failure |

## 38. Accessible state mapping

Every visual state needs a programmatic equivalent.

| State family | Programmatic expression |
|---|---|
| loading | stable status text; optional `aria-busy` on affected region |
| empty | visible heading/copy; not conveyed as blank space |
| unavailable | persistent error text and retry where meaningful |
| selected | native checked/selected or `aria-pressed` |
| expanded | `aria-expanded` on controlling button |
| disabled | native `disabled` or justified `aria-disabled` with guarded activation |
| invalid | `aria-invalid` plus associated message |
| required | native `required`/semantic indication plus visible copy |
| current route | `aria-current="page"` |
| current step | `aria-current="step"` when applicable |
| busy mutation | disabled/deduplicated action plus scoped status |
| stale/offline | visible localized copy and region status |

Do not add ARIA where native HTML already supplies the correct semantics.

## 39. Accessibility behavior for unavailable APIs

The following approved visuals cannot be made truthfully accessible with the reviewed API data:

| Feature | Missing data | Accessibility consequence |
|---|---|---|
| Informative Issue media | renderable URL + alt policy | no truthful accessible image |
| Schema overlay | `schema_card` + localized field labels | section remains absent |
| Authored comment row | author/name/avatar/time | no person/time announcement |
| Comment attachment | read/ref resolution + alt/name | no accessible media/file row |
| Reaction people | actor list/profile/mark | no accessible distribution list |
| Connect | identity/relationship capability | no actionable person control |
| Relevant/newest sort | ordering/timestamps | no truthful sort label |
| Verify-specific redirect | stable reason discriminator | generic `403` cannot announce unverified state with certainty |

The implementation must use the simpler accessible state rather than fill these gaps with demo content.

## 40. Localization state model

| State | Required behavior |
|---|---|
| locale loading | retain current readable UI; do not blank page |
| locale ready | update visible and accessible strings together |
| missing UI key | deterministic fallback + diagnostic |
| missing canonical label | safe humanization + deduplicated label-miss telemetry |
| malformed i18n Issue field | scoped content fallback/error; never raw object |
| unsupported locale | choose documented supported fallback; preserve user control |
| language changed in modal | keep modal open and focus stable |
| language changed with dirty draft | preserve draft verbatim |
| mixed-language user content | tag only when language is known; do not guess per sentence |

## 41. Translation workflow

1. Product writes source intent, context and variables.
2. Keys are added with screenshots/component references.
3. ET/RU/EN translations are reviewed by fluent humans for public release.
4. Pseudo-localization runs before visual QA.
5. All themes and critical viewports are captured.
6. Screen-reader strings are reviewed with visible copy, not separately at the end.
7. Missing-key telemetry informs backlog; it does not silently mutate production wording.
8. Translation changes are versioned with the component/state they affect.

Translator context includes:

- where the string appears;
- whether it is a button, heading, status or announcement;
- variable meanings and sample values;
- maximum constraints only when genuinely unavoidable;
- tone and civic meaning;
- whether text is visible, screen-reader-only or both.

## 42. Pseudo-localization requirements

Maintain at least two pseudo locales in development:

| Pseudo locale | Purpose |
|---|---|
| Expanded Latin | 30–40% expansion, accents and brackets; catches clipping/hard-coded strings |
| Stress/unbroken | long words/ids; catches overflow and fixed-width assumptions |

Optional future RTL pseudo-locale is encouraged for component robustness even though RTL is outside current ET/RU/EN release scope.

Pseudo-localization must cover:

- visible copy;
- accessible names;
- validation messages;
- toast/live-region text;
- document titles;
- empty/loading/error states;
- plural messages with representative counts.

## 43. Required language fixtures

### Estonian

- long compound Issue title;
- district/settlement with diacritics;
- one and multiple comment/reaction counts;
- translated-status indication;
- long attachment denial.

### Russian

- counts `1`, `2`, `5`, `11`, `21`, `22`, `25`;
- expanded button and filter labels;
- long multiline comment;
- verification error and return success;
- mixed Cyrillic/Latin canonical label fallback.

### English

- baseline compact labels;
- singular/plural counts;
- long civic institution name;
- partial-map helper;
- error recovery copy.

### Cross-language

- current locale differs from `original_locale[]`;
- user comment language differs from UI language;
- node and person names use mixed scripts;
- missing localization key;
- long URL and dotted schema path;
- no date/media/geo optional fields.

## 44. Assistive-technology test matrix

### Minimum release matrix

| Platform | Browser | Assistive technology | Scope |
|---|---|---|---|
| Windows | Firefox | NVDA current stable | Full critical journeys |
| Windows | Chrome | NVDA current stable | Core controls/dialog/thread |
| macOS | Safari | VoiceOver current OS | Full critical journeys |
| iOS | Safari | VoiceOver current OS | Mobile board/overlay/composer |
| Android | Chrome | TalkBack current OS | Mobile board/overlay/composer |
| Desktop | Chrome/Firefox/Safari | Keyboard only | All functionality |
| Desktop | Supported browsers | 200% text / 400% zoom | Reflow and sticky regions |
| OS high contrast | Supported browser | Forced colors | Controls, focus and states |

Record exact OS/browser/AT versions in each QA run. “Current stable” is a test-policy placeholder, not a reproducibility record.

## 45. Automated checks

Recommended implementation gates:

- semantic linting such as `eslint-plugin-jsx-a11y`;
- axe-based component and route checks;
- automated contrast checks against both themes;
- Storybook interaction tests for focus/open/close/state;
- DOM tests for names, roles, descriptions and live regions;
- translation-key completeness across ET/RU/EN;
- pseudo-localization screenshot tests;
- viewport visual regression at 1440, 1280, 1024, 768, 390, 360 and 320 CSS px;
- no untranslated-key regex in production output;
- no horizontal page overflow at reflow acceptance widths.

Automated checks do not replace keyboard, zoom or screen-reader testing.

## 46. Required manual journeys

### Journey A — browse and open Issue

1. Skip to main content.
2. Navigate filters and switch List/Map.
3. Open an Issue from mid-feed.
4. Verify modal name, focus trap and reading order.
5. Close with button and Escape.
6. Confirm exact focus and scroll restoration.

### Journey B — read discussion

1. Reach thread after civic Issue content.
2. Distinguish loading, empty, populated and unavailable states.
3. Expand/collapse replies.
4. Navigate nested comments without relying on indentation.
5. Open reaction picker and return focus.

### Journey C — comment and verification

1. Enter multiline draft.
2. Attempt write while unverified.
3. Follow existing Verify handoff only when stable signal exists.
4. Return with draft/context preserved.
5. Submit explicitly.
6. Hear success/error without duplicate commit.

### Journey D — localization stress

1. Switch ET → RU → EN inside board.
2. Keep filters, modal and draft state.
3. Verify document and fragment language.
4. Exercise Russian plural fixtures.
5. Confirm no overlap at 320 CSS px and 400% zoom.

### Journey E — errors and recovery

1. Load Issue successfully while thread fails.
2. Retry only the thread.
3. Trigger attachment denial without losing text.
4. Trigger reaction failure and retain last confirmed state.
5. Confirm toast/status does not steal focus.

## 47. Storybook accessibility stories

Every applicable component includes:

- keyboard-only interaction story;
- focus-visible story in light/dark;
- 200% text/long localization story;
- reduced-motion story;
- forced-colors story where meaningful;
- loading/empty/error/disabled states;
- accessible-name assertion;
- screen-reader status story for async controls;
- 320 px narrow story;
- ET/RU/EN variants.

Critical composed stories:

- BoardIssuePost civic-only and thread unavailable;
- populated nested discussion;
- max-depth comment;
- composer dirty/submitting/error;
- reaction picker with groups and exclusion;
- Issue modal focus lifecycle;
- map partial/ineligible;
- verification blocked/return.

## 48. QA evidence format

For every failed/passed accessibility case record:

| Field | Required value |
|---|---|
| Case ID | Stable `A11Y-*` or `L10N-*` id |
| Route/component | Exact mount |
| State | Unified State Inventory id |
| Locale/theme | `et`/`ru`/`en`; light/dark |
| Viewport | CSS width × height; zoom/text setting |
| Input/AT | keyboard, NVDA, VoiceOver, TalkBack, pointer |
| Expected | Observable acceptance result |
| Actual | Observable result |
| Evidence | Screenshot/video/accessibility-tree excerpt as appropriate |
| Severity | blocker, major, minor |
| Owner | design, frontend, API, content/localization |

Do not close a defect solely because an automated score improved.

## 49. Release severity model

| Severity | Examples | Release rule |
|---|---|---|
| Blocker | primary action impossible by keyboard/AT; focus trapped; Issue content inaccessible; language switch breaks route | Must fix before release |
| Major | incorrect dialog semantics; missing control name; unreadable contrast; composer obscured; wrong plural changes meaning | Must fix before public pilot unless formally waived with accessible alternative |
| Minor | redundant announcement; nonessential wording/context imperfection; decorative inconsistency | Backlog with owner/date |

Missing API data that makes an approved surface dishonest is a product/API blocker, not a reason to fake accessible content.

## 50. Open questions

These questions require explicit product/content decisions; no answer is inferred here.

| ID | Question | Impact |
|---|---|---|
| `A11Y-L10N-Q01` | What is the configured default language for the Uus Veerenni node before a user/browser preference is known? | Initial locale and document language |
| `A11Y-L10N-Q02` | Who owns final fluent review for Estonian, Russian and English public copy? | Release quality and civic meaning |
| `A11Y-L10N-Q03` | Should translated Issue content display a persistent badge, inline note or only an on-demand explanation? | `original_locale[]` presentation |
| `A11Y-L10N-Q04` | Will informative Issue/comment media receive author-provided alt, editorial alt, or adjacent-description treatment? | Media release gate |
| `A11Y-L10N-Q05` | Will civic timestamps always display in node time (`Europe/Tallinn`) or in viewer-local time with an explicit zone? | Date/time interpretation |
| `A11Y-L10N-Q06` | Is a formal public accessibility statement required for the pilot, and who owns its feedback channel? | EU/public-sector handoff readiness |
| `A11Y-L10N-Q07` | Are there approved short labels for 320 px bottom navigation in every locale? | Mobile fit without icon-only degradation |
| `A11Y-L10N-Q08` | When comment authors become available, which name/avatar fields are public and what fallback identity is permitted? | Comment accessible names and reply context |
| `A11Y-L10N-Q09` | Does the product want an explicit High Contrast theme, or only OS forced-colors compatibility? | Theme scope |
| `A11Y-L10N-Q10` | Which supported browser/OS versions define the pilot acceptance matrix? | Reproducible QA boundary |

API-dependent questions `DUI-Q02–Q10`, `DUI-Q14` and `DUI-Q22–Q24` from the Data-to-UI Contract remain relevant and are not duplicated as decisions here.

## 51. Definition of Done

The package is implemented when:

- [ ] WCAG 2.2 AA acceptance is part of release criteria.
- [ ] Light/dark focus and small metadata contrast pass the required ratios.
- [ ] All routes have coherent landmarks, titles and heading hierarchy.
- [ ] Skip link reaches stable main content.
- [ ] Every action is operable by keyboard without pointer-specific dependency.
- [ ] Focus is visible, not obscured and correctly restored.
- [ ] Modal/sheet behavior matches the dialog pattern.
- [ ] 320 CSS px, 200% text and 400% zoom retain all critical functionality.
- [ ] Touch targets meet DOGEstonia 44/48 px product targets.
- [ ] Reduced motion preserves meaning and focus behavior.
- [ ] Issue list is a complete accessible alternative to the map.
- [ ] Issue/thread fail-soft states are independently accessible.
- [ ] Comments expose tree/reply relations without relying only on indentation.
- [ ] Composer errors are associated and drafts survive recovery.
- [ ] Reaction groups use localized text and programmatic selected state.
- [ ] Moderation reactions remain unavailable on thread root.
- [ ] Live announcements are useful, scoped and non-repetitive.
- [ ] Informative images have authoritative alternatives or remain blocked.
- [ ] `<html lang>` updates correctly for ET/RU/EN.
- [ ] Visible and accessibility-only strings use the same localization system.
- [ ] Russian plurals pass representative count fixtures.
- [ ] Dates/numbers use locale-aware formatting and the agreed time-zone policy.
- [ ] Pseudo-localization passes all critical components and viewports.
- [ ] Minimum AT/browser matrix passes critical journeys.
- [ ] Automated and manual evidence is stored with stable case IDs.
- [ ] Remaining open questions have owners and are not hidden by placeholder content.

## 52. Handoff conclusion

The approved DOGEstonia design can meet a strong WCAG 2.2 AA implementation baseline without losing its Facebook-familiar layout or civic identity.

The main design-system correction is limited and concrete: dark mode is already strong, while light mode needs a darker focus ring and darker small metadata text. The larger accessibility blockers are data-contract gaps—authors, timestamps, readable attachments, reaction people and media alternatives—not visual styling.

Implementation should build the semantic civic/thread skeleton first, keep advanced social surfaces behind real data contracts, and validate every critical journey in ET, RU and EN across keyboard, zoom and representative screen readers.
