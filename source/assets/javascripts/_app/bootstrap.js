(function() {

self.APP = self.APP || {};


/**
 * ============================================
 * Bootstrap
 * ============================================
 */
APP.Bootstrap = function() {
  var that = {};
  var init = function() {
    $.sub('loading:loaded', onLoaded);
    window.addEventListener( 'resize', onWindowResize, false );
    that.loading = new APP.Loading();

    $('#header li:not(.link-home)').lettering();
    $('#home h2 span i').lettering('words').children('span').lettering();
    $('#home h3 span i').lettering('words').children('span').lettering();

    $.sub('renderer:ready', function(){
     if ( !dt.isMobile() ) {
        animateIntro();
      } else if(dt.isMobi) {
        that.loading.loadingHolder.hide();
        that.loading.fadetoblack.hide();
      }
    });

    // TweenMax.ticker.addEventListener("tick", updateFrame);
    updateFrame();
    if(location.hash == '#debug') { $.sub('renderer:ready', function() { new APP.Debug() }); }
  };

  var onLoaded = function() {
    ddd.bgsound && ddd.bgsound.play();
    new APP.Scenario();
  };

  var animateIntro = function() {

    setTimeout(function () {
      TweenMax.to($('.loading-holder'), 5.0, {'letter-spacing': '150.0em', 'transform': 'scale(0)', ease: Power3.easeOut, onComplete: function(){ $('#loading').css('pointer-events','none') } });
      TweenMax.to($('#fadetoblack'), 3.0, { opacity: 0, ease: Power4.easeOut, delay: 2.0, onComplete: function(){ $('#fadetoblack').css('pointer-events','none') } });
    }, 500);

    setTimeout(function () {
      $('body').addClass('animating-intro');

      TweenMax.from(ddd.camera.position, 3.0, {z: -50, y: 2.0, ease: Power4.easeOut});
      ddd.logo.animateIntro(30);

      var delay = 1.5;

      TweenMax.from($('#home h2'), 2.0, {top:'-110%', ease: Power2.easeOut, delay: delay + 0.2 });
      TweenMax.from($('#home h3'), 2.0, {bottom:'-110%', ease: Power2.easeOut, delay: delay + 0.2});
      TweenMax.from($('#home h2 span'), 2.0, {height: 0, ease: Power4.easeInOut, delay: delay + 0.2 });
      TweenMax.from($('#home h2 span i'), 1.5, {opacity: 0, 'letter-spacing': '4.0em', ease: Power2.easeOut, delay: delay + 0, onComplete: function(){ $('#home h2 span i').addClass('animate') } });
      TweenMax.from($('#home h3 span'), 2.0, {height: 0, ease: Power4.easeInOut, delay: delay + 0.2 });
      TweenMax.from($('#home h3 span i'), 1.5, {opacity: 0, 'letter-spacing': '4.0em', ease: Power2.easeOut, delay: delay + 0, onComplete: function(){ $('#home h3 span i').addClass('animate') } });

      TweenMax.from(ddd.floor.position, 6.0, {y: -3, z: 20, ease: Power1.easeOut});
      TweenMax.from($('#wrapper-border'), 0.5, {'border-width': 0, delay: delay + 1.5});

      TweenMax.from($('#header'), 0.6, {opacity: 0, delay: delay + 1.8});
      TweenMax.from($('#header .a'), 1.5, {width: 0, delay: delay + 1.8, ease: Power4.easeOut});
      TweenMax.from($('#header .b'), 1.5, {width: 0, delay: delay + 1.8, ease: Power4.easeOut});
      TweenMax.from($('#header .link-credits'), 1.5, {opacity: 0, 'transform': 'translateX(+60px)', delay: delay + 2.0, ease: Power4.easeOut});
      TweenMax.from($('#header .link-about')  , 1.5, {opacity: 0, 'transform': 'translateX(-60px)', delay: delay + 2.0, ease: Power4.easeOut});

      // TweenMax.from($('#footer'), 0.6, {opacity: 0, delay: delay + 1.8});
      TweenMax.from($('#footer .download')     , 0.8, {opacity: 0, 'transform': 'translateY(15px)', delay: delay + 2.5, ease: Back.easeOut});
      TweenMax.from($('#footer .powered')      , 1.1, {opacity: 0, 'transform': 'translateY(15px)', delay: delay + 2.7, ease: Back.easeOut});
      TweenMax.from($('#footer .sound-wrapper'), 1.4, {opacity: 0, 'transform': 'translateY(15px)', delay: delay + 2.9, ease: Back.easeOut,
        onComplete: function() {
          $('body').removeClass('animating-intro');
        }
      });

    }, 2000);

  };

  var updateFrame = function() {
    $.pub('update:frame');
    requestAnimationFrame( updateFrame );
  };

  var onWindowResize = function() {
    $.pub('update:windowSize');
  }
  init();
};

}());
