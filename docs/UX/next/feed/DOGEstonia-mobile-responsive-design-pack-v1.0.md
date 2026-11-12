# DOGEstonia Mobile Responsive Design Pack v1.0

**Surface:** `/board`, Issue modal, shared `IssueThreadBlock`  
**Target:** responsive React.js web application  
**Primary mobile frame:** 390 × 844 CSS px  
**Theme:** light geometry; identical structure for dark theme  
**Status:** implementation handoff

## 1. Purpose

This package defines how the approved DOGEstonia desktop dashboard becomes a coherent mobile and tablet experience without creating a separate mobile product language.

The same objects remain primary:

- Issue is the civic post;
- `BoardIssuePost` wraps existing Issue chrome;
- `IssueThreadBlock` sits beneath the Issue in the feed and in Issue detail;
- reaction, verification, attachment and escalation behavior remains shared;
- mobile changes placement and presentation, not product meaning.

Related sources of truth:

- `DOGEstonia-dashboard-layout-spec-v1.0.md`;
- `DOGEstonia-design-tokens-package-v1.0.md`;
- latest approved mockup revision for each thread/reaction state.

## 2. Canonical frames

| Frame | Purpose | Required |
|---|---|---:|
| 390 × 844 | Primary mobile design and acceptance frame | Yes |
| 360 × 800 | Compact Android-like width | Yes |
| 320 × 700 | Reflow/accessibility boundary | Yes |
| 768 × 1024 | Tablet portrait | Yes |
| 1024 × 768 | Tablet landscape / two-column boundary | Yes |

These are QA frames, not device detection rules. Implementation responds to available width and capabilities.

## 3. Responsive modes

| Mode | Width | Structure |
|---|---:|---|
| Compact mobile | 320–479 px | One feed column; mobile app bar; bottom navigation; overlays become sheets |
| Wide mobile / narrow tablet | 480–767 px | One centered feed column; wider media and dialogs |
| Tablet portrait | 768–1023 px | One centered content column, max 760 px; optional contextual modules after feed |
| Tablet landscape | 1024–1199 px | Left rail may appear; right rail remains out of the fixed grid |
| Desktop | ≥1200 px | Existing three-column dashboard |

## 4. Mobile application shell

### 4.1 Top app bar

Height: **56 px** plus device safe-area inset.

| Region | Geometry | Contents |
|---|---|---|
| Leading | 44 × 44 px target | DOGEstonia square mark / navigation drawer trigger |
| Context | Flexible, min-width 0 | Active node: `Uus Veerenni`; truncates to one line |
| Search | 44 × 44 px target | Opens mobile search/filter surface |
| Notifications/profile | 44 × 44 px target | One visible action; remainder in account menu |

Rules:

- header remains sticky at the top;
- do not place the full horizontal desktop logo in the compact bar;
- active node is visible without opening navigation;
- language, theme, `How it works`, switch node and secondary account controls live in the drawer/account sheet;
- opening a drawer does not change feed scroll position.

### 4.2 Bottom navigation

Height: **64 px** plus `env(safe-area-inset-bottom)`.

Four destinations:

1. `Board`;
2. `My stories`;
3. `Tell a story` — primary yellow treatment;
4. `Profile`.

Rules:

- each item owns at least a 48 × 48 px target;
- icon and localized text remain visible at 360 and 390 px;
- at 320 px labels may use the shortest approved localization, but icons alone are not the default;
- bottom navigation hides while the software keyboard is open;
- full-screen Issue sheets use a contextual close/back header and may hide global bottom navigation;
- the primary action is visually stronger but must not become a floating engagement prompt.

### 4.3 Main content

| Width | Horizontal gutter | Card width |
|---|---:|---:|
| 390–479 px | 16 px | `100% - 32 px` |
| 360–389 px | 16 px | `100% - 32 px` |
| 320–359 px | 12 px | `100% - 24 px` |
| 480–767 px | 20 px | `100% - 40 px`, max 720 px |
| 768–1023 px | 24 px | max 760 px |

Page bottom padding must include bottom-navigation height and safe area.

## 5. Board header and filters

### 5.1 Mobile board header

- page title: 24/32 px;
- supporting sentence: 14/20 px, maximum 3 lines;
- top spacing after app bar: 16 px;
- bottom spacing before controls: 16 px.

### 5.2 Search and filter composition

Primary 390 px layout:

1. full-width search field, 44 px high;
2. filter chips in one horizontally scrollable row, 36 px high;
3. result-context copy on the left and `List | Map` segmented control on the right;
4. feed begins 16 px below.

Rules:

