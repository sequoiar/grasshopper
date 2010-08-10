var sys = require('sys');
var suites = [
    './ghp-test', './model-test', './helpers-test', './i18n-test'
];

var failures = [], passes = 0;

suites.forEach(function(suiteName) {
    var suite = require(suiteName);
    
    if(suite.setUp) {
        suite.setUp();
    }

    for(testName in suite.tests) {
        console.log(testName + ' [' + suite.name + ']');
        try {
            suite.tests[testName]();
            passes++;
        } catch(err) {
            failures.push(testName + ' [' + suite.name + ']');
            console.log(err.stack);
        }
    }

    if(suite.tearDown) {
        suite.tearDown();
    }
});

console.log('\n--------------------');
console.log('Passed: ' + passes + ', Failed: ' + failures.length);

if(failures.length > 0) {
    console.log('\nFailures:');

    failures.forEach(function(failure) {
        console.log(failure);
    });
}

console.log('');