#version 300 es

precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uColour;

// input dari vertex shader
in vec3 vVertexColour;
in vec2 vTextureCoord;

// output ke frame buffer
layout(location = 0) out vec4 vFragColour;

void main() {
  vec4 texColour = texture(uTexture, vTextureCoord);
  vFragColour = texColour;
}
