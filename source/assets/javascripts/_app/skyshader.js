ddd.skyshader = {

	uniforms: {

		"iGlobalTime": { type: "f", value: 1.0 },

		"iResolution": { type: "v2", value: new THREE.Vector2(100,100)}
	},

	vertexShader: [

		"void main() {",

		"gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 10.0, 1.0);",

		"}"

	].join("\n"),

	fragmentShader: [

"uniform vec2 iResolution;",

"uniform float iGlobalTime;",

"float field2(in vec3 p, float s) {",

    "float strength = 4.3 + .03 * log(1.e-6 + fract(/*sin(iGlobalTime)*/1. * 4373.11));",

    "float accum = s/4.;",

    "float prev = 0.;",

    "float tw = 0.;",

   "for (int i = 0; i < 21; ++i) {",

        "float mag = dot(p, p);",

        "p = abs(p) / mag + vec3(-.1, -.4, -1.5);",

        "float w = exp(-float(i) / 7.);",

        "accum += w * exp(-strength * pow(abs(mag - prev), 2.2));",

        "tw += w;",

        "prev = mag;",

    "}",

   "return ( 5.0 * accum / tw - 0.8);",

"}",

"vec3 nrand3( vec2 co ) {",

   "vec3 a = fract( cos( co.x*8.3e-3 + co.y )*vec3(1.3e5, 4.7e5, 2.9e5) );",

    "vec3 b = fract( sin( co.x*0.3e-3 + co.y )*vec3(8.1e5, 1.0e5, 0.1e5) );",

    "vec3 c = mix(a, b, 0.5);",

    "return c;",
"}",

"void mainImage( out vec4 fragColor, in vec2 fragCoord ) {",

    "vec2 uv = 2. * fragCoord.xy / iResolution.xy - 1.;",

    "vec2 uvs = uv * iResolution.xy / max(iResolution.x, iResolution.y);",

    "vec3 p = vec3(uvs / 4., 0) + vec3(1., -1.3, 0.);",

    "float freqs[4];",

    "freqs[0]=1.2;",

    "freqs[1]=-0.01;",

    "freqs[2]=-0.3;",

    "freqs[3]=0.01;",

    "float v = (1.0 - exp((abs(uv.x) - 1.) * 1.)) * (1. - exp((abs(uv.y) - 1.0) * 1.0));",

    "vec3 p2 = vec3(uvs / (2.+sin(iGlobalTime * 0.11) * 0.2 + 0.2 + sin(iGlobalTime * 0.15) * 0.3 + 0.4), 1.5) + vec3(1.98, -1.3, -1.0);",
  //---------------------------------------------Range---mean----------------------------Range---mean-----------------------------Range---mean-------------",
    "p2 += 0.4 * vec3((sin(iGlobalTime / 20.0) * 0.1) + 1.0 , (cos(iGlobalTime / 10.5) * 0.3) - 0.2,  (sin(iGlobalTime * 0.25) * 0.07) + 0.875);",

    "float t2 = field2(p2 ,freqs[3]);",

     "vec4 c2 = mix(.7, 1., v) * vec4(2.3 * t2 * t2  ,1.1 * t2 * t2 , t2 * freqs[0], t2);",

    "vec2 seed = p.xy * 30.;",

    "seed = floor(seed * iResolution.x);",

    "vec3 rnd = nrand3( seed );",

    "vec4 starcolor1 = vec4(pow(rnd.y,80.0));",

    "vec2 seed2 = p2.xy * 1.95;",

    "seed2 = floor(seed2 * iResolution.x);",

    "vec3 rnd2 = nrand3(seed2);",

    "vec4 starcolor2 = vec4(pow(rnd2.y,200.0));",

    //--------------------------------------------------------------------------------------------------------------------col intensity------------col intensity--------col intensity",
    "fragColor = ((mix(freqs[3],0.1,v) * mix(freqs[1],-3.1,v) * vec4(1.5*freqs[2],freqs[1],freqs[3],1.0) + ((c2 * 0.7)*0.9)) * 1.2) + ((starcolor1) * 1.7) + (starcolor2 * 0.75) ;",

"}",

"void main(void) {",

    "mainImage(gl_FragColor,gl_FragCoord.xy);",

"}"

	].join("\n")

};
