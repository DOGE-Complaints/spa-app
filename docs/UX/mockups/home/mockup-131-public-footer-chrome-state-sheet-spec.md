# File Name

```text
mockup-131-public-footer-chrome-state-sheet-spec.md
```

# Mockup 131 Spec — Public Footer Chrome — State Sheet

**Functional code:** PH-F  
**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Public-Footer-Chrome-state-sheet.png`  
**Version:** v1.0  
**Status:** Active SSOT  
**Area:** Public Home & Global Chrome  
**Priority:** MUST  
**Depends on:** M129 — Public Header Chrome  

---

# 1. Purpose

This artboard defines the canonical DOGEstonia public footer.

The footer is a concise utility layer used across public-facing routes.

Its purpose is to:

- reinforce DOGEstonia product identity;
- provide a short contextual tagline;
- expose essential public-information links;
- close the page without introducing additional promotional content;
- adapt cleanly between desktop and mobile layouts.

The footer must remain visually quiet.

It supports the page rather than competing with it.

---

# 2. Product Context

The public footer belongs to the same global chrome package as the public header.

Package structure:

```text
PH-H — Public Header Chrome

PH-A — Public Header Account Control

PH-F — Public Footer Chrome

PH-P — Public Home Page
```

The footer may appear on public routes such as:

```text
/
 /dashboard
 /how-it-works
 /privacy
 /about
 /contact
 /login
 /signup
```

The footer should remain structurally consistent across these routes.

Only wrapping and alignment change at narrow viewport widths.

---

# 3. Screen Type

Type:

```text
Global application chrome state sheet
```

Component:

```tsx
<PublicFooter />
```

This is not:

```text
a marketing content section

a card grid

a secondary navigation hub

a sitemap

a promotional banner

a newsletter block
```

Only one footer state is active at runtime.

---

# 4. Visual Language

Use the established DOGEstonia civic-tech design language.

```text
dark civic-tech operating system aesthetic

black / charcoal surface

subtle separation from page content

thin top border

white primary typography

muted grey secondary typography

DOGEstonia yellow accent used sparingly

enterprise SaaS clarity

Linear / GitHub / Jira restraint

precise spacing

high readability
```

Avoid:

```text
marketing hero treatment

large illustrations

card grids

feature columns

social-media icon clusters

crypto or wallet elements

token balances

large yellow blocks

neon

bright gradients

mascots

confetti

promotional slogans
```

The footer must feel like stable application infrastructure.

---

# 5. Canonical Footer Content

The footer contains three semantic areas.

## Area 1 — Brand Reference

Required content:

```text
DOGEstonia logo or compact brand mark

DOGEstonia
```

The brand reference may link to:

```text
/
```

The footer logo should be smaller and quieter than the header brand block.

---

## Area 2 — Tagline

Required placeholder:

```text
[TAGLINE_TBD]
```

This placeholder must remain visible in the artboard.

Do not invent a final tagline.

It is shown as a product-content dependency.

Recommended visual treatment:

```text
muted secondary text

single line on desktop

may wrap to two lines on mobile
```

---

## Area 3 — Utility Links

Required links:

```text
About

Privacy

Contact
```

Suggested destinations:

```text
/about

/privacy

/contact
```

The artboard documents product expectations only.

Final route names remain subject to implementation confirmation.

---

# 6. Artboard Structure

Display two clearly labelled runtime states:

```text
State A — Default Desktop Footer

State B — Mobile Wrap / Reflow Footer
```

Recommended composition:

```text
Top half

State A — desktop horizontal layout


Bottom half

State B — narrow/mobile wrapped layout
```

Include compact annotation panels:

```text
Footer Anatomy

Spacing & Hierarchy

Responsive Rules

Accessibility

Interaction Rules

Traceability
```

Each state should be shown as a realistic full-width footer strip.

Do not render the footer as an isolated card floating in space.

---

# State A — Default Desktop Footer

## Purpose

Canonical footer layout for desktop and wide tablet viewports.

---

## Layout

Use one horizontal footer row.

Recommended structure:

```text
Left

Brand reference + tagline


Right

About · Privacy · Contact
```

Alternative acceptable structure:

```text
Left

Brand reference


Centre-left

Tagline


Right

Utility links
```

The chosen layout must remain compact and visually balanced.

---

## Brand Reference

Display:

```text
DOGEstonia logo

DOGEstonia
```

Visual priority:

```text
Secondary to page content

Clearly recognisable

Smaller than header branding
```

---

## Tagline

Display exact placeholder:

```text
[TAGLINE_TBD]
```

The placeholder must look intentionally unresolved, not like broken UI.

Optional annotation:

```text
Content dependency — final tagline not yet approved
```

---

## Utility Links

Display:

```text
About

Privacy

Contact
```

Recommended presentation:

```text
horizontal link group

clear spacing

no large buttons

no filled pills
```

Hover treatment:

```text
underline

or subtle text contrast increase
```

---

## Separation From Page

Use:

```text
thin top border

or subtle tonal background shift
```

Do not use:

```text
heavy shadow

large card container

oversized separator

bright decorative line
```

---

## Requirements

```text
Single concise footer row.

Strong contrast on dark background.

Brand, tagline and links are visually distinct.

Links remain easy to scan.

No promotional CTA.

No card grid.

No newsletter form.

