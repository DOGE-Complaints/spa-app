# DOGEstonia — M168 How It Works Content and CTA Specification v1.0

**Date:** 2026-10-22  
**Page:** `/how-it-works`  
**Artboard ID:** `M168-how-it-works-content-cta-v1`  
**Artboard PNG:** [DOGEstonia-M168-how-it-works-content-cta-spec-v1.0.png](DOGEstonia-M168-how-it-works-content-cta-spec-v1.0.png) (promoted from raw `DOGEstonia how it works page.png`)  
**Baseline:** operator-supplied `DOGEstonia How it works.pdf`, two-page print of the existing site.  
**Status:** written handoff for the generated light-theme proposal. Operator navigation/content requirements are locked; condensed copy and numerical header-spacing proposals await final review. No OP PASS, runtime change or deployment is claimed.

## 1. Purpose and scope

Update the existing How It Works page while preserving its four-step educational structure and SPA shell. Direct feed CTAs to `/next/feed`, remove obsolete technical navigation hints, add a clear external landing Concept & FAQ link, and make numbered step headings compact and consistently aligned.

The full-page artboard combines the printed baseline into one continuous web page. PDF page breaks are not UI sections or responsive breakpoints.

This task supplies UX documentation only. It introduces no product code, new HTTP/API, backend capability, authentication flow or in-app story composer. Cabinet, feed-card, thread and reactions redesign are outside scope.

## 2. Authority and decision status

| Item | Status / rule |
|---|---|
| Page | Existing How It Works page, light-theme presentation |
| Structure | Retain four steps, numbered 01–04 |
| Primary feed CTA | Exact English label `Go to Feed` |
| Feed destination | Internal route `/next/feed` |
| Legacy navigation hints | Remove all `Opens /board`, backtick variants and `Internal navigation to /board` helpers from rendered UI |
| External secondary CTA | Exact English label `Concept & FAQ on landing`, with external-link icon |
| Landing destination | `https://uus-veerenni-civic.dogestonia.me/#how-it-works` |
| Story submission | Preserve external DOGEstonia GPT handoff using existing configured destination |
| Step-heading spacing | Compact and comfortable; numerical values in §6 are proposals |
| Shortened prose / localized strings | Copy proposal; final ET/RU/EN strings remain TBD through existing localization process |

Current operator instructions override the baseline PDF's old Dashboard destination and helper text. Written rules govern any raster imperfection. The source PDF records the existing presentation, not proof of API behavior or a claim that every described capability was tested.

## 3. Page anatomy

1. Existing site header: DOGEstonia brand, search, language, theme and existing notification/account chrome.
2. Page introduction: eyebrow, H1 and one concise explanatory paragraph.
3. Step 01: understand civic issues.
4. Step 02: explore the public feed, followed by a Go to Feed CTA.
5. Step 03: prepare a useful story, including privacy guidance.
6. Step 04: submit through external DOGEstonia GPT, with Submit a story CTA.
7. Final CTA area: Go to Feed primary plus Concept & FAQ on landing secondary.
8. Existing footer: brand and About / Privacy / Contact links.

Use a single ordered vertical reading flow. The artboard annotation gutter is documentation outside product UI. Do not render its route arrows, proposal notes, measurements, implementation remarks or TBD labels on the live page.

The artwork shows existing shell controls for continuity; it does not redefine their behavior, labels, menus or destinations. Reuse actual brand assets and existing icons rather than tracing generated pixels. No new user identity or notification data is specified.

## 4. Copy proposal — exact English artboard strings

These are proposed concise strings, not new claims of technical implementation or completed localization.

### 4.1 Introduction

**Eyebrow:** `HOW DOGESTONIA WORKS`  
**H1:** `How It Works`

> Turn real civic experiences into public issues that others can understand, review and act on.

### 4.2 Step 01

**Number:** `01`  
**Title:** `Understand Civic Issues`

> A civic issue records a real need, problem, observation or proposal in a structured public form.

- Grounded in real experience
- Connected to place, topic and relevant institutions
- Presented factually for public review

### 4.3 Step 02

**Number:** `02`  
**Title:** `Explore the Public Feed`

> Browse civic issues, read their status and context, and open an issue for the full detail.

