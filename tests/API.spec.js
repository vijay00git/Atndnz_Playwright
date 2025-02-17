import { test, expect } from '@playwright/test';
import { login, logout } from '../utils/auth.js';
import testData from '../data/testData.json';

test('Validate POST request to login API', async ({ request }) => {
  const response = await request.post('https://uat-apiatndnz.offrd.co/api/v1/company/login', {
    data: {"email":testData.validUser.email,"password":testData.validUser.password},
  });

  // Check if the status code is 200
  expect(response.status()).toBe(200);

  // Parse the JSON response
  const responseBody = await response.json();

  // Validate the top-level response fields
  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.responseMessage).toBe('Success');

  // Validate the nested outputData object
  const outputData = responseBody.outputData;
  expect(outputData.tenantID).toBe('tenant_sequoiaat');
  expect(outputData.userID).toBe(1);
  expect(outputData.userRole).toBe('admin');
  expect(outputData.email).toBe('admin@sequoiaat.com');
  expect(outputData.companyName).toBe('Sequoia Applied Technologies');
  expect(outputData.employeePresent).toBe(true);
  expect(outputData.locationPresent).toBe(true);
  expect(outputData.username).toBe('');  // Empty username

  // Log response for debugging
  console.log('API response validated successfully:', responseBody);
});


// test('Validate GET API response of hourly employee presence', async ({ request }) => {

//   await login(page, 'admin@sequoiaat.com', 'Admin@1809!@#');
//     // Send a GET request to the API
//   const response = await request.get('https://uat-apiatndnz.offrd.co/api/v1/dashboard/hourly-employee-presence');

//   // Check if the status code is 200
//   expect(response.status()).toBe(200);

//   // Parse the JSON response
//   const responseBody = await response.json();

//   // Validate the top-level response fields
//   expect(responseBody.responseCode).toBe(200);
//   expect(responseBody.responseMessage).toBe('Success');

//   // Validate the locations array inside outputData
//   const locations = responseBody.outputData.locations;
//   // Expected locations data
//   const expectedLocations = [
//     { locationId: 1, locationName: "SATi-Chennai-1" },
//     { locationId: 2, locationName: "SATi-Kochi-1" },
//     { locationId: 4, locationName: "SATi-Chennai-2 " },
//     { locationId: 5, locationName: "SATi-Thiruvananthapuram" },
//     { locationId: 9, locationName: "US-HQ" },
//     { locationId: 10, locationName: "rr tower" },
//     { locationId: 11, locationName: "Triassic Kochi" },
//     { locationId: 12, locationName: "Remote Location 1" },
//     { locationId: null, locationName: "All Locations" }
//   ];

//   // Log success message for debugging
//   console.log('✅ All location data validated successfully!');
// });
