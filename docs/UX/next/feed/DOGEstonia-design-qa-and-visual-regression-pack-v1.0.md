# DOGEstonia — Design QA & Visual Regression Pack v1.0

**Status:** implementation handoff baseline  
**Scope:** public `/board`, `/issue/:id`, Issue overlays, threads, reactions, map, verification handoff, responsive shell  
**Platforms:** responsive web / React.js  
**Themes:** light and dark  
**Locales:** Estonian, Russian, English, pseudo-localized test locale  
**Date:** 2026-10-06

## 1. Purpose

This package defines how the approved DOGEstonia UX is verified during React implementation and protected against unintended visual change.

It provides:

- a deterministic baseline strategy;
- canonical viewports and fixtures;
- component and route screenshot coverage;
- mismatch and severity rules;
- responsive, theme and localization coverage;
- accessibility-linked visual checks;
- baseline review and release gates;
- evidence and ownership requirements.

This is a QA contract, not frontend test code and not permission to redesign approved surfaces.

## 2. Source-of-truth order

When references disagree, use this order:

1. approved product and UX requirements;
2. `DOGEstonia-unified-state-inventory-v1.0.md`;
3. component, interaction, responsive, accessibility and data contracts;
4. design tokens and layout dimensions;
5. Asset Manifest for asset readiness and provenance;
6. latest approved mockup for visual composition;
7. earlier mockups and third-party screenshots as non-authoritative references.

Written dimensions and semantic rules override measurements inferred from generated images.

## 3. Quality model

Design QA has five independent layers:

| Layer | Question | Evidence |
|---|---|---|
| Semantic | Is the correct product state shown? | state/fixture assertion, DOM/accessibility tree |
| Structural | Are the right components present in the right hierarchy? | component/route test |
| Geometric | Do size, spacing, reflow and overlay rules match? | screenshot + measured boxes |
| Visual | Do typography, tokens, borders, icons and assets match? | deterministic visual diff |
| Behavioral | Does interaction lead to the correct next state without losing context? | interaction/e2e evidence |

A visually similar screen can still fail semantic or behavioral QA. A pixel difference can be acceptable only after its cause is understood and approved.

## 4. Baseline doctrine

### 4.1 What becomes a baseline

The initial visual baseline is captured from an implemented Storybook story or deterministic route after:

1. required state semantics pass;
2. fixture data is stable and contract-valid;
3. layout/token review passes;
4. assets used by the state are approved or explicitly marked test-only;
5. the product/design owner signs off the rendered result.

Generated mockup pixels are not imported as screenshot goldens. They remain composition references.

### 4.2 Two baseline layers

| Layer | Purpose | Typical capture |
|---|---|---|
| Component baseline | isolate variants, states and responsive component behavior | Storybook component/region screenshot |
| Route baseline | verify shell, rails, feed, overlays and cross-component composition | deterministic `/board` or `/issue/:id` screenshot |

Component baselines diagnose local regressions. Route baselines catch integration and layout regressions. Neither replaces the other.

### 4.3 Baseline immutability

- baselines are versioned with the implementation;
- a failed diff is investigated before any baseline update;
- bulk “update all snapshots” is forbidden as a fix;
- each accepted baseline change names the state ID, reason and approving owner;
- a new intentional design version creates a reviewed baseline revision;
- obsolete baselines are removed only when the underlying state is explicitly retired.

## 5. Deterministic capture environment

The primary baseline runner must pin:

| Variable | Required value/policy |
|---|---|
| Browser | one pinned Chromium build for authoritative pixel diffs |
| OS/container | one pinned CI image |
| Device scale factor | `1` for canonical baselines |
| Font | approved Inter files loaded and awaited; system fallback must fail setup |
| Clock | frozen; default test instant `2026-10-06T09:00:00Z` |
| Civic timezone | `Europe/Tallinn` until product decides otherwise |
| Network | deterministic mocked fixtures; no production APIs |
| Animations | disabled or advanced to stable final frame |
| Caret | hidden for screenshots unless caret behavior is the subject |
| Scrollbars | stable configured behavior; no host-dependent overlay scrollbar changes |
| Color scheme | explicitly set per test, never inherited from CI host |
| Locale | explicitly set per case |
| Randomness | fixed seed; generated IDs and avatar colors deterministic |

