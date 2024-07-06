// WebGLSetup.ts
/**
 * WebGLで赤い三角形を描画する関数。
 */
export default function drawRedTriangle(id:string): void {
    // WebGLコンテキストの取得
    const canvas = document.getElementById(id) as HTMLCanvasElement
    let gl = canvas.getContext('webgl2')
    if (!gl) {
        throw new Error('WebGL not supported');
    }

    // シェーダーの準備
    const vertexShaderSource = `
        attribute vec4 a_position;
        void main() {
            gl_Position = a_position;
        }
    `;
    const fragmentShaderSource = `
        precision mediump float;
        uniform vec4 u_color;
        void main() {
            gl_FragColor = u_color;
        }
    `;

    // シェーダーをコンパイル
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw new Error('Vertex shader compilation failed: ' + gl.getShaderInfoLog(vertexShader));
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw new Error('Fragment shader compilation failed: ' + gl.getShaderInfoLog(fragmentShader));
    }

    // プログラムのリンク
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error('Program linking failed: ' + gl.getProgramInfoLog(program));
    }

    // 頂点データの準備
    const positions = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // 頂点属性を有効にする
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    if (positionAttributeLocation === -1) {
        throw new Error('Could not find attribute location for a_position');
    }
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // レンダリング設定
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // レンダリング
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
// WebGLRotationWithExistingCanvas.ts
import * as glMatrix from 'gl-matrix';

/**
 * 指定されたcanvas要素で赤い三角形を描画し、回転させる関数。
 * @param canvasId canvas要素のID
 */
export function drawRotatingWhiteTriangle(canvasId: string): void {
    // 指定されたcanvas要素の取得
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (canvas === null) {
        throw new Error(`Could not find canvas element with ID ${canvasId}`);
    }

    let gl = canvas.getContext('webgl');
    if (!gl) {
        throw new Error('WebGL not supported');
    }

    // シェーダーの準備
    const vertexShaderSource = `
        attribute vec4 a_position;
        uniform mat4 u_modelViewProjection;
        void main() {
            gl_Position = u_modelViewProjection * a_position;
        }
    `;
    const fragmentShaderSource = `
        precision mediump float;
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // 白色
        }
    `;

    // シェーダーをコンパイル
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
        throw new Error('Failed to create vertex shader');
    }

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw new Error('Vertex shader compilation failed: ' + gl.getShaderInfoLog(vertexShader));
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
        throw new Error('Failed to create fragment shader');
    }

    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw new Error('Fragment shader compilation failed: ' + gl.getShaderInfoLog(fragmentShader));
    }

    // プログラムのリンク
    const program = gl.createProgram();
    if (!program) {
        throw new Error('Failed to create shader program');
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error('Program linking failed: ' + gl.getProgramInfoLog(program));
    }

    // プログラムをアクティブにする
    gl.useProgram(program);

    // 頂点データの準備
    const positions = new Float32Array([
        -0.5, -0.5,
         0.5, -0.5,
         0.0,  0.5
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // 頂点属性を有効にする
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    if (positionAttributeLocation === -1) {
        throw new Error('Could not find attribute location for a_position');
    }
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // レンダリング設定
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // 背景色を黒に設定
    gl.clear(gl.COLOR_BUFFER_BIT);

    // レンダリング
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // 回転アニメーション開始
    const modelViewProjectionLocation = gl.getUniformLocation(program, 'u_modelViewProjection');
    if (modelViewProjectionLocation === -1) {
        throw new Error('Could not find uniform location for u_modelViewProjection');
    }
    const startTime = Date.now();
    const animationFrame = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const rotationAngle = elapsedTime * 0.001; // 1度/秒の回転速度
        const rotationMatrix = glMatrix.mat4.create(); // 行列の新規作成
        glMatrix.mat4.rotateY(rotationMatrix, rotationMatrix, rotationAngle); // Y軸周りの回転
        gl.uniformMatrix4fv(modelViewProjectionLocation, false, rotationMatrix); // 行列の適用
        requestAnimationFrame(animationFrame);
    };
    animationFrame();
}
