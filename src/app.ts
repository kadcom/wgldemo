/// <reference lib="dom" />

import vert from './shader.vert';
import frag from './shader.frag';

type Mesh = {
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  numIndices: number;
}

const vertices = [
   -0.5, 0.5,     
    0.5, 0.5, 
    0.5, -0.5, 
    -0.5, -0.5
];

const indices = [
  0, 1, 2,
  2, 3, 0,
];


const colour = [0.0, 1.0, 1.0];

const vert_stride = 2;

const initMesh = (gl: WebGL2RenderingContext): Mesh|null => {
  const vertArray = new Float32Array(vertices);
  const indexArray = new Uint16Array(indices);

  const buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Unable to create buffer');
    return null;
  }

  const indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Unable to create index buffer');
    return null;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertArray, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return {
    vertexBuffer: buffer,
    indexBuffer: indexBuffer,
    numIndices: indices.length
  }
}

const drawMesh = (gl: WebGL2RenderingContext, program: WebGLProgram, mesh: Mesh) => {
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);

  const positionAttribLocation = gl.getAttribLocation(program, 'aVertexPosition');
  gl.enableVertexAttribArray(positionAttribLocation);
  gl.vertexAttribPointer(
    positionAttribLocation, 
    2, 
    gl.FLOAT, 
    false,
    vert_stride * Float32Array.BYTES_PER_ELEMENT,
    0
  );

  const colourUniformLocation = gl.getUniformLocation(program, 'uColour');
  gl.uniform3fv(colourUniformLocation, colour); 
  gl.drawElements(gl.TRIANGLES, mesh.numIndices, gl.UNSIGNED_SHORT, 0);
}

const loadShader = (gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null => {
  const sh = gl.createShader(type);

  if (sh == null) {
    return null
  }

  gl.shaderSource(sh, source);
  gl.compileShader(sh);

  return sh;
}

const initShaderProgram = (gl: WebGL2RenderingContext): WebGLProgram|null => {
  const vs = loadShader(gl, gl.VERTEX_SHADER, vert);
  const fs = loadShader(gl, gl.FRAGMENT_SHADER, frag);

  if ((fs == null) || (vs == null)) {
    return null;

  }

  const prog = gl.createProgram();
  if (prog == null) {
    return null
  }
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(prog));
        return null;
  }

  return prog;
}

const initWebGL = (canvasId: string): WebGL2RenderingContext | null => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    alert("Unable to initialise WebGL 2, Your browser may not support it");
    return null 
  }

  return gl
}

const render = (gl: WebGL2RenderingContext, program: WebGLProgram, mesh: Mesh) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  drawMesh(gl, program, mesh);

  requestAnimationFrame(()  => render(gl, program, mesh))
}

const main = () => {
  const gl = initWebGL('webgl-canvas');
  if (!gl) return;

  const program = initShaderProgram(gl);
  if (!program) return;

  const buffer = initMesh(gl);
  if (!buffer) return;

  render(gl, program, buffer);
}

window.onload = main
