class Shader{
	this.shaderTypes = {'vertex': ['vertex-glsl', () => {
												this.shader = gl.createShader(gl.VERTEX_SHADER);
											}],
											'fragment': ['fragment-glsl', () => {
												this.shader = gl.createShader(gl.VERTEX_SHADER);
											}]};
	this.shaderType,this.shader,this.shaderScript, 
	this.shaderCode;

	constructor(shaderType){
		this.shaderType = shaderType;
		this.setShaderScript();
		this.createShader();
	}

	setShaderScript(){
		this.shaderScript = document.getElementById(id);
	}
	
	createShader(){
		this.shaderCode = this.shaderScript.textContent;
		if(this.shaderScript.type == "vertex-glsl"){
			this.shader = gl.createShader(gl.VERTEX_SHADER);
		}else if(this.shaderScript.type == "fragment-glsl"){
			this.shader = gl.createShader(gl.FRAGMENT_SHADER);
		}		
		gl.shaderSource(shader, code);
		gl.compileShader(shader);
		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
			alert(gl.shaderInfoLog(shader));
			return;
		}
		return shader;
	}
}

/*  Create and Compile shader programs */
function startShaders(gl){
	
	var vertShader = getShader(gl, "VSHADER_CODE");

	var fragShader = getShader(gl, "FSHADER_CODE");
	
	//Create a shader program object to store combined shader program
	var shaderProgram = gl.createProgram();
	//Attach a vertex shader
	gl.attachShader(shaderProgram, vertShader);
	//Attach a fragment shader
	gl.attachShader(shaderProgram, fragShader);
	//Link both shaders
	gl.linkProgram(shaderProgram);
	//Use the combined shader program object
	gl.useProgram(shaderProgram);
	
	return shaderProgram;
}

/*  Associate the shader programs to buffer objects */
function associate(gl,VBO,IBO,attribute,size,shaderProgram){
	//Bind vertex buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
	if(IBO!=null){
		//Bind index buffer object
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
	}
	//Get the attribute location
	var coord = gl.getAttribLocation(shaderProgram, attribute);
	//Point an attribute to the currently bound VBO
	gl.vertexAttribPointer(coord, size, gl.FLOAT, false, 0, 0);
	//Enable the attribute
	gl.enableVertexAttribArray(coord);
}


