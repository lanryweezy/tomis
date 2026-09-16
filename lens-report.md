🔍 Lens: State Regression — CRITICAL — Mobile Navigation Close Button

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `TomisNav`, `TomisFooter`, `Hero`
- Viewports tested: 375px (Mobile portrait), 1280px (Desktop)
- Browsers tested: Chromium (via Playwright)
- States tested: Default, Focus states, Hover states, Mobile Menu Open
- Infrastructure available: Temporary Python Playwright script (automated infrastructure missing)

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: No
- Baseline age: N/A
- CI integration: No
- Gap identified: The repository currently lacks automated visual snapshot testing (e.g., Playwright, Chromatic) integrated into CI, requiring manual Python scripts for viewport testing.

## PRIMARY FINDING

[CRITICAL 🔴] Type: State Regression
Component: TomisNav Mobile Menu (apps/storefront/src/components/TomisNav.tsx)

What changed:
The focus state on the mobile menu's "Close menu" button is completely missing. When a user navigates to the close button using a keyboard (`Tab` key), there is no visual indication that the button is focused, making it extremely difficult for keyboard-only or screen reader users to know they can close the navigation drawer.

Baseline:
All interactive elements, including icon buttons (like the menu open button, theme toggle, cart icon), must display a clear focus ring when focused via keyboard. In this app, the baseline focus style is an accent-colored outline (e.g., `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`).

Current state:
The mobile menu "Close menu" button has no `focus-visible` outline classes applied to it. Consequently, it shows no focus ring when tabbed into. Confirmed via source code review and manual testing.

Reproduction steps:
1. Open the storefront application on a mobile viewport (e.g., 375px wide).
2. Click or tab to the hamburger menu icon and press Enter to open the mobile navigation.
3. Once the mobile navigation panel is open, press the `Tab` key to cycle focus through the interactive elements.
4. Observe that when focus should be on the "Close menu" button (the 'X' icon at the top right), there is no visual focus ring displayed.

Root cause (if identified):
In `apps/storefront/src/components/TomisNav.tsx`, the primary header buttons (like the menu toggle, theme toggle, and cart link) correctly use Tailwind classes for focus visibility: `className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-sm"`.
However, the "Close menu" button (line 113) inside the `AnimatePresence` mobile menu overlay completely omits these classes, using only inline styles for layout:
`<button aria-label="Close menu" onClick={() => setIsMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>`

Fix required:
Add the missing `className` string to the "Close menu" button in `apps/storefront/src/components/TomisNav.tsx` to match the other interactive icons:
`className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-sm"`
This ensures keyboard focus is clearly visible and restores accessibility.

## SECONDARY FINDINGS (if any)
- The "Stay in the loop" header in `TomisFooter` continues to render dark text on a dark background (Colour Drift, previously reported).

## CLEAN AREAS
The `TomisNav` desktop navigation links and utility icons (theme toggle, account, cart) properly implement focus states. The mobile menu open button correctly shows the focus ring.

## RECOMMENDED NEXT SESSION FOCUS
Review all overlay components (modals, dialogs, custom dropdowns) for missing focus states on their respective close buttons or dismiss triggers, as they are frequently implemented separately from main structural UI and often miss global focus utility classes.

## INFRASTRUCTURE RECOMMENDATION
Implement Playwright visual regression testing directly in the repository using `@playwright/test`. Specifically, configure tests to capture `.focus()` states on key interactive elements to prevent accessibility regressions automatically.
