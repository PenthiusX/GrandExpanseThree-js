/**
 * dt.ui
 * @author Diego Tres http://diegotres.com
 *
 * Dependencies:
 * - dt
 */
(function() {

// ============================================================================
// Creates Namespace
// ============================================================================
self.dt.ui = self.dt.ui || {};

// ============================================================================
// Private Variables
// ============================================================================
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];

// ============================================================================
// Params
// ============================================================================
dt.ui.running = true;

// ============================================================================
// Screen Sizes
// ============================================================================
dt.ui.updateScreenSizes = function() {
  var width = w.innerWidth || e.clientWidth || g.clientWidth;
  var height = w.innerHeight || e.clientHeight|| g.clientHeight;
  if( width !== dt.ui.width || height !== dt.ui.height ) {
    dt.ui.availWidth = window.screen.availWidth;
    dt.ui.availHeight = window.screen.availHeight;
    dt.ui.documentHeight = g.scrollHeight;
    dt.ui.documentWidth = g.scrollWidth;
    dt.ui.width = width;
    dt.ui.height = height;
    dt.ui.centerX = width/2;
    dt.ui.centerY = height/2;
    dt.publish('dt:updatedScreenSize');
  }
};

// ============================================================================
// Scroll
// ============================================================================
dt.ui.updateScrollPosition = function() {
  dt.ui.scrollHeight = e.scrollHeight - dt.ui.height;
  var scrolltop = Math.max(0, (w.pageYOffset !== undefined) ?
                               w.pageYOffset :
                              (e || d.body.parentNode || g).scrollTop );
  if(scrolltop > dt.ui.scrollHeight) { scrolltop = dt.ui.scrollHeight; }

  var prevScrollTop = dt.ui.scrollTop || scrolltop;

  if( scrolltop !== dt.ui.scrollTop ) {
    dt.ui.scrollDirection = scrolltop > dt.ui.scrollTop ? 'down' : 'up';
    dt.ui.scrollTop = scrolltop;
    dt.publish('dt:updatedScrollPosition');
  }
};

// ============================================================================
// Mouse
// ============================================================================
dt.ui.mouseX = 0;
dt.ui.mouseY = 0;
dt.ui.mouseXC = 0;
dt.ui.mouseYC = 0;
dt.ui.updateMousePosition = function(event) {
  dt.ui.mouseX = event.clientX || event.pageX || 0;
  dt.ui.mouseY = event.clientY || event.pageY || 0;
  dt.ui.mouseXC = dt.math.map(dt.ui.mouseX, 0, dt.ui.width, -dt.ui.centerX, dt.ui.centerX);
  dt.ui.mouseYC = dt.math.map(dt.ui.mouseY, 0, dt.ui.height, -dt.ui.centerY, dt.ui.centerY);
  dt.publish('dt:updatedMousePosition');
};

// ============================================================================
// Request Animation Frame
// ============================================================================
dt.ui.requestAnimationFrame = function() {
  if( dt.ui.running === true ) {
    dt.ui.updateScreenSizes();
    dt.ui.updateScrollPosition();
    dt.publish('dt:requestedAnimationFrame');
  }
  requestAnimationFrame(dt.ui.requestAnimationFrame);
};

// ============================================================================
// Math Injections
// ============================================================================
dt.math = dt.math || {};

dt.math.percentToPixel = function(percent, axis, relativeTo) {
  percent = parseInt(percent,10);
  axis = axis || 'y';
  relativeTo = relativeTo || 'viewport';

  var pxTarget;
  if( relativeTo === 'viewport' ) {
    if( axis === 'y' ) {
      pxTarget = dt.ui.height;
    }
    else if ( axis === 'x' ) {
      pxTarget = dt.ui.width;
    }
  }
  else if ( relativeTo === 'document' ) {
    if( axis === 'y' ) {
      pxTarget = dt.ui.scrollHeight;
    }
    else if ( axis === 'x' ) {
      pxTarget = dt.ui.scrollWidth;
    }
  }
  else {
    console.error('The property "relativeTo" accepts only "document" or "viewport".');
  }

  return dt.math.map(percent, 0, 100, 0, pxTarget );
};

// ============================================================================
// Start Listeners
// ============================================================================
dt.ui.updateScreenSizes();
dt.ui.updateScrollPosition();
dt.ui.requestAnimationFrame();
document.addEventListener('mousemove', function(event){
  dt.ui.updateMousePosition(event);
  $.pub('mousemove',event);
  // console.log(event);
});

document.addEventListener('mousedown', function(event){
  $.pub('mousedown',event);
  // console.log(event);
});

}());