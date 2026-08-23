## 2024-05-14 - Astryx Input Component ARIA Patterns
**Learning:** Astryx Design System custom components like `SearchOverlay` may use raw `<input>` elements internally that do not inherently pass down or require accessible naming by default.
**Action:** When implementing or auditing custom UI overlays with nested inputs, explicitly verify that an `aria-label` or `aria-labelledby` attribute is present on the underlying raw input element, especially for icon-only or placeholder-only fields where a visible `<label>` is intentionally omitted.
