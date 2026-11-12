# STORY-SPA-THR-03 — reactions.v1 strip + picker (3 layers)

## Meta

- **Key:** `STORY-SPA-THR-03-reactions-v1-picker`
- **orientation:** ui_first
- **ui_scope:** visual
- **Status:** Done · P3 product AC
- **Blocked-on:** — (P1.3 activated `pkg-000079`)
- **Depends on:** [M145](../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md); catalog [reactions.v1](../../../../../docs/requirements%20backlog/DOGEstonia%20—%20Threads%20—%20Emotional%20reactions.md); [icon catalog](STORY-SPA-THR-icon-assets.md); host [M143](../../../UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.md)
- **Package:** [threads-feed/](INDEX.md)
- **Architecture:** [03-reactions-attachments-escalation](../../../architecture/threads-feed-ux/03-reactions-attachments-escalation.md)
- **Parent REQ:** §2, §4.2, AC-SPA-THR-02; parent §8 layers

## Артборд (SSOT дизайна)

| Мокап | Состояние / фокус | Спека | PNG |
|-------|-------------------|-------|-----|
| **M145** THR-R | Strip · picker 3 layers · enabled-only · desktop/mobile open · keyboard · agree⊥disagree | [mockup-145-…-spec.md](../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md) | [mockup-145-…-spec.png](../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.png) |

Implement **THR-R-A…G** per M145; catalog authority = reactions.v1 (M145 §2).

## Зачем простыми словами

Компактный summary strip и picker с тремя labelled groups (Emotional / Epistemic / Moderation), без Facebook Like-only и без смешения семантики слоёв.

## Функциональные требования (FR)

### Catalog & layers (M145 §2–3 · REQ §2)

- **FR-THR-03.1** Only `reactions.v1` ids; **do not invent** new reaction ids or a Like-default row (M145 §2; catalog rejects Facebook like/love/etc.).
- **FR-THR-03.2** Picker presents **three labelled layers**: Emotional · Epistemic · Moderation — not one undifferentiated emoji row (M145 §3, THR-R-B; catalog presentation rule). Localized text authoritative; emoji/icon is visual aid only.
- **FR-THR-03.3** Show **enabled-only** entries; disabled catalog entries omitted or clearly unavailable (THR-R-C). Sample enabled sets per M145 §THR-R-B (e.g. Acknowledge/Support/…; Agree/Disagree/Useful fact/Needs evidence; Off-topic/Aggressive on comments).

### Strip vs picker (M145 THR-R-A/B · arch Q6)

- **FR-THR-03.4** **THR-R-A:** Compact summary strip (counts / top marks) subordinate to the comment; must not dump full catalog or voice-weight math (M145 §THR-R-A).
- **FR-THR-03.5** **THR-R-B:** Full picker opens into labelled groups for a comment target (M145 §THR-R-B).

### Scope: root vs comment (M145 §3)

- **FR-THR-03.6** Moderation group on **comments**; on **thread root** moderation is omitted or explicit unavailable — never looks selectable; do not redirect moderation toward a Story author (M145 §3, anti-patterns).

### Mutual exclusion (M145 THR-R-G · parent §8)

- **FR-THR-03.7** `agree` and `disagree` are mutually exclusive on the same target; selecting one clears the other; helper copy e.g. `Agree and Disagree cannot be selected together.` (M145 §THR-R-G).
- **FR-THR-03.8** Multi-select capacity aligns with node max (Topic-guarded default 3) — show capacity without gamey unlock copy (catalog / REQ).

### Gestures & a11y (M145 THR-R-D/E/F)

- **FR-THR-03.9** **THR-R-D Desktop:** hover **or** explicit button opens anchored picker; button path always available (M145 §THR-R-D).
- **FR-THR-03.10** **THR-R-E Mobile:** long-press may open; **explicit button is present and sufficient** (M145 §THR-R-E).
- **FR-THR-03.11** **THR-R-F:** Visible keyboard focus path through trigger → groups → choices → close (M145 §THR-R-F).

### OOS signals

- **FR-THR-03.12** No voice-weight numbers, sanctions UI, or private report workflows in this shell (M145 anti-patterns; **AC-SPA-THR-03** / REQ8).
- **FR-THR-03.13** React write path = **Unknown / Open** ([ADMIN-THR-04](ADMIN-THR-04-api-requirements.md)) — picker chrome ok; persist only when sibling Closed, else fail-soft Unavailable (no invent HTTP; AC-SPA-THR-01).

## Вне scope

- Invent reaction ids; Facebook reaction icon packs as product  
- Voice-weight display; **AC-SPA-THR-03** cabinet metrics  
- **AC-SPA-THR-07** rate-limit / near-dup UX  
- Escalation / verify / tree attach (siblings)  

## §Иконки

> SSOT: [STORY-SPA-THR-icon-assets.md](STORY-SPA-THR-icon-assets.md). Chrome = PNG; reaction marks = **emoji aids** only (**Not ic-***). Text labels authoritative — **never** show `ic-*` filenames (M145). Do **not** invent `ic-acknowledge` etc.

### Chrome / chrome-adjacent

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| React trigger | `/icons/threads-feed/ic-react.png` | `public/icons/threads-feed/ic-react.png` | thr NEW · same as THR-01 |
| Picker chevron / expand (preferred) | `/icons/public-home/ic-chevron-right.png` | `public/icons/public-home/ic-chevron-right.png` | Reuse |
| Picker chevron (alt down) | `/icons/identity/ic-chevron-down.png` | `public/icons/identity/ic-chevron-down.png` | Reuse · if vertical affordance |

### Reaction marks (Not ic-* — Unicode aids)

