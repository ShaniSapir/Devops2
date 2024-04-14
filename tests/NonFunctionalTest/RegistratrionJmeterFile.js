const { exec } = require('child_process');
const path = require('path');

function runJMeterTest() {
  let jmeterPath = process.env.JMETER_HOME; // Try getting JMeter path from environment variables

  if (!jmeterPath) {
    // If environment variable not set, try to find JMeter in common installation paths
    const possiblePaths = [
      '/usr/local/apache-jmeter-5.4.1/bin', // Example path for Unix-like systems
      'C:/Users/User/Desktop/apache-jmeter-5.6.3/apache-jmeter-5.6.3/bin', // Example path for Windows
    ];

    // Find the first existing path
    jmeterPath = possiblePaths.find(p => {
      return require('fs').existsSync(p);
    });
  }

  if (!jmeterPath) {
    console.error('Error: JMeter path not found. Please set JMETER_HOME environment variable or install JMeter.');
    return;
  }

  const testPlanPath = "./tests/NonFunctionalTest/RegistrationJmeter.jmx"
  // Specify the path to your JMX file
  const resultsPath = './tests/NonFunctionalTest/resultRegistration.csv'; // Specify the path to save the results

  const command = path.join(jmeterPath, 'jmeter') + ` -n -t ${testPlanPath} -l ${resultsPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing JMeter: ${error}`);
      return;
    }

    console.log(`JMeter output: ${stdout}`);
    console.error(`JMeter errors: ${stderr}`);

    console.log('Test execution completed. Results saved at:', resultsPath);
  });
}

runJMeterTest();
