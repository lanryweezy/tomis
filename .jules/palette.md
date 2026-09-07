## 2024-09-07 - Add Escape Key Support for Floating Action Elements
**Learning:** It is crucial to implement keyboard listeners (`Escape` key) to dismiss custom floating UI elements (like chat panels or custom menus) to prevent keyboard traps for screen reader and keyboard-only users.
**Action:** When implementing custom floating elements, overlays, or popups, ensure an `Escape` keydown event listener is attached to the document when the element is visible to allow users to easily dismiss it.
