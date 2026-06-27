# dogeestonia SPA

**Децентрализованный гражданский issue-tracker** — фронтенд-приложение по ТЗ dogeestonia.

- Хостинг: Arweave (permaweb)
- Стек: React + Vite
- Hash-routing: `/#/issue/42`
- Jira-подобный UI: Issue Board, sidebar, карточки

## Commands

```bash
npm install   # Install dependencies
npm run dev   # Start dev server (http://localhost:5173)
npm run build # Build static bundle to dist/
npm run preview # Preview production build
npm run deploy # Deploy dist/ to Arweave (requires ARWEAVE_WALLET_PATH)
```

См. `docs/technical-architecture.md` для архитектуры и `docs/requirements/README-index.md` для planned identity-расширения.
Контракт домена и фасада: `docs/domain-facade-contract.md`.
Инструкция деплоя: `docs/deploy-arweave.md`.
