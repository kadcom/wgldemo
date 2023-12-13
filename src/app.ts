/// <reference lib="dom" />

const initWebGL = (canvasId: string): WebGL2RenderingContext | null => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    alert("Unable to initialise WebGL 2, Your browser may not support it");
    return null 
  }

  return gl
}

const render = (gl: WebGL2RenderingContext) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  requestAnimationFrame(()  => render(gl))
}

const main = () => {
  const gl = initWebGL('webgl-canvas');
  if (!gl) return;

  render(gl);
}

window.onload = main
