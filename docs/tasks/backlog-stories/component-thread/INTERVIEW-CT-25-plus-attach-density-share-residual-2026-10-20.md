# Interview SSOT — CT-25+ attach chip · density v2 · Share Instagram disabled

- **Дата:** 2026-10-20 (вечер)  
- **Тип:** product interview после ручного теста CT-21…24 (analysis.mdc · no invent)  
- **Пакет:** [INDEX.md](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)  
- **Слои:** **L1** FR/AC · **L1.5** ARCHITECTURE · **L2** tech subtasks  

## Решения оператора

| # | Тема | Решение |
|---|------|---------|
| MT1 | Composer image preview | Хотя бы иконка/thumb в chip (сейчас ▣ без preview) |
| MT2 | Имя файла на chip | Показывать `File.name` · **нет в мокапах** → **UX-prompt + gen** |
| MT3 | Рамки / отступы | Убрать border у bubble и у блока React/Reply · только лёгкий fill · ещё меньше pad · **UX-prompt + gen (1B)** — supersede CT-23/M153b border keep |
| MT4a | Instagram | В списке остаётся · **visually disabled** · hint может остаться · клик **не** копирует; copy только через нижний **Copy link** **(2B)** |
| MT4b | Copy link | **Без иконки** (убрать глиф ⎘ / любой icon) |

## Факты из кода (не обсуждаемо)

1. CT-21…24 runtime Present (budget, node attach preview, M153b density, Share sheet).  
2. `AttachmentRef` composer: family label · glyph · **нет** `<img>` · `fileName` в intent есть, в UI не показан.  
3. `CommentNode` / `CommentAttachmentPreview`: local objectURL Present (CT-22) — OP eye на **composer** chip.  
4. Bubble + `.tm-comment-node__action-pills`: `border: 1px #E7E4DC` (M153b Match) — OP хочет убрать.  
5. Instagram: `copyFallback: true` · клик копирует — OP хочет disabled, copy only via Copy link.  
6. Copy link: `iconSrc: null` + unicode `⎘` в UI.

## Story allocation

| Gap | Story | Artboard |
|-----|-------|----------|
| Composer chip thumb/icon + filename layout | **CT-25** Apply-ready | [M153c](../../../UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.md) |
| Borderless bubble + pills · tighter pad | **CT-26** Apply-ready | [M153d](../../../UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.md) |
| Instagram disabled · Copy link text-only | **CT-27** Apply-ready | no gen (2B) |

**Order:** CT-25 → CT-26 → CT-27 (CT-27 parallelizable). Gen landed · [intake PASS](../../../analysis/analysis-m153c-m153d-generation-intake-2026-10-20.md).  
**Code:** CT-25…27 **Present** · [validation](../../../analysis/analysis-ct25-ct27-code-present-vs-intake-2026-10-20.md) · Await OP eye. Next cutover: [INTERVIEW-CT-28+](INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md).

## Explicit non-goals

Invent Instagram image upload API · invent denser hex beyond accepted artboard · invent OP PASS · `#/next/feed`
