(function() {

self.APP = self.APP || {};


/**
 * ============================================
 * LinesController
 * ============================================
 */
APP.LinesController = function(props) { var that = this;

  that.props = {};

  var init = function(props) {
    that.props = $.extend({}, that.props, props);
  };

  init(props);
};


/**
 * ============================================
 * create
 * ============================================
 */
APP.LinesController.prototype.create = function() { var that = this;
  var scale = 8;
  // var geometry = new THREE.RingGeometry(15, 16, 9, 1);
  var geometry = new THREE.RingGeometry(15, 16, 9, 1);
  var material = new THREE.MeshBasicMaterial( { color: 0xffffff, shading: THREE.FlatShading, wireframe: true, transparent: true, opacity: 0.2 } );
  that.lines = new THREE.Mesh(geometry, material);
  that.lines.scale.set(scale,scale,scale);
  that.lines.rotation.x = math.radians( -90 );
  that.lines.rotation.z = math.radians( -45 );
  that.lines.position.x = 0;
  that.lines.position.y = 7;
  ddd.scene.add(that.lines);
};

/**
 * ============================================
 * render
 * ============================================
 */
APP.LinesController.prototype.render = function() { var that = this;
  var center = new THREE.Vector2(0,0);
  var vLength = that.lines.geometry.vertices.length;
  for (var i = 0; i < vLength; i++) {
    var v = that.lines.geometry.vertices[i];
    var dist = new THREE.Vector2(v.x, v.y).sub(center);
    var size = 1.0;
    var magnitude = 1;
    v.z = Math.sin(dist.length()*dist.length()*dist.length()/-size + (ddd.clock.getElapsedTime()/5)) * magnitude;
  }

  that.lines.rotation.z += 0.0001;
  that.lines.geometry.verticesNeedUpdate = true;
};


// End
// ============================================
}());
