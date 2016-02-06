var canvas, gl, vertices, VBO, indeces,
		IBO, colors, CBO;
var shaderProgram, Sx, Sy, Sz, ScaleMatrix;
var Tx, Ty, Tz, TranslationMatrix; 
		
vertices = [5, 1, -1, 1, 1, -1, -1, -1];
indices = [1,1,2,1,3,2];
colors = [1,0,0, 0,1,0, 0,0,1, 1,0,1];

canvas = getCanvas('mycanvas');
gl = prepare(canvas, 'experimental-webgl');
CBO = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, CBO);
gl.bindBuffer(gl.ARRAY_BUFFER, null);
shaderProgram = startShaders(gl);

Sx = 0.5, Sy = 0.5, Sz = 1.0;
Tx = 0.2, Ty = 0.2, Tz = 0.2;

ScaleMatrix = getScaleMatrix(Sx, Sy, Sz);
TranslationMatrix = getTranslationMatrix(Tx, Ty, Tz); 
RotationMatrix =  getRotationMatrix(135);


UniformRotation = gl.getUniformLocation(shaderProgram, "rotationMatrix");
gl.uniformMatrix4fv(UniformRotation, false, RotationMatrix);
UniformTranslation = gl.getUniformLocation(shaderProgram, "translationMatrix");
gl.uniformMatrix4fv(UniformTranslation, false, TranslationMatrix);
UniformScale = gl.getUniformLocation(shaderProgram, "scaleMatrix");
gl.uniformMatrix4fv(UniformScale, false, ScaleMatrix);
associate(gl,CBO,null,"color",3,shaderProgram);

function changeParams(){
	vertices = JSON.parse(document.getElementById('vertices').value);
	indices = JSON.parse(document.getElementById('indices').value);
	colors = JSON.parse(document.getElementById('colors').value);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	VBO = createVBO(gl, vertices);
	IBO = createIBO(gl, indices);
	associate(gl,VBO,IBO,"coordinates",2,shaderProgram);	
	draw(gl,canvas,indices);
}