Firefox and WebKit receive cross-browser structural/behavior checks and selected screenshots, but they do not share Chromium pixel baselines. Their support versions remain an explicit product decision.

## 6. Canonical viewport matrix

| ID | CSS viewport | Role | Priority |
|---|---:|---|---:|
| `VP-DESKTOP-WIDE` | 1600×1000 | capped three-column canvas | P1 |
| `VP-DESKTOP` | 1440×1024 | canonical three-column desktop | P0 |
| `VP-DESKTOP-COMPACT` | 1200×900 | smallest canonical three-column region | P1 |
| `VP-TABLET-LANDSCAPE` | 1024×768 | two-column boundary; right rail removed | P0 |
| `VP-TABLET-PORTRAIT` | 768×1024 | single centered column | P0 |
| `VP-WIDE-MOBILE` | 480×900 | wide single-column / popover-sheet boundary | P1 |
| `VP-MOBILE-PRIMARY` | 390×844 | primary mobile acceptance frame | P0 |
| `VP-MOBILE-COMPACT` | 360×800 | compact Android-like frame | P0 |
| `VP-REFLOW-MIN` | 320×700 | minimum reflow/accessibility boundary | P0 |

Component-only captures may use documented component widths such as 824 px for an Issue card, 560 px for the reactions dialog, 360 px for a reaction picker and 320 px for an all-reactors popover.

## 7. Responsive invariants

The following are zero-tolerance acceptance requirements:

- 1440 px shows three columns without page-level horizontal scroll; feed is at least 640 px;
- at 1024 px the fixed right rail is absent and the feed remains readable;
- at 768 px and below, neither rail reserves horizontal space;
- at 320 px there is no page-level horizontal scroll, except intentional interaction inside the map canvas;
- post action labels remain visible at 360/390 px; icons alone are not the default;
- three visual comment depths remain legible at 320 px;
- mobile overlays use sheets and fit within `100dvh`;
- the software keyboard does not cover the focused composer or its primary action;
- bottom navigation does not cover feed content, sheets or composer;
- light/dark switching does not change geometry or hierarchy.

## 8. Test fixture policy

Canonical fixture IDs come from the Unified State Inventory and must be shared by Storybook, route tests and design review.

| Fixture | Purpose |
|---|---|
| `FX-ISSUE-CIVIC` | civic Issue without schema/media |
| `FX-ISSUE-MEDIA` | Issue with one deterministic approved test image |
| `FX-ISSUE-LONG` | long ET/RU/EN title, summary and labels |
| `FX-SCHEMA-3` | three allowed dotted-path leaves |
| `FX-SCHEMA-MANY` | overflow/progressive disclosure |
| `FX-GEO-0OF5` | map-ineligible result set |
| `FX-GEO-3OF7` | partial map subset |
| `FX-THREAD-0` | loaded empty thread |
| `FX-THREAD-6` | populated tree with three visual depths |
| `FX-THREAD-MEDIA` | comment attachment presentation, contract-gated |
| `FX-THREAD-UNAVAILABLE` | Issue loads, social layer fails |
| `FX-REACTIONS-MIXED` | enabled `reactions.v1` examples |
| `FX-REACTIONS-MAX` | selection capacity reached |
| `FX-USER-ANONYMOUS` | no session |
| `FX-USER-UNVERIFIED` | authenticated, opaque verified=false |
| `FX-USER-VERIFIED` | authenticated, opaque verified=true |
| `FX-ATTACH-DENIED` | media floor denies attachment |
| `FX-POST-FAIL` | recoverable comment submission failure |
| `FX-LOCALE-ET` | long Estonian compounds |
| `FX-LOCALE-RU` | expanded Russian labels/plurals |
| `FX-VIEWPORT-320` | minimum-width content stress |

Fixture rules:

- no random names, dates, counts, avatars or images;
- no real resident PII;
- no production API dependency;
- loading/error states never contain fake social content;
- fields absent from the approved API contract are marked prototype-only and cannot validate production readiness;
- test images are deterministic, rights-cleared and excluded from the runtime product bundle unless separately approved;
- schema examples use only approved dotted paths;
- list/map fixtures preserve the same query/result identity.

## 9. Capture naming and metadata

Recommended case ID:

