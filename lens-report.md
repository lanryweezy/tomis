🔍 Lens: Component Appearance Change — HIGH — TomisFooter Subscribe Button

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `TomisFooter`, `WhatsAppChat`
- Viewports tested: 1280px (Desktop)
- Browsers tested: Chromium (Playwright headless)
- States tested: default, focus
- Infrastructure available: Temporary Playwright scripts

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no (only temporary Playwright scripts used)
- Baseline age: N/A
- CI integration: no
- Gap identified: The app currently has no automated visual regression protection in place. A framework like Playwright or Chromatic is highly recommended to automate viewport and state visual testing.

## PRIMARY FINDING

[HIGH 🟠] Type: Component Appearance Change
Component: TomisFooter (apps/storefront/src/components/TomisFooter.tsx)

What changed:
The "SUBSCRIBE" button in the footer newsletter form is rendering almost completely unstyled (dark text/background on a dark footer background), making it virtually invisible and unreadable. The button completely lost its design system styling.

Baseline:
The SUBSCRIBE button previously rendered with the correct default visual styling for a secondary or primary action on the inverted footer surface, either via global button utility classes or standard `Button` properties.

Current state:
The "SUBSCRIBE" button is barely visible against the dark `#101114` (inverted) background. It has dark text and a dark background with no border, contradicting the rest of the light text on the dark footer. Confirmed via screenshot on Desktop Chrome.

Reproduction steps:
1. Open the storefront application at http://localhost:3000 at a desktop viewport (e.g. 1280x800).
2. Scroll to the bottom of the page to view the footer.
3. Observe the newsletter signup form on the right side.
4. The "SUBSCRIBE" button next to the email input is nearly invisible.

Root cause (if identified):
The component imports `Button` directly from the core design system package (`import { Button } from '@astryxdesign/core/Button';`). However, this core component lacks the necessary inverted surface styling default, or it was intended to use the local app wrapper (`@tomis/ui/button` or `@/components/ui/button.tsx`). Because it does not receive the inverted context, it renders using default dark tokens on a dark background.

Fix required:
Switch the import back to the internal `packages/ui/src/button.tsx` or `@tomis/ui/button` (which relies on tailwind and standard overrides), or pass the correct variant/className to `@astryxdesign/core/Button` to ensure the button is visible on the inverted footer surface. Needs design confirmation on the correct inverted button style.

## SECONDARY FINDINGS (if any)
None.

## CLEAN AREAS
The newly implemented standard dividers and global CSS classes (`.section-spacing`, `.container`) are rendering consistently with no visual regressions.

## RECOMMENDED NEXT SESSION FOCUS
Check the consistency of interactive states (hover and focus rings) on checkout and cart drawer components to ensure similar state regressions haven't occurred across other bespoke components.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot testing specifically for interaction states (focus-visible, hover) to automatically prevent critical keyboard accessibility regressions.
