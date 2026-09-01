## 2024-05-24 - Passive Scroll Event Listeners
**Learning:** Unmarked scroll event listeners can degrade scroll performance by blocking the main thread while the browser waits to see if `preventDefault()` will be called.
**Action:** Always add `{ passive: true }` to `scroll`, `wheel`, `touchstart`, and `touchmove` event listeners when `preventDefault()` is not needed to ensure the browser can scroll asynchronously.