- Search and filter issues
- Read status, labels and available context
- Open an issue to learn more

**Primary CTA:** `Go to Feed` → `/next/feed`.

No routing helper is displayed below this button. Navigation target is developer documentation only.

### 4.4 Step 03

**Number:** `03`  
**Title:** `Prepare a Useful Story`

> Explain what happened, where it happened, who is affected and why it matters.

- Describe the situation and its impact
- Separate facts from assumptions
- Include location or institution when relevant

**Quiet helper:** `Avoid unnecessary personal data.`

This shorter helper retains the privacy direction of the source. It does not authorize submission of sensitive information, redefine the submission policy or replace any existing required consent/privacy notice. Any mandatory existing notice must be reconciled before removing it; the artboard alone is not that decision.

### 4.5 Step 04

**Number:** `04`  
**Title:** `Submit Through DOGEstonia GPT`

> DOGEstonia GPT guides you through your story, structures the information and helps prepare a draft.

**Handoff helper:** `Story submission opens DOGEstonia GPT in an external service.`

**Secondary CTA:** `Submit a story` with existing external-link icon.

No environment-backed URL explanation, configuration detail or duplicate technical helper block appears in resident-facing copy. The configured GPT target is retained; no URL is invented in this specification.

### 4.6 Final CTA area and footer

- Primary: `Go to Feed`.
- Secondary: `Concept & FAQ on landing`, with external-link icon.
- Existing footer link labels: `About`, `Privacy`, `Contact`.

Do not introduce a placeholder tagline such as `[TAGLINE_TBD]` into rendered UI. Use existing approved footer copy; unresolved tagline content is omitted in this proposal.

## 5. CTA and navigation contract

| Placement | Visible label | Destination | Classification |
|---|---|---|---|
| After step 02 | `Go to Feed` | `/next/feed` | Internal SPA navigation |
| Step 04 | `Submit a story` + external icon | Existing configured DOGEstonia GPT URL | External handoff |
| Final CTA area | `Go to Feed` | `/next/feed` | Internal SPA navigation |
| Final CTA area | `Concept & FAQ on landing` + external icon | `https://uus-veerenni-civic.dogestonia.me/#how-it-works` | External landing anchor |

Both Go to Feed instances use the same destination. The task notation “dashboard” does not preserve the old Go to Dashboard label or route.

Remove old navigation hints entirely, including monospace/backtick route text, `Opens /board`, `Internal navigation to /board` and their localized equivalents. Do not replace them with resident-facing `Opens /next/feed` text. The internal target belongs in route configuration and UX annotations.

The landing link is a distinct, clearly discoverable secondary destination; it must not be confused with GPT submission or the feed. Its URL is supplied by the operator. This task does not claim the external page or anchor was live-tested.

New-tab versus same-tab policy follows the existing application's external-link convention; if no convention exists, it remains TBD. The external icon indicates leaving the app and does not, by itself, promise a new tab. Existing external-link accessibility handling applies.

The artboard assumes the existing GPT target is available. If configuration is unavailable, reuse the existing honest unavailable behavior; its exact state/copy is not specified by M168. Never substitute the landing or a fabricated GPT URL.

## 6. Step-heading layout and density proposal

| Property | Proposed treatment |
|---|---|
| Header composition | Number badge directly followed by title |
| Badge dimensions | 40 × 40 CSS px proposal |
| Badge-to-title gap | 12 CSS px proposal |
| Alignment | Badge and title vertically centered for a single-line heading |
| Badge appearance | Existing pale-yellow rounded treatment; no new exact radius or tint token introduced |
| Header padding | Compact; no fixed numerical value approved |
| Long heading | Wrap naturally without collision or tiny-font fitting |

Remove empty icon placeholders and inconsistent reserved icon gaps between badge and title in the baseline. This proposal uses badge + title consistently across all four steps. It does not commission new step icons.

The badge numbers are static step markers, not buttons. Do not force a touch-target size onto a noninteractive badge. Interactive CTAs retain existing minimum target and focus requirements (at least 44 CSS px where the shared system requires it).

No fixed total page height, section min-height, exact section margin, font size or title line-height is established by generated pixels. Inherit the existing typography/spacing system and review changes in the actual layout. The 40/12 proposal needs explicit review before being treated as a locked numerical token.

