// input
attribute vec3 aVertexPosition;
uniform mat4 uProjectionMatrix;
void main() {
  vec4 position = vec4(aVertexPosition,1.0);
  gl_Position = position * uProjectionMatrix;
}
