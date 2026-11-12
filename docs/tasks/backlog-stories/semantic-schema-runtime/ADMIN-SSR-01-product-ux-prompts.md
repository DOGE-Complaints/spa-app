# ADMIN-SSR-01 — Product UX prompts (слой 4.1)

## Meta

- **Key:** `ADMIN-SSR-01-product-ux-prompts`
- **Status:** Done (2026-09-01)
- **Depends on:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) locked
- **Blocks:** ADMIN-SSR-02
- **Skill:** product + UX briefing (не FE coding)

## Цель

Подготовить **промпты для UX-диалога** (артборды + states) — форма как [`public-home/ADMIN-PH-01`](../public-home/ADMIN-PH-01-product-ux-prompts.md). Не писать `UX-PROMPTS.md` в architect/materialize bootstrap — только по «Выполни ADMIN-SSR-01».

## Вход

- [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- [REQ-16](../../../requirements/16-semantic-schema-spa-compatibility.md) §4.1–4.2, §5, §6 Q1
- Verified: `IssueCard` / `IssuePage` civic-only; no map UI ([`package.json`](../../../../package.json) L73–78)
- Gateway naming SSOT: [REQ-51](../../../../../doge-complaints-gateway/docs/requirements/51-semantic-schema-runtime.md) §3

## Обязательные артборды (минимум)

| ID (черновик) | Поверхность | Обязательные states |
|---------------|-------------|---------------------|
| SSR-C | Issue **card** + **detail** overlay when `schema_card` present | civic-only (no sidecar) · overlay present · compact card · detail density · (опц.) many leaves wrap |
| SSR-M | `/board` list \| map of **current** Issues resultset | list default · map eligible (≥1 pin) · map ineligible (toggle hidden/disabled) · pins-only subset vs full list · filters still visible · narrow |

Constraints in prompts:

- dark civic-tech; **no** form builder; **no** pack.json / clustering knobs
- **no** Emerging cards (spa 15)
- **do not invent** overlay keys — only gateway `schema_card` dotted paths from pack `card_fields`
- overlay field **labels** in mockups: reference dotted-path ids from pack; human copy → L10N table (ADMIN-SSR-05), not ad-hoc renames in artboard
- Issue geo on artboard: public keys `lat`/`lon`/`label`/`district`/`settlement`/`region`/`country` — **not** internal `admin_*` on Issue JSON
- map library unspecified (REQ §6 Q2)

## Deliverable

Создать **`UX-PROMPTS.md`** в этой папке:

1. Global constraints (from brief + REQ AC)
2. Per-artboard prompt (EN, paste-ready) + state matrix
3. Mapping: artboard ID → future SSR-02 / SSR-03 story
4. Out of scope from brief
5. L10N note: label ids = `schema_card` keys → ADMIN-SSR-05

**Done when:** [`UX-PROMPTS.md`](UX-PROMPTS.md) exists (not at package bootstrap).

## Expected projected content

- Global constraints from brief
- Per-artboard EN paste-ready prompts + state matrix
- SSR-C → SSR-02 · SSR-M → SSR-03
- Open UX Q: compact vs detail density on **both** surfaces (locked: both card and detail get overlay)

## Acceptance

- [x] `UX-PROMPTS.md` покрывает SSR-C и SSR-M
- [x] Каждый промпт требует state sheet (не один happy path)
- [x] Overlay keys = `schema_card` dotted paths only
- [x] INDEX: ADMIN-SSR-01 → Done; ADMIN-SSR-02 → Todo

## TODO (layer execution)

- [x] После go-ahead оператора: написать только `UX-PROMPTS.md` + INDEX status
- [ ] Не генерировать PNG
- [ ] Не трогать product STORY files без ADMIN-05 refine

## Как выполнять

В чате: «Выполни ADMIN-SSR-01 по `semantic-schema-runtime/ADMIN-SSR-01-…`».
