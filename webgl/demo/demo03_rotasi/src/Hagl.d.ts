declare class Hagl {
    private gl;
    private shader;
    private fragment;
    private program;
    private LokasiUniformAlpha;
    private lokasiResolusi;
    private lokasiGeser;
    private lokasiSkala;
    private lokasiPutar;
    private lokasiOffset;
    private texList;
    private shaderVertek;
    private shaderFragment;
    private kanvas;
    private lokasiPosisi;
    private lokasiTexture;
    private readonly SDT2RAD;
    constructor(kanvas: HTMLCanvasElement);
    private ambilGbr;
    clear(): void;
    private buatKotak;
    private pilihanDefault2;
    private buatRectBuffer2;
    private pangkat2;
    private buatTexture;
    private buatUV;
    private buatUVBuffer2;
    drawImage(image: HTMLImageElement, x: number, y: number, opt?: Setting): void;
    private init;
    private buatProgram;
    private buatShader;
}
interface DaftarTex {
    img: HTMLImageElement;
    tex: WebGLTexture;
    buff: WebGLBuffer;
    uv: WebGLBuffer;
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
interface Pilihan {
    offset?: v2D;
    scale?: v2D;
    rotation?: number;
    alpha?: number;
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
