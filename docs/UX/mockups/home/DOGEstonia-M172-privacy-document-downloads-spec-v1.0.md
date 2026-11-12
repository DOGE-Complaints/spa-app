# DOGEstonia — M172 Privacy document downloads (rev 3) · specification v1.0

**Date:** 2026-10-23  
**Artboard ID:** `M172-privacy-document-downloads-v1`  
**PNG:** `DOGEstonia-M172-privacy-document-downloads-spec-v1.0.png`  
**Route:** `/privacy`  
**Status:** OP artboard + PDF files Present. Supersedes M172 v2 Privacy **H1-only** / future `.md` body. No product Apply or OP PASS claimed.

## 1. Purpose

`/privacy` is a download hub for three OP-supplied PDF documents. Legal content lives **inside the PDFs only**. Do not invent in-page legal prose, statutes, or markdown policy body.

Parent pack: [DOGEstonia-M172-static-pages-copy-RU-EN-ET-spec-v2.0.md](DOGEstonia-M172-static-pages-copy-RU-EN-ET-spec-v2.0.md) (About / Contact held; Privacy section superseded here).

## 2. Page composition

1. Shared public shell (header + footer) — M169 brand / no footer tagline.
2. Main **H1** = Privacy locale title from M172 `privacy.title` (RU/EN/ET held).
3. Three document cards in order below.
4. No intro paragraph, Draft badge, OP TBD stubs, or extra legal sections in main.

### Desktop (panel A)

Horizontal card per document: doc icon (left) · title + filename · Download PDF control (right). Keyboard focus ring on download control documented on artboard.

### Mobile ~390 CSS px (panel B)

Stacked card: icon + title/filename above · full-width Download PDF below.

## 3. Locked download rows

| Order | Title (EN tip) | Filename | href | Doc icon |
|------:|----------------|----------|------|----------|
| 1 | Privacy Notice | `privacy.pdf` | `/docs/privacy.pdf` | `privacy.svg` |
| 2 | Terms of Use | `terms.pdf` | `/docs/terms.pdf` | `terms.svg` |
| 3 | Participant Information | `participation_information.pdf` | `/docs/participation_information.pdf` | `participation-information.svg` |

- CTA label (EN tip): **Download PDF** · glyph `download.svg`.
- Filenames are product contract — do not rename at runtime.
- PDFs Present at `spa-app/public/docs/` (promoted from raw). Enable links only when files Present (they are).
- **RU/ET** card titles / CTA: not supplied on this artboard — **no invent**; use missing-locale policy or Await editorial.

## 4. Icons and a11y

Shelf: [m172-svg-icons-v1.0/](m172-svg-icons-v1.0/)

| Asset | Size tip |
|-------|----------|
| Doc icons (`privacy` · `terms` · `participation-information`) | 24 CSS px |
| Download glyph | 20 CSS px |
| Download hit target | ≥ 44 CSS px |

`currentColor` / viewBox 0 0 24 24 held with pack. Decorative doc icons: hide from AT when title text is present; download control needs accessible name (title + Download PDF).

## 5. Explicit non-goals

Invent legal body copy · invent RU/ET download labels · invent extra PDFs · crop artboard as brand · change About/Contact · product JSX claim

## 6. Review checklist

- [ ] H1 Privacy + three download cards only in main
- [ ] Exact filenames / `/docs/` hrefs
- [ ] Icons from tip pack · sizes held
- [ ] PDFs Present before claiming downloads Done
- [ ] No invented in-page legal prose
- [ ] No invent OP PASS