```text
DQA-{surface}-{state}-{viewport}-{theme}-{locale}
```

Example:

```text
DQA-board-THR-P-D-1440-dark-et
```

Every captured case records:

- stable case ID;
- state ID and fixture ID;
- route/story name;
- viewport and device scale;
- theme and locale;
- identity/write capability;
- browser/build identifiers;
- baseline revision;
- expected semantic assertions;
- approved masking regions;
- owner and last approval date.

## 10. Component-level baseline suite

### 10.1 Public shell and navigation

| Case | State | Widths/themes | Acceptance focus |
|---|---|---|---|
| `DQA-C01` | desktop public header | 1440 light/dark | 64 px height, logo asset, active nav, utilities |
| `DQA-C02` | authenticated left rail | 1440 light/dark | profile, verified marker, My Stories access |
| `DQA-C03` | mobile app bar | 390/320 light/dark | square mark, node title, 44 px targets |
| `DQA-C04` | mobile bottom nav | 390/360/320 light/dark | labels, safe area, selected state |
| `DQA-C05` | filters/search active | 1440/390 light/dark | visible controls, no layout jump |

### 10.2 Issue card and schema overlay

| Case | State | Fixture | Widths |
|---|---|---|---|
| `DQA-C10` | `ISSUE-CARD-BASE` | `FX-ISSUE-CIVIC` | 824, 390, 320 |
| `DQA-C11` | `ISSUE-CARD-MEDIA` | `FX-ISSUE-MEDIA` | 824, 390 |
| `DQA-C12` | `ISSUE-CARD-NO-MEDIA` | `FX-ISSUE-CIVIC` | 824, 390 |
| `DQA-C13` | `ISSUE-CARD-LONG-CONTENT` | `FX-ISSUE-LONG` | 824, 390, 320 |
| `DQA-C14` | `SSR-C-civic` | no `schema_card` | 824, 390 |
| `DQA-C15` | `SSR-C-overlay-compact` | `FX-SCHEMA-3` | 824, 390 |
| `DQA-C16` | `SSR-C-overlay-detail` | `FX-SCHEMA-3` | detail width, 390 |
| `DQA-C17` | `SSR-C-many` | `FX-SCHEMA-MANY` | 824, 320 |

Zero-tolerance semantic checks:

- no empty `Additional details` chrome;
- no raw JSON, bind/hash or non-allowlisted geo;
- civic Issue identity remains primary;
- dotted paths map only to approved localized labels.

### 10.3 Post/thread shell

| Case | State | Fixture | Widths/themes |
|---|---|---|---|
| `DQA-C20` | `THR-P-A` loading | deterministic loading | 824/390 light/dark |
| `DQA-C21` | `THR-P-B` empty | `FX-THREAD-0` | 824/390 light/dark |
| `DQA-C22` | `THR-P-C` populated | `FX-THREAD-6` | 824/390 light/dark |
| `DQA-C23` | `THR-P-D` unavailable | `FX-THREAD-UNAVAILABLE` | 824/390 light/dark |
| `DQA-C24` | `THR-P-E` narrow | populated | 320 light/dark |

The Issue card must remain readable and structurally unchanged in every thread state.

### 10.4 Comment tree, composer and attachments

| Case | State | Widths | Acceptance focus |
|---|---|---|---|
| `DQA-C30` | `THR-T-A` nested | 824/390/320 | legible parent/child relations |
| `DQA-C31` | `THR-T-B` max depth | 824/320 | no deeper indentation/reply affordance |
| `DQA-C32` | `THR-T-C` reply composer | 824/390 | reply context and cancel action |
| `DQA-C33` | collapsed replies | 390/320 | count and expand affordance |
| `DQA-C34` | branch loading/error | 824/390 | only affected branch changes |
| `DQA-C35` | deleted/moderated tombstone | 824/390 | structure preserved; no sensitive leakage |
| `DQA-C36` | `THR-T-D` attach allowed | 824/390 | attach action/ref chip |
| `DQA-C37` | `THR-T-E` attach denied | 824/390 | honest message; no bypass |
| `DQA-C38` | `THR-T-F` post error | 824/390 | draft retained; visible retry/error |
| `DQA-C39` | keyboard-open composer | 390/360 | focused controls above keyboard |

