## 2024-11-20 - Memoizing Global Context Values
**Learning:** In Next.js with global context providers (like `CartProvider`), passing unmemoized objects (e.g. `value={{ items, itemCount, ... }}`) causes all consuming components to re-render whenever the provider re-renders, even if the actual state hasn't changed.
**Action:** Always memoize the context `value` object and expensive derived states (like array reductions for subtotals) using `useMemo` in global providers to prevent cascading re-renders across the app.
