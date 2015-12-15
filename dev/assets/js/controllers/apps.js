function AppsController () {
    'use strict';

    var self = this;

    /*===============================
    =            Imports            =
    ===============================*/
    var behaviorView   = new BehaviorView();
    var requestModel   = new RequestModel();
    var mapperModel    = new MapperModel();
    var updaterModel   = new UpdaterModel();
    var ordinatorModel = new OrdinatorModel();
    var listView       = new ListView();
    /*=====  End of Imports  ======*/


    /*=================================
    =            Bootstrap            =
    =================================*/
    behaviorView.checkContentSize();
    /*=====  End of Bootstrap  ======*/


    /*=========================================
    =            Apps list request            =
    =========================================*/
    requestModel.getAppList().then(function (appList) {

        var list = [];

        $.each(appList, function (i, app) {
            list.push(mapperModel.mapAppList(app));
        });

        ordinatorModel.ordination(list, 'name');

        listView.addTemplate(ordinatorModel.listOrdered);
    });
    /*=====  End of Apps list request  ======*/


    /*========================================
    =            App data request            =
    ========================================*/
    this.activateRequestApp = function (id) {
        behaviorView.checkContentSize();

        requestModel.getAppData(id).then(function (data) {
            var list = [];

            if(!data[0]) {
                var dataView = new DataView();
                return dataView.addTemplate();
            }

            $.each(data, function (i, app) {
                list.push(mapperModel.mapAppData(app));
            });

            var dataView = new DataView();
            return dataView.addTemplate(list);
        });
    }
    /*=====  End of App data request  ======*/


    /*=======================================
    =            Updater control            =
    =======================================*/
    this.services    = [];
    this.activeLines = 0;

    this.activateServices = function (id) {
        self.activeLines++;

        self.services.push(id);

        updaterModel.update(Date.now());
    };

    this.disabledRequestApp = function (id) {
        self.activeLines--;

        var index = self.services.indexOf(id);

        if (self.services.indexOf(id) > -1)
            self.services.splice(index, 1);

        updaterModel.update(self.services, Date.now());

        var dataView = new DataView();
        dataView.closeLine();
    };
    /*=====  End of Updater control  ======*/
}