# next-feed-lab — Visual DoD & anti-failure rules

> **SSOT for lab Done.** Cite from LAB stories · Process **A+C+F** · [process options](../../../analysis/analysis-next-feed-artboard-visual-process-options-2026-10-13.md) · [post-VL gaps](../../../analysis/analysis-next-feed-ds-component-implementation-gaps-2026-10-12.md)  
> **Mode:** постановка / gate language only · **name ≠ create** · no invent SVG/API · written artboard § > generated PNG

---

## 1) Human DoD (one line)

На `#/lab/feed` карточка читается как panel артборда (M150/M154/…) — **не** как classic `#/board` — по **written checklist must-states** + **скрин local-five** + **OP eye**; иначе **не Done**.

---

## 2) Process lock A+C+F (OP 2026-10-13)

| Letter | Rule |
|--------|------|
| **A** | Lab-first visual SSOT → port to `#/next/feed` only after lab gates PASS |
| **C** | Restyle DS atoms / tokens **in lab** (CSS rewrite under same export names); do not invent parallel greenfield names |
| **F** | Written artboard checklist **and** OP pair review; neither alone is enough |

**Partial visual = BLOCK** (same spirit as AD-VL-03). Soft wording «Partial OK to document» is **forbidden** as Done AC.

---

## 3) Past failure modes → hard bans (verified)

| Failure (what happened on VL / next) | Evidence | Lab Done ban / required |
|--------------------------------------|----------|-------------------------|
| DoD = structure only («файл есть / wired») | gap §1 · VL AC named+anti-mix | Done **requires** visual checklist + screenshot + OP; export-exists ≠ PASS |
| Classic CSS leak | `ReactionChrome.jsx` → `ReactionControls.css` | **Ban** classic `*Controls.css` / board skin CSS on lab Done import path |
| Shelter shell | `FeedListArea` + `BoardIssuePost` | **Ban** `BoardIssuePost` / unre-skinned card shell on lab |
| Product hosts as compose | `FeedCivicPost` · `FeedDiscussionBlock` | **Ban** on lab Done path (interview Q2) |
| Classic copy | DISCUSSION via `threadsFeed.post.action.discussion` | Lab strings = DS/product copy or fixture EN/ET — **not** classic DISCUSSION as Done |
| UUID-first identity | `publicLabel=null` → uuid chrome | Fixtures use `DOGEstonia-UusVeerenni-00N` as visible id |
| No live↔artboard gate | gap §5 · process §2 | Every visual tip: checklist from **written** artboard § + local-five evidence |
| Wrapper story without look | process §6 | No new wrapper story without visual checklist |
| Invent for PASS | analysis.mdc · DS locks | No invent SVG / API fields / second media asset |
| PNG as only SSOT | artboard specs | Written § anatomy/spacing/order wins over pixels |
| Port before lab look | process A | `#/next/feed` **unchanged** until LAB visual gates + **LAB-05** port |
| Shelter marked non-Done but still shapes eye | gap §5 | Port must **remove** shelter from next list Done path — not leave `data-vl-done-claim="false"` forever |

---

## 4) Gate tip order (greenfield LAB-07…10 · after LAB-06 deprecate)

| Order | Artboard | Primary story | Must cover (extract from **written** spec §) |
|-------|----------|---------------|-----------------------------------------------|
| 1 | M150 | LAB-07 | identity · text · media slot · action strip · card silhouette |
| 2 | M154 | LAB-08 | reaction aggregate / picker — **greenfield CSS only** · no emoji-soup · no second React pill |
| 3 | M152 / M153 | LAB-09 | discussion summary / tree / composer · no DISCUSSION classic label |
| 4 | M158 | LAB-10 | modal/sheet detail parity |
| 5 | M149 | LAB-07/10 list rhythm | five-card rhythm / spacing (lab list; not product toolbar/map) |

LAB-03/04 shallow compose = **not** visual SSOT after greenfield cutover (LAB-10). Tip SSOT for lab visual Done = **LAB-10** gate pack (M150→M154→M152/M153→M158→M149) + OP eye; LAB-10 P3 structure Present (`2026-10-13T19:24:46Z`) · OP eye Absent → Partial=**BLOCK**.

For each row: (a) checklist bullets in story gate evidence, (b) restyle lab CSS, (c) screenshot under `local-five` + OP pair, (d) Partial = **BLOCK**.

---

## 5) Evidence required for visual Done

- [ ] Checklist bullets pasted/linked from written artboard § (not “looks fine”)
- [ ] Screenshot(s) from `./scripts/shell/local-five-serve-and-health.sh` + `#/lab/feed` (path named in story gate notes; **name ≠ create** until implement)
- [ ] OP eye PASS recorded (date / who)
- [ ] Import ban grep: no `BoardIssuePost`, `FeedCivicPost`, `FeedDiscussionBlock`, classic `ReactionControls` / `ReactionControls.css` on lab Done modules
- [ ] Network: no gateway/threads HTTP from lab page

---

## 6) Explicit non-Done claims

| Claim | Status |
|-------|--------|
| «Module export exists» | Not Done |
| «Mounted on lab» without visual checklist | Not Done |
| «Partial visual, document later» | **BLOCK** |
| «Same as VL anti-mixing only» | Not Done (insufficient) |
| «Pixel-diff vs PNG alone» | Optional later (process D); not substitute for F |

---

## 7) Port (LAB-05) — only after LAB-10 gates

Apply **greenfield lab-proven** compose/CSS to `#/next/feed`: remove `BoardIssuePost` shelter; drop classic reaction CSS from next path; keep Closed contracts — no invent. **Do not port `*Deprecated`.** Lab greenfield remains reference SSOT until port AC PASS.
