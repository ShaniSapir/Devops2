const { Builder, By, Key, until } = require('selenium-webdriver');

(async function () {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get("http://localhost:3000/");
    await driver.manage().window().setRect({ width: 1296, height: 688 });

    // Test steps
    await driver.findElement(By.id("firstName")).click();
    await driver.findElement(By.id("firstName")).sendKeys("מ");
    await driver.findElement(By.id("lastName")).click();
    await driver.findElement(By.id("lastName")).sendKeys("ד");
    await driver.findElement(By.id("password")).click();
    await driver.findElement(By.id("password")).sendKeys("111111111");
    await driver.findElement(By.css("button")).click();
    await driver.findElement(By.id("firstName")).click();
    await driver.findElement(By.id("firstName")).sendKeys("n");
    await driver.findElement(By.css("button")).click();
    await driver.findElement(By.id("lastName")).click();
    await driver.findElement(By.id("lastName")).sendKeys("j");
    await driver.findElement(By.css("button")).click();
    await driver.findElement(By.id("idCard")).click();
    await driver.findElement(By.id("idCard")).sendKeys("124355675");
    await driver.findElement(By.id("password")).click();
    await driver.findElement(By.id("password")).sendKeys("11111111");
    await driver.findElement(By.css("button")).click();
    await driver.findElement(By.id("password")).click();
    await driver.findElement(By.id("password")).sendKeys("111111111");
    await driver.findElement(By.css("button")).click();
    await driver.sleep(3000);

  } finally {
    await driver.quit();
  }
})();
