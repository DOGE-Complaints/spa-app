# File Name

```text
mockup-132-public-board-home-feed-state-sheet-spec.md
```

# Mockup 132 Spec — Public Board Home Feed — State Sheet

**Functional code:** PH-B  
**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Public-Board-Home-Feed-state-sheet.png`  
**Version:** v1.0  
**Status:** Active SSOT  
**Area:** Public Home & Public Board  
**Route:** `/board`  
**Priority:** MUST  
**Supersedes:** M01 multi-column board layout where requirements conflict  
**Related chrome:** M129 Public Header, M131 Public Footer  

---

# 1. Purpose

This artboard defines the canonical DOGEstonia public board as a single structured issue feed.

The board is the primary public home feed for civic stories and issues.

It replaces the legacy multi-column board layout with one vertically scrollable feed that is:

- easier to scan;
- easier to filter;
- more suitable for rich issue content;
- compatible with narrow and mobile viewports;
- consistent with familiar public-feed and enterprise issue-tracking patterns.

The board must remain factual and product-informational.

It is not a campaign page, marketing feed or social engagement surface.

---

# 2. Product Context

The `/board` route is the principal public browsing surface for DOGEstonia issues.

The page combines:

```text
Public application chrome

Persistent filter toolbar

Single issue feed

Public footer
```

The board uses a hybrid interaction model inspired by:

```text
structured Jira issue lists

+

the continuous scanning rhythm of a social feed
```

The result must preserve civic and engineering clarity.

It must not behave like a consumer social network.

---

# 3. Layout Model

## Legacy Model

```text
NEW | VERIFIED | IN REVIEW | ARCHIVED
```

Status determined the spatial layout.

## Canonical PH-B Model

```text
Filter Toolbar

↓

Single Feed

↓

Structured Issue Items
```

Status remains visible inside each issue item.

Status does not create columns.

Canonical rule:

```text
Status is issue metadata, not board layout.
```

---

# 4. Screen Type

Type:

```text
Route-level full-journey state sheet
```

Route:

```text
/board
```

Proposed page component:

```tsx
<PublicBoardPage />
```

Main content component:

```tsx
<IssueFeed />
```

Only one runtime state is active at a time.

The artboard shows all required states together for product, design, frontend and QA reference.

---

# 5. Visual Language

Use the established DOGEstonia civic-tech visual language.

```text
dark civic-tech operating system aesthetic

black / charcoal surfaces

subtle textured background

soft glassmorphism panels where structurally useful

thin borders

white primary typography

muted grey secondary typography

DOGEstonia yellow accent

enterprise SaaS appearance

Linear / GitHub / Jira clarity

high information density

precise spacing

fast scanning
```

Use yellow only for:

```text
active filters

primary/high-priority actions

focused controls

selected state

important open-details affordance
```

Avoid:

```text
marketing hero treatment

campaign language

social engagement counters

likes

shares

follower metrics

reaction bars

token balances

wallet controls

status columns

Kanban board layout

bright gradients

neon

mascots

confetti

large promotional illustrations
```

---

# 6. Stable Page Anatomy

All runtime states preserve the same structural order.

```text
M129 Public Header

↓

Board Page Header

↓

Filter Toolbar

↓

Feed State Area

↓

M131 Public Footer
```

The header and footer may be represented in simplified form on the artboard.

Their behaviour is defined separately.

The main visual focus of M132 is:

```text
Filter Toolbar

+

Issue Feed State
```

---

# 7. Board Page Header

Display a compact route heading.

Title:

```text
Public Board
```

Optional supporting message:

```text
Browse civic stories and issues submitted through DOGEstonia.
```

The heading must remain concise.

Do not turn it into a hero section.

Do not include:

```text
large illustration

campaign statement

statistics

marketing CTA group

promotional banner
```

---

# 8. Filter Toolbar — Reused Behaviour

The filter toolbar is visible in all five runtime states.

It preserves the existing product concept:

```text
Search

Filter control / filter panel

Active filter chips

Reset filters
```

## Toolbar Structure

Recommended order:

```text
Search input

Filter button or filter controls

Active filter chips

