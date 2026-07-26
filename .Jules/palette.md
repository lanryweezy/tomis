## 2026-07-26 - Adding Accessible Labels to Forms
**Learning:** Adding `htmlFor` and `id` attributes effectively ties form fields to visual labels, improving usability for screen readers and increasing hit area. When visual labels are intentionally omitted (e.g. newsletter signups), `aria-label` should be used.
**Action:** Always ensure inputs have associated labels (`<label htmlFor="...">` + `<input id="...">`) or an `aria-label` for screen readers.
