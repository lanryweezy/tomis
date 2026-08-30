🔍 Lens: Component Appearance Change — HIGH — TomisFooter (SUBSCRIBE Button)

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `TomisFooter`, `TomisNav`, `WhatsAppChat`
- Viewports tested: 375px (Mobile portrait), 768px (Tablet), 1280px (Desktop)
- Browsers tested: Chrome (manual)
- States tested: default, hover, focus
- Infrastructure available: None (Manual execution)

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no
- Baseline age: N/A
- CI integration: no
- Gap identified: The app currently has no automated visual regression protection in place. A framework like Playwright or Chromatic is highly recommended to automate viewport and state visual testing.

## PRIMARY FINDING

[HIGH 🟠] Type: Component Appearance Change
Component: TomisFooter (apps/storefront/src/components/TomisFooter.tsx)

What changed:
The "SUBSCRIBE" button in the footer newsletter form is rendering almost completely unstyled (dark text/background on a dark footer background), making it virtually invisible and unreadable. The button completely lost its design system styling.

Baseline:
The SUBSCRIBE button previously rendered with the correct default visual styling for an action on the inverted footer surface.

Current state:
The "SUBSCRIBE" button is barely visible against the dark `#101114` (inverted) background. It has dark text and a dark background with no border, contradicting the rest of the light text on the dark footer. Confirmed manually on all viewports.

Reproduction steps:
1. Open the storefront application at any standard viewport.
2. Scroll to the bottom of the page to view the footer.
3. Observe the newsletter signup form on the right side.
4. The "SUBSCRIBE" button next to the email input is nearly invisible.

Root cause (if identified):
The `TomisFooter.tsx` component imports the `Button` directly from the core design system package (`import { Button } from '@astryxdesign/core/Button';`). However, this core component lacks the necessary inverted surface styling default, or it was intended to use the local app wrapper (`@tomis/ui` or `components/ui/button.tsx`). Because it does not receive the inverted context, it renders using default dark tokens on a dark background.

Fix required:
Switch the import in `apps/storefront/src/components/TomisFooter.tsx` from `@astryxdesign/core/Button` to the local app wrapper (e.g., `import { Button } from '@/components/ui/button';`) or explicitly pass the inverted styling/classes to the core `Button` component so that it renders visibly on the dark footer background.

## SECONDARY FINDINGS (if any)
- None identified in this session.

## CLEAN AREAS
The newly implemented standard dividers (`.astryx-divider`) and global CSS section spacing classes (`.section-spacing`, `.container`) are rendering consistently with no visual regressions.

## RECOMMENDED NEXT SESSION FOCUS
Check the consistency of interactive states (hover and focus rings) on checkout and cart drawer components to ensure similar state regressions haven't occurred across other bespoke components.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot testing specifically for interaction states (focus-visible, hover) to automatically prevent critical accessibility regressions.
