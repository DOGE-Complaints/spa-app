# 21. UI modularity, theme (dark/light), and redesign-prep architecture

Parent: operator ask 2026-10-06 — architecture prep before visual redesign (not the redesign itself)  
Parent-id: spa-ui-modularity-theme-redesign-prep  
Status: **Phase 0 Done** · AC-21-01…07 validated 2026-10-07T08:31:09Z · target tech-arch recorded 2026-10-06T18:51:59Z  
Дата: 2026-10-06  
Analysis (source): [analysis-spa-ui-modularity-and-redesign-sidecar-strategy-2026-10-06.md](../analysis/analysis-spa-ui-modularity-and-redesign-sidecar-strategy-2026-10-06.md)  
**Architecture:** [ui-modularity-theme-redesign-prep/00-overview.md](../architecture/ui-modularity-theme-redesign-prep/00-overview.md)  
**Interview:** [zeya888.target-tech-arch-interview-ui-modularity-theme-redesign-prep-2026-10-06.md](../analysis/zeya888.target-tech-arch-interview-ui-modularity-theme-redesign-prep-2026-10-06.md)  
**Tokens SSOT (next):** [DOGEstonia-design-tokens-package-v1.0.md](../UX/next/feed/DOGEstonia-design-tokens-package-v1.0.md) · [feed INDEX](../UX/next/feed/INDEX.md)  

**Backlog:** [ui-modularity-theme-redesign-prep/INDEX.md](../tasks/backlog-stories/ui-modularity-theme-redesign-prep/INDEX.md) · REQ21-01…05 **Done** (Phase 0) · `pkg-000092`…`096` · materialized 2026-10-06T19:05:34Z  
Related (do not duplicate):
- [technical-architecture.md](../technical-architecture.md) — domain / repository / service facade
- [reusable-ui-components-architecture.md](../UX/reusable-ui-components-architecture.md) — L0–L4
- [design-system.md](../UX/design-system.md) · [`src/styles/tokens.css`](../../src/styles/tokens.css)
- [spa-url-page-map.md](../spa-url-page-map.md)
- Code: [`App.jsx`](../../src/App.jsx) · [`layout/AppShellLayout.jsx`](../../src/layout/AppShellLayout.jsx) · [`components/AppShell/`](../../src/components/AppShell/) · [`theme/bootTheme.js`](../../src/theme/bootTheme.js) · [`components/ThemeToggle/`](../../src/components/ThemeToggle/) · [`features/board/`](../../src/features/board/) · [`config/publicShell.js`](../../src/config/publicShell.js) · [`router/sessionRoutePolicy.js`](../../src/router/sessionRoutePolicy.js) · [`services/issueService.js`](../../src/services/issueService.js)

**Scope class:** REQ + Phase 0 implement (stories Done). Naming paths (`#/next/*`, next-lane tokens) remain **acceptance targets** for Phase 1–4 — name ≠ create until explicit wave.

---

## 1) Goal

Подготовить архитектуру `spa-app` так, чтобы:

1. **layout / pages / CSS** были полноценно модульными (один владелец chrome, тонкие pages, CSS по владельцу);
2. **дизайн-токены** изначально поддерживали **переключатель dark / light mode** (обязательное целевое условие, влияет на организацию токенов);
3. был зафиксирован **предстоящий процесс** sidecar-редизайна (фикстуры → UAT → API → cutover) **без** выполнения самого визуального редизайна в рамках этого REQ.

Это **не** новый бренд, не замена экранов, не greenfield-приложение.

---

## 2) Scope / Out of scope

### In scope

| ID | Тема |
|----|------|
| FR-21.1 | Единый владелец chrome (layout), pages = content-only |
| FR-21.2 | Модульный CSS: tokens / shell / feature / page; убрать board-dump из глобального `index.css` (behavior-preserving migrate) |
| FR-21.3 | Theme architecture: semantic tokens + dark/light (и UI toggle + persistence — см. locks) |
| FR-21.4 | Документированный sidecar-процесс Phase 0→4 (ниже); decision locks для route prefix / cutover |
| FR-21.5 | Сохранение data plane: `services` / `repositories` / `auth` / `i18n` без дублирования ради UI |

