
export default class Camera {
	constructor(position, direction, up) {
		this.position = position;
		this.direction = direction;
		this.up = up;
	}

	getViewMatrix() {
		const MAT4 = glMatrix.mat4;

		let matrix = MAT4.create();

		MAT4.lookAt(
			matrix,
			this.position,
			this.direction,
			this.up);

		return matrix;
	}
}