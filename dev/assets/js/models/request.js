function RequestModel () {
    'use strict';


    /*============================
    =            Call            =
    ============================*/
    var service;

    this.getAppList = function () {
        service = settings.services;

        return new Promise(request);
    };

    this.getAppData = function (id) {
        service = settings.services + id + '/stats' + location.search;

        return new Promise(request);
    };

    this.getTemplate = function (path) {
        service = path;

        return new Promise(request);
    };
    /*=====  End of Call  ======*/


    /*===============================
    =            Request            =
    ===============================*/
    var request = function (resolve, reject) {
        $.get(service)
        .success(function (data) {
            resolve(data);
        })
        .fail(function (error) {
            reject(console.log(error));
        });
    };
    /*=====  End of Request  ======*/
}
