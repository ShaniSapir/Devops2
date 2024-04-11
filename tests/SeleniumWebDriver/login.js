const { Builder, By, until } = require("selenium-webdriver");

async function loginTest() {
  const { expect } = await import("chai");
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the login page
    await driver.get("http://localhost:3000/login.html");

    // Wait for the login form to load
    await driver.wait(until.elementLocated(By.id("loginForm")), 2000);

    // Clear inputs and fill login form with invalid inputs
    await driver.findElement(By.id("idCard")).sendKeys("222222222");
    await driver.findElement(By.id("password")).sendKeys("333333333");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(3000);

    // Wait for the error message to appear after unsuccessful login
    await driver.wait(async () => {
      const errorLabel = await driver.findElement(By.id("error"));
      return await errorLabel.isDisplayed();
    }, 10000);
    //await driver.wait(until.elementLocated(By.id("error")), 5000);
    let errorElement = await driver.findElement(By.id("error"));
    let errorMessage = await errorElement.getText();
    expect(errorMessage).to.contain("User not found");
    console.log("Login with incorrect inputs");

    // Fill login form with valid inputs
    await driver.findElement(By.id("idCard")).clear();
    await driver.findElement(By.id("password")).clear();
    await driver.findElement(By.id("idCard")).sendKeys("322257213");
    await driver.findElement(By.id("password")).sendKeys("322257213");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(3000);
    console.log("Login with correct inputs");
  } catch (error) {
    console.error("Login test failed:", error);
  } finally {
    await driver.quit();
  }
}

loginTest();
