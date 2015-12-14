function ListView(appList) {
    'use strict';

    $.each(appList, function (i, app) {
        $.get('./assets/js/views/list.tpl', function (template) {
            $('#apps-list').append(Mustache.render(template, app));
            addEventClick();
        });
    });

    var addEventClick = function () {
        $('.application').click(function () {
            var self = $(this);

            if(self.next().is(':visible'))
                return appsController.disabledRequestApp(self.attr('data-id'));

            appsController.activateRequestApp(self.attr('data-id'));
            appsController.activateServices(self.attr('data-id'));
        });
    };
}