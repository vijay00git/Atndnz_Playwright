import test from "node:test";
import testData from '../data/testData.json';
import { expect } from '@playwright/test';

// utils/auth.js
export async function login(page, email, password) {
  // Open login page
  await page.goto('https://uat-atndnz.offrd.co/');
  // Fill in credentials
  await page.fill("input[placeholder='Email']", email);
  await page.fill("input[placeholder='Password']", password);
  // Click login button and wait for navigation
  await page.click("input[value='Login']");
  await page.waitForURL('https://uat-atndnz.offrd.co/home');
  // Assertion: Check if redirected to home page
  await expect(page).toHaveURL('https://uat-atndnz.offrd.co/home'); 
  }

  export async function logout(page) {
    await page.getByRole('img', { name: 'User Icon' }).click();
    await page.getByRole('tooltip', { name: 'Logout' }).locator('div').nth(1).click();

  }