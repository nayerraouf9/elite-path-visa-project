import { test, expect } from '@playwright/test';

// allow a little more time for server start and interactions
test.setTimeout(60_000);

test.describe('Visa search form validation', () => {
  test('shows helper and disables Search when fields are empty, enables when filled', async ({ page }) => {
    await page.goto('http://localhost:3000/visas');
    await page.waitForLoadState('networkidle');

    const searchBtn = page.getByRole('button', { name: 'Search' });

    // Clear selects by selecting the empty option (operate on each select in the form)
    const selects = page.locator('form select');
    await selects.nth(0).selectOption('');
    await selects.nth(1).selectOption('');
    await selects.nth(2).selectOption('');
    await selects.nth(3).selectOption('');
    // specifically clear the date using the clear button
    const clearDate = page.locator('button[aria-label="Clear date"]');
    await clearDate.click();

    // Wait a tick for React updates
    await page.waitForTimeout(200);

    await expect(searchBtn).toBeDisabled();
    await expect(page.getByText('Please fill all fields to search.')).toBeVisible();

    // Fill the selects with valid values
    await selects.nth(0).selectOption('Tourist');
    await selects.nth(1).selectOption('Austria');
    await selects.nth(2).selectOption('United Arab Emirates');
    await selects.nth(3).selectOption('United Arab Emirates');

    // Set a travel date using the hidden date input (easier for e2e)
    await page.fill('input[data-testid="travel-date-input"]', '2025-12-25');
    await page.waitForTimeout(200);

    await expect(searchBtn).toBeEnabled();
    await expect(page.getByText('Please fill all fields to search.')).not.toBeVisible();
  });
});
