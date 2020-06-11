precision mediump float;

attribute vec3 v_position;
attribute vec2 v_texCoord;

varying vec3 f_position;
varying vec2 f_texCoord;

uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;

void main()
{
	f_position = v_position;
	f_texCoord = v_texCoord;
	gl_Position = proj * view * model * vec4(v_position, 1);
}