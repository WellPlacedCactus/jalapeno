
export default class Entity {
	constructor(gl, position, rotation, scale, model) {
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;
		this.model = model;
	}

	move(x, y, z) {
		this.position[0] += x;
		this.position[1] += y;
		this.position[2] += z;
	}

	rotate(x, y, z) {
		const GLM = glMatrix.glMatrix;

		this.rotation[0] += GLM.toRadian(x);
		this.rotation[1] += GLM.toRadian(y);
		this.rotation[2] += GLM.toRadian(z);
	}

	resize(x, y, z) {
		this.scale[0] = x;
		this.scale[1] = y;
		this.scale[2] = z;
	}

	getModelMatrix() {
		const GLM = glMatrix.glMatrix;
		const MAT4 = glMatrix.mat4;

		let identity = MAT4.create();

		let tm = MAT4.create();
		let rm = MAT4.create();
		let sm = MAT4.create();

		MAT4.translate(tm, rm, this.position);
		MAT4.rotate(rm, rm, GLM.toRadian(this.rotation[0]), [1, 0, 0]);
		MAT4.rotate(rm, rm, GLM.toRadian(this.rotation[1]), [0, 1, 0]);
		MAT4.rotate(rm, rm, GLM.toRadian(this.rotation[2]), [0, 0, 1]);
		MAT4.scale(sm, sm, this.scale);

		MAT4.mul(tm, tm, rm);
		return MAT4.mul(sm, sm, tm);
	}
}