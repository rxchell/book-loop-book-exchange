const fs = require('fs');
const path = require('path');

const inputPath = path.resolve('reports', 'jest-report.json');
const outputPath = path.resolve('reports', 'ctrf-report.json');

fs.readFile(inputPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading Jest report:', err);
    process.exit(1);
  }

  try {
    const jestReport = JSON.parse(data);
    const ctrfReport = transformToCtrfFormat(jestReport);
    fs.writeFile(outputPath, JSON.stringify(ctrfReport, null, 2), (err) => {
      if (err) {
        console.error('Error writing CTRF report:', err);
        process.exit(1);
      }
      console.log('CTRF report written successfully');
    });
  } catch (parseError) {
    console.error('Error parsing Jest report:', parseError);
    process.exit(1);
  }
});

function transformToCtrfFormat(jestReport) {
  // Implement the transformation logic here
  // Example transformation (adjust based on actual CTRF requirements)
  return {
    testResults: jestReport.testResults.map(result => ({
      testFilePath: result.testFilePath,
      status: result.status,
      assertionResults: result.assertionResults.map(assertion => ({
        title: assertion.title,
        status: assertion.status,
        failureMessages: assertion.failureMessages
      }))
    }))
  };
}
