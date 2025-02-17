import { test, expect } from '@playwright/test';
import testData from '../data/testData.json';

test.describe('Login Tests', () => {

test("Check response when the user selects the pre-saved credentials (Email and password saved by the browser) and clicks the 'Login' button.", async ({ page }) => {
  // Open login page
  await page.goto('https://uat-atndnz.offrd.co/');
  // Fill in credentials
  await page.fill("input[placeholder='Email']", testData.validUser.email);
  await page.fill("input[placeholder='Password']", testData.validUser.password);
  // Click login button and wait for navigation
  await page.click("input[value='Login']");
  await page.waitForURL('https://uat-atndnz.offrd.co/home');
  // Assertion: Check if redirected to home page
  await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home'); 
  });


test("Check response when the user selected the pre-saved credentials and enters an invalid password.", async ({ page }) => {
    // Open login page
    await page.goto('https://uat-atndnz.offrd.co/');
    // Fill in credentials
    await page.fill("input[placeholder='Email']", testData.validUser.email);
    await page.fill("input[placeholder='Password']", testData.invalidUser.password);
    // Click login button and wait for navigation
    await page.click("input[value='Login']");
    const toastMessage = page.locator('[id="\\31 "]');
    await expect(toastMessage).toBeVisible({ timeout: 5000 }); // Wait up to 5 seconds
    //  Verify error message text
    await expect(toastMessage).toContainText('Please specify valid password'); 
     //  Get the text from the toast message
     const errorText = await toastMessage.innerText();
     console.log("Error Message Displayed:", errorText);
    //  Ensure user remains on login page (not redirected)
    await expect(page).toHaveURL('https://uat-atndnz.offrd.co/'); });

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

test.afterEach(async () => {
    console.log('🧹 Cleaning up after each test...');
  });
});