function RequestModel () {
    'use strict';

    var service = 'http://localhost:8080/api/apps/';


    /*====================================
    =            List request            =
    ====================================*/
    this.getAppList = function () {
        return new Promise(requestList);
    };

    var requestList = function (resolve, reject) {
        $.get(service)
        .success(function (data) {
            resolve(data);
        })
        .fail(function (error) {
            reject(console.log(error));
        });
    };
    /*=====  End of List request  ======*/


    /*====================================
    =            Request data            =
    ====================================*/
    var appId;

    this.getAppData = function (id) {
        appId = id;

        return new Promise(requestData);
    };

    var requestData = function (resolve, reject) {
        $.get(service + appId + '/stats')
        .success(function (data) {
            resolve(data);
        })
        .fail(function (error) {
            reject(console.log(error));
        });
    };
    /*=====  End of Request data  ======*/
}