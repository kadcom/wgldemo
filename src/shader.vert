// input
attribute vec3 aVertexPosition;
uniform mat4 uTransformMatrix;

void main() {
  gl_Position = vec4(aVertexPosition, 1.0) * uTransformMatrix;
}
