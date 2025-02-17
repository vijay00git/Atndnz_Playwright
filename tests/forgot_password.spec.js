import { test, expect } from '@playwright/test';
import testData from '../data/testData.json';
import {logout} from '../utils/auth.js';

test.describe('forgot password', () => {

test("Check response when the user clicks the 'Forgot Password?' button.", async ({ page }) => {
    // Open login page
    await page.goto('https://uat-atndnz.offrd.co/');
    // Click the 'Forgot Password?' button
    await page.click(".forgot-password-link");
    //  Wait for the 'Forgot Password' section to load (this can be specific to the page load behavior)
    await page.waitForSelector("div[class='landing-box'] h5", { timeout: 5000 });
    //  Ensure user stays on the same page (check if URL hasn't changed)
    await expect(page).toHaveURL('https://uat-atndnz.offrd.co/');
    console.log("The page is still on the same URL.");
    // Assertion: Check the text inside 'h5' to verify the 'Forgot Password' label
    const element = page.locator("div[class='landing-box'] h5");
    await expect(element).toHaveText("Forgot Password");
    console.log("'Forgot password' text is showing");
    // Assertion: Check the 'Send OTP' button value
    const button = page.locator("input[value='Send OTP']");
    await expect(button).toHaveValue("Send OTP");   
    // Log to confirm button is displayed
    console.log("Send OTP Button is displayed"); });

test("Check response in the 'Forgot Password?' page when the user enters invalid email address and clicks 'Send OTP' button.", async ({ page }) => {
    // Open login page
    await page.goto('https://uat-atndnz.offrd.co/');
    // Click the 'Forgot Password?' button
    await page.click(".forgot-password-link");
    //  Wait for the 'Forgot Password' section to load (this can be specific to the page load behavior)
    await page.fill("input[placeholder='Email']", testData.invalidmail.email);
    await page.click("input[value='Send OTP']");
    const toastMessage = page.locator('[id="\\31 "]'); 
    await expect(toastMessage).toBeVisible({ timeout: 5000 }); // Wait up to 5 seconds
    //  Verify error message text
    await expect(toastMessage).toContainText('Please enter a valid Email'); 
     //  Get the text from the toast message
     const errorText = await toastMessage.innerText();
     console.log("Error Message Displayed:", errorText);
    });


test("Check response in the 'Forgot Password?' page when the user enters not registered email address and clicks 'Send OTP' button.", async ({ page }) => {
    // Open login page
    await page.goto('https://uat-atndnz.offrd.co/');
    // Click the 'Forgot Password?' button
    await page.click(".forgot-password-link");
    //  Wait for the 'Forgot Password' section to load (this can be specific to the page load behavior)
    await page.fill("input[placeholder='Email']", testData.notRegisteredMail.email);
    await page.click("input[value='Send OTP']");
    const toastMessage = page.locator('[id="\\31 "]'); 
    await expect(toastMessage).toBeVisible({ timeout: 5000 }); // Wait up to 5 seconds
    //  Verify error message text
    await expect(toastMessage).toContainText('Company not yet registered'); 
    //  Get the text from the toast message
    const errorText = await toastMessage.innerText();
    console.log("Error Message Displayed:", errorText);
        });
test("Check response in the 'Forgot Password?' page when the user clicks 'Cancel' button.", async ({ page }) => {
    // Open login page
    await page.goto('https://uat-atndnz.offrd.co/');
    // Click the 'Forgot Password?' button
    await page.click(".forgot-password-link");
    //  Wait for the 'Forgot Password' section to load (this can be specific to the page load behavior)
    await page.fill("input[placeholder='Email']", testData.validUser.email);
    await page.click("input[value='Cancel']");
    const logintetx = page.locator("div[class='landing-box'] h5")
    await expect(logintetx).toHaveText("Login to your Account");
    console.log("The page is redirected to login page.");

});
    


test.afterEach(async ({page}) => {
    console.log('🧹 Cleaning up after each test...');
  });
});