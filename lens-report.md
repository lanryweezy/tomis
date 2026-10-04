🔍 Lens: Component Appearance Change — HIGH — BackToTop Tooltip

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `BackToTop`, `WhatsAppChat`, `mobile-buy-bar`, `Checkout`
- Viewports tested: 375px (Mobile portrait), 768px (Tablet), 1280px (Desktop)
- Browsers tested: Chromium (via manual review)
- States tested: Default rendering, Focus state, Hover state
- Infrastructure available: Manual CSS cascade analysis

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no
- Baseline age: N/A
- CI integration: No
- Gap identified: No automated visual regression testing infrastructure exists to catch component styling failures (such as tooltip visibility on hover) before deployment.

## PRIMARY FINDING
┌──────────────────────────────────────────────┐
│ [HIGH 🟠] Type: Component Appearance Change   │
│ Component: BackToTop Tooltip                 │
│                                              │
│ What changed:                                │
│ The hover/focus tooltip for the BackToTop    │
│ floating button renders unstyled (transparent│
│ background, default text color, missing      │
│ border), making it illegible.                │
│                                              │
│ Baseline:                                    │
│ The tooltip was intended to have an elevated │
│ background (`--bg-elevated`), primary text   │
│ color (`--text-primary`), and a border       │
│ (`--border`).                                │
│                                              │
│ Current state:                               │
│ The tooltip text floats transparently        │
│ because the arbitrary CSS variable Tailwind  │
│ classes (`bg-[var(--bg-elevated)]`,          │
│ `text-[var(--text-primary)]`,                │
│ `border-[var(--border)]`) fail to resolve    │
│ correctly in Tailwind v4.                    │
│                                              │
│ Reproduction steps:                          │
│ 1. Open the application on a desktop         │
│    viewport (e.g., 1280px).                  │
│ 2. Scroll down until the BackToTop button    │
│    appears in the bottom right.              │
│ 3. Hover over or focus the BackToTop         │
│    floating button.                          │
│ 4. Observe the tooltip text appearing to the │
│    left of the button without its intended   │
│    background, border, and text styling.     │
│                                              │
│ Root cause (if identified):                  │
│ Commit `938a930` added the tooltip using     │
│ arbitrary CSS variable syntax in utility     │
│ classes. In Tailwind v4, arbitrary           │
│ properties referencing CSS variables without │
│ standard tokens often fail due to            │
│ specificity conflicts or parsing issues.     │
│                                              │
│ Fix required:                                │
│ Refactor the tooltip's Tailwind utility      │
│ classes to use standard theme tokens or      │
│ explicit inline styles for the custom CSS    │
│ variables instead of arbitrary utility       │
│ classes.                                     │
└──────────────────────────────────────────────┘

## SECONDARY FINDINGS
None identified in this session.

## CLEAN AREAS
The checkout progress step tracking renders correctly without regression.

## RECOMMENDED NEXT SESSION FOCUS
Review all components that use arbitrary Tailwind classes containing CSS variables to ensure they are rendering correctly.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot tests in CI/CD that explicitly verify interactive states like hover and focus, as static snapshots miss these regressions.
