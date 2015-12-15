function BehaviorView () {
	'use strict';

	var self = this;

	/*==========================================
    =            Interface behavior            =
    ==========================================*/
    var base = $('.base');

    var mainPaddingTop    = parseInt($('main').css('padding-top').replace('px', ''), 0),
        mainPaddingBottom = parseInt($('main').css('padding-bottom').replace('px', ''), 0);

    this.checkContentSize = function () {
        var heights = $('header').outerHeight() + mainPaddingTop + $('#apps-list').height() + mainPaddingBottom + $('footer').outerHeight();

        if ($(window).height() < heights)
            base.removeClass('absolute');
        else
            base.addClass('absolute');
    };

    $(window).resize(function () {
        self.checkContentSize();
    });
    /*=====  End of Interface behavior  ======*/
}