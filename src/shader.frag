precision mediump float;

uniform vec3 uColour;
varying vec3 vVertexColour;

void main() {
  gl_FragColor = vec4(vVertexColour, 1.0);
}
