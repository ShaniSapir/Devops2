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

  const testPlanPath = "./tests/NonFunctionalTest/LoginJmeter.jmx"
  // Specify the path to your JMX file
  const resultsPath = './tests/NonFunctionalTest/resultLogin.csv'; // Specify the path to save the results

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
/*
Timestamp: Indicates the time when the request was made.
Duration: Duration of the request in milliseconds.
HTTP Request: Indicates that it's an HTTP request.
Response Code: Indicates the HTTP response code. "200" means the request was successful.
Response Message: "OK" indicates that the request was successful.
Thread Name: Name of the thread making the request.
DataType: Type of data being sent.
Success: Indicates whether the request was successful or not.
Bytes: Number of bytes sent in the request.
Sent Bytes: Number of bytes received in response.
Idle Time: Time the thread remained idle.
Connect Time: Time taken to establish the connection.
URL: The URL to which the request was made.
From the provided log, it seems that all the requests were successful (status code 200) and there were no errors reported. Therefore, the test can be considered successful.*/