import { test, expect } from '@playwright/test';
import testData from '../data/testData.json';

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

test("Check URL when the user clicks the 'Report >> Attendence_summary' button in the Left menu.", async ({ page }) => {
  // Assert on home page after login
  await page.getByRole('link', { name: 'Location Location' }).click();
  await page.getByRole('link', { name: 'Employees Employees' }).click();
  await page.getByRole('img', { name: 'Report' }).click();
  await page.getByRole('link', { name: 'Attendance Summary Report' }).click();
  await expect(page).toHaveURL('https://uat-atndnz.offrd.co/report/attendance');
  console.log("URL redireected to 'Report >> Attendence_summary' successfully");
});
test('check the elements available in the attendance summary page', async ({ page }) => {
  await page.getByRole('link', { name: 'Location Location' }).click();
  await page.getByRole('link', { name: 'Employees Employees' }).click();
  await page.getByRole('img', { name: 'Report' }).click();
  await page.getByRole('link', { name: 'Attendance Summary Report' }).click();
  await expect(page.locator('thead')).toContainText('Employee ID');
  await expect(page.locator('thead')).toContainText('Employee Name');
  await expect(page.locator('thead')).toContainText('Location Name');
  await expect(page.locator('thead')).toContainText('Date');
  await expect(page.locator('thead')).toContainText('Entry Time');
  await expect(page.locator('thead')).toContainText('Exit Time');
  await expect(page.locator('thead')).toContainText('Working Hours');
  await expect(page.locator('thead')).toContainText('Away hours');
  await expect(page.getByRole('heading')).toContainText('Attendance Summary Report');
});