function DataView() {
    'use strict';

    this.addTemplate = function (id, appData) {
        $.each(appData, function (i, app) {
            $.get('./assets/js/views/data.tpl', function (template) {
                addDataInApp(Mustache.render(template, app), id);
            });
        });
    };

    var addDataInApp = function (appData, id) {
        $('#content').html('').append(appData);

        $('.application').each(function (i, self) {

            if($(self).attr('data-id') !== id)
                return;

            differentiateVersions();
            $(self).next().slideDown('fast');
        });
    };

    var differentiateVersions = function () {
        $('.data').each(function (i) {
            if(i % 2 === 0)
                $(this).addClass('uneven');
        });
    };

    this.closeLine = function (id) {
        $('.application').each(function (i, self) {

            if($(self).attr('data-id') !== id)
                return;

            $(self).next().slideUp('fast');
        });
    };
}