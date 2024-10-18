"use strict";
class Main {
    constructor() {
        window.onload = () => {
            console.log('window onload');
            this.canvas = document.querySelector('canvas');
            this.gl = this.canvas.getContext('webgl');
            if (!this.gl) {
                throw new Error();
            }
            this.shader = this.createShader(this.gl, this.gl.VERTEX_SHADER, document.querySelector("#vertex-shader").textContent);
            this.fragment = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, document.querySelector("#fragment-shader").textContent);
            this.program = this.createProgram(this.gl, this.shader, this.fragment);
            this.program;
            let positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
            let positionBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
            let positions = [
                0, 0,
                0, .5,
                0.7, 0
            ];
        };
    }
    createProgram(gl, vshader, fshader) {
        let program = gl.createProgram();
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        let sukses = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!sukses) {
            gl.deleteProgram(program);
            throw new Error('');
        }
        return program;
    }
    createShader(gl, type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let sukses = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (sukses) {
            return shader;
        }
        gl.deleteShader(shader);
        console.log(gl);
        console.log(type);
        console.log(source);
        throw new Error('');
    }
}
new Main();
