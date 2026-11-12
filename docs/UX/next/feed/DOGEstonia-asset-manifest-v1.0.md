# DOGEstonia — Asset Manifest v1.0

**Status:** implementation handoff baseline · validated 2026-10-08 (Partial — sync icon-system / square logo)  
**Scope:** public board, Issue post/detail, threads, reactions, profile rail, map and light/dark themes  
**Applies to:** React.js implementation and future production-asset generation  
**Date:** 2026-10-06 · metadata refresh 2026-10-08  
**Related:** [INDEX](INDEX.md) · [Design QA](DOGEstonia-design-qa-and-visual-regression-pack-v1.0.md) · [Icon system](dogestonia-icon-system-v1.0/DOGEstonia-icon-manifest-v1.0.md) · [Icon QA](dogestonia-icon-system-v1.0/DOGEstonia-icon-QA-v1.0.md) · [Coverage & backlog](DOGEstonia-current-design-state-artboard-coverage-and-generation-backlog-v1.0.md) · [UX remediation](../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md)

## 1. Purpose

This manifest identifies every visual asset class required by the approved DOGEstonia dashboard, separates canonical identity references from production-ready files, and defines format, naming, ownership, accessibility and delivery requirements.

It is not permission to extract imagery from mockups or to ship external reference screenshots. Layout and behavior remain governed by the corresponding specifications; this document governs asset identity and readiness.

## 2. Authority order

When sources disagree, use this order:

1. approved written UX/product specifications;
2. this Asset Manifest for file identity and readiness;
3. latest approved DOGEstonia mockup for composition and visual tone;
4. earlier DOGEstonia mockups as historical references;
5. third-party screenshots as interaction references only.

The latest revision of a state supersedes earlier visual versions. Generated pixels never override civic semantics, accessibility rules or the data contract.

## 3. Status vocabulary

| Status | Meaning | May ship? |
|---|---|---:|
| `PRODUCTION_READY` | Approved source, correct format, rights and variants verified | Yes |
| `CANONICAL_REFERENCE` | Identity/content reference that production derivatives must match | No, unless separately approved |
| `DERIVATIVE_REQUIRED` | Canonical direction exists but export, transparency, vector or theme work remains | No |
| `DEMO_ONLY` | Generated/example content for mockups and fixtures | No |
| `EXTERNAL_REFERENCE_ONLY` | Third-party reference; never a product asset | No |
| `BLOCKED_BY_DATA_CONTRACT` | Rendering cannot be truthfully completed from current API data | No |
| `FUTURE` | Approved slot or concept without a current source | No |

No asset in this v1.0 audit is implicitly licensed merely because it is present in a mockup or workspace.

## 4. Provenance vocabulary

| Class | Definition | Required record |
|---|---|---|
| First-party brand | DOGEstonia-owned identity artwork | owner, source master, approval date, license/use scope |
| First-party UI | DOGEstonia-created icon, pattern or illustration | author/source, version, license |
| Node-provided | Supplied by a civic node | node, consent/license, expiry if any |
| User-generated | Submitted by a user | uploader, moderation state, rights affirmation |
| Third-party licensed | Library/provider asset | vendor, asset ID, license and attribution |
| External reference | Screenshot or artifact used only for study | source and explicit non-shipping flag |
| Unknown | Origin or rights not verified | release blocker |

## 5. Repository taxonomy and naming

Recommended runtime taxonomy:

```text
assets/
  brand/
  character/
  patterns/
  icons/
    actions/
    navigation/
    status/
    reactions/
    map/
  placeholders/
  node/
```

Rules:

- lowercase kebab-case filenames;
- product prefix for identity assets: `dogestonia-*`;
- semantic names, not screen coordinates or generated timestamps;
- theme suffix only where pixels differ: `-light`, `-dark`, `-mono`;
- density suffix only for raster fallback: `@2x`, `@3x`;
- immutable content assets may include a short content hash;
- do not encode translated UI copy into imagery;
- do not use names copied from generated mockup files as runtime names.

Example names:

```text
brand/dogestonia-logo-horizontal-on-light.svg
brand/dogestonia-logo-horizontal-on-dark.svg
brand/dogestonia-mark-square.svg
character/dogestonia-character-standing-v1.webp
icons/actions/comment.svg
icons/reactions/agree.svg
patterns/estonian-textile-band-subtle.svg
```

