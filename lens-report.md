🔍 Lens: Colour Drift — HIGH — TomisFooter Typography

## SCAN COVERAGE
What was scanned this session:
- Components reviewed: `Hero`, `FeaturedProducts`, `TomisFooter`, `TomisNav`, `WhatsAppChat`
- Viewports tested: 1280px (Desktop), 375px (Mobile portrait)
- Browsers tested: Chromium (Playwright headless)
- States tested: Default rendering, WhatsApp focus state, Mobile menu toggle focus state
- Infrastructure available: Temporary Python Playwright script

## VISUAL TESTING INFRASTRUCTURE STATUS
- Exists: No (temporary Python Playwright script used)
- Baseline age: N/A
- CI integration: No
- Gap identified: The application lacks automated visual regression testing infrastructure (e.g., Playwright, Chromatic) to catch styling and token regressions before deployment.

## PRIMARY FINDING

[HIGH 🟠] Type: Colour Drift
Component: TomisFooter (apps/storefront/src/components/TomisFooter.tsx)

What changed:
The "Stay in the loop" typography in the footer newsletter section is rendering as nearly black (`#101114`) on the dark inverted footer background, making it almost completely illegible due to an extreme contrast failure.

Baseline:
The "Stay in the loop" header should be rendered in a light color (e.g., `var(--inverted-text)` or similar) on the inverted surface of the footer, ensuring sufficient contrast and readability against the dark background.

Current state:
The "Stay in the loop" text is rendering in the default dark body text color (`var(--text-primary)` which resolves to `#101114` in light mode), resulting in black text on a nearly black background (`var(--inverted)`). Confirmed via screenshot on Desktop (1280x800).

Reproduction steps:
1. Open the storefront application at http://localhost:3000 at any viewport size.
2. Scroll to the bottom of the page to view the `TomisFooter` component.
3. Observe the "Stay in the loop" heading text positioned above the newsletter signup form on the left side of that row.
4. Notice that the text is extremely dark and illegible against the footer's dark background.

Root cause (if identified):
The `Text` component from `@astryxdesign/core/Text` is being used for the "Stay in the loop" heading:
`<Text type="body" weight="medium" style={{ marginBottom: '0.25rem' }}>Stay in the loop</Text>`
Since it doesn't have an explicit color override like the accompanying subtext (`<Text type="supporting" style={{ color: 'var(--inverted-text-muted)' }}>...`), the `Text` component falls back to its default design token for body text color, which is likely resolving to the global `var(--text-primary)`. In the current light mode default, `var(--text-primary)` is dark (`#101114`), causing it to fail on the inverted footer surface.

Fix required:
Update the `Text` component for the "Stay in the loop" heading in `apps/storefront/src/components/TomisFooter.tsx` to explicitly use the inverted text color token. Add `color: 'var(--inverted-text)'` to its style prop:
`<Text type="body" weight="medium" style={{ marginBottom: '0.25rem', color: 'var(--inverted-text)' }}>Stay in the loop</Text>`
This matches the pattern used for other text elements within the inverted footer surface.

## SECONDARY FINDINGS (if any)
None.

## CLEAN AREAS
The `WhatsAppChat` floating button focus state has been reviewed, and the visual test run successfully targeted the components in question. The navigation layout (`TomisNav`) remains consistent across desktop and mobile.

## RECOMMENDED NEXT SESSION FOCUS
Investigate all usages of global text components (`Text`, `Heading`) inside inverted surfaces (like `TomisFooter` or dark overlay sections) to ensure none are missing explicit inverted color overrides, as the design system doesn't appear to automatically invert text tokens contextually.

## INFRASTRUCTURE RECOMMENDATION
Implement automated visual snapshot testing using Playwright with a baseline comparison, specifically focusing on cross-surface component rendering (default vs inverted surfaces) to catch contrast failures automatically.
