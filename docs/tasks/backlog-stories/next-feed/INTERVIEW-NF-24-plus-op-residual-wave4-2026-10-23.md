# Interview SSOT — OP residual wave 4 (marks 1–8)

- **Дата:** 2026-10-23  
- **Тип:** Markstack intake · spa residual after wave3 Apply  
- **Evidence:** [evidence/op-residual-wave4-2026-10-23/](../../../analysis/evidence/op-residual-wave4-2026-10-23/)  
- **Wave3 validation:** [analysis-markstack-wave3-code-validation-2026-10-23.md](../../../analysis/analysis-markstack-wave3-code-validation-2026-10-23.md)  
- **UX intake:** [analysis-wave4-ux-intake-m169-m172-2026-10-23.md](../../../analysis/analysis-wave4-ux-intake-m169-m172-2026-10-23.md) **PASS** (M169–M172)  
- **Пакеты:** next-feed · next-shell · public-home · cabinet  
- **Prior:** [INTERVIEW-NF-21-plus…](INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md)  
- **Wave:** **1A** docs only · Method [markstack-intake.md](../../../../../docs/methodology/Zeya888-builder-queue/prompts/architect/markstack-intake.md)

## Решения оператора

| # | Тема | Решение |
|---|------|---------|
| W1 | Delivery | Docs Markstack only · Apply later |
| M1 | Map sheet | Leaves sheet + pin popup + MapIssuePreview follow `data-theme` (light→light) · pointer atom = **IssueMapPin** · cluster UI = **leaves sheet** |
| L2 | Brand | Transparent **PNG** light + dark (not raster-in-SVG) · header+footer same family · **no** tagline beside mark |
| S3 | Profile shell | `/profile` → next shell (Header + ProfileRail + PublicFooter) |
| R4 | Rail Stories | Freeze/hide **My stories** in ProfileRail · stories only in User profile |
| P5 | Cabinet | Cite M45/M28/M99 · hide Wallet + Contribution (gate) · compact verified · Story Activity full-width · wire `GET /story-activity` · CTA → `/next/feed` |
| H6 | How It Works | Deep UX (visuals + copy + landing CTA leftward) |
| H7 | Header chrome | Hide search + notifications · keep code gated |
| S8 | Static pages | About / Privacy / Contact content frames (UX) |
| OOS | — | Invent OP PASS · invent legal prose · invent CDN · empty pipelines · unfreeze Stories in shell |

## Sufficiency (gate before L1)

| Mark | Class | Artifact |
|------|-------|----------|
| 1 | CSS/code | NF-24 |
| **2** | **UX** | [M169](../../../UX/mockups/home/DOGEstonia-M169-brand-png-dual-header-footer-spec-v1.0.md) intake PASS → NS-14 · soft prompt |
| 3 | CSS/code | NS-11 |
| 4 | CSS/code | NS-12 |
| **5** | **UX** + code | [M170](../../../UX/mockups/user%20profile/DOGEstonia-M170-cabinet-layout-no-wallet-contrib-spec-v1.0.md) intake PASS → CAB-08 |
| **6** | **UX** | [M171](../../../UX/mockups/home/DOGEstonia-M171-how-it-works-approved-copy-spec-v1.0.md) intake PASS → PH-14 (**supersedes** M168 content order) |
| 7 | CSS/code | NS-13 |
| **8** | **UX** | [M172](../../../UX/mockups/home/DOGEstonia-M172-static-pages-copy-RU-EN-ET-spec-v2.0.md) + [Privacy downloads](../../../UX/mockups/home/DOGEstonia-M172-privacy-document-downloads-spec-v1.0.md) → PH-15 |

**Order:** Interview → UX-PROMPTS 2·5·6·8 → intake M169–M172 **PASS** → Await Apply.

### Intake supersessions (2026-10-23)

| Lock | Tip SSOT |
|------|----------|
| L2 | M169 — transparent PNG dual · no footer tagline · production masters soft TBD |
| P5 | M170 — layout gate wallet/contrib · full-width activity |
| H6 | M171 — RU verbatim · EN pack · Telegram step before Issues · no invent ET |
| S8 | M172 — About/Contact copy · Privacy = PDF download hub (rev 3) · PDFs in `public/docs/` |

## Story allocation

| Mark | Story | Package |
|------|-------|---------|
| 1 | NF-24 | next-feed |
| 2 | NS-14 | next-shell · soft public-home |
| 3 | NS-11 | next-shell |
| 4 | NS-12 | next-shell |
| 5 | CAB-08 | cabinet |
| 6 | PH-14 | public-home |
| 7 | NS-13 | next-shell |
| 8 | PH-15 | public-home |

## Explicit non-goals

Product Apply this wave · invent artboard PNG · invent OP PASS · invent legal copy · empty epic pipelines