## 6. Canonical supplied brand references

The following three files are the identity references supplied by the product owner. Their visible identity must be preserved, but the current raster exports are not complete production masters.

| Asset ID | Supplied filename | Pixels | Format/channels | SHA-256 | Role | Status |
|---|---|---:|---|---|---|---|
| `brand.character.full` | `DogeEstonia Character.png` | 1024×1536 | PNG, sRGB, no alpha | `e3442c52be2d761ce5a1c413474d771c49ce818ca43d9147521c6a80f79d6803` | Full-body character identity | `CANONICAL_REFERENCE`, `DERIVATIVE_REQUIRED` |
| `brand.logo.horizontal` | `DOGEstonia-logo-horizontal.png` | 2172×724 | PNG, sRGB, no alpha | `1393224850427badfd1a7bb8f93f4e7df2346644333ec48202773029cb88da38` | Horizontal DOGEstonia lockup | `CANONICAL_REFERENCE`, `DERIVATIVE_REQUIRED` |
| `brand.mark.square` | `DOGEstonia-logo-square.png` | 1254×1254 | PNG, sRGB, no alpha | `a029213303e7f892b29048d27b2a41fbb11663c480fc766f74efbcb3800bc369` | Square mark/avatar/app identity | `CANONICAL_REFERENCE`, `DERIVATIVE_REQUIRED` |

Known limitations:

- all three sources have opaque, baked backgrounds;
- logo sources are raster-only;
- no verified vector master, transparent export, monochrome set or small-size optical variant is supplied;
- ownership/use rights are understood as product-owner supplied but must be formally recorded before release;
- do not recreate the wordmark using the UI font.

## 7. Required brand production set

| Asset | Required variants | Master | Fallbacks | Minimum acceptance |
|---|---|---|---|---|
| Horizontal logo | on-light, on-dark, mono-light, mono-dark | SVG | transparent PNG 1×/2× | exact wordmark and face; no baked canvas; readable at approved minimum width |
| Square mark | on-light, on-dark, mono | SVG | PNG/WebP 1×/2× | optical crop remains recognizable at 32 px |
| Favicon | 16, 32, 48 px | SVG where supported | PNG/ICO | simplified mark tested at native size |
| App/PWA icons | 192, 512, maskable 512 | SVG master | PNG | safe-zone verified; no clipped ears/face |
| Social preview mark | light and dark compositions | SVG/source layout | PNG 1200×630 | brand-safe, no functional UI copy |

Clearspace and minimum-size rules must be added to a future Brand Usage Guide. Until then:

- never distort, skew, recolor individual wordmark letters or separate the face from its approved roundel;
- keep the logo on a quiet, high-contrast surface;
- use the square mark, not a squeezed horizontal lockup, below compact-header width;
- preserve the white `DOGE` and signal-orange `stonia` relationship where the canonical colored lockup is used.

## 8. Character assets

The Doge character is a cultural/personality layer, not the owner of core navigation or civic status.

Required derivatives:

| Asset ID | Use | Preferred output | Notes |
|---|---|---|---|
| `character.standing.full` | Empty/help/editorial moments | transparent WebP/PNG, high resolution | Match face, expression, cap and proportions |
| `character.standing.half` | Narrow editorial panel | transparent WebP/PNG | Crop from approved master; do not redraw identity casually |
| `character.face.mark` | Brand identity only | SVG/PNG | Use square mark master, not a new face |
| `character.placeholder.decorative` | Optional low-emphasis decoration | optimized WebP | hidden from accessibility tree |

Do not use the character:

- as a status indicator, severity marker or verification badge;
- in every post or comment;
- as a substitute for missing civic content;
- with changed age, clothing, anatomy or expression that makes it a different character.

## 9. Estonian cultural pattern layer

The approved visual language references floral bands, skirt stripes and textile motifs. No standalone source asset is supplied in the audited package.

