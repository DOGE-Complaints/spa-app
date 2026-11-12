# STORY-SPA-CR-03 — Lab reactions page

## Meta

- **Key:** `STORY-SPA-CR-03-lab-reactions-page`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Done · P5 TASKED=0 · `pkg-000139` · Await residual
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md) · FR-24.4 · AC-24-05/06
- **Depends on:** [CR-01](STORY-SPA-CR-01-reactions-mount-strip.md) · [CR-02](STORY-SPA-CR-02-reaction-picker.md) · [CR-api](STORY-SPA-CR-api-requirements.md)
- **Blocks:** CR-04
- **Code home (acceptance target):** `#/lab/reactions` route + fixture hosts (pattern: `#/lab/feed` in App shell Routes)

## Зачем

Lab route **`#/lab/reactions`**: two fixture hosts (thread-root + comment) mounting CR-01/CR-02 with **FixtureAdapter**; M154 stands; no people; no next-feed cutover.

## UX SSOT

- Spec/PNG: [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png) — lab stands mirror panels
- Pattern: `#/lab/feed` shell registration
- **OOS:** [M155](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md); `#/next/feed` cutover

## Icons

Via CR-01/CR-02 mounts — [CR-icon §Reuse](STORY-SPA-CR-icon-assets.md) Runtime URLs (`/icons/next-feed/reactions/…` · chrome). No separate icon story; no emoji interim.

## API

- [CR-api](STORY-SPA-CR-api-requirements.md): **FixtureAdapter required** on lab; LiveAdapter optional toggle later
- Fixtures cover empty / loading / populated / unavailable / save-error rollback
- No invent HTTP; no second client

## FR

- **FR-CR-03.1** Route `#/lab/reactions` under shell Routes (same pattern as lab feed)  
- **FR-CR-03.2** Two hosts: thread-root + comment  
- **FR-CR-03.3** FixtureAdapter drives strip + picker  
- **FR-CR-03.4** M154 states demonstrable; M155 people absent  
- **FR-CR-03.L10N** lab chrome may reuse feed/lab keys; reactions copy via CR-01/02  

## Вне scope

`#/next/feed` cutover; invent backend; people sheets; DS amend

## Тексты и переводы

### Reuse

CR-01/CR-02 keys · existing lab chrome if Present

### Draft (lab page chrome only)

| key | en | et | ru |
|-----|----|----|----|
| `reactions.lab.title` | Reactions lab | Reaktsioonide lab | Лаб реакций |
| `reactions.lab.host.root` | Thread root | Juurpostitus | Корень треда |
| `reactions.lab.host.comment` | Comment | Kommentaar | Комментарий |

## Acceptance Criteria

- [ ] `#/lab/reactions` reachable under shell Routes (AC-24-05)  
- [ ] Two fixture hosts: root + comment (AC-24-06)  
- [ ] FixtureAdapter default; no invent HTTP  
- [ ] M154 stands; no M155 people UI  
- [ ] Mounts CR-01 + CR-02; no second client  
