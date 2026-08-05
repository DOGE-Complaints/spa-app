# File Name

```text
mockup-133-public-how-it-works-page-state-sheet-spec.md
```

# Mockup 133 Spec — Public How It Works Page — State Sheet

**Functional code:** PH-T  
**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Public-How-It-Works-page-state-sheet.png`  
**Version:** v1.0  
**Status:** Active SSOT  
**Area:** Public Home & Public Information  
**Route:** `/how-it-works`  
**Priority:** MUST  
**Package:** ADMIN-PH-01  
**Related chrome:** M129 Public Header, M131 Public Footer  
**Related board:** M132 Public Board Home Feed  

---

# 1. Purpose

This artboard defines the canonical DOGEstonia public “How It Works” page.

The page is a standalone informational route that explains how citizens read civic issues, prepare useful stories and submit them through DOGEstonia GPT.

Its purpose is to give a first-time or returning visitor a practical understanding of the DOGEstonia participation model without turning the experience into:

```text
a marketing landing page

a promotional hero

a consumer onboarding wizard

a campaign narrative

a product-sales page
```

The page must provide one calm, linear reading path.

---

# 2. Product Context

Route:

```text
/how-it-works
```

The page belongs to the public DOGEstonia application shell.

It uses:

```text
M129 — Public Header Chrome

M131 — Public Footer Chrome
```

The page must look and behave like part of the same product environment as:

```text
/board
```

It is not embedded inside the board route.

It is an independently addressable standalone public page.

Canonical route relationship:

```text
/board

↔

/how-it-works
```

The two routes share application chrome but have different purposes:

```text
/board

Browse public civic issues


/how-it-works

Understand how DOGEstonia participation works
```

---

# 3. Screen Type

Type:

```text
Standalone public informational page
```

Route-level component:

```tsx
<HowItWorksPage />
```

This is not:

```text
a multi-state runtime flow

a modal

a wizard

an onboarding carousel

a marketing homepage

a feature-card grid
```

The artboard contains one primary page state:

```text
PH-T-A — Default Tutorial Page
```

Supporting annotations may document responsive, localization and routing expectations.

---

# 4. Page Model

The page uses one primary vertical reading path.

Canonical sequence:

```text
Public Header

↓

Page Introduction

↓

Step 1 — What Civic Issues Are

↓

Step 2 — Read The Live Dashboard

↓

Step 3 — Prepare A Useful Story

↓

Step 4 — Submit Through DOGEstonia GPT

↓

CTA Row

↓

Public Footer
```

The reader should understand that the four steps form one connected participation model.

Do not present the steps as unrelated product features.

---

# 5. Visual Language

Use the established DOGEstonia civic-tech design language.

```text
dark civic-tech operating system aesthetic

black / charcoal surfaces

subtle textured background

thin borders

soft glassmorphism only where structurally useful

white primary typography

muted grey secondary text

DOGEstonia yellow accent

enterprise SaaS clarity

Linear / GitHub / Jira discipline

calm reading rhythm

precise spacing

high readability
```

Yellow is reserved for:

```text
step numbers or active markers

primary CTA

important route or handoff indicators

focused controls
```

Avoid:

```text
marketing hero composition

oversized slogans

promotional statistics

feature comparison cards

testimonial blocks

campaign imagery

consumer onboarding wizard

crypto or wallet visuals

token information

neon

bright gradients

mascots

confetti

decorative clutter
```

---

# 6. Artboard Structure

Display one complete route-level page state.

Functional state:

```text
PH-T-A
```

The artboard should show:

```text
Desktop page composition

Primary reading path

Four tutorial steps

CTA row

Header/footer continuity
```

Include compact supporting side panels:

```text
Page Anatomy

Step Model

CTA Routing

Localization

Responsive Behaviour

Accessibility

Traceability

ADMIN-PH-01 Checklist
```

The page itself must remain the dominant visual element.

---

# State A — Default Tutorial Page

## Functional State

```text
PH-T-A
```

## Purpose

Default public “How It Works” page showing the full four-step tutorial and final action row.

---

# 7. Public Header

Use the canonical public header defined by:

```text
M129 — Public Header Chrome
```

Expected navigation:

```text
Dashboard

How it works

Submit a story
```

Active item:

```text
How it works
```

The active state must use colour plus shape or underline.

Do not include:

```text
SYNCED badge

marketing CTA

system-status noise
```

---

# 8. Page Introduction

## Eyebrow / Context Label

Optional:

```text
How DOGEstonia Works
```

---

## Page Title

```text
How It Works
```

---

## Introductory Message

Recommended copy:

```text
DOGEstonia helps people turn real civic experiences into structured public issues that can be understood, reviewed and acted upon.
```

The final copy may be refined by content design.

The introduction must remain concise.

---

## Requirements

```text
No large marketing hero.

No oversized illustration.

No promotional claim.

No statistics.

No testimonial.

No CTA above the tutorial steps.

The introduction should lead directly into the four-step explanation.
```

---

# 9. Tutorial Structure

Display exactly four steps.

The steps may use:

```text
numbered vertical sections