| Asset ID | Intended use | Status | Constraint |
|---|---|---|---|
| `pattern.textile.band` | Footer/header or section accent | `FUTURE`, `DERIVATIVE_REQUIRED` | cultural origin only; never status/priority/progress |
| `pattern.textile.rail` | low-contrast rail background | `FUTURE`, `DERIVATIVE_REQUIRED` | must pass text contrast by remaining decorative |
| `pattern.floral.subtle` | editorial accent | `FUTURE`, `DERIVATIVE_REQUIRED` | no interaction meaning |

Preferred master is compact SVG with named token-controlled colors. Raster textures require 1×/2× exports and a seamless-repeat test. Decorative patterns receive empty alternative text or CSS background treatment.

## 10. UI icon system

Use one documented, licensed icon family or a coherent first-party SVG set. Icons should feel familiar without copying Meta/Facebook artwork.

Base requirements:

| Property | Requirement |
|---|---|
| Canvas | 24×24 default; 16, 20 and 32 optical sizes only when needed |
| Color | `currentColor`; semantic color comes from tokens |
| Stroke/fill | consistent within a family; avoid mixing unrelated styles |
| Hit area | 44×44 px mobile; compact desktop target only where WCAG spacing remains valid |
| Export | optimized SVG; no embedded raster; no hardcoded translated text |
| Naming | semantic action/state, never `ic-*` guessed filenames |
| Accessibility | visible localized label preferred; icon-only button has localized accessible name |

Required icon classes:

| Class | Examples | Shipping rule |
|---|---|---|
| Navigation | home/board, profile, stories, search, menu | one family, theme-neutral |
| Post actions | react, comment, share, open, more | familiar geometry, no Facebook assets |
| Thread | reply, attach, send, expand/collapse | state variants included |
| System | close, back, retry, warning, success, info | never rely on color alone |
| Map | list, map, pin, location | provider-neutral; pin accessible by Issue title |
| Identity | verified | indicates opaque verified state, never phone/eID method |
| Escalation | collaboration/invite | visually secondary, not an emergency/admin icon |

## 11. Reaction assets — `reactions.v1`

Localized text is authoritative; the symbol is supporting recognition only. The catalog—not this manifest—controls which IDs are enabled.

| Catalog ID | Layer | Required UI asset | Notes |
|---|---|---|---|
| `acknowledge` | Emotional | compact symbol + selected state | label always available |
| `support` | Emotional | compact symbol + selected state | no game-like animation |
| `agree` | Epistemic | compact symbol + selected state | mutually exclusive with `disagree` |
| `disagree` | Epistemic | compact symbol + selected state | mutually exclusive with `agree` |
| `off_topic` | Moderation | compact symbol + selected state | comments only; unavailable on root |

Rules:

- assets for disabled catalog entries are omitted from the active picker or visibly unavailable only when product copy requires it;
- do not render a Facebook Like-only row;
- summary icons work at 16–20 px; picker icons work at 20–24 px;
- selected/unselected/focus/disabled states are token-driven, not separate bitmap exports;
- no voice-weight or cabinet-metric graphics.

## 12. Avatar and people assets

Mockup faces are demo imagery and must not ship as user identities.

| Context | Display size | Source | Fallback |
|---|---:|---|---|
| Nested reply | 32 px | public identity contract | initials or neutral first-party avatar |
| Reaction/person row | 36 px | public identity contract | initials or neutral avatar |
| Root comment/dialog | 40 px | public identity contract | initials or neutral avatar |
| Post/profile identity | 48 px | public identity contract | initials or neutral avatar |
| Profile page/detail | 64–96 px if approved later | identity service | scalable fallback |

Requirements:

- reserve intrinsic size to avoid layout shift;
- use circular crop with `object-fit: cover` for photos;
- initials must be deterministic, localized safely and contrast-compliant;
- default avatar is first-party SVG, not a generated fake person;
- verified badge is a separate semantic layer and must not be baked into avatar pixels;
- authors, names and avatars remain `BLOCKED_BY_DATA_CONTRACT` for current thread reads.

## 13. Issue, node and comment media

### 13.1 Issue media

The current Gateway fields `image_txid` and `image_hash` do not provide a renderable URL, dimensions, media type, alt text, rights or moderation metadata. Therefore production Issue imagery is `BLOCKED_BY_DATA_CONTRACT`.

The eventual media object must provide or resolve:

