# UI mockup spec — SPA-CAB-04-T01 (anchor)

**Story:** STORY-SPA-CAB-04-story-activity-card  
**Path A:** extends existing mockup SSOT (operator `@mockup:` M45 + M23 — human gate skip)  
**Viewport:** 1536×1024  
**Route:** `/#/profile`  
**ui_scope:** `mixed` · **ui_anchor:** `true`

## Extends mockup

- [mockup-45-story-activity-state-sheet-spec.md](../../../../../../UX/mockups/user%20profile/mockup-45-story-activity-state-sheet-spec.md) — states A–E SSOT
- [mockup-45-story-activity-state-sheet-spec.md.png](../../../../../../UX/mockups/user%20profile/mockup-45-story-activity-state-sheet-spec.md.png)
- [mockup-23-user-cabinet-empty-new-user-spec.md](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md) — Empty §Story Activity (MVP empty CTA)
- [mockup-23-user-cabinet-empty-new-user-spec.png](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.png)

Placement: M99 story slot below Civic (CAB-01).

## Component

```tsx
<StoryActivityCard
  state={/* active|empty|draft|verify_required|unavailable */}
  onVerify={() => navigate('/verify')}
  onGoToBoard={() => navigate('/board')}
/>
```

Mounted in `cabinet-slot-story` on `UserCabinetPage`. **New** component (not reuse civic).

## MVP product deltas vs M45 artboard

| Topic | M45 artboard | MVP AC (backlog) |
|-------|--------------|------------------|
| Empty primary | Submit First Story | **Go to Board** (`storyHandoff.cta.goToBoard`) — M23 |
| Resume Draft | → `/story/submit?draft_id=` | → `cabinet.common.comingSoon` (no GW HTTP) |
| Retry / metrics drill-down | load / navigate | → `cabinet.common.comingSoon` |
| Verify Account | CTA | → `/verify` (allowed, no GW) |
| HTTP | live activity API | **none** in MVP |

## Selectors

| Element | Selector |
|---------|----------|
| Cabinet page | `[data-testid="user-cabinet-page"]` |
| Story slot | `[data-testid="cabinet-slot-story"]` |
| Card root | `[data-story-activity-card]` |
| State | `[data-story-activity-state="active\|empty\|draft\|verify_required\|unavailable"]` |

## States (M45 letters)

| Letter | State key | Runtime trigger (DEV) |
|--------|-----------|------------------------|
| A | `active` | `sessionStorage['doge.story-activity-preview']=active` |
| B | `empty` | default MVP / `preview=empty` |
| C | `draft` | `preview=draft` |
| D | `verify_required` | `preview=verify` |
| E | `unavailable` | `preview=unavailable` |

## Visual rules

- Card owns title (no duplicate `user-cabinet-page__slot-title` in story slot)
- Icons: `/icons/user-cabinet/ic-story-*`, `ic-status-*` + story-handoff reuse
- L10N: `cabinet.story.*` + reuse `storyHandoff` / `civic` / `cabinet.common`
- Privacy: metadata only (no full story text / phone / wallet / moderation)

## Baseline

See [ui-baseline/README.md](./ui-baseline/README.md).

## Operator gate

Path A — accepted via P3 `@mockup:` M45 + M23 md+png (no Path B interview).
