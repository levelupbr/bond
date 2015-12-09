"use strict";

var version, err, Version, query,
    proxyquire =  require('proxyquire').noPreserveCache();


describe("Query get-app-stats-by-id tests", function () {

    beforeEach(function(){
        err = false, version = {};
        Version = { aggregate: function() { return {  exec:function(cb) { cb(err, version); } }  }  }
        query = proxyquire('../../../api/lib/queries/get-app-stats-by-id', { './../models/version': Version });
    });

    it("When hasnt version info should be a empty array", function (done) {

        version = null;
        query.execute(1).then(function(resp){
            expect(resp).toEqual([]);
            done();
        })

    });
  
    it("Resp should has length 2", function (done) {

        version = [{ '_id': { 'version': '1.2.3'}, 'count': 2, 'success': 1, 'erro': 1 }, { '_id': { 'version': '1.2.4'}, 'count': 5, 'success': 3, 'erro': 2 }];

        query.execute(1).then(function(resp){
            expect(resp.length).toBe(2);
            done();
        })

    });

    it("Resp should map correctly", function (done) {

        version = [{ '_id': { 'version': '1.2.3', 'from': '1.2.4'}, 'count': 2, 'success': 1, 'error': 1, 'downgrade': 1 }, { '_id': { 'version': '1.2.4'}, 'count': 5, 'success': 3, 'error': 2 }];

        query.execute(1).then(function(resp){
            var v1 = resp[0], v2 = resp[1];
            expect(v1.version).toBe('1.2.3');
            expect(v1.count).toBe(2);
            expect(v1.success).toBe(1);
            expect(v1.error).toBe(1);
            expect(v2.version).toBe('1.2.4');
            expect(v2.count).toBe(5);
            expect(v2.success).toBe(3);
            expect(v2.error).toBe(2);
            expect(v2.downgrade).toBe(1);
            done();
        })

    });
  
    it("When has error should return error in catch", function (done) {

       err = { 'message': 'deu ruim' };

        query.execute(1).then(function() {
            fail('Promise should not be resolved');
            done();
        }).catch(function(resp){
            expect(resp).toEqual(err);
            done();
        })

    });
  
});