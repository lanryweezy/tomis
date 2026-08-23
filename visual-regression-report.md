## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `TomisNav` (navigation header), `TomisFooter`, `Hero`, `FeaturedProducts`, `WhatsAppChat`.
- Viewports tested: 375px (Mobile portrait), 768px (Tablet), 1280px (Desktop).
- Browsers tested: Chrome (via Playwright headless).
- States tested: hover, focus, disabled.
- Infrastructure available: Manual Playwright scripts.

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
The `WhatsAppChat` widget has a custom floating action button that visually removes standard focus indicators. The outline fails to render, leaving keyboard navigation without visual feedback. Confirmed via Playwright on mobile viewport (375x812).

Reproduction steps:
1. Open the storefront application at a mobile viewport (e.g., 375x812).
2. Tab through the page content using only the keyboard until reaching the floating WhatsApp button at the bottom left.
3. Observe: The floating button shows no visual focus indicator when active.

Root cause (if identified):
The component was updated with custom `focus-visible:outline-[var(--whatsapp-green,#25D366)]` classes. However, due to CSS specificity issues and potential conflicts with the global `*:focus-visible` reset, or because it relies on Tailwind classes that might not be correctly processed for arbitrary variables without the `theme()` function or proper variable scoping in Tailwind v4, the outline fails to render.

Fix required:
Update the `className` on the `motion.button` in `apps/storefront/src/components/WhatsAppChat.tsx` to use the standard global focus rings or ensure the bespoke class works by adopting standard tailwind `ring` utilities like `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--whatsapp-green)]` instead of arbitrary `outline` colors that fail in the current CSS cascade.

## SECONDARY FINDINGS (if any)
[CRITICAL 🔴] Type: State Regression
Component: TomisNav (apps/storefront/src/components/TomisNav.tsx)
Icon-only buttons (mobile menu toggle, theme toggle, account, and cart) in the `TomisNav` component lack `focus-visible` outlines.

## CLEAN AREAS
The newly implemented standard dividers and global CSS classes (`.section-spacing`, `.container`) are rendering consistently with no visual regressions.

## RECOMMENDED NEXT SESSION FOCUS
Check the consistency of interactive states (hover and focus rings) on checkout and cart drawer components to ensure similar state regressions haven't occurred across other bespoke components.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot testing specifically for interaction states (focus-visible, hover) to automatically prevent critical keyboard accessibility regressions.

## SECONDARY FINDING (UPDATED)

[CRITICAL 🔴] Type: State Regression
Component: WhatsAppChat (apps/storefront/src/components/WhatsAppChat.tsx)

What changed:
The WhatsApp floating action button lacks a `focus-visible` outline. Keyboard users tabbing through the interface see no visual indicator when this interactive element is focused.

Baseline:
A visible focus ring should appear on all interactive elements when focused via keyboard navigation, in line with global focus state handling.

Current state:
The `WhatsAppChat` widget has a custom floating action button that visually removes standard focus indicators (or they are lost due to specificity or rendering issues like `outline-none` conflicts with Tailwind v4 or the global styles), leaving keyboard navigation without visual feedback. Confirmed manually.

Reproduction steps:
1. Open the storefront application at any standard viewport.
2. Tab through the page content using only the keyboard until reaching the floating WhatsApp button at the bottom left.
3. Observe: The floating button shows no visual focus indicator when active.

Root cause (if identified):
The component was updated in a recent PR (`palette-whatsapp-a11y-9511167992572241009`) with custom `focus-visible:outline-[var(--whatsapp-green,#25D366)]` classes. However, due to CSS specificity issues, potential conflicts with the global `*:focus-visible` reset, or because it relies on Tailwind classes that might not be correctly processed for arbitrary variables without the `theme()` function or proper variable scoping, the outline fails to render.

Fix required:
Update the `className` on the `motion.button` in `apps/storefront/src/components/WhatsAppChat.tsx` to use the standard global focus rings or ensure the bespoke class `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--whatsapp-green,#25D366)]` works by adopting standard tailwind `ring` utilities instead of arbitrary `outline` colors that may fail. Needs investigation into exact CSS cascade conflict.

## THIRD FINDING

[HIGH 🟠] Type: Component Appearance Change
Component: TomisFooter (apps/storefront/src/components/TomisFooter.tsx)

What changed:
The "SUBSCRIBE" button in the footer newsletter form is rendering almost completely unstyled (dark text/background on a dark footer background), making it virtually invisible and unreadable. The button completely lost its design system styling.

Baseline:
The SUBSCRIBE button previously rendered with the correct default visual styling for a secondary or primary action on the inverted footer surface, either via global button utility classes or standard `Button` properties.

Current state:
The "SUBSCRIBE" button is barely visible against the dark `#101114` (inverted) background. It has dark text and a dark background with no border, contradicting the rest of the light text on the dark footer. Confirmed via screenshot on Desktop Chrome.

Reproduction steps:
1. Open the storefront application at http://localhost:3000.
2. Scroll to the bottom of the page to view the footer.
3. Observe the newsletter signup form on the right side.
4. The "SUBSCRIBE" button next to the email input is nearly invisible.

Root cause (if identified):
In a recent PR (9617241 "Palette: Form Keyboard Accessibility"), the `TomisFooter.tsx` was refactored to wrap the input and button in a `<form>` element. However, the `Button` component import was changed or initialized improperly: it uses `import { Button } from '@astryxdesign/core/Button';` but fails to pass any necessary theme overrides, inverted variant props, or custom styling. Since `@astryxdesign/core/Button` uses StyleX with design tokens that likely default to light-mode values (or transparent backgrounds with dark text for ghost buttons) unless configured for an inverted surface, the button renders with default (dark) tokens on a dark background.

Fix required:
Either switch the import back to the internal `packages/ui/src/button.tsx` (which relies on tailwind and standard overrides) or pass the correct variant/className to `@astryxdesign/core/Button` (e.g. `variant="secondary"` and pass inverted token classes, or simply manually apply `style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg)' }}` similar to `NewsletterPopup.tsx`) to ensure the button is visible on the inverted footer surface. Needs design confirmation on the correct inverted button style.
