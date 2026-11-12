# Story acceptance gate — STORY-SPA-CR-24-react-underlay-own-vs-people

- **Story:** React wide underlay · own vs people (M163/M164)
- **Package:** `pkg-000208-20261022-epic-spa-23-cr-24-react-underlay-own-vs-people.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-22T15:04:21Z
- **Note:** P3 Execute Done · T01–T04 **Done** · Path A M163/M164 · Interview Rx7 · Partial visual=**BLOCK** · OP eye **Absent** · no invent OP PASS · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| M163/M164 + intake cited | Pass | ui-mockup-spec · ARCH §2 · Interview Rx7 |
| Wide underlay · React≠people · Reactions≠picker | Pass (structure) | `data-rm-react-underlay=wide` · React→picker · Reactions text-only · CAPTURE-META `fails: []` |
| Own icons in-zone · stable geometry · no below-row | Pass (structure) | `ownInZone` · `data-rm-own-slots=3` · no aggregate below |
| Vitest · OP eye | **BLOCK** | cr24 **5/5** · feed.cr24 **2/2** · OP Absent |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/reactions-mount/__tests__/reactionsMount.cr24.test.jsx src/features/feed/__tests__/feed.cr24.test.jsx
```

## Visual checklists

[`visual-checklists-react-underlay-own-vs-people.md`](./visual-checklists-react-underlay-own-vs-people.md) · CAPTURE-META `fails: []` · md5 prefixes `bc27f8fe30dd` · `be91f9a93568` · `93d0082d897f` · `a6ddceecd990` · `a6ddceecd990`

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
