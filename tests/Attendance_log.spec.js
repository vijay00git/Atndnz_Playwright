import { test, expect } from '@playwright/test';
import testData from '../data/testData.json';

test.describe('Report >> Attendence_log option from the left-side menu bar', () => {

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

    test("Check URL when the user clicks the 'Report >> Attendence_log' button in the Left menu.", async ({ page }) => {
        // Assert on home page after login
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(4)");
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(4) > ul:nth-child(2) > a:nth-child(1) > li:nth-child(1)");
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/report/attendance-log');
        console.log("URL redireected to 'Report >> Attendence_log' successfully");
    });
    
    test("Check the Employees page has Attendence log text and Export CSV Button", async ({ page }) => {
        // Assert on home page after login
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(4)");
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(4) > ul:nth-child(2) > a:nth-child(1) > li:nth-child(1)");
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/report/attendance-log');
        console.log("URL redireected to 'Report >> Attendence_log' successfully");
        const employeeDta = page.locator("div[class='w-100 row'] div[class='col-md-12']")
        await expect(employeeDta).toBeVisible();
        await expect(employeeDta).toContainText("Attendance Log");
        await expect(employeeDta).toContainText("Export CSV");
        console.log('"Attendance Log", "Export CSV" are displayed');
    }); 

    test("Check the Employees page has Employee ID, Employee Name, Entry-gate, Exit-gate, Entry-time, Exit-time and Working Hours coloumns", async ({ page }) => {
        // Assert on home page after login
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(4)");
        await page.click("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(4) > ul:nth-child(2) > a:nth-child(1) > li:nth-child(1)");
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/report/attendance-log');
        console.log("URL redireected to 'Report >> Attendence_log' successfully");
        const employeeDta = page.locator(".p-datatable.p-component.p-datatable-scrollable.p-datatable-responsive-scroll")
        await expect(employeeDta).toBeVisible();
        await expect(employeeDta).toContainText('Employee ID');
        await expect(employeeDta).toContainText('Employee Name');
        await expect(employeeDta).toContainText('Entry-Gate');
        await expect(employeeDta).toContainText('Exit-Gate');
        await expect(employeeDta).toContainText('Entry-Time');
        await expect(employeeDta).toContainText('Exit-Time');
        await expect(employeeDta).toContainText('Working Hours');
        console.log('Employee ID, Employee Name, Entry-gate, Exit-gate, Entry-time, Exit-time and Working Hours coloumns are displayed');
    }); 

    test.afterEach(async () => {
        // Cleanup logic or additional checks after each test
        console.log('🧹 Cleaning up after each test...');

    });

});
