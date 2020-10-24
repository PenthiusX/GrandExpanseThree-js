// var ImprovedNoise = function () {
//
// 	var p = [ 151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
// 		 23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,
// 		 174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,
// 		 133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
// 		 89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
// 		 202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,
// 		 248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
// 		 178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
// 		 14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,
// 		 93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180 ];
//
// 	for (var i = 0; i < 256 ; i ++) {
//
// 		p[256 + i] = p[i];
//
// 	}
//
// 	function fade(t) {
//
// 		return t * t * t * (t * (t * 6 - 15) + 10);
//
// 	}
//
// 	function lerp(t, a, b) {
//
// 		return a + t * (b - a);
//
// 	}
//
// 	function grad(hash, x, y, z) {
//
// 		var h = hash & 15;
// 		var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
// 		return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
//
// 	}
//
// 	return {
//
// 		noise: function (x, y, z) {
//
// 			var floorX = ~~x, floorY = ~~y, floorZ = ~~z;
//
// 			var X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;
//
// 			x -= floorX;
// 			y -= floorY;
// 			z -= floorZ;
//
// 			var xMinus1 = x - 1, yMinus1 = y - 1, zMinus1 = z - 1;
//
// 			var u = fade(x), v = fade(y), w = fade(z);
//
// 			var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
//
// 			return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
// 							grad(p[BA], xMinus1, y, z)),
// 						lerp(u, grad(p[AB], x, yMinus1, z),
// 							grad(p[BB], xMinus1, yMinus1, z))),
// 					lerp(v, lerp(u, grad(p[AA + 1], x, y, zMinus1),
// 							grad(p[BA + 1], xMinus1, y, z - 1)),
// 						lerp(u, grad(p[AB + 1], x, yMinus1, zMinus1),
// 							grad(p[BB + 1], xMinus1, yMinus1, zMinus1))));
//
// 		}
// 	}
// };

























































// Ported from Stefan Gustavson's java implementation
// http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
// Read Stefan's excellent paper for details on how this code works.
//
// Sean McCullough banksean@gmail.com

/**
 * You can pass in a random number generator object if you like.
 * It is assumed to have a random() method.
 */
