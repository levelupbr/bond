'use strict';

/* app */
var bondApp = bondApp || {

  settings: {
    updateTime    : 5000
  },

  /* infraestructure */
  infraestructure: {},

  /* models */
  models: {},

  /* views */
  views: { }
};

bondApp.infraestructure.changeButtonState = function(button) {
  button.toggleClass('closed current');
  bondApp.infraestructure.footerBehavior();
};

bondApp.infraestructure.versionContainerUpdater = function(el) {
  var container = el.parent().find(".content").find('.data-version');
  var versionModelList = new bondApp.models.VersionList([], { appId: el.attr('data-id')});
  new bondApp.views.VersionsList({model: versionModelList, el: container});
};

bondApp.infraestructure.footerBehavior = function () {

	/*==========================================
    =            Interface behavior            =
    ==========================================*/
    var base = $('.base');

    var mainPaddingTop    = parseInt($('main').css('padding-top').replace('px', ''), 0),
        mainPaddingBottom = parseInt($('main').css('padding-bottom').replace('px', ''), 0);

    function checkContentSize () {
        var heights = $('header').outerHeight() + mainPaddingTop + $('#apps-list').height() + mainPaddingBottom + $('footer').outerHeight();

        if ($(window).height() < heights)
            base.removeClass('absolute');
        else
            base.addClass('absolute');
    };

    $(window).resize(function () {
        checkContentSize();
    });

    checkContentSize();

    /*=====  End of Interface behavior  ======*/
};

bondApp.infraestructure.timer = {

    lastDate: Date.now(),

    run: function () {

        var self = this;
        requestAnimationFrame(function () {
            self.run();
        });

        var el = $('button.current');

        if(((Date.now() - this.lastDate) < bondApp.settings.updateTime ) || el.length === 0 )
            return;

        bondApp.infraestructure.versionContainerUpdater(el);
        this.lastDate = Date.now();
    }
};

bondApp.models.AppList = Backbone.Collection.extend({
  url: 'http://localhost:8080/api/apps/'
});

bondApp.models.VersionList = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.appId = options.appId;
  },
  url: function() {
    return 'http://localhost:8080/api/apps/' + this.appId + '/stats';
  }
});

bondApp.views.AppsList = Backbone.View.extend({
  el : '#apps-list',
  model: new bondApp.models.AppList(),
  template: _.template($('.list-template').html()),
  events: {
		'click .application.fnt-exo.closed': 'showVersions',
    'click .application.fnt-exo.current': 'hideVersions',
	},
  showVersions: function(e) {
    $('button.current').click();
    var button = $(e.currentTarget), container = button.parent().find(".content");
    bondApp.infraestructure.changeButtonState(button);
    bondApp.infraestructure.versionContainerUpdater(button);
  },
  hideVersions: function(e) {
    var button = $(e.currentTarget), container = button.parent().find(".content");
    bondApp.infraestructure.changeButtonState(button);
    container.css("height", 0);
    container.css("padding", '0');
  },
  initialize: function(){
    this.model.on('sync', this.render, this);
    this.model.fetch();
  },
  render: function() {
    this.$el.html(this.template({ apps: this.model.toJSON() }));
    return this;
  }
});

bondApp.views.VersionsList = Backbone.View.extend({
  tagName: 'div',
  className: 'data-version',
  template: _.template($('.data-template').html()),
  initialize: function(){
    this.model.on('sync', this.render, this);
    this.model.fetch();
  },
  render: function() {
    var height = (this.model.length + 1) * 40;
    var parent = this.$el.parent();
    this.$el.html(this.template({ versions: this.model.toJSON() }));

    parent
      .css("height", height + 'px')
      .css("paddingTop", '10px')
      .css("paddingBottom", '20px');

    return this;
  }
});

bondApp.init = function() {
  new bondApp.views.AppsList();
  this.infraestructure.timer.run();
  this.infraestructure.footerBehavior();
};

bondApp.init();