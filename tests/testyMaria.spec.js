import { expect, test } from "@playwright/test";

test.describe("mobile top-up", () => {
  test.only("successful mobile top-up", async ({ page }) => {
    //Login
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("testerLO");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("haslo123");
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("user-name")).toBeVisible();

    //mobile Top-up
    await page.locator("#widget_1_topup_receiver").selectOption("500 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("50");
    await page.getByText("zapoznałem się z regulaminem").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await expect(page.getByText("Doładowanie wykonane!Kwota:")).toBeVisible()
    await page.getByTestId("close-button").click()
    await expect(page.getByRole("link", { name: "Doładowanie wykonane! 50," })).toBeVisible()
  });
});