Reset filters
```

The exact filter dimensions and available filter values must come from the existing product contract.

This artboard does not invent new filter categories.

---

## Search

Placeholder:

```text
Search issues
```

Search must apply to the single feed.

---

## Filter Control

Label:

```text
Filters
```

The filter control may open the existing filter panel or expose the existing filter fields.

The panel itself may be represented as a compact inset or annotation.

---

## Active Filter Chips

Active filters appear directly below or inside the toolbar area.

Example only:

```text
Status: Verified

Location: Tallinn

Label: Transport
```

These values are illustrative.

Implementation must use the actual filter contract.

---

## Reset Filters

Label:

```text
Reset filters
```

Display when:

```text
search query is active

or

one or more filters are active
```

Do not show an active reset action when no filters or search terms exist.

---

# 9. Filter Reuse vs Layout Change

Display a dedicated annotation panel.

## Reused

```text
Search behaviour

Filter trigger / panel

Filter values

Active chips

Reset behaviour

Query persistence rules
```

## Changed

```text
Legacy column result layout

↓

Single vertical feed


Status column placement

↓

Status metadata inside issue item


Horizontal board scanning

↓

Vertical feed scanning
```

No backend filter semantics should change solely because of this visual redesign.

---

# 10. Issue Feed Item — Canonical Anatomy

Each issue appears as a structured, clickable feed item.

The entire item may act as a link if keyboard and screen-reader behaviour remains correct.

Destination:

```text
/issue/:id
```

## Required Content

```text
Issue ID

Title

Status

Labels

Open-details affordance
```

## Contextual Content When Available

```text
Short factual summary or excerpt

Institution

Location

Created or updated time

VERIFIED marker
```

Only display fields supported by the actual issue response.

Do not invent unavailable data.

---

## Example Item

```text
ISS-3421

Unsafe pedestrian crossing near primary school

Parents report repeated dangerous traffic situations during morning arrival hours.

Status: IN REVIEW

Labels:
Transport
Safety
Tallinn

Open issue →
```

The sample is illustrative.

---

## Interaction

Primary interaction:

```text
Click issue item

or

Activate with keyboard

↓

/issue/:id
```

The item must clearly communicate that details are available.

Allowed affordances:

```text
Open issue

View details

arrow icon

chevron

clear hover border / underline
```

Do not rely on cursor change alone.

---

## Hover and Focus

Hover:

```text
border emphasis

title underline

slight contrast increase
```

Focus:

```text
visible focus ring

clear keyboard selection
```

Avoid:

```text
large filled hover surface

dramatic movement

card lift animation

neon glow
```

---

# 11. Future-Enrichment Rule

The feed architecture should leave room for future supported data.

Possible future extension zones may exist for:

```text
additional metadata

verified evidence references

routing context

public provenance information
```

Do not display these as active v1 sections unless the underlying product contract supports them.

Explicitly excluded from v1:

```text
metric sections

engagement counters

popularity ranking

reaction totals

token rewards

social scoring

analytics dashboards
```

---

# State A — Loading

## Functional State

```text
PH-B-A
```

## Purpose

The board route is loading its issue data.

The page structure and filter placement remain visible.

---

## Title

```text
Public Board
```

---

## Filter Toolbar

Display the complete toolbar structure:

```text
Search

Filters

Chip area

Reset position
```

No active chips are required in the default loading example.

The toolbar must not disappear while the feed loads.

---

## Feed Area

Show a vertical stack of issue-card skeletons.

Each skeleton should preserve the approximate structure of a real item:

```text
ID line

Title line

Summary lines

Status placeholder

Label placeholders

Metadata line
```

Recommended visible skeleton count:

```text
3–5 items
```

---

## Loading Message

Optional subtle label:

```text
Loading public issues
```

---

## Requirements

```text
No heavy full-page spinner.

No blank main content area.

No status columns.

Filter toolbar remains visible.

Skeletons reflect real feed-item proportions.

Page shell remains stable.

Footer does not jump upward unexpectedly.
```

---

# State B — Empty Board

## Functional State

```text
PH-B-B
```

## Trigger

```text
Issue dataset is empty

AND

No active search

