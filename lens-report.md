🔍 Lens: Responsive Regression — HIGH — Mobile Buy Bar Overlap

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `WhatsAppChat`, `mobile-buy-bar` on Product Pages, `FeaturedProducts`, `TomisFooter`
- Viewports tested: 390px (Mobile portrait), 1280px (Desktop)
- Browsers tested: Chromium (Playwright headless simulation analysis)
- States tested: Default rendering on mobile product page
- Infrastructure available: Temporary Python Playwright script / CSS cascade analysis

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: No (temporary Python Playwright script used)
- Baseline age: N/A
- CI integration: No
- Gap identified: The application lacks automated visual regression testing infrastructure (e.g., Playwright, Chromatic) to catch layout shifts and responsive regressions before deployment.

## PRIMARY FINDING

[HIGH 🟠] Type: Responsive Regression
Component: `WhatsAppChat` widget / Product Page (`apps/storefront/src/app/products/[slug]/page.tsx`)

What changed:
The `WhatsAppChat` floating button on the bottom left of the screen is now visually covered and overlapped by the new fixed `.mobile-buy-bar` on mobile viewports on the product pages, making the chat widget inaccessible.

Baseline:
Prior to the addition of the `.mobile-buy-bar`, the `WhatsAppChat` floating button was perfectly accessible at `bottom: 2rem` and `left: 2rem` on all viewports.

Current state:
The `.mobile-buy-bar` was added with `position: fixed`, `bottom: 0`, `left: 0`, `right: 0`, and a `z-index: 1300`. This bar covers the entire bottom area of the mobile screen. The `WhatsAppChat` button is positioned at `bottom: 2rem` and `left: 2rem` with a `z-index: 1100`. Because the buy bar's `z-index` (1300) is higher than the chat widget's (1100), the chat widget is visually overlapped on mobile.

Reproduction steps:
1. Open any product page (e.g. `/products/signature-half-collar-white`) at a mobile viewport (e.g., 375px or 390px).
2. Look at the bottom of the screen.
3. Observe the full-width mobile buy bar spanning the bottom of the viewport.
4. Note that the WhatsApp chat floating button (which should be at `bottom: 2rem`, `left: 2rem`) is partially or completely obscured by the buy bar and cannot be clicked easily.

Root cause (if identified):
Commit 8c295d9 introduced the `.mobile-buy-bar` in `apps/storefront/src/app/globals.css` with a high `z-index` (1300) and fixed positioning at the bottom for viewports under 768px. The `WhatsAppChat` component (`apps/storefront/src/components/WhatsAppChat.tsx`) remains fixed at the bottom with a lower `z-index` (1100), resulting in an overlap.

Fix required:
Either conditionally hide the `WhatsAppChat` button when the `.mobile-buy-bar` is present (similar to how it's hidden on the `/checkout` route), or apply conditional CSS/positioning to push the chat widget above the buy bar on mobile viewports.

## SECONDARY FINDINGS (if any)
None.

## CLEAN AREAS
Desktop viewports correctly hide the `.mobile-buy-bar`, keeping the `WhatsAppChat` accessible.

## RECOMMENDED NEXT SESSION FOCUS
Review all other floating or fixed widgets (`Toast`, `NewsletterPopup`) on mobile to ensure they aren't also overlapped by the new `.mobile-buy-bar`.

## INFRASTRUCTURE RECOMMENDATION
Implement automated visual snapshot testing using Playwright with a specific focus on mobile viewports (`375px`, `390px`) to automatically catch overlapping fixed elements when new sticky navs or bars are added.
