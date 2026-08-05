## 2024-07-25 - Added ARIA labels to cart quantity buttons\n**Learning:** Icon-only and symbol-only buttons in the cart page (like + and - for quantity) lack context for screen readers.\n**Action:** Always add clear `aria-label`s to these interactive elements to ensure accessibility.
## 2026-07-26 - Adding Accessible Labels to Forms
**Learning:** Adding `htmlFor` and `id` attributes effectively ties form fields to visual labels, improving usability for screen readers and increasing hit area. When visual labels are intentionally omitted (e.g. newsletter signups), `aria-label` should be used.
**Action:** Always ensure inputs have associated labels (`<label htmlFor="...">` + `<input id="...">`) or an `aria-label` for screen readers.

## 2026-08-05 - Adding Tooltips and ARIA Labels to Disabled Buttons
**Learning:** When buttons are disabled (like out-of-stock sizes), a strikethrough visual is not enough. Mouse users need native tooltips to explain *why* it's disabled, and screen readers need this context conveyed through `aria-label`.
**Action:** Always add `title` and update `aria-label` for disabled UI controls to explicitly state the reason (e.g., 'Out of stock').
