/// <reference lib="dom" />

import vert from './shader.vert';
import frag from './shader.frag';

const vertices = [
   -0.5, 0.5,     
    0.5, 0.5, 
    0.5, -0.5,

    -0.5, 0.5,
    0.5, -0.5,
    -0.5, -0.5
];

const vert_stride = 2;
const vert_num = vertices.length / vert_stride;

const initBuffers = (gl: WebGL2RenderingContext): WebGLBuffer|null => {
  const vertArray = new Float32Array(vertices);

  const buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Unable to create buffer');
    return null;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertArray, gl.STATIC_DRAW);

  return buffer;
}

const drawTriangle = (gl: WebGL2RenderingContext, program: WebGLProgram, buffer: WebGLBuffer) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
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
   
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, vert_num);

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

const render = (gl: WebGL2RenderingContext, program: WebGLProgram, buffer: WebGLBuffer) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  drawTriangle(gl, program, buffer);

  requestAnimationFrame(()  => render(gl, program, buffer))
}

const main = () => {
  const gl = initWebGL('webgl-canvas');
  if (!gl) return;

  const program = initShaderProgram(gl);
  if (!program) return;

  const buffer = initBuffers(gl);
  if (!buffer) return;

  render(gl, program, buffer);
}

window.onload = main
