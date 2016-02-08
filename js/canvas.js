function getCanvas(canvasId){
	return document.getElementById(canvasId);
}
			
/*  Prepare the Canvas and get return the WebGL context */
function prepare(canvas,context){
	return canvas.getContext(context);
}
			
/*  Defines the geometry and stores it in buffer objects */
function createVBO(gl,vertices){
	//Create new Buffer Object
	var VBO = gl.createBuffer();
	//Bind an empty array buffer to it
	gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
	//Pass the vertices data to the buffer
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	//Unbind the buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	return VBO;
}
			
function createIBO(gl, indices){
	var IBO = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	return IBO;
}
			
/*  Gets the shader code, links to a shader type and compile */
/*  Draws the object */
function draw(gl,canvas,indices){
	//Clear the canvas
	gl.clearColor(0.5,0.5,0.5,0.9);
	//Enable the depth test
	gl.enable(gl.DEPTH_TEST);
	//Clear the color buffer bit
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	//Set the viewport
	gl.viewport(0, 0, canvas.width, canvas.height);
	//Draw the triangle
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

function render(gl,VBO,IBO,indices,shaderProgram,canvas){
	associate(gl,VBO,IBO,shaderProgram);
	draw(gl,canvas,indices);
}

function toRadians(theta){
	return theta * (Math.PI / 180);
}

function getScaleMatrix(Sx, Sy, Sz){
	return new Float32Array([
		Sx, 0.0, 0.0, 0.0,
		0.0, Sy, 0.0, 0.0,
		0.0, 0.0, Sz, 0.0,
		0.0, 0.0, 0.0, 1.0
	]);
}

function getTranslationMatrix(Tx, Ty, Tz){
	return new Float32Array([
		1.0, 0.0, 0.0, Tx,
		0.0, 1.0, 0.0, Ty,
		0.0, 0.0, 1.0, Tz,
		0.0, 0.0, 0.0, 1.0
	]);
}

function getRotationMatrix(theta){
	return new Float32Array([
		Math.cos(toRadians(theta)), -Math.sin(toRadians(theta)), 0.0, 0.0,
		Math.sin(toRadians(theta)), Math.cos(toRadians(theta)), 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	]);
}
