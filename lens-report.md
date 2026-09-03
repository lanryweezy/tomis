🔍 Lens: State Regression — CRITICAL — TomisNav Icon Buttons Focus (Global)

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `TomisNav`, `TomisFooter`, `Hero`, `WhatsAppChat`
- Viewports tested: 375px (Mobile portrait), 768px (Tablet), 1280px (Desktop)
- Browsers tested: Chromium (Playwright headless)
- States tested: default, focus, hover
- Infrastructure available: Temporary Playwright scripts (manual)

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no (only temporary Playwright scripts used)
- Baseline age: N/A
- CI integration: no
- Gap identified: The app currently has no automated visual regression protection in place. A framework like Playwright or Chromatic is highly recommended to automate viewport and state visual testing.

## PRIMARY FINDING

[CRITICAL 🔴] Type: State Regression
Component: TomisNav (apps/storefront/src/components/TomisNav.tsx)

What changed:
Icon-only buttons in the global navigation header (mobile menu toggle, theme toggle x2, account, and cart) lack any visible `focus-visible` outline. Keyboard users tabbing through the global navigation interface see no visual indicator when these core interactive elements are focused.

Baseline:
A visible 2px focus ring should appear on all interactive elements when focused via keyboard navigation, in line with global focus state handling (e.g., `*:focus-visible { outline: 2px solid var(--accent); }` in `globals.css`).

Current state:
The bespoke `TomisNav` component's icon buttons are missing focus rings. For the theme toggle, the inline arbitrary Tailwind variable `focus-visible:outline-[var(--accent)]` fails to render a visible outline, and other buttons simply do not have focus styles applied or override the global reset. Keyboard navigation provides no visual feedback. Confirmed via Playwright on all viewports (375px, 768px, 1280px).

Reproduction steps:
1. Open the storefront application at http://localhost:3000 at any viewport (e.g. 1280x800).
2. Tab through the page content using only the keyboard, starting from the very top of the page.
3. Observe: The theme toggle, account icon, and cart icon in the navigation header show no visual focus indicator when active.

Root cause (if identified):
The component uses custom CSS classes like `focus-visible:outline-[var(--accent)]`. However, due to Tailwind v4 arbitrary variable compilation rules and specificity conflicts with inline styles (`border: 'none'`, `background: 'none'`), the focus ring is either not compiled correctly or is overridden. Furthermore, some buttons in `TomisNav` omit focus classes entirely, bypassing the global focus handler.

Fix required:
Update the `className` on all interactive `<button>` and `<Link>` elements in `apps/storefront/src/components/TomisNav.tsx`. Replace `focus-visible:outline-[var(--accent)]` with standard Tailwind utility classes `focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:outline-none`. This ensures they correctly leverage the standard focus ring system without specificity battles.

## SECONDARY FINDINGS
[HIGH 🟠] Type: Component Appearance Change
Component: TomisFooter (apps/storefront/src/components/TomisFooter.tsx)
The "SUBSCRIBE" button in the footer newsletter form is rendering almost completely unstyled (dark text/background on a dark footer background), making it virtually invisible and unreadable. The component imports `Button` directly from `@astryxdesign/core/Button` but lacks the necessary inverted surface styling default.

## CLEAN AREAS
The newly implemented standard dividers and global CSS classes (`.section-spacing`, `.container`) are rendering consistently with no visual regressions.

## RECOMMENDED NEXT SESSION FOCUS
Check the consistency of interactive states (hover and focus rings) on checkout and cart drawer components to ensure similar state regressions haven't occurred across other bespoke components.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot testing specifically for interaction states (focus-visible, hover) to automatically prevent critical keyboard accessibility regressions.
