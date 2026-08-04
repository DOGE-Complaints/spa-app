# Mockup 19 Spec — Header Brand Strip

> **Superseded for public header chrome (ADMIN-PH-02):** `SYNCED` as a primary header label and the M19 strip contract are superseded by [M129 Public Header Chrome](../home/mockup-129-public-header-chrome-state-sheet-spec.md) where they conflict. Keep this file for historical reference; do not reintroduce SYNCED into the new public header.

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-header.png`  
**Logo asset:** `dist/assets/Logo-Big.png`  
**Version:** v1.0  
**Status:** active SSOT for header strip baseline *(SYNCED-in-header superseded by M129)*  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует мокап

Базовую шапку (header strip) для board/details shell:
- слева: бренд-блок `DOGEstonia` с логотипом;
- справа: status-индикатор `SYNCED`;
- справа от индикатора: компактный language trigger (`ET` + chevron).

---

## 2) Канонические параметры

- Canvas mockup: `1536x1024`.
- Header strip: горизонтальная полоса по ширине экрана.
- Логотип: источник файла `dist/assets/Logo-Big.png` (`1085x537`), используется в уменьшенном масштабе внутри шапки.
- Разделители/границы: тонкие, low-contrast, светло-серые на темном фоне.

---

## 3) UX-правила

- Header остается стабильным между board/details (общий app-shell).
- `SYNCED` — read-only статус-индикатор, не CTA.
- Языковой trigger открывает language dropdown (см. `M20`), сам по себе не меняет route.
- Внутри header не добавляются лишние primary-CTA.

---

## 4) Визуальные правила

- Dark palette, согласованная с board shell.
- Brand copy: `DOGEstonia` (точный casing).
- Логотип визуально не доминирует над контентом board/details.

---

## 5) Что НЕ фиксируется

- Семантика источника статуса `SYNCED`.
- Логика онлайн/оффлайн репорта.
- Поведение других actions вне language dropdown.

---

## 6) Трассировка в задачи EPIC-03

- `task-implement-epic03-board-main-visual-parity`
- `task-implement-epic03-branding-and-verified-ui`
- `task-implement-epic03-i18n-foundation-and-switcher`
