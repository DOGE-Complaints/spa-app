# Solution architecture — SPA-ES-03-T01

Emerging client mirrors Pulse: `createGatewayEmergingSignalsRepository(baseUrl)` → `GET {base}/tallinn/emerging-signals?top_n=` (default 10, clamp `[1,50]`).  
`emergingSignalsService` maps HTTP/missing-URL to `{ status: 'empty', cards: [] }` (never fabricates). Bind map is `bindEmergingSignals` (label/axis/story_count only).