Comment media cases remain blocked as production acceptance until attachment read/resolution data exists. A prototype fixture may verify layout only and must be labeled as such.

### 10.5 Reactions

| Case | State | Presentation | Themes |
|---|---|---|---|
| `DQA-C40` | `THR-R-A` aggregate | feed strip | light/dark |
| `DQA-C41` | strip empty/loading/error | feed strip | light/dark |
| `DQA-C42` | `THR-R-B/C` picker groups | 360 px popover | light/dark |
| `DQA-C43` | `THR-R-E` mobile picker | bottom sheet 390 | light/dark |
| `DQA-C44` | `THR-R-F` focus path | popover/sheet | light/dark |
| `DQA-C45` | `THR-R-G` exclusion | picker | light/dark |
| `DQA-C46` | capacity reached | picker | light/dark |
| `DQA-C47` | save error | picker/strip | light/dark |
| `DQA-C48` | all-reactors popover | 320 px / mobile sheet | light/dark |
| `DQA-C49` | distribution dialog | 560 px / mobile sheet | light/dark |

Zero-tolerance rules:

- all three layer labels appear where eligible;
- moderation is absent/unavailable on thread root;
- `agree` and `disagree` cannot remain selected together;
- localized text is primary; no unlabelled emoji soup;
- reaction marker overlays avatar; it is not the right-side row action;
- `Connect` appears only in the full distribution context approved for it.

### 10.6 Map, verification and escalation

| Case | State | View | Acceptance focus |
|---|---|---|---|
| `DQA-C50` | `SSR-M-list` | 1440/390 | full current result set |
| `DQA-C51` | `SSR-M-map` | 1440/390 | eligible pins only |
| `DQA-C52` | `SSR-M-ineligible` | 1440/390 | no enabled empty map |
| `DQA-C53` | `SSR-M-partial` | 1440/390 | subset explanation |
| `DQA-C54` | selected pin | 1440/390 | public fields only; mobile preview sheet |
| `DQA-C55` | map error | 1440/390 | list and filters remain usable |
| `DQA-C56` | `THR-E-A/B/C` | post/thread chrome | non-dead feedback; no workflow invention |
| `DQA-C57` | `THR-V-A/B` | 390 | write blocked; existing `/verify` handoff |
| `DQA-C58` | `THR-V-C/D` | 390 | opaque verified result; method hidden |

## 11. Route-level baseline suite

| Case | Route/state | Viewport | Theme/locale | Critical composition |
|---|---|---:|---|---|
| `DQA-R01` | `/board`, populated list | 1440 | light/et | header + 3 columns + full feed |
| `DQA-R02` | `/board`, populated list | 1440 | dark/et | identical geometry |
| `DQA-R03` | `/board`, populated | 1024 | light/en | two-column boundary |
| `DQA-R04` | `/board`, populated | 768 | light/et | centered single column |
| `DQA-R05` | `/board`, populated | 390 | light/et | app bar, feed, bottom nav |
| `DQA-R06` | `/board`, populated | 320 | dark/ru | minimum reflow, short labels |
| `DQA-R07` | `/board`, filtered zero | 1440/390 | light/et | filters retained, honest zero result |
| `DQA-R08` | `/board`, query error | 1440/390 | dark/en | shell/toolbar retained, retry visible |
| `DQA-R09` | `/board`, stale/retrying | 1440/390 | light/et | cached content stays readable |
| `DQA-R10` | `/board`, map partial | 1440/390 | light/et | same filters; map subset |
| `DQA-R11` | Issue overlay populated | 1440 | light/et | centered modal, underlying feed stable |
| `DQA-R12` | Issue overlay + reaction dialog | 1440 | dark/ru | correct layering and one dialog focus scope |
| `DQA-R13` | Issue sheet populated | 390/320 | light/et | full-screen sheet + safe areas |
| `DQA-R14` | `/issue/:id`, populated | 1440/390 | light/en | civic detail + shared thread component |
| `DQA-R15` | `/issue/:id`, thread unavailable | 1440/390 | dark/et | detail remains intact |
| `DQA-R16` | `/issue/:id`, not found/error | 390 | light/ru | terminal copy, retry/board return |

## 12. Minimum release visual matrix

The full Cartesian product is unnecessary. Use pairwise coverage plus the following critical combinations:

