import { test, expect } from '@playwright/test';
import testData from '../data/testData.json';
import {logout} from '../utils/auth.js';

test.describe('Location option from the left-side menu bar', () => {

    test.beforeEach(async ({ page }) => {
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
        console.log('Login completed successfully');
    });

    test("Check response when the user clicks the 'Location' button in the Left menu.", async ({ page }) => {
        // Assert on home page after login
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > a:nth-child(2) > li:nth-child(1)");
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/location');
        
    });
    test("Check response when the user didn't fill all the field in the location setup page of the user-guide.", async ({ page }) => {
        // Assert on home page after login
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > a:nth-child(2) > li:nth-child(1)");
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/location');
        const addLocationBtn = page.locator("button[type='button']");
        await addLocationBtn.click();
        const searchAddrs = page.locator("input[placeholder='Search your address']");
        await searchAddrs.click();
        await searchAddrs.fill("Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India");
        // Press the down arrow key to select the first search result
        await page.keyboard.press('ArrowDown');
        // Press Enter to select the highlighted option
        await page.keyboard.press('Enter');
        await page.fill("input[placeholder='Name']", 'Taj Mahal');
        await page.fill("input[placeholder='Abbrevation']", 'Taj');
        await page.click("div[class='col-md-3'] button[type='button']");
        const toastMessage = page.locator('[id="\\31 "]'); 
        await expect(toastMessage).toBeVisible({ timeout: 5000 }); // Wait up to 5 seconds
        //  Verify error message text
        await expect(toastMessage).toContainText('Please fill all the fields');    
    });
    test("Check response when the user fill all the field in the location setup page of the user-guide.", async ({ page }) => {
        // Assert on home page after login
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > a:nth-child(2) > li:nth-child(1)");
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/location');
        const addLocationBtn = page.locator("button[type='button']");
        await addLocationBtn.click();
        const searchAddrs = page.locator("input[placeholder='Search your address']");
        await searchAddrs.click();
        await searchAddrs.fill("Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India");
        // Press the down arrow key to select the first search result
        await page.keyboard.press('ArrowDown');
        // Press Enter to select the highlighted option
        await page.keyboard.press('Enter');
        await page.fill("input[placeholder='Name']", 'Taj Mahal');
        await page.fill("input[placeholder='Abbrevation']", 'Taj');
        await page.fill("input[placeholder='City']", 'Agra');
        await page.fill("input[placeholder='PIN/ZIP Code']", '282001');
        await page.fill("input[placeholder='State']", 'Uttar Pradesh');
        await page.fill("input[placeholder='Country']", 'India');
        await page.fill("textarea[placeholder='Address']", '52CV+9Q9, Taj East Gate Rd, Eastern Gate, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India');
        await page.click("div[class='col-md-3'] button[type='button']");
        const toastMessage = page.locator('[id="\\31 "]'); 
        await expect(toastMessage).toBeVisible({ timeout: 5000 }); // Wait up to 5 seconds
        //  Verify error message text
        await expect(toastMessage).toContainText('Location added successfully'); 
   
    });

    test("Verify by clicking on cancel button location delete popup", async ({ page }) => {
        
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > a:nth-child(2) > li:nth-child(1)");
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/location');  
        await page.fill("input[placeholder='Search for location']", 'Taj');
        await page.click("img[alt='Delete']");
        await page.click("div[class='modal-footer'] button:nth-child(1)");
        const toastMessage = page.locator('[id="\\31 "]');  
    });
    test("Verify user is able to delete the added location", async ({ page }) => {
        
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > a:nth-child(2) > li:nth-child(1)");
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/location');  
        await page.fill("input[placeholder='Search for location']", 'Taj');
        await page.click("img[alt='Delete']");
        await page.click("div[class='modal-footer'] button:nth-child(2)");
        const toastMessage = page.locator('[id="\\31 "]'); 
        await expect(toastMessage).toBeVisible({ timeout: 5000 }); // Wait up to 5 seconds
        //  Verify error message text
        await expect(toastMessage).toContainText('Location deleted successfully!'); 
    });

    test.afterEach(async ({page}) => {
        // Cleanup logic or additional checks after each test
        await logout(page);
        console.log('🧹 Cleaning up after each test...');

    });

});
