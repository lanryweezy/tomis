## 2024-05-18 - Avoid unnecessary re-renders in global providers
**Learning:** In Next.js app router apps, using global React context providers like `CartProvider` wrapping the entire app without memoizing the context values leads to cascading re-renders across all consumer components whenever the context state updates (or even on unrelated parent renders).
**Action:** Always wrap context values provided to Context.Provider with `useMemo` when providing objects or arrays.
