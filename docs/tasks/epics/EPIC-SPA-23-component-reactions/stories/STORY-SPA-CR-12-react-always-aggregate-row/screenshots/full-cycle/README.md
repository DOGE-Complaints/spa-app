# CR-12 screenshots — M154 `#/lab/feed` React-always + aggregate

> Captured 2026-10-16T10:42:46Z · Vite `5173` · OP eye **Absent** · Partial=**BLOCK**

| # | File | md5 prefix | Claim |
|---|------|------------|-------|
| 01 | `01-lab-feed-cr12-empty-react-always-1536x1024.png` | `edb1d41a0e8d` | Empty · React visible · no aggregate row |
| 02 | `02-lab-feed-cr12-populated-react-aggregate-1536x1024.png` | `15e4afe683cc` | Populated · React + aggregate under strip |
| 03 | `03-lab-feed-cr12-reactions-zone-1536x1024.png` | `54b4659b7577` | Reactions zone distinct |
| 04 | `04-lab-feed-cr12-no-dual-react-1536x1024.png` | `43d7138cf65f` | No dual React under strip |
| 05 | `05-lab-feed-cr12-picker-dismiss-1536x1024.png` | `2f9e53a93482` | Picker from React · portal dismiss held |

Capture: `spa-app/scripts/tmp-cr12-capture.mjs`  
Facts: emptyReact · !emptyAgg · popReact · popAggInHost · !dualUnderStrip  
Verify: `http://127.0.0.1:5173/#/lab/feed`
