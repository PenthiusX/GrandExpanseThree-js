(function() {

self.APP = self.APP || {};


/**
 * ============================================
 * SectionsController
 * ============================================
 */
APP.SectionsController = function(props) { var that = this;

  that.duration = 1200;
  that.easing = TWEEN.Easing.Sinusoidal.InOut;

  that.props = {};

  var init = function(props) {
    that.props = $.extend({}, that.props, props);
    that.add('section:home'   , {position: { x: 1.1   }},false, false ,true);
    that.add('section:about'  , {position: { x: 4   }},false, true ,false);
    that.add('section:credits', {position: { x: -4  }},true, false ,false);
  };

  init(props);
};

/**
 * ============================================
 * add
 * ============================================
 */
APP.SectionsController.prototype.add = function(sectionEvent, animateParams,iscontextC, iscontextA , logoReset ) { var that = this;
  $.sub(sectionEvent, function(){ that.animate(animateParams,iscontextC, iscontextA ,logoReset); });
};

/**
 * ============================================
 * animate
 * ============================================
 */

APP.SectionsController.prototype.animate = function(params, iscontextC, iscontextA , logoReset) { var that = this;
  if( ddd.camera.position.x == params.position.x ) { return; }
  var animateFrom = { cameraX: ddd.camera.position.x }
  var animateTo   = { cameraX: params.position.x }
  ddd.tween = new TWEEN.Tween(animateFrom).to( animateTo, that.duration ).easing( that.easing );
  ddd.tween.onUpdate(function(){
    ddd.camera.position.x = this.cameraX;
  });
  ddd.tween.onStart(function(){
    ddd.animationInProgress = true;
    // ddd.tiltcam.running = false;
  });
  ddd.tween.onComplete(function(){
    ddd.animationInProgress = false;
  });
  ddd.tween.start();
  ddd.iscontextA = iscontextA;
  ddd.iscontextC = iscontextC;
  ddd.callonce = 0;
  ddd.logo.animationDuration = 15;
  ddd.logo_reset = logoReset;
};
// End
// ============================================
}());