### Out of scope (explicit)

- Визуальный редизайн экранов, новые mockups-as-code, pixel polish next brand.
- Создание файлов `ui/next/**`, `tokens.next.css`, design routes — пока нет отдельного implement/story go-ahead.
- Новое SPA / смена HashRouter / Vite root.
- Новые gateway/threads HTTP контракты.
- Полная кастомизация native date popup (сегодня только `color-scheme: dark` на фильтре — см. verified state).
- Epic/story pipeline activation из этого REQ alone.

---

## 3) Verified current state (As-of-Done Phase 0 · 2026-10-07)

| Fact | Evidence |
|------|----------|
| Data/auth модульны | `services/` → `repositories/`; `auth/`; `domain/`; `config/publicEnv.js` — без новых clients для UI prep |
| Shell ownership | Только `AppShellLayout` монтирует chrome; production pages content-only (`BoardPage` → `BoardToolbar` / `BoardFeedArea`) |
| Sidebar flag | `PUBLIC_SHELL_SHOW_SIDEBAR = false` (`publicShell.js`) |
| Tokens scheme-aware | [`tokens.css`](../../src/styles/tokens.css) — `[data-theme=dark\|light]` + semantic `--color-*`; FOUC + [`bootTheme.js`](../../src/theme/bootTheme.js) |
| Theme toggle | [`ThemeToggle`](../../src/components/ThemeToggle/) in Header (locale → theme → account); `localStorage['dogestonia.theme']`; **no** OS `prefers-color-scheme` |
| CSS ownership | [`index.css`](../../src/index.css) reset-only · **0** `.board-*`; shell/page/colocated owners |
| Board features | [`src/features/board/`](../../src/features/board/) — UI compose; fetch via `issueService` on page |
| Fixtures exist | `VITE_LIFE_REALITY_MODE` / in-memory repos via `issueService` |
| Router | `HashRouter` — `#/next/*` **not** created (Phase 1–4 OOS) |
| Residual (not AC fail) | Single-scheme hex / `--thr-*` in some threads/map CSS; date filter local `color-scheme: dark` (REQ OOS) |

---

## 4) Target architecture (prep)

```text
L0  styles/tokens (+ theme variants)   — semantic --color-* ; primitives per scheme
L1  layout + AppShell                  — единственный владелец chrome; theme toggle host
L2  pages                              — оркестраторы data + feature slots (без chrome)
L3  features / components              — board, issue, map, threads… + colocated CSS
L4  services / repositories / auth / i18n — unchanged contracts for redesign prep
```

### 4.1 Layout (FR-21.1)

| Правило | Target |
|---------|--------|
| Chrome owner | Только `AppShellLayout` (+ slots / route meta) |
| Pages | Только content в `<Outlet />`; **не** импортируют `AppShell` / `Header` / `PublicFooter` (исключение — future design-sandbox pages после отдельного wave) |
| Variants | `public` \| `workspace` через props/`showSidebar` из policy |
| Nav | Один nav config (paths + i18n keys); Header/Sidebar = presentation |

### 4.2 Pages (FR-21.1 / modularity)

Page: fetch via existing services → URL/query state → compose feature blocks.  
Критерий: можно заменить visual feature folder, не переписывая fetch/query.

### 4.3 CSS ownership (FR-21.2)

| Слой | Home |
|------|------|
| Tokens / theme | `src/styles/` |
| Shell | `components/AppShell/*.css` |
| Feature | colocated next to component |
| Page-only | optional `pages/*.css` (минимум) |
| `index.css` | reset + imports + rare globals — **не** склад `.board-*` |

Migrate board rules out of `index.css` **behavior-preserving** (prep), not as redesign.

### 4.4 Theme / dark·light (FR-21.3) — hard target for token design

