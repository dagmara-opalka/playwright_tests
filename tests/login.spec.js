import { expect, test } from "@playwright/test";


test.describe('User login to Demobank', () => {

  test.beforeEach(async ({ page }) => {
    //const url = "https://demo-bank.vercel.app/";
    await page.goto('/');
  
  });

  

  test("login with correct credentials", async ({ page }) => {

    //Arrange

const userPassword = "haslo123";
const userID = "testerLO";
const expectedUserName = "user-name";

  //Act
    await page.getByTestId("login-input").fill(userID);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click(userPassword);
    await expect(page.getByTestId(expectedUserName)).toBeVisible();
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("tester");
    await page.getByTestId('login-input').blur();
    await expect(page.getByTestId("error-login-id")).toHaveText("identyfikator ma min. 8 znaków");
  });
  test("unsuccessful login with too short password", async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('xyz');
    await page.getByTestId('password-input').blur();
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });
  

})
