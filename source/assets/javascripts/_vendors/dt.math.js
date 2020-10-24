/**
 * dt.math
 * @author Diego Tres http://diegotres.com
 *
 * Dependencies:
 * - dt
 */
(function() {

// ============================================================================
// Creates namespace
// ============================================================================
self.dt.math = self.dt.math || {};

// ============================================================================
// Math Helpers
// ============================================================================
dt.math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

dt.math.map = function(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};

dt.math.random = function(min, max, toInt) {
  var result;
  toInt = toInt || false;

  if(min === undefined && max === undefined) {
    result = Math.random();
  }
  else if( min !== undefined && max !== undefined) {
    result = Math.random() * (max - min + 1) + min;
  }
  else {
    result = dt.math.random(0, min);
  }
  return toInt ? ~~result : result;
}



}());




(function() {

// ============================================================================
// Creates namespace
// ============================================================================
self.math = self.math || {};

// ============================================================================
// Math Helpers
// ============================================================================
math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

math.map = function(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};

math.random = function(min, max, toInt) {
  var result;
  toInt = toInt || false;

  if(min === undefined && max === undefined) {
    result = Math.random();
  }
  else if( min !== undefined && max !== undefined) {
    result = Math.random() * (max - min + 1) + min;
  }
  else {
    result = dt.math.random(0, min);
  }
  return toInt ? ~~result : result;
}



}());





