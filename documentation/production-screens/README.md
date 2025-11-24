# Production Screens — `elite-path-visa-project`

This folder contains production captures and the automated comparison report for the Checkout Modal on the `/visas/united-states` page.

Files included
- `checkout-modal-desktop-prod.png` — Desktop screenshot captured from production (1280×720 viewport).
- `checkout-modal-mobile-prod.png` — Mobile screenshot captured from production (375×667 viewport).
- `capture_diff_report.json` — JSON report produced by the capture and diff script; contains per-device results, pixel counts, and timestamps.

Captured
- Timestamp (UTC): 2025-11-24T16:56:11Z — capture and diff run performed against the production URL `https://elite-path-visa-project-lngxx848i-nayer-raoufs-projects.vercel.app/visas/united-states`.

How these were generated
- Script: `tmp/capture_and_diff.js` — a Playwright script that:
  1. Navigates to the production URL
  2. Clicks the first `Add to Cart` button on the visa page
  3. Opens the cart and waits for the checkout modal
  4. Captures desktop + mobile screenshots of the modal
  5. Compares captured images against the baseline snapshots stored in `e2e/visual.spec.ts-snapshots` using `pixelmatch` and writes a JSON report

Re-run locally
1. Ensure Playwright and dev dependencies are installed:

```pwsh
npx playwright install --with-deps
npm install --no-save --silent
```

2. Run the capture script (Windows PowerShell):

```pwsh
node "tmp/capture_and_diff.js"
```

Notes
- Baseline snapshots used for comparison live in `e2e/visual.spec.ts-snapshots/`.
- The script writes artifacts to `tmp/` and the committed copies are stored here for historical records.
- Pixel-match sensitivity: `pixelmatch` was used with a threshold tuned for minor anti-aliasing; see `tmp/capture_and_diff.js` to adjust options.

If you want these stored in a timestamped subfolder (e.g. `modal-2025-11-24T1656Z`) instead of root, tell me and I can move them and commit the change.
