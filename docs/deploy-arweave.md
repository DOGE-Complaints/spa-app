# Deploy SPA to Arweave

Этот документ описывает воспроизводимый деплой `spa-app` в Arweave через `arkb`.

## Prerequisites

- Node.js + npm
- Собранный проект (`dist/`)
- Arweave wallet keyfile с балансом для публикации

## Environment

Создай `.env` (локально, не коммитить) на основе `.env.example`:

```bash
ARWEAVE_WALLET_PATH=/Users/eslinko/Development/Dogecomplaints/keys/arweave-wallet.json
ARWEAVE_USE_BUNDLER=false
ARWEAVE_BUNDLER_NODE=https://node1.bundlr.network
```

Минимально обязательно:
- `ARWEAVE_WALLET_PATH`

Допустимые форматы:
- абсолютный путь (рекомендуется),
- относительный путь от `spa-app` (для текущего setup: `../keys/arweave-wallet.json`).

### Где хранить keyfile

Рекомендуемая директория (вне репозитория):

```bash
/Users/<your-user>/.config/dogecomplaints/keys/arweave-wallet.json
```

Текущий локальный вариант в этом проекте:

```bash
/Users/eslinko/Development/Dogecomplaints/keys/arweave-wallet.json
```

Почему так:
- ключ не попадает в git/workspace;
- путь стабильный для локальных скриптов;
- проще управлять доступом к каталогу ключей.

## Deploy flow

```bash
cd /Users/eslinko/Development/Dogecomplaints/spa-app
npm install
npm run build
npm run deploy
```

`npm run deploy` автоматически читает `.env`.

После успешного деплоя скрипт печатает:
- `txid`
- URL `https://arweave.net/<txid>`

## Verification

1. Открой `https://arweave.net/<txid>`.
2. Проверь роуты:
   - `https://arweave.net/<txid>#/board`
   - `https://arweave.net/<txid>#/issue/42`
3. Убедись, что страница и ассеты грузятся без внешних CDN.

## Troubleshooting

- **`ARWEAVE_WALLET_PATH is required`**  
  Установи переменную окружения `ARWEAVE_WALLET_PATH`.

- **`Wallet file not found`**  
  Проверь путь к keyfile. Для текущего проекта корректные варианты:
  - `/Users/eslinko/Development/Dogecomplaints/keys/arweave-wallet.json`
  - `../keys/arweave-wallet.json` (если запуск из `spa-app`).

- **`Wallet file not found: keys/arweave-wallet.json`, хотя в `.env` путь другой**  
  В shell может быть ранее экспортирован старый `ARWEAVE_WALLET_PATH`.
  Выполни:
  ```bash
  unset ARWEAVE_WALLET_PATH
  npm run deploy
  ```
  или явно передай корректный путь:
  ```bash
  ARWEAVE_WALLET_PATH=/Users/eslinko/Development/Dogecomplaints/keys/arweave-wallet.json npm run deploy
  ```

- **Недостаточно средств на кошельке**  
  Пополни wallet и повтори деплой.

- **CLI завершается без txid в выводе**  
  Проверь полный stdout/stderr `arkb`; при успехе txid можно получить из финальной транзакции в выводе CLI.
