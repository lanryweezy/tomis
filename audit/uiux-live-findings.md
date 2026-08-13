# Tomis live UI/UX findings

The live homepage at https://tomis.fit was inspected on 13 August 2026. The first viewport presents a strong editorial hero with clear SHOP NOW and DISCOVER TOMIS calls to action. The desktop header has clear primary navigation, account, cart, and theme controls.

The live page still shows the earlier merged deployment rather than the latest branch changes: the announcement strip repeats its three messages, the homepage colour tiles all link to /shop without preserving colour intent, and the footer still exposes Instagram, Twitter, and TikTok placeholder destinations plus generic company/support/legal routes. These are deployment-state observations; the branch contains corrections for the affected surfaces.

The live lower-page experience also opens a newsletter modal while browsing. The modal has a clear offer and visible close/No thanks controls, but its form was previously a client-only success path and the background page remains visually busy behind the overlay. The branch now sends the subscription to the newsletter API, exposes error/status feedback, supports Escape dismissal, locks background scroll, and stacks the form on mobile.

The homepage visual system is compelling but highly editorial: large typography, full-bleed photography, and dense marquee copy create a strong brand impression. The main conversion risks are catalogue/discovery truthfulness, mobile filter usability, and purchase-flow clarity rather than the core visual direction.

The branch UI/UX fixes include colour-preserving homepage links, a mobile Shop filter, no-results recovery, responsive cart/checkout/PDP layouts, a free-shipping progress cue, removal of empty styling placeholders, corrected checkout back-labeling, real promo feedback, and accessible mobile navigation semantics.
