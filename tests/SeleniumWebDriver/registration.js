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
    console.log("Registration with an existing ID");
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
    console.log("Registration with invalid input");
    await driver.sleep(3000);

    await driver.findElement(By.id("firstName")).clear(); // Clear existing value
    await driver.findElement(By.id("lastName")).clear(); // Clear existing value
    await driver.findElement(By.id("idCard")).clear(); // Clear existing value
    await driver.findElement(By.id("password")).clear(); // Clear existing value

    //Fill registration form with valid inputs
    await driver.findElement(By.id("firstName")).sendKeys("O");
    await driver.findElement(By.id("lastName")).sendKeys("N");
    await driver.findElement(By.id("idCard")).sendKeys("123451234");
    await driver.findElement(By.id("password")).sendKeys("123451234");

    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for redirection to the login page
    await driver.wait(async () => {
      return driver
        .getCurrentUrl()
        .then((url) => url.includes("http://localhost:3000/login.html"));
    }, 10000);

    // Assert that the current URL is the login page
    expect(await driver.getCurrentUrl()).to.contain(
      "http://localhost:3000/login.html"
    );

    console.log("Registration with valid input and redirected to login page");
    await driver.sleep(2000);

    // Communicate with the server to delete the user
    deleteUser("123451234");
  } catch (error) {
    console.error("Registration test failed:", error);
  } finally {
    await driver.quit();
  }
}

async function deleteUser(idCard) {
  try {
    const response = await fetch("http://localhost:3000/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idCard }),
    });

    if (response.ok) {
      console.log("User deleted successfully.");
    } else {
      throw new Error("Error deleting user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

registrationTest();
