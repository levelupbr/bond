$(document).ready(function () {
    'use strict';

    $('.application').click(function () {
        $(this).next().slideToggle();
    });

    var contentHeight = $('header').height() + $('footer').height() + $('main').css('padding-top') + $('main').css('padding-bottom');

    $(window).resize(function() {
        if($(window).height() < contentHeight) {
            $('.base').removeClass('absolute');
            $('.base').addClass('static');
        } else {
            $('.base').addClass('absolute');
            $('.base').removeClass('static');
        }
    });
});