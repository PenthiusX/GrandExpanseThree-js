(function() {

self.APP = self.APP || {};


/**
 * ============================================
 * FilmSet
 * ============================================
 */
APP.FilmSet = function(props) { var that = this;

  that.props = {
    clock: true,
    tiltcam: true,
    lights: true
  };

  var init = function(props) {
    that.props = $.extend({}, that.props, props);
    that.prepare();
    $.sub('update:frame', function(){ that.render(); });
  };

  init(props);
};

/**
 * ============================================
 * prepare
 * ============================================
 */
APP.FilmSet.prototype.prepare = function() { var that = this;
  that.addClock();
  that.addRenderer();
  that.addScene();
  that.addCamera();
  that.addLights();
};

/**
 * ============================================
 * clock
 * ============================================
 */
APP.FilmSet.prototype.addClock = function() { var that = this;
  ddd.clock = new THREE.Clock(true);
  ddd.logoParticleClock = new THREE.Clock(true);
  ddd.tick = 0;
};

/**
 * ============================================
 * renderer
 * ============================================
 */
APP.FilmSet.prototype.addRenderer = function() { var that = this;
  ddd.renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  ddd.renderer.setClearColor( 0x000000 );
  ddd.renderer.setPixelRatio( window.devicePixelRatio );
  ddd.renderer.setSize( window.innerWidth, window.innerHeight );
  ddd.webglHolder.append( ddd.renderer.domElement );
};

/**
 * ============================================
 * scene
 * ============================================
 */
APP.FilmSet.prototype.addScene = function() { var that = this;
  ddd.scene = new THREE.Scene();
};

/**
 * ============================================
 * camera
 * ============================================
 */
APP.FilmSet.prototype.addCamera = function() { var that = this;
  ddd.camera = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 0.1, 100000 );
  ddd.camera.position.set(1.1,1.25,50);
};


/**
 * ============================================
 * lights
 * ============================================
 */
APP.FilmSet.prototype.addLights = function() { var that = this; var opt = {};

  ddd.ambientLight = new THREE.AmbientLight( 0x000000 );
  ddd.scene.add( ddd.ambientLight );

  // pink
  opt = { color: '#f4a5cc', intensity: 1.5, distance: 40, decay: 2, x: 0, y: 2, z: 0 };
  ddd.pointLight = new THREE.PointLight(opt.color,opt.intensity,opt.distance,opt.decay);
  ddd.pointLight.position.set(opt.x,opt.y,opt.z);
  ddd.scene.add(ddd.pointLight);

  // blue
  opt = { color: '#0085d6', intensity: 1.3, distance: 30, decay: 2, x: 0, y: 2, z: 0 };
  ddd.pointLight2 = new THREE.PointLight(opt.color,opt.intensity,opt.distance,opt.decay);
  ddd.pointLight2.position.set(opt.x,opt.y,opt.z);
  ddd.scene.add(ddd.pointLight2);

  // purple
  opt = { color: '#3d0e3b', intensity: 0.8, distance: 20, decay: 20, x: 0, y: 3.5, z: 0 };
  ddd.pointLight3 = new THREE.PointLight(opt.color,opt.intensity,opt.distance,opt.decay);
  ddd.pointLight3.position.set(opt.x,opt.y,opt.z);
  ddd.scene.add(ddd.pointLight3);


  ddd.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
  ddd.directionalLight.position.set( 1, 1, 0 ).normalize();
  ddd.scene.add( ddd.directionalLight );
};


/**
 * ============================================
 * render
 * ============================================
 */

APP.FilmSet.prototype.render = function() { var that = this; var opt = {};
  var tictac = ddd.clock.getElapsedTime();

  ddd.camera.position.z = ddd.camera.position.z + ((Math.sin(tictac) * 0.0055));

  // =========================
  // pink pointlight
  // =========================
  opt = {
    x: { amplitude: 10, speed: 0.4 },
    z: { amplitude: 10, speed: 0.8 }
  };
  ddd.pointLight.position.x = -0 + Math.sin(tictac*opt.x.speed) * opt.x.amplitude;
  ddd.pointLight.position.z = -3 + Math.sin(tictac*opt.z.speed) * opt.z.amplitude;


  // =========================
  // blue pointlight
  // =========================
  opt = {
    x: { amplitude: 8 , speed: 0.5 },
    z: { amplitude: 14, speed: 0.7 }
  };
  ddd.pointLight2.position.x = -0 + Math.sin(tictac*opt.x.speed) * opt.x.amplitude;
  ddd.pointLight2.position.z = -1 + Math.sin(tictac*opt.z.speed) * opt.z.amplitude;


  // =========================
  // green pointlight
  // =========================
  opt = {
    x: { amplitude: 12 , speed: 0.3 },
    z: { amplitude: 11, speed: 0.6 }
  };
  ddd.pointLight3.position.x = -2 + Math.sin(tictac*opt.x.speed) * opt.x.amplitude;
  ddd.pointLight3.position.z = -2 + Math.sin(tictac*opt.z.speed) * opt.z.amplitude;

};


// End
// ============================================
}());
