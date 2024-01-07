const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext("webgl");

if (!gl) {
  alert("WebGL is not supported in your browser.");
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const vertexShaderSource = `
    attribute vec2 position;
    uniform float time;
    uniform vec2 mousePosition;
    varying vec4 color;

    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
        float mouseX = (mousePosition.x / 400.0) * 2.0 - 1.0;
        float mouseY = ((400.0 - mousePosition.y) / 400.0) * 2.0 - 1.0;
        float r = 0.2 + 0.3 * sin(time + mouseX);
        float g = 0.2 + 0.3 * cos(time + mouseY);
        float b = 0.2 + 0.3 * sin(time + gl_Position.x);

        color = vec4(r, g, b, 1.0);
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying vec4 color;

    void main() {
        gl_FragColor = color;
    }
`;

function createShader(gl, sourceCode, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(program)
    );
    return null;
  }

  return program;
}

const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
const fragmentShader = createShader(
  gl,
  fragmentShaderSource,
  gl.FRAGMENT_SHADER
);

const shaderProgram = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(
  shaderProgram,
  "position"
);
const positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = new Float32Array([
  -1.0, -1.0,
   1.0, -1.0,
  -1.0,  1.0,
   1.0,  1.0,
]);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(shaderProgram);

const timeUniformLocation = gl.getUniformLocation(shaderProgram, "time");
const mousePositionUniformLocation = gl.getUniformLocation(
  shaderProgram,
  "mousePosition"
);

let time = 0.0;
let mouseX = 0.0;
let mouseY = 0.0;

canvas.addEventListener("mousemove", (event) => {
  mouseX = event.clientX - canvas.getBoundingClientRect().left;
  mouseY = event.clientY - canvas.getBoundingClientRect().top;
});

function animate() {
  time += 0.01;
  gl.uniform1f(timeUniformLocation, time);
  gl.uniform2f(mousePositionUniformLocation, mouseX, mouseY);

  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(animate);
}

animate();
