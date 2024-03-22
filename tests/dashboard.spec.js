import { expect, test } from "@playwright/test";

test.describe('Dashboard test', () => {
    test.only("login to dashboard", async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('12345678');
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').click();
    await page.locator('#widget_1_transfer_amount').fill('120');
    await page.locator('#widget_1_transfer_title').click();
    await page.locator('#widget_1_transfer_title').press('CapsLock');
    await page.locator('#widget_1_transfer_title').fill('Z');
    await page.locator('#widget_1_transfer_title').press('CapsLock');
    await page.locator('#widget_1_transfer_title').fill('Zwrot');
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();
    await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click(); 
});
})