const { Builder, By, Key, until } = require('selenium-webdriver');

(async function () {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get("http://localhost:3000/");
    await driver.manage().window().setRect({ width: 620, height: 462 });

    // Test steps
    await driver.findElement(By.id("firstName")).click();
    await driver.findElement(By.id("firstName")).sendKeys("nicolas");
    await driver.findElement(By.id("lastName")).click();
    await driver.findElement(By.id("lastName")).sendKeys("s");
    await driver.findElement(By.id("idCard")).click();
    await driver.findElement(By.id("idCard")).sendKeys("123764893");
    await driver.findElement(By.id("password")).click();
    await driver.findElement(By.id("password")).sendKeys("111111111");
    await driver.findElement(By.css("button")).click();
    await driver.sleep(3000);

  } finally {
    await driver.quit();

  }
})();
