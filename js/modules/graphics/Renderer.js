
export default class Renderer {
	constructor(gl, fov, asp, zNear, zFar) {
		this.fov = glMatrix.glMatrix.toRadian(fov);
		this.asp = asp;
		this.zNear = zNear;
		this.zFar = zFar;
	}

	clear(gl) {
		gl.clearColor(0.75, 0.85, 0.8, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		gl.frontFace(gl.CCW);
		gl.cullFace(gl.BACK);
	}

	renderModel(gl, shader, model) {
		shader.bind(gl);

		// model.texture.bind(gl);

		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, model.positionBuffer);
		gl.bindBuffer(gl.ARRAY_BUFFER, model.texCoordBuffer);

		gl.drawElements(gl.TRIANGLES, model.indices.length, gl.UNSIGNED_SHORT, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		gl.disableVertexAttribArray(1);
		gl.disableVertexAttribArray(0);

		// model.texture.unbind(gl);

		shader.unbind(gl);
	}

	renderEntity(gl, shader, entity) {
		shader.bind(gl);

		shader.setMat4(gl, 'model', entity.getModelMatrix());

		this.renderModel(gl, shader, entity.model);

		shader.unbind(gl);
	}

	getProjMatrix() {
		const MAT4 = glMatrix.mat4;

		let matrix = MAT4.create();

		MAT4.perspective(
			matrix,
			this.fov,
			this.asp,
			this.zNear,
			this.zFar);

		return matrix;
	}
}