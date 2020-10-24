// require ./_vendors/jquery-2.1.4
// require ./_vendors/three
//= require ./_vendors/tween
// require ./_vendors/TweenMax
// require ./_vendors/amplify.core
//= require ./_vendors/howler
//= require ./_vendors/jquery.lettering
//= require ./_vendors/slick
//= require ./_vendors/dt.base
//= require ./_vendors/dt.ui
//= require ./_vendors/dt.math
//= require ./_vendors/dt.webgl.loading
//= require ./_vendors/dt.tiltcam
//= require ./_vendors/three.OBJLoader
//= require ./_vendors/noise
//= require ./_vendors/TessellateModifier
//= require ./_vendors/ExplodeModifier
//= require ./_vendors/dat.gui
//= require ./_vendors/stats
//= require ./_vendors/orbitcontrols
// require ./_vendors/angular

//= require ./_app/skyshader
//= require ./_app/logoshader
//= require ./_app/logoBufferFPosHardCoded

//= require_tree ./_app/scenario

//= require ./_app/analytics
//= require ./_app/debug
//= require ./_app/loading
//= require ./_app/bootstrap


//= require_self

/**
 * Creates the application module
 */
window.GE = angular.module('app', []);

/**
 * Init Application
 */
GE
  .run(['$rootScope', '$timeout', function($rootScope, $timeout){
    ddd.animationInProgress = false;
    $rootScope.activeSection = 'home';
    $rootScope.soundLabel = 'MUSIC ON';

    // window.ddd = ddd || {};
    ddd.webglHolder = $('#webgl-holder');
    ddd.mMouse = new THREE.Vector3();
    $.pub = amplify.publish;
    $.sub = amplify.subscribe;
    $.unsub = amplify.unsubscribe;
    new APP.Bootstrap();

    ddd.bgsound = new Howl({
      urls: ['assets/sounds/music.mp3'],
      autoplay: false,
      loop: true,
      volume: 1
    });

    $('#about .slides').slick({
      dots: true,
      arrows: false,
      autoplay: (dt.isMobile() ? false : true)
    });

    dt.subscribe('dt:updatedScreenSize', function(){
      if( dt.ui.width < 1280 && $rootScope.activeSection != 'home' && !ddd.animationInProgress ) {
        $.pub('section:home');
        $rootScope.activeSection = 'home';
        $rootScope.$apply();
      }
    });
  }])
;
/**
 * Main Controller
 */
GE
  .controller('MainController', ['$scope', function ($scope) {
    $scope.isSoundPlaying = true;
  }])
  .directive('geGo', ['$rootScope', '$window', function($rootScope, $window){
    return {
      link: function($scope, element, attrs) {
        element.on('click', function(){
          if($rootScope.activeSection != attrs.geGo && !ddd.animationInProgress) {
            $.pub('section:'+attrs.geGo);
            $rootScope.activeSection = attrs.geGo;
            $rootScope.$apply();
          }
        });
      }
    }
  }])
  .directive('geToggleSound', ['$rootScope', '$window', function($rootScope, $window){

    return {
      link: function($scope, element, attrs) {
        element.on('click', function(){
          if($scope.isSoundPlaying) {
            ddd.bgsound.pause();
            $.pub('music:playing', false);
            $rootScope.soundLabel = 'MUSIC OFF';
            $rootScope.$apply();
          } else {
            ddd.bgsound.play();
            $.pub('music:playing', true);
            $rootScope.soundLabel = 'MUSIC ON';
            $rootScope.$apply();
          }
          $scope.isSoundPlaying = !$scope.isSoundPlaying;
          $scope.$apply();


        });
      }
    }
  }])
  .directive('geSoundLabel', ['$rootScope', '$window', function($rootScope, $window){
    return {
      link: function($scope, element, attrs) {
        $scope.soundLabel = 'MUSIC ON';
        if($scope.isSoundPlaying) {
          element.html('MUSIC ON');
        } else {
          element.html('MUSIC OFF');
        }
      }
    }
  }])
;

