No system status label unless specified elsewhere.

No SYNCED badge.
```

---

# State B — Mobile Wrap / Reflow Footer

## Purpose

Responsive footer layout for narrow and mobile viewports.

The same content is preserved.

Only layout and rhythm change.

---

## Layout

Recommended vertical sequence:

```text
Brand reference

Tagline

Utility links
```

Possible arrangement:

```text
DOGEstonia

[TAGLINE_TBD]

About
Privacy
Contact
```

or:

```text
DOGEstonia

[TAGLINE_TBD]

About · Privacy · Contact
```

The final wrapping choice should depend on available width.

For very narrow screens, use vertically stacked links.

---

## Brand Reference

Display:

```text
compact logo

DOGEstonia
```

The brand should remain left-aligned unless the broader mobile page canon specifies centred footers.

For this specification, use:

```text
left alignment
```

to remain consistent with application chrome.

---

## Tagline

Display:

```text
[TAGLINE_TBD]
```

Allow:

```text
one or two lines
```

Do not truncate the final tagline with ellipsis.

---

## Utility Links

Show a tappable rhythm.

Recommended mobile treatment:

```text
individual text links

minimum touch target 44px

clear vertical or horizontal spacing
```

If links wrap:

```text
preserve consistent gap

avoid orphaned separators

avoid cramped punctuation
```

Do not use tiny inline links.

---

## Requirements

```text
No horizontal overflow.

Content wraps naturally.

Links remain independently tappable.

Minimum touch target 44px.

No compressed unreadable line.

No loss of brand or utility links.

No accordion.

No hidden footer navigation.

No layout jump caused by asynchronous content.
```

---

# 7. Footer Anatomy Panel

Display:

```text
1. Brand Reference

Logo + DOGEstonia


2. Tagline

[TAGLINE_TBD]


3. Utility Links

About

Privacy

Contact
```

Supporting rule:

```text
Brand identifies.

Tagline contextualises.

Links provide utility.
```

---

# 8. Spacing & Hierarchy Guidance

Use spacing based on the DOGEstonia design system.

Recommended token relationships:

```text
Internal footer vertical padding

space.xl or equivalent


Brand-to-tagline gap

space.sm–space.md


Tagline-to-links gap

space.lg–space.xl


Link-to-link gap

space.lg desktop

space.md–space.lg mobile
```

Hierarchy:

```text
1. Brand reference

2. Utility links

3. Tagline
```

The brand is the strongest footer element.

Utility links must remain clear and accessible.

The tagline stays visually secondary.

---

# 9. Responsive Behaviour Panel

Display:

```text
Wide Desktop

Single horizontal row


Medium Width

Brand + tagline grouped

Links remain right-aligned


Narrow / Mobile

Vertical reflow

Brand

Tagline

Links
```

Responsive priority:

```text
1. Preserve all content

2. Preserve link readability

3. Preserve touch targets

4. Allow tagline wrapping

5. Avoid horizontal compression
```

Never remove:

```text
brand

tagline

About

Privacy

Contact
```

---

# 10. Interaction Rules

Brand reference:

```text
Click

↓

/
```

About:

```text
/about
```

Privacy:

```text
/privacy
```

Contact:

```text
/contact
```

Interaction style:

```text
standard text links

visible hover state

visible focus state

no animated promotional effect
```

The footer does not contain a primary CTA.

---

# 11. Accessibility Requirements

```text
WCAG AA contrast minimum

Visible keyboard focus

Semantic footer landmark

Descriptive link labels

Minimum mobile touch target 44px

Logical tab order

No colour-only meaning

No text embedded as raster graphics

Readable text at supported zoom levels
```

The tagline must not be required to understand the destination of utility links.

---

# 12. Narrative Rules

The footer may communicate:

```text
calm system identity

public accountability

quiet institutional confidence

clarity
```

The footer must not communicate:

```text
sales urgency

political slogans

sarcasm

self-congratulation

gamification

surveillance

technical system noise
```

The unresolved tagline placeholder must remain neutral:

```text
[TAGLINE_TBD]
```

No final narrative content should be invented inside this artboard.

---

# 13. Traceability

Functional code:

```text
PH-F
```

Mockup:

```text
M131
```

Related package artefacts:

```text
M129 — Public Header Chrome

M130 — Public Header Account Control

PH-P — Public Home Page
```

Related proposed components:

```tsx
<PublicFooter />

<FooterBrand />

<FooterUtilityLinks />
```

Component names remain proposed until implementation naming is frozen.

---

# 14. Out of Scope

This artboard does not define:

```text
final tagline copy

legal-document content

About page content

Privacy page content

Contact form

social-media links

newsletter signup

donation CTA

site map

system status

copyright/legal entity details

regional node selector

language selector

marketing sections
```

These belong to separate product or content specifications.

---

# 15. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
The footer is a concise utility layer.

DOGEstonia branding remains visible but secondary.

The final tagline is intentionally unresolved and shown as [TAGLINE_TBD].

About, Privacy and Contact are the only required utility links.

Desktop uses a compact horizontal layout.

Mobile preserves all content through clean wrapping and tappable spacing.

The footer is application chrome, not a marketing or card-grid section.
```

The final result should feel like a calm, precise and trustworthy civic-tech footer that closes the public DOGEstonia experience without adding visual noise.