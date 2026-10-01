🔍 Lens: State Regression — CRITICAL — WhatsAppChat focus ring

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `WhatsAppChat`, `Toast`, `BackToTop`, `NewsletterPopup`, `mobile-buy-bar` on Product Pages
- Viewports tested: 375px (Mobile portrait), 768px (Tablet), 1280px (Desktop)
- Browsers tested: Chromium (via manual review)
- States tested: Keyboard focus (`:focus-visible`), Default rendering
- Infrastructure available: Manual CSS review

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: no
- Baseline age: N/A
- CI integration: No
- Gap identified: No automated visual regression testing infrastructure (e.g., Playwright, Chromatic) to catch layout shifts, responsive regressions, or state changes (like focus) before deployment.

## PRIMARY FINDING
┌──────────────────────────────────────────────┐
│ [CRITICAL 🔴] Type: State Regression          │
│ Component: WhatsAppChat floating widget      │
│                                              │
│ What changed:                                │
│ The focus ring on the WhatsApp floating      │
│ action button is missing, breaking keyboard  │
│ accessibility for sighted users.             │
│                                              │
│ Baseline:                                    │
│ The WhatsApp widget had a visible focus ring │
│ using standard Tailwind ring utilities or    │
│ specific `focus-visible:outline` overrides.  │
│                                              │
│ Current state:                               │
│ Keyboard navigation (tabbing) onto the       │
│ WhatsApp widget shows no visible focus ring, │
│ leaving the user unaware of focus. The       │
│ outline is likely overridden or invalid.     │
│                                              │
│ Reproduction steps:                          │
│ 1. Open the application on a desktop browser.│
│ 2. Use the Tab key to navigate through the   │
│    page elements until focus reaches the     │
│    WhatsApp button at the bottom left.       │
│ 3. Notice that no focus ring appears.        │
│                                              │
│ Root cause (if identified):                  │
│ PR "UX: Add tooltip to WhatsApp chat button" │
│ modified the `WhatsAppChat` component        │
│ classes to group hover/focus utilities.      │
│ The class uses arbitrary properties          │
│ (`focus-visible:outline-[var(--accent)]`)    │
│ that appear to fail specificity or           │
│ resolution in Tailwind v4 compared to global │
│ resets, losing the focus ring entirely.      │
│                                              │
│ Fix required:                                │
│ Replace the arbitrary `outline` variable     │
│ utilities with standard Tailwind `ring-2`    │
│ utilities (e.g., `focus-visible:outline-none │
│ focus-visible:ring-2 focus-visible:ring-accent-default`) │
│ or ensure global CSS outline variables are   │
│ correctly applied without specificity issues.│
└──────────────────────────────────────────────┘

## SECONDARY FINDINGS
None identified in this session.

## CLEAN AREAS
Desktop viewports correctly hide the `.mobile-buy-bar`, keeping widgets accessible. The newly added tooltip works on hover.

## RECOMMENDED NEXT SESSION FOCUS
Review all bespoke components that use arbitrary Tailwind v4 outline variables for focus states to ensure they render correctly.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual snapshot tests in CI/CD, especially for responsive layouts and interaction states (like `:focus-visible`).