- stable public URL or signed delivery strategy;
- MIME type;
- intrinsic width and height;
- responsive sources or transform policy;
- authoritative alt/description treatment;
- attribution and rights/provenance;
- moderation/safety status;
- optional focal point/crop policy.

Presentation contract:

- preferred feed ratio is 16:9;
- preserve natural ratio on detail where appropriate;
- reserve space before load;
- single media has no fake carousel controls;
- failed media does not make the civic Issue unreadable;
- functional copy is never baked into the image.

### 13.2 Comment attachments

The Threads API can bind attachment references but cannot currently return/resolve them on read. Published previews, downloads and truthful alternatives are `BLOCKED_BY_DATA_CONTRACT`.

Once supported, each attachment needs ref ID, kind, MIME, size, dimensions when visual, preview/download resolution, filename, alt/description treatment, safety status and rights metadata.

### 13.3 Node imagery

The Uus Veerenni cityscape/cover and Issue story images shown in approved mockups are generated demo content; no standalone licensed source files are supplied. They are `DEMO_ONLY` until replaced by node-provided or first-party assets with provenance.

## 14. Map assets

| Asset | Owner | Format | Requirement |
|---|---|---|---|
| Pin | DOGEstonia UI | SVG/CSS | provider-neutral, high contrast, selected/focus states |
| Cluster, if ever approved | future | SVG/CSS | not part of current SSR-M scope |
| Popup pointer/close | DOGEstonia UI | SVG/CSS | accessible and tokenized |
| Basemap tiles | chosen provider | provider delivery | license and attribution displayed exactly as required |

The mockup must not imply a Mapbox, Google or Leaflet commitment. Provider attribution is not optional decoration and must not be hidden by cards, cookie banners or mobile safe areas.

## 15. Theme and responsive variant rules

### Light/dark

- geometry does not change between themes;
- prefer theme-neutral SVG using `currentColor` for UI icons;
- provide explicit on-light/on-dark brand variants where logo pixels differ;
- photos and Issue media are not globally recolored;
- decorative art may use theme-specific token mappings;
- dark overlays on imagery must not corrupt the underlying content or become the only contrast strategy.

### Responsive

- use the horizontal logo on wide desktop header/rail;
- use the square mark in compact mobile header;
- provide responsive media sources instead of downloading desktop masters to 320 px screens;
- do not produce separate mobile icons unless optical correction is demonstrably necessary;
- safe-area and crop tests are required at 320, 360, 390, 480, 768, 1024 and 1440 px viewports.

## 16. Raster delivery guidance

| Asset type | Preferred | Fallback | Guidance |
|---|---|---|---|
| Photos/complex illustration | AVIF or WebP | JPEG/PNG | quality tested; retain source master outside runtime bundle |
| Transparency/character | WebP | PNG | real alpha; trim excessive transparent canvas |
| UI/brand vector | SVG | PNG only where required | optimize safely; preserve viewBox |
| Small screenshots/docs | PNG | WebP | documentation only, never runtime dependency |

All outputs use sRGB unless a documented delivery path preserves a wider color space. Strip unnecessary metadata from runtime copies, but retain provenance in the asset registry. Never upscale a low-resolution derivative to create a master.

## 17. Loading and performance policy

- emit intrinsic `width` and `height` or CSS aspect ratio;
- lazy-load below-the-fold Issue/comment media;
- do not lazy-load the visible brand mark or first meaningful above-fold media when it harms LCP;
- use `srcset`/`sizes` or an image service for responsive content;
- avoid base64-inlining large raster assets;
- preload only stable critical assets;
- cache immutable hashed files aggressively;
- show neutral skeleton/placeholder treatment without pretending missing media exists.

Suggested first-pass widths for photographic Issue media: 480, 760, 960, 1280 and 1600 px, finalized after the media delivery service is chosen.

## 18. Accessibility and alternative treatment

