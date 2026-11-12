# STORY-SPA-NF — Icon assets catalog (next-feed)

> **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Admin:** [ADMIN-NF-02-icon-assets-catalog.md](ADMIN-NF-02-icon-assets-catalog.md)  
> **Method:** **Index + promote executed** — masters from icon-system; **do not** generate Lucide/`ic-*` or new SVG. Shared nav → reuse next-shell.

## Meta / SSOT

| Role | Path |
|------|------|
| Masters (immutable docs) | [`docs/UX/next/feed/dogestonia-icon-system-v1.0/`](../../../UX/next/feed/dogestonia-icon-system-v1.0/) |
| Manifest | [DOGEstonia-icon-manifest-v1.0.md](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-manifest-v1.0.md) |
| Token map | [DOGEstonia-icon-token-map-v1.0.md](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md) |
| Mockup register | [NF-feed-mockup-intake-register.md](NF-feed-mockup-intake-register.md) |
| Sibling shell catalog | [STORY-SPA-NS-icon-assets.md](../next-shell/STORY-SPA-NS-icon-assets.md) |

## Runtime grammar

| Role | Path |
|------|------|
| Master | `spa-app/docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/<group>/<name>.svg` |
| Runtime | `spa-app/public/icons/next-feed/<group>/<name>.svg` |
| URL in app | `/icons/next-feed/<group>/<name>.svg` |
| Shared shell | `/icons/next-shell/<group>/<name>.svg` (reuse — no duplicate under next-feed) |

Do **not** dump feed glyphs under `threads-feed/`, `public-home/`, etc.

**Disk status (recount 2026-10-21):** `public/icons/next-feed/` = **43 SVG** (14 actions · 1 map · 13 reactions · 5 share · 5 status · **5 types**). M161 promote = **+5 types**.

Ellipsis `…` below = `docs/UX/next/feed/dogestonia-icon-system-v1.0`.

---

## Feed subset (promoted)

