import { test, expect } from '@playwright/test';

// allow a little more time for server start and interactions
test.setTimeout(60_000);

test.describe('Visa search form validation', () => {
  test('shows helper and disables Search when fields are empty, enables when filled', async ({ page }) => {
    await page.goto('http://localhost:3000/visas');
    await page.waitForLoadState('networkidle');

    const searchBtn = page.getByTestId('search-button');

    // Clear selects by selecting the empty option using testids
    const visaFor = page.getByTestId('visa-for-select');
    const countryTo = page.getByTestId('country-to-select');
    const nationality = page.getByTestId('nationality-select');
    const living = page.getByTestId('living-select');
    await visaFor.selectOption('');
    await countryTo.selectOption('');
    await nationality.selectOption('');
    await living.selectOption('');
    // Clear the hidden date input directly (sr-only clear button is not clickable in headless)
    await page.fill('input[data-testid="travel-date-input"]', '');

    // Wait a tick for React updates
    await page.waitForTimeout(200);

    await expect(searchBtn).toBeDisabled();
    await expect(page.getByText('Please fill all fields to search.')).toBeVisible();

    // Fill the selects with valid values using testids
    await visaFor.selectOption('Tourist');
    await countryTo.selectOption('Austria');
    await nationality.selectOption('United Arab Emirates');
    await living.selectOption('United Arab Emirates');

    // Set a travel date using the hidden date input (easier for e2e)
    await page.fill('input[data-testid="travel-date-input"]', '2025-12-25');
    await page.waitForTimeout(200);

    await expect(searchBtn).toBeEnabled();
    await expect(page.getByText('Please fill all fields to search.')).not.toBeVisible();
  });
});
