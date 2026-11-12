# STORY-SPA-CR — Icon assets catalog (component-reactions)

> **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Admin:** [ADMIN-CR-03-icon-assets-catalog.md](ADMIN-CR-03-icon-assets-catalog.md) · Done 2026-10-14 · **Gap-8 promote** 2026-10-14  
> **Method:** **Reuse/index** — runtime URLs under `/icons/next-feed/…` (+ shell chrome); **Gap-8 promoted** — no emoji interim for selectable marks.  
> **UX input:** M154 (primary) · M155 (badge reuse only) · M160 (`currentColor` / label-first)  
> **Ids SSOT:** [`reactionsV1Catalog.js`](../../../../src/components/threads/reactionsV1Catalog.js)  
> **Visual wave 2026-10-16:** §Gap v2 was open · **no** multicolor mark SVG — see [visual mirror](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md)  
> **M155 people 2026-10-17:** avatar **badges reuse** §Reuse marks · no new people/avatar SVG — see [polish+M155 mirror](OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md)  
> **Gap v2 closed 2026-10-18 (CR-20):** `react` thumbs-up + `reactions` dual-circle Present · §Reuse · [residual mirror](OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md)

## Meta / SSOT

| Role | Path |
|------|------|
| Sibling feed catalog | [STORY-SPA-NF-icon-assets.md](../next-feed/STORY-SPA-NF-icon-assets.md) (#9) |
| Sibling shell catalog | [STORY-SPA-NS-icon-assets.md](../next-shell/STORY-SPA-NS-icon-assets.md) (#8) |
| Masters (immutable) | [`docs/UX/next/feed/dogestonia-icon-system-v1.0/`](../../../UX/next/feed/dogestonia-icon-system-v1.0/) |
| Token map | [DOGEstonia-icon-token-map-v1.0.md](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md) |
| Master index | [ICON-GENERATION-INDEX.md](../icons/ICON-GENERATION-INDEX.md) row **#10** |
| Gap-8 delivery evidence | [DOGEstonia-Gap8-reactions-v1.0/](DOGEstonia-Gap8-reactions-v1.0/) · [HANDOFF.md](DOGEstonia-Gap8-reactions-v1.0/HANDOFF.md) |

## Runtime grammar

| Role | Path |
|------|------|
| Mark / feed chrome runtime | `/icons/next-feed/...` |
| Shell chrome | `/icons/next-shell/...` |
| Package dir | `spa-app/public/icons/component-reactions/` (`.gitkeep` only — **do not** duplicate NF bytes) |

**Disk status (Gap-8 promote close):** masters Present under icon-system `icons/reactions/` (**13** SVG) · runtime `public/icons/next-feed/reactions/` = **13** SVG · no NEW SVG under `component-reactions/`.

**Disk status (CR-20 P3 `2026-10-18T12:05:46Z`):** `actions/react.svg` Present thumbs-up · `actions/reactions.svg` Present dual-circle · Gap v2 → §Reuse.

Derived-from-spec disclaimer: M154/M160 PNG = **visual reference** for strip+picker; icon grammar remains promote/`currentColor` (not Lucide).

---

## §Reuse — reaction marks (next-feed) — 13

All selectable marks use the same Runtime URL grammar. Origin (prior promote vs Gap-8) is irrelevant for implementers.

| Catalog id | Runtime URL | Master | Stories | Notes |
|------------|-------------|---------|---------|-------|
| `acknowledge` | `/icons/next-feed/reactions/acknowledge.svg` | `icons/reactions/acknowledge.svg` | CR-01…04 | Present |
| `support` | `/icons/next-feed/reactions/support.svg` | `icons/reactions/support.svg` | CR-01…04 | Present |
| `empathy` | `/icons/next-feed/reactions/empathy.svg` | `icons/reactions/empathy.svg` | CR-01…04 | Present · Gap-8 |
| `concern` | `/icons/next-feed/reactions/concern.svg` | `icons/reactions/concern.svg` | CR-01…04 | Present · Gap-8 |
| `sad` | `/icons/next-feed/reactions/sad.svg` | `icons/reactions/sad.svg` | CR-01…04 | Present · Gap-8 |
| `outraged_situation` | `/icons/next-feed/reactions/outraged-situation.svg` | `icons/reactions/outraged-situation.svg` | CR-01…04 | Present · Gap-8 · kebab file |
| `agree` | `/icons/next-feed/reactions/agree.svg` | `icons/reactions/agree.svg` | CR-01…04 | Present |
| `disagree` | `/icons/next-feed/reactions/disagree.svg` | `icons/reactions/disagree.svg` | CR-01…04 | Present |
| `useful_fact` | `/icons/next-feed/reactions/useful-fact.svg` | `icons/reactions/useful-fact.svg` | CR-01…04 | Present · Gap-8 · kebab file |
| `insightful` | `/icons/next-feed/reactions/insightful.svg` | `icons/reactions/insightful.svg` | CR-01…04 | Present · Gap-8 |
| `needs_evidence` | `/icons/next-feed/reactions/needs-evidence.svg` | `icons/reactions/needs-evidence.svg` | CR-01…04 | Present · Gap-8 · kebab file |
| `off_topic` | `/icons/next-feed/reactions/off-topic.svg` | `icons/reactions/off-topic.svg` | CR-01…04 (comment) | Present · kebab file |
| `aggressive` | `/icons/next-feed/reactions/aggressive.svg` | `icons/reactions/aggressive.svg` | CR-01…04 (comment) | Present · Gap-8 · moderation |

Master root: `spa-app/docs/UX/next/feed/dogestonia-icon-system-v1.0/`. Do not duplicate under `public/icons/component-reactions/`.

---

## §Reuse — chrome / status (next-feed + next-shell)

| Logical id | Runtime URL | Source | Use |
|------------|-------------|--------|-----|
| `react` | `/icons/next-feed/actions/react.svg` | NF | React trigger / open picker — thumbs-up (CR-20 Gap v2 closed) |
| `reactions` | `/icons/next-feed/actions/reactions.svg` | NF | Strip zone Reactions — dual-circle (CR-20 Gap v2 closed) |
| `comment` | `/icons/next-feed/actions/comment.svg` | NF | Strip zone Comment — Present |
| `share` | `/icons/next-feed/actions/share.svg` | NF | Strip zone Share — Present |
| `retry` | `/icons/next-feed/actions/retry.svg` | NF | Strip/picker retry |
| `warning` | `/icons/next-feed/status/warning.svg` | NF | scoped warning |
| `unavailable` | `/icons/next-feed/status/unavailable.svg` | NF | Reactions unavailable |
| `error` | `/icons/next-feed/status/error.svg` | NF | save-error |
| `success` | `/icons/next-feed/status/success.svg` | NF | selected check aid if needed |
| `info` | `/icons/next-feed/status/info.svg` | NF | capacity / helper |
| `close` | `/icons/next-shell/actions/close.svg` | NS | picker close |

---

## §Gap — closed (Gap-8)

Gap-8 (empathy, concern, sad, outraged_situation, useful_fact, insightful, needs_evidence, aggressive) **promoted 2026-10-14** → §Reuse. No emoji interim for selectable marks.

Evidence pack: [DOGEstonia-Gap8-reactions-v1.0/](DOGEstonia-Gap8-reactions-v1.0/).

---

## §Gap v2 — closed (M154 strip chrome · CR-20 `2026-10-18`)

> **Closed by [STORY-SPA-CR-20](STORY-SPA-CR-20-gap-v2-icon-generate.md):** Write + promote complete · rows moved to §Reuse chrome.  
> **Still forbidden:** 13 multicolor reaction-mark SVGs · Lucide · emoji. Marks stay `currentColor` + CSS accents (CR-14).

| Logical ID | Action done | Master | Runtime URL | Spec held |
|------------|-------------|--------|-------------|-----------|
| `react` | **Replaced** | `…/icons/actions/react.svg` | `/icons/next-feed/actions/react.svg` | Outline thumbs-up · viewBox 24 · stroke 2 · `currentColor` |
| `reactions` | **NEW Present** | `…/icons/actions/reactions.svg` | `/icons/next-feed/actions/reactions.svg` | Dual overlapping circles · viewBox 24 · stroke 2 · `currentColor` |

SHA-256: `react` `ec4922ba…049b28` · `reactions` `02d35604…747843` (manifest + `SHA256SUMS.txt`).

### Explicit non-goals (color) — held

| Item | Verdict |
|------|---------|
| Multicolor filled mark SVGs matching M154 PNG palette | **Not needed** — CSS accents |
| Separate light/dark mark files | **Not needed** — `data-theme` + tokens |
| Lucide / emoji interim | **Forbidden** |

---

## §Omit — not selectable (Topic-guarded defaults)

| Catalog id | Reason |
|------------|--------|
| `hopeful` | `enabledDefault: false` — omit as active option (M154) |
| `amused` | `enabledDefault: false` — omit as active option (M154) |

No active icon rows for these ids.

---

## §M155

People / ReactorsPopover / Connect = **OOS** (REQ-24 L8).  
If a later people surface needs reaction badges on avatars: **reuse** the same mark glyphs from §Reuse — **no** people/avatar NEW assets in this catalog.

---

## §Token map / a11y

- SVG masters use `currentColor` (M160 `ICON-COLOR`).  
- **Mark color in UI** = assign `reactions.v1` accent in CSS (picker tile / summary mark) — see CR-14.  
- Meaning never icon-only: visible localized label in picker; strip counts spoken with meaning.  
- Decorative marks: `aria-hidden` when adjacent text carries the name.  
- Theme via existing `data-theme`.

---

## §OOS / forbidden

| Item | Reason |
|------|--------|
| Lucide `ic-*` PNG generate for CR marks | NF/NS grammar = promote SVG |
| Copy NF/NS bytes into `component-reactions/` | reuse URLs only |
| M155 people avatars / Connect icons | OOS |
| Logo regeneration | reuse brand assets |
| Hopeful / amused masters | §Omit |
| Generate multicolor mark SVG set «to match PNG» | Use CSS accents · §Gap v2 non-goals |

---

## Handoff

- Product stories CR-01…04 cite **Runtime URL** from §Reuse (marks + chrome).  
- Visual wave CR-11…15 / CR-17…19: Gap v2 glyphs **Present** (CR-20).  
- Residual: CR-21/22 consume Present glyphs · OP eye still required for visual PASS.  
- Master index: [ICON-GENERATION-INDEX.md](../icons/ICON-GENERATION-INDEX.md) row **#10 · Reuse + Gap-8 Done · Gap v2 closed (CR-20)**.
