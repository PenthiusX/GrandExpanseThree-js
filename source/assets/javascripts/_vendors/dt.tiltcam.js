(function(){

self.dt = self.dt || {};

dt.webgl.Tiltcam = function(options) {

  var that = {};

  var defaults = {
    camera: null,
    speed: 0.05,
    x: [-10, 10],
    y: [30, 5]
  };

  that.running = true;

  that.setParams = function(newParams) {
    if( newParams !== undefined ) {
      that.params = $.extend( {}, that.params, newParams );
    } else {
      that.params = $.extend( {}, defaults, (options || {}) );
    }
  };

  var initialize = function() {
    that.setParams();
    setupListeners();
  };

  var animate = function() {
    if(!that.params.camera){ return; }
    var x = that.params.camera.position.x;
    var y = that.params.camera.position.y;
    var xFinal = dt.math.map(dt.ui.mouseXC, -dt.ui.centerX, dt.ui.centerX, that.params.x[0], that.params.x[1]);
    var yFinal = dt.math.map(dt.ui.mouseYC, -dt.ui.centerY, dt.ui.centerY, that.params.y[0], that.params.y[1]);
    x = x + ( xFinal - x ) * that.params.speed;
    y = y + ( yFinal - y ) * that.params.speed;
    that.params.camera.position.x = x;
    that.params.camera.position.y = y;
  };


  var setupListeners = function() {
    // $.sub('update:frame', render);
    $.sub('update:frame', function(){
      draw();
    });
  };

  var draw = function() {
    if( that.running ) {
      animate();
    }
  };

  initialize();

  return that;

};



}());