| Logical ID | Master | Runtime URL | Stories | Manifest | Master | Runtime |
|------------|--------|-------------|---------|----------|--------|---------|
| `filter` | `…/icons/actions/filter.svg` | `/icons/next-feed/actions/filter.svg` | NF-01, NF-03 | proposed | Present | Present |
| `list-view` | `…/icons/actions/list-view.svg` | `/icons/next-feed/actions/list-view.svg` | NF-03 | proposed | Present | Present |
| `map-view` | `…/icons/actions/map-view.svg` | `/icons/next-feed/actions/map-view.svg` | NF-03 | proposed | Present | Present |
| `map-pin` | `…/icons/map/map-pin.svg` | `/icons/next-feed/map/map-pin.svg` | NF-03 | approved | Present | Present |
| `map-pin-selected` | reuse `map-pin.svg` | `/icons/next-feed/map/map-pin.svg` | NF-03 | reuse | Present | Present |
| `react` | `…/icons/actions/react.svg` | `/icons/next-feed/actions/react.svg` | NF-02, NF-05, NF-07 · CR Gap v2 | approved · **glyph Gap**: must be thumbs-up (smiley on disk) | Present | Present |
| `comment` | `…/icons/actions/comment.svg` | `/icons/next-feed/actions/comment.svg` | NF-02, NF-04, NF-07 · CR-11 | approved | Present | Present |
| `share` | `…/icons/actions/share.svg` | `/icons/next-feed/actions/share.svg` | NF-02, NF-05, NF-07 · CR-11 | approved | Present | Present |
| `reactions` | `…/icons/actions/reactions.svg` | `/icons/next-feed/actions/reactions.svg` | CR-11…12 · CR Gap v2 | **Gap** dual-circle strip zone | Absent | Absent |
| `open-issue` | `…/icons/actions/open-issue.svg` | `/icons/next-feed/actions/open-issue.svg` | NF-02, NF-06 | proposed | Present | Present |
| `more` | `…/icons/actions/more.svg` | `/icons/next-feed/actions/more.svg` | NF-02 · **NF-16 deferred** on civic header (keep asset · unused DOM · P3 held) | proposed · deferred UI | Present | Present |
| `reply` | `…/icons/actions/reply.svg` | `/icons/next-feed/actions/reply.svg` | NF-04 | proposed | Present | Present |
| `send` | `…/icons/actions/send.svg` | `/icons/next-feed/actions/send.svg` | NF-04 | proposed | Present | Present |
| `retry` | `…/icons/actions/retry.svg` | `/icons/next-feed/actions/retry.svg` | NF-01, NF-04 | proposed | Present | Present |
| `attach` | `…/icons/actions/attach.svg` | `/icons/next-feed/actions/attach.svg` | NF-04 (UI gated) | proposed | Present | Present |
| `collaboration-invite` | `…/icons/actions/collaboration-invite.svg` | `/icons/next-feed/actions/collaboration-invite.svg` | NF-05 | conditional | Present | Present |
| `acknowledge` | `…/icons/reactions/acknowledge.svg` | `/icons/next-feed/reactions/acknowledge.svg` | NF-05, NF-09 · CR-01…04 | proposed metaphor | Present | Present |
| `support` | `…/icons/reactions/support.svg` | `/icons/next-feed/reactions/support.svg` | NF-05, NF-09 · CR-01…04 | approved | Present | Present |
| `empathy` | `…/icons/reactions/empathy.svg` | `/icons/next-feed/reactions/empathy.svg` | CR-01…04 | Gap-8 promote | Present | Present |
| `concern` | `…/icons/reactions/concern.svg` | `/icons/next-feed/reactions/concern.svg` | CR-01…04 | Gap-8 promote | Present | Present |
| `sad` | `…/icons/reactions/sad.svg` | `/icons/next-feed/reactions/sad.svg` | CR-01…04 | Gap-8 promote | Present | Present |
| `outraged-situation` | `…/icons/reactions/outraged-situation.svg` | `/icons/next-feed/reactions/outraged-situation.svg` | CR-01…04 | Gap-8 promote · catalog `outraged_situation` | Present | Present |
| `agree` | `…/icons/reactions/agree.svg` | `/icons/next-feed/reactions/agree.svg` | NF-05, NF-09 · CR-01…04 | proposed metaphor | Present | Present |
| `disagree` | `…/icons/reactions/disagree.svg` | `/icons/next-feed/reactions/disagree.svg` | NF-05, NF-09 · CR-01…04 | proposed metaphor | Present | Present |
| `useful-fact` | `…/icons/reactions/useful-fact.svg` | `/icons/next-feed/reactions/useful-fact.svg` | CR-01…04 | Gap-8 promote · catalog `useful_fact` | Present | Present |
| `insightful` | `…/icons/reactions/insightful.svg` | `/icons/next-feed/reactions/insightful.svg` | CR-01…04 | Gap-8 promote | Present | Present |
| `needs-evidence` | `…/icons/reactions/needs-evidence.svg` | `/icons/next-feed/reactions/needs-evidence.svg` | CR-01…04 | Gap-8 promote · catalog `needs_evidence` | Present | Present |
| `off-topic` | `…/icons/reactions/off-topic.svg` | `/icons/next-feed/reactions/off-topic.svg` | NF-05 (comment) · NF-09 · CR | proposed metaphor | Present | Present |
| `aggressive` | `…/icons/reactions/aggressive.svg` | `/icons/next-feed/reactions/aggressive.svg` | CR-01…04 (comment) | Gap-8 promote · moderation | Present | Present |
| `info` | `…/icons/status/info.svg` | `/icons/next-feed/status/info.svg` | NF-01, NF-04 | proposed | Present | Present |
| `success` | `…/icons/status/success.svg` | `/icons/next-feed/status/success.svg` | NF-01 as needed | proposed | Present | Present |
| `warning` | `…/icons/status/warning.svg` | `/icons/next-feed/status/warning.svg` | NF-01 as needed | proposed | Present | Present |
| `error` | `…/icons/status/error.svg` | `/icons/next-feed/status/error.svg` | NF-01, NF-04 | proposed | Present | Present |
| `unavailable` | `…/icons/status/unavailable.svg` | `/icons/next-feed/status/unavailable.svg` | NF-01, NF-04 | proposed | Present | Present |

### Issue-type identity (M161 · NF-13) — exact keys

| Exact wire key | Master | Runtime URL | Stories | Master | Runtime |
|----------------|--------|-------------|---------|--------|---------|
| `INCIDENT` | `…/icons/types/ic-issue-type-INCIDENT.svg` | `/icons/next-feed/types/ic-issue-type-INCIDENT.svg` | NF-13 | Present | Present |
| `complaint` | `…/icons/types/ic-issue-type-complaint.svg` | `/icons/next-feed/types/ic-issue-type-complaint.svg` | NF-13 | Present | Present |
| `system_bug` | `…/icons/types/ic-issue-type-system_bug.svg` | `/icons/next-feed/types/ic-issue-type-system_bug.svg` | NF-13 | Present | Present |
| `observation` | `…/icons/types/ic-issue-type-observation.svg` | `/icons/next-feed/types/ic-issue-type-observation.svg` | NF-13 | Present | Present |
| `absurdity` | `…/icons/types/ic-issue-type-absurdity.svg` | `/icons/next-feed/types/ic-issue-type-absurdity.svg` | NF-13 | Present | Present |

