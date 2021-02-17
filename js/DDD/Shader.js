import {log, logError, logGroup} from "./log.js";

export default class Shader {
    static createShader (gl, type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    static async loadFromFile(gl, type, path) {
        let shader_src;
        let shader;
        await fetch(path)
            .then(response => response.text())
            .then(data => {
                shader_src = data;
                shader = Shader.createShader(gl, type, data);
            });
        switch (type) {
            case gl.VERTEX_SHADER:
                logGroup("vertex shader loaded from "+path, [shader_src]);
                break;
            case gl.FRAGMENT_SHADER:
                logGroup("fragment shader loaded from "+path, [shader_src]);
                break;
        }
        return shader;
    }

    static createProgram(gl, vertexShader, fragmentShader) {
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        let success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            log("GPU program successfully created");
            return program;
        }

        logError(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

}