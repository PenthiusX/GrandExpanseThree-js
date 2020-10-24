(function() {

self.APP = self.APP || {};


/**
 * ============================================
 * FloorController
 * ============================================
 */
APP.FloorController = function(props) { var that = this;

  that.props = {
    size: 70,
    divisions: 35
  };

  var init = function(props) {
    that.props = $.extend({}, that.props, props);
    that.createFloor();
    that.addMouseLight({debug:false});
    $.sub('update:frame', function(){ that.render(); });
  };
  init(props);
};

/**
 * ============================================
 * createFloor
 * ============================================
 */
APP.FloorController.prototype.createFloor = function() { var that = this;
  var size = that.props.size;
  var divisions = that.props.divisions;
  var geometry = new THREE.PlaneGeometry( size, size, divisions, divisions );

  var material = [
    new THREE.MeshPhongMaterial( { color: 0xe161be, shading: THREE.FlatShading, vertexColors: THREE.FaceColors, shininess: 0.1 } ),
    new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true, opacity: 0.1 } )
  ];

  if(navigator.userAgent.match(/Android/i)) {
    material = [
      new THREE.MeshPhongMaterial( { color: 0xe161be, shading: THREE.SmoothShading, vertexColors: THREE.FaceColors, shininess: 0.1 } ),
      new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true, opacity: 0.1 } )
    ]
  }

  ddd.floor = THREE.SceneUtils.createMultiMaterialObject( geometry, material );
  ddd.floor.rotation.x = math.radians( -90 );
  ddd.floor.rotation.z = math.radians( -45 );
  ddd.floor.position.y = -5;
  ddd.floor.position.z = -10;

  var center = new THREE.Vector2(0,0);
  var amountVertices = ddd.floor.children[0].geometry.vertices.length;
  that.noise = new SimplexNoise();

  for (var i = 0; i < amountVertices; i++) {
    ddd.floor.children[0].geometry.vertices[i].z = that.noise.noise(i, 0);
  }

  ddd.scene.add( ddd.floor );
};

/**
 * ============================================
 * createFloor
 * ============================================
 */
APP.FloorController.prototype.addMouseLight = function(options) { var that = this;

  if(options.debug) {
    //Create helper
    var sphereGeometry = new THREE.SphereGeometry( 0.05, 30);
    this.rayIntersectionHelper = new THREE.Mesh( sphereGeometry, new THREE.MeshNormalMaterial() );
    ddd.scene.add( this.rayIntersectionHelper );
  }

  //Intersection Plane
  var planeGeometry = new THREE.PlaneGeometry( 100,100 , 20 ,20);
  that.intersectionPlane = new THREE.Mesh( planeGeometry, new THREE.MeshBasicMaterial( {color: 0x10101, wireframe: true , transparent:true , opacity:0.0}));
  that.intersectionPlane.position.y = -5
  that.intersectionPlane.rotation.x = -1.55;

  that.intersectionPlane.name = "floorH";
  ddd.scene.add( that.intersectionPlane );
  //Mouse FeedBack
  $.sub('mousemove', onMouseMove);
  $.sub('mousedown', onMouseMove);

  //Recast obj
  that.raycaster = new THREE.Raycaster();
  //Templight
  that.tempLightArray = new Array();
  // that.tempLight = new THREE.PointLight('#0AF2DB',2.2,40,6);
  that.Light = new THREE.PointLight(0xffffff,1.5,40,6).clone();
  ddd.scene.add(that.Light);
  that.tempLight = that.Light;
 //that.createLight(5);
};

/**
 * ============================================
 * render
 * ============================================
 */
APP.FloorController.prototype.render = function() { var that = this;
  //Light on Intersecton Event
  var fp = that.returnIntersectionPointOnFloor();
  that.LightsOnIntersection(fp);

  var center = new THREE.Vector2(0,0);
  var amountVertices = ddd.floor.children[0].geometry.vertices.length;
  for (var i = 0; i < amountVertices; i++) {
    var currentVertice = ddd.floor.children[0].geometry.vertices[i];
    var newValue = that.noise.noise(i, (ddd.clock.getElapsedTime()/5));
    currentVertice.z = newValue;

    var currentVertice = ddd.floor.children[0].geometry.vertices[i];
    var dist = new THREE.Vector2(currentVertice.x, currentVertice.y).sub(center);
    var size = 2.0;

    var crazyValues = (Math.sin(dist.length()/-size + ddd.clock.getElapsedTime() * 3) / 50);
    currentVertice.z = currentVertice.z - crazyValues; //0.002
  }
  ddd.floor.children[0].geometry.verticesNeedUpdate = true;
};

function onMouseMove( event ) { //on mouse move check for intersection
  ddd.mMouse.x = ( event.clientX / ddd.renderer.domElement.clientWidth ) * 2 - 1;
  ddd.mMouse.y = - ( event.clientY / ddd.renderer.domElement.clientHeight ) * 2 + 1;
}

/**
 * ============================================
 * returnIntersectionPointOnFloor
 * ============================================
 */
APP.FloorController.prototype.returnIntersectionPointOnFloor = function() { var that = this;

  that.raycaster.setFromCamera( ddd.mMouse, ddd.camera );

  var intersects = that.raycaster.intersectObjects(ddd.scene.children);

  for(var i = 0 ; i < intersects.length ;  i++)
  if (intersects[i].object.name == "floorH") {
    return intersects[i].point;
  }
}

/**
 * ============================================
 * LightsOnIntersection
 * ============================================
 */
//Light moves on mouse pointer
APP.FloorController.prototype.LightsOnIntersection = function(point){var that = this;
  if(point != null){
    var duration = 15;
    that.tempLight.position.x += (point.x - that.tempLight.position.x) / duration;
    that.tempLight.position.y += (point.y+3 - that.tempLight.position.y+3) / duration;
    that.tempLight.position.z += (point.z - that.tempLight.position.z) / duration;
    that.rayIntersectionHelper && that.rayIntersectionHelper.position.copy(that.tempLight.position );
  }
}

  //Implementing Lights on Click

// APP.FloorController.prototype.createLight = function(noOfLight) {var that = this;
//   for(var index = 0 ; index < noOfLight ; index++) {
//
//     var tl = new THREE.PointLight(0xffffff,1.5,40,6).clone();
//     tl.position.x =
//     that.tempLightArray.push();
//   }
//   ddd.scene.add(that.tempLightArray[that.tempLightArray.length - 1]);
// }
//
// APP.FloorController.prototype.leaveLightOnMouseDown = function(){ var that = this;
//       if(ddd.mMouse.z == 1){
//
//         that.createLight();
//         for(var i = 0 ; i < that.tempLightArray.length ; i++){
//           that.tempLightArray[i].name = ""+that.tempLightArray.length;
//         }
//         ddd.scene.add(that.tempLightArray[that.tempLightArray.length - 1]);
//         that.tempLight = that.tempLightArray[that.tempLightArray.length - 1];
//         ddd.mMouse.z = 0;
//       }
//   }

// End
// ============================================
}());
