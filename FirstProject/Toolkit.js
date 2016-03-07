glArrayType=typeof Float32Array!="undefined"?Float32Array:typeof WebGLFloatArray!="undefined"?WebGLFloatArray:Array;

glIndexType=typeof Uint16Array!="undefined"?Uint16Array:typeof Array;

function toRadians(deegrees){
	return deegrees * Math.PI / 180;
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback, element) {
		window.setTimeout(callback, 1000/60);
		};
})();

var mat = {};
mat.createTranslation = function(Tx, Ty, Tz){
	var matrix = new glArrayType(16);
	for(var i = 0; i<matrix.length; i++){
		(i%5 == 0) ? matrix[i] = 1.0 : matrix[i]= 0.0;
	}
	matrix[3] = Tx;
	matrix[7] = Ty;
	matrix[11] = Tz;
	return matrix;
}
mat.createRotation = function(angle){
	var matrix = new glArrayType(16);
	for(var i = 0; i<matrix.length; i++){
		(i%5 == 0) ? matrix[i] = 1.0 : matrix[i]= 0.0;
	}
	matrix[0] = matrix[5] = Math.cos(toRadians(angle));
	matrix[1] -= matrix[4] = Math.sin(toRadians(angle));
	return matrix;
}
mat.createScale = function(Sx, Sy, Sz){
	var matrix = new glArrayType(16);
	for(var i = 0; i<matrix.length; i++){
		(i%5 == 0) ? matrix[i] = 1.0 : matrix[i]= 0.0;
	}
	matrix[0] = Sx;
	matrix[5] = Sy;
	matrix[10] = Sz;
	return matrix;
}