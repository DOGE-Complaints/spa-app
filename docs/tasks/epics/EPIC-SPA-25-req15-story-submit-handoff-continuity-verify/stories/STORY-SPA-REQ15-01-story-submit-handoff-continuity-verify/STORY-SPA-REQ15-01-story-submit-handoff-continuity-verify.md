# STORY-SPA-REQ15-01 — Story submit handoff continuity verify (pipeline)

## Meta (pipeline)

- **Key:** `STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify`
- **Parent Epic:** [`../../EPIC-SPA-25-req15-story-submit-handoff-continuity-verify.md`](../../EPIC-SPA-25-req15-story-submit-handoff-continuity-verify.md)
- **Package:** `pkg-000234`
- **Status:** P8 local close · T01–T06 **Done** · gate **PASS** · Story **Done** (verify) · `2026-11-05T12:30:09Z` · **activation: none** · live **Unknown** · SHA docs `2f57e3a` · feat/test N/A · NO PUSH · [disposition](../../../../run-reports/p5-disposition-STORY-SPA-REQ15-01-2026-11-05.md) · [p7](../../../../../analysis/reaudit-STORY-SPA-REQ15-01-p7-2026-11-05.md) · [arch](../../../../../architecture/req15-story-submit-handoff-continuity-verify.md)
- **Тип:** verify-only (no product chrome redesign)
- **ui_scope:** `none` · **NO BRIEF** · CLEAN P1.3 (NOT p13UxReady)
- **source:** [`../../../../backlog-stories/req15-story-submit-handoff-continuity-verify/STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify.md`](../../../../backlog-stories/req15-story-submit-handoff-continuity-verify/STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify.md)
- **Parent REQ:** [`25-req15-story-submit-handoff-continuity-verify.md`](../../../../../requirements/25-req15-story-submit-handoff-continuity-verify.md)
- **Siblings:** GW-REQ59-01 (soft) · aibridge REQ-11 · Keep ID-12 / M128
- **Skill declared:** `javascript-pro`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`  
  Soft: `code-documenter`
- **Soft blockers:** GW-59 / live draft_id · **Unknown** → **no invent PASS**
- **Default Pass:** **no SPA redesign** if continuity holds
- **Scaffolded:** `2026-11-05T12:12:46Z`
- **Gate:** [story-acceptance-gate-STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify.md](./story-acceptance-gate-STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify.md) · **PASS** `2026-11-05T12:18:30Z` · live Unknown

---

## Purpose

Verify `#/story/submit?draft_id=` accepts drafts from aibridge stash path (telegram-delivered continuation when live). Citizen session required for submit; no service Bearer in browser. Evidence note for REQ15 E2E; gap list only if broken.

## Scope

1. Inventory route + handoff state (HashRouter · path helpers · storage).
2. Continuation URL shape parity vs aibridge (no invent URL).
3. Citizen auth boundary held.
4. Gateway draft client continuity (soft cite GW-59).
5. Evidence or gap note under `docs/analysis/` · default no SPA code.
6. Story gate AC-SPA-25-01…04.

## Out of scope

- New compose UI · aibridge/providers from browser · board/poster
- Changing gateway stash contracts (sibling 59)
- GPT empty CTA / chips polish
- Invent live / OP PASS

## Target / AC (verbatim backlog)

- [x] **AC-SPA-25-01:** `#/story/submit?draft_id=` accepts drafts from aibridge stash path
- [x] **AC-SPA-25-02:** Submit still requires citizen session (not service Bearer in browser)
- [x] **AC-SPA-25-03:** No SPA redesign required for REQ15 unless T1 documents hard break
- [x] **AC-SPA-25-04:** E2E note: open link after telegram-delivered continuation (when live)
- [x] Default Pass = **no SPA redesign** if continuity holds

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-req15-01-t01-route-handoff-inventory](task-spa-req15-01-t01-route-handoff-inventory/README.md) | Route / handoff inventory | **Done** |
| T02 | [task-spa-req15-01-t02-continuation-url-shape-parity](task-spa-req15-01-t02-continuation-url-shape-parity/README.md) | Continuation URL shape parity | **Done** |
| T03 | [task-spa-req15-01-t03-citizen-session-auth-boundary](task-spa-req15-01-t03-citizen-session-auth-boundary/README.md) | Citizen session auth boundary | **Done** |
| T04 | [task-spa-req15-01-t04-gateway-draft-client-continuity](task-spa-req15-01-t04-gateway-draft-client-continuity/README.md) | Gateway draft client continuity | **Done** |
| T05 | [task-spa-req15-01-t05-evidence-or-gap-note](task-spa-req15-01-t05-evidence-or-gap-note/README.md) | Evidence or gap note | **Done** |
| T06 | [task-spa-req15-01-t06-story-gate](task-spa-req15-01-t06-story-gate/README.md) | Story gate REQ15-01 | **Done** |

**Order:** T01 → T02 → T03 → T04 → T05 → T06

## DoD (summary)

Continuity verified or gap documented · citizen auth held · evidence/Unknown honesty · gate sync · **no invent PASS** · no product redesign unless hard break.
