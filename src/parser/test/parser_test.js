var chalk = require('chalk');
var async = require('async');
var simpleJadeParser = require('../parser');

var testId = '';

async.series([
    function(state) {
        testId = 'it should show valid HTML';
        simpleJadeParser({
                file: './foo.jade'
            })
            .then(function(res) {
                if (res === '<h1></h1>') {
                    state(null, testId);
                } else {
                    state(testId, null);
                }
            })
            .catch(function(err) {
                state(testId, null);
            });
    },
    function(state) {
        testId = 'it should show valid rendered HTML';
        simpleJadeParser({
                file: './foo.jade',
                data: {
                    foo: 'bar'
                }
            })
            .then(function(res) {
                if (res === '<h1>bar</h1>') {
                    state(null, testId);
                } else {
                    state(testId, null);
                }
            })
            .catch(function(err) {
                state(testId, null);
            });
    },
    function(state) {
        testId = 'it should ask to supply a file';
        simpleJadeParser({
                data: {
                    foo: 'bar'
                }
            })
            .catch(function(err) {
                if (err === 'Please supply file') {
                    state(null, testId);
                } else {
                    state(testId, null);
                }

            });
    },
    function(state) {
        testId = 'it should ask to supply a valid file';
        simpleJadeParser({
                file: './asdfasdfasdf.jade',
                data: {
                    foo: 'bar'
                }
            })
            .catch(function(err) {
                if (err === 'Please supply valid file') {
                    state(null, testId);
                } else {
                    state(testId, null);
                }

            });
    },
    function(state) {
        testId = 'it should include a Jade file';
        simpleJadeParser({
                file: './bar.jade'
            })
            .then(function(res) {
                if (res === '<p>baz</p><h1></h1>') {
                    state(null, testId);
                } else {
                    state(testId, null);
                }
            })
            .catch(function(err) {
                state(testId, null);
            });
    },
    function(state) {
        testId = 'it should include a Jade file with data';
        simpleJadeParser({
                file: './bar.jade',
                data: {
                    foo: 'bar'
                }
            })
            .then(function(res) {
                if (res === '<p>baz</p><h1>bar</h1>') {
                    state(null, testId);
                } else {
                    state(testId, null);
                }
            })
            .catch(function(err) {
                state(testId, null);
            });
    }
], function(err, res) {
    if (err) {
        console.log(chalk.red('FAILED: ' + err));
        return process.exit(1);
    }

    res.forEach(function(val) {
        console.log(chalk.green('PASSED: ' + val));
    });

    return process.exit(0);
});