- chip row has 16 px edge padding matching the page gutter;
- horizontal chip overflow uses native scrolling and does not expose a tiny scrollbar;
- selected chip scrolls fully into view after programmatic selection;
- `List | Map` never moves into the filter drawer;
- active filters use visible chips plus a clear/reset affordance;
- search/filter state drives list and map identically.

## 6. Mobile `BoardIssuePost`

### 6.1 Card shell

| Property | 390/360 | 320 |
|---|---:|---:|
| Width | viewport minus 32 px | viewport minus 24 px |
| Radius | 10 px | 10 px |
| Border | 1 px | 1 px |
| Content padding | 16 px | 12 px |
| Card-to-card gap | 16 px | 12 px |

### 6.2 Civic identity

Order remains unchanged:

1. Issue identity/status/type;
2. location/date;
3. title;
4. summary;
5. labels / optional schema overlay;
6. `Open issue`.

Mobile geometry:

- civic icon/avatar: 40 px;
- identity gap: 12 px;
- overflow target: 44 × 44 px;
- Issue title: 18/24 px, 700;
- summary: 14/20 px;
- metadata: 12/16 or 13/18 px;
- long status/type labels wrap beneath Issue id rather than reducing type size;
- title and summary are never horizontally truncated.

### 6.3 Schema overlay

- follows civic fields under an `Additional details` section label;
- uses compact key/value rows;
- dotted-path id may appear as 11/16 monospace annotation in development/reference modes, not necessarily production UI;
- default visible maximum: 3 rows in feed;
- optional `Show more` reveals remaining rows in place;
- absent/empty `schema_card` produces no overlay chrome.

### 6.4 Media

- media may extend to the inner card edges, removing only the horizontal content inset around the image;
- preferred ratio: 4:3 on mobile when a 16:9 crop would lose civic context;
- supported range: 16:9 through 4:5;
- use intrinsic aspect ratio and `object-fit: cover` only when crop is editorially safe;
- single-image state has no carousel dots;
- attachment count/navigation appears only for real multiple attachments.

### 6.5 Action strip

Height: **52 px**.

Four equal zones:

- `React`;
- `Comment`;
- `Share`;
- reaction aggregate.

Rules:

- minimum target: 44 px;
- labels remain at 390/360 px;
- reaction catalog is not rendered permanently in the strip;
- aggregate shows compact top marks/count only when data exists;
- no data means no fake count;
- action strip remains visually attached to the Issue card.

### 6.6 Thread preview

- loading/empty/unavailable minimum height: 72 px;
- populated collapsed preview: 96–144 px;
- show discussion summary, reaction strip, composer affordance and escalation slot;
- `View discussion` opens the Issue sheet while preserving feed scroll position;
- social failure never hides or disables the civic Issue body.

## 7. Mobile Issue sheet

The desktop Issue modal becomes a full-screen mobile sheet.

| Property | Value |
|---|---|
| Width | 100vw |
| Height | 100dvh |
| Radius | 0 |
| Header | 56 px + top safe area |
| Body | one vertical scroll container |
| Composer | sticky to sheet bottom |
| Global bottom nav | hidden |

Header composition:

- back/close target 44 × 44 px;
- title `Issue` or shortened Issue title;
- overflow menu 44 × 44 px;
- no duplicate public-site navigation inside the sheet.

Reading order:

1. Issue civic identity;
2. full summary and labels;
3. optional schema overlay;
4. media/attachments;
5. compact Issue action strip;
6. discussion controls;
7. comment tree;
8. composer.

The sheet restores the originating feed position when dismissed.

## 8. Comment tree on mobile

| Element | Value |
|---|---:|
| Root avatar | 40 px |
| Reply avatar | 32 px |
| Avatar/body gap | 10 px |
| Comment gap | 16 px |
| Nesting indent | 24 px per level |
| Visual maximum | 3 levels |
| Action target | 44 × 44 px |

Rules:

- connection lines or indentation must preserve clear parent/child reading;
- at maximum depth, further replies remain at depth 3 and show reply context;
- no reply affordance that implies a deeper visual level;
- long names truncate on one line, but comment content wraps fully;
- comment action labels may collapse into an overflow menu only at 320 px;
- moderation actions remain unavailable on the thread root.

### 8.1 Comment attachment

- image/file is presented inside the comment body;
- maximum width is the available comment width;
- image radius: 8 px;
- file chip minimum height: 44 px;
- attachment opens in an accessible viewer/download path;
- denied attachment shows a visible inline explanation;
- no control exists to disable the legal media floor.

## 9. Composer and software keyboard

Collapsed composer:

- minimum height 72 px;
- avatar optional in compact mobile mode;
- text field, attach action and send action remain visible;
- reply context adds at least 40 px above the input;
- attachment chip adds the space required by its content.

