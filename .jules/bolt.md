## 2024-05-24 - Unmemoized Global Context in Next.js App Router
**Learning:** Unmemoized global context providers at the layout level in Next.js cause cascading client-side re-renders across the app. The context `value` object reference changes on every parent render, defeating React's bail-out mechanisms for consuming components.
**Action:** Always memoize the context `value` object and derived state reductions (e.g., array.reduce) using `useMemo` in global context providers.
