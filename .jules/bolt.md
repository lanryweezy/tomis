## 2025-01-08 - UseMemo in Context Providers
**Learning:** For React global context providers such as `CartProvider`, passing an inline object directly to `value` (e.g. `value={{ items, addItem }}`) can cause widespread performance bottlenecks by triggering cascading re-renders across all consumer components whenever the provider's parent re-renders or an unrelated state updates.
**Action:** Always memoize the context `value` object, as well as any expensive derived states (like array reductions), using `useMemo` with proper dependencies to prevent unnecessary component re-renders.
