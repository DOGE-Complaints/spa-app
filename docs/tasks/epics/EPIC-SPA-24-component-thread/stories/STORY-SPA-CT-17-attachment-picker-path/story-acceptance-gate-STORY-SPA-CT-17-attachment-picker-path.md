# Story acceptance gate — STORY-SPA-CT-17-attachment-picker-path

- **Story:** M153a attachment picker path
- **Package:** `pkg-000175-20261020-epic-spa-24-ct-17-attachment-picker-path.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-20T12:00:47Z
- **Note:** P3 structure Done · T01–T05 Done · Path A M153a v1.1 · Partial visual=**BLOCK** · OP eye Absent · no invent MIME/HTTP/OP PASS · vitest feed-lab+thread-mount **164/164** · Path A shots 01–05 md5 `3bda8d25590c` · `d839842d56f8` · `1895b4e24676` · `6b2c0f49d9d4` · `876f9a920fd3`

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| A: zero chips before Attach | Structure Pass | shot 01 · chips=0 |
| Attach opens native picker (`input[type=file]` or platform equivalent) | Structure Pass | shot 02 · `type=file` |
| Cancel leaves draft/selection unchanged | Structure Pass | ct17 vitest · empty FileList |
| No synthetic Ready without picker selection | Structure Pass | ct17 · Attach click alone · no chips |
| F: Attach omitted when attachments unavailable | Structure Pass | shot 05 · stand Q |
| Family allow-list documented; exact MIME TBD not invented | Structure Pass | `ATTACHMENT_FAMILY_ALLOWLIST` · `ATTACHMENT_MIME_TABLE_TBD=null` |
| Honesty: local intent · not published | Structure Pass | shot 03 · `data-tm-attach-published=false` |
| §18 items remain explicit blockers for product ship | Held | MIME table null · fail-closed deny |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** | Absent · Partial=BLOCK |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
CT17_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct17-capture.mjs
```

## Visual checklists

[`visual-checklists-attachment-picker.md`](./visual-checklists-attachment-picker.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
