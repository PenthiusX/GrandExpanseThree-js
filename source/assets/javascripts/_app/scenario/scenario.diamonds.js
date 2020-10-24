(function() {

self.APP = self.APP || {};
  
/**
 * ============================================
 * DiamondsController
 * ============================================
 */
APP.DiamondsController = function(props) { var that = this;

  that.props = {
    size: 100,
    divisions: 50
  };

  var init = function(props) {
    that.props = $.extend({}, that.props, props);
    that.create();
    that.createRelatedLights();
    $.sub('update:frame', function(){ that.render(); });
  };

  init(props);
};

/**
 * ============================================
 * create
 * ============================================
 */
APP.DiamondsController.prototype.create = function() { var that = this;
  var geometry = (APP.files['assets/models/diamond.obj']).children[0].geometry;
  var material2 = new THREE.MeshNormalMaterial({});
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 10,
    transparent: true,
    opacity: 0.99,
    side: THREE.DoubleSide
  });
  var scale = 1.2;

  that.diamond = new THREE.Mesh( geometry, material2 );
  that.diamond.scale.set(scale,scale,scale);
  that.diamond.position.set( 17, 9, -20 );
  ddd.scene.add( that.diamond );

  var scale = 0.8;

  that.diamond2 = new THREE.Mesh( geometry, material2 );
  that.diamond2.scale.set(scale,scale,scale);
  that.diamond2.position.set( -19, 1, -40 );
  ddd.scene.add( that.diamond2 );


  that.diamond3 = new THREE.Mesh( geometry, material );
  that.diamond3.scale.set(scale,scale,scale);
  that.diamond3.position.set( 15, 0, 0 );
   //ddd.scene.add( that.diamond3 );
  
};

/**
 * ============================================
 * createRelatedLights
 * ============================================
 */
APP.DiamondsController.prototype.createRelatedLights = function() { var that = this; var opt = {};
  // lights related to geometry 1
  var defaultOpt = {intensity: 1.7, distance: 20, decay: 2};

  opt = $.extend({},defaultOpt,{ color: '#ff4cbf'});
  that.pointLight1 = new THREE.PointLight(opt.color,opt.intensity,opt.distance,opt.decay);
  ddd.scene.add(that.pointLight1);

  opt = $.extend({},defaultOpt,{ color: '#2f38a5'});
  that.pointLight2 = new THREE.PointLight(opt.color,opt.intensity,opt.distance,opt.decay);
  // ddd.scene.add(that.pointLight2);

  opt = $.extend({},defaultOpt,{ color: '#271530'});
  that.pointLight3 = new THREE.PointLight(opt.color,opt.intensity,opt.distance,opt.decay);
  ddd.scene.add(that.pointLight3);

  // lights related to geometry 2
  opt = $.extend({},defaultOpt,{ color: '#271530'});
  that.pointLight4 = new THREE.PointLight(opt.color,opt.intensity,opt.distance,opt.decay);
  ddd.scene.add(that.pointLight4);

  opt = $.extend({},defaultOpt,{ color: '#ff4cbf'});
  that.pointLight5 = new THREE.PointLight(opt.color,opt.intensity,opt.distance,opt.decay);
  // ddd.scene.add(that.pointLight5);

  opt = $.extend({},defaultOpt,{ color: '#2f38a5'});
  that.pointLight6 = new THREE.PointLight(opt.color,opt.intensity,opt.distance,opt.decay);
  ddd.scene.add(that.pointLight6);
};

/**
 * ============================================
 * render
 * ============================================
 */
APP.DiamondsController.prototype.render = function() { var that = this;
  var time = Date.now() * 0.0005;
	var delta = ddd.clock.getDelta();

  // diamond 1
  that.diamond.rotation.y -= 0.01;
  that.diamond.position.y = 8 + Math.sin(ddd.clock.getElapsedTime()/2);

	that.pointLight1.position.x = that.diamond.position.x + Math.cos( time * 0.7 ) * 3;
	that.pointLight1.position.y = that.diamond.position.y + Math.cos( time * 1.5 ) * 4;
	that.pointLight1.position.z = that.diamond.position.z + Math.sin( time * 0.3 ) * 3;

  that.pointLight2.position.x = that.diamond.position.x - Math.cos( time * 0.3 ) * 3;
	that.pointLight2.position.y = that.diamond.position.y + Math.sin( time * 0.5 ) * 4;
	that.pointLight2.position.z = that.diamond.position.z - Math.cos( time * 1.7 ) * 3;

  that.pointLight3.position.x = that.diamond.position.x + Math.sin( time * 1.7 ) * 3;
	that.pointLight3.position.y = that.diamond.position.y - Math.cos( time * 0.3 ) * 4;
	that.pointLight3.position.z = that.diamond.position.z + Math.sin( time * 0.5 ) * 3;


  // diamond 2
  that.diamond2.rotation.y -= 0.005;
  that.diamond2.position.y = -1 + Math.cos(ddd.clock.getElapsedTime()/3);

  that.pointLight4.position.x = that.diamond2.position.x + Math.cos( time * 1.7 ) * 3;
	that.pointLight4.position.y = that.diamond2.position.y + Math.cos( time * 1.5 ) * 4;
	that.pointLight4.position.z = that.diamond2.position.z + Math.sin( time * 1.3 ) * 3;

  that.pointLight5.position.x = that.diamond2.position.x + Math.cos( time * 1.3 ) * 3;
	that.pointLight5.position.y = that.diamond2.position.y + Math.cos( time * 1.5 ) * 4;
	that.pointLight5.position.z = that.diamond2.position.z + Math.sin( time * 1.7 ) * 3;

  that.pointLight6.position.x = that.diamond2.position.x + Math.sin( time * 1.7 ) * 3;
	that.pointLight6.position.y = that.diamond2.position.y + Math.cos( time * 1.3 ) * 4;
	that.pointLight6.position.z = that.diamond2.position.z + Math.sin( time * 1.5 ) * 3;
};
// End
// ============================================
}());
