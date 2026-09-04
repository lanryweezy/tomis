🔍 Lens: Responsive Regression — HIGH — Checkout Mobile WhatsApp Overlap

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `TomisFooter`, `CheckoutPage`, `WhatsAppChat`
- Viewports tested: 375x812 (Mobile portrait), 1280px (Desktop)
- Browsers tested: Chromium (Playwright headless)
- States tested: default
- Infrastructure available: Temporary Playwright scripts

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no (only temporary Playwright scripts used)
- Baseline age: N/A
- CI integration: no
- Gap identified: The app currently has no automated visual regression protection in place. A framework like Playwright or Chromatic is highly recommended to automate viewport and state visual testing.

## PRIMARY FINDING

[HIGH 🟠] Type: Responsive Regression
Component: WhatsAppChat (apps/storefront/src/components/WhatsAppChat.tsx)

What changed:
The floating WhatsApp chat button renders on top of interactive form fields on the mobile checkout page, specifically obscuring the left part of the "Address" input and potentially blocking interaction with the "CONTINUE TO DELIVERY →" button if scrolled differently. The `WhatsAppChat` widget is globally present and fixed to the bottom left.

Baseline:
The floating WhatsApp chat widget should not overlap critical user input forms on the checkout path. It should be positioned with adequate z-index and spacing, or optionally hidden on critical paths like checkout where it may disrupt user flow on narrow viewports.

Current state:
The `WhatsAppChat` widget is positioned `fixed bottom-6 left-6 z-50`. On mobile (375x812), it overlaps the main content area which has no extra padding to accommodate it. In the `mobile_checkout.png`, it's directly covering the "Address" and "Phone" form labels/inputs.

Reproduction steps:
1. Open the storefront application at http://localhost:3000/checkout at a mobile viewport (e.g. 375x812).
2. Scroll through the delivery address form.
3. Observe the green WhatsApp icon button floating on the bottom left corner, overlapping the input fields.

Root cause (if identified):
The `WhatsAppChat` component uses fixed positioning (`bottom-6 left-6`) without considering the available screen real estate on mobile devices or adapting to specific route layouts (like the checkout flow which requires full width for forms). The layout component doesn't add padding-bottom on mobile to account for fixed global widgets.

Fix required:
Investigate further: Consider hiding the WhatsApp widget on the `/checkout` route, or adjust the mobile layout padding to ensure content doesn't get permanently obscured by fixed elements. Alternatively, change the mobile positioning (e.g., right side or smaller icon). Needs design confirmation.

## SECONDARY FINDINGS (if any)
None.

## CLEAN AREAS
The "SUBSCRIBE" button in the footer now appears with standard secondary styling on desktop and mobile viewports, correctly taking up the expected space. The main homepage layout on mobile is clean with no significant horizontal overflow.

## RECOMMENDED NEXT SESSION FOCUS
Check the consistency of interactive states (hover and focus rings) on checkout and cart drawer components to ensure similar state regressions haven't occurred across other bespoke components. Check other pages on mobile to see if WhatsApp chat overlaps critical content.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot testing specifically for interaction states (focus-visible, hover) and responsive viewports (375px) to automatically prevent critical layout obscuration and accessibility regressions.
