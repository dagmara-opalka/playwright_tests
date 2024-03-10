import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('tester12');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('1111111a');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').dblclick();
  await page.getByTestId('login-button').click();
  await page.getByTestId('logout-button').click();
  await expect(page.getByRole('heading', {name: 'Wersja demonstracyjna serwisu'} )).toBeVisible();
  await expect(page.getByRole('heading', {name: 'Wersja demonstracyjna serwisu'} )).toHaveText('Wersja demonstracyjna serwisu Demobank');  
});