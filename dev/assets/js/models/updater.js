function UpdaterModel () {
    'use strict';

    var self = this,
        lastDate;

    this.update = function (date) {
        if(appsController.activeLines === 0)
            return;

        requestAnimationFrame(function () {
            self.update(date);
        });

        if((Date.now() - lastDate) < settings.updateTime)
            return;

        $.each(appsController.services, function (i, id) {
            appsController.activateRequestApp(id);
        });

        lastDate = Date.now();
    };
}