(function() {

self.APP = self.APP || {};


/**
 * ============================================
 * SkyController
 * ============================================
 */
APP.SkyController = function(props) { var that = this;
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
APP.SkyController.prototype.create = function() { var that = this;

  var geometry = new THREE.PlaneBufferGeometry(25, 10, 0, 0);

    that.skyStartTime = Date.now();
    that.skyshadermaterial = new THREE.ShaderMaterial( ddd.skyshader );

    that.sky = new THREE.Mesh(geometry,that.skyshadermaterial);
    that.sky.position.z = -150;
    that.sky.position.y = 2;
    ddd.scene.add(that.sky);
    ddd.skyOrentationChanged = false;
};

/**
 * ============================================
 * render
 * ============================================
 */
APP.SkyController.prototype.render = function() { var that = this;
    that.renderSky();
};


APP.SkyController.prototype.renderSky = function() { var that = this;
    var currentTime = Date.now();
    if(ddd.isMobile &&  ddd.skyOrentationChanged) {
        that.mangeSkyResolution();
        if(ddd.renderIter == 10) {
            ddd.skyOrentationChanged = false;
        }
    }
    else if(!ddd.isMobile) {
        that.mangeSkyResolution();
    }

    that.skyshadermaterial.uniforms[ 'iGlobalTime' ].value = (currentTime - that.skyStartTime) * 0.001;
}

APP.SkyController.prototype.mangeSkyResolution = function() { var that = this;

    if( document.documentElement.clientWidth <= 768 ) {
        that.skyshadermaterial.uniforms[ 'iResolution' ].value.x = document.documentElement.clientWidth * 3.9 ;
        that.skyshadermaterial.uniforms[ 'iResolution' ].value.y = document.documentElement.clientHeight * 3.5 ;
    }
    else if( document.documentElement.clientWidth > 768 && document.documentElement.clientWidth < 1600)
    {
        that.skyshadermaterial.uniforms[ 'iResolution' ].value.x = document.documentElement.clientWidth * 2.0 ;
        that.skyshadermaterial.uniforms[ 'iResolution' ].value.y = document.documentElement.clientHeight * 2.0 ;
    }
    else if(document.documentElement.clientWidth > 1600 && document.documentElement.clientWidth < 1800)
    {
        that.skyshadermaterial.uniforms[ 'iResolution' ].value.x = document.documentElement.clientWidth * 2 ;
        that.skyshadermaterial.uniforms[ 'iResolution' ].value.y = document.documentElement.clientHeight * 2;
    }
    else
    {
        that.skyshadermaterial.uniforms[ 'iResolution' ].value.x = document.documentElement.clientWidth;
        that.skyshadermaterial.uniforms[ 'iResolution' ].value.y = document.documentElement.clientHeight;
    }

}

// End
// ============================================
}());
