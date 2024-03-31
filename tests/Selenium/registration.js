const { Builder, By, Key, until } = require('selenium-webdriver');
import('chai').then(({ expect }) => {
    async function registrationTest() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
          await driver.get('http://localhost:3000/');
      
          // Fill registration form
          await driver.findElement(By.id('firstName')).sendKeys('Jhon');
          await driver.findElement(By.id('lastName')).sendKeys('Doe');
          await driver.findElement(By.id('idCard')).sendKeys('123456789');
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
      
        } catch (error) {
          console.error('Registration test failed:', error);
        } finally {
          await driver.quit();
        }
      }
      
      registrationTest();
    }); 

