# SPA catalog image wave — paste-ready prompt

**Категория:** spa UX / asset generation  
**As-is method:** [`docs/methodology/Zeya888-builder-queue/analysis/retrospective-catalog-driven-image-generation-as-is-2026-08.md`](../../../docs/methodology/Zeya888-builder-queue/analysis/retrospective-catalog-driven-image-generation-as-is-2026-08.md)  
**Style fence:** [`SPA-ICON-STYLE-PROMPTS.md`](./SPA-ICON-STYLE-PROMPTS.md)  
**Character continuity:** [`references/DogeEstonia Character.png`](./references/DogeEstonia%20Character.png)  
**Floral ref (admin later):** [`references/floral-band-reference.png`](./references/floral-band-reference.png)  
**Метод claims:** [`.cursor/rules/analysis.mdc`](../../../.cursor/rules/analysis.mdc)

## Юзкейсы

| # | Ситуация | Действие |
|---|----------|----------|
| 1 | Есть markdown-каталог `*-icon-assets.md` (NEW / Reuse / Viz + Depict) | Вставить fence ниже с `$imagesInput=` |
| 2 | Нужны functional `ic-*` + Help mascot в одном прогоне | Этот промпт (контур A + B) |
| 3 | Только сверить стиль / peers без генерации | [`SPA-ICON-STYLE-PROMPTS.md`](./SPA-ICON-STYLE-PROMPTS.md) |

**Не этот промпт:** marketing landing GenerateImage → `landing/.../STORY-LAND-image-style-prompts.md`.  
**Не:** §Viz pulse/network/density как Lucide PNG; folk embroidery как `ic-*`.

**Дефолт `$imagesInput`:** путь к каталогу, напр.  
`spa-app/docs/tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md`

---

## Copy-paste

