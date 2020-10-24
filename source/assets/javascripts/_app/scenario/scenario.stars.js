(function() {

self.APP = self.APP || {};

/**
 * ============================================
 * StarsController
 * ============================================
 */
APP.StarsController = function(props) { var that = this;

  that.props = {};

  var init = function(props) {
    that.props = $.extend({}, that.props, props);
    that.create();
    $.sub('update:frame', function(){ that.render(); });
  };
  init(props);
};

/**
 * ============================================
 * create
 * ============================================
 */
APP.StarsController.prototype.create = function() { var that = this;
  var amount = 500;
  var radiusInside = 1;
  var thickness = 20;
  var yvar = 8;

  var geometry = new THREE.Geometry();
  var material = new THREE.PointsMaterial({
    size: 0.01,
    color: 0xffffff,
    transparent: true,
    opacity: 0.3
  });

  for (var i = 0; i < amount; i++) {
    var x = math.random(1, thickness) * radiusInside * Math.cos(2 * Math.PI * i / amount);
    var y = math.random(-1*yvar, yvar);
    var z = math.random(1, thickness) * radiusInside * Math.sin(2 * Math.PI * i / amount);
    var vector = new THREE.Vector3(x, y, z);
    geometry.vertices.push(vector);
  }
  that.stars = new THREE.Points(geometry, material);
  ddd.scene.add(that.stars);
};

/**
 * ============================================
 * render
 * ============================================
 */
APP.StarsController.prototype.render = function() { var that = this;
  that.stars && (that.stars.rotation.y += 0.0006);
};
// End
// ============================================
}());
