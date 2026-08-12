# Acceptance verification — DASH-G1-T04

**Task:** task-dash-g1-t04-sync-doc-touchpoints-g1  
**Status:** Done (2026-06-12)

## AC checklist

- [x] Removed «не выполнено — gap G1» notes from touchpoint files
- [x] `GET {VITE_GATEWAY_BASE_URL}/tallinn/issues` confirmed in technical-architecture, domain-facade-contract, reality-mode
- [x] reality-mode references gateway API_REFERENCE §7
- [x] gap-report §5 G1 → Done; backlog INDEX G1 → Done

## Commands run

```bash
rg "gap G1|demo-tallinn" spa-app/docs/technical-architecture.md spa-app/docs/domain-facade-contract.md spa-app/docs/analysis/
```

**Result:** no matches.
