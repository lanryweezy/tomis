1. Update NewsletterPopup.tsx: Change the email input wrapper from a `div` to a `form` element. This will allow users to submit the newsletter form by pressing the "Enter" key, which is a standard UX expectation. Add the `required` attribute to the email input for native validation.
2. Update TomisFooter.tsx: Similarly, wrap the footer's newsletter input and subscribe button in a `form` element so that pressing "Enter" triggers the form submission.
3. Verify changes by checking for any syntax errors and running the lint step.
4. Record the learning in `.Jules/palette.md`.
