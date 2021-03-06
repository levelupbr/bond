"use strict";

var version, err, Version, command,
    proxyquire =  require('proxyquire').noPreserveCache();
    
describe("Command update-version tests", function () {

    beforeEach(function(){
        err = false, version = false;
        Version = function(data) { this.started = false; this.init = function() { this.started = true;}; this.save = function(cb) { cb(err,version); }, this.setVersion = function() { }; this.init(data); };
        Version.findOne = function (query, cb) {  cb(err, version); };
        command = proxyquire('../../../api/lib/commands/update-version', { './../models/version': Version });
    });
    
    it("When version not found, should create a new one", function (done) {
    
        var data = { 'version':'1.2.4' };
        
        command.execute(data).then(function(resp) {
            expect(resp.started).toBe(true);
            done();
        });

    });
});
