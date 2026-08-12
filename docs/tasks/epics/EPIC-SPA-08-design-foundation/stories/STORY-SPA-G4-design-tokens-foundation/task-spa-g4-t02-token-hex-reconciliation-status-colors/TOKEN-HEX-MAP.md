# Token → hex reconciliation (D-G4-1 / D-G4-5)

**Source:** `rg -o '#[0-9a-fA-F]{3,8}' spa-app/src --glob '*.css' | … uniq -c` (P3 execute 2026-07-28)  
**Canonical file:** `spa-app/src/styles/tokens.css`

| Token | Chosen hex | Dominant / rationale | Collapsed literals |
|-------|------------|----------------------|--------------------|
| `--color-bg-primary` | `#141417` | 8×; `:root` / body base | `#17181c` (gradient mid → primary family) |
| `--color-bg-secondary` | `#1b1c1f` | 8× header/panels | `#1f2024`, `#1a1f2e`, `#25262c`, `#232428` |
| `--color-text-primary` | `#f2f2f2` | 18× | `#f5f7fa`, `#ececf0`, `#edf0f7`, `#e6e8ef`, `#e8e9ed` |
| `--color-text-secondary` | `#9a9da6` | 13× | `#8f939f`*, `#8f939c`, `#a0a3ac`, `#9ca0ab`, `#9aa3b2`, `#c8c9cc`, `#c9cbd2`, `#aab0bc`, `#b8bcc7`, `#b8bbc4` |
| `--color-accent-primary` | `#f5c518` | 9× | `#f5c542`, `#ffd600` |
| `--color-accent-active` | `#c7a646` | 4× darker gold | `#d9c481`, `#c5a162`, `#bea056`, `#bb944a` |
| `--color-border-default` | `#8f939f` | 5× | `#d0d5dd` (light borders → default in dark UI consumers that already use gray) |
| `--color-border-muted` | `#6b6e78` | 6× | — |
| `--color-danger` | `#ff7b7b` | D-G4-5 | `#ffb4b4` |
| `--color-success` | `#9be28d` | D-G4-5 | `#7ddf98`, `#7dcea0` |

\* `#8f939f` also used as border — mapped to `--color-border-default` when used as border/color muted gray; text uses `--color-text-secondary` where semantic is secondary text (same hex family collapsed).

**Left as intentional literals (not mapped):** rgba overlays/shadows; StatusBadge specialty surfaces (`#252932`, `#262a33`, …); one-off blues (`#3d7eff`); pure `#fff` on LocaleSelector light chrome if still light-themed.

**Aliases in tokens.css:** `--color-surface-elevated`, `--color-surface`, `--color-text-muted`, `--color-border-subtle`, `--color-border` → §2 tokens (pre-existing local `var(--…, fallback)` usage).
