# 18. REQ9 — `VITE_IDENTITY_BASE_URL` naming

Parent: docs/requirements backlog/REQ9-DOGEstonia-Microservices-Ops-Parity-Target.md §5–§6 R3, §8.5, §10.2  
Parent-id: dogestonia-microservices-ops-parity-target  
Siblings:  
- doge-identity-service/docs/requirements/22-req9-make-env-load-parity.md (contract: URL points at identity origin; user Bearer only)  
- doge-ai-bridge/docs/requirements/REQ-08-REQ9-OPS-PARITY-AND-GATEWAY-NAMING.md (contract: `SPA_BASE_URL` / public dashboard origin alignment — value-level; no shared env name required)  
Status: Done · P3 REQ9-01 (`pkg-000086`, 2026-09-26T12:09:47Z)  
Дата: 2026-09-25 · materialized: 2026-09-26T11:57:48Z · P3 Done: 2026-09-26T12:09:47Z  
Backlog: [req9-vite-identity-base-url/INDEX.md](../tasks/backlog-stories/req9-vite-identity-base-url/INDEX.md) · [STORY-SPA-REQ9-01](../tasks/backlog-stories/req9-vite-identity-base-url/STORY-SPA-REQ9-01-vite-identity-base-url.md)  

---

## 1) Goal

Rename spa peer env `VITE_IDENTITY_SERVICE_URL` → `VITE_IDENTITY_BASE_URL` (hard cut) to match `VITE_{PEER}_BASE_URL` grammar. Keep never-embed service tokens.

## 2) Scope / Out of scope

**In:** `.env.example`, `publicEnv` / `resolveIdentityServiceUrl` (and call sites), docs; Railway/build env var rename; local+Railway as needed.

**Out:** new spa `/health` endpoint (G10); invent waitlist backend (R12); `VITE_GATEWAY` / `VITE_THREADS` renames (already aligned).

## 3) Verified current state

**Historical (pre-REQ9-01):** identity peer bake key was named `VITE_IDENTITY_SERVICE_URL` in `.env.example` / resolver.

**As-of-Done / Current:** primary name `VITE_IDENTITY_BASE_URL` (hard cut; no dual-read).

## 4) Target behavior

- Primary name `VITE_IDENTITY_BASE_URL` everywhere; old name removed (hard cut)  
- Still user session Bearer to identity

## 5) Acceptance criteria

- [x] R3: code+template+docs use `VITE_IDENTITY_BASE_URL`  
- [x] No `VITE_*SERVICE_ROLE*` / service token  
- [x] G10: no new BE health route required

## 6) Open questions

- `VITE_WAITLIST_API_URL` backend — Unknown (R12)

## 7) Dependencies

Parent R3; sibling identity `22-…` (origin semantics only).
