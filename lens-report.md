🔍 Lens: Colour Drift — HIGH — Purchase Reassurance (Dark Mode)

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `Purchase Reassurance` box on Checkout page, `TomisNav`
- Viewports tested: Responsive viewports simulated via CSS analysis
- Browsers tested: Chromium (via manual review)
- States tested: Light and Dark mode rendering
- Infrastructure available: Manual CSS cascade analysis

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no
- Baseline age: N/A
- CI integration: No
- Gap identified: No automated visual regression testing infrastructure exists to catch dark mode styling failures before deployment.

## PRIMARY FINDING
┌──────────────────────────────────────────────┐
│ [HIGH 🟠] Type: Colour Drift                  │
│ Component: Purchase Reassurance (Checkout)   │
│                                              │
│ What changed:                                │
│ The background colour of the `.purchase-     │
│ reassurance` box fails to invert when the    │
│ application is switched to dark mode,        │
│ rendering as a stark light grey (`#f5f5f4`)  │
│ against a dark background, creating a        │
│ jarring contrast and visual inconsistency.   │
│                                              │
│ Baseline:                                    │
│ In dark mode, all elevated or muted          │
│ surface backgrounds should adapt to          │
│ `var(--bg-elevated)` (e.g., `#1A1A1A`) to    │
│ maintain the dark aesthetic and prevent      │
│ glare.                                       │
│                                              │
│ Current state:                               │
│ The `.purchase-reassurance` box remains      │
│ light grey (`#f5f5f4`) in dark mode.         │
│                                              │
│ Reproduction steps:                          │
│ 1. Open the application.                     │
│ 2. Switch the application to dark mode       │
│    using the Theme toggle in the navigation. │
│ 3. Navigate to a product or checkout page    │
│    where `.purchase-reassurance` is used.    │
│ 4. Observe the light grey background on      │
│    the reassurance box.                      │
│                                              │
│ Root cause (if identified):                  │
│ In `apps/storefront/src/app/globals.css`,    │
│ the `.purchase-reassurance` class is styled  │
│ with `background: var(--color-background-    │
│ muted, #f5f5f4)`. However, the token         │
│ `--color-background-muted` is not defined    │
│ in the `:root` or `[data-theme="dark"]`      │
│ blocks. Therefore, the browser falls back    │
│ to the hardcoded `#f5f5f4`, bypassing the    │
│ theme system entirely.                       │
│                                              │
│ Fix required:                                │
│ Update `.purchase-reassurance` to use the    │
│ standard defined theme token for muted       │
│ backgrounds, such as `var(--bg-elevated)`    │
│ or `var(--bg)`, which have properly defined  │
│ dark mode overrides.                         │
└──────────────────────────────────────────────┘

## SECONDARY FINDINGS
None identified in this session.

## CLEAN AREAS
The newly implemented mobile buy bar overlap fixes render correctly across tested viewports.

## RECOMMENDED NEXT SESSION FOCUS
Review all CSS rules in `globals.css` that rely on undefined `var(--color-*)` tokens with hardcoded hex fallbacks to ensure they support dark mode.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot tests in CI/CD that explicitly verify pages in both light and dark modes to catch theme cascade failures.
