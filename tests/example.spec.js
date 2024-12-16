// const { test, expect } = require('@playwright/test');
// const testData = require('../data/testData.json');

// test.describe.skip('Data-driven testing', () => {
//   testData.forEach((data) => {
//     test(`Testing with data: ${data.name}`, async ({ page }) => {
//       await page.goto(data.url);
//       const title = await page.title();
//       expect(title).toContain(data.expectedTitle);
//     });
//   });
// });