or

numbered horizontal-to-vertical progression
```

Preferred desktop layout:

```text
single vertical reading column

with numbered step markers
```

A connected line or subtle progression indicator may be used.

Do not use four equal marketing cards.

Canonical rule:

```text
One process.

Four steps.

One reading direction.
```

---

# Step 1 — What Civic Issues Are

## Step Number

```text
01
```

## Title

```text
Understand Civic Issues
```

## Required Meaning

Explain that civic issues are structured records of real situations affecting people, communities, public services or shared environments.

Recommended copy:

```text
A civic issue is a structured public record of a real need, problem, observation or proposal. It helps turn individual experience into information that others can understand and review.
```

## Supporting Points

```text
Based on real-life experience

Structured for public understanding

Connected to place, topic and responsible institutions

Presented factually rather than as campaign content
```

## Visual Support

Use a restrained issue-record or document icon.

Do not use:

```text
megaphone

protest imagery

campaign signs

political symbolism
```

---

# Step 2 — Read Live Dashboard Reports

## Step Number

```text
02
```

## Title

```text
Read The Public Dashboard
```

## Required Meaning

Explain how the user reads the public issue feed defined by M132.

Recommended copy:

```text
The public dashboard shows civic issues in one structured feed. Each item includes a title, status, labels and available context, and opens into a detailed issue view.
```

## Supporting Points

```text
Search and filter the feed

Read status as issue metadata

Open any item for full details

Use labels and context to understand scope
```

## Related Route

```text
/board
```

## Reference

```text
M132 — Public Board Home Feed
```

## Explicit Rule

Do not describe status columns.

The canonical dashboard is a single vertical feed.

---

# Step 3 — Prepare A Useful Story

## Step Number

```text
03
```

## Title

```text
Prepare A Useful Story
```

## Required Meaning

Explain what makes a submitted civic story actionable and understandable.

Recommended copy:

```text
A useful story explains what happened, where it happened, who is affected and why the situation matters. Clear facts and context help DOGEstonia structure the story correctly.
```

## Suggested Guidance

```text
Describe the real situation

Explain the impact

Include location or institution when relevant

Separate facts from assumptions

Avoid sharing unnecessary personal data
```

## Privacy Note

```text
Do not include sensitive personal information unless it is necessary and explicitly supported by the submission flow.
```

## Visual Support

Use a restrained note, structured-text or checklist icon.

---

# Step 4 — Submit Through DOGEstonia GPT

## Step Number

```text
04
```

## Title

```text
Submit Through DOGEstonia GPT
```

## Required Meaning

Explain that story preparation begins in DOGEstonia GPT and submission uses an external GPT handoff.

Recommended copy:

```text
DOGEstonia GPT guides you through the story, structures the information and prepares a draft. The submission process starts through the external DOGEstonia GPT experience.
```

## External Handoff Indicator

Display clearly:

```text
External service handoff
```

or:

```text
Opens DOGEstonia GPT
```

## Configuration Source

```text
Environment-backed URL
```

Recommended configuration reference:

```text
VITE_STORY_GPT_URL
```

The exact environment variable name must be confirmed against implementation.

## Important Rule

```text
Submit a story does not open an in-app compose page.
```

Do not show:

```text
local editor

SPA compose form

internal modal

inline story wizard
```

---

# 10. CTA Row

Display after the four steps.

The CTA row contains exactly two actions.

---

## CTA 1 — Go To Dashboard

Label:

```text
Go to Dashboard
```

Destination:

```text
/board
```

Behaviour:

```text
Internal SPA navigation
```

Visual priority:

```text
Secondary or equal utility action
```

---

## CTA 2 — Submit A Story

Label:

```text
Submit a story
```

Destination:

```text
DOGEstonia GPT external URL
```

Configuration:

```text
Environment-backed
```

Behaviour:

```text
External GPT handoff
```

Visual priority:

```text
Primary action

DOGEstonia yellow
```

Add a small external-handoff icon or label.

The user must understand that this action opens DOGEstonia GPT.

---

## CTA Row Requirements

```text
Exactly two actions.

No additional CTA.

No donation action.

No sign-up promotion.

No token action.

No local story editor.

No hidden third action.

External handoff is explicit.
```

---

# 11. Public Footer

Use the canonical footer defined by:

```text
M131 — Public Footer Chrome
```

Expected content:

```text
DOGEstonia brand reference

[TAGLINE_TBD]

About

Privacy

Contact
```

Do not redesign the footer inside this artboard.

---

# 12. Localization

Supported locales:

```text
EN

ET

RU
```

The page is localization-ready.

Localize:

```text
page title

introduction

step titles

step descriptions

supporting points

privacy guidance

CTA labels

external-handoff helper text
```

Recommended namespace:

```text
howItWorks.*
```

Possible keys:

```text
howItWorks.title

howItWorks.intro

howItWorks.steps.civicIssues.title

howItWorks.steps.civicIssues.body

howItWorks.steps.dashboard.title

howItWorks.steps.dashboard.body

howItWorks.steps.story.title

