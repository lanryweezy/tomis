🔍 Lens: Component Appearance Change — HIGH — TomisFooter Subscribe Button

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `TomisFooter`, `WhatsAppChat`
- Viewports tested: 1280px (Desktop)
- Browsers tested: Chrome (via Playwright headless)
- States tested: Default static layout
- Infrastructure available: Temporary Playwright python script (`scripts/visual_test.py`)

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no (only temporary Playwright scripts used)
- Baseline age: N/A
- CI integration: no
- Gap identified: No automated visual regression testing in place. Requires setup with Playwright or Chromatic.

## PRIMARY FINDING

[HIGH 🟠] Type: Component Appearance Change
Component: TomisFooter (apps/storefront/src/components/TomisFooter.tsx)

What changed:
The "SUBSCRIBE" button in the footer newsletter form is rendering with incorrect dark styling against a dark inverted background, making it nearly invisible and unreadable. The "Stay in the loop" text is also rendering with insufficient contrast. The button has completely lost its intended inverted design system styling.

Baseline:
The SUBSCRIBE button and surrounding text should render with appropriate contrast (e.g., light text, or dark text on a light button background) on the inverted footer surface (`var(--inverted)`). The button previously rendered with the correct visual styling for a secondary or primary action on the inverted surface, either via global button utility classes or standard local `Button` properties.

Current state:
The "SUBSCRIBE" button is barely visible against the dark `#101114` (inverted) background. It has dark text and a dark background with no border, contradicting the rest of the light text on the dark footer. The "Stay in the loop" text above the form is also too dark. Confirmed via screenshot on Desktop Chrome at 1280x800.

Reproduction steps:
1. Open the storefront application at http://localhost:3000 at a desktop viewport (e.g., 1280x800).
2. Scroll to the bottom of the page to view the footer.
3. Observe the newsletter signup form on the right side.
4. The "SUBSCRIBE" button next to the email input, and the "Stay in the loop" text, are nearly invisible.

Root cause (if identified):
The `TomisFooter.tsx` was likely refactored (e.g., for form accessibility), and the `Button` component import was changed: it uses `import { Button } from '@astryxdesign/core/Button';` instead of the local app wrapper (`@/components/ui/button`). The raw core `Button` uses StyleX with design tokens that default to light-mode values (or transparent backgrounds with dark text) unless configured specifically for an inverted surface. Additionally, the "Stay in the loop" text might be missing the `color: 'var(--inverted-text)'` style applied to other text in the footer.

Fix required:
Switch the import back to the internal wrapper `import { Button } from '@/components/ui/button';` which relies on standard Tailwind overrides, or manually apply the inverted style props (e.g. `style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg)' }}`) to ensure the button is visible on the inverted footer surface. Ensure the "Stay in the loop" text is styled with `var(--inverted-text)`.

## SECONDARY FINDINGS
None documented in this session.

## CLEAN AREAS
N/A

## RECOMMENDED NEXT SESSION FOCUS
Check the consistency of other interactive elements (buttons, inputs) on inverted surfaces across the application to ensure local wrappers are being used instead of base design system imports.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot testing or integrate Chromatic into the CI pipeline to automatically prevent visual regressions caused by token cascades or component import mismatches.
