const { Builder, By, Key, until } = require("selenium-webdriver");

async function registrationTest() {
  const { expect } = await import("chai");
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the registration page
    await driver.get("http://localhost:3000/");

    await driver.sleep(5000);

    // Fill registration form with valid inputs
    await driver.findElement(By.id("firstName")).sendKeys("t");
    await driver.findElement(By.id("lastName")).sendKeys("l");
    await driver.findElement(By.id("idCard")).sendKeys("322257213");
    await driver.findElement(By.id("password")).sendKeys("322257213");

    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for registration success alert
    await driver.wait(until.alertIsPresent());

    // Get the alert text and assert successful registration
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    expect(alertText).to.contain("Registration successful");

    // Navigate to the login page after successful registration
    await driver.switchTo().defaultContent(); // Switch back to default content
    await driver.get("http://localhost:3000/login.html");

    await driver.sleep(5000);
    // Fill registration form with invalid inputs
    await driver.findElement(By.id("firstName")).sendKeys("123"); // Invalid input
    await driver.findElement(By.id("lastName")).sendKeys("l");
    await driver.findElement(By.id("idCard")).sendKeys("322257213"); // Invalid input
    await driver.findElement(By.id("password")).sendKeys("322257213"); // Invalid input

    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Ensure error message is displayed
    await driver.wait(until.elementLocated(By.id("errorLabel")));
    let errorMessageElement = await driver.findElement(By.id("errorLabel"));
    let errorMessage = await errorMessageElement.getText();
    expect(errorMessage).to.contain("One of the details entered is invalid");
  } catch (error) {
    console.error("Registration test failed:", error);
  } finally {
    await driver.quit();
  }
}

registrationTest();
