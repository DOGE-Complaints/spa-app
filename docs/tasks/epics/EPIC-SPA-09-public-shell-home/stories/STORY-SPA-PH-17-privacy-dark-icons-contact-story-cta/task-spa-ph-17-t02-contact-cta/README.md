# SPA-PH-17-T02 — Contact CTA under storyHint

**Status:** Done  
**Closed:** `2026-10-24T10:13:01Z`  

**Story:** [`../STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md`](../STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md)  
**ui_scope:** static-pages / public-home · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:09:06Z`  
**Package:** `pkg-000223`  
**Path A:** arch Present · Interview M6·M7 · evidence 07

## Purpose

FR-PH-17.2 · 17.3: Under Contact `storyHint`, add primary CTA → `VITE_STORY_GPT_URL` via `getStoryGptHref` / Header·PH-16 pattern. Reuse Present story-submit / HIW CTA i18n keys · **no invent** RU/ET.

## Code Facts (verify)

- AS-IS: Contact page / dict with `storyHint` · evidence 07 no CTA
- Present: `storyGptUrl.js` · `getStoryGptHref` · empty → `#`
- Target: typical primary Button under hint · env href · reuse labels

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent GPT URL** · no invent RU/ET · invent form POST OOS

## AC / DoD

- [ ] Contact CTA button Present · env href (structure)
- [ ] Label from Present keys · empty → `#`
- [ ] Visual Done not claimed without OP eye

## Where to change

`StaticPublicPage.jsx` / Contact route · `publicHomeDictionary.js` (reuse keys only)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "storyHint|getStoryGptHref|Contact|contact" spa-app/src/pages spa-app/src/i18n/publicHomeDictionary.js | head -40
```

## @mockup

```text
@mockup: spa-app/docs/architecture/public-home/17-privacy-dark-icons-contact-story-cta.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave5-2026-10-24/07-contact-story-hint-no-cta.png
```
