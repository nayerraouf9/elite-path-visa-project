# Production Capture Workflow

This document explains the `production-capture.yml` GitHub Actions workflow and where it stores the captured production snapshots.

What the workflow does
- Trigger: the workflow runs on `deployment_status: success`, `push` to `main`, and can be run manually (`workflow_dispatch`).
- Steps:
  1. Check out the repository and install Node.js and dependencies.
  2. Install Playwright browsers (`npx playwright install --with-deps`).
  3. Run the capture script: `tmp/capture_and_diff.js`.
     - The script navigates to a production URL, clicks the first **Add to Cart** button on the visa page, opens the checkout modal, captures desktop/mobile screenshots of the modal, and compares those images against the baseline snapshots in `e2e/visual.spec.ts-snapshots` using `pixelmatch`.
  4. Upload artifacts as a workflow artifact for manual download.
  5. Move the artifacts into a timestamped folder under `documentation/production-screens/modal-<UTC-timestamp>/` and commit them back to `main`.

Where artifacts are saved
- Artifacts captured by the workflow are first written to `tmp/` on the runner, then moved into a timestamped path in the repository, for example:

  `documentation/production-screens/modal-2025-11-24T1656Z/`

  That folder contains:
  - `checkout-modal-desktop-prod.png`
  - `checkout-modal-mobile-prod.png`
  - `capture_diff_report.json`
  - optionally `diff-desktop.png` and `diff-mobile.png` (pixel-diff images)

Notes and important considerations
- The workflow commits artifacts back to `main` using the provided `GITHUB_TOKEN`. Depending on your repository or organization policies, pushes from the Actions runner may be restricted — if commits fail, check branch protection rules and organization settings.
- Triggering:
  - `deployment_status: success` relies on GitHub Deployment events. If your deployment provider (e.g., Vercel) does not emit GitHub deployment events, the workflow will still run on `push` to `main` and can be run manually.
  - If you want the workflow to run only after a successful Vercel production deploy, you can wire a Vercel webhook to call the workflow (or configure Vercel to create GitHub deployment events).
- PROD URL: the workflow uses a hard-coded `PROD_URL` environment variable in the workflow (set in the `Run capture and diff` step). Update that value if your production domain changes.
- Runner OS: the workflow runs on `ubuntu-latest`. The capture script and Playwright are cross-platform, but be mindful of any OS-specific behavior when adjusting the script.
- Repository growth: committing binary images to the repo increases repo size over time. Consider pruning old captures or committing only diffs or metadata if this becomes an issue.

How to run locally (for debugging)
1. Install dependencies and Playwright browsers:

```pwsh
npx playwright install --with-deps
npm ci
```

2. Run the capture script (PowerShell):

```pwsh
node "tmp/capture_and_diff.js"
```

Where to find the workflow file
- The workflow source is in: `.github/workflows/production-capture.yml`

Questions or changes
- If you want the workflow to only commit artifacts when a non-zero pixel diff is detected, I can update the job to conditionally commit based on `capture_diff_report.json`.
- If you prefer artifacts to be stored in an external storage (S3, GCS) or as GitHub Releases instead of in the repo, I can change the workflow to upload them to a bucket or create a release asset.
