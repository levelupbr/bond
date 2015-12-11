function ListView(appList) {
    'use strict';

    $.each(appList, function (i, app) {
        $.get('./assets/js/views/list.tpl', function (template) {
            addAppInList(Mustache.render(template, app));
            addEventClick();
        });
    });

    var addAppInList = function (app) {
        $('#apps-list').append(app);
    };

    var addEventClick = function () {
        $('.application').click(function () {
            var self = $(this);

            if(self.next().is(':visible'))
            	return;

        	appsController.activateRequestApp(self.attr('data-id'));
        });
    };
}