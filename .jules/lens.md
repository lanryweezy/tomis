## 2026-08-15 — State Regression: Missed global focus-visible classes on bespoke components

**Regression:** The `WhatsAppChat` widget (and other bespoke components like `TomisNav`) lost or never received proper `focus-visible` outlines during recent UI refactors, breaking keyboard navigation.
**Root cause:** A recent PR (`palette-whatsapp-a11y-9511167992572241009`) updated the `WhatsAppChat` widget with custom utility classes (`focus-visible:outline-[var(--whatsapp-green,#25D366)]`) to improve accessibility. However, due to CSS specificity issues (the component has inline styles for border and box-shadow) or because it relies on Tailwind classes that might not correctly resolve arbitrary variables, the outline fails to render. Similarly, design system updates to library components (like `packages/ui/src/header.tsx`) missed bespoke storefront components.
**Detection gap:** Automated visual testing (e.g., Playwright, Chromatic) is entirely absent. In addition, manual testing likely focused on mouse interaction and did not test the actual application layer integration using a keyboard.
**Prevention:** 1) Automated visual snapshot testing that explicitly includes `focus-visible` and interactive states is required. 2) When applying custom focus rings to components with inline styles or complex box-shadows, the changes must be explicitly verified in the browser. Rely on standard Tailwind `ring` utilities over arbitrary `outline` colors that may fail.
**Cascade risk:** High. Any bespoke application component that does not directly inherit from the design system or attempts to override global resets with arbitrary focus utility classes is at risk.

## 2026-08-22 — Component Appearance Change: Design System Import Conflicts

**Regression:** The "SUBSCRIBE" button in the `TomisFooter` component rendered virtually invisible against a dark background, completely losing its intended appearance.
**Root cause:** A recent PR refactoring the footer for form accessibility mistakenly changed the component import from the internal library wrapper (e.g. `packages/ui/src/button.tsx`) to the upstream design system dependency (`@astryxdesign/core/Button`). The upstream component uses StyleX and strict token resolution which defaults to light-theme values unless explicitly placed within a corresponding theme context, whereas the application code expected custom CSS-variable utility classes and standard fallback styling on an inverted surface.
**Detection gap:** The component change was made in a commit focused purely on DOM structure (`div` to `form` for keyboard accessibility) and tested in an isolated DOM inspection without running automated visual regression tests that catch cross-surface rendering errors.
**Prevention:** Developers and agents modifying interactive primitives must ensure they import components from the local wrapper (e.g., `@tomis/ui`) rather than importing raw components directly from the base design system (`@astryxdesign/core`) unless they fully comprehend the required styling contexts (e.g., passing explicit variants or theme tokens).
**Cascade risk:** High. Any refactor that touches imports across standard UI elements risks replacing locally customized components with unstyled base components, leading to broken appearances on inverted surfaces across the application.
## 2026-08-20 — State Regression: Tailwind v4 arbitrary variables fail in complex selectors
**Regression:** Focus ring (outline) failed to render on `WhatsAppChat` floating button.
**Root cause:** Using arbitrary values with CSS variables like `outline-[var(--whatsapp-green,#25D366)]` in Tailwind v4 alongside `focus-visible:` pseudo-class can break specificity or simply not compile correctly depending on configuration.
**Detection gap:** It was visually removed by a PR trying to make it accessible without proper Playwright tests. Playwright test snapshots of interaction states (like tab focus) didn't exist.
**Prevention:** Always verify focus rings manually or via Playwright by simulating tab interactions. Recommend standard tailwind utilities like `ring-2` with standard theme colors over arbitrary `outline-color` using variables.
**Cascade risk:** Any component using custom CSS variables with arbitrary tailwind classes in focus or hover states might be failing similarly.

## 2026-08-25 — Component Appearance Change: TomisFooter SUBSCRIBE Button Unstyled

**Regression:** The "SUBSCRIBE" button in the footer newsletter form rendered almost completely unstyled and invisible on a dark background.

**Root cause:** The `TomisFooter` component imported the raw core design system button (`@astryxdesign/core/Button`) instead of the app's standard wrapper (`@tomis/ui` or local wrapper). The core button lacks the local contextual theme overrides needed for the inverted footer surface.

**Detection gap:** The button change happened during a refactor to wrap inputs in a `<form>` for keyboard accessibility. Visual regressions from import changes are rarely caught by standard unit tests because the code still compiles and renders valid HTML elements.

**Prevention:** Ensure that all components on inverted surfaces (like the footer) use the correct local wrapped components rather than raw design system core components, which might require explicit theme passing.

**Cascade risk:** Any other component that bypasses the local UI wrappers and directly imports from the core design system risks losing local contextual styling (such as dark mode overrides, custom border radiuses, or inverted surface colors).
