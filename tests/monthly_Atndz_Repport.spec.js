import {test, expect} from '@playwright/test';
import testData from '../data/testData.json';
import {login, logout} from '../utils/auth.js';


test.describe('Monthly Attendance Report', () => {

    test.beforeEach(async ({page}) => {
        await login(page, testData.validUser.email, testData.validUser.password);
    });

    test("check url when the user clicks the 'Report >> Monthly Attendance' button in the Left menu.", async ({page}) => {
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.getByRole('listitem').filter({ hasText: 'Report▶' }).click();
        await page.getByRole('link', { name: 'Monthly Attendance Report' }).click();
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/report/monthlyAttendance');
        console.log("URL redireected to 'Report >> Monthly Attendance' successfully");
    });

    test("Check the Monthly Attendance page has Monthly Attendance report text and other valid columns", async ({page}) => {

        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');
        await page.getByRole('listitem').filter({ hasText: 'Report▶' }).click();
        await page.getByRole('link', { name: 'Monthly Attendance Report' }).click();
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/report/monthlyAttendance');
        console.log("URL redireected to 'Report >> Monthly Attendance' successfully");

        await expect(page.getByRole('heading')).toContainText('Monthly Attendance Report');
        await expect(page.locator('thead')).toContainText('Employee Name');
        await expect(page.locator('thead')).toContainText('Location Name');
        await expect(page.locator('thead')).toContainText('Total Working Days');
        await expect(page.locator('thead')).toContainText('Days Present');

    });

    test("Check the sorting functionality of the columns in the Monthly Attendance page", async ({ page }) => {
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');  
        await page.getByRole('listitem').filter({ hasText: 'Report▶' }).click();
        await page.getByRole('link', { name: 'Monthly Attendance Report' }).click();
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/report/monthlyAttendance');
        console.log("URL redirected to 'Report >> Monthly Attendance' successfully");
    
        await page.getByRole('columnheader', { name: 'Employee Name Show Filter Menu' }).locator('svg').first().click();
        await page.waitForSelector('tbody.p-datatable-tbody tr td:nth-child(1)');
        const names = await page.$$eval('tbody.p-datatable-tbody tr td:nth-child(1)', elements =>
            elements.map(el => el.textContent.trim())
        );
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
        console.log('Original Names:', names);
        console.log('Expected Sorted Names:', sortedNames);
        expect(names).toEqual(sortedNames);  // Enable assertion to verify sorting
        console.log('Employee Name column is sorted successfully'); 
    });
    
    test("Check descending sorting functionality of the Employee Name column", async ({ page }) => {
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home');   
        await page.getByRole('listitem').filter({ hasText: 'Report▶' }).click();
        await page.getByRole('link', { name: 'Monthly Attendance Report' }).click();
        await expect(page).toHaveURL('https://uat-atndnz.offrd.co/report/monthlyAttendance');
        console.log("URL redirected to 'Report >> Monthly Attendance' successfully");
    
        // Click twice to sort in descending order
        const sortButton = page.getByRole('columnheader', { name: 'Employee Name Show Filter Menu' }).locator('svg').first();
        await sortButton.click();  // First click for ascending
        await sortButton.click();  // Second click for descending
        // Wait for sorting to reflect in UI
        await page.waitForSelector('tbody.p-datatable-tbody tr td:nth-child(1)');
        // Grab the names from the table after sorting
        const names = await page.$$eval('tbody.p-datatable-tbody tr td:nth-child(1)', elements =>
            elements.map(el => el.textContent.trim())
        );
        // Prepare the expected descending order list
        const expectedDescending = [...names].sort((a, b) => b.localeCompare(a));
        // Debug logs for clarity
        console.log('Names from UI:', names);
        console.log('Expected Descending Order:', expectedDescending);
        // Assertion to verify descending order
        expect(names).toEqual(expectedDescending);
        console.log('Employee Name column is sorted in descending order successfully'); 
    });

    test.afterEach(async ({page}) => {
        await logout(page);
    });
});