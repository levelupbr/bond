$(document).ready(function () {
    'use strict';

    /*==========================================
    =            Interface behavior            =
    ==========================================*/
    var base = $('.base');

    var checkContentSize = function (heights) {
        if ($(window).height() < heights)
            base.removeClass('absolute');
        else
            base.addClass('absolute');
    };

    var mainPaddingTop    = parseInt($('main').css('padding-top').replace('px', ''), 0),
        mainPaddingBottom = parseInt($('main').css('padding-bottom').replace('px', ''), 0);

    var sumHeights = function () {
        return $('header').outerHeight() + mainPaddingTop + $('#apps').height() + mainPaddingBottom + $('footer').outerHeight();
    };

    checkContentSize(sumHeights());

    $(window).resize(function () {
        checkContentSize(sumHeights());
    });
    /*=====  End of Interface behavior  ======*/
});

/*============================================
=            Start dynamical data            =
============================================*/
var appsController = new AppsController();
/*=====  End of Start dynamical data  ======*/