| Asset/context | Alternative treatment |
|---|---|
| Linked DOGEstonia logo | link accessible name `DOGEstonia home`; internal image may have empty alt |
| Decorative Doge/pattern | empty alt or hidden from accessibility tree |
| Informative Issue image | authoritative localized/appropriate alt from content source |
| Image fully duplicated by adjacent text | empty alt |
| User/comment image | author-provided or moderation-approved policy; filename/hash is not alt |
| Functional icon with visible text | decorative icon; text names action |
| Icon-only button | localized accessible name on the button |
| Reaction symbol with label | symbol hidden; localized text names reaction |
| Map pin | accessible name `{Issue title}, {public location}` |
| Attachment remove control | localized name including filename |

No image may be used to bypass text scaling, localization, contrast or keyboard access.

## 19. Reference mockup inventory

These unique images are composition/state references, not runtime assets. Exact duplicate uploads are collapsed by checksum.

| Reference ID | Source filename | Pixels | SHA-256 prefix | Meaning | Status |
|---|---|---:|---|---|---|
| `REF-DASH-SCHEMATIC` | `ChatGPT Image Oct 6, 2026, 10_56_24 AM.png` | 1678×937 | `b5b82bdbbb59` | three-column dashboard direction | `DEMO_ONLY` |
| `REF-POST-MODAL` | `...10_56_30 AM.png` | 1677×938 | `846a121042de` | opened post modal, comments preview | `DEMO_ONLY` |
| `REF-THREAD-DETAIL` | `...10_56_33 AM.png` | 1133×1388 | `1785e7de5290` | nested thread, comment media and composer | `DEMO_ONLY` |
| `REF-THREAD-FRAGMENT` | `...10_56_55 AM.png` | 1802×872 | `cbf316359dc0` | reply indentation and thread fragment | `DEMO_ONLY` |
| `REF-REACTIONS-PEOPLE-A` | `...10_57_07 AM-1.png` | 1367×1151 | `fdc7c416c1cb` | reaction people distribution + Connect | `DEMO_ONLY` |
| `REF-REACTIONS-PEOPLE-B` | `...10_57_08 AM-2.png` | 1368×1150 | `698aa43fbfcd` | reaction-type people variant | `DEMO_ONLY` |
| `REF-REACTION-AGGREGATE` | `...10_57_34 AM.png` | 1009×1558 | `5885b96454be` | compact aggregate/distribution direction | `DEMO_ONLY` |
| `REF-SHARE-MENU` | `...11_07_18 AM.png` | 1269×1239 | `228312cb61bd` | share-menu placement and hierarchy | `DEMO_ONLY` |
| `REF-DASH-LIGHT-LATEST` | `image-edit-target-2c16fa70f99af0ed.png` | 1672×941 | `610ae0e7c47e` | latest full light dashboard continuity | `DEMO_ONLY` |
| `REF-REACTIONS-MODAL-LATEST` | `image-edit-target-6e5a0a54b6bc16e4.png` | 1672×941 | `482d44a3a7ed` | latest reaction-dialog continuity | `DEMO_ONLY` |

Duplicate map:

- `10_56_24 AM(1).png` = `10_56_24 AM.png`;
- `10_56_30 AM(1).png` = `10_56_30 AM.png`;
- `10_56_33 AM(1).png` = `10_56_33 AM.png`;
- `10_57_07 AM-1(1).png` = `10_57_07 AM-1.png`;
- `10_57_34 AM(1).png` = `10_57_34 AM.png`.

Only one logical reference entry should be kept for each checksum. Do not create asset-library duplicates from renamed copies.

## 20. External interaction references — never ship

| Filename | Pixels | Purpose | Status |
|---|---:|---|---|
| `Facebook post Mobile.jpeg` | 591×1280 | familiar mobile post rhythm | `EXTERNAL_REFERENCE_ONLY` |
| `Facebook post comments Mobile.jpeg` | 591×1280 | mobile comment rhythm | `EXTERNAL_REFERENCE_ONLY` |
| `Facebook post.png` | 1418×1764 | desktop post composition | `EXTERNAL_REFERENCE_ONLY` |
| `Facebook post comments.png` | 1480×1830 | desktop comment composition | `EXTERNAL_REFERENCE_ONLY` |

These screenshots and their trademarks, avatars, photos, icons, reaction artwork and copy must not be copied, traced, bundled, redistributed or presented as DOGEstonia assets. Familiar interaction patterns may inform layout; DOGEstonia palette, components, labels and original iconography must be used.

## 21. Handoff artboards

