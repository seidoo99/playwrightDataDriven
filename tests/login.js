// write common login test for the application 
//can be used as base function for before each test
const login = async (page, baseURL) => {
    await page.goto(baseURL);
    //navigate to the url
    await page.goto(baseURL);
    // Fill the username field 
    await page.locator('id=username').fill('admin');
    //fill password field 
    await page.locator('id=password').fill('password123');
    // Click submit element 
    await page.locator('[type="submit"]').click();
    const title = await page.title();
    console.log(title)
    //use assertion to validate title
    await page.waitForSelector('[id=root] header h1')
    expect(title).toContain("Vite + React + TS");
};
module.exports = { login };