```text
@.cursor/rules/analysis.mdc
@spa-app/docs/UX/SPA-ICON-STYLE-PROMPTS.md
@spa-app/docs/UX/references/DogeEstonia Character.png
@spa-app/docs/UX/references/floral-band-reference.png
@spa-app/scripts/icons/icon-manifest.yaml
@spa-app/docs/tasks/backlog-stories/icons/ICON-GENERATION-INDEX.md
$imagesInput=

SPA CATALOG IMAGE WAVE. Follow retrospective catalog-driven generation as-is.
Workspace root: DOGEstonia. Working tree: spa-app.

MODE: assets from $imagesInput only. Claims: Read/Glob/Pillow/ls only; else Unknown.
Do NOT invent filenames or out_dir. Do NOT generate §Viz / device chrome / folk bands as ic-*.
Do NOT deep-link landing runtime paths into spa. Do NOT commit without git-commit plan approval.
Do NOT Build/Execute on unrelated plans.

## Contours (mandatory split)
A) Functional ic-* → Lucide → icon-manifest.yaml → npm run icons:generate (NOT GenerateImage by default).
B) Character / Help mascot illustration → GenerateImage WITH character sheet reference (NOT Lucide stroke).
EN Depict rows in catalog = meaning docs for A; for B paste Depict into GenerateImage after mascot brief.

## Step 0 — Preconditions
1) Confirm spa-app/docs/UX/references/DogeEstonia Character.png exists (Read).
2) Confirm spa-app/docs/UX/references/floral-band-reference.png exists (for later admin décor; this wave does NOT invent new etm-* unless catalog NEW says so).
3) Read $imagesInput fully. If missing/unreadable → STOP Ask.

## Step 1 — Classify from $imagesInput
Build worklists (facts only):
- NEW functional ic-* (file, color/hex, Depict, out_dir from catalog conventions)
- NEW illustration / mascot (pinned path e.g. public/assets/es-help-mascot.png)
- Reuse (paths) — verify ON DISK; do not regenerate
- Skip / Viz / docs-only — do not generate PNG

Anti-dup: prefer catalog §Reuse + ICON-GENERATION-INDEX over "missing on disk ⇒ regenerate".

## Step 2 — Contour A: functional ic-* (Lucide pipeline)
For each NEW ic-* row:
1) Pick lucide_id from catalog seed hints / peers; must exist under spa-app/node_modules/lucide-static/icons/ (after npm install if needed).
2) Add/update row in spa-app/scripts/icons/icon-manifest.yaml:
   - catalog key matching out_dir (e.g. es → early-signal-dashboard)
   - file, out_dir, lucide_id, color (neutral|accent|success|error|amber OR exact #hex from catalog)
3) If generate-icons-from-lucide.py CATALOG_ALIASES lacks the key (e.g. es), add alias mapping to that catalog string.
4) From spa-app:
   npm run icons:generate
   # or filtered:
   python3 scripts/generate-icons-from-lucide.py --catalog <key> --file <ic-….png>
   npm run icons:validate
5) QA each file: RGBA 256×256, transparent corners (Pillow), optical match to 2–3 peers same color role from SPA-ICON-STYLE-PROMPTS §Reference anchors.
6) Exception GenerateImage for an ic-* ONLY if Lucide id missing AND operator explicitly allows — then paste SHARED LOCK + Depict + peer refs; still Lucide-like, not landing soft art.

Do NOT paste catalog EN prompts into GenerateImage for normal Lucide rows.

## Step 3 — Contour B: mascot / dog character (GenerateImage)
If catalog has NEW illustration with doge/mascot (e.g. Help Complete → public/assets/es-help-mascot.png):

1) MUST attach reference_image_paths:
   spa-app/docs/UX/references/DogeEstonia Character.png
   Continuity lock: same face, navy EE-flag cap, fur palette, body proportions.
   Pose / crop may follow catalog Depict / mockup (e.g. Help strip beside copy); do NOT invent a second doge brand.
2) Do NOT use SPA SHARED LOCK stroke language for the mascot body.
3) GenerateImage brief (EN), then Depict from catalog. Use this MASCOT LOCK verbatim (no nested fences):
   MASCOT LOCK — DOGEstonia spa Help illustration (not functional ic-*)
   Continuity: match attached DogeEstonia Character sheet exactly (face, cap with Estonian flag, ginger/cream fur, soft illustrated line).
   Product: spa early-signal / Help strip on dark civic UI (#0B1320 context — do not paint a full UI chrome into the asset).
   Output: single isolated character cutout, PNG with real alpha (no white plate, no checkerboard baked in), no watermarks, no invented FAQ text on the image.
   Tone: warm, trustworthy, calm — same streetwear D.O.G.E. personality as the sheet unless Depict asks a specific Help pose.
   NOT Lucide stroke icon. NOT watercolor landing hero scene unless Depict says full-bleed (prefer cutout for spa).
   NOT purple/violet AI look. Do not redraw a different doge face.
4) Save to the catalog pinned path under spa-app/ (mkdir parent if needed).
5) Pillow: if opaque white/cream plate → knock to real alpha; verify corners.
6) Visual QA vs character sheet: same dog, readable next to dark UI.

Landing mascot PNGs = optional composition mood only; continuity SSOT = spa references/DogeEstonia Character.png.

Do NOT invent a second doge for issue crests — logo reuse when catalog says Brand.

## Step 4 — Floral / ETM
- Confirm references/floral-band-reference.png on disk (admin décor later).
- If catalog says Reuse PH etm-* → verify public/icons/public-home/etm-*.png; do not GenerateImage folk bands as ic-*.
- Do not run icons:etm unless operator asks and catalog NEW requires photo-derived etm-*.

## Step 5 — Index / docs touch (same wave if in scope)
- If new catalog was processed: ensure ICON-GENERATION-INDEX row status reflects ON DISK where true.
- Update catalog rows/status only with facts (exists paths).

## Step 6 — STOP report
Reply with ONLY:
1) $imagesInput path used
2) Table: file | method (Lucide|GenerateImage|reuse|skip) | absolute-or-repo path | exists yes/no
3) Manifest catalog key(s) written
4) Mascot: character ref attached? path? alpha ok?
5) Floral ref present? (yes/no) — no admin generation unless asked
6) Commands run (icons:generate / validate)
7) Reminder: no commit unless operator ran git-commit methodology

If any NEW failed Lucide id or GenerateImage QA — list blockers; do not invent substitutes.
```

---

## Примечания

- Pipeline code: [`../../scripts/generate-icons-from-lucide.py`](../../scripts/generate-icons-from-lucide.py) · [`../../scripts/icons/render-lucide.mjs`](../../scripts/icons/render-lucide.mjs).
- Typical ES package: [`../tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md`](../tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md).
- References README: [`references/README.md`](./references/README.md).