**Обязательное условие:** архитектура токенов должна допускать **переключатель dark / light** без переписывания компонентов.

#### Token organization (required shape)

1. **Semantic consumer API** остаётся `--color-*`, `--button-*`, spacing, radius, motion (компоненты **не** читают raw «night hex» напрямую в новых/мигрируемых местах).
2. **Scheme layers** задают значения semantic-токенов:
   - dark (текущая Night/Orange палитра как baseline dark),
   - light (отдельный набор; конкретные hex — product/design lock, не invent в этом REQ).
3. **Activation** через один document-level switch, например:
   - `data-theme="dark" | "light"` на `document.documentElement`, **или**
   - class `.theme-dark` / `.theme-light`,  
   плюс `color-scheme: dark | light` на корне для native controls.
4. **Не** плодить два параллельных consumer API (`--color-dark-bg` vs `--color-light-bg` в каждом компоненте). Компоненты видят только semantic `--color-bg-primary` и т.д.
5. **Persistence + default** — decision locks (§7): localStorage key, follow `prefers-color-scheme` или нет, default для первого визита (сегодняшний UI = dark-looking brand).
6. **Toggle UI** — слот в shell chrome (Header / account area); i18n keys; a11y (button/switch, pressed state). Реализация toggle — implement wave; **контракт токенов** обязателен уже на prep.
7. **MapLibre / third-party** — theme may need basemap style swap later; **out of pixel scope** этого REQ, но prep не должен хардкодить цвета карты в semantic token file как единственный путь (note for redesign).

#### Why this affects tokens now

Без scheme-aware L0 sidecar-редизайн либо:
- вшьёт hex в компоненты, либо
- сделает «второй tokens.next» без light — и theme toggle станет вторым ломающим рефактором.

Поэтому **theme-capable tokens = Phase 0/1 gate**, не «потом после редизайна».

### 4.5 Data plane (FR-21.5)

Next UI / prep **не** получает отдельных repositories. Fixtures = existing in-memory / mode switch.

---

## 5) Upcoming process (redesign sidecar — after / alongside prep)

Этот REQ **описывает** процесс; **не** обязывает выполнить Phase 1–4 visual work здесь.

Улучшенный процесс (operator 1–6 → phases):

| Phase | Name | What | Maps from operator |
|-------|------|------|--------------------|
| **0** | Modularize current UI | Shell ownership; extract features from fat pages; CSS move; **theme-capable token structure** (even if light palette is stub/ partial); tests updated for DOM moves only | _(implicit prep)_ + token impact of dark/light |
| **1** | Design foundation (next lane) | Next tokens (scheme-aware) → next shell → leaf components | operator 2 → 3 → 1 (tokens/layout **before** components) |
| **2** | Sidecar clickable UI | Hash routes e.g. `#/design/*`; fixtures via existing services; user test on those URLs | operator 4 («endpoints» = hash routes) |
| **3** | Wire live backends | Same repositories; `GFL-DRIVEN` / threads; reuse auth providers | operator 5 |
| **4** | Cutover | Nav SSOT + route swap + retire v1 chrome; merge/flip tokens; regress vitest/puppeteer | operator 6 (links + more) |

### Coexistence rules (anti-chaos)

1. One data plane.  
2. Two visual planes until cutover (v1 vs next) — optional; prep may stay single plane until Phase 1.  
3. Pages do not own chrome after Phase 0.  
4. No greenfield app by default.  
5. Name ≠ create for future paths.  
6. i18n for all new chrome strings including theme toggle.

### Operator step mapping

| Operator step | Phase |
|---------------|-------|
| Привести код к модульности | **0** |
| Новые токены (с dark/light) | **0 foundation + 1.1** |
| Новый layout | **1.2** |
| Новые компоненты | **1.3 → 2** |
| Фикстуры + user test + «endpoints» | **2** |
| Подключить API | **3** |
| Заменить ссылками | **4** |

---

## 6) Acceptance criteria

