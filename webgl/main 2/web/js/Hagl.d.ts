declare class Hagl {
    private gl;
    private shader;
    private fragment;
    private program;
    private dev;
    private locationUniformAlpha;
    private locationResolution;
    private locationMove;
    private locationScale;
    private locationRotation;
    private locationOffset;
    private locationAttrPosition;
    private locationAttrUV;
    private shaderVertek;
    private shaderFragment;
    private canvas;
    private prevUVCoordObj;
    private prevObjPos;
    private listObjPos;
    private listUV;
    private prevUVObj;
    private readonly ANGLE2RAD;
    constructor(canvas: HTMLCanvasElement);
    private checkBoxRepetition;
    private checkObjPosRepetition;
    private log;
    private getObjPosFromPool;
    private checkTexRepetition;
    private getUVObj;
    private checkUVKoordObjRepetition;
    private getUVBoxFromPool;
    clear(): void;
    private createBox;
    private defaultOpt;
    private createRectBuffer;
    private power2;
    private createTexture;
    private createUV;
    private bindBuffer;
    private createUVCoordBuffer;
    drawImage(image: HTMLImageElement, x: number, y: number, opt?: Setting): void;
    private init;
    private createProgram;
    private createShader;
}
interface listTex {
    img: HTMLImageElement;
    tex: WebGLTexture;
    buff: WebGLBuffer;
    uv: WebGLBuffer;
    u1: number;
    v1: number;
    u2: number;
    v2: number;
}
interface v2D {
    x: number;
    y: number;
}
interface Kotak {
    p1: v2D;
    p2: v2D;
    p3: v2D;
    p4: v2D;
}
interface Setting {
    offsetX?: number;
    offsetY?: number;
    scaleX?: number;
    scaleY?: number;
    rotation?: number;
    alpha?: number;
    texU1?: number;
    texV1?: number;
    texU2?: number;
    texV2?: number;
}
interface KotakObj {
    buff: WebGLBuffer;
    u1: number;
    v1: number;
    u2: number;
    v2: number;
}
interface UVObj {
    img: HTMLImageElement;
    tex: WebGLTexture;
}
