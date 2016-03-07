var mygl = {};//My GL functions and attributes
var myShaderProgram = {};
var gl = {};
mygl.start = function(){
	mygl.canvas = document.getElementById("glCanvas");
	gl = mygl.canvas.getContext("experimental-webgl");
	mygl.viewportWidth = mygl.canvas.width;
	mygl.viewportHeight = mygl.canvas.height;
}
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
}
mygl.startShader = function(){
	mygl.vertexShader = mygl.getShader("shader-vs");
	mygl.fragmentShader = mygl.getShader("shader-fs");

	mygl.shaderProgram = gl.createProgram();
	gl.attachShader(mygl.shaderProgram, mygl.vertexShader);
	gl.attachShader(mygl.shaderProgram, mygl.fragmentShader);
	gl.linkProgram(mygl.shaderProgram);
	if(!gl.getProgramParameter(mygl.shaderProgram, gl.LINK_STATUS)){
		alert("Could not link shaders");
	}

	gl.useProgram(mygl.shaderProgram);
	myShaderProgram.program = mygl.shaderProgram;
	myShaderProgram.getAllUniformLocations();
}
myShaderProgram.getAllUniformLocations = function(){
	myShaderProgram.location = [];
	myShaderProgram.location["translationMatrix"] = gl.getUniformLocation(myShaderProgram.program, "translationMatrix");
	myShaderProgram.location["rotationMatrix"] = gl.getUniformLocation(myShaderProgram.program, "rotationMatrix");
	myShaderProgram.location["scaleMatrix"] = gl.getUniformLocation(myShaderProgram.program, "scaleMatrix");
	myShaderProgram.location["midTranslationMatrix"] = gl.getUniformLocation(myShaderProgram.program, "midTranslationMatrix");
	myShaderProgram.location["midRotationMatrix"] = gl.getUniformLocation(myShaderProgram.program, "midRotationMatrix");
	myShaderProgram.location["isMidStruct"] = gl.getUniformLocation(myShaderProgram.program, "isMidStruct");
}
mygl.createVBO = function(vertexArray, itemSize){
	var VBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	VBO.itemSize = itemSize;
	VBO.numItems = vertexArray.length/itemSize;
	return VBO;
}
mygl.createIBO = function(indexArray){
	var IBO = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	return IBO;
}
mygl.associate = function(VBO, attributeName){
	gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
	if(VBO.IBO!="undefined"){
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VBO.IBO);
	}
	var attribute = gl.getAttribLocation(mygl.shaderProgram, attributeName);
	gl.vertexAttribPointer(attribute, VBO.itemSize, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(attribute);
	return attribute;
}
mygl.drawSetup = function(){
	gl.clearColor(mygl.background.r, mygl.background.g, mygl.background.b, mygl.background.a);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.viewport(0, 0, mygl.viewportWidth, mygl.viewportHeight);
}
mygl.setViewport = function(width, height){
	mygl.viewportWidth = width;
	mygl.viewportHeight = height;
}
mygl.setBackground = function(r, g, b, a){
	mygl.background = {};
	mygl.background.r = r;
	mygl.background.g = g;
	mygl.background.b = b;
	mygl.background.a = a;
}