These are documentation artifacts, not runtime dependencies.

| Artifact | Format | Pixels/viewBox | SHA-256 | Use |
|---|---|---|---|---|
| `DOGEstonia-dashboard-layout-artboard-v1.0.png` | PNG | 3200×2200 | `0e9bbdfd9d90f33584aefbf3d99a59f26cc718f3328d178d4a92b05be96dade2` | visual layout handoff |
| `DOGEstonia-dashboard-layout-artboard-v1.0.svg` | SVG | vector | `60cce8212acbf752f6795a0a4324a1f04213a6f22c6eb81e89c38eca15989c04` | inspectable annotated source |
| `DOGEstonia-mobile-responsive-design-artboard-v1.0.png` | PNG | 3200×2200 | `8894ce6b6ede279ef6d61ee4601222e99aa6afeb56a4151ead5c2a7d137716b3` | mobile visual handoff |
| `DOGEstonia-mobile-responsive-design-artboard-v1.0.svg` | SVG | vector | `d78646fde69c78546216719dffee50acd09c9bab6a92dec3aff216d6076d72c1` | inspectable responsive source |

Do not import these artboards into the React bundle or crop icons/media from them.

## 22. React consumption rules

- import first-party UI SVGs as controlled components or safe static files according to the build system;
- keep content media URLs in data, not source-code imports;
- do not expose private storage locators in client markup;
- sanitize externally supplied SVG or disallow it as user content;
- use stable logical asset IDs in fixtures, resolved by a small asset registry;
- separate `decorative`, `informative` and `functional` asset types in component props;
- require width/height for informative raster content;
- theme variants are selected by semantic asset mapping, not filename concatenation inside components;
- missing optional media renders the no-media state; it does not substitute unrelated stock art.

Suggested registry fields:

| Field | Purpose |
|---|---|
| `assetId` | stable logical identifier |
| `kind` | brand, icon, pattern, photo, illustration, avatar, attachment |
| `source` | bundled, node, user, provider |
| `theme` | neutral, light, dark |
| `src` / `srcSet` | delivery reference |
| `width`, `height` | intrinsic geometry |
| `altMode` | decorative, provided, adjacent-description, control-labelled |
| `rightsStatus` | approved, pending, external-reference |
| `version` / `hash` | cache and audit identity |

This is a design contract, not a prescribed API schema.

## 23. Rights and release register

Every shippable asset requires:

- owner/author;
- source/master location;
- license or internal-use basis;
- attribution requirement;
- modification permission;
- geographic/channel restrictions if any;
- approval status and approver;
- version/checksum;
- retirement/replacement link.

User-generated and node-provided media additionally requires consent, moderation and removal handling. Generated imagery requires documented model/source and commercial-use review under the organization’s policy.

An `Unknown` rights value is a release blocker, not a default permission.

## 24. Production readiness summary

| Area | Current state | Release implication |
|---|---|---|
| Horizontal logo | canonical raster with baked dark background | vector/transparent/theme derivatives required |
| Square mark | canonical raster with baked background | vector/transparent/favicon/app derivatives required |
| Character | canonical raster with white background | transparent optimized derivatives required |
| Cultural pattern | visually referenced, no source master | create/approve first-party pattern set |
| UI icons | requirements defined, set not supplied | select/license or create coherent SVG family |
| Reaction icons | semantic IDs known, artwork not supplied | design approved `reactions.v1` symbol set |
| Avatars | demo faces only | neutral fallback + identity contract required |
| Issue images | demo/reference only; URL/alt contract absent | blocked for production data |
| Comment media | ref write exists; read/resolve absent | blocked for production display |
| Node cover/story art | generated in mockups only | replace with rights-cleared node/first-party files |
| Map pins | behavior specified, asset not supplied | create provider-neutral SVG states |
| Reference screenshots | available for design study | explicitly excluded from runtime bundle |

## 25. Open decisions — do not resolve implicitly

