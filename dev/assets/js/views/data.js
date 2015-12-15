function DataView() {
    'use strict';

    var appData,
        content = '',
        empty = {version: '--', users: '--', success: '--', error: '--', downgrade: '--'};

    this.addTemplate = function (appInfos) {
        appData = appInfos;

        if(!appInfos)
            return loadEmptyTemplate();

        loadTemplate(0);
    };

    var loadEmptyTemplate = function () {
        $.get('./assets/js/views/data.tpl', function (template) {
            $('.application.current').next().find('.data-version').html(Mustache.render(template, empty));

            addDataInApp();
        });
    };

    var loadTemplate = function (i) {
        $.get('./assets/js/views/data.tpl', function (template) {
            content += Mustache.render(template, appData[i]);

            if(++i !== appData.length)
                return loadTemplate(i);

            $('.application.current').next().find('.data-version').html(content);
            content = '';

            addDataInApp();
        });
    };

    var addDataInApp = function () {
        differentiateVersions();

        $('.application.current').next().slideDown(settings.animationTime);
        $('.application.current').removeClass('current');
    };

    var differentiateVersions = function () {
        $('.application.current').next().find('.data').each(function (i) {
            if(i % 2 === 0)
                $(this).addClass('uneven');
        });
    };

    this.closeLine = function () {
        $('.application.current').next().slideUp(settings.animationTime);
        $('.application.current').removeClass('current');
    };
}