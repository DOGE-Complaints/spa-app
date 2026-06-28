# Mockup 21 Spec — User Cabinet Overview / Default

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-User-Cabinet-overview-default.png`
**Version:** v1.0
**Status:** active SSOT for user cabinet default layout
**Related docs:** `docs/UX/design-system.md`, `docs/UX/reusable-ui-components-architecture.md`, `docs/UX/identity-frontend-ux-requirements.md`

---

## 1) Что фиксирует мокап

Главный экран пользовательского кабинета DOGEstonia:

* общий app shell;
* active sidebar item `Profile`;
* account overview;
* civic verification status;
* story activity;
* wallet placeholder;
* civic contributions placeholder.

---

## 2) Состояния и поведение

* `default`: пользователь авторизован, данные профиля загружены.
* `phone_verified=true`: показывается `Verified Civic Participant`.
* `wallet_not_linked`: wallet-блок видим, но не является блокером MVP.
* future-блоки receipts/contributions показываются как `Coming Later`.

---

## 3) Визуальные правила

* Используется существующий DOGEstonia shell: sidebar, header, footer.
* Cabinet не должен выглядеть как social profile.
* Civic Status — главный визуальный блок экрана.
* Yellow accent используется только для статуса, активных элементов и важных affordance.
* Future-блоки должны выглядеть аккуратно, а не как незавершённый UI.

---

## 4) Функциональный контракт

Экран должен отображать:

* account email или masked email;
* account creation date;
* role;
* account status;
* phone verification status;
* phone verification date;
* submitted stories count;
* drafts count;
* published issues count;
* recent story activity;
* wallet state;
* future receipts/contribution/reputation placeholders.

Raw phone number не показывается.

---

## 5) Что НЕ фиксируется

* Phone verification modal states.
* Wallet connection flow.
* Receipt details.
* Contribution scoring logic.
* Reputation mechanics.
* Mobile layout.

---

## 6) Трассировка в задачи EPIC-04

* `S04-1 — Profile Cabinet Shell`
* `S04-2 — Account Summary Block`
* `S04-3 — Civic Verification Status`
* `S04-6 — Story Activity in Cabinet`
* `S04-7 — Wallet Placeholder`
* `S04-8 — Receipts & Contribution Placeholder`
