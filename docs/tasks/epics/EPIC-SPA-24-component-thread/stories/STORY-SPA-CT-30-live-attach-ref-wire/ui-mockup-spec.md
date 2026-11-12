# ui-mockup-spec — STORY-SPA-CT-30 (Path A)

> Path A · code lock · CT-22 preview Present · ARCH §16 · interview skip · no UX gen · P1.3 `2026-10-21T13:02:21Z`

## Target

- Arch [§16](../../../../backlog-stories/component-thread/ARCHITECTURE.md) Live attach upload + tree map
- CT-22 `CommentAttachmentPreview` Present
- Locked client: `ThreadsSocialClient.uploadAttachment` → `POST /threads/issues/{issue_id}/attachments`
- Tree: `publishedUrl` ← `published_url` (HTTP-07) · null honesty

## Delta vs AS-IS

Live post drops Ready files (no blob wire) → call **uploadAttachment** after create/reply · map tree attachments into CT-22. Lab FixtureAdapter held. Prefer upload over synthetic `attachRef`-only.

## Partial

OP eye Absent → visual gate **BLOCK** · no invent OP PASS · no invent CDN/URL.
