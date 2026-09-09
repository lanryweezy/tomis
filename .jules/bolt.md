## 2024-09-09 - Missing memoization in global context providers
**Learning:** Next.js cascading re-renders can be triggered across consuming components by unmemoized derived states and context value objects in global providers like CartProvider.
**Action:** Always memoize derived state (like array reductions) and the context value object passed to Provider using `useMemo` to ensure stable references and prevent unnecessary re-renders of all consumer components.
