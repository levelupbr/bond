function AppsController () {
    'use strict';

    /*===============================
    =            Imports            =
    ===============================*/
    var requestModel = new RequestModel();
    var mapperModel  = new MapperModel();
    var updaterModel = new UpdaterModel();
    var dataView     = new DataView();
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

            dataView.addTemplate(id, list);
        });
    }
    /*=====  End of App data request  ======*/


    /*=======================================
    =            Updater control            =
    =======================================*/
    var services = [],
        activeLines = 0;

    this.activateServices = function (id) {
        activeLines++;

        services.push(id);

        updaterModel.update(services, Date.now(), activeLines);
    };

    this.disabledRequestApp = function (id) {
        activeLines--;

        var index = services.indexOf(id);

        if (services.indexOf(id) > -1)
            services.splice(index, 1);

        updaterModel.update(services, Date.now(), activeLines);
        dataView.closeLine(id);
    };
    /*=====  End of Updater control  ======*/
}