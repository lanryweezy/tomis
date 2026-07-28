## 2024-11-20 - [ARIA Labels for Cart Drawer Quantity Inputs]
**Learning:** Icon-only buttons for incremental tasks (like adjusting cart quantities) in overlay components are often overlooked for accessibility. The `CartDrawer` component relied entirely on symbols (+/- and 'x') without screen reader context.
**Action:** Add `aria-label` attributes to all symbol-based actionable inputs across drawers and overlays.
