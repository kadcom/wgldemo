/// <reference lib="dom" />

import vert from './shader.vert';
import frag from './shader.frag';
import {Mat4x4, deg2rad} from './mat4';

type Mesh = {
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  numIndices: number;
}

const vertices = [
   -1,  1,  0, 1, 0, 0, // 0 
    1,  1,  0, 0, 1, 0, // 1
    1, -1,  0, 0, 0, 1, // 2
   -1, -1,  0, 1, 1, 0, // 3

   -1,  1,  1, 1, 0, 1, // 4
    1,  1,  1, 0, 1, 1, // 5
    1, -1,  1, 1, 1, 1, // 6
   -1, -1,  1, 0, 0, 0, // 7
];

const indices = [
  // front side 
  0, 1, 2,
  2, 3, 0,

  // right side
  1, 5, 6,
  6, 2, 1,

  // back side
  4, 5, 6,
  6, 7, 4,

  // left side
  0, 4, 7,
  7, 3, 0,

  // top side 
  0, 1, 5,
  5, 4, 0,

  // bottom side
  3, 2, 6,
  6, 7, 3
];


const vert_stride = 6;
const vert_component = 3;
const rotDegree = 45;

const scaleMatrix = Mat4x4.identity();

const translateMatrix = Mat4x4.identity();
const rotateMatrix = Mat4x4.identity();

const aspect = 16.0 / 9.0;
const projectionMatrix = Mat4x4.ortho(2 * aspect, 2, -1, 1);

// S R T P

const transformMatrix = scaleMatrix.multiply(rotateMatrix).multiply(translateMatrix).multiply(projectionMatrix);

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
    vert_component, 
    gl.FLOAT, 
    false,
    vert_stride * Float32Array.BYTES_PER_ELEMENT,
    0
  );

  const colourAttribLocation = gl.getAttribLocation(program, 'aVertexColour');
  gl.enableVertexAttribArray(colourAttribLocation);
  gl.vertexAttribPointer(
    colourAttribLocation, 
    3, 
    gl.FLOAT, 
    false,
    vert_stride * Float32Array.BYTES_PER_ELEMENT,
    vert_component * Float32Array.BYTES_PER_ELEMENT
  );

  const transformUniformLocation = gl.getUniformLocation(program, 'uTransformMatrix');
  gl.uniformMatrix4fv(transformUniformLocation, true, transformMatrix.data); 

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
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

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
