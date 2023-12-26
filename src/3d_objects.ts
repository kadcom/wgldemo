class Mesh {
  vbo: WebGLBuffer;
  ebo: WebGLBuffer;
  vao: WebGLVertexArrayObject;
  numIndices: number;

  constructor(vbo: WebGLBuffer, ebo: WebGLBuffer, vao: WebGLVertexArrayObject, numIndices: number) {
    this.vbo = vbo;
    this.ebo = ebo;
    this.vao = vao;
    this.numIndices = numIndices;
  }

  draw(gl: WebGL2RenderingContext) {
    gl.bindVertexArray(this.vao);
    gl.drawElements(gl.TRIANGLES, this.numIndices, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);
  }

  destroy(gl: WebGL2RenderingContext) {
    gl.deleteBuffer(this.vbo);
    gl.deleteBuffer(this.ebo);
    gl.deleteVertexArray(this.vao);
  }

  static fromVertices(gl: WebGL2RenderingContext, vertices: Float32Array, indices: Uint16Array): Mesh|null {
    const vert_stride = 8;
    const vert_component = 3;

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

    const vao = gl.createVertexArray();
    if (!vao) {
      console.log('Unable to create vertex array object');
      return null;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    gl.bindVertexArray(vao);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    const positionAttribLocation = 0;
    gl.enableVertexAttribArray(positionAttribLocation);

    gl.vertexAttribPointer(
      positionAttribLocation, 
      vert_component, 
      gl.FLOAT, 
      false,
      vert_stride * Float32Array.BYTES_PER_ELEMENT,
      0
    );

    const colourAttribLocation = 1;
    gl.enableVertexAttribArray(colourAttribLocation);
    gl.vertexAttribPointer(
      colourAttribLocation, 
      3, 
      gl.FLOAT, 
      false,
      vert_stride * Float32Array.BYTES_PER_ELEMENT,
      vert_component * Float32Array.BYTES_PER_ELEMENT
    );

    gl.bindVertexArray(null);

    return new Mesh(buffer, indexBuffer, vao, indices.length);
  }

  static cube(gl: WebGL2RenderingContext): Mesh|null {
    const vertices = [
      // Front face
      -1,  1, -1,  1,  0,  0,  0, 1, // 0
       1,  1, -1,  1,  0,  0,  1, 1, // 1
       1, -1, -1,  1,  0,  0,  1, 0, // 2
      -1, -1, -1,  1,  0,  0,  0, 0, // 3

      // Back face
      -1,  1,  1,  0,  1,  0,  1, 1, // 4
      1,  1,  1,   0,  1,  0,  0, 1, // 5
      1, -1,  1,   0,  1,  0,  0, 0, // 6
      -1, -1,  1,  0,  1,  0,  1, 0, // 7

      // Right face
      1,  1, -1,  0,  0,  1,  0, 1, // 8
      1,  1,  1,  0,  0,  1,  1, 1, // 9
      1, -1,  1,  0,  0,  1,  1, 0, // 10
      1, -1, -1,  0,  0,  1,  0, 0, // 11

      // Left face
      -1,  1,  1,  1,  1,  0,  0, 1, // 12
      -1,  1, -1,  1,  1,  0,  1, 1, // 13
      -1, -1, -1,  1,  1,  0,  1, 0, // 14
      -1, -1,  1,  1,  1,  0,  0, 0, // 15

      // Top face
      -1,  1,  1,  1,  0,  1,  0, 1, // 16
       1,  1,  1,  1,  0,  1,  1, 1, // 17
       1,  1, -1,  1,  0,  1,  1, 0, // 18
      -1,  1, -1,  1,  0,  1,  0, 0, // 19

      // Bottom face
      -1, -1, -1,   1,  0.5,  0,  0, 1, // 20
      1, -1,  -1,   1,  0.5,  0,  1, 1, // 21
      1, -1,   1,   1,  0.5,  0,  1, 0, // 22
      -1, -1,  1,   1,  0.5,  0,  0, 0, // 23
    ];

    const indices = [
      // Front face
      0, 1, 2, 2, 3, 0,
      // Back face
      4, 6, 5, 6, 4, 7,

      // Right Face 
      8, 9, 10, 10, 11, 8,
      // Left Face
      12, 13, 14, 14, 15, 12,

      // Top Face
      16, 17, 18, 18, 19, 16,

      // Bottom Face
      20, 21, 22, 22, 23, 20
    ];


    return Mesh.fromVertices(gl, new Float32Array(vertices), new Uint16Array(indices));
  }
}

export { Mesh }; 

