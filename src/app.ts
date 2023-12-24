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

  // back side
  4, 6, 5,
  6, 4, 7,

  // right side
  1, 5, 6,
  6, 2, 1, 

  // left side
  0, 7, 4,
  7, 0, 3,

  // top side 
  0, 5, 1,
  5, 0, 4,

  // bottom side
  3, 2, 6,
  6, 7, 3
];


const vert_stride = 6;
const vert_component = 3;
const translateMatrix = Mat4x4.identity();

const aspect = 16.0 / 9.0;
const projectionMatrix = Mat4x4.ortho(2 * aspect, 2, -1, 1);

let rotX = 0.0;
let rotY = 0.0;
let rotZ = 0.0;
let scale = 1.0;


let scaleMatrix = Mat4x4.identity();
let rotateMatrix = Mat4x4.identity();

// S R T P
let transformMatrix = Mat4x4.identity();

const updateTransform = () => {
  scaleMatrix = Mat4x4.scale(scale, scale, scale);

  rotateMatrix = Mat4x4.rotateX(deg2rad(rotX)).multiply(Mat4x4.rotateY(deg2rad(rotY))).multiply(Mat4x4.rotateZ(deg2rad(rotZ)));

  transformMatrix = scaleMatrix.multiply(rotateMatrix).multiply(translateMatrix);
}

updateTransform();


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

  const modelUniformLocation = gl.getUniformLocation(program, 'uModelMatrix');
  gl.uniformMatrix4fv(modelUniformLocation, true, transformMatrix.data);

  const projectionUniformLocation = gl.getUniformLocation(program, 'uProjectionMatrix');
  gl.uniformMatrix4fv(projectionUniformLocation, true, projectionMatrix.data);


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
  gl.clearDepth(1.0);
  gl.depthFunc(gl.LEQUAL); 
  gl.enable(gl.DEPTH_TEST);

  gl.frontFace(gl.CW);
  gl.cullFace(gl.BACK);
  gl.enable(gl.CULL_FACE);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  drawMesh(gl, program, mesh);
  requestAnimationFrame(()  => render(gl, program, mesh))
}

const setupSlider = (sliderId: string, 
                     sliderUnit: string|null, 
                     updateFunc: ((value: number) => void)|null) => 
{
  const sliderElem = document.getElementById(sliderId);
  const outputElem = document.getElementById(sliderId + '-value');

  if (!sliderElem || !outputElem) {
    return;
  }

  const slider = sliderElem as HTMLInputElement;
  const output = outputElem as HTMLSpanElement;

  const unitStr = sliderUnit ? sliderUnit : '';

  slider.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = parseFloat(target.value);
    output.textContent = value + unitStr;

    if (!updateFunc) {
      return;
    }
    updateFunc(value);
  });
}

const main = () => {
  const gl = initWebGL('webgl-canvas');
  if (!gl) return;

  const program = initShaderProgram(gl);
  if (!program) return;

  const buffer = initMesh(gl);
  if (!buffer) return;

  setupSlider('z-rotation', '°', (value: number) => {
    rotZ = value;
    updateTransform();
  });

  setupSlider('y-rotation', '°', (value: number) => {
    rotY = value;
    updateTransform();
  });

  setupSlider('x-rotation', '°', (value: number) => {
    rotX = value;
    updateTransform();
  });

  setupSlider('scale', null, (value: number) => {
    scale = value * 0.01;
    updateTransform();
  });

  render(gl, program, buffer);
}

window.onload = main
