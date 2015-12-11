function DataView(id, appData) {
    'use strict';

    $.each(appData, function (i, app) {
        $.get('./assets/js/views/data.tpl', function (template) {
            addDataInApp(Mustache.render(template, app));
        });
    });

    var addDataInApp = function (appData) {
        $('#content').append(appData);

        $('.application').each(function (i, self) {

            if($(self).attr('data-id') !== id)
                return;

            differentiateVersions();
            $(self).next().slideDown('fast');
        })
    };

    var differentiateVersions = function () {
        $('.data').each(function (i) {
            if(i % 2 === 0)
                $(this).addClass('uneven');
        });
    };
}