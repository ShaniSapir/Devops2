const { Builder, By, until } = require('selenium-webdriver');
const { Capabilities } = require('selenium-webdriver');

async function loginTest(browser) {
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
      .usingWebDriverProxy('http://your-selenium-grid-hub:4444')
      .withCapabilities(firefoxCapabilities)
      .build();
  } else {
    console.log("Unsupported browser.");
    return;
  }

  try {
    // Navigate to login page
    await driver.get('http://localhost:3000/login.html');
    const idCard = '000000111'; // Hardcoded ID card for testing
    const password = '111111111'; // Hardcoded password for testing
    await driver.findElement(By.id('idCard')).sendKeys(idCard);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(3000);

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
}

async function runTests() {
  // Run tests in Chrome
  console.log("Running tests in Chrome...");
  await loginTest('chrome');

  // Run tests in Firefox
  console.log("Running tests in Firefox...");
  await loginTest('firefox');

  console.log("All tests completed.");
}

runTests();