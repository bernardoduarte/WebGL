circle={};
circle.createVertices = function(radius, vertexCount, isCircunference){
	var theta = (360.0 / vertexCount);
	var vertices;
	if(isCircunference){
		vertices = new glArrayType(2*vertexCount);
		for(var i = 0; 2*i < vertices.length; i++){
			vertices[2*i] = radius*Math.cos(toRadians(i*theta));
			vertices[2*i+1] = radius*Math.sin(toRadians(i*theta));
		}
	}
	else{
		vertices = new glArrayType(2*vertexCount+2);
		vertices[0] = 0.0;
		vertices[1] = 0.0;
		for(var i = 0; 2*i+2 < vertices.length; i++){
			vertices[2*i+2] = radius*Math.cos(toRadians(i*theta));
			vertices[2*i+3] = radius*Math.sin(toRadians(i*theta));
		}
	}
	return vertices;
}
circle.createIndices = function(vertices, isCircunference){
	var indices;
	if(isCircunference){
		indices = new glIndexType((vertices.length)/2);
		for(var i = 0; i < indices.length; i++){
			indices[i] = i;
		}
	}
	else{
		indices = new glIndexType((vertices.length-2)*3/2);
		for(var i = 0; i+1 < indices.length/3; i++){
			indices[3*i] = i+1;
			indices[3*i+1] = 0;
			indices[3*i+2] = i+2;
		}
		indices[indices.length-3] = i+1;
		indices[indices.length-2] = 0;
		indices[indices.length-1] = 1;
	}
	return indices;
}

torus = {};
torus.createVertices = function(r1, r2, speedRatio, vertexCount){
	var alpha = (360.0 / vertexCount);
	var beta = speedRatio * alpha;
	var vertices = new glArrayType(2*vertexCount);
	for(var i = 0; i < vertexCount; i++){
		vertices[2*i] = r1*Math.cos(toRadians(i*alpha)) + r2*Math.cos(toRadians(i*beta));
		vertices[2*i+1] = r1*Math.sin(toRadians(i*alpha)) + r2*Math.sin(toRadians(i*beta));
	}
	return vertices;
}
torus.createIndices = function(vertices){
	var indices = new glIndexType((vertices.length)/2);
	for(var i = 0; i < indices.length; i++){
		indices[i] = i;
	}
	return indices;
}