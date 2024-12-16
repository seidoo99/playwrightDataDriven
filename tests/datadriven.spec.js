const { test, expect } = require('@playwright/test');
const webAppTestData = require('../data/webAppTestData.json');
const mobileAppTestData = require('../data/mobileAppTestData.json');
const {login} = require('./login')
test.describe(`testing data driven with playwright`, async ()=> {
    // async function login(page) {
    //     await page.goto(baseURL);
    //      //navigate to the url
    //     await page.goto(baseURL);
    //     // Fill the username field 
    //     await page.locator('id=username').fill('admin');
    //     //fill password field 
    //     await page.locator('id=password').fill('password123');
    //    // Click submit element 
    //    await page.locator('[type="submit"]').click();
    //    const title = await page.title();
    //    console.log(title)
    //    //use assertion to validate title
    //    await page.waitForSelector('[id=root] header h1')
    //     expect(title).toContain("Vite + React + TS");
    //   }
    
    test.beforeEach(async ({ page, baseURL}) => {
        await login(page, baseURL);
    });

    test.skip(`implement user authentication`, async ({ page,  baseURL}) => {
    //navigate to the url
    await page.goto(baseURL);
    // Fill the username field 
    await page.locator('id=username').fill('admin');
    //fill password field 
    await page.locator('id=password').fill('password123');
   // Click submit element 
   await page.locator('[type="submit"]').click();
//    await page.getByRole('button', { name: 'Sign in' }).click();
  // get the title of the page 
   const title = await page.title();
   console.log(title)
   //use assertion to validate title
   await page.waitForSelector('[id=root] header h1')
    expect(title).toContain("Vite + React + TS");

// get the texts inside the `${column}` 
  await page.locator('.h-full .rounded-lg h3')
  // get locators to get the column name 
  await page.locator('.h-full .rounded-lg h2')



  });
    // Loop through webApp test Data and create a test for each task
    webAppTestData.forEach(({ column, task, tags }) => {
    test(`Verify task "${task}" is in "${column}" with tags: ${tags.join(', ')}`, async ({ page }) => {
      // Locate the column containing the task
      const columnLocator = page.locator(`.h-full .rounded-lg h2:has-text("${column}")`);
      await expect(columnLocator).toBeVisible();

      // Locate the task within the column
      const taskLocator = columnLocator.locator(`.h-full .rounded-lg h3:has-text=${task}`);
      await expect(taskLocator).toBeVisible();

      // Validate tags associated with the task
      const tagLocators = taskLocator.locator('.flex.flex-wrap span');
      const visibleTags = await tagLocators.allTextContents();
      expect(visibleTags).toEqual(tags); // Compare actual tags with expected tags
    });
  });
 
  // mobileAppTestData.forEach(({ column, task, tags }) => {
  //   test(`Verify task "${task}" is in "${column}" with tags: ${tags.join(', ')}`, async ({ page }) => {
  //     // Locate the column containing the task
  //     const columnLocator = page.locator(`.h-full .rounded-lg h2:has-text("${column}")`);
  //     await expect(columnLocator).toBeVisible();

  //     // Locate the task within the column
  //     const taskLocator = columnLocator.locator(`.h-full .rounded-lg h3:has-text=${task}`);
  //     await expect(taskLocator).toBeVisible();

  //     // Validate tags associated with the task
  //     const tagLocators = taskLocator.locator('.flex.flex-wrap span');
  //     const visibleTags = await tagLocators.allTextContents();
  //     expect(visibleTags).toEqual(tags); // Compare actual tags with expected tags
  //   });
  // });


})
  