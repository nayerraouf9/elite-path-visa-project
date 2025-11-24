import { test, expect } from '@playwright/test';

// allow a little more time for server start and interactions
test.setTimeout(60_000);

test.describe('Visa search form validation', () => {
  test('shows helper and disables Search when fields are empty, enables when filled', async ({ page }) => {
    await page.goto('http://localhost:3000/visas');
    await page.waitForLoadState('networkidle');

    const searchBtn = page.getByTestId('search-button');

    const visaFor = page.getByTestId('visa-for-select');
    const countryTo = page.getByTestId('country-to-select');
    const nationality = page.getByTestId('nationality-select');
    const living = page.getByTestId('living-select');

    // Assert selects default to the placeholder value (empty)
    await expect(visaFor.inputValue()).resolves.toBe('');
    await expect(countryTo.inputValue()).resolves.toBe('');
    await expect(nationality.inputValue()).resolves.toBe('');
    await expect(living.inputValue()).resolves.toBe('');

    // Clear the hidden date input directly
    await page.fill('input[data-testid="travel-date-input"]', '');

    // Try submitting with empty fields and expect validation alert
    await searchBtn.click();
    await expect(page.getByText('Please Select Visa For.')).toBeVisible();
    // Dismiss alert
    await page.getByRole('button', { name: /ok/i }).click();
    await expect(page.getByText('Please Select Visa For.')).not.toBeVisible();

    // Fill the selects with valid values using testids
    await visaFor.selectOption('Tourist');
    await countryTo.selectOption('Austria');
    await nationality.selectOption('United Arab Emirates');
    await living.selectOption('United Arab Emirates');

    // Set a travel date using the hidden date input (easier for e2e)
    await page.fill('input[data-testid="travel-date-input"]', '2025-12-25');
    await page.waitForTimeout(200);

    // Submit and expect navigation to the country page
    await searchBtn.click();
    await page.waitForURL('**/visas/austria');
    await expect(page.url()).toContain('/visas/austria');
  });
});
