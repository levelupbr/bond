function RequestModel () {
    'use strict';

    var service = 'http://bond.levelup.com.br/api/apps/';


    /*====================================
    =            List request            =
    ====================================*/
    this.getAppList = function () {
        return new Promise(requestList);
    };

    var requestList = function (resolve, reject) {
        if ($.get(service).status)
            reject(Error("AJAX nao funcionou"));
        else
            resolve([{"_id":"56684ca0522e0584ee067e1a","name":"Launcher Warface","__v":0,"created":"2015-12-09T15:45:36.943Z"}]);
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
        if ($.get(service + appId + '/stats').status)
            reject(Error("AJAX nao funcionou"));
        else
            resolve([{"version":"1.1.0.0","count":2,"success":0,"error":2,"downgrade":0}]);
    };
    /*=====  End of Request data  ======*/
}