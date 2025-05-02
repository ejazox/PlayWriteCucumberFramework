const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: './cucumber-report/report.json',  // Path to your generated cucumber JSON file
  output: './cucumber-report/report.html',    // Path to the output HTML report
  reportSuiteAsScenarios: true,
  launchReport: true  // Automatically opens the report in the browser after generating
};

reporter.generate(options);
