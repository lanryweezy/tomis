## 2024-09-10 - Conditional Rendering and Keyboard Dismissibility for Floating UI Elements
**Learning:** Global fixed UI widgets (like floating chat buttons) can obscure critical user inputs on mobile viewports. Additionally, floating panels can trap keyboard and screen reader focus if not easily dismissible.
**Action:** Implement conditional rendering (e.g., using `usePathname`) to hide floating UI elements on critical conversion paths (like `/checkout`). Also, always add a document-level 'Escape' key listener to allow easy dismissal for keyboard users.
## 2024-09-13 - Enhance Multi-step Accessibility
**Learning:** Visual-only sequential step indicators (like the checkout progress bar using divs) omit semantic context for screen readers traversing steps.
**Action:** Replaced generic layout `<div>` containers with semantic ordered lists (`<ol>`, `<li>`) and added `aria-current="step"` and `aria-label="Checkout Progress"` to semantically convey sequential flows and the active step.
## 2024-09-18 - Ensure Dynamic Notifications Are Accessible
**Learning:** Custom toast notification components (like dynamically rendered `div` elements) are not automatically announced by screen readers when appended to the DOM, leaving visually impaired users unaware of important system feedback (e.g., success or error messages).
**Action:** Always add live region attributes (such as `role="region"` and `aria-live="polite"`) and a descriptive label (like `aria-label="Notifications"`) to the parent container of dynamic toast elements to ensure proper assistive technology support.
## 2024-09-21 - Keyboard Accessibility and Form Submissions
**Learning:** In state-driven UIs, if custom primary action components explicitly pass `type="submit"`, any secondary or custom interactive buttons within the form must explicitly add `type="button"` to prevent premature submissions.
**Action:** Set the default `type` of the global `Button` component to `"button"` so it behaves as an ordinary button by default inside forms instead of submitting them.
## 2024-10-24 - Tooltips for Global Action Buttons
**Learning:** Global floating action buttons (like chat widgets) that use icons only can leave users guessing their purpose before clicking, leading to hesitation. Adding a visually hidden, hover-revealed tooltip specifically for desktop users (`hidden md:block`) bridges this gap without cluttering mobile interfaces or redundant screen reader announcements (when `aria-label` is already present).
**Action:** Always add an explicit inline text tooltip to icon-only global buttons, ensuring it is accessible to sighted keyboard users via `focus-visible` states and hidden on touch devices.
## 2023-10-24 - Escape Key Support for Custom Overlays
**Learning:** Custom floating UI elements (like CartDrawer, SearchOverlay, MobileMenu) without built-in accessibility primitives create keyboard traps for screen reader and keyboard-only users, preventing them from dismissing the overlay smoothly.
**Action:** Always attach a document-level `keydown` listener for the `Escape` key when building or identifying custom UI overlays without native dialog behavior, ensuring users can close them.

## 2024-10-06 - Enhancing Accessibility on Global Overlays and Icon Buttons
**Learning:** Custom UI overlays like mobile menus frequently miss keyboard-only dismiss support via the 'Escape' key, leading to keyboard traps for screen reader and keyboard users. Additionally, global icon-only buttons (like Theme toggle, Account, and Cart) can be unclear to sighted mouse/keyboard users despite having `aria-label`s.
**Action:** Always implement an 'Escape' key event listener on all custom floating overlays/menus. For icon-only buttons, complement `aria-label` with visually hidden, hover-revealed textual tooltips (e.g., using `group-hover:opacity-100` and `group-focus-visible:opacity-100`) to improve usability for non-assistive technology users.

## 2023-10-08 - Checkout Custom Selectors Accessibility
**Learning:** Custom selection buttons (like Delivery or Payment methods) created with simple `<button>` elements and `aria-pressed` state do not semantically communicate to screen readers that they represent mutually exclusive options.
**Action:** Always wrap grouped custom selectors in `<div role="radiogroup">` and add `role="radio"` with `aria-checked` to the individual buttons to provide an accessible, form-like experience.
## 2024-10-09 - Improve Accessibility of Selection Components
**Learning:** Mutually exclusive selection components (like size or color selectors) that use generic buttons with `aria-pressed` do not communicate accurate selection semantics to screen readers.
**Action:** Wrap the options in a container with `role="radiogroup"` and assign `role="radio"` and `aria-checked` to the individual elements to improve accessibility.
