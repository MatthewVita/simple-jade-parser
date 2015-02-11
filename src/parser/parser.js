var Q = require('q');
var jade = require('jade');
var path = require('path');
var fs = require('fs');
var fileExists = Q.denodeify(fs.stat);
var merge = require('merge');

module.exports = function(jadeConf) {
    var self = this;

    jadeConf = typeof(jadeConf) !== 'object' ? {} : jadeConf;

    self.file = jadeConf.file || false;
    self.data = jadeConf.data || {}; //optional param
    self.opts = jadeConf.opts || {}; //optional param

    /**
     * First validates the parameters and then
     * renders the file.
     * @return {Q.promise}
     */
    self.parse = function() {
        var dfd = Q.defer();

        var init = function() {
            return self.validate();
        };

        var finalize = function() {
            try {
                self.data = merge(self.data, jadeConf.opts);
                dfd.resolve(jade.renderFile(self.file, self.data));
            } catch (e) {
                dfd.reject('Could not render');
            }
        };

        var err = function(err) {
            dfd.reject(err);
        };

        init()
            .then(finalize)
            .catch(err);

        return dfd.promise;
    };

    /**
     * Enters current working directory
     * to ensure the Jade file is valid
     * @return {Q.promise}
     */
    self.validate = function() {
        var dfd = Q.defer();

        var valueCheck = function() {
            if (self.file === false) {
                dfd.reject('Please supply file');
            }
        };

        var lookupCheck = function() {
            //makes the file fully qualified
            self.file = path.resolve(path.dirname(module.parent.filename), self.file);

            fileExists(self.file)
                .then(function(res) {
                    dfd.resolve();
                })
                .catch(function(err) {
                    dfd.reject('Please supply valid file');
                });
        };

        var err = function(err) {
            dfd.reject(err);
        };

        Q.fcall(valueCheck)
            .then(lookupCheck)
            .catch(err);

        return dfd.promise;
    };

    return self.parse();
};
