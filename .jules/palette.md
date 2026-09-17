## 2024-09-10 - Conditional Rendering and Keyboard Dismissibility for Floating UI Elements
**Learning:** Global fixed UI widgets (like floating chat buttons) can obscure critical user inputs on mobile viewports. Additionally, floating panels can trap keyboard and screen reader focus if not easily dismissible.
**Action:** Implement conditional rendering (e.g., using `usePathname`) to hide floating UI elements on critical conversion paths (like `/checkout`). Also, always add a document-level 'Escape' key listener to allow easy dismissal for keyboard users.
## 2024-09-13 - Enhance Multi-step Accessibility
**Learning:** Visual-only sequential step indicators (like the checkout progress bar using divs) omit semantic context for screen readers traversing steps.
**Action:** Replaced generic layout `<div>` containers with semantic ordered lists (`<ol>`, `<li>`) and added `aria-current="step"` and `aria-label="Checkout Progress"` to semantically convey sequential flows and the active step.
## 2024-09-17 - Accessible Custom Toast Notifications
**Learning:** Custom toast notification containers implemented via dynamically appended UI elements (like Framer Motion AnimatePresence divs) are not announced by screen readers by default.
**Action:** Always add `role="region"` and `aria-live="polite"` to the container wrapping dynamically appended toast elements to ensure screen readers announce the notifications gracefully.