Keyboard behavior:

- use dynamic viewport units;
- composer remains above the keyboard;
- global bottom navigation hides;
- modal body retains a single intentional scroll container;
- focused reply is scrolled into view without losing parent context;
- draft text remains if verification redirect or recoverable post error occurs;
- post failure is shown inline near composer, not as a disappearing toast only.

## 10. Reaction experiences

### 10.1 Compact picker

On mobile, open through an explicit `React` tap. Long press may be supported as a shortcut but must not be required.

- bottom sheet, maximum 70dvh;
- labelled groups: Emotional, Epistemic, Moderation;
- localized label is primary; icon/emoji is secondary;
- enabled ids only;
- moderation group hidden/unavailable on thread root;
- capacity hint: maximum configured selections, default 3;
- `agree` and `disagree` visibly exclude each other.

### 10.2 All-reactors list

- at ≥480 px it may remain a 320 px anchored popover if fully viewport-safe;
- below 480 px it becomes a compact bottom sheet;
- one combined people list across all reaction types;
- tiny reaction badge overlays the avatar;
- no tabs, counts by type, `Connect`, or row actions in this compact state.

### 10.3 Reactions distribution

- bottom sheet, maximum 88dvh;
- sticky 56 px title row;
- 48 px horizontally scrollable reaction tabs;
- people rows: 64 px;
- reaction marker remains on avatar;
- `Connect` is the optional right-side person action;
- user’s own row displays `You` rather than `Connect`.

## 11. Verification gate

When an unverified user attempts to comment, reply, react where gated, attach, or otherwise write:

1. preserve draft and origin context;
2. show a lightweight gate sheet;
3. provide a primary `Verify to continue` CTA;
4. redirect to existing `/verify`;
5. return to the same Issue/thread context;
6. show method-opaque `Verified` success chrome;
7. restore the pending composer/draft without automatic submission.

Do not embed phone/eID forms inside the thread.

## 12. Escalation stub

- compact secondary action inside `IssueThreadBlock`;
- does not compete with Comment/React;
- tap shows non-dead feedback: `Collaboration handoff isn’t connected yet`;
- may use a small modal sheet or toast;
- no queue, SLA, organization chart or invented workflow.

## 13. Mobile map state

Map mode is available only when at least one Issue in the current result set has numeric `geo.lat` and `geo.lon`.

Mobile composition:

1. sticky app bar;
2. compact active-filter summary;
3. `List | Map` control;
4. map canvas filling remaining viewport above bottom navigation;
5. selected Issue preview as a draggable-but-not-required bottom card.

Rules:

- map pins represent only coordinate-eligible Issues;
- helper copy explains partial result sets;
- zero eligible Issues disables/hides map with honest copy;
- no empty enabled map;
- no clustering configuration, bbox drawing or map-provider branding;
- public callouts may show `label`, `district`, `settlement`, `region`, `country`.

## 14. Tablet adaptation

### 14.1 768–1023 px

- single centered feed, maximum 760 px;
- top app bar 60 px;
- mobile bottom navigation may remain through 899 px;
- from 900 px, navigation may move to a compact leading rail if it improves available height;
- desktop right-rail modules move after feed or into a contextual drawer;
- Issue sheet may become a centered modal only when at least 32 px of viewport margin remains on each side.

### 14.2 1024–1199 px

- optional 216 px left rail plus flexible feed;
- right rail still does not occupy a permanent column;
- feed must remain at least 640 px;
- Issue modal width is `min(960px, calc(100vw - 64px))`;
- reaction distribution remains a centered dialog rather than a bottom sheet.

## 15. Orientation and safe areas

- portrait is canonical for mobile acceptance;
- landscape must remain usable, but may use condensed header and full-width sheet;
- use `env(safe-area-inset-top/right/bottom/left)` for edge-attached surfaces;
- bottom navigation and sticky composer include bottom safe area;
- no critical action sits under a rounded corner, browser control or display cutout;
- do not lock orientation.

## 16. Content resilience

The layout must survive Estonian, Russian and English.

- navigation labels: maximum 2 lines only in drawer; bottom nav remains 1 line;
- Issue title: unrestricted wrap;
- summary: unrestricted on detail; optional 3-line clamp only in feed with explicit expansion/open path;
- status/type chips wrap as a group;
- person name: one-line ellipsis in lists;
- comment text: unrestricted wrap;
- dotted paths: `overflow-wrap:anywhere`;
- long URLs: break safely without horizontal page scroll;
- numeric counts use tabular numerals;
- no text is baked into illustrations.

## 17. Accessibility contract

