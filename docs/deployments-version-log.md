# Deployments & Version Log (Persistent)

Этот журнал фиксирует релизы SPA в Arweave для отслеживания прогресса EPIC-02 и последующих релизов.

## Log format

- `release_id`: человекочитаемый идентификатор релиза
- `app_version`: версия из `package.json`
- `git_sha`: commit SHA на момент деплоя
- `txid`: Arweave transaction id (manifest)
- `url`: публичный gateway URL
- `network`: целевая сеть
- `status`: `success` | `failed` | `rolled_back`
- `notes`: важные детали деплоя/проверки

---

## Entries

### 2026-02-13 — Release R0.0.0-001

- release_id: `R0.0.0-001`
- app_version: `0.0.0`
- git_sha: `b81e19d`
- txid: `0ll0QWcEGAbhlxfFkOMBMTRH19XylNCOKIKl3JrzQFQ`
- url: `https://arweave.net/0ll0QWcEGAbhlxfFkOMBMTRH19XylNCOKIKl3JrzQFQ`
- network: `Arweave mainnet`
- status: `success`
- notes:
  - First successful test deploy for `spa-app`.
  - Hash routes expected:
    - `#/board`
    - `#/issue/42`
  - Confirmed via gateway mirror:
    - `https://2jmxiqlhaqmanymxc7czbyybge2epv6v6kknbdriqks5zgxtibka.arweave.net/0ll0QWcEGAbhlxfFkOMBMTRH19XylNCOKIKl3JrzQFQ/`
