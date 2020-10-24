(function() {

self.APP = self.APP || {};
/**
 * ============================================
 * Debug
 * ============================================
 */
APP.Debug = function() {
  var that = {};
  var init = function(){
    addStats();
    addOrbit();
    addAxisHelper();
    addGUI();
    hideUI();
    $.sub('update:frame', render);
  };

  var hideUI = function() {
    $('#wrapper').hide();
  };

  var addStats = function(){
    ddd.stats = new Stats();
    ddd.stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb
    ddd.stats.domElement.style.position = 'absolute';
    ddd.stats.domElement.style.left = '15px';
    ddd.stats.domElement.style.top = '15px';
    ddd.webglHolder.append(ddd.stats.domElement);
  };


  var addOrbit = function() {
    try {
      ddd.orbit = new THREE.OrbitControls(ddd.camera, ddd.renderer.domElement);
      ddd.orbit.autoRotate = false;
      ddd.orbit.autoRotateSpeed = 5;
    } catch(e) {
      addOrbit();
    }
  };

  var addAxisHelper = function() {
    ddd.axisHelper = new THREE.AxisHelper( 200 );
    ddd.scene.add( ddd.axisHelper );
    ddd.axisHelper.visible = false;
  };


  var addGUI = function() {
    ddd.gui = new dat.GUI({ autoPlace: false});
    //ddd.gui.close()
    ddd.gui.domElement.style.position = 'fixed';
    ddd.gui.domElement.style.top = '0';
    ddd.gui.domElement.style.right = '15px';
    ddd.gui.domElement.style.zIndex = '10000';
    ddd.webglHolder.append( ddd.gui.domElement );

    var addFolder = function(name, func, open) {
      var folder = ddd.gui.addFolder(name);
      open = open === undefined ? false : true;
      folder[open===true?'open':'close']();
      (func)(folder);
      return folder;
    };

    addFolder('Orbit Controls', function(f) {
      f.add(ddd.orbit, 'enabled');
      f.add(ddd.orbit, 'autoRotate');
      f.add(ddd.orbit, 'autoRotateSpeed', 1, 100);

    }, true);

    addFolder('Camera', function(f) {
      f.add(ddd.camera.position, 'z', -100, 100).listen();
      f.add(ddd.camera, 'fov', 1, 180).listen().onChange(function(val){
        ddd.camera.updateProjectionMatrix();
      });
    }, true);


    addFolder('Nav', function(f) {
      var menu = {
        home: function(){ $.pub('section:home'); },
        about: function(){ $.pub('section:about'); },
        credits: function(){ $.pub('section:credits'); }
      };
      f.add(menu, 'home');
      f.add(menu, 'about');
      f.add(menu, 'credits');
    }, true);

    addFolder('angle', function(f) {
      f.add(ddd.angle,'x', 0, 360).listen().onChange();

    }, true);
  };


  var render = function() {
    ddd.stats.update();
    ddd.orbit.update();
  };

  init();

};



}());
