$(document).ready(function () {
    'use strict';

    $('.application').click(function () {
        $(this).next().slideToggle();
    });


    var base = $('.base');

    var checkContentSize = function (heights) {
        if ($(window).height() < heights) {
            base.removeClass('absolute').addClass('static');
        } else {
            base.removeClass('static').addClass('absolute');
        }
    };

    var mainPaddingTop    = parseInt($('main').css('padding-top').replace('px', ''));
    var mainPaddingBottom = parseInt($('main').css('padding-bottom').replace('px', ''));

    var sumHeights = function () {
        return $('header').outerHeight() + mainPaddingTop + $('#apps').height() + mainPaddingBottom + $('footer').outerHeight();
    };

    checkContentSize(sumHeights());

    $(window).resize(function () {
        checkContentSize(sumHeights());
    });
});