AND

No active filters
```

---

## Title

```text
No Issues Yet
```

---

## Message

```text
Public civic issues will appear here when they become available.
```

The final message may be adapted by content design.

It must remain factual and neutral.

---

## Empty-State Visual

Use the canonical DOGEstonia empty-state pattern where appropriate:

```text
small DOGEstonia pose or brand marker

one or two lines of text

no required CTA
```

The visual must remain secondary.

---

## Filter Toolbar

Visible in its default state.

```text
Search empty

No active chips

Reset hidden or inactive
```

---

## Requirements

```text
No Reset Filters CTA.

No false error message.

No campaign invitation block.

No large illustration.

No metric placeholders.

No status columns.

Do not imply that filtering caused the empty state.
```

---

# State C — Results Feed

## Functional State

```text
PH-B-C
```

## Purpose

Default successful board state with a full result set.

---

## Title

```text
Public Board
```

---

## Optional Result Context

Display a restrained result count only if already supported by the product contract.

Example:

```text
24 issues
```

Do not treat the count as a dashboard metric.

---

## Filter Toolbar

Visible above the feed.

The default state may show:

```text
empty search

no active chips
```

or a clearly labelled example of active filters.

The main results example should preferably show a full unfiltered result set.

---

## Feed

Display a vertical stack of realistic issue items.

Recommended visible items:

```text
3–5
```

Use different content lengths to demonstrate feed resilience.

Each item should show:

```text
Issue ID

Title

Summary or excerpt when available

Status

Labels

Available metadata

Clear open-details affordance
```

Possible statuses:

```text
NEW

VERIFIED

IN REVIEW

ARCHIVED
```

Status appears as an item attribute.

It does not determine placement.

---

## Scroll Behaviour

The feed continues vertically beyond the visible viewport.

Indicate:

```text
vertical continuation

or partial next item

or scroll annotation
```

Do not show horizontal scrolling.

---

## Requirements

```text
One single feed.

No status columns.

All statuses may appear in the same feed.

Items are factual and scannable.

Entire item or clear control opens /issue/:id.

Layout supports different content lengths.

No social engagement mechanics.

No metric dashboard.
```

---

# State D — Filtered No Results

## Functional State

```text
PH-B-D
```

## Trigger

```text
Issue dataset exists

BUT

Active search or filters return zero matches
```

---

## Title

```text
No Issues Match These Filters
```

---

## Message

```text
Adjust your search or reset the active filters to see more issues.
```

---

## Filter Toolbar

Must visibly preserve the current query state.

Example:

```text
Search:
school crossing

Active chips:
Status: Archived
Location: Tartu
```

Values are illustrative.

---

## Primary Recovery Action

```text
Reset filters
```

The action should be visually prominent but remain part of the filter workflow.

---

## Secondary Recovery

Users may individually remove chips.

Example:

```text
Status: Archived ×

Location: Tartu ×
```

---

## Requirements

```text
Active filters remain visible.

Search query remains visible.

Reset action is immediately discoverable.

Do not clear filters automatically.

Do not display the generic empty-board message.

No status columns.

No error styling.
```

---

# State E — Load Error

## Functional State

```text
PH-B-E
```

## Purpose

The board could not load its issue data.

---

## Title

```text
Unable To Load The Board
```

---

## Message

```text
We couldn't load public issues right now. Please try again.
```

---

## Primary CTA

```text
Try Again
```

---

## Filter Toolbar

Remain visible in its stable layout.

If filters or search were active before the error, their state should remain preserved where technically possible.

---

## Error Treatment

Use a calm operational state.

Allowed:

```text
small diagnostic icon

muted error border

concise retry message
```

Avoid:

```text
full-screen red panel

browser-style error page

stack trace

technical exception text

blame language

Oops
```

---

## Requirements

```text
Retry is clearly available.

Page shell remains stable.

Filter layout remains visible.

No status columns.

No issue skeletons displayed as permanent content.

No automatic filter reset.

No raw API error shown.
```

---

# 12. State Mapping

Display:

```text
route_enter

↓

loading

↓

State A


load_success + issues.length = 0 + no active filters

↓

State B


