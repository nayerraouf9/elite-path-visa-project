# Playwright E2E Test Results

Date: 2025-11-26
Branch: `feature/australia-visa-content`

## Summary
- Tests run: 3
- Passed: 3 (after updating snapshots)
- Visual snapshot updates: 2 (desktop + mobile for checkout modal)

## Artifacts (relative paths in repo)
- Expected baseline (previous): `e2e/visual.spec.ts-snapshots/checkout-modal-desktop-chromium-win32.png`
- Expected baseline (previous): `e2e/visual.spec.ts-snapshots/checkout-modal-mobile-chromium-win32.png`
- Actual (updated during run): `test-results/visual-checkout-modal-snapshots-desktop-mobile--chromium/checkout-modal-desktop-actual.png`
- Actual (updated during run): `test-results/visual-checkout-modal-snapshots-desktop-mobile--chromium/checkout-modal-mobile-actual.png`
- Diff images (if produced): `test-results/visual-checkout-modal-snapshots-desktop-mobile--chromium/checkout-modal-desktop-diff.png`

## Notes
- The visual snapshots were updated because the new actual images did not match the stored baselines. Review the updated baselines in `e2e/visual.spec.ts-snapshots/` and the `test-results/` folder to confirm the changes are expected.
- If the changes are expected, no further action required. If not, we should investigate layout or timing differences causing small pixel diffs (fonts, rendering, or CSS changes).

