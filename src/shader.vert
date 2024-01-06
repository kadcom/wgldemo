#version 300 es

// input
layout(location = 0) in vec3 aVertexPosition;
layout(location = 1) in vec3 aVertexColour;
layout(location = 2) in vec2 aTextureCoord;

// constant 
uniform mat4 uModelTransformMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

// output
out vec3 vVertexColour;
out vec2 vTextureCoord;

void main() {
  vVertexColour = aVertexColour;
  vTextureCoord = aTextureCoord;
  
  gl_Position = vec4(aVertexPosition, 1.0) * uModelTransformMatrix * uViewMatrix * uProjectionMatrix;
}
