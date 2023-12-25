// input
attribute vec3 aVertexPosition;
attribute vec3 aVertexColour;

// constant 
uniform mat4 uModelTransformMatrix;
uniform mat4 uProjectionMatrix;

// output
varying vec3 vVertexColour;

void main() {
  vVertexColour = aVertexColour;
  
  gl_Position = vec4(aVertexPosition, 1.0) * uModelTransformMatrix * uProjectionMatrix;
}
