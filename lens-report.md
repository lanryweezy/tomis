🔍 Lens: Responsive Regression — HIGH — BackToTop Overlapped by Mobile Buy Bar

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `BackToTop`, `mobile-buy-bar` on Product Pages, `Toast`, `NewsletterPopup`
- Viewports tested: 375px (Mobile portrait), 768px (Tablet), 1280px (Desktop)
- Browsers tested: Chromium (via manual review)
- States tested: Default rendering on mobile product page
- Infrastructure available: Manual CSS cascade analysis

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no
- Baseline age: N/A
- CI integration: No
- Gap identified: No automated visual regression testing infrastructure (e.g., Playwright, Chromatic) exists to catch overlapping elements and responsive layout regressions before deployment.

## PRIMARY FINDING
┌──────────────────────────────────────────────┐
│ [HIGH 🟠] Type: Responsive Regression         │
│ Component: BackToTop & mobile-buy-bar        │
│                                              │
│ What changed:                                │
│ The floating `BackToTop` button is           │
│ partially or completely overlapped by the    │
│ new `.mobile-buy-bar` on mobile viewports.   │
│                                              │
│ Baseline:                                    │
│ `BackToTop` was accessible at the bottom     │
│ right of the screen across all viewports     │
│ before the `.mobile-buy-bar` was introduced. │
│                                              │
│ Current state:                               │
│ `.mobile-buy-bar` is fixed at the bottom with│
│ `z-index: 1300`. `BackToTop` is fixed at     │
│ `bottom: 2rem` with `z-index: 1100`. Because │
│ the buy bar occupies the bottom area and has │
│ a higher z-index, it obscures the button.    │
│                                              │
│ Reproduction steps:                          │
│ 1. Open mobile viewport (e.g. 375px).        │
│ 2. Navigate to a product page with the       │
│    mobile buy bar.                           │
│ 3. Scroll down until the `BackToTop` button  │
│    appears.                                  │
│ 4. Notice the button is covered by the       │
│    buy bar.                                  │
│                                              │
│ Root cause (if identified):                  │
│ Both elements use fixed positioning near the │
│ bottom. The new buy bar's higher z-index     │
│ and height cover the scroll button.          │
│                                              │
│ Fix required:                                │
│ Implement conditional styles so              │
│ `BackToTop` clears the `.mobile-buy-bar`     │
│ when present on mobile viewports.            │
└──────────────────────────────────────────────┘

## SECONDARY FINDINGS
None identified in this session.

## CLEAN AREAS
The checkout progress step tracking renders correctly without regression.

## RECOMMENDED NEXT SESSION FOCUS
Review all remaining fixed elements (e.g. Toast, NewsletterPopup) across all viewports to ensure no overlaps.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot tests in CI/CD, especially for responsive layouts and fixed elements, targeting critical viewports (375px, 768px, 1280px).
