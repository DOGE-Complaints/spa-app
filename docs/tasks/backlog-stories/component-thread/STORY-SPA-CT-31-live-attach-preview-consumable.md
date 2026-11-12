# STORY-SPA-CT-31 — Live attach preview consumable (OP mark 6)

## Meta

- **Key:** `STORY-SPA-CT-31-live-attach-preview-consumable`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §17](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P5 APPLY · structure **Present** · visual **BLOCK** · gate **BLOCK** · `pkg-000195` · **policy A locked** · activation **none** · Await **P8** · F1/F2 WAIVED · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-31-live-attach-preview-consumable/STORY-SPA-CT-31-live-attach-preview-consumable.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-CT-31-2026-10-21.md)
- **Depends on:** CT-30 structure Present (upload + tree map) · CT-22 preview host · HTTP-07/08 Done · **policy lock A** (OP queued · no B / HTTP-09)
- **Interview:** [INTERVIEW-NF-17-plus…](../next-feed/INTERVIEW-NF-17-plus-op-residual-chrome-attach-2026-10-21.md) **A6**
- **Parent contract:** threads [REQ-05](../../../../../doge-threads/docs/requirements/05-comment-attachment-refs-in-tree-read.md) (link · amend only if **B**)
- **Evidence:** [analysis-next-feed-op-residual…](../../../analysis/analysis-next-feed-op-residual-after-apply-2026-10-21.md) mark 6 · GET 401 without Bearer
- **Code home:** `CommentAttachmentPreview.jsx` · soft `ThreadsSocialClient` · soft `LiveAdapter` / host

## Зачем

CT-30 maps `published_url` into preview, but browser `<img src>` cannot send Bearer → GET returns **401** → broken «Selected image». Citizen must see attachment bytes when tree exposes a URL.

## Policy lock (LOCKED — P1.3 APPLY)

| Option | Meaning | Sibling |
|--------|---------|---------|
| **A** (**LOCKED** · OP queued) | Authenticated `fetch` + blob → objectURL in preview | SPA-only · **no** HTTP-09 |
| **B** | Threads make GET attach browser-consumable (signed/public) for `<img>` | **HTTP-09** + REQ-05 AC · **not chosen** · name ≠ create |

OP locked **A** at P1.3 APPLY `2026-10-21T17:56:40Z`. Do **not** invent **B** / HTTP-09.

## L1 — FR

- **FR-CT-31.1** When a comment attachment has image `published_url` (or mapped `publishedUrl`), citizen sees a rendered image on Live `#/next/feed` discussion — not a broken icon.  
- **FR-CT-31.2** Must not invent CDN / storage vendor; honesty when bytes/floor deny or URL null (CT-22 / CT-30.4 held).  
- **FR-CT-31.3** Lab FixtureAdapter path unchanged.  
- **FR-CT-31.4** Chosen strategy (A or B) documented in ARCH §17 · Vitest covers happy path for that strategy.  
- **FR-CT-31.5** Do not duplicate HTTP contract in SPA story — **link** REQ-05 / HTTP-07/08; if **B**, depend on HTTP-09 (created only after OP lock).  
- **FR-CT-31.6** **Supersedes** CT-30 DoD claim that bare `<img src={publishedUrl}>` alone = Done live preview E2E.

## Вне scope

Invent CDN · invent gateway proxy · NF-17 chrome · invent OP PASS · multipart redesign · invent HTTP-09 without policy B · `#/board` as Done claim

## L1 — Acceptance Criteria

- [ ] OP locked **A** or **B**  
- [ ] Live discussion shows image for tree attachment with `published_url` (Path A / OP eye)  
- [ ] Honesty when null / deny  
- [ ] Lab held  
- [ ] Vitest for chosen strategy  
- [ ] No invent CDN / OP PASS

## L1.5 — Arch locks

Cite [ARCHITECTURE §17](ARCHITECTURE.md). Supersedes §16.2 implication that mapping `published_url` into bare `<img>` completes live preview.

## L2 — Technical subtasks

> Skill: `react-expert` · if **B**: soft `python-pro` on threads (separate story)  
> **Blocked** until OP **A\|B**

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-31-t01-policy-branch` | Await | Implement tip **A** (or **B** client assume) after lock | CommentAttachmentPreview · soft client fetch helper | 31.1 · 31.4 · 31.5 |
| `task-spa-ct-31-t02-preview-lifecycle` | Await | objectURL revoke / loading / error honesty | CommentAttachmentPreview.jsx | 31.1 · 31.2 |
| `task-spa-ct-31-t03-host-wire` | Await | Ensure Live host passes auth context if A | ThreadMount · soft LiveAdapter | 31.1 |
| `task-spa-ct-31-t04-vitest` | Await | Mock fetch/blob or signed URL path | `__tests__` | 31.3 · 31.4 |
| `task-spa-ct-31-t05-docs-link` | Await | ARCH §17 + INDEX tip · link REQ-05 if B | docs | 31.5 · 31.6 |

### Order

OP A\|B lock → (if B: HTTP-09 first) → `t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Posted/reloaded comment attachment with `published_url` paints on Live next/feed under locked policy; CT-30 upload/map held; no invent OP PASS.