| Scenario | Viewports | Themes | Locales | Identity |
|---|---|---|---|---|
| Populated feed | 1440, 1024, 768, 390, 320 | light + dark | ET + RU pairwise; EN smoke | verified |
| Thread unavailable | 1440, 390 | light + dark | ET/EN | verified |
| Expanded max-depth thread | 1440, 390, 320 | light; dark at 390 | ET/RU | verified |
| Reaction picker | 1440, 390 | light + dark | ET/RU/EN pairwise | verified |
| Reaction distribution | 1440, 390 | light + dark | ET/RU | verified |
| Verify gate/return | 390 | light + dark | ET/RU | unverified → verified |
| Schema many | 824 component, 320 page | light + dark | ET/RU | verified |
| Map partial/ineligible | 1440, 390 | light + dark | ET/EN | verified |
| Long localization | 390, 320 | light + dark | ET + RU + pseudo | verified |
| Composer keyboard | 390, 360 | light + dark | ET/RU | verified/unverified pairwise |

## 13. Localization visual QA

All critical surfaces are tested with:

- Estonian as civic primary content;
- Russian for expansion, plural and long-label pressure;
- English as third production locale;
- pseudo-localization at approximately 30–40% expansion with visible delimiters.

Checks:

- no text/icon collision;
- no silent ellipsis on civic title or critical error copy;
- tabs/chips scroll or wrap according to spec;
- bottom navigation uses approved short labels only at the defined boundary;
- reaction layer labels remain visible;
- dates/numbers do not change component geometry unexpectedly;
- Cyrillic and Estonian diacritics are not clipped;
- locale change does not reset filters, route or draft.

## 14. Theme visual QA

Every P0 component must prove:

- identical geometry between light and dark;
- correct semantic token mapping;
- visible borders between nested dark surfaces;
- light-theme focus uses the approved darker focus token;
- small metadata uses approved contrast-safe values;
- selected state uses more than color;
- images are not globally recolored;
- logo variant is correct for its surface;
- icon masters use `currentColor` where specified;
- reaction accents remain secondary to labels.

Raw brand primitives must not replace semantic component tokens.

## 15. Overlay and layering QA

Required stacking order:

1. page/feed;
2. fixed public header/navigation;
3. Issue modal/sheet and scrim;
4. popover/picker owned by the active context;
5. full reactions dialog where invoked;
6. toast/live feedback.

Checks:

- opening an overlay causes no feed layout shift;
- body scroll locks only while appropriate;
- one intentional scroll container is visible inside modal/sheet;
- close/back remains reachable at all sizes;
- popover does not clip outside viewport;
- mobile bottom sheet respects safe area and `dvh`;
- closing restores focus and feed scroll position;
- no overlay is positioned by hard-coded page coordinates.

## 16. Dynamic content and masking policy

Masking is allowed only for unavoidable non-determinism, and every mask is documented per case.

Acceptable candidates:

- third-party map tile pixels while DOGEstonia frame, pins and callouts remain testable;
- browser-controlled media playback surface when not under product control;
- temporary caret when the caret itself is irrelevant.

Do not mask:

- text, controls, focus rings, errors or counts;
- whole cards, dialogs or thread regions;
- timestamps that can be frozen;
- avatars/images that can use deterministic test fixtures;
- map pins or popup placement;
- loading indicators;
- any area merely because it is flaky.

If an area cannot be deterministic, fix the fixture/environment before increasing masks.

## 17. Pixel-diff policy

Recommended initial automation thresholds in the pinned environment:

| Capture | Pixel color threshold | Maximum differing-pixel ratio | Rule |
|---|---:|---:|---|
| Isolated component | 0.10 | 0.0005 (0.05%) | fail and review |
| Full route | 0.10 | 0.0015 (0.15%) | fail and review |
| Icon size test | 0.05 | 0 | exact within renderer |
| Masked map/media route | 0.10 | 0.0015 outside masks | masks cannot expand silently |

These numbers are triage thresholds, not automatic acceptance. Any semantic, missing-element, overflow, clipping, focus, contrast or one-pixel critical-boundary defect fails even below the ratio.

Cross-platform antialiasing is handled by pinning the capture environment—not by continually increasing thresholds.

## 18. Geometric tolerances

