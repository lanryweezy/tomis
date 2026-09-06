
## 2024-05-14 - Escape Key Listener for Custom UI Overlays
**Learning:** Custom UI overlays like floating chat panels can trap keyboard focus and disrupt screen reader navigation if they lack proper dismissal mechanisms. Relying solely on a click-to-close button is insufficient for a fully accessible experience.
**Action:** Always implement a document-level 'Escape' key listener to close custom floating UI elements (e.g., chat widgets, custom popups, menus) to ensure users can easily dismiss them without needing to locate a specific close button or rely on a mouse click.
