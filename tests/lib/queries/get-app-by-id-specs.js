"use strict";

var app, err, App, query,
    proxyquire =  require('proxyquire').noPreserveCache();
    
describe("Query get-app-by-id tests", function () {

    beforeEach(function(){
        err = false, app = false;
        App = { findById:function(id, cb) { cb(err, app); } };
        query = proxyquire('../../../api/lib/queries/get-app-by-id', { './../models/app': App });
    });
    
    it("When has error should return error in catch", function (done) {

        err = { 'message': 'deu ruim' };

        query.execute(1).then(function() {
            fail('Promise should not be resolved');
            done();
        })
        .catch(function(resp){
            expect(resp).toEqual(err);
            done();
        })

    });
    
    it("When doesnt find app, should return erro in catch", function (done) {

        app = null;

        query.execute(1).then(function(){
            fail('Promise should not be resolved');
            done();
        })
        .catch(function(resp){
            expect(resp).not.toBe(null);
            done();
        })

    });
    
    it("When has app, should resolve promise passing model response", function (done) {

        app = { 'id': '12345', 'name': 'Launcher' };

        query.execute(1).then(function(resp){
            expect(resp.id).toBe(app.id);
            expect(resp.name).toBe(app.name);
            done();
        });

    });
});    