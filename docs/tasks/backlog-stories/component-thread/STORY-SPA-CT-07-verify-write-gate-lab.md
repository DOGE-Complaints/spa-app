# STORY-SPA-CT-07 — VerifyWriteGate lab fixtures + stub handoff (M157 A)

## Meta

- **Key:** `STORY-SPA-CT-07-verify-write-gate-lab`
- **Package:** [component-thread](INDEX.md)
- **Status:** P3/P5 Done · tip · gate **BLOCK** · `pkg-000165` · `2026-10-18T14:00:35Z` · Await P8
- **Depends on:** CT-04
- **UX mirror:** §4.3
- **Arch:** §7 Lab M157 variant A
- **OP lock:** full contour in stories · lab fixture + stub (no real Identity methods)

## Зачем

Неверифицированный write блокируется gate; handoff на existing `/verify` (stub in lab); возврат с draft/target без auto-post.

## FR

- **FR-CT-07.1** Known unverified + write intent → VerifyWriteGate · draft+target visible.  
- **FR-CT-07.2** Go to verification → stub handoff (route or lab stand) · no method UI invent.  
- **FR-CT-07.3** Verified return: draft restored · Verified chrome · **manual** Post only.  
- **FR-CT-07.4** Cancel/fail return: still blocked · draft intact.  
- **FR-CT-07.5** Stale / WRITE-DENIED-UNKNOWN: honest copy · no auto `/verify` on bare 403 fixture.  
- **FR-CT-07.6** Read / React / Share remain usable while gated.  
- **FR-CT-07.7** Mobile gate usable (M157 F).

## Вне scope

Real eID/phone flows · redesign `/verify` · invent Identity fields · auto-post

## Acceptance Criteria

- [x] Fixture stands A/C/D/E (+ B stub · F) — STRUCTURE (OP eye Absent)  
- [x] No auto-post after verified — STRUCTURE  
- [x] Vitest writeCapability matrix — PASS (`threadMount.ct07`)  
- [ ] OP eye — **BLOCK** Partial visual  

## Technical subtasks

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-07-t01-verify-gate-ui` | Done | Greenfield VerifyWriteGate chrome (ref next-feed) | `verify/VerifyWriteGate.jsx` | 07.1 · 07.7 |
| `task-spa-ct-07-t02-capability-wire` | Done | `writeCapability` drives gate vs composer | ThreadMount · FixtureAdapter | 07.1 · 07.5 |
| `task-spa-ct-07-t03-stub-handoff` | Done | CTA → `/verify` or lab return simulator · session draft keys | lab host · adapter | 07.2–07.4 |
| `task-spa-ct-07-t04-no-autopost` | Done | Verified restores intent only | composer | 07.3 |
| `task-spa-ct-07-t05-vitest-gate` | Done | Matrix A/C/D/E · React still openable | tests | 07.6 · AC |

## DoD

M157 lab path honest without Identity invent.
