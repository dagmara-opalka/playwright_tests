import { expect, test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/");
  await page.getByTestId("login-input").click();
  await page.getByTestId("login-input").fill("testerLO");
  await page.getByTestId("password-input").click();
  await page.getByTestId("password-input").fill("haslo123");
  await page.getByTestId("login-button").click();
  await expect(page.getByTestId("user-name")).toBeVisible();
});
