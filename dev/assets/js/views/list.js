function ListView() {
    'use strict';

    var appList,
        content = '';

    this.addTemplate = function (listInfo) {
        appList = listInfo;

        loadTemplate(0);
    };

    var loadTemplate = function (i) {
        $.get(settings.templates.list, function (template) {
            content += Mustache.render(template, appList[i]);

            if(++i !== appList.length)
                return loadTemplate(i);

            $('#apps-list').html(content);
            $('.application').bind('click', eventClick);
        });
    };

    var eventClick = function() {
        var self = $(this);

        self.addClass('current');

        $('.application').unbind('click', eventClick);
        setTimeout(function () { $('.application').bind('click', eventClick); }, settings.animationTime);

        if(self.next().is(':visible'))
            return appsController.disabledRequestApp(self.attr('data-id'));

        appsController.activateRequestApp(self.attr('data-id'));
        setTimeout(function () { appsController.activateServices(self.attr('data-id')); }, settings.animationTime);
    };
}