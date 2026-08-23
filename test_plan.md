1. Add focus-visible rings to `TomisNav.tsx`
- Add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-sm` to:
    - Mobile menu toggle button
    - Theme toggle button
    - Account link
    - Cart link
    - Mobile menu close button

2. Fix focus-visible on `WhatsAppChat.tsx`
- Update the `motion.button` className to use standard tailwind `ring` utilities: `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--whatsapp-green,#25D366)] focus-visible:outline-none`.

3. Ensure standard regression testing passes.
