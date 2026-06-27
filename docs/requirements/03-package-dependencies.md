# 03. Package Dependencies

> **Статус:** НЕ реализовано. Spec для изменений в `package.json`.
> **Текущий код:** `package.json` — нет Supabase, нет дополнительных зависимостей кроме React и react-router-dom.
> **Связь:** Необходимо для файлов 05 (Supabase Client), 07 (API Client).

---

## Текущие зависимости (верифицировано по `package.json`)

```json
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.13.0"
},
"devDependencies": {
  "@vitejs/plugin-react": "^4.3.4",
  "arkb": "^1.1.61",
  "puppeteer": "^24.22.3",
  "vite": "^6.0.1",
  "vitest": "^4.0.18"
}
```

---

## Что нужно добавить

### Production dependencies

```bash
npm install @supabase/supabase-js
```

| Пакет | Версия | Зачем |
|-------|--------|-------|
| `@supabase/supabase-js` | `^2.x` | Supabase Auth: login, signup, magic link, session management, JWT tokens |

**Больше ничего не добавлять.** Fetch API встроен в браузер — отдельный HTTP клиент не нужен.

### Dev dependencies

Не требуются дополнительные dev dependencies для identity layer.

---

## Почему только @supabase/supabase-js

- **Fetch для identity-service API:** нативный `fetch()` — уже есть в браузере, не нужен axios или httpx.
- **JWT parsing:** `@supabase/supabase-js` управляет Supabase access_token автоматически. Identity-service токены (OAuth access_token) не нужно парсить на frontend — просто передавать как Bearer.
- **Form state:** нативный React `useState` — не нужен react-hook-form для простых форм login/verify.
- **State management:** нет Redux/Zustand — Auth state через React Context (hook паттерн, как в существующем `I18nProvider`).

---

## Целевой `package.json` (фрагмент после изменения)

```json
"dependencies": {
  "@supabase/supabase-js": "^2.47.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.13.0"
}
```

---

## `vite.config.js` — не менять

```javascript
// src/vite.config.js (ТЕКУЩЕЕ, НЕ ТРОГАТЬ)
export default defineConfig({
  base: './',
  plugins: [react()],
})
```

`base: './'` — важно для Arweave деплоя и HashRouter. Изменение может сломать существующий деплой.

**Исключение:** если нужна proxy для dev-сервера (чтобы не иметь CORS при разработке), можно добавить `server.proxy` только в dev config:

```javascript
// vite.config.js — опциональный proxy для dev (не трогать base!)
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api/identity': {
        target: 'http://localhost:8100',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/identity/, ''),
      },
    },
  },
})
```

Proxy — опциональный convenience для dev. В production — явный `VITE_IDENTITY_SERVICE_URL`.

---

## Установка

```bash
cd spa-app
npm install @supabase/supabase-js
```

---

## Acceptance Criteria

- [ ] `npm install` проходит без конфликтов зависимостей
- [ ] `@supabase/supabase-js` импортируется в `supabaseClient.js` без ошибок
- [ ] `npm run dev` стартует без изменений существующего поведения
- [ ] `npm run test:run` (vitest) проходит после добавления зависимости
- [ ] `vite.config.js` не изменён (base: './' сохранён)