## 7. Theme, shell and visual continuity

Use the current light civic palette: page `#F7F6F2`, surface `#FFFDF8`, text `#101828`, secondary `#667085`, neutral border `#E7E4DC`, yellow primary action `#F5C542`, link/action accent `#B54708` where already approved.

Primary feed CTAs are yellow; secondary submission/landing actions use existing outlined/link treatment. Preserve existing contrast, focus and hover states. Do not introduce violet glow, gradients, a second palette or a marketing hero illustration.

The page keeps its existing shell and user-controlled theme behavior. The artwork's theme-control appearance is illustrative, not an instruction to rename or replace the current theme switch. M168 does not reopen default theme, storage or localization decisions.

## 8. Responsive and accessible treatment

Maintain semantic page H1, ordered step structure and step headings. Number badges supplement the titles; reading order remains 01 → 02 → 03 → 04 → final CTAs.

On narrow widths, keep a comfortable badge/title gap, wrap titles and body text, and stack final CTAs as needed without overflow. Do not reproduce the desktop annotation gutter on mobile. This artboard provides no new exact breakpoint or mobile-specific token set.

Links and CTAs retain keyboard activation, visible focus, accessible names and adequate touch targets. External destinations must remain distinguishable in words/context, not by an unexplained icon alone. Existing icon assets are reused; no source filenames are invented.

The source language is English for this proposal. Reuse existing localization infrastructure and resolve final keys/ET/RU translations separately; no raw implementation placeholders should reach residents.

## 9. Before-to-target mapping

| Baseline PDF | M168 target |
|---|---|
| `Go to Dashboard` | `Go to Feed` |
| Dashboard CTAs point to `/board` | Both feed CTAs point to `/next/feed` |
| `Opens /board` and internal-route helpers | Removed; no replacement route hint in product UI |
| No explicit landing Concept & FAQ CTA in final area | Clear external `Concept & FAQ on landing` CTA |
| Uneven number/icon/title header gaps | Consistent compact badge + title composition |
| Longer explanatory copy and repeated handoff details | Condensed proposal in §4 |
| Two printed pages, with step 03 split | One continuous web page; no PDF page-break behavior |
| Footer tagline placeholder | No unresolved tagline rendered |

Step 04 remains an external DOGEstonia GPT handoff. M168 does not introduce an in-app story submission page or alter the destination contract.

## 10. Raster notes and outstanding decisions

The PNG illustrates hierarchy and spacing. Proposed badge geometry, antialiasing, logo rendering, apparent border colors and text metrics must not be sampled as authoritative implementation tokens. Use actual source assets and existing typography.

| Item | Status |
|---|---|
| Primary route and label | Locked: Go to Feed → `/next/feed` |
| External landing destination and label | Locked as §5 |
| Removal of old routing hints | Locked |
| Four-step structure | Locked |
| Condensed copy | Proposal; final strings/localization TBD |
| 40 px badge / 12 px gap | Proposal pending review |
| Other precise header/section spacing | Existing system; any new value needs review |
| External tab policy | Reuse existing; otherwise TBD |
| Configured GPT URL / missing-target state | Existing integration; no new target or fallback invented |
| OP/runtime verification | Not performed or claimed by this handoff |

## 11. Review checklist

- [ ] Page retains four ordered steps and existing shell.
- [ ] Both Go to Feed CTAs navigate to `/next/feed`.
- [ ] No old dashboard routing hints or monospace technical route helpers remain in rendered UI.
- [ ] Concept & FAQ on landing is visible, uses the exact supplied external URL and an existing external-link icon.
- [ ] Submit a story preserves the existing external GPT handoff and honest context.
- [ ] Badge/title spacing is consistent; no empty icon placeholder or inconsistent reserved gap remains.
- [ ] Shortened text is reviewed and localized; no unresolved user-facing placeholders appear.
- [ ] Privacy and existing mandatory notices are reconciled rather than silently discarded.
- [ ] Narrow layouts wrap/stack cleanly with usable targets and visible focus.
- [ ] Annotation gutter, route arrows and TBD notes remain outside product UI.
- [ ] No invented code change, HTTP behavior, deployment or OP PASS claim is made.
