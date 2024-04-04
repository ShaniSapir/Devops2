const { Builder, By, Capabilities, until } = require('selenium-webdriver');
import('chai').then(({ expect }) => {
  async function registerTest(browser) {
    let driver;
    let firefoxCapabilities = Capabilities.firefox();

    if (browser === 'chrome') {
      driver = await new Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .forBrowser('chrome')
        .build();
    } else if (browser === 'firefox') {
      driver = await new Builder()
        .forBrowser('firefox')
        .usingWebDriverProxy('http://localhost:4444/wd/hub')
        .withCapabilities(firefoxCapabilities)
        .build();
    } else {
      console.log("Unsupported browser.");
      return;
    }

    try {
      // Navigate to registration page
      await driver.get('http://localhost:3000');

      // Fill registration form
      await driver.findElement(By.id('firstName')).sendKeys('Hadar');
      await driver.findElement(By.id('lastName')).sendKeys('Levi');
      await driver.findElement(By.id('idCard')).sendKeys('312261616');
      await driver.findElement(By.id('password')).sendKeys('password123');
      await driver.findElement(By.id('role')).sendKeys('Student');

      // Submit the form
      await driver.findElement(By.css('button[type="submit"]')).click();

      // Wait for registration success alert
      await driver.wait(until.alertIsPresent());

      // Get the alert text and assert
      let alert = await driver.switchTo().alert();
      let alertText = await alert.getText();
      console.log('Registration Alert:', alertText);

      // Add assertion for successful registration message
      expect(alertText).to.contain('Registration successful');
    }
    catch (error) {
      console.error("An error occurred:", error);
    } finally {
      await driver.quit();
    }
  }

  async function runTests() {
    // Run tests in Chrome
    console.log("Running registration test in Chrome...");
    await registerTest('chrome');

    // Run tests in Firefox
    console.log("Running registration test in Firefox...");
    await registerTest('firefox');

    console.log("All registration tests completed.");
  }

  runTests();
}); 
