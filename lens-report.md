🔍 Lens: Responsive Regression — HIGH — Mobile Buy Bar Overlap

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `WhatsAppChat`, `mobile-buy-bar` on Product Pages, `FeaturedProducts`, `TomisFooter`
- Viewports tested: 390px (Mobile portrait), 1280px (Desktop)
- Browsers tested: Chromium (Playwright headless simulation analysis)
- States tested: Default rendering on mobile product page
- Infrastructure available: Temporary Python Playwright script / CSS cascade analysis
🔍 Lens: Responsive Regression — HIGH — Product Page Mobile Buy Bar

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: Product Page, Global CSS
- Viewports tested: 375px (Mobile Portrait), 1280px (Desktop)
- Browsers tested: Chromium
- States tested: Initial load
- Infrastructure available: Playwright (Custom script)

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no — manually ran Playwright script
- Baseline age: N/A
- CI integration: No
- Gap identified: The application lacks automated visual regression testing infrastructure (e.g., Playwright, Chromatic) to catch layout shifts and responsive regressions before deployment.
- CI integration: no
- Gap identified: No automated visual testing infrastructure currently exists in the repository.

## PRIMARY FINDING
┌──────────────────────────────────────────────┐
│ [HIGH 🟠] Type: Responsive Regression         │
│ Component: mobile-buy-bar on /products/[slug]│
│                                              │
│ What changed:                                │
│ The mobile buy bar on the product page       │
│ overlaps with the WhatsApp floating button   │
│ on mobile viewports.                         │
│                                              │
│ Baseline:                                    │
│ The WhatsApp button was floating in the      │
│ bottom left and did not overlap with a       │
│ sticky footer, because the mobile buy bar    │
│ was recently introduced.                     │
│                                              │
│ Current state:                               │
│ The newly introduced `.mobile-buy-bar`       │
│ overlays on the bottom of the screen with a  │
│ z-index of 1300. The WhatsAppChat button     │
│ is fixed at `bottom: 2rem` with a z-index    │
│ of 1100. The mobile buy bar obscures the     │
│ WhatsApp button, making it unusable and      │
│ visually broken.                             │
│                                              │
│ Reproduction steps:                          │
│ 1. Open the application on mobile viewport   │
│    (e.g., 375x812)                           │
│ 2. Navigate to a product page, e.g.,         │
│    /products/half-collar-shirt-black         │
│ 3. Observe the bottom of the screen where    │
│    the WhatsApp button and buy bar overlap   │
│                                              │
│ Root cause (if identified):                  │
│ In `apps/storefront/src/app/globals.css`,    │
│ `.mobile-buy-bar` was added with fixed       │
│ positioning at the bottom. However, the      │
│ `WhatsAppChat` component in                  │
│ `apps/storefront/src/components/WhatsAppChat.tsx`│
│ also has fixed positioning at `bottom: 2rem`.│
│ Nobody tested the product page mobile layout │
│ with the WhatsApp button present.            │
│                                              │
│ Fix required:                                │
│ Update `WhatsAppChat` to be positioned higher│
│ or be conditionally hidden when the          │
│ `.mobile-buy-bar` is present (e.g. adjust    │
│ bottom property via CSS when `.mobile-buy-bar`│
│ is rendered, or just adjust its `bottom`     │
│ globally to be above the bar on mobile).     │
└──────────────────────────────────────────────┘

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
## SECONDARY FINDINGS
None identified in this session.

## CLEAN AREAS
Desktop product page and mobile navigation render without regression.

## RECOMMENDED NEXT SESSION FOCUS
Review all fixed elements across all viewports to ensure no overlaps.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot tests in CI/CD, especially for responsive layouts and fixed elements.