| reaction_id | Layer | Emoji aid |
|-------------|-------|-----------|
| `acknowledge` | emotional | 👀 |
| `support` | emotional | 🙌 |
| `empathy` | emotional | 🫶 |
| `concern` | emotional | ⚠️ |
| `hopeful` | emotional | 🌱 |
| `sad` | emotional | 😔 |
| `outraged_situation` | emotional | ⚡ |
| `amused` | emotional | 🙂 (default disabled) |
| `agree` | epistemic | ✅ |
| `disagree` | epistemic | ↔️ |
| `useful_fact` | epistemic | 📌 |
| `insightful` | epistemic | 💡 |
| `needs_evidence` | epistemic | 🔎 |
| `off_topic` | moderation | 🧭 |
| `aggressive` | moderation | 🛑 |

## §L10N

> EN/et/ru labels for reaction ids — SSOT [Emotional reactions catalog](../../../../../docs/requirements%20backlog/DOGEstonia%20—%20Threads%20—%20Emotional%20reactions.md). Chrome EN — M145. Dictionary merge → ADMIN-06 / P1.3.

### Chrome / layers

| key | en | et | ru |
|-----|----|----|----|
| `threadsFeed.reactions.react` | React | Reageeri | Реакция |
| `threadsFeed.reactions.viewReactions` | View reactions | Vaata reaktsioone | Смотреть реакции |
| `threadsFeed.reactions.close` | Close | Sulge | Закрыть |
| `threadsFeed.reactions.layer.emotional` | Emotional | Emotsionaalne | Эмоциональные |
| `threadsFeed.reactions.layer.epistemic` | Epistemic | Epistemiline | Эпистемические |
| `threadsFeed.reactions.layer.moderation` | Moderation | Moderatsioon | Модерация |
| `threadsFeed.reactions.chooseUpTo` | Choose up to 3 reactions | Vali kuni 3 reaktsiooni | Выберите до 3 реакций |
| `threadsFeed.reactions.enabledOnlyHelper` | Only reactions enabled for this node are shown | Näidatakse ainult selle sõlme jaoks lubatud reaktsioone | Показаны только реакции, включённые для этого узла |
| `threadsFeed.reactions.agreeDisagreeExclusive` | Agree and Disagree can’t be selected together | Nõustun ja Ei nõustu ei saa koos valida | «Согласен» и «Не согласен» нельзя выбрать вместе |

### Per-id labels (`threadsFeed.reactions.id.<reaction_id>`)

| key | en | et | ru |
|-----|----|----|----|
| `threadsFeed.reactions.id.acknowledge` | Acknowledge | Märkasin | Замечено |
| `threadsFeed.reactions.id.support` | Support | Toetan | Поддерживаю |
| `threadsFeed.reactions.id.empathy` | Empathy | Tunnen kaasa | Сочувствую |
| `threadsFeed.reactions.id.concern` | Concerned | Olen mures | Беспокоит |
| `threadsFeed.reactions.id.hopeful` | Hopeful | Annab lootust | Даёт надежду |
| `threadsFeed.reactions.id.sad` | Sad | Kurb | Грустно |
| `threadsFeed.reactions.id.outraged_situation` | This is unacceptable | See on vastuvõetamatu | Это возмущает |
| `threadsFeed.reactions.id.amused` | Amusing | Naljakas | Смешно |
| `threadsFeed.reactions.id.agree` | Agree | Nõustun | Согласен / согласна |
| `threadsFeed.reactions.id.disagree` | Disagree | Ei nõustu | Не согласен / не согласна |
| `threadsFeed.reactions.id.useful_fact` | Useful fact | Kasulik fakt | Полезный факт |
| `threadsFeed.reactions.id.insightful` | Insightful | Hea tähelepanek | Ценное наблюдение |
| `threadsFeed.reactions.id.needs_evidence` | Needs evidence | Vajab tõendeid | Нужны подтверждения |
| `threadsFeed.reactions.id.off_topic` | Off-topic | Teemast väljas | Не по теме |
| `threadsFeed.reactions.id.aggressive` | Aggressive | Agressiivne | Агрессивно |

## Субтаски

> Projected pipeline IDs — folders **not** created (ADMIN-THR-06). Arch: [03-reactions](../../../architecture/threads-feed-ux/03-reactions-attachments-escalation.md). **No invent** reaction `ic-*` / ids outside reactions.v1.

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-thr-03-t01-reaction-summary-strip` | Compact reaction summary strip |
| **T02** | `task-spa-thr-03-t02-picker-three-layers` | Picker: Emotional / Epistemic / Moderation (enabled-only) |
| **T03** | `task-spa-thr-03-t03-agree-disagree-exclusive` | agree ⟂ disagree mutual exclusion |
| **T04** | `task-spa-thr-03-t04-emoji-aids-chrome-icons` | Emoji aids + `ic-react` chrome (text authoritative) |
| **T05** | `task-spa-thr-03-t05-l10n-reactions-keys` | `threadsFeed.reactions.*` + per-id labels |
| **T06** | `task-spa-thr-03-t06-vitest-reactions-catalog` | Vitest enabled-only + exclusivity + no invent ids |
| **T07** | `task-spa-thr-03-t07-story-gate-thr-03` | Story gate THR-03 |

## Acceptance Criteria

- [x] All seven states THR-R-A…G present and match M145
- [x] Three labelled layers; enabled-only; moderation not selectable on root
- [x] `agree` ⟂ `disagree` unambiguous
- [x] Desktop button path + mobile button path + keyboard path
- [x] No invent catalog ids (AC-SPA-THR-02 reactions rules)
- [x] Links: M145 · reactions.v1 catalog · REQ-17
