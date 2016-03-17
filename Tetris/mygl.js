var mygl = {};//My GL functions and attributes
var myShaderProgram = {};
var gl = {};
mygl.start = function(canvas){
	mygl.canvas = document.getElementById(canvas);
	gl = mygl.canvas.getContext("experimental-webgl");
	mygl.viewportWidth = mygl.canvas.width;
	mygl.viewportHeight = mygl.canvas.height;
	mygl.background = {};
	mygl.background.r = 0.5;
	mygl.background.g = 0.5;
	mygl.background.b = 0.5;
	mygl.background.a = 1.0;
};
mygl.getShader = function(shaderId){
	var shaderScript = document.getElementById(shaderId);
	if(!shaderScript){
		alert("Could not find "+shaderId+" Shader Script");
		return null;
	}
	
	var shader;
	if(shaderScript.type == "x-shader/x-vertex"){
		shader = gl.createShader(gl.VERTEX_SHADER);
	}else if(shaderScript.type == "x-shader/x-fragment"){
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	}else{
		alert(shaderScript.type+" is not a Shader Type");
		return null;
	}

	gl.shaderSource(shader, shaderScript.textContent);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
};
mygl.startShader = function(vertex, fragment){
	mygl.vertexShader = mygl.getShader(vertex);
	mygl.fragmentShader = mygl.getShader(fragment);

	mygl.shaderProgram = gl.createProgram();
	gl.attachShader(mygl.shaderProgram, mygl.vertexShader);
	gl.attachShader(mygl.shaderProgram, mygl.fragmentShader);
	gl.linkProgram(mygl.shaderProgram);
	if(!gl.getProgramParameter(mygl.shaderProgram, gl.LINK_STATUS)){
		alert("Could not link shaders");
	}

	gl.useProgram(mygl.shaderProgram);
	myShaderProgram.program = mygl.shaderProgram;
	// myShaderProgram.getAllUniformLocations(); TODO
};
mygl.createVBO = function(vertexArray, itemSize){
	var VBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	VBO.itemSize = itemSize;
	VBO.numItems = vertexArray.length/itemSize;
	return VBO;
};
mygl.createIBO = function(indexArray){
	var IBO = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	return IBO;
};
mygl.associate = function(VBO, IBO, attributeName){
	gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
	if(IBO !== 'undefined'){
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
	}
	var attribute = gl.getAttribLocation(mygl.shaderProgram, attributeName);
	gl.vertexAttribPointer(attribute, VBO.itemSize, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(attribute);
	return attribute;
};
mygl.drawSetup = function(){
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clearColor(mygl.background.r, mygl.background.g, mygl.background.b, mygl.background.a);
	gl.clearDepth(1.0);
	gl.viewport(0, 0, mygl.viewportWidth, mygl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};
mygl.setCanvasSize = function(width, height){
	mygl.canvas.width = width;
	mygl.canvas.height = height;
};
mygl.setViewport = function(width, height){
	mygl.viewportWidth = width;
	mygl.viewportHeight = height;
};
mygl.setBackground = function(r, g, b, a){
	mygl.background.r = r;
	mygl.background.g = g;
	mygl.background.b = b;
	mygl.background.a = a;
};
mygl.setFullscreen = function(){
	mygl.setCanvasSize(innerWidth, innerHeight);
	mygl.setViewport(innerWidth, innerHeight);
};
