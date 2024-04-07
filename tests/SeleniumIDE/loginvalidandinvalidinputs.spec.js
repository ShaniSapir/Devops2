const { Builder, By, Key, until } = require('selenium-webdriver');

(async function () {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get("http://localhost:3000/");
    await driver.manage().window().setRect({ width: 1296, height: 688 });
    await driver.findElement(By.linkText("Login")).click();
    await driver.findElement(By.id("idCard")).click();
    await driver.findElement(By.id("idCard")).sendKeys("3138761616");
    await driver.findElement(By.id("password")).click();
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button")).click();
    await driver.findElement(By.id("idCard")).click();
    await driver.findElement(By.id("idCard")).sendKeys("318761616");
    await driver.findElement(By.css("button")).click();
    await driver.sleep(3000);

  } finally {
    await driver.quit();
  }
})();
