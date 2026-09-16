## 2024-09-10 - Conditional Rendering and Keyboard Dismissibility for Floating UI Elements
**Learning:** Global fixed UI widgets (like floating chat buttons) can obscure critical user inputs on mobile viewports. Additionally, floating panels can trap keyboard and screen reader focus if not easily dismissible.
**Action:** Implement conditional rendering (e.g., using `usePathname`) to hide floating UI elements on critical conversion paths (like `/checkout`). Also, always add a document-level 'Escape' key listener to allow easy dismissal for keyboard users.
## 2024-09-13 - Enhance Multi-step Accessibility
**Learning:** Visual-only sequential step indicators (like the checkout progress bar using divs) omit semantic context for screen readers traversing steps.
**Action:** Replaced generic layout `<div>` containers with semantic ordered lists (`<ol>`, `<li>`) and added `aria-current="step"` and `aria-label="Checkout Progress"` to semantically convey sequential flows and the active step.
## 2024-11-20 - Ensure Dynamic Toast Notifications are Announced to Screen Readers
**Learning:** Custom toast notification components (like the `ToastProvider` container) will not be announced to screen reader users when new messages are dynamically added to the DOM unless the container has a live region attribute.
**Action:** Added `role="region"` and `aria-live="polite"` to the fixed toast container `<div />` in `Toast.tsx` so assistive technologies know to announce the toast messages (e.g. success or error updates) dynamically to users.
