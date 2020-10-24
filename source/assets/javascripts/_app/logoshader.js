ddd.logoshader = {

	uniforms: {

	  "amplitude": { type: "f", value: 0.0 },

		"scale": {type: "f",value: 1}

	},

	vertexShader: [

		"uniform float amplitude;",

		"uniform float scale;",

		"attribute vec3 displacement;",

		"varying vec3 vNormal;",

		"varying vec3 vColor;",

		"void main() {",

			"vNormal = normal;",

			"vColor = vec3(1,1,1);",

			"vec3 newPosition = position;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition * scale, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

	"varying vec3 vNormal;",

    "varying vec3 vColor;",

    "void main() {",

      "const float ambient = 0.4;",

      "vec3 light = vec3( 1.0 );",

      "light = normalize( light );",

      "float directional = max( dot( vNormal, light ), 0.0 );",

      "gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );",

		"}"

	].join( "\n" )

};
