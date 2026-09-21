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

## SECONDARY FINDINGS
None identified in this session.

## CLEAN AREAS
Desktop product page and mobile navigation render without regression.

## RECOMMENDED NEXT SESSION FOCUS
Review all fixed elements across all viewports to ensure no overlaps.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot tests in CI/CD, especially for responsive layouts and fixed elements.
