$(document).ready(function () {
    'use strict';

    $('.application').click(function () {
        $(this).next().slideToggle();
    });
});