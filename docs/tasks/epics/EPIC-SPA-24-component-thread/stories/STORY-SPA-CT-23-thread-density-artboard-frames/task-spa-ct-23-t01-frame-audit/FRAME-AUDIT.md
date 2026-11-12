# CT-23 T01 — frame audit vs artboard allow-list

> UTC scaffold evidence `2026-10-20T15:12:35Z` · Path A M152/M153/M153b **strict** · no invent denser/OP PASS

## Allow-list (keep)

| Surface | Source | Tokens |
|---------|--------|--------|
| Post card outer | M152 | 1px `#E7E4DC` · radius 12 · surface `#FFFDF8` |
| Strip → discussion hairline | M152 | `border-top` only under strip |
| Comment bubble | M153b §3 | fill `#F7F6F2` · border 1px `#E7E4DC` · r12 · pad 12×16 |
| Spine / L-elbow | M153b §4 | 1px `#667085` · elbow r6 |
| Action pill group | M153b §5 | fill `#FFFDF8` · border `#E7E4DC` |
| Composer region | M153 | top hairline separator · field border on textarea |
| AttachmentRef / attach preview | M153a/b · CT-19/22 | chip/cue borders (OOS invent) |

## Forbidden (remove / neutralize)

| Surface | AS-IS risk | Disposition |
|---------|------------|-------------|
| Nested discussion card (full box) | Extra plate around thread | **Absent** — thread-host no border/bg/shadow |
| IssueThreadBlock full frame | L/R/B borders · box-shadow | **Absent** — top hairline only |
| Composer as second elevated plate | Opaque plate wash reading as nested card | **Neutralize** — transparent bg · keep top hairline |
| State `min-height` stretch | Large empty gap in populated | **Remove** min-height stretch |
| Rem-inflated gaps | 0.65–0.75rem voids | **Align** to 12px / 8px artboard rhythm |

## Lab harness (not product discussion chrome)

CT-20/21/22 stand list borders — Path A lab labels only · not Issue discussion anatomy.
