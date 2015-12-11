function AppsController () {
    'use strict';

    /*===============================
    =            Imports            =
    ===============================*/
    var requestModel = new RequestModel();
    var mapperModel  = new MapperModel();
    /*=====  End of Imports  ======*/


    /*=========================================
    =            Apps list request            =
    =========================================*/
    requestModel.getAppList().then(function (appList) {

        var list = [];

        $.each(appList, function (i, app) {
            list.push(mapperModel.mapAppList(app));
        });

        new ListView(list);
    });
    /*=====  End of Apps list request  ======*/


    /*========================================
    =            App data request            =
    ========================================*/
    this.activateRequestApp = function (id) {
        requestModel.getAppData(id).then(function (appData) {
        	var list = [];

	        $.each(appData, function (i, app) {
	            list.push(mapperModel.mapAppData(app));
	        });

	        new DataView(id, list);
        });
    }
    /*=====  End of App data request  ======*/
}