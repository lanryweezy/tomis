## 2024-05-18 - Avoid unnecessary re-renders in global providers
**Learning:** In Next.js app router apps, using global React context providers like `CartProvider` wrapping the entire app without memoizing the context values leads to cascading re-renders across all consumer components whenever the context state updates (or even on unrelated parent renders).
**Action:** Always wrap context values provided to Context.Provider with `useMemo` when providing objects or arrays.

## 2024-05-18 - Memoize current index to prevent O(N^2) in loop map
**Learning:** Calling `findIndex` inside a `map` loop creates an O(N^2) time complexity because `findIndex` itself traverses the array, leading to performance issues if the array grows large or is called frequently.
**Action:** When mapping over an array and referencing an index derived from `findIndex`, always memoize the derived index outside the loop to keep the map operation O(N).
