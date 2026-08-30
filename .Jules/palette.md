## 2024-05-14 - Astryx Input Component ARIA Patterns
**Learning:** Astryx Design System custom components like `SearchOverlay` may use raw `<input>` elements internally that do not inherently pass down or require accessible naming by default.
**Action:** When implementing or auditing custom UI overlays with nested inputs, explicitly verify that an `aria-label` or `aria-labelledby` attribute is present on the underlying raw input element, especially for icon-only or placeholder-only fields where a visible `<label>` is intentionally omitted.

## 2026-08-23 - Secondary Buttons in State-Driven Forms
**Learning:** Secondary `<button>` elements within or near state-driven forms can inadvertently capture the default 'Enter' key press if they lack an explicit `type` attribute, breaking the intended form submission pattern.
**Action:** Always explicitly specify `type="button"` for secondary buttons (like "Forgot password?") inside forms, and reserve `type="submit"` (either explicit or by default) solely for the primary action to preserve default keyboard accessibility.
## 2024-05-24 - Form Wrappers for State-driven Inputs
**Learning:** Raw input elements in overlays (e.g. search bars, newsletters) lack implicit keyboard form submission ('Enter' key) unless wrapped in a `<form>` element.
**Action:** Always wrap state-driven inputs in a `<form onSubmit={(e) => e.preventDefault()}>` to enable default keyboard submission accessibility without triggering page reloads. Ensure primary buttons are `type="submit"` and secondary actions are `type="button"`.
