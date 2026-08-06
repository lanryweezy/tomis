## 2024-07-25 - Added ARIA labels to cart quantity buttons\n**Learning:** Icon-only and symbol-only buttons in the cart page (like + and - for quantity) lack context for screen readers.\n**Action:** Always add clear `aria-label`s to these interactive elements to ensure accessibility.
## 2026-07-26 - Adding Accessible Labels to Forms
**Learning:** Adding `htmlFor` and `id` attributes effectively ties form fields to visual labels, improving usability for screen readers and increasing hit area. When visual labels are intentionally omitted (e.g. newsletter signups), `aria-label` should be used.
**Action:** Always ensure inputs have associated labels (`<label htmlFor="...">` + `<input id="...">`) or an `aria-label` for screen readers.

## 2026-08-06 - Adding Accessible State to Custom Selector Components
**Learning:** Custom selector components (like color, size, and image thumbnail pickers) that do not use native radio button inputs require explicit `aria-pressed` (or `aria-selected`/`aria-current`) attributes. Without these attributes, screen readers cannot distinguish the currently selected option from the unselected ones, leaving users without crucial feedback on their choice.
**Action:** When building custom selectable buttons (rather than native `<input type="radio">`), always implement `aria-pressed` mapped to the active state variable.
