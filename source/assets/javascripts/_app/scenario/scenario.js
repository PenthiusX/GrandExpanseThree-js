(function() {

self.APP = self.APP || {};

/**
 * ============================================
 * Scenario
 * ============================================
 */
APP.Scenario = function() {

  var init = function() {
    // general
    new APP.FilmSet();

    // props
    ddd.logo = new APP.LogoController();
    new APP.SkyController();
    new APP.FloorController();
    new APP.DiamondsController();
    new APP.StarsController();
    // sections
    new APP.SectionsController();
    // render
    ddd.windowWidth = $(window).width();
    ddd.windowHeight = $(window).height();
    if( dt.isMobile() ) setHomeHeight();
    $.sub('update:frame', render);
    $.sub('update:windowSize', onWindowResize);
    $(window).on("orientationchange", onOrientationChange);
    ddd.renderIter = 0;
    // ddd.isMobile = false;
    $.pub('renderer:ready');
  };

  var setHomeHeight = function() {
    $('#home').height( $(window).height() );
  };

  var render = function() {
    ddd.renderer.render(ddd.scene, ddd.camera);
    TWEEN.update();
    ddd.logoParticleClock.stop();
  };


  var setNewAspectRatio = function() {
    if( $(window).width() != ddd.windowWidth || $(window).height() != ddd.windowHeight) {
      ddd.windowWidth = $(window).width();
      ddd.windowHeight = $(window).height();
      ddd.camera.aspect = window.innerWidth / window.innerHeight;
      ddd.camera.updateProjectionMatrix();
      ddd.renderer.setSize( ddd.windowWidth, window.innerHeight );
    }
  };

  var onWindowResize = function() {
     if(!dt.isMobile()){
        setNewAspectRatio();
     }
  };

  var onOrientationChange = function() {
    if(dt.isMobile()) {
      setTimeout(function(){
        setNewAspectRatio();
        setHomeHeight();
      },300);
    }
  };

  init();
};

}());
