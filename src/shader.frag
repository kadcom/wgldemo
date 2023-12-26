#version 300 es

precision mediump float;

uniform vec3 uColour;

// input dari vertex shader
in vec3 vVertexColour;

// output ke frame buffer
layout(location = 0) out vec4 vFragColour;

void main() {
  vFragColour = vec4(vVertexColour, 1.0);
}
