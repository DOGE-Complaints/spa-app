# STORY-SPA-CR-06 — Picker chrome / layout polish

## Meta

- **Key:** `STORY-SPA-CR-06-picker-chrome-layout`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Present · P5 TASKED=0 · P8 Done · `2026-10-15T10:58:18Z` · [`pkg-000142`](../../spa-active-packages/pkg-000142-20261015-epic-spa-23-cr-06-picker-chrome-layout.yaml)
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-05](STORY-SPA-CR-05-strip-open-dismiss.md) · [CR-02](STORY-SPA-CR-02-reaction-picker.md)
- **Blocks:** CR-07
- **UX mirror:** [OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md](OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.3
- **Code home:** `src/features/reactions-mount/picker/ReactionPicker.jsx` · `ReactionPicker.css` · option rows

## Зачем

Убрать визуальный перегруз desktop popover: hint вниз, ширина по контенту, Close = только лёгкий X (из CR-05).

## UX SSOT

- Mirror §3.3  
- M154 panels B/C tone  
- Copy: Present `threadsFeed.reactions.rootModerationHint` (en: Thread root moderation…); **position** changes only

## Icons

Dismiss X = CR-05 / CR-icon `close` · `/icons/next-shell/actions/close.svg`

## FR

- **FR-CR-06.1** Remove visible text «Close» beside dismiss (icon-only per CR-05)  
- **FR-CR-06.2** When `target=thread-root`, render `rootModerationHint` **after** layer groups (footer), not under header  
- **FR-CR-06.3** Desktop `rm-picker--popover`: width hugs longest option label + symmetric horizontal padding; no large empty gutter to the right of labels  
- **FR-CR-06.4** Capacity line remains in header (left); dismiss icon top-right  
- **FR-CR-06.5** Mobile sheet: keep full-bleed / sheet grammar; footer hint still applies on root; hug-width primary for popover  

## Вне scope

Open/dismiss rules (CR-05) · lab/feed cutover (CR-07) · invent L10N keys if Present key works · M155

## Acceptance Criteria

- [x] Root hint is below layers (`data-testid="rm-picker-root-scope-hint"` still Present, DOM order after groups) · structure (OP eye Absent → gate BLOCK)
- [x] No labeled Close button; icon-only dismiss Present · structure
- [x] Popover width content-hug (visual + CSS: no fixed over-wide min-width that creates empty gutter) · structure
- [x] Capacity + layers + XOR/capacity AC from CR-02 still hold · structure
- [x] Vitest: hint order on thread-root; close control has no visible Close text · structure


## DoD

Verified on `#/lab/reactions` root host before CR-07.
