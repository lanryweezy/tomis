## 2024-07-25 - Added ARIA labels to cart quantity buttons\n**Learning:** Icon-only and symbol-only buttons in the cart page (like + and - for quantity) lack context for screen readers.\n**Action:** Always add clear `aria-label`s to these interactive elements to ensure accessibility.
## 2026-07-26 - Adding Accessible Labels to Forms
**Learning:** Adding `htmlFor` and `id` attributes effectively ties form fields to visual labels, improving usability for screen readers and increasing hit area. When visual labels are intentionally omitted (e.g. newsletter signups), `aria-label` should be used.
**Action:** Always ensure inputs have associated labels (`<label htmlFor="...">` + `<input id="...">`) or an `aria-label` for screen readers.

## 2026-08-05 - Adding Tooltips and ARIA Labels to Disabled Buttons
**Learning:** When buttons are disabled (like out-of-stock sizes), a strikethrough visual is not enough. Mouse users need native tooltips to explain *why* it's disabled, and screen readers need this context conveyed through `aria-label`.
**Action:** Always add `title` and update `aria-label` for disabled UI controls to explicitly state the reason (e.g., 'Out of stock').
## 2026-07-30 - Accessible Interactive Icons in Header

**Learning:** We observed that interactive icon-only buttons (like mobile menu, search toggle, and overlay close buttons) in the header lack visual focus indicators for keyboard users, making keyboard navigation difficult and ambiguous. In addition, dialog-like overlays were not properly announced by screen readers due to missing ARIA associations on trigger buttons (`aria-expanded`, `aria-controls`) and the overlay containers (`role="dialog"`, `aria-modal="true"`).

**Action:** Added `focus-visible:outline-2 focus-visible:outline-[var(--color-brand-blue)] rounded-sm` to all icon-only buttons in the header to ensure keyboard users have a clear visual focus state. We also added `aria-expanded` and `aria-controls` to the toggle buttons, linked to overlay containers with proper `role="dialog"` and `aria-modal="true"` attributes to ensure an accessible dialog experience.

## 2026-08-06 - Adding Accessible State to Custom Selector Components
**Learning:** Custom selector components (like color, size, and image thumbnail pickers) that do not use native radio button inputs require explicit `aria-pressed` (or `aria-selected`/`aria-current`) attributes. Without these attributes, screen readers cannot distinguish the currently selected option from the unselected ones, leaving users without crucial feedback on their choice.
**Action:** When building custom selectable buttons (rather than native `<input type="radio">`), always implement `aria-pressed` mapped to the active state variable.
## 2024-08-07 - Wrapping Email Inputs in Forms for "Enter" Key Submission
**Learning:** Newsletter subscription inputs wrapped only in standard div/flex containers rather than semantic `form` tags prevent the standard UX of submitting via the "Enter" key and do not trigger browser's native email validation. Using `<form>` wrappers around inputs improves accessibility, functionality, and aligns with standard user expectations.
**Action:** When adding newsletter or inline email collection inputs, always wrap them in a `<form>` element with an `onSubmit` handler, and include native HTML5 validation like `required`.
