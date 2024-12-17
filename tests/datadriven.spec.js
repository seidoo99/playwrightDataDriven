const { test, expect } = require('@playwright/test');
const webAppTestData = require('../data/webAppTestData.json');
const mobileAppTestData = require('../data/mobileAppTestData.json');
const {login} = require('./login')
test.describe(`testing data driven with playwright`, async ()=> {
  //add before each step to reduce repetitive code
    test.beforeEach(async ({ page, baseURL}) => {
        await login(page, baseURL);
    });
    //// seperate the test datas to webAppTestData and mobileTestData to make it easy
    // Loop through webApp test Data and create a test for each test case 1, 2 and 3
    webAppTestData.forEach(({ column, task, tags }) => {
      //column : refers to names like todo, inprogress, done
      //task: refers to the name of the task under column
      //tags : refers the tags given to each taks e.g bug, priority, design 
    test(`Verify task "${task}" is under the "${column}" and tasks have tags: ${tags.join(', ')}`, async ({ page }) => {
      await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/')
      
      // Locate the parent div element that contains both the column and tasks
      const parentLocator = page.locator('main').locator('div:has(h2)');

      // Locate the column by its text name
      const columnLocator = parentLocator.locator(`h2:has-text("${column}")`);
       //verify couln=mn name match the expected values
      await expect(columnLocator).toBeVisible();

      // Locate the task within the same parent as the column
      const taskLocator = parentLocator.locator(`h3:has-text("${task}")`);
       //verify tasks match the expected values
      await expect(taskLocator).toBeVisible();

      // Locate tags within the task's parent element 
      const tagLocators = taskLocator.locator('..').locator('.flex.flex-wrap span');
      //returns array of strings
      const visibleTags = await tagLocators.allTextContents();

      console.log('Visible tags:', visibleTags);

      // Verify the tags match the expected values
      expect(visibleTags).toEqual(tags);
    });
  });
  // Loop through wmobileAppTesData test Data and create a test for each test case 4, 5 and 6
 mobileAppTestData.forEach(({ column, task, tags }) => {
    //column : refers to names like todo, inprogress, done
    //task: refers to the name of the task under column
    //tags : refers the tags given to each taks e.g bug, priority, design 
  test(`Verify task "${task}" is under the "${column}" and tasks have tags: ${tags.join(', ')}`, async ({ page }) => {
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/')
    await page.locator(`button h2:has-text("Mobile Application")`).click()
    // Locate the parent div element that contains both the column and tasks
    const parentLocator = page.locator('main').locator('div:has(h2)');

    // Locate the column by its text name
    const columnLocator = parentLocator.locator(`h2:has-text("${column}")`);
     //verify couln=mn name match the expected values
    await expect(columnLocator).toBeVisible();

    // Locate the task within the same parent as the column
    const taskLocator = parentLocator.locator(`h3:has-text("${task}")`);
     //verify tasks match the expected values
    await expect(taskLocator).toBeVisible();

    // Locate tags within the task's parent element 
    const tagLocators = taskLocator.locator('..').locator('.flex.flex-wrap span');
    //returns array of strings
    const visibleTags = await tagLocators.allTextContents();

    console.log('Visible tags:', visibleTags);

    // Verify the tags match the expected values
    expect(visibleTags).toEqual(tags);
  });
});


})
  