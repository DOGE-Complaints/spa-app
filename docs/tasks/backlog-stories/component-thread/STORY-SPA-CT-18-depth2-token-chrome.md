# STORY-SPA-CT-18 — M153b depth-2 token chrome (A–D)

## Meta

- **Key:** `STORY-SPA-CT-18-depth2-token-chrome`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P6 T06 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-18-depth2-token-chrome/STORY-SPA-CT-18-depth2-token-chrome.md) · `pkg-000176` · `run_mode=spa_ct18_p5_gap`
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-13 · CT-14 (structure Present · visual targets superseded)
- **Blocks:** CT-19 soft · OP eye Depth 2.0 A–D
- **UX mirror:** [OP-UX M153a/b gaps 10-20](OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)
- **Analysis:** [visual depth2 gaps](../../../analysis/analysis-lab-feed-thread-visual-depth2-gaps-2026-10-20.md) · [intake](../../../analysis/analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md)
- **Artboard tip:** [M153b v1.0](../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) §§3–6 · §8
- **Code home:** `thread-mount` CSS · `CommentNode` · React/Reply controls · spine/bubble

## Зачем

Depth 2.0 computedStyle audit: lab AS-IS (blue-grey mix · ~32px pills · `#2E90FA`) **rejected** by operator-accepted M153b token table. CT-13/CT-14 delivered structure; this story re-targets **visual tokens** A–D (bubble, spine/L-elbow, React/Reply ≥44px shared group, selected reply parent) to M153b. Rem-root Drift (`html` 14px): implement M153b sizes in **px**, not rem assuming 16.

## FR

- **FR-CT-18.1** Comment bubble tokens match M153b §3 (fill/border/radius/pad as specified).  
- **FR-CT-18.2** Continuous spine + L-elbow match M153b §4.  
- **FR-CT-18.3** React / Reply pill pair: shared group chrome · each control **≥44px** touch · locked palette (no `#2E90FA` AS-IS).  
- **FR-CT-18.4** Selected reply parent marker matches M153b §6.  
- **FR-CT-18.5** CSS uses **px** values per M153b §8 (honest vs rem root 14px).  
- **FR-CT-18.6** Depth 2.0 computedStyle audit PASS on A–D atoms.

## Вне scope

Attach picker (CT-17) · AttachmentRef Ready/Denied paint (CT-19) · dual-append (CT-16) · comment reaction **summary** redesign (HOLD) · invent hex outside M153b register · `#/next/feed`

## Acceptance Criteria

- [ ] Bubble computedStyle Match vs M153b §3  
- [ ] Spine / L-elbow Match vs §4  
- [ ] React/Reply ≥44px · locked palette Match vs §5  
- [ ] Reply parent marker Match vs §6  
- [ ] No rem-as-16 assumption for these tokens  
- [ ] Depth 2.0 harness A–D PASS  
- [ ] OP eye gate (Absent = BLOCK)

## Technical subtasks

> Skill: `react-expert` · Arch [§12](ARCHITECTURE.md) · Await Apply / P1.3

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-18-t01-bubble` | Done | Apply M153b §3 bubble tokens in px | thread-mount CSS | 18.1 · 18.5 |
| `task-spa-ct-18-t02-spine` | Done | Apply M153b §4 spine / L-elbow | CSS · CommentTree | 18.2 |
| `task-spa-ct-18-t03-pills-44` | Done | Shared React/Reply group ≥44px · locked palette | CommentNode chrome | 18.3 |
| `task-spa-ct-18-t04-reply-parent` | Done | Selected reply parent marker §6 | CSS · composer reply | 18.4 |
| `task-spa-ct-18-t05-depth2-audit` | Done | Re-run Depth 2.0 computedStyle A–D PASS | puppeteer visual harness | 18.6 |
| `task-spa-ct-18-t06-screenshots-root-readme` | Done | Audit F2 story-root screenshots README indexer | docs screenshots/ | P5 F2 |

### Constraints

- No invent palette beyond M153b  
- HOLD summary unchanged  
- Chip paint → CT-19

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Lab thread A–D chrome matches M153b written tokens under Depth 2.0 audit.
