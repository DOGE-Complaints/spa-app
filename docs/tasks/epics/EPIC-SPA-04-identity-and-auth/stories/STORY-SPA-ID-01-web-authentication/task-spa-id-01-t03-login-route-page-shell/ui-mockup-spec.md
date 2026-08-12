# UI Mockup Spec — Login Route (extends M121)

**Story:** STORY-SPA-ID-01-web-authentication  
**Anchor task:** task-spa-id-01-t03-login-route-page-shell  
**Extends:** [mockup-121-web-authentication-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.md)  
**PNG ref:** [mockup-121-web-authentication-state-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.png)  
**Route:** `/#/login`  
**Viewport:** 1536×1024

## Path A — @mockup SSOT

Operator gate: **принято** (P3 Execute with `@mockup` refs).

## Delta from global tokens

Reuse [`index.css`](../../../../../../src/index.css) dark civic palette:

| Token | Value | Usage |
|-------|-------|-------|
| `--auth-bg` | `#141417` radial | page backdrop |
| `--auth-card` | `rgba(27,28,31,0.92)` | centered card |
| `--auth-accent` | `#ffd600` | primary CTA |
| `--auth-border` | `rgba(255,255,255,0.12)` | card border |

## States (runtime — one visible)

| State | `data-auth-state` | Title |
|-------|-------------------|-------|
| A Login | `login` | Sign In |
| B Signup | `signup` | Create Account |
| C Magic Link | `magic-link-sent` | Check Your Email |
| D Forgot | `forgot-password` | Reset Password |
| E Error | `auth-error` | Authentication Error |
| F Success | `auth-success` | Welcome Back |

## Puppeteer selectors

| Selector | Purpose |
|----------|---------|
| `[data-auth-state="login"]` | State A |
| `[data-auth-state="magic-link-sent"]` | State C |
| `[data-auth-state="auth-error"]` | State E |
| `[data-testid="auth-email"]` | Email input |
| `[data-testid="auth-password"]` | Password input |
| `[data-testid="auth-submit"]` | Primary submit |

## Out of scope (M121 artboard only)

- Sidebar session/privacy/API panels from artboard sheet
- GPT/story-draft chrome
- Phone field on signup

## Implementation map

- `src/pages/LoginPage.jsx` + `LoginPage.css`
- `src/auth/authPageState.js`
- Route in `src/App.jsx`
