import { expect, test } from "@playwright/test";

test.describe("Dashboard test", () => {
  test("quick payment with correct data", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testerLO");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").click();
    await page.locator("#widget_1_transfer_amount").fill("120");
    await page.locator("#widget_1_transfer_title").click();
    await page.locator("#widget_1_transfer_title").press("CapsLock");
    await page.locator("#widget_1_transfer_title").fill("Z");
    await page.locator("#widget_1_transfer_title").press("CapsLock");
    await page.locator("#widget_1_transfer_title").fill("Zwrot");
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();
    //await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();
    await expect(page.locator("#show_messages")).toHaveText(
      "Przelew wykonany! Chuck Demobankowy - 120,00PLN - Zwrot"
    );
  });
  test.only("sucessful mobile top-up Dagmara", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("testerDa");
    await page.getByTestId("password-input").fill("haslo123");
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_topup_receiver").selectOption("502 xxx xxx");
    await page.locator("#widget_1_topup_amount").click();
    await page.locator("#widget_1_topup_amount").fill("140");
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByText("Doładowanie wykonane", { exact: true }).click();
    await page.getByLabel("Doładowanie wykonane").dblclick();
    await page.getByText("Doładowanie wykonane", { exact: true }).click();
    // await expect(page.getByTestId("ui-id-1")).toHaveText("Doładowanie wykonane");
    await expect(page.locator("#show_messages")).toHaveText("Doładowanie wykonane! 140,00PLN na numer 502 xxx xxx");
  });
});
