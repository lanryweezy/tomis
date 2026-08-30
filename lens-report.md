🔍 Lens: State Regression — CRITICAL — WhatsAppChat Focus State

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `TomisFooter`, `TomisNav`, `WhatsAppChat`
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

[CRITICAL 🔴] Type: State Regression
Component: WhatsAppChat (apps/storefront/src/components/WhatsAppChat.tsx)

What changed:
The WhatsApp floating action button lacks a `focus-visible` outline. Keyboard users tabbing through the interface see no visual indicator when this interactive element is focused.

Baseline:
A visible focus ring should appear on all interactive elements when focused via keyboard navigation, in line with global focus state handling.

Current state:
The `WhatsAppChat` widget has a custom floating action button that visually removes standard focus indicators. The outline fails to render, leaving keyboard navigation without visual feedback. Confirmed via Playwright on desktop viewport (1280x800).

Reproduction steps:
1. Open the storefront application at a desktop viewport (e.g., 1280x800).
2. Tab through the page content using only the keyboard until reaching the floating WhatsApp button at the bottom left.
3. Observe: The floating button shows no visual focus indicator when active.

Root cause (if identified):
The component was updated with custom `focus-visible:outline-[var(--whatsapp-green,#25D366)]` classes. However, due to CSS specificity issues and potential conflicts with the global `*:focus-visible` reset, or because it relies on Tailwind classes that might not be correctly processed for arbitrary variables without the `theme()` function or proper variable scoping in Tailwind v4, the outline fails to render.
The `TomisFooter.tsx` component imports the `Button` directly from the core design system package (`import { Button } from '@astryxdesign/core/Button';`). However, this core component lacks the necessary inverted surface styling default, or it was intended to use the local app wrapper (`@tomis/ui` or `components/ui/button.tsx`). Because it does not receive the inverted context, it renders using default dark tokens on a dark background.

Fix required:
Update the `className` on the `motion.button` in `apps/storefront/src/components/WhatsAppChat.tsx` to use the standard global focus rings or ensure the bespoke class works by adopting standard tailwind `ring` utilities like `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--whatsapp-green,#25D366)]` instead of arbitrary `outline` colors that fail in the current CSS cascade.

## SECONDARY FINDINGS (if any)
[HIGH 🟠] Type: Component Appearance Change
Component: TomisFooter (apps/storefront/src/components/TomisFooter.tsx)
The "SUBSCRIBE" button in the footer newsletter form is rendering almost completely unstyled (dark text/background on a dark footer background), making it virtually invisible and unreadable.

## CLEAN AREAS
The newly implemented standard dividers and global CSS classes (`.section-spacing`, `.container`) are rendering consistently with no visual regressions.

## RECOMMENDED NEXT SESSION FOCUS
Check the consistency of interactive states (hover and focus rings) on checkout and cart drawer components to ensure similar state regressions haven't occurred across other bespoke components.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot testing specifically for interaction states (focus-visible, hover) to automatically prevent critical keyboard accessibility regressions.
