## 2024-05-18 - Avoid unnecessary re-renders in global providers
**Learning:** In Next.js app router apps, using global React context providers like `CartProvider` wrapping the entire app without memoizing the context values leads to cascading re-renders across all consumer components whenever the context state updates (or even on unrelated parent renders).
**Action:** Always wrap context values provided to Context.Provider with `useMemo` when providing objects or arrays.
## 2024-05-19 - Cache static expensive derivations in modules
**Learning:** Functions that process large amounts of static data (e.g., generating a unique list of colors by iterating over all products and variants O(N*M)) can be performance bottlenecks if they are called frequently (like during API route execution or component rendering) and left unmemoized.
**Action:** When working with module-level static datasets in Next.js/Node.js, introduce a simple module-level cache variable to store the result of expensive derivations. Update the getter function to calculate the result once, cache it, and return the cached value on subsequent calls.
