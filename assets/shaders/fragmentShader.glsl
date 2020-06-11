precision mediump float;

varying vec3 f_position;
varying vec2 f_texCoord;

uniform sampler2D sampler;

void main()
{
	gl_FragColor = vec4(f_position, 1);
}