No `unknown` master. Unmapped types → omit (IssueTypeIcon grey). Case-sensitive: do not alias `incident` → `INCIDENT`.

**P3 NF-13 verify (`2026-10-21T11:31:16Z`):** disk `public/icons/next-feed/types/ic-issue-type-*.svg` count **5** · table rows Match · no invent alias.

---

## §Reuse next-shell (do not copy into next-feed)

| Logical ID | Runtime URL | Notes |
|------------|-------------|-------|
| `close` | `/icons/next-shell/actions/close.svg` | mounts / chips |
| `chevron-down` | `/icons/next-shell/actions/chevron-down.svg` | disclosures |
| `chevron-up` / `expand-thread` / `collapse-thread` | `/icons/next-shell/actions/chevron-down.svg` | manifest reuse (transform in CSS) |
| `remove-attachment` | `/icons/next-shell/actions/close.svg` | manifest reuse |
| `location` | `/icons/next-shell/actions/location.svg` | Issue identity |
| `verified` | `/icons/next-shell/status/verified.svg` | write-gate / rail chrome |
| nav (`board`, `profile`, `my-stories`, `search`, `menu`, themes, `notifications`, `account`, `back`) | `/icons/next-shell/navigation/…` | shell host only |

---

## §Promote executed (ADMIN-NF-02)

```bash
# From spa-app/ (executed 2026-10-10)
mkdir -p public/icons/next-feed/{actions,map,reactions,status}
cp docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/actions/{filter,list-view,map-view,react,comment,share,open-issue,more,reply,send,retry,attach,collaboration-invite}.svg \
  public/icons/next-feed/actions/
cp docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/map/map-pin.svg \
  public/icons/next-feed/map/
cp docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/reactions/{acknowledge,support,agree,disagree,off-topic}.svg \
  public/icons/next-feed/reactions/
cp docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/status/{info,success,warning,error,unavailable}.svg \
  public/icons/next-feed/status/

# Gap-8 reactions promote (2026-10-14) — masters landed then:
cp docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/reactions/{empathy,concern,sad,outraged-situation,useful-fact,insightful,needs-evidence,aggressive}.svg \
  public/icons/next-feed/reactions/
```

- **43** SVG under `public/icons/next-feed/` (incl. **5 types** from M161).  
- Masters in icon-system; Gap-8 evidence: [DOGEstonia-Gap8-reactions-v1.0](../component-reactions/DOGEstonia-Gap8-reactions-v1.0/). M161: [catalog](../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md).  
- Smoke: catalog URLs resolve under Vite `public/`.

```bash
# M161 type icons promote (2026-10-21)
mkdir -p public/icons/next-feed/types
cp docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/types/ic-issue-type-*.svg \
  public/icons/next-feed/types/
```

---

## §Token map / a11y

SVG masters use `currentColor`. Semantic tokens in consuming components per [icon token map](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md). Theme via existing `data-theme`.

- Visible localized label beside icon when required; icon may be decorative (`aria-hidden`).  
- Icon-only controls: localized accessible name on the control.

---

## §Visual parity gaps (NF-07…09 · promote-only / document — no invent)

| Logical slot | Need | Master status | Decision |
|--------------|------|---------------|----------|
| Civic identity / paw (M150 meta) | Distinct civic glyph beside issue meta | **Superseded for type slot:** M161 issue-type icons (NF-13). Paw/brand mark still **not** required | Type icons Present · paw gap closed as N/A for NF-13 identity slot |
| Reactions orb (4th civic zone) | Aggregate “open reactions” control chrome | No dedicated orb master; strip may compose existing `react` / reactions glyphs | Prefer existing `/icons/next-feed/actions/react.svg` + reaction marks; **gap** if artboard requires unique orb — document only · owner NF-07 / NF-09 |

---

## §OOS / no logo

| Item | Reason |
|------|--------|
| `connect` | M155 people — master exists, **not** promoted |
| logo | next-shell / `/assets/DOGEstonia-logo-*` |
| `language`, `sort`, `show-more`, `calendar`, `tag`, `image-file`, `generic-file`, `verify-required` | excluded in icon manifest |
| New SVG masters / Lucide PNG | forbidden this ADMIN · visual-parity wave too |

---

## Handoff

- Stories NF-01…06 and NF-07…12 cite **Runtime URL** (or next-shell reuse) from this catalog.  
- Visual parity: promote-only or document gap — see §Visual parity gaps.  
- Next admin: [ADMIN-NF-03](ADMIN-NF-03-api-requirements.md).  
- Master index: [ICON-GENERATION-INDEX.md](../icons/ICON-GENERATION-INDEX.md) row **#9 · Promote/index Done**.
