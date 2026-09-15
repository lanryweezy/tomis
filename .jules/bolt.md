## 2024-05-18 - Avoid unnecessary re-renders in global providers
**Learning:** In Next.js app router apps, using global React context providers like `CartProvider` wrapping the entire app without memoizing the context values leads to cascading re-renders across all consumer components whenever the context state updates (or even on unrelated parent renders).
**Action:** Always wrap context values provided to Context.Provider with `useMemo` when providing objects or arrays.
## 2025-05-18 - Memoizing components inside map iterations
**Learning:** In React, when rendering large lists where items can be filtered dynamically (like in the shop page), memoizing the card component with `React.memo` prevents O(N) unnecessary re-renders of list items whose props haven't changed.
**Action:** Apply `React.memo` to list item components like `ProductCard` to reduce React's rendering workload during filtering operations.
