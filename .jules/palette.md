## 2024-09-10 - Conditional Rendering and Keyboard Dismissibility for Floating UI Elements
**Learning:** Global fixed UI widgets (like floating chat buttons) can obscure critical user inputs on mobile viewports. Additionally, floating panels can trap keyboard and screen reader focus if not easily dismissible.
**Action:** Implement conditional rendering (e.g., using `usePathname`) to hide floating UI elements on critical conversion paths (like `/checkout`). Also, always add a document-level 'Escape' key listener to allow easy dismissal for keyboard users.
## 2024-09-13 - Enhance Multi-step Accessibility
**Learning:** Visual-only sequential step indicators (like the checkout progress bar using divs) omit semantic context for screen readers traversing steps.
**Action:** Replaced generic layout `<div>` containers with semantic ordered lists (`<ol>`, `<li>`) and added `aria-current="step"` and `aria-label="Checkout Progress"` to semantically convey sequential flows and the active step.
## 2024-09-18 - Ensure Dynamic Notifications Are Accessible
**Learning:** Custom toast notification components (like dynamically rendered `div` elements) are not automatically announced by screen readers when appended to the DOM, leaving visually impaired users unaware of important system feedback (e.g., success or error messages).
**Action:** Always add live region attributes (such as `role="region"` and `aria-live="polite"`) and a descriptive label (like `aria-label="Notifications"`) to the parent container of dynamic toast elements to ensure proper assistive technology support.
