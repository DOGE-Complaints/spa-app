# STORY-SPA-NS — Icon assets catalog (next-shell)

> **Package:** [next-shell](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Admin:** [ADMIN-NS-03-icon-assets-catalog.md](ADMIN-NS-03-icon-assets-catalog.md)  
> **Method:** **Index + promote plan** — masters already in icon-system; **do not** generate Lucide/`ic-*` PNG or new SVG. Runtime copy = later implement wave (name ≠ create this ADMIN).

## Meta / SSOT

| Role | Path |
|------|------|
| Masters (immutable docs) | [`docs/UX/next/feed/dogestonia-icon-system-v1.0/`](../../../UX/next/feed/dogestonia-icon-system-v1.0/) |
| Manifest | [DOGEstonia-icon-manifest-v1.0.md](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-manifest-v1.0.md) |
| Token map | [DOGEstonia-icon-token-map-v1.0.md](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md) |
| Asset Manifest | [DOGEstonia-asset-manifest-v1.0.md](../../../UX/next/feed/DOGEstonia-asset-manifest-v1.0.md) |
| Mockup register | [NS-shell-mockup-intake-register.md](NS-shell-mockup-intake-register.md) |

## Runtime grammar

| Role | Path |
|------|------|
| Master | `spa-app/docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/<group>/<name>.svg` |
| Runtime (planned) | `spa-app/public/icons/next-shell/<group>/<name>.svg` |
| URL in app | `/icons/next-shell/<group>/<name>.svg` |
| Header logo | **Reuse** `/assets/DOGEstonia-logo-horizontal.png` · fallback `/assets/DOGEstonia-logo-fallback.svg` |

Do **not** place next-shell glyphs under `public-home/`, `threads-feed/`, etc.

**Disk status (this ADMIN close):** masters = **Present** (verified) · `public/icons/next-shell/` = **Absent** until promote.

---

## Shell subset (verified masters)

| Logical ID | Master (repo-relative) | Runtime URL | Stories | Manifest status | Master on disk |
|------------|------------------------|-------------|---------|-----------------|----------------|
| `board` | `docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/navigation/board.svg` | `/icons/next-shell/navigation/board.svg` | NS-02/03/04 | approved | Present |
| `profile` | `…/icons/navigation/profile.svg` | `/icons/next-shell/navigation/profile.svg` | NS-03/04 | approved | Present |
| `my-stories` | `…/icons/navigation/my-stories.svg` | `/icons/next-shell/navigation/my-stories.svg` | NS-03 | proposed master | Present |
| `search` | `…/icons/navigation/search.svg` | `/icons/next-shell/navigation/search.svg` | NS-02 (affordance; live search OOS) | approved | Present |
| `menu` | `…/icons/navigation/menu.svg` | `/icons/next-shell/navigation/menu.svg` | NS-02/04 | proposed | Present |
| `theme-light` | `…/icons/navigation/theme-light.svg` | `/icons/next-shell/navigation/theme-light.svg` | NS-02 | proposed | Present |
| `theme-dark` | `…/icons/navigation/theme-dark.svg` | `/icons/next-shell/navigation/theme-dark.svg` | NS-02 | proposed | Present |
| `notifications` | `…/icons/navigation/notifications.svg` | `/icons/next-shell/navigation/notifications.svg` | NS-02 | proposed | Present |
| `account` | `…/icons/navigation/account.svg` | `/icons/next-shell/navigation/account.svg` | NS-02 | proposed | Present |
| `back` | `…/icons/navigation/back.svg` | `/icons/next-shell/navigation/back.svg` | NS-04 | proposed | Present |
| `close` | `…/icons/actions/close.svg` | `/icons/next-shell/actions/close.svg` | NS-04 | proposed | Present |
| `location` | `…/icons/actions/location.svg` | `/icons/next-shell/actions/location.svg` | NS-03 | proposed | Present |
| `chevron-down` | `…/icons/actions/chevron-down.svg` | `/icons/next-shell/actions/chevron-down.svg` | NS-03 as needed | proposed | Present |
| `verified` | `…/icons/status/verified.svg` | `/icons/next-shell/status/verified.svg` | NS-03 | proposed | Present |
| **logo** | — | `/assets/DOGEstonia-logo-horizontal.png` (+ `/assets/DOGEstonia-logo-fallback.svg`) | NS-02 | reuse as-is | Present (spa `public/assets`) |

Ellipsis `…` = `docs/UX/next/feed/dogestonia-icon-system-v1.0`.

---

## §Promote checklist (later wave — not this ADMIN)

When implement / NS story / ADMIN-NS-06 tasks run:

```bash
# From spa-app/ (illustrative)
mkdir -p public/icons/next-shell/{navigation,actions,status}
cp docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/navigation/{board,profile,my-stories,search,menu,theme-light,theme-dark,notifications,account,back}.svg \
  public/icons/next-shell/navigation/
cp docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/actions/{close,location,chevron-down}.svg \
  public/icons/next-shell/actions/
cp docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/status/verified.svg \
  public/icons/next-shell/status/
```

- Preserve relative group folders.  
- Wire Header/rail to `/icons/next-shell/…` (replace PH menu PNG where applicable).  
- **Logo:** do not copy from icon-system; keep existing `/assets/DOGEstonia-logo-*`.  
- Smoke: URLs 404-free after promote.

---

## §Token map

SVG masters use `currentColor`. Assign semantic tokens in consuming components per [icon token map](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md) (shell navigation row: surface + primary/secondary text; active/focus via action tokens). Theme via existing `data-theme` — do not bake light/dark into separate hex icons except where theme-light/theme-dark glyphs are the control affordance.

---

## §a11y (from icon manifest)

- Visible localized label beside icon when required; icon may be decorative (`aria-hidden`).  
- Icon-only controls: localized accessible name on the control.  
- `language` logical ID is **excluded** (text selector) — reuse existing LocaleSelector, no glyph invent.

---

## §Deferred → next-feed

Promote/index under `public/icons/next-feed/` in [next-feed](../next-feed/INDEX.md) ADMIN-NF-03, not here:

- `reactions/*` (`acknowledge`, `support`, `agree`, `disagree`, `off-topic`)
- `map-pin` (+ selected reuse)
- `react`, `comment`, `share`, `send`, `attach`, `reply`, `open-issue`, `more`
- `list-view`, `map-view`, `filter`
- `collaboration-invite` (invite stub chrome may still cite later)

Shared nav already listed above stays under `next-shell`; next-feed **reuses** `/icons/next-shell/…` when needed.

---

## Handoff

- Stories NS-02…04 cite this catalog’s **Runtime URL** column.  
- Next admin: [ADMIN-NS-04](ADMIN-NS-04-api-requirements.md) (parallel-capable with 03).  
- Master index: [ICON-GENERATION-INDEX.md](../icons/ICON-GENERATION-INDEX.md) row **Promote/index Done**.
