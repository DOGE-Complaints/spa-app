# Implementation plan — DASH-G1-T02

## Change

Update `GatewayIssueRepository.test.js`:

1. Line 29: `demo-tallinn/issues` → `tallinn/issues`
2. Line 44: add `expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8000/tallinn/issues/missing')`

## Dependency

Requires t01 (repository path fix).
