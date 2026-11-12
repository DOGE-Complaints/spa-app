# Interview SSOT — live `#/next/feed` civic residual (marks 1–5)

- **Дата:** 2026-10-21  
- **Тип:** product interview после live data на `#/next/feed` · OP screenshots + numbered marks  
- **Пакеты:** [next-feed](INDEX.md) · sibling [component-thread](../component-thread/INDEX.md) · threads REQ `05`  
- **Слои:** **L1** FR/AC · **L1.5** ARCH / ARCH-DELTA · **L2** tech subtasks  
- **Wave delivery lock:** **1A** — docs only (interview · UX prompts · REQ · stories). **No** product code / Apply this wave.  
- **Point-5 depth lock:** **2A** was refs+tree only (initial). **Superseded 2026-10-21 OP:** bytes **in** [REQ-05](../../../../../doge-threads/docs/requirements/05-comment-attachment-refs-in-tree-read.md) · no REQ-06.  
- **Code facts:** [analysis empty-feed](../../../analysis/analysis-next-feed-empty-issues-with-backend-2026-10-21.md) (prior) · live probes 2026-10-21 OP eye

## Решения оператора

| # | Тема | Решение |
|---|------|---------|
| M1 | Identity icon slot | Серый квадрат → **иконка типа issue** (`issue.type`, напр. INCIDENT), не аватар автора |
| M2 | Open issue | **Убрать** отдельную ссылку; кликабельны **картинка + весь блок над ней** (header/meta/title/summary) → issue mount |
| M3 | Action strip | Меньше пустого пространства · крупнее иконки · **React без рамки** (parity с Comment/Share) |
| M4 | Three dots | **Закомментировать** в коде · **TODO/заметка** в docs/code что вернём когда будет меню |
| M5 | Comment + file | Полноценное: REQ-05 bytes+tree · HTTP-08 upload · HTTP-07 tree · CT-30 Live wire + CT-22 preview |
| W1 | Delivery | Docs wave only (**1A**) · runtime Apply отдельно |
| W2 | Attach phase | **Was 2A** (refs only). **Supersede:** blob **inside REQ-05** · API `POST …/attachments` · stories HTTP-08 + HTTP-07 + CT-30 |

## Факты из кода (не обсуждаемо)

1. `IssueTypeIcon` Present · `FeedCivicPost` передаёт `iconSrc={null}` → omit grey slot (`data-civic-identity-icon="omit-catalog-gap"`).  
2. Topic chips имеют `issueTopicIcons.js` — **другой** слот (label), не type header.  
3. `Open issue` = optional `Link` при `to` из `FeedListArea`; media/header без click.  
4. React: `.rm-summary-strip__react` bordered; Comment/Share: flat `.feed-civic-post-action` · icons 16×16.  
5. More: `IssueIdentityHeader` button always · **no** menu/handler.  
6. Attach: composer local intent Present (CT-17/19/22/25); `LiveAdapter.postComment` body-only; tree HTTP **без** attachment refs; `mapThreadTreeToBlock` не мапит attachments.  
7. `POST …/attachment-refs` Present (HTTP-05); multipart/blob **Absent** by design.  
8. DUI contract lists types `complaint|system_bug|observation|absurdity`; live/tests also show **`INCIDENT`** — catalog must cover **wire Present values**, omit unknown honestly (no invent synonyms).

## Story / REQ allocation

| Gap | Artifact | Package |
|-----|----------|---------|
| Type icon catalog + bind | **NF-13** | next-feed |
| Card hit-target · retire Open issue | **NF-14** | next-feed |
| Strip density · React unframe | **NF-15** | next-feed |
| More menu comment-out + memo | **NF-16** | next-feed |
| Tree `attachments[]` + `published_url` | **REQ-05** + **HTTP-07** | doge-threads |
| `POST …/attachments` multipart bytes | **REQ-05** + **HTTP-08** | doge-threads |
| Live upload → map preview | **CT-30** (`uploadAttachment`) | component-thread |

**Order (docs tip):** NF-13…16 · attach: **HTTP-08 → HTTP-07 → CT-30**.  
**Apply:** separate OP go-ahead (lock W1).

## Explicit non-goals

Product JSX this wave · invent OP PASS · invent CDN brand · invent multipart on **comment** POST (bytes go to `…/attachments`) · invent storage vendor Accepted · `#/board` · reopen NF-01…12 as rewrite · Early Signal · **REQ-06** (folded into 05)

## UX gen · intake status

| Need | Prompt | Intake |
|------|--------|--------|
| Issue-type icon pack | Prompt 1 | **PASS** → [M161](../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md) · SVG Present `public/icons/next-feed/types/` |
| Strip density / React unframe | Prompt 2 | **PASS** → [M162](../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) · density tip-locked |
| NF-14 / NF-16 | **No gen** | code lock · L1 deepened |
| CT-30 preview after upload | Reuse CT-22 | no new gen until HTTP-08 + HTTP-07 |

**Analysis:** [analysis-m161-m162-generation-intake-2026-10-21.md](../../../analysis/analysis-m161-m162-generation-intake-2026-10-21.md)
