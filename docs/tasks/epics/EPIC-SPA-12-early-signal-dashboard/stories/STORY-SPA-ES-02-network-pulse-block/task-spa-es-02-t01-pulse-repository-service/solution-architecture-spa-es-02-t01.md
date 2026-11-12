# Solution architecture — SPA-ES-02-T01

Pulse client mirrors Issues: `createGatewayNetworkPulseRepository(baseUrl)` → `GET {base}/tallinn/network-pulse`.  
`networkPulseService` maps HTTP/missing-URL to `{ status: 'omit' }` (never fabricates). Bind map is a separate domain helper (`bindNetworkPulse`) for T03.
