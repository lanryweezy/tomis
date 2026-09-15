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
## 2026-08-31 — State Regression: WhatsAppChat focus state lost
**Regression:** The WhatsApp floating action button lacks a focus-visible outline, breaking keyboard navigation feedback.
**Root cause:** Custom `focus-visible:outline-[var(--whatsapp-green,#25D366)]` classes fail to render in Tailwind v4 due to specificity conflicts with the global `*:focus-visible` reset or improper variable scoping without the `theme()` function.
**Detection gap:** The regression was missed because automated tests were not checking the focus state on bespoke components that override global focus styles.
**Prevention:** Always verify focus rings manually or via Playwright on newly added bespoke interactive elements, especially those using arbitrary variable syntax in Tailwind.
**Cascade risk:** Any other custom component attempting to override global focus rings with arbitrary `outline` colors may also be broken.

## 2026-08-31 — Component Appearance Change: TomisFooter Subscribe Button unstyled
**Regression:** The "SUBSCRIBE" button in the footer form renders unstyled (dark on dark), making it invisible.
**Root cause:** During a form wrapper refactor, the `Button` import was set to `@astryxdesign/core/Button` instead of the local `@/components/ui/button`. The core component does not automatically receive inverted surface overrides unless explicitly configured, resulting in a fallback to default dark tokens on a dark background.
**Detection gap:** The regression was not caught because the refactor was focused on accessibility (adding a `<form>`) and the visual impact on the inverted footer surface was not manually re-tested.
**Prevention:** Whenever a foundational component import is changed (especially switching between local UI wrappers and core design system components), visually verify all usage contexts, particularly on non-default surfaces (like inverted or dark modes).
**Cascade risk:** Other instances where standard UI wrappers were replaced with core design system imports without passing proper overrides may also exhibit token mismatch regressions.
## 2026-09-14 — Colour Drift: Inverted Surface Text Fallbacks
**Regression:** The "Stay in the loop" typography in the footer rendered as black on a nearly black inverted background, failing contrast checks completely.
**Root cause:** Global text components (like `@astryxdesign/core/Text`) fall back to default light-mode tokens (e.g., `var(--text-primary)`) rather than contextually inverting when placed inside an inverted surface container, unless an explicit color override (`color: 'var(--inverted-text)'`) is applied.
**Detection gap:** Automated a11y tests often miss color contrast failures caused by dynamic CSS variable resolution on distinct dark surfaces within an otherwise light-themed app.
**Prevention:** Watch for missing `color` props or global text token usage inside `style={{ backgroundColor: 'var(--inverted)' }}` containers across the codebase.
**Cascade risk:** High for any new components or global text usage added to `TomisFooter` or dark overlay sections without explicit dark-mode/inverted tokens.
## 2024-09-15 — Colour Drift: Inverted Surface Text Fallback
**Regression:** Text components placed inside inverted surfaces (like footers or dark sections) render as nearly black (default `var(--text-primary)`) against a dark background (`var(--inverted)`), causing severe contrast failures.
**Root cause:** The Astryx design system `Text` component defaults to `var(--text-primary)` (which resolves to dark in light mode). The design system does not automatically invert text tokens contextually when placed inside an inverted container.
**Detection gap:** This was missed because automated contrast testing was likely not running on the full assembled page, or because the text component defaults were changed globally without verifying their impact on inverted surface variants.
**Prevention:** Always verify typography rendering explicitly on inverted surfaces (`var(--inverted)`, dark variants of sections) across both light and dark modes whenever global typography or color tokens are modified.
**Cascade risk:** Any usage of `Text` or `Heading` inside `TomisFooter`, dark `Hero` variants, or `Philosophy` sections that omits explicit color overrides (like `color: 'var(--inverted-text)'`) is at risk of being illegible.
