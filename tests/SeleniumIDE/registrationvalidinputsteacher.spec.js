const { Builder, By, Key, until } = require('selenium-webdriver');

(async function () {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get("http://localhost:3000/");
    await driver.manage().window().setRect({ width: 1296, height: 688 });

    // Test steps
    await driver.findElement(By.id("firstName")).click();
    await driver.findElement(By.id("firstName")).sendKeys("hadar");
    await driver.findElement(By.id("lastName")).click();
    await driver.findElement(By.id("lastName")).sendKeys("h");
    await driver.findElement(By.id("idCard")).click();
    await driver.findElement(By.id("idCard")).sendKeys("217384392");
    await driver.findElement(By.id("password")).click();
    await driver.findElement(By.id("password")).sendKeys("111111111");
    await driver.findElement(By.id("role")).click();
    {
      const dropdown = await driver.findElement(By.id("role"));
      await dropdown.findElement(By.xpath("//option[. = 'Lecturer']")).click();
    }
    await driver.findElement(By.id("course")).click();
    {
      const dropdown = await driver.findElement(By.id("course"));
      await dropdown.findElement(By.xpath("//option[. = 'Physics']")).click();
    }
    await driver.findElement(By.css("button")).click();
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
})();
