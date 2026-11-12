# Interview SSOT — OP residual wave 5 (marks 1–14)

- **Дата:** 2026-10-24  
- **Тип:** Markstack intake · spa residual after wave4 Apply/P8  
- **Evidence:** [evidence/op-residual-wave5-2026-10-24/](../../../analysis/evidence/op-residual-wave5-2026-10-24/)  
- **Wave4 validation:** [analysis-markstack-wave4-code-validation-2026-10-24.md](../../../analysis/analysis-markstack-wave4-code-validation-2026-10-24.md)  
- **UX intake:** [analysis-wave5-ux-intake-m173-m176-2026-10-24.md](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) **PASS** (M173–M176 + brand light/dark tip)  
- **Пакеты:** next-shell · public-home · next-feed · component-reactions · component-thread  
- **Prior:** [INTERVIEW-NF-24-plus…](INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md)  
- **Wave:** **1A** docs only · Method [markstack-intake.md](../../../../../docs/methodology/Zeya888-builder-queue/prompts/architect/markstack-intake.md)  
- **Vars:** `builder_project: spa` · locks **1A** · tip PASS · **Await Apply**

## Решения оператора

| # | Тема | Решение |
|---|------|---------|
| W1 | Delivery | Docs Markstack only · Apply later · no invent OP PASS |
| M1 | Light logo | Light header brand wrong/strange · replace with OP tip PNG |
| M2 | HIW CTA URL | «Start interview…» → **`VITE_STORY_GPT_URL`** (как шапка) · supersede Telegram-env for **this** button |
| M3 | Concept FAQ | «Concept & FAQ on landing» → **`.env`** (`VITE_LANDING_FAQ_URL`) · не хардкод |
| M4 | Footer light logo | Same OP light PNG as header · promote to `public/assets/` · **no** text beside footer mark · cleanup кривых |
| M5 | Footer dark logo | Match **header** dark brand (OP eye correct) · not `logo-big` |
| M6 | Privacy dark | Icons readable on dark theme |
| M7 | Contact CTA | Under storyHint — typical story-create CTA button |
| M8 | Default theme | Unset storage / user → **light** (сейчас `bootTheme` → dark) |
| M9 | Own React empty | UX redesign strip empty/filled · гармония с Comment |
| M10 | List hydrate | Own reactions не грузятся на list load (detail CR-25 Present) |
| M11 | Attach preview | Comment attach shows «Selected image» text · no image preview |
| M12 | Comment React empty | UX redesign empty vs Reply · гармония |
| M13 | Filters UX | Redesign popover · width · controls · dates не «inactive» |
| M14 | Peer empty | Icon/affordance when peer Reactions empty · не скудно |
| OOS | — | Invent OP PASS · invent CDN · invent legal · empty pipelines · invent Telegram handle |

## Probe (code)

| # | State | Evidence |
|---|-------|----------|
| 1·4·5 | Present wrong | Header SVG/raster · Footer `DOGEstonia-logo-big.png` · OP tip `docs/UX/raw input/DOGEstonia light theme logo-1.png` |
| 2 | Present wrong | `HowItWorksPage` → `getTelegramInterviewHref()` · Header uses `VITE_STORY_GPT_URL` |
| 3 | Present wrong | `HOW_IT_WORKS_LANDING_FAQ_HREF` hardcoded in `howItWorksDictionary.js` |
| 6 | Present wrong | Privacy `<img>` icons · dark contrast fail (shot 06) |
| 7 | Present Partial | Contact `storyHint` text · no CTA button |
| 8 | Present wrong | `bootTheme.applyDefaultTheme` → `'dark'` when unset |
| 9 | Present | Own strip empty misalign (shot 09) |
| 10 | Partial | `FeedIssueDetail` hydrates · `FeedListArea` **omits** `initialSelected` |
| 11 | Partial | CT-31 policy A Present · OP eye still «Selected image» text (shot 11) |
| 12 | Present | Comment React empty vs Reply (shot 12) |
| 13 | Present | Filters narrow / date look (shot 13) · NF-21/22 structure held |
| 14 | Present | Peer Reactions empty sparse (shot 14) |

## Sufficiency (gate before L1)

| Mark | Class | Artifact |
|------|-------|----------|
| 1·4·5 | **code/asset** | NS-15 · tip masters [dogestonia-brand-{light,dark}.png](../../../UX/mockups/home/m169-brand-source/) **Present** |
| 2·3 | **code** | PH-16 · env CTAs |
| 6·7 | **CSS/code** | PH-17 |
| 8 | **code** | NS-16 |
| 10 | **code** | CR-27 |
| 11 | **code** | CT-34 (soft CT-31 residual) |
| **9** | **UX** | [M173](../../../UX/next/feed/artboards/DOGEstonia-M173-own-react-empty-filled-harmony-spec-v1.0.md) intake **PASS** → CR-26 Ready Apply |
| **12** | **UX** | [M174](../../../UX/next/feed/artboards/DOGEstonia-M174-comment-react-reply-harmony-spec-v1.0.md) intake **PASS** → CT-35 Ready Apply |
| **13** | **UX** | [M175](../../../UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md) intake **PASS** → NF-25 Ready Apply |
| **14** | **UX** | [M176](../../../UX/next/feed/artboards/DOGEstonia-M176-peer-reactions-layout-spec-v1.0.md) intake **PASS** → CR-28 Ready Apply |

**Order:** Interview → UX-PROMPTS → intake M173–M176 **PASS** · tip masters Present · **Await Apply**.

### Intake supersessions

| Lock | Tip |
|------|-----|
| M2 | HIW interview CTA → **`VITE_STORY_GPT_URL`** (supersede `VITE_TELEGRAM_INTERVIEW_URL` for that button only · helper may remain for other surfaces) |
| M3 | Landing FAQ → **`VITE_LANDING_FAQ_URL`** · supersede hardcoded `HOW_IT_WORKS_LANDING_FAQ_HREF` |
| M4·M5 | OP light+dark PNG tip masters in `m169-brand-source/` · soft-close NS-14 masters Absent for Apply copy |
| M8 | Default theme **light** · supersede boot default dark |
| M9 | M173 — icon-above-label · reserved 3-slot lane |
| M12 | M174 — comment pill horizontal · empty compact · filled Reply centers on React stack |
| M13 | M175 — wider filters · active-looking dates · NF-21 held |
| M14 | M176 rev2 — empty peer people icon **above** label |

## Story allocation

| Mark | Story | Package |
|------|-------|---------|
| 1·4·5 | NS-15 | next-shell · soft public-home |
| 2·3 | PH-16 | public-home |
| 6·7 | PH-17 | public-home |
| 8 | NS-16 | next-shell |
| 9 | CR-26 | component-reactions |
| 10 | CR-27 | component-reactions · soft next-feed |
| 11 | CT-34 | component-thread |
| 12 | CT-35 | component-thread |
| 13 | NF-25 | next-feed |
| 14 | CR-28 | component-reactions |

## Explicit non-goals

Product Apply this wave · invent artboard PNG beyond OP tip · invent OP PASS · invent legal copy · empty epic pipelines · invent CDN · invent Telegram handle
