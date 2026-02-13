# Arweave GraphQL for SPA Read-Side

## Что это и зачем

Arweave предоставляет GraphQL endpoint (например `https://arweave.net/graphql`), через который можно:

- искать транзакции по тегам;
- фильтровать и сортировать;
- получать `txid`, теги и block metadata.

Важно: GraphQL здесь используется как индекс/поиск.  
Сам JSON контент issue затем берется через REST:

- `GET https://arweave.net/<txid>`

---

## Почему это подходит нам

У нас каждый issue маркируется тегами (`App-Name`, `Schema`, `Category`, `Region`, ...), а SPA должна:

- строить ленту,
- фильтровать,
- поддерживать пагинацию.

GraphQL закрывает это нативно через `tags + sort + cursor`.

---

## Базовый GraphQL запрос

```graphql
query {
  transactions(
    tags: [
      { name: "App-Name", values: ["dogeestonia"] }
      { name: "Schema", values: ["issue_v1"] }
    ]
    sort: HEIGHT_DESC
    first: 20
  ) {
    edges {
      cursor
      node {
        id
        tags {
          name
          value
        }
        block {
          timestamp
          height
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
```

Что важно в ответе:

- `edges[].node.id` -> `txid`;
- `edges[].node.tags` -> метаданные для фильтрации;
- `edges[].cursor` и `pageInfo.hasNextPage` -> пагинация.

---

## Вызов из SPA (fetch)

```js
const query = `
  query ($cursor: String) {
    transactions(
      tags: [
        { name: "App-Name", values: ["dogeestonia"] },
        { name: "Schema", values: ["issue_v1"] }
      ]
      first: 20
      after: $cursor
    ) {
      pageInfo { hasNextPage }
      edges {
        cursor
        node {
          id
          tags { name value }
          block { height timestamp }
        }
      }
    }
  }
`

const res = await fetch('https://arweave.net/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, variables: { cursor: null } }),
})

const json = await res.json()
```

---

## Пагинация (cursor-based)

Arweave GraphQL поддерживает курсоры:

- `edges[].cursor` -> курсор следующей страницы;
- `pageInfo.hasNextPage` -> индикатор продолжения.

Следующая страница:

```graphql
query ($cursor: String) {
  transactions(after: $cursor, first: 20, tags: [...]) {
    pageInfo { hasNextPage }
    edges { cursor node { id } }
  }
}
```

---

## Получение самого issue JSON

После GraphQL поиска по `txid`:

```js
const data = await fetch(`https://arweave.net/${txid}`)
const jsonIssue = await data.json()
```

---

## Рекомендованный pipeline в SPA

1. Выполнить GraphQL POST с фильтрами по тегам.
2. Получить `txid` список (`edges[].node.id`) + cursors.
3. По каждому `txid` получить JSON через REST.
4. Нормализовать в domain `Issue`.
5. Отобразить в UI.
6. Для следующей страницы передать `after: cursor`.

---

## Примеры фильтров

По категории:

```js
[{ name: 'Category', values: ['social_services'] }]
```

По региону + severity:

```js
[
  { name: 'Region', values: ['EE-TLN'] },
  { name: 'Severity', values: ['3'] },
]
```

---

## Endpoints

- Primary (authoritative): `https://arweave.net/graphql`
- Optional accelerator: `https://arweave-search.goldsky.com/graphql`

Правило: Goldsky можно использовать как ускоритель, но источник истины для поведения должен оставаться совместимым с primary endpoint.

---

## Практические плюсы подхода

- мощная фильтрация по тегам;
- минимальный payload на поиск;
- нативная пагинация для больших лент;
- естественно встраивается в read-side архитектуру SPA.