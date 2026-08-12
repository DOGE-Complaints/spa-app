# Acceptance verification — SPA-BUG-02-T01

- **Task:** Measure surfaces vs logo asset
- **Result:** PASS
- **Date:** 2026-08-07T11:49:42Z
- **Package:** `pkg-000054`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Measure note (`has_alpha`, corners, strip hex) | PASS | [`evidence-…114942Z.md`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-measure-2026-08-07T114942Z.md) |
| `decision_lean` + product rule | PASS | `transparent_asset` · `pin_layer: asset` |
| No product replace in T01 | PASS | measure-only |

## Commands

```bash
cd spa-app && python3 -c "from PIL import Image; im=Image.open('public/assets/DOGEstonia-logo-big.png'); print(im.mode, im.size)"
# at T01 time: RGB 982x954 (pre-fix); see evidence YAML
```
