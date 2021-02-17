import {
    glMatrix,
    M2, M2d, M3, M4,
    Q, Q2,
    V2, V3, V4,
} from "./vendor/gl-matrix/index.js";
import Shader from "./Shader.js";
import {log, logError, logGroup} from "./log.js";

export default class DDD {
    canvas;
    gl;
    shader_f;
    shader_v;
    program;

    constructor(el, ready_func) {
        this.canvas = el;
        this.gl = this.canvas.getContext("webgl2");
        if (!this.gl) {
            logError("WebGL 2 not supported");
        } else {
            log("initialised successfully!", "#00ff00");
            log("Using WebGL 2 on canvas with ID #"+el.id);
            Shader.loadFromFile(this.gl, this.gl.FRAGMENT_SHADER, "/js/DDD/shaders/f_default.shader").then(shader => {
                this.shader_f = shader;
                Shader.loadFromFile(this.gl, this.gl.VERTEX_SHADER, "/js/DDD/shaders/v_default.shader").then(shader => {
                    this.shader_v = shader;
                    this.program = Shader.createProgram(this.gl, this.shader_v, this.shader_f);
                    ready_func();
                });
            });
        }
    }





}