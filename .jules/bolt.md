## 2024-05-18 - Avoid unnecessary re-renders in global providers
**Learning:** In Next.js app router apps, using global React context providers like `CartProvider` wrapping the entire app without memoizing the context values leads to cascading re-renders across all consumer components whenever the context state updates (or even on unrelated parent renders).
**Action:** Always wrap context values provided to Context.Provider with `useMemo` when providing objects or arrays.

## 2024-05-18 - Memoize current index to prevent O(N^2) in loop map
**Learning:** Calling `findIndex` inside a `map` loop creates an O(N^2) time complexity because `findIndex` itself traverses the array, leading to performance issues if the array grows large or is called frequently.
**Action:** When mapping over an array and referencing an index derived from `findIndex`, always memoize the derived index outside the loop to keep the map operation O(N).
## 2024-05-24 - Memoize Array Building on Static Data Collections
**Learning:** In Next.js client and server environments, complex filtering and mapping algorithms over large static datasets (like building a unique list of properties from a large list of objects) can trigger expensive $O(N \times M)$ overhead if executed synchronously during hot paths (such as React rendering hooks, layout building, or server side `generateStaticParams`). In this codebase, the `getUniqueColors` utility executed nested loops over static data on every single API request, shop page re-render, and site map generation.
**Action:** When a global utility function processes static or semi-static app-level configuration data (such as product color variants from a mock database or headless CMS response that doesn't change per-session), apply module-level memoization. Declaring a lazy global let (e.g. `let cachedResult = null`) at the module scope and returning it immediately significantly decreases processing time (reducing 10k execution loops from ~47ms to 5ms) without requiring Next.js explicit React Context or API route caching.

## 2024-10-24 - Memoize backend cart summary calculations
**Learning:** In the backend API (e.g. Next.js route handlers like `apps/storefront/src/app/api/cart/route.ts`), repeated iterative operations on the same data array (like calling `cart.reduce` multiple times to calculate `itemCount` and `subtotal` inline) cause unnecessary CPU overhead, especially across multiple HTTP methods (GET, POST, PUT, DELETE).
**Action:** When a route handler needs to compute a derived summary object from an array (like a shopping cart), extract the calculation logic into a single helper function that performs the calculation efficiently (e.g., using a single `for` loop) and reuse this helper across all HTTP methods. This standardizes the response, keeps the code DRY, and improves execution time.

## $(date +%Y-%m-%d) - [Combine iteration in backend logic]
**Learning:** In the backend API (e.g. Next.js route handlers like `apps/storefront/src/app/api/orders/route.ts`), iterating over the same list consecutively multiple times, such as generating order item array via `for` loop and then iterating over it again to calculate a subtotal using `reduce`, creates redundant CPU overhead.
**Action:** When deriving values or objects from a loop, execute the calculation synchronously within the primary initial build loop, preventing the need to iterate twice on the same data.

## $(date +%Y-%m-%d) - Combine iteration in backend logic
**Learning:** In the backend API (e.g. Next.js route handlers like `apps/storefront/src/app/api/orders/route.ts`), iterating over the same list consecutively multiple times to extract independent statistics (such as using multiple `.filter()` methods to count occurrences of different statuses) creates redundant CPU overhead and runs in O(N * M) time where M is the number of filters.
**Action:** When extracting multiple counts or derived values from an array, execute the calculation synchronously within a single primary loop (e.g., a basic `for` loop) to traverse the array only once, dropping the complexity to O(N).

## $(date +%Y-%m-%d) - Combine iterations on static lists for UI stats
**Learning:** In frontend React components (like `apps/storefront/src/app/admin/inventory/page.tsx`), iterating over the same static array multiple times sequentially (e.g., calling `.reduce()` to sum totals, and then multiple `.filter().length` calls for distinct counts) creates unnecessary O(N) operations. While V8 is fast, this scales poorly as the array size increases and generates redundant CPU overhead.
**Action:** When calculating multiple distinct aggregates or counts from a single array, use a single `for` loop pass to compute all metrics simultaneously, dropping the operation from O(N * M) to strictly O(N).