- support reflow at 320 CSS px without two-dimensional scrolling, except the map canvas itself;
- minimum required WCAG target is not treated as the preferred product target: use 44 px, or 48 px for primary mobile controls;
- every sheet/dialog traps focus and returns it to its trigger;
- focus order follows visual/reading order;
- Escape closes the topmost dismissible surface on hardware keyboards;
- screen readers receive title, state, count and expanded/collapsed semantics;
- icon-only controls have localized accessible names;
- color/emoji never carries reaction or status meaning alone;
- media has alt text or is explicitly decorative;
- toast-only information is also available in persistent context when action is required;
- reduced motion removes sheet transforms and decorative loading animation.

## 18. Required mobile state set

### Board/feed

- feed loading;
- populated feed;
- filters active;
- search results;
- list/map eligible;
- map partial;
- map ineligible;
- feed error with retry;
- offline/stale indication where available.

### Issue post/thread

- civic-only Issue;
- Issue with schema overlay;
- thread loading;
- empty thread;
- populated collapsed thread;
- expanded discussion;
- thread unavailable;
- reply composer;
- max depth;
- attach allowed;
- attach denied;
- post soft-fail.

### Reactions and identity

- compact reaction picker;
- selected reactions;
- agree/disagree exclusion;
- all-reactors sheet;
- reaction distribution sheet;
- verify-before-write gate;
- verified return;
- escalation idle and activated feedback.

## 19. React layout ownership

```text
MobileBoardPage
├─ MobileAppBar
├─ MobileBoardHeader
├─ MobileFilterBar
├─ BoardIssuePost[]
│  ├─ IssueCardChrome
│  ├─ PostMedia
│  ├─ PostActionStrip
│  └─ IssueThreadBlock
├─ MobileBottomNav
└─ PortalLayer
   ├─ IssueSheet
   ├─ ReactionPickerSheet
   ├─ ReactorsSheet
   ├─ ReactionsDistributionSheet
   ├─ VerifyGateSheet
   └─ ToastRegion
```

The `Mobile*` shell components adapt placement. Core Issue/thread/reaction components remain shared with desktop.

## 20. Implementation rules

- use CSS Grid/Flexbox and content-based sizing; do not position page layout with absolute coordinates;
- use container queries where component behavior depends on feed/card width rather than viewport width;
- overlays render through a portal;
- use `100dvh`, not fixed pixel viewport height, for full-screen sheets;
- scroll locking must preserve body position;
- only one primary scroll container exists inside a full-screen sheet;
- do not detect layout from user-agent strings;
- preserve SSR-safe first render; avoid desktop flash before mobile hydration;
- reserve image aspect ratio to prevent cumulative layout shift;
- bottom-nav padding is part of page layout, not added ad hoc by individual cards.

## 21. Acceptance matrix

| Scenario | 390 | 360 | 320 | 768 | 1024 |
|---|---:|---:|---:|---:|---:|
| Feed has no horizontal scroll | ✓ | ✓ | ✓ | ✓ | ✓ |
| Title/summary remain readable | ✓ | ✓ | ✓ | ✓ | ✓ |
| Four post actions fit | ✓ | ✓ | ✓ | ✓ | ✓ |
| Bottom navigation labels fit | ✓ | ✓ | short labels | ✓ | n/a/optional |
| Three visual comment depths fit | ✓ | ✓ | ✓ | ✓ | ✓ |
| Composer remains above keyboard | ✓ | ✓ | ✓ | ✓ | ✓ |
| Sheets respect safe areas | ✓ | ✓ | ✓ | ✓ | ✓ |
| Reaction groups remain labelled | ✓ | ✓ | ✓ | ✓ | ✓ |
| ET/RU/EN do not overlap controls | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dark theme preserves geometry | ✓ | ✓ | ✓ | ✓ | ✓ |

## 22. Design QA checklist

- [ ] Feed position restores after closing Issue sheet.
- [ ] Search/filter state survives list/map switching.
- [ ] Bottom navigation never covers feed content or composer.
- [ ] Software keyboard never covers focused composer actions.
- [ ] Civic Issue remains readable when thread data fails.
- [ ] Thread and reaction sheets expose one intentional scroll container.
- [ ] 320 px frame has no page-level horizontal scroll.
- [ ] Long Russian labels and Estonian compound words do not overlap icons.
- [ ] All targets meet the preferred 44 px mobile size.
- [ ] `agree` and `disagree` cannot remain selected together.
- [ ] Moderation reactions are absent on thread root.
- [ ] Attach denial and post error remain visible until acknowledged or corrected.
- [ ] Verification success does not disclose method.
- [ ] Light/dark switching causes no layout movement.
- [ ] Reduced-motion mode remains understandable without transforms.

