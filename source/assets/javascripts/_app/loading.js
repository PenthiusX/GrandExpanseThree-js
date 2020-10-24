(function() {

self.APP = self.APP || {};


/**
 * ============================================
 * Loading
 * ============================================
 */
APP.Loading = function() {

  var that = {};

  var files = {

    Image: [
      '/assets/images/logo_cardboard.svg',
      '/assets/images/logo_tendril.svg',
      '/assets/images/logo_someplace.svg',
      '/assets/images/logo_grayson.svg'
    ],

    OBJ: [
      'assets/models/diamond.obj',
      'assets/models/grand_expanse_logo.obj'
    ]
  };

  that.percentageLoaded = 0;
  that.files = [];

  var initialize = function() {
    that.fadetoblack = $('#fadetoblack');
    that.loadingHolder = $('#loading');
    that.loadingPercentageElement = $('.loading-percentage');
    start();
  };

  var start = function() {
    that.loading = new dt.webgl.Loading( files );
    that.loading.manager.onProgress = onProgress;
    that.loading.manager.onLoad = onComplete;
  };

  var onProgress = function(item, loaded, total) {
    that.percentageLoaded = Math.floor(math.map( loaded, 0, total, 0, 100 ));
    that.loadingPercentageElement.html( 'loading<br>' + that.percentageLoaded + '%');
    $.pub('loading:onProgress', item, loaded, total );
  };

  var onComplete = function() {
    APP.files = that.loading.cached;
    $.pub('loading:loaded');
  };

  initialize();

  return that;

};



}());
