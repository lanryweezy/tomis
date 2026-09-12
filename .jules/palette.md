## 2023-10-27 - Keyboard Traps in Custom Modals/Overlays
**Learning:** Found multiple custom overlays (`CartDrawer`, `SearchOverlay`, `MobileMenu`) in `apps/storefront/src/components/ui/overlays.tsx` that did not implement document-level `Escape` key listeners to close them. This traps keyboard-only and screen reader users in the overlay, violating accessibility guidelines.
**Action:** Always verify custom UI floating elements and modals implement a global `Escape` key listener to easily dismiss them.
## 2023-10-27 - Duplicate button causing confusion
**Learning:** Found two identical "BACK TO DELIVERY" buttons next to each other on the checkout page payment step. This violates basic UX principles of not presenting identical redundant options.
**Action:** Removed the duplicate button to simplify the user interface.
