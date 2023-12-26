/// <reference lib="dom" />

import vert from './shader.vert';
import frag from './shader.frag';
import {Mat4x4, Transform, deg2rad, Vec3} from './3d_math';
import { Mesh } from './3d_objects';

let aspect = 16.0 / 9.0;
let projectionMatrix = Mat4x4.perspective(deg2rad(45.0), aspect, 0.1, 100.0);

const eyePos = new Vec3(-2.0, 3.0, -4.0);
const transform = new Transform();

let viewMatrix = Mat4x4.lookAt(eyePos, transform.position, Vec3.up);

const drawMesh = (gl: WebGL2RenderingContext, program: WebGLProgram, mesh: Mesh) => {
  gl.useProgram(program);
  
  const transformUniformLocation = gl.getUniformLocation(program, 'uModelTransformMatrix');
  gl.uniformMatrix4fv(transformUniformLocation, true, transform.matrix.data);

  const viewUniformLocation = gl.getUniformLocation(program, 'uViewMatrix');
  gl.uniformMatrix4fv(viewUniformLocation, true, viewMatrix.data);

  mesh.draw(gl);
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

const setupRender = (gl: WebGL2RenderingContext) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.depthFunc(gl.LEQUAL); 
  gl.enable(gl.DEPTH_TEST);

  gl.frontFace(gl.CW);
  gl.cullFace(gl.BACK);
  gl.enable(gl.CULL_FACE);

};

const render = (gl: WebGL2RenderingContext, program: WebGLProgram, mesh: Mesh) => {  
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

  const mesh = Mesh.cube(gl);

  if (!mesh) {
    return;
  }
  
  setupSlider('z-rotation', '°', (value: number) => {
    transform.rotation.roll += value;
  });

  setupSlider('y-rotation', '°', (value: number) => {
    transform.rotation.yaw = value;
  });

  setupSlider('x-rotation', '°', (value: number) => {
    transform.rotation.pitch = value;
  });

  setupSlider('scale', null, (value: number) => {
    transform.scale = value * 0.01;
  });

  setupSlider('x-translation', null, (value: number) => {
    transform.position.x = value * 0.01;
  });

  setupSlider('y-translation', null, (value: number) => {
    transform.position.y = value * 0.01;
  });

  setupSlider('z-translation', null, (value: number) => {
    transform.position.z = value * 0.01;
  });

  gl.useProgram(program);
  const projectionUniformLocation = gl.getUniformLocation(program, 'uProjectionMatrix');
  gl.uniformMatrix4fv(projectionUniformLocation, true, projectionMatrix.data);

  const canvasElem = document.getElementById('webgl-canvas');

  if (!canvasElem) {
    return;
  }

  const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.target !== canvasElem) {
        continue;
      }
      const canvas = entry.target as HTMLCanvasElement;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      aspect = width / height;
      projectionMatrix = Mat4x4.perspective(deg2rad(45.0), aspect, 0.1, 100.0);
      
      const projectionUniformLocation = gl.getUniformLocation(program, 'uProjectionMatrix');
      gl.uniformMatrix4fv(projectionUniformLocation, true, projectionMatrix.data);
      }
  });

  observer.observe(canvasElem);

  setupRender(gl);
  render(gl, program, mesh);
}

window.onload = main
