function UpdaterModel () {
    'use strict';

    var self = this,
        updateTime = 1000,
        lastDate;

    this.update = function (services, date, activeLines) {
        lastDate = date;

        if(activeLines === 0)
            return;

        requestAnimationFrame(function () {
            self.update(services, lastDate, activeLines);
        });

        if((Date.now() - lastDate) < updateTime)
            return;

        $.each(services, function (i, id) {
            appsController.activateRequestApp(id);
        });

        lastDate = Date.now();
    };
}