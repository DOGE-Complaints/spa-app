# STORY-SPA-NF-06 — Mounts + responsive + feed verify

## Meta
- **Key:** `STORY-SPA-NF-06-mounts-responsive-verify`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-06-mounts-responsive-verify/STORY-SPA-NF-06-mounts-responsive-verify.md)
- **Status:** Done · P3 (`2026-10-10T19:40:00Z`) · **`pkg-000108`**
- **Depends on:** NF-01…05 product surfaces; [register](NF-feed-mockup-intake-register.md) NF-I; [icon catalog](STORY-SPA-NF-icon-assets.md); [api-requirements §0/§4](STORY-SPA-NF-api-requirements.md); shell host Done
- **Code home:** `features/feed/` · Routes `#/next/feed` · `#/next/feed/issue/:id`
- **ui_scope:** `feed`

## Зачем
Issue mount parity (modal / sheet / route); narrow feed **body** stress (M159 chrome owned by shell); theme/L10n interaction stress; Vitest + browser-smoke **feed** critical states; icon URL smoke for `/icons/next-feed/…`.

## UX SSOT
- Spec: [M158](../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md) · [M159](../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md) (**feed body** only) · [M160](../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md)
- PNG: [M158](../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png) · [M159](../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.png) · [M160](../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png)
- Register: [NF-feed-mockup-intake-register.md](NF-feed-mockup-intake-register.md) row NF-I → NF-06
- States: modal / sheet / route parity; narrow feed body; theme / L10n stress

## Icons (from STORY-SPA-NF-icon-assets.md)
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| Close mount | `close` | `/icons/next-shell/actions/close.svg` (reuse) |
| Catalog smoke | *(all NF promoted)* | `/icons/next-feed/<group>/<name>.svg` — 404-free after ADMIN-NF-02 |

## API
- No new API — [api-req §0 NF-06](STORY-SPA-NF-api-requirements.md) · reuse gateway/threads/identity from NF-01…05
- Icons static — not HTTP API ([§4](STORY-SPA-NF-api-requirements.md))

## Функциональные требования (FR)
- **FR-NF-06.1** Issue detail parity across modal / sheet / `#/next/feed/issue/:id` for claimed feed content.
- **FR-NF-06.2** Narrow viewport: feed **body** usable; mobile shell chrome = next-shell (OOS here).
- **FR-NF-06.3** Theme (`data-theme`) + locale stress: no broken critical feed controls.
- **FR-NF-06.4** Verify: Vitest + browser-smoke covering feed critical states (PRODUCT-BRIEF); icon URLs for catalog slots resolve under Vite public.
- **FR-NF-06.L10N** reuse existing; draft `nextFeed.mount.*` for mount chrome only if needed.

## Вне scope
- Shell mobile chrome / `/` flip / classic shelter (next-shell Done)
- Creating artboards; invent API; M155

## Тексты и переводы (en / et / ru)

| key | en | et | ru |
|-----|----|----|----|
| `nextFeed.mount.close` | Close | Sulge | Закрыть |
| `nextFeed.mount.openAsPage` | Open as page | Ava lehena | Открыть как страницу |
| `nextFeed.verify.smokeNote` | Feed critical paths smoke | Voogi kriitiliste teede suitsutest | Смоук критических путей ленты |

## Acceptance Criteria
- [x] Mount parity + narrow body + theme/L10n stress per M158–M160 (feed body claim)
- [x] Vitest + browser-smoke feed critical states; catalog `/icons/next-feed/…` 404-free
- [x] No new HTTP; shell chrome OOS explicit
- [x] Links register + api-req + icon catalog