load_success + issues.length > 0

↓

State C


load_success + filteredResults.length = 0 + active query/filter

↓

State D


load_failed

↓

State E


Try Again

↓

State A
```

---

# 13. Interaction and Routing Panel

Board route:

```text
/board
```

Issue destination:

```text
/issue/:id
```

Interaction flow:

```text
Feed Item

↓

Open Issue Details

↓

/issue/:id
```

Required interaction support:

```text
mouse

keyboard

touch

screen reader
```

Do not introduce an issue quick-view modal in v1 unless separately specified.

---

# 14. Responsive Behaviour

## Desktop

```text
Full-width toolbar

Single centred feed column or controlled wide content column

Structured rich feed items
```

## Medium Width

```text
Toolbar may wrap

Search retains priority

Filter chips flow onto a second line

Feed remains single-column
```

## Narrow / Mobile

```text
Search uses full available width

Filter controls wrap below search when required

Active chips wrap naturally

Issue cards remain one per row

Metadata may wrap vertically

Minimum touch targets preserved
```

Never use:

```text
horizontal status columns

horizontal board scrolling

multiple feed columns

compressed unreadable metadata
```

---

# 15. Accessibility Requirements

```text
WCAG AA contrast minimum

Semantic main and feed/list structure

Visible keyboard focus

Issue items keyboard accessible

Clear link purpose

Status not communicated by colour alone

Labels readable as text

Search input has an explicit label

Filter controls have accessible names

Active chips removable by keyboard

Reset action clearly labelled

Loading state announced appropriately

Error state announced appropriately

Minimum touch target 44px on narrow layouts
```

---

# 16. Privacy and Public-Data Rules

The board displays only information approved for the public issue feed.

Do not expose:

```text
private user identity

phone number

email

session data

access tokens

internal moderation notes

private draft content

unpublished evidence

internal routing metadata unless explicitly public
```

Issue items must use the public issue DTO or equivalent public-data contract.

---

# 17. Supersede Rules

This specification supersedes M01 wherever M01 requires a multi-column or status-column board layout.

Explicitly superseded:

```text
NEW column

VERIFIED column

IN REVIEW column

ARCHIVED column

horizontal status-board layout

status-based spatial placement
```

Canonical PH-B rule:

```text
All public issues appear in one structured vertical feed.

Status remains visible inside each issue item.
```

Non-conflicting M01 decisions may remain valid until separately superseded.

---

# 18. Traceability

Functional code:

```text
PH-B
```

Mockup:

```text
M132
```

Route:

```text
/board
```

Supersedes where conflicting:

```text
M01 — Multi-Column Board
```

Related chrome:

```text
M129 — Public Header Chrome

M130 — Public Header Account Control

M131 — Public Footer Chrome
```

Related existing design-system elements:

```text
Issue List Item

Status Badge

Label Chip

Empty State

Filter Controls
```

Proposed components:

```tsx
<PublicBoardPage />

<BoardFilterToolbar />

<IssueFeed />

<IssueFeedItem />

<BoardLoadingState />

<BoardEmptyState />

<BoardNoResultsState />

<BoardErrorState />
```

Component names are proposed until implementation naming is frozen.

---

# 19. Out of Scope

This artboard does not define:

```text
issue detail page

issue submission flow

filter backend implementation

new filter categories

sorting algorithm

pagination contract

infinite-scroll contract

engagement counters

likes

comments

shares

voting

token rewards

ranking

recommendation algorithm

metric dashboard

moderation controls

admin actions

quick-view modal
```

These require separate product decisions or specifications.

---

# 20. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
/board is the primary public issue feed.

The legacy status-column board has been replaced.

Search, filters, chips and reset behaviour are preserved.

All issues appear in one structured vertical feed.

Status remains metadata inside each issue item.

Each issue clearly opens /issue/:id.

Loading, true-empty, results, filtered-empty and load-error are distinct states.

The board remains a product surface, not a campaign page or social network.

No new metric sections are introduced in v1.
```

The final result should feel like a calm, information-dense and trustworthy civic feed combining the scanning rhythm of a public content stream with the factual structure of an enterprise issue tracker.