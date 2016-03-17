glArrayType=typeof Float32Array!='undefined'?Float32Array:typeof Array;

glIndexType=typeof Uint16Array!='undefined'?Uint16Array:typeof Array;

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

var mat4 = {};
mat4.identity = function(){
	var matrix = new glArrayType(16);
	for(var i = 0; i < matrix.length; i++){
		(i%5 == 0) ? matrix[i] = 1.0 : matrix[i] = 0.0;
	}
	return matrix;
};
mat4.scaleX = function(matrix, scale){
	matrix[0] *= scale;
};
mat4.scaleY = function(matrix, scale){
	matrix[5] *= scale;
};
mat4.scaleZ = function(matrix, scale){
	matrix[10] *= scale;
};
mat4.scale = function(matrix, scales){
	matrix[0] *= scale[0];
	matrix[5] *= scale[1];
	matrix[10] *= scale[2];
};
mat4.rotateX = function(matrix, angle){
	var cos = Math.cos(toRadians(angle));
	var sin = Math.sin(toRadians(angle));
	var m1 = matrix[1], m5 = matrix[5], m9 = matrix[9];
	matrix[1] = matrix[1]*cos - matrix[2]*sin;
    matrix[5] = matrix[5]*cos - matrix[6]*sin;
    matrix[9] = matrix[9]*cos - matrix[10]*sin;

    matrix[2] = matrix[2]*cos + m1*sin;
    matrix[6] = matrix[6]*cos + m5*sin;
    matrix[10] = matrix[10]*cos + m9*sin;
};
mat4.rotateY = function(matrix, angle){
	var cos = Math.cos(toRadians(angle));
	var sin = Math.sin(toRadians(angle));
	var m0 = matrix[0], m4 = matrix[4], m8 = matrix[8];
	matrix[0]= matrix[0]*cos + matrix[2]*sin;
    matrix[4]= matrix[4]*cos + matrix[6]*sin;
    matrix[8]= matrix[8]*cos + matrix[10]*sin;

    matrix[2]= matrix[2]*cos - m0*sin;
    matrix[6]= matrix[6]*cos - m4*sin;
    matrix[10]= matrix[10]*cos - m8*sin;
};
mat4.rotateZ = function(matrix, angle){
	var cos = Math.cos(toRadians(angle));
	var sin = Math.sin(toRadians(angle));
	var m0 = matrix[0], m4 = matrix[4], m8 = matrix[8];
	matrix[0]= matrix[0]*cos - matrix[1]*sin;
    matrix[4]= matrix[4]*cos - matrix[5]*sin;
    matrix[8]= matrix[8]*cos - matrix[9]*sin;

    matrix[1]= matrix[1]*cos + m0*sin;
    matrix[5]= matrix[5]*cos + m4*sin;
    matrix[9]= matrix[9]*cos + m8*sin;
};
mat4.translateX = function(matrix, translation){
	matrix[12] += translation;
};
mat4.translateY = function(matrix, translation){
	matrix[13] += translation;
};
mat4.translateZ = function(matrix, translation){
	matrix[14] += translation;
};
mat4.position = function(matrix, position){
	matrix[12] = position[0];
	matrix[13] = position[1];
	matrix[14] = position[2];
};
mat4.perspective = function(FOV, aspectRatio, nearPlane, farPlane){
	var matrix = mat4.identity();
	var scale = (1.0 / Math.tan(toRadians(FOV / 2.0)));
	var frustumLength = (farPlane - nearPlane);
	matrix[0] = scale/aspectRatio;// X Scale
	matrix[5] = scale;// Y Scale
	matrix[10] = -((farPlane + nearPlane) / frustumLength);
	matrix[11] = -1;
	matrix[14] = -((2*farPlane*nearPlane) / frustumLength);
	matrix[15] = 0;
	return matrix;
};
mat4.string = function(matrix){
	var output = "";
	for(var i = 0; i < 16; i++){
		if(i%4 != 3){
			output += matrix[i]+", ";
		}else{
			output += matrix[i]+"\n";
		}
	}
	return output;
};
mat4.glRotateX = function(matrix, angle){
	var cos = Math.cos(toRadians(angle)),
		sin = Math.sin(toRadians(angle)),
		a10 = matrix[4],
		a11 = matrix[5],
		a12 = matrix[6],
		a13 = matrix[7],
		a20 = matrix[8],
		a21 = matrix[9],
		a22 = matrix[10],
		a23 = matrix[11];

	matrix[4] = a10 * cos + a20 * sin;
	matrix[5] = a11 * cos + a21 * sin;
	matrix[6] = a12 * cos + a22 * sin;
	matrix[7] = a13 * cos + a23 * sin;
	matrix[8] = a20 * cos - a10 * sin;
	matrix[9] = a21 * cos - a11 * sin;
	matrix[10] = a22 * cos - a12 * sin;
	matrix[11] = a23 * cos - a13 * sin;
};
mat4.glRotateY = function(matrix, angle){
	var cos = Math.cos(toRadians(angle)),
		sin = Math.sin(toRadians(angle)),
		a00 = matrix[0],
		a01 = matrix[1],
		a02 = matrix[2],
		a03 = matrix[3],
		a20 = matrix[8],
		a21 = matrix[9],
		a22 = matrix[10],
		a23 = matrix[11];

	matrix[0] = a00 * cos - a20 * sin;
	matrix[1] = a01 * cos - a21 * sin;
	matrix[2] = a02 * cos - a22 * sin;
	matrix[3] = a03 * cos - a23 * sin;
	matrix[8] = a20 * cos + a00 * sin;
	matrix[9] = a21 * cos + a01 * sin;
	matrix[10] = a22 * cos + a02 * sin;
	matrix[11] = a23 * cos + a03 * sin;
};
mat4.rotateZ = function(matrix, angle){
	var cos = Math.cos(toRadians(angle)),
		sin = Math.sin(toRadians(angle)),
		a00 = matrix[0],
		a01 = matrix[1],
		a02 = matrix[2],
		a03 = matrix[3],
		a10 = matrix[4],
		a11 = matrix[5],
		a12 = matrix[6],
		a13 = matrix[7];

	matrix[0] = a00 * cos + a10 * sin;
	matrix[1] = a01 * cos + a11 * sin;
	matrix[2] = a02 * cos + a12 * sin;
	matrix[3] = a03 * cos + a13 * sin;
	matrix[4] = a10 * cos - a00 * sin;
	matrix[5] = a11 * cos - a01 * sin;
	matrix[6] = a12 * cos - a02 * sin;
	matrix[7] = a13 * cos - a03 * sin;
};