- [x] **AC-21-01** Documented + enforced: production pages do not mount AppShell chrome; layout owns chrome. *(REQ21-01 · `pkg-000092`)*  
- [x] **AC-21-02** Board layout CSS not concentrated in `index.css`; owned by shell/feature/page CSS (behavior-preserving). *(REQ21-02 · `pkg-000093`)*  
- [x] **AC-21-03** Token architecture supports dark and light via semantic `--color-*` + scheme switch (`data-theme`); components do not hardcode dual palettes. *(REQ21-03 · `pkg-000094`)*  
- [x] **AC-21-04** Theme toggle contract + implementation: Header slot, `dogestonia.theme`, default dark, no OS theme. *(REQ21-04 · `pkg-000095`)*  
- [x] **AC-21-05** This REQ and index state clearly: **prep ≠ redesign**; Phase 1–4 are process, not delivery of next brand UI in this REQ.  
- [x] **AC-21-06** No duplicate data clients invented for UI prep. *(REQ21-05 · `pkg-000096`)*  
- [x] **AC-21-07** Decision locks §7 closed 2026-10-06 (arch overview §2); Phase 0 implemented via explicit story/pkg go-ahead; next-lane (`#/next`, cutover) still gated.

---

## 7) Decision locks (interview closed 2026-10-06 — see Architecture)

| # | Question | Decision |
|---|----------|----------|
| L1 | Theme default | **A dark** |
| L2 | Persistence | **C** localStorage key **`dogestonia.theme`**; account sync OOS |
| L3 | OS theme | **None** — user toggle only |
| L4 | Light / Dark SSOT | Light = [tokens package](../UX/next/feed/DOGEstonia-design-tokens-package-v1.0.md); Dark = Night from `tokens.css` in same package |
| L5 | Design/sidecar prefix | **B `#/next/*`** |
| L6 | Folder option | **A** `components/` + `features/` |
| L7 | Cutover | **A in-place** |
| DOM | Switch | **`data-theme`** |
| UI | Toggle host | **Public Header** (locale \| theme \| …) |

Normative detail: [architecture/00-overview.md](../architecture/ui-modularity-theme-redesign-prep/00-overview.md) §2.

---

## 8) Dependencies

- Existing L0 tokens / G4–G9 design-foundation (do not discard semantic `--color-*` API).  
- G8 AppShell / PH-09 public sidebar — chrome moves must preserve tests.  
- Analysis source of truth for narrative detail: linked analysis doc.  
- Redesign visual work depends on **this** prep + separate design/product assets (OOS here).

---

## 9) Risks

| Risk | Mitigation |
|------|------------|
| Light mode as afterthought | FR-21.3 gate in Phase 0/1 |
| Dual shell regression | Phase 0 + existing shell tests |
| Token collision with next brand | Scheme layers + semantic API; next brand = new primitive values under same semantics |
| Catch-all route eats design paths | Explicit routes above `*` in `App.jsx` when Phase 2 starts |
| Scope inflation into full redesign | AC-21-05; Out of scope list |

---

## 10) Next (process)

1. ~~Operator closes L1–L7~~ — closed 2026-10-06 (+ backlog clarify: `dogestonia.theme`, REQ21-05 in package).  
2. ~~Backlog Phase 0 REQ21-01…05~~ — **Done** · P3 `pkg-000092`…`096` · AC validated 2026-10-07T08:31:09Z.  
3. **Visual redesign Phase 1 (feed)** → [REQ-22](22-feed-visual-redesign-phase-1.md) · [arch](../architecture/feed-visual-redesign-phase-1/00-overview.md) · UX [feed INDEX](../UX/next/feed/INDEX.md) · DUI locks Q01–Q18. *(REQ-22: home `#/next/feed*`; prep L7 in-place onto `#/board` superseded for that focus.)*  
4. Phase 2–4 (sidecar `#/next/*`, cutover) — **not** from this REQ alone; wait explicit operator go-ahead.  
5. Optional residual (not Phase 0 AC): light-parity hex/`--thr-*` in threads/map; date-filter `color-scheme` follow `data-theme`.
