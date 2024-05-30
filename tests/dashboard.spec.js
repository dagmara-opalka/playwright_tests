import { expect, test } from "@playwright/test";
import { url } from "inspector";



test.describe("Dashboard test", () => {
  test.only("quick payment with correct data", async ({ page }) => {
    //Arrange
    const url = "https://demo-bank.vercel.app/";
    const userID = "testerLO";
    const userPassword = "12345678";
    const loginInput = "login-input";
    const passwordInput = "password-input";
    const loginButton = "login-button";

    const reciverID = "2";
    const transferAmount = "120";
    const transferTitle = "Zwrot";
    const expectedTransferReceiver = 'Chuck Demobankowy!'
    //Act
    await page.goto(url);
    await page.getByTestId(loginInput ).fill(userID);
    await page.getByTestId(passwordInput).fill(userPassword);
    await page.getByTestId(loginButton).click();
    await page.locator("#widget_1_transfer_receiver").selectOption(reciverID);
    await page.locator("#widget_1_transfer_amount").click();
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").click();
    await page.locator("#widget_1_transfer_title").press("CapsLock");
    await page.locator("#widget_1_transfer_title").fill("Z");
    await page.locator("#widget_1_transfer_title").press("CapsLock");
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();
    //await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();
    
    //Assert
    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });
  test("sucessful mobile top-up Dagmara", async ({ page }) => {
    await page.goto(url);
    await page.getByTestId(loginInput).click();
    await page.getByTestId(passwordInput).fill(userID);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_topup_receiver").selectOption("502 xxx xxx");
    await page.locator("#widget_1_topup_amount").click();
    await page.locator("#widget_1_topup_amount").fill("140");
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByText("Doładowanie wykonane", { exact: true }).click();
    await page.getByLabel("Doładowanie wykonane").dblclick();
    await page.getByText("Doładowanie wykonane", { exact: true }).click();
    //Assert
    // await expect(page.getByTestId("ui-id-1")).toHaveText("Doładowanie wykonane");
    await expect(page.locator("#show_messages")).toHaveText(
      "Doładowanie wykonane! 140,00PLN na numer 502 xxx xxx"
    );
  });
});