| Property | Tolerance | Notes |
|---|---:|---|
| Canonical shell/header height | 0–1 CSS px | persistent difference requires fix/review |
| Card/dialog width and grid tracks | 1 CSS px | must not cross responsive boundary |
| Standard spacing/radius | 1 CSS px | compare to tokens/spec |
| Text baseline/wrapping | no line-count change unless content requires it | font must be loaded |
| Icon optical alignment | 1 CSS px visual allowance | SVG viewBox remains exact |
| Touch target | no negative tolerance | never below required size |
| Page horizontal overflow | 0 px | zero tolerance |
| Overlay clipping | 0 px for required controls/content | zero tolerance |

## 19. Non-pixel assertions

Each screenshot case must pair with relevant assertions so that a stable-looking wrong state cannot pass.

Examples:

- `board-issue-post` and `issue-thread-block` exist at their expected boundary;
- list count includes coordinate-less Issues;
- map pins contain only lat+lon eligible Issues;
- no `Additional details` heading when `schema_card` is absent;
- moderation group absent on thread root;
- verification result contains no method name;
- failed social request does not remove Issue title/body;
- post error retains draft;
- attach denial exposes no legal-floor bypass;
- Escalation activation produces visible feedback;
- dialog has the correct role/name and focus containment;
- accessible names exist for icon-only controls.

## 20. Forbidden-state regression cases

The suite must explicitly prove absence of:

| ID | Forbidden outcome |
|---|---|
| `FORBID-FAKE-SOCIAL` | fake comments/reactions in loading or failure |
| `FORBID-EMPTY-SCHEMA` | empty Additional details shell |
| `FORBID-RAW-PAYLOAD` | raw JSON, structured payload or bind/hash fields |
| `FORBID-EMPTY-MAP` | enabled empty map with zero eligible Issues |
| `FORBID-VERIFY-INLINE` | duplicated verification form in thread |
| `FORBID-METHOD-LEAK` | phone/eID method in success chrome |
| `FORBID-MOD-ROOT` | moderation reactions on thread root |
| `FORBID-LEGAL-BYPASS` | control disabling the legal media floor |
| `FORBID-DEAD-ESCALATE` | silent escalation no-op |
| `FORBID-REACTION-SOUP` | unlabelled emoji-only picker |
| `FORBID-PARALLEL-SOCIAL-CARD` | social card replacing civic Issue identity |
| `FORBID-MOBILE-FORK` | different mobile product semantics |

Any occurrence is at least Major; privacy/safety or inaccessible critical-flow cases are Blockers.

## 21. Accessibility-linked visual checks

Visual QA complements but does not replace semantic accessibility testing.

Required captures/checks:

- visible keyboard focus on every interactive component family;
- focus not obscured by sticky header, composer or bottom navigation;
- 200% text and 400% zoom critical-path views;
- 320 CSS px reflow;
- forced-colors compatibility spot check;
- reduced-motion stable end state;
- 44 px preferred touch targets on mobile;
- error and selected states understandable without color;
- informative images have authoritative alternatives or remain blocked;
- map has complete list alternative;
- comment hierarchy is not conveyed by indentation alone.

Automated accessibility output belongs beside, not inside, visual-diff approval.

## 22. Behavioral evidence journeys

### `JOURNEY-BOARD-01` — filter and view preservation

1. Open populated `/board` list.
2. Apply filter/search.
3. Switch to map when eligible.
4. Select a pin and open Issue.
5. Close overlay.

Expected: same query drives list/map, filters remain visible, map is an explicit subset, feed position returns.

### `JOURNEY-THREAD-01` — fail-soft discussion

1. Load Issue card.
2. Let thread request fail.
3. Retry thread.

Expected: civic Issue never disappears; only thread region changes.

### `JOURNEY-WRITE-01` — verify-before-write

1. Type a comment as unverified user.
2. Attempt submit.
3. Continue to existing `/verify`.
4. Complete opaque verification.
5. Return to origin.

Expected: draft and origin preserved; result says verified without method disclosure.

### `JOURNEY-REACTION-01` — reaction constraints

1. Open picker.
2. Select `agree`.
3. Select `disagree`.
4. Reach maximum selection count.
5. Simulate save failure.

Expected: mutual exclusion; capacity hint; confirmed state restored on failure.

