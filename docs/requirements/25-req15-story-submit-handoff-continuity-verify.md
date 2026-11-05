# 25. REQ15 — Story submit handoff continuity verify

Parent: [docs/requirements backlog/REQ15-DOGEstonia-Interview-DeepSeek-And-Telegram-Channel.md](<../../../docs/requirements backlog/REQ15-DOGEstonia-Interview-DeepSeek-And-Telegram-Channel.md>) §5 seq-03, mermaid WEB↔GW; AC-08  
Parent-id: REQ15-interview-deepseek-telegram  
Siblings:
- [doge-ai-bridge REQ-11](../../../doge-ai-bridge/docs/requirements/REQ-11-REQ15-DUAL-CONFIRM-GATEWAY-SUBMIT-SPA-HANDOFF.md) (emits continuation URL)
- [gateway 59](../../../doge-complaints-gateway/docs/requirements/59-req15-story-draft-stash-channel-parity-verify.md) (stash `draft_id`)
- [GPT UI REQ-48](<../../../GPT UI/docs/requirements/REQ-48-req15-role-oriented-instruction-line-and-export.md>) (model no longer owns redirect copy as Actions path)
Status: Draft — awaiting PA.2  
Дата: 2026-10-31

---

## Целевое состояние (простыми словами)

После успешного stash человек открывает ту же SPA-страницу продолжения, что и раньше:  
`#/story/submit?draft_id=…`, логин/сессия Supabase, подтверждение и submit черновика.  
REQ15 меняет **кто прислал ссылку** (telegram + aibridge вместо Custom GPT), а не смысл экрана. Нужна **проверка непрерывности**, не редизайн submit UX — пока T1 не найдёт разрыв.

---

## 1) Goal

Verify Present hash-route story submit handoff still works when `draft_id` originates from aibridge/telegram path; no REQ15 SPA redesign unless hard break.

## 2) Scope / Out of scope

**In scope**

- Verify `#/story/submit?draft_id=` flow (preview + citizen submit) with drafts created by aibridge client.  
- Confirm auth/session expectations unchanged for submit.  
- Document evidence for REQ15 E2E.  
- Gap list only if broken.

**Out of scope**

- New compose UI, agent dashboards, telegram webviews.  
- Calling aibridge or model providers from browser.  
- Board/poster work (REQ13 spa 23).  
- Changing gateway contracts (sibling 59).

## 3) Verified current state

| Fact | Path / note |
|------|-------------|
| Submit path constant | `STORY_SUBMIT_PATH` / handoff — e.g. [`storyHandoffFlowState.js`](../../src/auth/storyHandoffFlowState.js) (SPA-ID-12 lineage) |
| Continuation builder on bridge | `build_continuation_url` → `{SPA_BASE}/#/story/submit?draft_id=` |
| Historical GPT redirect copy | GPT UI `api-orchestrator.md` §5.2.B |

## 4) Target behavior

1. Link from telegram/bridge opens submit screen with draft preview.  
2. Citizen completes submit under session as today.  
3. No dependency on Custom GPT Actions being the stash client.

## 5) Acceptance criteria

| ID | Criterion |
|----|-----------|
| **AC-SPA-25-01** | `#/story/submit?draft_id=` accepts drafts from aibridge stash path |
| **AC-SPA-25-02** | Submit still requires citizen session (not service Bearer in browser) |
| **AC-SPA-25-03** | No SPA redesign required for REQ15 unless T1 documents hard break |
| **AC-SPA-25-04** | E2E note: open link after telegram-delivered continuation (when live) |

## 6) Open

- Copy/i18n tweaks if entry channel label needed — optional, not blocking verify.