| ID | Question | Why it matters | Owner |
|---|---|---|---|
| `AM-Q01` | Is there an original vector source for both DOGEstonia logos? | Determines whether faithful production derivatives can be created without tracing | Brand/product owner |
| `AM-Q02` | Are the supplied logo and character artworks fully owned/licensed for product, app-icon and promotional use? | Release and derivative rights | Legal/brand |
| `AM-Q03` | Which icon family or first-party icon source is approved? | Consistency, licensing and engineering imports | Design + engineering |
| `AM-Q04` | What is the approved visual mapping for every enabled `reactions.v1` ID? | Prevents invented icons and emoji-only semantics | Product + design |
| `AM-Q05` | Who authors and approves the Estonian textile/floral pattern masters? | Cultural accuracy and ownership | Brand/community |
| `AM-Q06` | What resolves `image_txid`/`image_hash` to safe public media plus alt/rights metadata? | Issue media cannot render truthfully today | Gateway + media/security |
| `AM-Q07` | How are comment attachment refs returned and preview/download URLs resolved? | Comment images/files remain blocked | Threads + media/security |
| `AM-Q08` | Which public name/avatar fields may be exposed for commenters and reactors? | Avatar/person rows cannot use real data today | Identity/privacy |
| `AM-Q09` | Will Uus Veerenni provide approved node cover and story imagery, or should first-party illustrations be commissioned? | Replaces demo visuals | Node + product |
| `AM-Q10` | Which basemap provider and attribution contract will be used? | Legal attribution and map styling | Engineering/product |
| `AM-Q11` | Which share destinations, if any, are approved, and may their official brand assets be used? | Third-party trademark and share-menu scope | Product/legal |
| `AM-Q12` | Where will the authoritative asset registry and masters live? | Versioning, access and auditability | Design ops + engineering |

## 26. Asset QA checklist

### Identity

- [ ] Logo matches canonical face, wordmark and color relationship.
- [ ] No logo is recreated with Inter or another UI font.
- [ ] On-light/on-dark variants pass visual and contrast review.
- [ ] Mark remains recognizable at 16, 24 and 32 px.
- [ ] Character identity is consistent across crops.

### Technical

- [ ] SVG has a correct `viewBox`, no embedded bitmap unless approved, and no unsafe scripts.
- [ ] Raster has correct intrinsic dimensions, sRGB profile and intended alpha.
- [ ] Responsive sources do not upscale originals.
- [ ] File size is reviewed against its actual viewport use.
- [ ] Runtime filenames are semantic and cache-safe.

### Accessibility/localization

- [ ] Informative media has an authoritative alternative or remains blocked.
- [ ] Decorative assets are hidden from assistive technology.
- [ ] Icon-only controls have localized accessible names.
- [ ] No functional copy is baked into pixels.
- [ ] Reaction text remains primary in every locale.

### Rights and safety

- [ ] Owner/license/attribution is recorded.
- [ ] Demo or external-reference imagery is absent from the production bundle.
- [ ] User/node media has consent and removal paths.
- [ ] Media safety floor cannot be bypassed.
- [ ] Map/provider attribution is visible where required.

### Integration

- [ ] Missing optional media preserves civic content and layout.
- [ ] Light/dark variants switch without geometry changes.
- [ ] 320–1440 px crops and safe areas are verified.
- [ ] Artboards are not imported as application assets.
- [ ] Checksums/version records match the approved source.

## 27. Definition of done

The Asset Manifest package is implementation-ready when:

1. every visible asset slot has a logical ID, role and status;
2. canonical references are distinguished from production files;
3. external/demo material is explicitly excluded from shipping;
4. every production asset has a rights record and checksum/version;
5. logo, mark, character, icon, pattern and map sets have approved masters and required theme/responsive exports;
6. Issue and comment media remain gated until their data and accessibility contracts are approved;
7. React components consume logical, semantic assets rather than cropped mockup pixels;
8. QA passes identity, technical, accessibility, rights, safety and responsive checks.

## 28. Handoff conclusion

The audited package is sufficient to preserve DOGEstonia’s visual identity during implementation, but it is not yet a complete production asset library. The three supplied brand images are canonical references; the mockups and Facebook screenshots are non-shipping references; and dynamic civic/thread media remains contract-blocked. Production work should now create rights-cleared vector/transparent brand derivatives, a coherent first-party or licensed icon/reaction set, cultural pattern masters, neutral avatar fallbacks and provider-neutral map assets—without extracting pixels from the artboards.
