🔍 Lens: State Regression — CRITICAL — WhatsAppChat (global)

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `TomisNav` (navigation header), `TomisFooter`, `Hero`, `FeaturedProducts`, `WhatsAppChat`
- Viewports tested: 375px, 768px, 1280px
- Browsers tested: Chrome (manual/Playwright)
- States tested: hover, focus, active, disabled
- Infrastructure available: None (Manual execution)

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no
- Baseline age: N/A
- CI integration: no
- Gap identified: The app currently has no automated visual regression protection in place. A framework like Playwright or Chromatic is highly recommended to automate viewport and state visual testing.

## PRIMARY FINDING
[CRITICAL 🔴] Type: State Regression
Component: WhatsAppChat (apps/storefront/src/components/WhatsAppChat.tsx)

What changed:
The WhatsApp floating action button lacks a `focus-visible` outline. Keyboard users tabbing through the interface see no visual indicator when this interactive element is focused, breaking keyboard accessibility for a primary interaction.

Baseline:
A visible focus ring should appear on all interactive elements when focused via keyboard navigation, in line with global focus state handling which sets a 2px solid accent outline (`*:focus-visible` in `globals.css`).

Current state:
The `WhatsAppChat` widget has a custom floating action button that visually removes standard focus indicators. The outline fails to render completely, leaving keyboard navigation without visual feedback. Confirmed manually on all tested viewports.

Reproduction steps:
1. Open the storefront application at a mobile viewport (375px width).
2. Tab through the page content using only the keyboard until reaching the floating WhatsApp button at the bottom left.
3. Observe: The floating button shows no visual focus indicator when active.
4. Confirmed across all standard viewports.

Root cause (if identified):
The component was updated in a recent PR (`palette-whatsapp-a11y-9511167992572241009`) with custom `focus-visible:outline-[var(--whatsapp-green,#25D366)]` classes on the `motion.button`. However, due to CSS specificity issues (inline styles applied on the button), potential conflicts with the global `*:focus-visible` reset, or because Tailwind v4 classes might not be correctly processed for arbitrary variables without the `theme()` function, the outline fails to render.

Fix required:
Update the `className` on the `motion.button` in `apps/storefront/src/components/WhatsAppChat.tsx` to replace `focus-visible:outline-[var(--whatsapp-green,#25D366)]` with standard tailwind ring utilities: `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--whatsapp-green,#25D366)]` (and keep `focus-visible:outline-none`). This will ensure a robust focus indicator that bypasses arbitrary outline variable compilation issues. This is a WCAG accessibility failure and must be fixed.

## SECONDARY FINDINGS (if any)
- [HIGH 🟠] Component Appearance Change: "SUBSCRIBE" button in `TomisFooter.tsx` renders unstyled on the dark background due to an incorrect import from `@astryxdesign/core/Button` instead of `@tomis/ui`.
- [CRITICAL 🔴] State Regression: Icon-only buttons (mobile menu toggle, theme toggle, account, and cart) in `TomisNav.tsx` lack `focus-visible` outlines.

## CLEAN AREAS
The newly implemented standard dividers (`.astryx-divider`) and global CSS section spacing classes (`.section-spacing`, `.container`) are rendering consistently with no visual regressions.

## RECOMMENDED NEXT SESSION FOCUS
Check the consistency of interactive states (hover and focus rings) on checkout and cart drawer components to ensure similar state regressions haven't occurred across other bespoke components.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot testing specifically for interaction states (focus-visible, hover) to automatically prevent critical keyboard accessibility regressions.
