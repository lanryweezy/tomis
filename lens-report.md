# 🔍 Lens: Component Appearance Change — CRITICAL — TomisFooter Subscribe Button

## SCAN COVERAGE
- Components reviewed: TomisFooter, WhatsAppChat, TomisNav
- Viewports tested: N/A (Baseline assessment)
- Browsers tested: N/A (Baseline assessment)
- States tested: Default, Focus
- Infrastructure available: None. Scanned via code inspection and historical reports.

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no (Missing critical automated visual regression tool like Playwright or Chromatic)
- Baseline age: N/A
- CI integration: no
- Gap identified: The app currently has no automated visual regression suite running in CI. Regressions only surfaced through manual reporting.

## PRIMARY FINDING

[CRITICAL 🔴] Type: Component Appearance Change
Component: TomisFooter (SUBSCRIBE button)

What changed:
The "SUBSCRIBE" button in the footer newsletter form renders almost completely unstyled and invisible on a dark background. It is missing the inverted/dark-theme surface styling and appears as plain text or an unstyled primitive.

Baseline:
The SUBSCRIBE button previously used the local application's UI button wrapper, inheriting standard application styling (padding, background color, hover state) appropriate for the dark footer surface.

Current state:
The button is imported directly from the upstream design system (`@astryxdesign/core/Button`) which defaults to light-theme tokens and requires explicit styling contexts, causing it to break on the inverted background of the footer.

Reproduction steps:
1. Open the application at any viewport.
2. Scroll to the bottom of the page to the TomisFooter component.
3. Observe the "SUBSCRIBE" button next to the email input field.

Root cause:
In `apps/storefront/src/components/TomisFooter.tsx`, the button is imported as:
`import { Button } from '@astryxdesign/core/Button';`
Instead of using the local wrapper (e.g., `@/components/ui/button` or equivalent) that includes the application's contextual styling for inverted surfaces.

Fix required:
Update the import in `TomisFooter.tsx` from `@astryxdesign/core/Button` to the correct local UI wrapper (e.g., `import { Button } from '@/components/ui/button'`) and update its prop usage from `<Button label="SUBSCRIBE" />` to `<Button>SUBSCRIBE</Button>` to restore the intended application styling.

## SECONDARY FINDINGS
- [HIGH 🟠] Type: State Regression - WhatsAppChat Widget: Floating action button is missing a focus-visible outline for keyboard navigation. (Root cause: `focus-visible:outline-[var(--whatsapp-green,#25D366)]` arbitrary utility fails).
- [HIGH 🟠] Type: State Regression - TomisNav: Icon-only buttons (Cart, Account, Dark Mode) are missing a focus-visible outline for keyboard navigation. (Root cause: `focus-visible:outline-[var(--accent)]` arbitrary utility fails).

## CLEAN AREAS
The core layout grid and sections appear intact. No massive layout shifts observed in the surrounding footer code.

## RECOMMENDED NEXT SESSION FOCUS
Review all other occurrences of raw `@astryxdesign/core` imports in the storefront app to verify if other elements bypassed the local theme wrapper. Establish a Playwright baseline for these components.

## INFRASTRUCTURE RECOMMENDATION
Install Playwright (`@playwright/test`) and create snapshot tests for critical interactive elements (like `WhatsAppChat`, `TomisFooter`, and `TomisNav`) specifically testing the `focus-visible` states and dark-surface rendering.
