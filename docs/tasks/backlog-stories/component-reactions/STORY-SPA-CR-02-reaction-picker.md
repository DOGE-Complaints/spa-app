# STORY-SPA-CR-02 — Reaction picker

## Meta

- **Key:** `STORY-SPA-CR-02-reaction-picker`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Done · P5 TASKED=0 · `pkg-000138` · Await P8 residual
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md) · FR-24.2/3 · AC-24-02/03/04
- **Depends on:** [CR-01](STORY-SPA-CR-01-reactions-mount-strip.md) · [CR-icon](STORY-SPA-CR-icon-assets.md) · [CR-api](STORY-SPA-CR-api-requirements.md)
- **Blocks:** CR-03
- **Code home (acceptance target):** picker surfaces owned by ReactionsMount package (desktop + mobile)

## Зачем

Reaction picker: desktop popover + mobile sheet; three groups on comment; root without selectable Moderation; capacity ≤3; Agree/Disagree XOR; React always opens picker; save-error restore previous selection.

## UX SSOT

- Spec/PNG: [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png) — panels B / C / D / E; THREAD-ROOT-SCOPE
- **OOS:** [M155](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)

## Icons

SSOT: [CR-icon §Reuse](STORY-SPA-CR-icon-assets.md) — same Runtime URLs as CR-01 (13 marks + chrome). Agree/Disagree = `/icons/next-feed/reactions/agree.svg` · `disagree.svg`. Close = `/icons/next-shell/actions/close.svg`. No emoji interim.

## API

- [CR-api](STORY-SPA-CR-api-requirements.md): FixtureAdapter save / rollback; LiveAdapter `react` / `getKnobs` later — **no invent HTTP**, no second client
- Capacity / XOR enforced client-side before save

## FR

- **FR-CR-02.1** Comment: Emotional + Epistemic + Moderation groups; root: no selectable Moderation  
- **FR-CR-02.2** Max 3 selectable; Agree XOR Disagree  
- **FR-CR-02.3** Desktop popover + mobile sheet (viewport rule on implement)  
- **FR-CR-02.4** React control always opens picker (even with selection)  
- **FR-CR-02.5** Save error → restore previous selection (no silent empty)  
- **FR-CR-02.L10N** reuse `threadsFeed.reactions.*`

## Вне scope

People lists; invent HTTP; `#/next/feed` cutover; hopeful/amused as selectable

## Тексты и переводы

### Reuse (Present)

`threadsFeed.reactions.react` · `close` · `chooseUpTo` · `enabledOnlyHelper` · `agreeDisagreeExclusive` · `layer.emotional|epistemic|moderation` · `id.*` (omit hopeful/amused selectable)

### Draft (if missing)

| key | en | et | ru |
|-----|----|----|----|
| `reactions.picker.saveError` | Couldn’t save. Selection restored. | Salvestamine ebaõnnestus. Valik taastatud. | Не удалось сохранить. Выбор восстановлен. |
| `reactions.picker.capacity` | Choose up to 3 | Vali kuni 3 | Выберите до 3 |

(Prefer `threadsFeed.reactions.chooseUpTo` when Present.)

## Acceptance Criteria

- [ ] Three groups on comment; root no selectable Moderation (AC-24-02)  
- [ ] Capacity 3 + Agree/Disagree XOR (AC-24-03)  
- [ ] Desktop + mobile surfaces per M154 B/C  
- [ ] React always opens picker  
- [ ] Save-error restore (AC-24-04)  
- [ ] Icons = CR-icon §Reuse Runtime URLs (incl. agree/disagree); API CR-api fixtures / reuse map  
- [ ] L10N: reuse Present keys; ids not user copy  
