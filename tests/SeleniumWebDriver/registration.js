const { Builder, By, Key, until } = require("selenium-webdriver");

async function registrationTest() {
  const { expect } = await import("chai");
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the registration page
    await driver.get("http://localhost:3000/");

    await driver.sleep(1000);

    // Fill registration form with existing ID
    await driver.findElement(By.id("firstName")).sendKeys("T");
    await driver.findElement(By.id("lastName")).sendKeys("L");
    await driver.findElement(By.id("idCard")).sendKeys("322257213");
    await driver.findElement(By.id("password")).sendKeys("322257213");

    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    //await driver.sleep(3000);
    // Wait for the error message to appear
    await driver.wait(async () => {
      const errorLabel = await driver.findElement(By.id("errorLabel"));
      return await errorLabel.isDisplayed();
    }, 10000);
    //await driver.wait(until.elementLocated(By.id("errorLabel")), 10000);
    let errorMessageElement1 = await driver.findElement(By.id("errorLabel"));
    let errorMessage1 = await errorMessageElement1.getText();
    expect(errorMessage1).to.contain("This ID already exists");

    await driver.sleep(3000);
    // Fill registration form with invalid inputs
    await driver.findElement(By.id("firstName")).clear(); // Clear existing value
    await driver.findElement(By.id("firstName")).sendKeys("123"); // Invalid input
    await driver.findElement(By.id("lastName")).clear(); // Clear existing value
    await driver.findElement(By.id("lastName")).sendKeys("l");
    await driver.findElement(By.id("idCard")).clear(); // Clear existing value
    await driver.findElement(By.id("idCard")).sendKeys("322257213");
    await driver.findElement(By.id("password")).clear(); // Clear existing value
    await driver.findElement(By.id("password")).sendKeys("322257213");

    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.sleep(3000);

    // Ensure error message is displayed
    // Wait for the error message to appear
    /*await driver.wait(async () => {
      const errorLabel = await driver.findElement(By.id("errorLabel"));
      return await errorLabel.isDisplayed();
    }, 10000);*/
    //await driver.wait(until.elementLocated(By.id("errorLabel")), 10000);
    /*let errorMessageElement2 = await driver.findElement(By.id("errorLabel"));
    let errorMessage2 = await errorMessageElement2.getText();
    expect(errorMessage2).to.contain("One of the details entered is invalid");*/
  } catch (error) {
    console.error("Registration test failed:", error);
  } finally {
    await driver.quit();
  }
}

registrationTest();
