# Spa Active Packages

Immutable queue snapshots for Spa Story Builder (`builder_project: spa`).

- Add new package as `pkg-<NNNNNN>-<YYYYMMDD>-<slug>.yaml` after **P1.3** / **P1.2** / **P1.1** ([workflow.md](../../../docs/methodology/Zeya888-builder-queue/core/workflow.md)).
- Do not edit existing package files after creation.
- Update `../spa-active-package.current.yaml` → `package_file` and set `activation: active` after first real pkg.
- **`pkg-bootstrap-pending.yaml`** — placeholder until first P1; `--verify` expected to FAIL (empty queue).

Spec: [input-package-spec.md](../../../docs/methodology/Zeya888-builder-queue/specs/input-package-spec.md)
