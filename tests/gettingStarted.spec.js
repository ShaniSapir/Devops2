const { By, Builder, Browser } = require('selenium-webdriver');
const assert = require("assert");

(async function registrationTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('file:///path/to/your/registration.html');

    let title = await driver.getTitle();
    assert.equal("Registration", title);

    let firstNameInput = await driver.findElement(By.id('firstName'));
    let lastNameInput = await driver.findElement(By.id('lastName'));
    let idCardInput = await driver.findElement(By.id('idCard'));
    let passwordInput = await driver.findElement(By.id('password'));
    let roleSelect = await driver.findElement(By.id('role'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await firstNameInput.sendKeys('John');
    await lastNameInput.sendKeys('Doe');
    await idCardInput.sendKeys('123456789');
    await passwordInput.sendKeys('password');
    await roleSelect.sendKeys('Student'); // Selecting Student role
    await submitButton.click();

    // You can add assertions here to verify the success message or any other expected behavior
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
})();