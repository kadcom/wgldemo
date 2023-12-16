// input
attribute vec2 aVertexPosition;
uniform vec3 uColor;
void main() {
  gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}
