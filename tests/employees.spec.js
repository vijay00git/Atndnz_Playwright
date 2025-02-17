import { test, expect } from '@playwright/test';
import testData from '../data/testData.json';

test.describe('Employees option from the left-side menu bar', () => {

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

    test("Check URL when the user clicks the 'Employees' button in the Left menu.", async ({ page }) => {
        // Assert on home page after login
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > a:nth-child(3) > li:nth-child(1)");
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/employee');
        console.log('URL redireected to Employees page successfully');
    });    

    test("Check the Employees page has Employee ID, Full Name, Email, Contact number, Location name, Action and Email verification status coloumns", async ({ page }) => {
        // Assert on home page after login
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > a:nth-child(3) > li:nth-child(1)");
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/employee');
        console.log('URL redireected to Employees page successfully');
        const employeeDta = page.locator(".p-datatable.p-component.p-datatable-scrollable.p-datatable-responsive-scroll")
        await expect(employeeDta).toBeVisible();
        await expect(employeeDta).toContainText('Employee ID');
        await expect(employeeDta).toContainText('Full Name');
        await expect(employeeDta).toContainText('Email');
        await expect(employeeDta).toContainText('Contact Number');
        await expect(employeeDta).toContainText('Location Name');
        await expect(employeeDta).toContainText('Action');
        await expect(employeeDta).toContainText('Email Verified');
        console.log('Employee ID, Full Name, Email, Contact number, Location name, Action and Email verification status coloumns are displayed');
    }); 

    test.afterEach(async () => {
        // Cleanup logic or additional checks after each test
        console.log('🧹 Cleaning up after each test...');

    });

});
