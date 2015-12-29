function DataView() {
    'use strict';

    var appData,
        content = '';

    this.addTemplate = function (appInfos) {
        appData = appInfos;

        if(!appInfos)
            return loadEmptyTemplate();

        loadTemplate(0);
    };

    var loadEmptyTemplate = function () {
        $.get(settings.templates.data, function (template) {
            $('.application.current').next().find('.data-version').html(content);

            addDataInApp();
        });
    };

    var loadTemplate = function (i) {
        $.get(settings.templates.data, function (template) {
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

        $('.application.current').next().slideDown(settings.animationTime).removeClass('current');
    };

    var differentiateVersions = function () {
        $('.application.current').next().find('.data').each(function (i) {
            if(i % 2 === 0)
                $(this).addClass('uneven');
        });
    };

    this.closeLine = function () {
        $('.application.current').next().slideUp(settings.animationTime).removeClass('current');
    };
}