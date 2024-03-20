const {Builder, By, Key, until} = require('selenium-webdriver');

// Define your Selenium WebDriver setup
(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Open the login page
        await driver.get('http://localhost:3000/login.html'); // Replace "file:///path/to/login.html" with the actual file path
        
        // Find input fields and button
        const idCardInput = await driver.findElement(By.id('idCard'));
        const passwordInput = await driver.findElement(By.id('password'));
        const loginButton = await driver.findElement(By.xpath('//button[@type="submit"]'));

        // Enter credentials and submit the form
        await idCardInput.sendKeys('123456789'); // Replace "your_id_card" with your actual ID card
        await passwordInput.sendKeys('123456789', Key.RETURN); // Replace "your_password" with your actual password

        // Wait for page redirection or error message
        await driver.wait(until.urlIs('http://localhost:3000/login.html') || until.urlIs('http://localhost:3000/login.html'), 5000);

        // Check if redirected to the expected page
        const currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes('http://localhost:3000/login.html')) {
            console.log('Login successful as a student!');
        } else if (currentUrl.includes('http://localhost:3000/login.html')) {
            console.log('Login successful as a teacher!');
        } else {
            // If not redirected, there might be an error message
            const errorMessage = await driver.findElement(By.id('error')).getText();
            console.log('Login failed. Error message:', errorMessage);
        }
    } finally {
        // Close the browser
        await driver.quit();
    }
})();
