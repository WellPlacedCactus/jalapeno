
import Shader from './modules/graphics/Shader.js'
import Renderer from './modules/Graphics/Renderer.js'
import Texture from './modules/Graphics/Texture.js'

import Camera from './modules/entities/Camera.js'
import Model from './modules/entities/Model.js'
import Entity from './modules/entities/Entity.js'

//** CONSTANTS

const vsPath = './assets/shaders/vertexShader.glsl'
const fsPath = './assets/shaders/fragmentShader.glsl'

const gunModelPath = './assets/models/guns/L85A1.json'

//** ENGINE

let canvas;
let gl;

let vsSource;
let fsSource;

let shader;
let renderer;
let camera;

//** GAME

let model;
let entity;

let gunModel;
let gunVertices;
let gunIndices;

async function loadResources() {
	vsSource = await loadTextResouce(vsPath);
	fsSource = await loadTextResouce(fsPath);

	gunModel = await loadJSONResource(gunModelPath);

	gunVertices = gunModel.meshes[0].vertices;
	// mountainTexCoords = gunModel.meshes[0].texturecoords[0];
	gunIndices = [].concat.apply([], gunModel.meshes[0].faces);

	start();
}

function start() {
	canvas = document.querySelector('#viewport');
	gl = canvas.getContext('webgl');

	resize();
	const fov = 45;
	const asp = canvas.width / canvas.height;
	const zNear = 0.001;
	const zFar = 10000;

	shader = new Shader(gl, vsSource, fsSource);
	renderer = new Renderer(gl, fov, asp, zNear, zFar);
	camera = new Camera(
		[0, 0, 15],
		[0, 0, 0],
		[0, 1, 0]);

	// mountainTexture = new Texture(gl, mountainImage);

	model = new Model(gl,
		gunVertices,
		null,
		gunIndices,
		null);

	entity = new Entity(gl,
		[0, 0, 0],
		[-90, 0, 0],
		[1, 1, 1],
		model);
	
	requestAnimationFrame(loop);
}

function loop() {
	requestAnimationFrame(loop);

	entity.rotate(50, 50, 0);

	shader.bind(gl);

	shader.setMat4(gl, 'view', camera.getViewMatrix());
	shader.setMat4(gl, 'proj', renderer.getProjMatrix());

	renderer.clear(gl);
	renderer.renderEntity(gl, shader, entity);

	shader.unbind(gl);
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
}

async function loadTextResouce(path) {
	const response = await fetch(path);
	const data = await response.text();
	return data;
}

async function loadImageResource(path) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(path);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const image = new Image();

		image.onload = function() {
			resolve(image);
		};
		image.src = url;
	});
}

async function loadJSONResource(path) {
	const text = await loadTextResouce(path);
	const json = JSON.parse(text);
	return json;
}

window.onload = loadResources;
window.onresize = resize;