var SimplexNoise = function(r) {
	if (r == undefined) r = Math;
  this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
                                 [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
                                 [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
  this.p = [];
  for (var i=0; i<256; i++) {
	  this.p[i] = Math.floor(r.random()*256);
  }
  // To remove the need for index wrapping, double the permutation table length
  this.perm = [];
  for(var i=0; i<512; i++) {
		this.perm[i]=this.p[i & 255];
	}

  // A lookup table to traverse the simplex around a given point in 4D.
  // Details can be found where this table is used, in the 4D noise method.
  this.simplex = [
    [0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],
    [0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],
    [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
    [1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],
    [1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],
    [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
    [2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],
    [2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]];
};

SimplexNoise.prototype.dot = function(g, x, y) {
	return g[0]*x + g[1]*y;
};

SimplexNoise.prototype.noise = function(xin, yin) {
  var n0, n1, n2; // Noise contributions from the three corners
  // Skew the input space to determine which simplex cell we're in
  var F2 = 0.5*(Math.sqrt(3.0)-1.0);
  var s = (xin+yin)*F2; // Hairy factor for 2D
  var i = Math.floor(xin+s);
  var j = Math.floor(yin+s);
  var G2 = (3.0-Math.sqrt(3.0))/6.0;
  var t = (i+j)*G2;
  var X0 = i-t; // Unskew the cell origin back to (x,y) space
  var Y0 = j-t;
  var x0 = xin-X0; // The x,y distances from the cell origin
  var y0 = yin-Y0;
  // For the 2D case, the simplex shape is an equilateral triangle.
  // Determine which simplex we are in.
  var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
  if(x0>y0) {i1=1; j1=0;} // lower triangle, XY order: (0,0)->(1,0)->(1,1)
  else {i1=0; j1=1;}      // upper triangle, YX order: (0,0)->(0,1)->(1,1)
  // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
  // c = (3-sqrt(3))/6
  var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
  var y1 = y0 - j1 + G2;
  var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
  var y2 = y0 - 1.0 + 2.0 * G2;
  // Work out the hashed gradient indices of the three simplex corners
  var ii = i & 255;
  var jj = j & 255;
  var gi0 = this.perm[ii+this.perm[jj]] % 12;
  var gi1 = this.perm[ii+i1+this.perm[jj+j1]] % 12;
  var gi2 = this.perm[ii+1+this.perm[jj+1]] % 12;
  // Calculate the contribution from the three corners
  var t0 = 0.5 - x0*x0-y0*y0;
  if(t0<0) n0 = 0.0;
  else {
    t0 *= t0;
    n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);  // (x,y) of grad3 used for 2D gradient
  }
  var t1 = 0.5 - x1*x1-y1*y1;
  if(t1<0) n1 = 0.0;
  else {
    t1 *= t1;
    n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
  }
  var t2 = 0.5 - x2*x2-y2*y2;
  if(t2<0) n2 = 0.0;
  else {
    t2 *= t2;
    n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
  }
  // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].
  return 70.0 * (n0 + n1 + n2);
};

// 3D simplex noise
SimplexNoise.prototype.noise3d = function(xin, yin, zin) {
  var n0, n1, n2, n3; // Noise contributions from the four corners
  // Skew the input space to determine which simplex cell we're in
  var F3 = 1.0/3.0;
  var s = (xin+yin+zin)*F3; // Very nice and simple skew factor for 3D
  var i = Math.floor(xin+s);
  var j = Math.floor(yin+s);
  var k = Math.floor(zin+s);
  var G3 = 1.0/6.0; // Very nice and simple unskew factor, too
  var t = (i+j+k)*G3;
  var X0 = i-t; // Unskew the cell origin back to (x,y,z) space
  var Y0 = j-t;
  var Z0 = k-t;
  var x0 = xin-X0; // The x,y,z distances from the cell origin
  var y0 = yin-Y0;
  var z0 = zin-Z0;
  // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
  // Determine which simplex we are in.
  var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
  var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
  if(x0>=y0) {
    if(y0>=z0)
      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; } // X Y Z order
      else if(x0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; } // X Z Y order
      else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; } // Z X Y order
    }
  else { // x0<y0
    if(y0<z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; } // Z Y X order
    else if(x0<z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; } // Y Z X order
    else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; } // Y X Z order
  }
  // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
  // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
  // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
  // c = 1/6.
  var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
  var y1 = y0 - j1 + G3;
  var z1 = z0 - k1 + G3;
  var x2 = x0 - i2 + 2.0*G3; // Offsets for third corner in (x,y,z) coords
  var y2 = y0 - j2 + 2.0*G3;
  var z2 = z0 - k2 + 2.0*G3;
  var x3 = x0 - 1.0 + 3.0*G3; // Offsets for last corner in (x,y,z) coords
  var y3 = y0 - 1.0 + 3.0*G3;
  var z3 = z0 - 1.0 + 3.0*G3;
  // Work out the hashed gradient indices of the four simplex corners
  var ii = i & 255;
  var jj = j & 255;
  var kk = k & 255;
  var gi0 = this.perm[ii+this.perm[jj+this.perm[kk]]] % 12;
  var gi1 = this.perm[ii+i1+this.perm[jj+j1+this.perm[kk+k1]]] % 12;
  var gi2 = this.perm[ii+i2+this.perm[jj+j2+this.perm[kk+k2]]] % 12;
  var gi3 = this.perm[ii+1+this.perm[jj+1+this.perm[kk+1]]] % 12;
  // Calculate the contribution from the four corners
  var t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
  if(t0<0) n0 = 0.0;
  else {
    t0 *= t0;
    n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0);
  }
  var t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
  if(t1<0) n1 = 0.0;
  else {
    t1 *= t1;
    n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1);
  }
  var t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
  if(t2<0) n2 = 0.0;
  else {
    t2 *= t2;
    n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2);
  }
  var t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
  if(t3<0) n3 = 0.0;
  else {
    t3 *= t3;
    n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3);
  }
  // Add contributions from each corner to get the final noise value.
  // The result is scaled to stay just inside [-1,1]
  return 32.0*(n0 + n1 + n2 + n3);
};