### `JOURNEY-COMPOSER-01` — attachment/post recovery

1. Enter text.
2. Add or attempt attachment.
3. Trigger attachment denial or post failure.
4. Retry or remove failed item.

Expected: text and unaffected attachment intent survive; denial is explicit; no legal-floor bypass.

## 23. Severity and release policy

| Severity | Examples | Release rule |
|---|---|---|
| Blocker | Issue unreadable; critical action impossible; privacy/safety leak; raw protected payload; focus trap; verification method disclosure; legal-floor bypass | must fix before release |
| Major | wrong responsive composition; missing/extra product action; overlap/clipping; incorrect state; broken theme contrast; draft lost; enabled empty map; fake social content | must fix before public pilot unless explicitly waived by product/design/accessibility owner |
| Minor | isolated 1–2 px spacing/optical drift; nonessential decorative inconsistency without usability impact | may enter backlog with owner and target date |
| Note | intentional difference awaiting baseline approval | not a defect until decision; cannot silently update baseline |

Data-contract gaps that make an approved surface dishonest are blockers for that surface, not permission to invent fixture-shaped production UI.

## 24. Diff triage workflow

1. Confirm the same state, fixture, viewport, theme and locale were captured.
2. Rule out environment/font/clock instability.
3. Classify the diff: semantic, structural, geometric, visual, asset, content/data or environment.
4. Compare against written specifications and latest approved visual.
5. Decide:
   - fix implementation;
   - approve intentional design change;
   - update fixture because contract changed;
   - quarantine only with owner, issue and expiry.
6. Re-run the isolated component and affected route cases.
7. Update baselines only after explicit approval.

Never solve a mismatch by broadening threshold or mask before identifying its cause.

## 25. Baseline change request

Every intentional update records:

| Field | Required |
|---|---|
| State/case IDs | yes |
| Before/after evidence | yes |
| Product/design reason | yes |
| Spec/token/asset revision | yes, where affected |
| Responsive/theme/locale impact | yes |
| Accessibility impact | yes |
| Approver | yes |
| Baseline revision/date | yes |

Changes to shared primitives require reviewing every consuming component, not only the initiating screen.

## 26. CI gates

### Pull request

- deterministic component screenshots for changed components;
- affected route screenshots;
- semantic assertions;
- automated accessibility smoke for changed surfaces;
- visual diff report with no unreviewed P0/P1 mismatch;
- fixture/schema validation.

### Main branch/nightly

- full P0 matrix;
- selected P1 responsive cases;
- light/dark and locale pairwise matrix;
- critical behavioral journeys;
- cross-browser structural smoke;
- flake report.

### Release candidate

- complete minimum release matrix;
- manual design review at 1440, 1024, 768, 390, 360 and 320;
- keyboard/zoom/AT checks from Accessibility Pack;
- asset/license readiness review;
- open data-contract blockers explicitly accepted or gated off;
- no expired quarantine.

## 27. Flake and quarantine policy

- a test is not “flaky” until the nondeterministic cause is demonstrated;
- first response is to stabilize clock, font, animation, fixture, request and layout;
- quarantine requires issue ID, owner, scope, reason and expiry date;
- quarantined cases still run and report;
- no critical journey or forbidden-state test may be quarantined for release;
- repeated screenshot retry may diagnose infrastructure but must not hide the first failure;
- target visual-suite flake rate is below 0.5% across stable CI runs.

## 28. Evidence storage

Recommended artifact structure:

```text
design-qa/
  baselines/
    components/
    routes/
  current/
  diffs/
  reports/
    visual/
    accessibility/
    journeys/
  manifests/
    cases.json
    environment.json
  approvals/
```

Store screenshots in source control or an approved visual-test service according to repository policy. Do not store real user data, credentials, signed media URLs or production responses in QA artifacts.

## 29. Ownership

| Responsibility | Primary owner |
|---|---|
| State/semantic correctness | product + UX |
| Visual sign-off | design/product owner |
| Fixture correctness | frontend + API owner |
| Test implementation/stability | frontend/QA |
| Accessibility evidence | frontend/QA + accessibility reviewer |
| Asset provenance | design ops/product owner |
| Baseline approval | designated design/product reviewer |
| Release exception | product owner with affected specialist |