//
// //= require ./_vendors/amplify.core
// //= require ./_vendors/tween
// //= require ./_vendors/TweenMax
// //= require ./_vendors/howler
// //= require ./_vendors/jquery.lettering
// //= require ./_vendors/slick
// //= require ./_vendors/dt.base
// //= require ./_vendors/dt.ui
// //= require ./_vendors/dt.math
// //= require ./_vendors/dt.webgl.loading
// //= require ./_vendors/dt.tiltcam
// //= require ./_vendors/three.OBJLoader
// //= require ./_vendors/noise
// //= require ./_vendors/TessellateModifier
// //= require ./_vendors/ExplodeModifier
// //= require ./_vendors/dat.gui
// //= require ./_vendors/stats
// //= require ./_vendors/orbitcontrols
//
// //= require ./_app/skyshader
// //= require ./_app/logoshader
// //= require ./_app/logoBufferFPosHardCoded
//
// //= require_tree ./_app/scenario
// //= require ./_app/analytics
// //= require ./_app/debug
// //= require ./_app/loading
// //= require ./_app/bootstrap
//
//
// //= require_self
//
// // (function() {
// //
// // self.APP = self.APP || {};
// //
// // }());
//
//
//
// // console.log('self', self);
// // console.log('self.APP', self.APP);
// // console.log('window.APP', window.APP);
// //
// // console.log('====================');
//
//
//
// /**
//  * Creates the application module
//  */
// window.GE = angular.module('app', []);
//
// /**
//  * Init Application
//  */
// GE
//   .run(['$rootScope', '$timeout', function($rootScope, $timeout){
//
//     // console.log('jQuery', jQuery);
//     // console.log('$', $);
//     // console.log('THREE', THREE);
//     // console.log('amplify', amplify);
//     // console.log('window', window);
//     // console.log('window.APP', window.APP);
//     // console.log('APP', APP);
//
//
//     ddd.animationInProgress = false;
//     $rootScope.activeSection = 'home';
//     $rootScope.soundLabel = 'MUSIC ON';
//
//     // window.ddd = ddd || {};
//     // console.log($, jQuery);
//     ddd.webglHolder = $('#webgl-holder');
//     ddd.mMouse = new THREE.Vector3();
//     $.pub = amplify.publish;
//     $.sub = amplify.subscribe;
//     $.unsub = amplify.unsubscribe;
//     new APP.Bootstrap();
//
//     ddd.bgsound = new Howl({
//       urls: ['assets/sounds/music.mp3'],
//       autoplay: false,
//       loop: true,
//       volume: 1
//     });
//
//     $('#about .slides').slick({
//       dots: true,
//       arrows: false,
//       autoplay: (dt.isMobile() ? false : true)
//     });
//
//     dt.subscribe('dt:updatedScreenSize', function(){
//       if( dt.ui.width < 1280 && $rootScope.activeSection != 'home' && !ddd.animationInProgress ) {
//         $.pub('section:home');
//         $rootScope.activeSection = 'home';
//         $rootScope.$apply();
//       }
//     });
//   }])
// ;
// /**
//  * Main Controller
//  */
// GE
//   .controller('MainController', ['$rootScope', '$timeout', '$scope', function ($rootScope, $timeout, $scope) {
//
//
//
//
//     // $scope.isSoundPlaying = true;
//     //
//     // ddd.animationInProgress = false;
//     // $rootScope.activeSection = 'home';
//     // $rootScope.soundLabel = 'MUSIC ON';
//     //
//     // ddd.webglHolder = $('#webgl-holder');
//     // ddd.mMouse = new THREE.Vector3();
//     // $.pub = amplify.publish;
//     // $.sub = amplify.subscribe;
//     // $.unsub = amplify.unsubscribe;
//     // new APP.Bootstrap();
//     //
//     // ddd.bgsound = new Howl({
//     //   urls: ['assets/sounds/music.mp3'],
//     //   autoplay: false,
//     //   loop: true,
//     //   volume: 1
//     // });
//     //
//     // $('#about .slides').slick({
//     //   dots: true,
//     //   arrows: false,
//     //   autoplay: (dt.isMobile() ? false : true)
//     // });
//     //
//     // dt.subscribe('dt:updatedScreenSize', function(){
//     //   if( dt.ui.width < 1280 && $rootScope.activeSection != 'home' && !ddd.animationInProgress ) {
//     //     $.pub('section:home');
//     //     $rootScope.activeSection = 'home';
//     //     $rootScope.$apply();
//     //   }
//     // });
//
//   }])
//   .directive('geGo', ['$rootScope', '$window', function($rootScope, $window){
//     return {
//       link: function($scope, element, attrs) {
//         element.on('click', function(){
//           if($rootScope.activeSection != attrs.geGo && !ddd.animationInProgress) {
//             $.pub('section:'+attrs.geGo);
//             $rootScope.activeSection = attrs.geGo;
//             $rootScope.$apply();
//           }
//         });
//       }
//     }
//   }])
//   .directive('geToggleSound', ['$rootScope', '$window', function($rootScope, $window){
//
//     return {
//       link: function($scope, element, attrs) {
//         element.on('click', function(){
//           if($scope.isSoundPlaying) {
//             ddd.bgsound.pause();
//             $.pub('music:playing', false);
//             $rootScope.soundLabel = 'MUSIC OFF';
//             $rootScope.$apply();
//           } else {
//             ddd.bgsound.play();
//             $.pub('music:playing', true);
//             $rootScope.soundLabel = 'MUSIC ON';
//             $rootScope.$apply();
//           }
//           $scope.isSoundPlaying = !$scope.isSoundPlaying;
//           $scope.$apply();
//
//
//         });
//       }
//     }
//   }])
//   .directive('geSoundLabel', ['$rootScope', '$window', function($rootScope, $window){
//     return {
//       link: function($scope, element, attrs) {
//         $scope.soundLabel = 'MUSIC ON';
//         if($scope.isSoundPlaying) {
//           element.html('MUSIC ON');
//         } else {
//           element.html('MUSIC OFF');
//         }
//       }
//     }
//   }])
// ;
