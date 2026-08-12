# G4 ↔ G7 typography seam

- **G4 (this story):** defines `--font-family-base`, `--font-family-mono`, `--font-size-*`, `--font-weight-*` in `src/styles/tokens.css` and applies base family/size/weight on `:root` / `body` in `index.css`.
- **G7:** owns `@font-face` rules and self-hosted font binaries; must bind those faces to the same `--font-family-*` names without renaming tokens.
- **Out of G4:** no `@font-face`, no font files under `src/`.
