🔍 Lens: Responsive Regression — HIGH — WhatsApp Chat Mobile Overlap

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `WhatsAppChat`, `.mobile-buy-bar` on Product Pages
- Viewports tested: 375px (Mobile Portrait), 1280px (Desktop)
- Browsers tested: Chromium (Playwright headless simulation)
- States tested: Initial load
- Infrastructure available: Temporary Python Playwright script / CSS cascade analysis

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no — manually ran Playwright script
- Baseline age: N/A
- CI integration: No
- Gap identified: The application lacks automated visual regression testing infrastructure (e.g., Playwright, Chromatic) to catch layout shifts and responsive regressions before deployment.

## PRIMARY FINDING
┌──────────────────────────────────────────────┐
│ [HIGH 🟠] Type: Responsive Regression         │
│ Component: WhatsAppChat on /products/[slug]  │
│                                              │
│ What changed:                                │
│ The WhatsApp floating button on the bottom   │
│ left of the screen is now visually covered   │
│ and overlapped by the new fixed              │
│ `.mobile-buy-bar` on mobile viewports on the │
│ product pages.                               │
│                                              │
│ Baseline:                                    │
│ The WhatsApp button was perfectly accessible │
│ at `bottom: 2rem` and `left: 2rem` on all    │
│ viewports.                                   │
│                                              │
│ Current state:                               │
│ The `.mobile-buy-bar` was added with         │
│ `position: fixed`, `bottom: 0`, and a        │
│ `z-index: 1300`. This bar covers the bottom  │
│ area of the mobile screen. The               │
│ `WhatsAppChat` button is positioned at       │
│ `bottom: 2rem` with a `z-index: 1100`.       │
│ The buy bar obscures the chat widget, making │
│ it visually broken.                          │
│                                              │
│ Reproduction steps:                          │
│ 1. Open the application on a mobile viewport │
│    (e.g., 375x812)                           │
│ 2. Navigate to a product page, e.g.,         │
│    /products/signature-half-collar-white     │
│ 3. Observe the bottom of the screen where    │
│    the WhatsApp button and buy bar overlap.  │
│                                              │
│ Root cause (if identified):                  │
│ Commit 8c295d9 introduced the                │
│ `.mobile-buy-bar` in                         │
│ `apps/storefront/src/app/globals.css` with   │
│ a high `z-index` (1300) and fixed            │
│ positioning at the bottom for viewports      │
│ under 768px. The `WhatsAppChat` component    │
│ (`apps/storefront/src/components/WhatsAppChat.tsx`) │
│ remains fixed at the bottom with a lower     │
│ `z-index` (1100), resulting in an overlap.   │
│                                              │
│ Fix required:                                │
│ Modify `WhatsAppChat` to be positioned higher│
│ or conditionally hidden when the             │
│ `.mobile-buy-bar` is present using CSS       │
│ (e.g., `:has()` selector on body or parent)  │
│ so they do not overlap on mobile viewports.  │
└──────────────────────────────────────────────┘

## SECONDARY FINDINGS
None identified in this session.

## CLEAN AREAS
Desktop product pages (`1280px`) render correctly as the `.mobile-buy-bar` is hidden on desktop viewports.

## RECOMMENDED NEXT SESSION FOCUS
Review all other floating or fixed widgets (e.g., `NewsletterPopup`, `Toast`) on mobile to ensure they aren't also overlapped by the new `.mobile-buy-bar` or other elements.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot tests in CI/CD, especially targeting responsive layouts and fixed-position elements on mobile viewports.
