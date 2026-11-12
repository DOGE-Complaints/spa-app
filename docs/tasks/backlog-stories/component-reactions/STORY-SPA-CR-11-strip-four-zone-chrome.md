# STORY-SPA-CR-11 — PostActionStrip four-zone chrome (M154/M160)

## Meta

- **Key:** `STORY-SPA-CR-11-strip-four-zone-chrome`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P5 APPLY · TASKED=0 · gate **BLOCK** · `pkg-000147` · `2026-10-16T10:36:02Z` · **tip**
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-icon §Gap v2](STORY-SPA-CR-icon-assets.md) (thumbs-up `react` · `reactions`) · CR-08 (theme tokens)
- **Blocks:** CR-12
- **UX mirror:** [OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.1 · §3.2 · §3.4
- **Code home:** `FeedPostActionStrip` · CSS · lab card/detail hosts

## Зачем

Вернуть полоску к мокапу: **4 зоны** с icon+label одного веса; React = thumbs-up (не smiley-pill); Comment/Share с иконками; Reactions dual-circle; M160 hover/selected; на узком — 2×2.

**Supersedes CR-09** 3-zone / no-Reactions chrome (composition A+C+B).

## UX SSOT

- M154 strip row · M160 §D React states · M160 §E 2×2  
- Icons: `/icons/next-feed/actions/{react,comment,share,reactions}.svg`  
- OOS: aggregate row wiring → CR-12 · picker tiles → CR-13 · M155

## FR

- **FR-CR-11.1** Strip has exactly **4** zones: react · comment · share · reactions (`data-lab-strip-zones="4"`).  
- **FR-CR-11.2** Each zone shows icon + localized label; equal chrome (no React-only bordered pill).  
- **FR-CR-11.3** React glyph = thumbs-up Runtime URL after Gap v2 promote.  
- **FR-CR-11.4** Reactions zone uses `reactions` dual-circle glyph.  
- **FR-CR-11.5** React rest/hover/focus/selected/disabled per M160 §D (yellow selected).  
- **FR-CR-11.6** At narrow lab stress (~320 / 200%): strip CSS becomes **2×2** grid.  

## Вне scope

Aggregate row under strip (CR-12) · picker layout (CR-13) · `#/next/feed` · invent HTTP · M155  

## Acceptance Criteria

- [ ] `#/lab/feed` strip shows 4 icon+label zones  
- [ ] React is thumbs-up (not smiley) after Gap promote  
- [ ] Reactions zone Present with dual-circle icon  
- [ ] Hover/selected React matches M160 tone (token-based)  
- [ ] Narrow stress: 2×2 layout  
- [ ] Vitest: zone count 4 · testids `feed-post-action-{react,comment,share,reactions}`  
- [ ] Verify: `http://127.0.0.1:5173/#/lab/feed`  

## Technical subtasks

> P1.3 activated `2026-10-16T10:27:28Z` · Skill: `react-expert` · pipeline [STORY-SPA-CR-11](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-11-strip-four-zone-chrome/STORY-SPA-CR-11-strip-four-zone-chrome.md) · `pkg-000147` · Gap v2 residual (no invent SVG)

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-11-t01-four-zones-icons` | Done | Restore ZONES +4; render icon+label per zone; wire Runtime URLs | `FeedPostActionStrip.jsx` + `.css` | 11.1–11.4 |
| `task-spa-cr-11-t02-react-m160-states` | Done | Rest/hover/focus/selected/disabled styles for React zone | strip CSS · optional `data-rm-react-state` | 11.5 |
| `task-spa-cr-11-t03-narrow-2x2` | Done | Grid 2×2 under lab viewport/zoom attrs | `FeedPostActionStrip.css` · FeedLabPage stress attrs | 11.6 |
| `task-spa-cr-11-t04-vitest-strip-chrome` | Done | Update nflab/cr09 tests: zones=4 · icon presence | `feed-lab/__tests__/*` | AC |

### Constraints (all tasks)

- No invent HTTP / M155 / `#/next/feed`  
- Do not bake hex into SVG; Gap v2 promote first for glyphs  
- Do not implement aggregate row here (CR-12)  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04`

## DoD

Strip chrome on lab feed matches M154/M160 zone grammar; ready for CR-12 behavior split.
