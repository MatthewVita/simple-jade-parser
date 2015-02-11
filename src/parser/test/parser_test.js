var chalk = require('chalk');
var async = require('async');
var simpleJadeParser = require('../parser');

var testId = '';

async.series([
    function(state) {
        testId = 'it should show valid HTML';
        simpleJadeParser({
                file: './fixtures/foo.jade'
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
                file: './fixtures/foo.jade',
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
                file: './fixtures/asdfasdfasdf.jade',
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
                file: './fixtures/bar.jade'
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
                file: './fixtures/bar.jade',
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
    },
    function(state) {
        testId = 'it should include a Jade file many levels down';
        simpleJadeParser({
                file: './fixtures/a/b/c.jade'
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
        testId = 'it should include a Jade options object to pretty print';
        simpleJadeParser({
                file: './fixtures/fancy.jade',
                opts: {
                    pretty: true
                }
            })
            .then(function(res) {
                if (res.indexOf('\n') > -1) {
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