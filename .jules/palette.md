## 2024-05-24 - Floating UI Checkout Conflict
**Learning:** Global floating UI widgets (like chat buttons) easily obscure critical user inputs and buttons on mobile viewports, especially on critical conversion paths like `/checkout`.
**Action:** Implement conditional rendering based on the route to hide non-essential floating elements on critical paths, and always add a document-level 'Escape' key listener for keyboard/screen reader users to easily dismiss floating panels.