howItWorks.steps.story.body

howItWorks.steps.submit.title

howItWorks.steps.submit.body

howItWorks.cta.dashboard

howItWorks.cta.submit

howItWorks.externalHandoff
```

The artboard should demonstrate:

```text
EN / ET / RU language chips

localization namespace

stable structure across languages
```

Do not show all three full translations simultaneously.

---

# 13. Responsive Behaviour

## Wide Desktop

```text
Controlled readable content width

Four steps in one vertical progression

CTA row horizontal

Clear whitespace between sections
```

## Medium Width

```text
Same reading order

Step text remains readable

CTA row may remain horizontal if space permits
```

## Narrow / Mobile

```text
Single-column layout

Step markers remain visible

Text blocks wrap naturally

CTA actions stack vertically

Full-width tappable controls

Header and footer follow M129/M131 responsive rules
```

Never use:

```text
horizontal tutorial carousel

swipe-only navigation

four compressed columns

tiny side-by-side cards

horizontal overflow
```

---

# 14. Reading Hierarchy

Priority:

```text
1. Page purpose

2. Four-step sequence

3. Practical guidance

4. CTA row

5. Supporting annotations
```

Within every step:

```text
Step number

↓

Step title

↓

Main explanation

↓

Supporting guidance
```

The page must have one obvious reading direction.

---

# 15. Accessibility Requirements

```text
WCAG AA contrast minimum

Semantic heading hierarchy

Ordered list semantics for four steps

Visible keyboard focus

Descriptive link and button labels

External handoff clearly announced

No meaning conveyed by colour alone

Readable line length

Supported browser zoom

Minimum touch target 44px

Logical tab order

No auto-advancing tutorial content
```

Suggested accessible label:

```text
Submit a story. Opens DOGEstonia GPT in an external service.
```

---

# 16. Content and Narrative Rules

Allowed tone:

```text
informational

practical

calm

engineering-clear

citizen-accessible
```

Avoid:

```text
promotional claims

political slogans

campaign rhetoric

sarcasm

institutional self-praise

urgency manipulation

gamification

rewards language
```

The page explains participation.

It does not persuade through hype.

---

# 17. CTA Routing Panel

Display:

```text
Go to Dashboard

↓

Internal route

↓

/board
```

```text
Submit a story

↓

External handoff

↓

Environment-backed DOGEstonia GPT URL
```

Explicit rule:

```text
No in-app compose route in this scope.
```

---

# 18. ADMIN-PH-01 Verification Checklist

Display a compact checklist confirming:

```text
PH-H documented

PH-A documented

PH-F documented

PH-B documented

PH-T documented
```

Required package checks:

```text
Every artboard has a state matrix.

Every artboard has a paste-ready EN generation prompt.

Submit is explicitly an external GPT handoff.

 /how-it-works is explicitly a standalone route.

M01 conflicts are superseded by PH-B where applicable.

M19 conflicts are superseded by PH-H where applicable.
```

Artifact mapping:

```text
PH-H → M129

PH-A → M130

PH-F → M131

PH-B → M132

PH-T → M133
```

---

# 19. Supersede Rules

This page follows the redesigned Public Home package.

Relevant supersession:

```text
M01 multi-column board

↓

Superseded by M132 where conflicting
```

```text
M19 legacy header strip

↓

Superseded by M129 where conflicting
```

Specific canonical rules inherited here:

```text
No status-column dashboard explanation.

No SYNCED badge in public header chrome.
```

---

# 20. Traceability

Functional code:

```text
PH-T
```

Mockup:

```text
M133
```

Route:

```text
/how-it-works
```

Package:

```text
ADMIN-PH-01
```

Related artefacts:

```text
M129 — Public Header Chrome

M130 — Public Header Account Control

M131 — Public Footer Chrome

M132 — Public Board Home Feed
```

Related routes:

```text
/board

/profile

/how-it-works
```

External integration:

```text
DOGEstonia GPT

Environment-backed URL
```

Proposed components:

```tsx
<HowItWorksPage />

<TutorialStepList />

<TutorialStep />

<HowItWorksActions />
```

Component names remain proposed until implementation naming is frozen.

---

# 21. Out of Scope

This artboard does not define:

```text
homepage marketing content

local story editor

in-app story compose route

GPT internal interface

authentication flow

story handoff runtime

submission preview

OTP verification

issue detail page

full mobile navigation drawer

final legal copy

final translations

analytics or conversion tracking
```

These belong to separate product or UX specifications.

---

# 22. Design Goal

Within five seconds, a designer, developer, product manager or QA engineer should understand:

```text
/how-it-works is a standalone public page.

It uses the same header and footer as the dashboard.

The page explains exactly four steps.

The public board is a single structured issue feed.

A useful story is factual, contextual and privacy-aware.

Story submission begins through external DOGEstonia GPT.

Submit a story does not open an in-app composer.

Go to Dashboard routes internally to /board.

The page is informational and practical, not a promotional landing page.
```

The final result should feel like a concise embedded tutorial inside a civic operating system: calm, structured, trustworthy and immediately actionable.