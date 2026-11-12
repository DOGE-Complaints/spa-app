# ADMIN-NF-02 — Icon index + runtime promote (`public/icons/next-feed/`)

## Meta

- **Key:** `ADMIN-NF-02-icon-assets-catalog`
- **Status:** Done
- **Depends on:** [ADMIN-NF-01](ADMIN-NF-01-ux-mockup-intake.md)
- **Blocks:** ADMIN-NF-04
- **Skill:** asset catalog / **promote** — **не** рисовать иконки
- **SSOT masters:** [dogestonia-icon-system-v1.0/](../../../UX/next/feed/dogestonia-icon-system-v1.0/) · [manifest](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-manifest-v1.0.md) · [token map](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md)
- **Deliverable:** [`STORY-SPA-NF-icon-assets.md`](STORY-SPA-NF-icon-assets.md) + **on-disk** `public/icons/next-feed/**` (24 SVG)
- **Rework:** was ADMIN-NF-03; promote **on execute** (operator 2026-10-10) — not deferred to epic

## Цель

1. Индекс feed Logical ID → master SVG → runtime under `spa-app/public/icons/next-feed/<group>/`.  
2. **Выполнить promote** (`cp` masters → public) при выполнении этого ADMIN.  
3. Shared nav already in next-shell → **reuse** `/icons/next-shell/…` (не дублировать).

**Запрещено:** gen новых SVG masters; logo work (next-shell / existing assets); touch icon-system masters.

## Runtime grammar

| Role | Path |
|------|------|
| Master | `docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/<group>/<name>.svg` |
| Runtime | `spa-app/public/icons/next-feed/<group>/<name>.svg` |
| URL | `/icons/next-feed/<group>/<name>.svg` |
| Shared shell nav | Reuse `/icons/next-shell/<group>/…` (already on disk) |

Context dir = **`next-feed`**. Groups from icon-system usage: `actions/`, `reactions/`, `map/`, `status/` (as present on disk under masters).

## Feed subset (must index + promote; expand on execute from manifest)

| Logical ID | Group | Typical stories |
|------------|-------|-----------------|
| `filter`, `list-view`, `map-view` | actions | NF-01, NF-03 |
| `map-pin` (+ selected reuse) | map | NF-03 |
| `react`, `comment`, `share`, `open-issue`, `more` | actions | NF-02, NF-04, NF-05 |
| `reply`, `send`, `retry`, `attach` (UI gated) | actions | NF-04 |
| `acknowledge` … `off-topic` | reactions | NF-05 |
| `collaboration-invite` | actions | NF-05 |
| `info` / `error` / `unavailable` / … | status | NF-01, NF-04 as needed |
| `close`, `chevron-down` | actions | mounts/disclosures — prefer next-shell reuse if already promoted |

## Deliverable

[`STORY-SPA-NF-icon-assets.md`](STORY-SPA-NF-icon-assets.md):

1. Full table master → runtime URL → story keys · master Present · runtime Present after promote  
2. §Reuse next-shell  
3. §Promote **executed** this ADMIN (`mkdir` + `cp` into `public/icons/next-feed/**`)  
4. §OOS glyphs / no logo  
5. ICON-GENERATION-INDEX row: **Promote/index Done** (not Lucide generate)

## Acceptance

- [x] Every NF story icon has runtime URL under `/icons/next-feed/…` or explicit next-shell reuse
- [x] `public/icons/next-feed/<group>/` files **on disk** (smoke: no 404 for catalog URLs)
- [x] No NEW SVG authored; masters untouched
- [x] INDEX: ADMIN-NF-02 → Done

## Как выполнять

«Выполни ADMIN-NF-02 — индекс + **promote** masters → `public/icons/next-feed/`; reuse next-shell; без gen».
