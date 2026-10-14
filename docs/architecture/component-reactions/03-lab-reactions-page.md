# component-reactions — Lab reactions page (CR-03)

> Package: REQ-24 · EPIC-SPA-23 · **structure Present · visual BLOCKED** (OP eye Absent)  
> Route: `#/lab/reactions` (shell Routes · pattern `#/lab/feed`)  
> Code: `ReactionsLabPage` · `ReactionsLabCanvas` · adapters  
> Recorded: 2026-10-14T11:55:04Z · P8 docs · P5 TASKED=0

## Present

| Piece | Role |
|-------|------|
| `pages/ReactionsLabPage.jsx` | Shell route host · `data-rm-adapter-default=fixture` · M155 OOS |
| `lab/ReactionsLabCanvas.jsx` | Two hosts root+comment · strip stands · picker scenes |
| `adapters/FixtureAdapter.js` | Lab default · no HTTP |
| `adapters/LiveAdapter.js` | Thin wrap `ThreadsSocialClient` only · optional toggle |

## Locks

- FixtureAdapter **default** · Live not default  
- Mounts CR-01 strip + CR-02 picker · no second client  
- `#/next/feed` cutover OOS · M155 people OOS  
- Partial visual = **BLOCK** until OP eye — do not invent PASS
