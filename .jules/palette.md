## 2024-09-10 - Conditional Rendering and Keyboard Dismissibility for Floating UI Elements
**Learning:** Global fixed UI widgets (like floating chat buttons) can obscure critical user inputs on mobile viewports. Additionally, floating panels can trap keyboard and screen reader focus if not easily dismissible.
**Action:** Implement conditional rendering (e.g., using `usePathname`) to hide floating UI elements on critical conversion paths (like `/checkout`). Also, always add a document-level 'Escape' key listener to allow easy dismissal for keyboard users.
