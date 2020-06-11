
export default class Texture {
	constructor(gl, image) {
		this.id = gl.createTexture();

		gl.bindTexture(gl.TEXTURE_2D, this.id);

		//** PARAMS

		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	bind(gl) {
		gl.bindTexture(gl.TEXTURE_2D, this.id);
		gl.activeTexture(gl.TEXTURE0);
	}

	unbind(gl) {
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
}