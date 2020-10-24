(function() {

self.APP = self.APP || {};
/**
 * ============================================
 * LogoController
 * ============================================
 */
APP.LogoController = function(props) { var that = this;

  that.props = {};

  var init = function(props) {
    that.props = $.extend({}, that.props, props);
    that.create();
    that.loadModelIntoScene();
    that.defineInitialVertexPosition();
    $.sub('update:frame', function(){ that.render(); });
  };
  init(props);
};

/**
 * ============================================
 * create
 * ============================================
 */
APP.LogoController.prototype.create = function() { var that = this;
  //Logo Vars ==============================
  ddd.multiplier = new THREE.Vector2(10,0,0);
  that.iscontext = 0;//context for Home button\
  that.frameCountAb1 = 0;//FrameCount Timer for the About function
  that.frameCountAb2 = 0;//FrameCount Timer for the Credits function
  that.whentoInterpolate = 1;
  that.strengthMod = 0;
  that.vel = new THREE.Vector3();//acceleration
  ddd.hasExploded = false;
  ddd.callonceEx = 0;
  that.animationDuration = 15;

  ddd.angle = new THREE.Vector3(3,0,0);//THe angle for the Logo Particle to fly off at.
  ddd.displacement = new THREE.Vector3(0,0,0);

  that.iter = 0;
  ddd.tween_iter = 0;
  ddd.locExploarr = new Array();
  that.particleUpdateInfoArr = new Array();
};

/**
 * ============================================
 * defineInitialVertexPosition
 * ============================================
 */
APP.LogoController.prototype.defineInitialVertexPosition = function() { var that = this;
  for(var i = 0 , il = that.logoBufferGeometry.geometry.attributes.position.array.length; i < il ; i++) {
    that.logoBufferGeometry.geometry.attributes.position.array[i] = ddd.logoBufferHardcodedArray[i];
  }
  ddd.hasExploded = true;
};

/**
 * ============================================
 * animateReset
 * ============================================
 */
APP.LogoController.prototype.animateIntro = function(duration) { var that = this;
  that.animationDuration = duration || 60;
  ddd.logo_reset = true;
};



APP.LogoController.prototype.render = function() { var that = this;
  if(!dt.isMobile()) {
    if(ddd.logo_reset) {
      that.logoReset();
    }
    else if(ddd.iscontextA || ddd.iscontextC) {
      that.explode();
    }
  }
  else if(dt.isMobile() && ddd.mMouse.z == 1 && ddd.hasExploded == false) {
    that.explode();
  }
  else if(dt.isMobile() && ddd.mMouse.z == 0 && ddd.hasExploded == true) {
    that.logoReset();
  }
  that.logoBufferGeometry.geometry.attributes.position.needsUpdate = true;
}

/*
 * ======================================================================
 *  Functions
 * ======================================================================
 */
APP.LogoController.prototype.loadModelIntoScene = function() { var that = this;
  //Loading up the Model
  var bufferGeometry = (APP.files['assets/models/grand_expanse_logo.obj']).children[0].geometry;
  var bufferGeometry2 = bufferGeometry;

  that.logoGeometry = new THREE.Geometry().fromBufferGeometry( bufferGeometry );
  that.logo_geometry2 = new THREE.Geometry().fromBufferGeometry( bufferGeometry2 );

  var tessellateModifier = new THREE.TessellateModifier( 12 ); // 8
  for ( var i = 0; i < 10; i ++ ) {
    tessellateModifier.modify(that.logoGeometry);
    tessellateModifier.modify(that.logo_geometry2);
  }

  var explodeModifier = new THREE.ExplodeModifier();
  explodeModifier.modify(that.logoGeometry);
  explodeModifier.modify(that.logo_geometry2);
  that.numFaces =   that.logoGeometry.faces.length;

  that.logoBufferGeometry = new THREE.BufferGeometry().fromGeometry(that.logoGeometry);
  that.logoBufferGeometry2 = new THREE.BufferGeometry().fromGeometry(that.logo_geometry2);

  that.buffShaderMaterial = new THREE.ShaderMaterial( ddd.logoshader );
  that.buffShaderMaterial.uniforms[ 'scale' ].value = 0.015;

//multiple clone instancing
  that.logoBufferGeometry = new THREE.Mesh(that.logoBufferGeometry.clone(),that.buffShaderMaterial.clone());//Hacking a scope clone instance
  that.logoBufferGeometry2 = new THREE.Mesh(that.logoBufferGeometry2.clone(),that.buffShaderMaterial.clone());


  that.logoBufferGeometry.name = "new_Buffer_Clone";
  that.logoBufferGeometry2.name = "new_Buffer_reloaded";//the hidden instance for home interpolation

  that.logoBufferGeometry.position.y = 1.2;
  that.logoBufferGeometry.position.x = 1.1;

//scale promotional to screen resolution
  (function() {
    var adjustResponsiveLogo = function() {
      var scale = window.innerWidth < 560 ? dt.ui.width * 0.0026 : 1;
      that.logoBufferGeometry.scale.set(scale,scale,scale);
    };

    dt.subscribe('dt:updatedScreenSize', function(){ adjustResponsiveLogo(); });
    adjustResponsiveLogo();
  })();

  ddd.scene.add(that.logoBufferGeometry);
}

APP.LogoController.prototype.animateLogo = function(finalPosition, duration) { var that = this;
  var currentPosition = that.logoBufferGeometry.geometry.attributes.position.array;
  var dist = finalPosition[0] - currentPosition[0];
  var d = Math.sqrt(dist * dist);
  if(d > 0.00000000005) {
    for(var i = 0 , il = that.logoBufferGeometry.geometry.attributes.position.array.length; i < il ; i++) {
      currentPosition[i] += (finalPosition[i] - currentPosition[i]) / duration;
    }
  }
  else {
     ddd.hasExploded = !ddd.hasExploded;
     ddd.mMouse.z = 0;
     $.pub('logo:animationEnd');
  }
};

APP.LogoController.prototype.logoReset = function() { var that = this;
  var finalPosition = that.logoBufferGeometry2.geometry.attributes.position.array;
  that.animateLogo(finalPosition, that.animationDuration);
}

APP.LogoController.prototype.explode = function() { var that = this;
  var finalPosition = ddd.logoBufferHardcodedArray;
  that.animateLogo(finalPosition, that.animationDuration);
}

// End
// ============================================
}());
