// dt.webgl.Loading

(function(){

self.dt = self.dt || {};
self.dt.webgl = self.dt.webgl || {};

dt.webgl.Loading = function( options ) {
  var that = {};

  var defaults = {};

  that.cached = {};

  var initialize = function() {
    that.params = $.extend( {}, options, (defaults || {}) );
    prepareManager();
    startLoading();
  };

  var prepareManager = function() {
    that.manager = new THREE.LoadingManager();
  };


  var startLoading = function() {
    var aType;
    for( aType in that.params ) {
      loadFiles( that.params[aType], aType);
    }
  };

  var loadFiles = function( items, aType ) {
    var amount = items.length;
    for (var i = 0; i < amount; i++) {
      loadFile(items[i], aType);
    };
  };

  var loadFile = function ( item, aType ) {
    var loader = new THREE[aType + 'Loader']( that.manager );
    loader.load( item, function ( object ) {
      that.cached[item] = object;
    });
  };

  initialize();

  return that;
};

}());