The implementer who produces a visual change may explain it, but intentional shared-system changes require independent approval.

## 30. Open decisions

No decision below is inferred by this package.

| ID | Question | Impact |
|---|---|---|
| `DQA-Q01` | Which browser/OS versions define the public pilot support matrix? | cross-browser release scope |
| `DQA-Q02` | Which CI visual service or repository-native runner will own baselines and review UI? | storage and approval workflow |
| `DQA-Q03` | Who is the named final visual approver? | baseline governance |
| `DQA-Q04` | Is the right rail content approved for the first pilot, or should it remain a deterministic placeholder/module boundary? | route baselines |
| `DQA-Q05` | Which Issue/node images are rights-cleared for deterministic visual fixtures? | media baselines |
| `DQA-Q06` | Which exact icon-system revision becomes the first approved baseline? | glyph diffs |
| `DQA-Q07` | What is the final default locale and civic timestamp policy? | deterministic text/date captures |
| `DQA-Q08` | Are comment media and reactor-person surfaces gated off until API contracts exist, or released from another approved source? | testable production scope |
| `DQA-Q09` | Is OS forced-colors support sufficient, or is a separate high-contrast theme required? | theme matrix |
| `DQA-Q10` | What release-waiver process is permitted for Major findings? | pilot governance |

## 31. Release checklist

### Setup

- [ ] Browser, environment, fonts, clock, timezone and DPR are pinned.
- [ ] Fixtures are deterministic, contract-valid and contain no PII.
- [ ] Every story declares state, fixture, viewport, theme and locale.
- [ ] Initial baselines have explicit design approval.

### Components

- [ ] Civic Issue identity survives every thread state.
- [ ] Schema overlay never renders empty/raw/private content.
- [ ] Comment depth and composer work at 320 px.
- [ ] Reactions preserve layers, labels, constraints and context eligibility.
- [ ] Map eligibility and subset semantics are visible.
- [ ] Verification remains redirect-based and method-opaque.
- [ ] Escalation always provides visible feedback.

### Responsive/theme/localization

- [ ] Canonical 1440/1024/768/390/360/320 views pass.
- [ ] No unintended page-level horizontal scrolling.
- [ ] Light/dark geometry is identical.
- [ ] ET/RU/EN and pseudo-localization do not overlap controls.
- [ ] Overlays fit viewport and safe areas.
- [ ] Keyboard does not cover composer.

### Accessibility/safety

- [ ] Focus captures and keyboard journeys pass.
- [ ] 200% text, 400% zoom and 320 px reflow pass.
- [ ] Errors/selection do not rely only on color.
- [ ] Informative media has authoritative alternatives or remains gated.
- [ ] No forbidden state is present.

### Governance

- [ ] No unexplained visual diff remains.
- [ ] No baseline was bulk-updated without review.
- [ ] Quarantines have owners and have not expired.
- [ ] Blockers and Majors are fixed or formally resolved under policy.
- [ ] Evidence and approvals are stored with stable case IDs.

## 32. Definition of done

The Design QA & Visual Regression Pack is implemented when:

1. deterministic component and route baselines cover the P0 matrix;
2. every canonical state family is linked to at least one case and fixture;
3. critical responsive boundaries, themes and locales are covered pairwise;
4. visual captures are paired with semantic assertions;
5. forbidden states are tested by absence, not only by visual inspection;
6. baseline updates require explicit, traceable approval;
7. CI blocks unreviewed critical diffs;
8. critical journeys preserve query, scroll, draft, focus and fail-soft behavior;
9. accessibility-linked views pass the separate Accessibility Pack criteria;
10. unresolved API/asset/product decisions are visible gates rather than invented content.

## 33. Handoff conclusion

This pack turns the DOGEstonia design system into a controlled regression boundary without treating generated mockups as brittle pixel truth. It protects the civic Issue identity, familiar post/thread rhythm, fail-soft behavior, responsive composition and light/dark/localized presentation while allowing intentional evolution through reviewed baseline changes.

The immediate implementation sequence is:

1. build deterministic fixtures and Storybook state stories;
2. approve calibration baselines at 1440, 390 and 320;
3. add route-level `/board` and `/issue/:id` captures;
4. connect semantic, accessibility and behavioral assertions;
5. expand to the full release matrix and enforce reviewed diffs in CI.
