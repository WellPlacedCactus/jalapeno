
export default class Shader {
	constructor(gl, vsSource, fsSource) {

		this.vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vsSource);
		this.fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fsSource);
		
		//** CREATE PROGRAM

		this.program = gl.createProgram();
		gl.attachShader(this.program, this.vertexShader);
		gl.attachShader(this.program, this.fragmentShader);
		gl.linkProgram(this.program);

		//** PILE PROGRAM

		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			console.log('[SHADER PROGRAM] Error linking :(');
			console.log(gl.getProgramInfoLog(this.program));
		}
	}

	async getSource(filePath) {
		await fetch(filePath)
			.then(response => response.text())
			.then(data => {
				return data;
			})
			.catch(error => {
				console.log(error);
				return null;
			});
	}

	createShader(gl, type, source) {

		//** CREATE SHADER

		let shader = gl.createShader(type);

		//** SRC AND PILE SHADER

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.log('[SHADER] Error compiling :(');

			switch (type) {
				case gl.VERTEX_SHADER:
					console.log('[SHADER] Vertex Shader Error');
					break;
				case gl.FRAGMENT_SHADER:
					console.log('[SHADER] Fragment Shader Error');
					break;
			}

			console.log(gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}

		//** RET SHADER

		return shader;
	}

	bind(gl) {
		gl.useProgram(this.program);
	}

	unbind(gl) {
		gl.useProgram(null);
	}

	//** SETTERS

	setMat4(gl, name, value) {
		let location = gl.getUniformLocation(this.program, name);

		gl.uniformMatrix4fv(location, gl.FALSE, value);
	}
}