declare namespace Basik {
    class Graphic {
        private static _skalaOtomatis;
        static get skalaOtomatis(): boolean;
        static set skalaOtomatis(value: boolean);
        private static _canvas;
        static get context(): CanvasRenderingContext2D;
        static get canvas(): HTMLCanvasElement;
        static set canvas(c: HTMLCanvasElement);
        private static _merah;
        private static _hijau;
        private static _biru;
        private static _transparan;
        private static warnaBackup;
        static Pause(): void;
        static handleWindowResize(): void;
        static buatCanvas(canvasEl: HTMLCanvasElement): ImgObj;
        static backupWarna(): void;
        static restoreColor(): void;
        static FillColor(r?: number, g?: number, b?: number, a?: number): void;
        static NoColor(): void;
        static updateStyleWarna(): void;
        static init(p: number, l: number, fullScreen: boolean): void;
        static get merah(): number;
        static set merah(value: number);
        static get hijau(): number;
        static set hijau(value: number);
        static get biru(): number;
        static set biru(value: number);
        static get transparan(): number;
        static set transparan(value: number);
    }
    const G: typeof Graphic;
    interface IEvent {
        id: string;
        type: string;
        handle: () => void;
    }
}
declare namespace ha.be {
    class Cache {
        private files;
        getGbr(url: string): HTMLImageElement;
        setFile(url: string, img: HTMLImageElement): void;
    }
    export const cache: Cache;
    export {};
}
declare namespace Basik {
    class Config {
        readonly stroke: Stroke;
        readonly fill: Stroke;
    }
    class RGB {
        private _m;
        private _g;
        private _b;
        get b(): number;
        set b(value: number);
        get g(): number;
        set g(value: number);
        get m(): number;
        set m(value: number);
    }
    class Stroke {
        private _tebal;
        readonly rgb: RGB;
        private _aktif;
        get aktif(): boolean;
        set aktif(value: boolean);
        get tebal(): number;
        set tebal(value: number);
    }
    export var config: Config;
    export {};
}
declare namespace Basik {
    namespace Data {
        class Obj {
            private _id;
            private _entry;
            private _nama;
            get id(): number;
            set id(value: number);
            get entry(): any[];
            set entry(value: any[]);
            get nama(): string;
            set nama(value: string);
        }
    }
}
declare namespace Dict {
    export function create(): DictObj;
    export function setAttr(d: DictObj, key: string, value: any): void;
    export function value(d: DictObj, key: string): any;
    class DictObj {
        readonly attrs: Attr[];
    }
    class Attr {
        private _key;
        private _value;
        get key(): string;
        get value(): any;
        set value(value: any);
        constructor(key: string, value: any);
    }
    export {};
}
declare namespace ha.be {
    class Id {
        private static _id;
        static id(): string;
    }
}
declare enum EInput {
    TOUCH = "touch",
    MOUSE = "mouse",
    KEYB = "keyb",
    DEF = ""
}
declare namespace Basik {
    class EventHandler {
        move(input: IInput, buffer: HTMLCanvasElement, e: PointerEvent): void;
        down(input: IInput, key: string, type: EInput, pos: IV2D): void;
        up(input: IInput): void;
        private checkTap;
    }
    export class Input {
        private static _inputs;
        private static _debug;
        static get debug(): boolean;
        static set debug(value: boolean);
        private static _inputGlobal;
        private static _evt;
        constructor();
        static InputTapCount(): number;
        static JmlUp(): number;
        static InputDragEndCount(): number;
        static InputType(): EInput;
        static InputHit(): number;
        static InputDragStartX(): number;
        static InputDragStartY(): number;
        static InputX(): number;
        static InputY(): number;
        static InputDragX(): number;
        static InputDragY(): number;
        static FlushInput(): void;
        static InputDragStartCount(): number;
        static InputIsDown(): boolean;
        static InputIsDragged(): boolean;
        private static getMouseKeyId;
        static init(buffer: HTMLCanvasElement): void;
        private static buatInputDefault;
        private static flush;
        private static flushByInput;
        private static getInput;
        private static baru;
        static getPos: (cx: number, cy: number, c: HTMLCanvasElement) => {
            x: number;
            y: number;
        };
        static get inputs(): IInput[];
        static get event(): EventHandler;
        static get global(): IInput;
    }
    export const In: typeof Input;
    export {};
}
interface IInput {
    xStart: number;
    yStart: number;
    xDrag: number;
    yDrag: number;
    x: number;
    y: number;
    isDrag: boolean;
    isDown: boolean;
    isTap: boolean;
    hit: number;
    key: string;
    type: EInput;
    timerStart: number;
    timerEnd: number;
    id: number;
    dragJml: number;
    dragSelesaiJml: number;
    tapJml: number;
    upJml: number;
}
interface IV2D {
    x: number;
    y: number;
}
interface IAudio {
    src: string;
    loaded: boolean;
    sound: HTMLAudioElement;
    playedCount: number;
}
declare namespace Basik {
    class Mat {
        static Jarak(x1: number, y1: number, x2: number, y2: number): number;
        static Sudut(x: number, y: number): number;
        static Pi(): number;
        static Int(n: string): number;
        static Float(n: string): number;
        static Floor(n: number): number;
        static Ceil(n: number): number;
        static Sgn(n: number): number;
        static Abs(n: number): number;
        static Mod(a: number, b: number): number;
        static Sqr(n: number): number;
        static Sin(n: number): number;
        static Cos(n: number): number;
        static Tan(n: number): number;
        static Clamp(n: number, min: number, max: number): number;
    }
}
declare namespace Basik {
    class Pt {
        private _x;
        get x(): number;
        set x(value: number);
        private _y;
        get y(): number;
        set y(value: number);
        constructor(x?: number, y?: number);
        static create(x?: number, y?: number): Pt;
        static copy(p1: Pt, p2: Pt): void;
        static clone(p: Pt): Pt;
        static sama(p1: Pt, p2: Pt): boolean;
        static putarPoros(p: Pt, xc?: number, yc?: number, deg?: number): void;
        static posDist(p: Pt, xt: number, yt: number, jrk: number): Pt;
        static posPolar(jarak: number, sudut: number, xt: number, yt: number): Pt;
    }
}
declare namespace Basik {
    class Seg {
        private _A;
        get A(): Pt;
        set A(value: Pt);
        private _B;
        get B(): Pt;
        set B(value: Pt);
        constructor(A?: Pt, B?: Pt);
        static create(v1?: Pt, v2?: Pt): Seg;
        static boundCollide(seg1: Seg, seg2: Seg): boolean;
        static collide(seg1: Seg, seg2: Seg): boolean;
        static copy(seg1: Seg, seg2: Seg): void;
        static clone(seg: Seg): Seg;
        static crossHor(seg: Seg): boolean;
        static deg(line: Seg): number;
        static getXAtIdx(seg: Seg, idx: number): number;
        static getYAtIdx(seg: Seg, idx: number): number;
        static vecI(seg: Seg): number;
        static vecJ(seg: Seg): number;
        static rotate(seg: Seg, deg?: number, xc?: number, yc?: number): void;
        static minX(seg: Seg): number;
        static maxX(seg: Seg): number;
        static minY(seg: Seg): number;
        static maxY(seg: Seg): number;
        static translate(seg: Seg, x?: number, y?: number): void;
        static xHorIdx(seg: Seg): number;
    }
    const Sg: typeof Seg;
}
declare namespace Basik {
    class Ktk {
        readonly vs: Pt[];
        readonly segs: Seg[];
        constructor();
        static buat(x1?: number, y1?: number, x2?: number, y2?: number): Ktk;
        private static copy;
        private static copyInfo;
        private static collideBound;
        static collide(r1: Ktk, r2: Ktk): boolean;
        private static collideDotBound;
        static collideDot(r: Ktk, x: number, y: number): boolean;
        static minX(r: Ktk): number;
        static maxX(r: Ktk): number;
        static minY(r: Ktk): number;
        static maxY(r: Ktk): number;
        static translate(rect: Ktk, x: number, y: number): void;
        static rotate(r: Ktk, deg: number, xc: number, yc: number, copy?: boolean): Ktk;
    }
}
declare namespace Basik {
    class Transform {
        static readonly RAD2DEG: number;
        static readonly DEG2RAD: number;
        private static _lastX;
        private static _lastY;
        static get lastX(): number;
        static get lastY(): number;
        static equal(n1: number, n2: number, toleransi?: number): boolean;
        private static quadDeg2;
        static sudut(x: number, y: number): number;
        static normalizeDeg(deg: number): number;
        static degDistMax(angleS: number, angleT: number): number;
        static degDistMin(angleS: number, angleT: number): number;
        static jarak(x: number, y: number, xt: number, yt: number): number;
        static rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): void;
    }
    const Tf: typeof Transform;
}
declare namespace Basik {
    class ImgImpl {
        static readonly props: string[];
        static readonly daftar: ImgObj[];
        static CreateImage(width: number, height: number): ImgObj;
        static MuatAnimasi(url: string, pf: number, lf: number, bisaDiDrag?: boolean, tipeDrag?: number): ImgObj;
        static GambarSemua(): void;
        static Bound(s: ImgObj): Ktk;
        static muatAnimasiAsyncKanvas(url: string, pf: number, lf: number, bisaDiDrag: boolean, canvas: HTMLCanvasElement, tipeDrag: number): ImgObj;
        static muatAsyncBerbagiKanvas(url: string, dragable: boolean, canvas: HTMLCanvasElement, tipeDrag: number, onload: () => void): ImgObj;
        private static register;
        static Muat(url: string, bisaDiDrag?: boolean, tipeDrag?: number, onload?: () => void): ImgObj;
        static DrawImageXY(s: ImgObj, x: number, y: number, frame?: number): void;
        static PositionImagePolar(img: ImgObj, angle: number, jarak: number, x2: number, y2: number, skalaX?: number, skalaY?: number, tilt?: number): void;
        static buatBagiCanvas(canvas: HTMLCanvasElement, w?: number, h?: number, frameW?: number, frameH?: number): ImgObj;
        static panjang(gbr: ImgObj, pj?: number): number;
        static lebar(gbr: ImgObj, lb?: number): number;
        static tabrakan(gbr1: ImgObj, x1: number, y1: number, gbr2: ImgObj, x2: number, y2: number): boolean;
        static dotDidalamGambar(gbr1: ImgObj, x1: number, y1: number, x2: number, y2: number): boolean;
        static muatAnimAsync(url: string, fw: number, fh: number): ImgObj;
        static muatAnimAsyncCanvas(url: string, fw: number, fh: number, canvas: HTMLCanvasElement): ImgObj;
        static muatAsync(url: string, onload: () => void): ImgObj;
        static def(img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): ImgObj;
        static muatAsyncKanvas(url: string, canvas: HTMLCanvasElement, onload: () => void): ImgObj;
        static gambarUbin(gbr: ImgObj, x?: number, y?: number, frame?: number): void;
        static AmbilPiksel(x?: number, y?: number): number[];
        static SetPiksel(x?: number, y?: number): void;
        static gambar(gbr: ImgObj, x?: number, y?: number, frame?: number): void;
        static ukuran(gbr: ImgObj, w?: number, h?: number): void;
        static resetRect(img: ImgObj): void;
        static rectToImageTf(image: ImgObj, x: number, y: number): void;
        static AllImageLoaded(): boolean;
    }
    const Ip: typeof ImgImpl;
}
declare namespace Basik {
    class Img {
        static CreateImage(width: number, height: number): ImgObj;
        static CopyImage(s: ImgObj, onload?: () => void): ImgObj;
        static DrawAllImage(): void;
        static Collide(imgA: ImgObj, imgB: ImgObj): boolean;
        static LoadAnimImage(url: string, fw: number, fh: number, dragable?: boolean, dragType?: number): ImgObj;
        static LoadImage(url: string, dragable?: boolean, dragType?: number): ImgObj;
        static DrawImage(img: ImgObj, frame?: number): void;
        static DrawImageXY(img: ImgObj, x: number, y: number, frame?: number): void;
        static PositionImagePolar(img: ImgObj, angle: number, jarak: number, x2: number, y2: number, skalaX?: number, skalaY?: number, tilt?: number): void;
        static Tile(img: ImgObj, x?: number, y?: number, frame?: number): void;
        static GetPixel(x?: number, y?: number): number[];
        static SetPiksel(x?: number, y?: number): number[];
        static AllImageLoaded(): boolean;
    }
    const Im: typeof Img;
}
declare namespace Basik {
    class ImgObj {
        private static _ctrDraw;
        private _url;
        readonly listeners: IEvent[];
        executeEvent(type: string): void;
        img: HTMLImageElement;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        isAnim: boolean;
        rect: Ktk;
        load: boolean;
        ratioX?: number;
        ratioY?: number;
        private _panjangDiSet;
        private _lebarDiSet;
        private _ctrIdx;
        private _x;
        private _y;
        private _alpha;
        private _frameW;
        private _frameH;
        private _handleX;
        private _handleY;
        private _rotasi;
        private _panjang;
        private _lebar;
        private _dragged;
        private _down;
        private _dragable;
        private _hitCount;
        private _tipeDrag;
        private _dragSelesaiJml;
        private _dragStartY;
        private _dragStartX;
        private _sudutTekanAwal;
        private _inputId;
        private _sudutAwal;
        get sudutAwal(): number;
        set sudutAwal(value: number);
        get frameW(): number;
        set frameW(value: number);
        get frameH(): number;
        set frameH(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get alpha(): number;
        set alpha(value: number);
        get handleY(): number;
        set handleY(value: number);
        get handleX(): number;
        set handleX(value: number);
        get panjang(): number;
        set panjang(value: number);
        get lebar(): number;
        set lebar(value: number);
        get panjangDiSet(): boolean;
        set panjangDiSet(value: boolean);
        get lebarDiSet(): boolean;
        set lebarDiSet(value: boolean);
        get ctrIdx(): number;
        set ctrIdx(value: number);
        get rotasi(): number;
        set rotasi(value: number);
        constructor(dragable?: boolean);
        get dragSelesaiJml(): number;
        set dragSelesaiJml(value: number);
        get drgStartX(): number;
        set drgStartX(value: number);
        get drgStartY(): number;
        set drgStartY(value: number);
        get dragged(): boolean;
        set dragged(value: boolean);
        get jmlHit(): number;
        set jmlHit(value: number);
        get down(): boolean;
        set down(value: boolean);
        get dragable(): boolean;
        set dragable(value: boolean);
        get sudutTekanAwal(): number;
        set sudutTekanAwal(value: number);
        get tipeDrag(): number;
        set tipeDrag(value: number);
        get url(): string;
        set url(value: string);
        static get ctrDraw(): number;
        static set ctrDraw(value: number);
        get inputId(): number;
        set inputId(value: number);
    }
}
declare namespace Basik {
    class SprInt {
        private spriteDown;
        inputDown(pos: any, id: number): void;
        inputMove(pos: any, pointerId: number): void;
        inputUp(): void;
    }
    export const sprInt: SprInt;
    export {};
}
declare namespace Basik {
    class SprDep {
        static HandleX(s: ImgObj): number;
        static HandleY(s: ImgObj): number;
        static Handle(img: ImgObj, x?: number, y?: number): void;
        static ResizeImage(s: ImgObj, w: number, h: number): void;
        static PositionImageXY(img: ImgObj, x?: number, y?: number): void;
        static StatusMuat(spr?: ImgObj): boolean;
        static TabrakanXY(spr: ImgObj, x1: number, y1: number, spr2: ImgObj, x2: number, y2: number): boolean;
        static PosisiX(s: ImgObj, x?: number | null | undefined): number;
        static PosisiY(s: ImgObj, y?: number | null | undefined): number;
        static DragMode(s: ImgObj, n: number): void;
        static Dimuat(s: ImgObj): boolean;
        static StatusDrag(s: ImgObj): boolean;
        static kontek(s: ImgObj): CanvasRenderingContext2D;
        static Panjang(s: ImgObj, pj?: number): number;
        static Lebar(s: ImgObj, lb?: number): number;
        static Alpha(s: ImgObj, alpha?: number): number;
        static Rotasi(s: ImgObj, sudut?: number): number;
    }
}
declare namespace Basik {
    class Teks {
        private static nama;
        private static ukuran;
        private static x;
        private static y;
        private static _stroke;
        private static _jarak;
        private static _fill;
        static get stroke(): boolean;
        static set stroke(value: boolean);
        static get fill(): boolean;
        static set fill(value: boolean);
        static get jarak(): number;
        static set jarak(value: number);
        private static get ctx();
        static Goto(x: number, y: number): void;
        static Write(str: string): void;
        static WriteLn(str: string): void;
        static Font(nama?: string): void;
        static FontSize(n?: number): void;
        static Rata(rata?: CanvasTextAlign): void;
        static Tulis(teks: string, x: number, y: number, warna?: boolean, garis?: boolean): void;
    }
    const Tk: typeof Teks;
}
declare namespace Basik {
    class Sound implements IAudio {
        static readonly list: IAudio[];
        private _src;
        private _loaded;
        private _sound;
        private _playedCount;
        get playedCount(): number;
        set playedCount(value: number);
        get sound(): HTMLAudioElement;
        set sound(value: HTMLAudioElement);
        get loaded(): boolean;
        set loaded(value: boolean);
        get src(): string;
        set src(value: string);
    }
    const Sn: typeof Sound;
}
declare const S: typeof Basik.Sound;
declare function LoadSound(url: string): void;
declare function PlaySound(s: IAudio): void;
declare function SoundEnded(s: IAudio): boolean;
declare function SoundLoaded(s: IAudio): boolean;
declare const G: typeof Basik.Graphic;
declare const T: typeof Basik.Teks;
declare const Im: typeof Basik.Img;
declare const Ip: typeof Basik.ImgImpl;
declare const In: typeof Basik.Input;
declare function Graphics(w?: number, h?: number, canvas?: HTMLCanvasElement, fullScreen?: boolean, input?: boolean): void;
declare function Cls(r?: number, g?: number, b?: number, a?: number): void;
declare function StrokeColor(r?: number, g?: number, b?: number, a?: number): void;
declare function Hijau(): number;
declare function Merah(): number;
declare function Biru(): number;
declare function Transparan(): number;
declare function GetPixel(x?: number, y?: number): number[];
declare function SetPiksel(x?: number, y?: number): number[];
declare function Garis(Ax: number, Ay: number, Bx: number, By: number): void;
declare function Kotak(x1: number, y1: number, x2: number, y2: number, isi?: boolean, garis?: boolean, rotasi?: number): void;
declare function Oval(x: number, y: number, radius: number, skalaX?: number, skalaY?: number, rotasi?: number): void;
declare const CreateDict: typeof Dict.create;
declare const InputHit: typeof Basik.Input.InputHit;
declare const InputX: typeof Basik.Input.InputX;
declare const InputY: typeof Basik.Input.InputY;
declare const InputIsDown: typeof Basik.Input.InputIsDown;
declare const FlushInput: typeof Basik.Input.FlushInput;
declare const InputDragX: typeof Basik.Input.InputDragX;
declare const InputDragY: typeof Basik.Input.InputDragY;
declare const InputIsDragged: typeof Basik.Input.InputIsDragged;
declare const InputType: typeof Basik.Input.InputType;
declare const InputTapCount: typeof Basik.Input.InputTapCount;
declare const InputDragStartCount: typeof Basik.Input.InputDragStartCount;
declare const InputDragEndCount: typeof Basik.Input.InputDragEndCount;
declare const InputDragStartX: typeof Basik.Input.InputDragStartX;
declare const InputDragStartY: typeof Basik.Input.InputDragStartY;
declare const DistMin: typeof Basik.Transform.degDistMin;
declare function Distance(x1: number, y1: number, x2: number, y2: number): number;
declare const LoadImage: typeof Basik.Img.LoadImage;
declare const LoadAnimImage: typeof Basik.Img.LoadAnimImage;
declare const ResizeImage: typeof Basik.SprDep.ResizeImage;
declare const DrawImage: typeof Basik.Img.DrawImage;
declare const Collide: typeof Basik.Img.Collide;
declare const Tile: typeof Basik.Img.Tile;
declare const AllImageLoaded: typeof Basik.Img.AllImageLoaded;
declare const PositionImageXY: typeof Basik.SprDep.PositionImageXY;
declare const PositionImagePolar: typeof Basik.Img.PositionImagePolar;
declare const DrawAllImage: typeof Basik.Img.DrawAllImage;
declare const CopyImage: typeof Basik.Img.CopyImage;
declare const Handle: typeof Basik.SprDep.Handle;
declare const Rotation: typeof Basik.SprDep.Rotasi;
declare const Width: typeof Basik.SprDep.Panjang;
declare const Height: typeof Basik.SprDep.Lebar;
declare const ImageLoaded: typeof Basik.SprDep.Dimuat;
declare const ImageXPosition: typeof Basik.SprDep.PosisiX;
declare const ImageYPosition: typeof Basik.SprDep.PosisiY;
declare const ImageAlpha: typeof Basik.SprDep.Alpha;
declare const ImageIsDragged: typeof Basik.SprDep.StatusDrag;
declare const DrawImageXY: typeof Basik.Img.DrawImageXY;
declare function Dist2Image(s: Basik.ImgObj, s2: Basik.ImgObj): number;
declare const FontName: typeof Basik.Teks.Font;
declare const Print: typeof Basik.Teks.Tulis;
declare const Align: typeof Basik.Teks.Rata;
declare const FontSize: typeof Basik.Teks.FontSize;
declare namespace rpg {
    class Conf {
        private _roomUrl;
        private _npc;
        private _trig;
        get roomUrl(): string;
        set roomUrl(value: string);
        get npc(): NPC[];
        set npc(value: NPC[]);
        get trig(): Trig;
        set trig(value: Trig);
    }
    class Trig {
        readonly p: Point;
        private _id;
        static readonly list: Trig[];
        get id(): string;
        set id(value: string);
        private static baru;
        static buat(n: string, x: number, y: number): void;
    }
    class Point {
        private _x;
        private _y;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
    }
    class NPC {
        private _p;
        private _url;
        private _id;
        private static list;
        private static baru;
        static buat(n: string, url: string, x: number, y: number): NPC;
        get id(): string;
        set id(value: string);
        get url(): string;
        set url(value: string);
        get p(): Point;
        set p(value: Point);
    }
    export var conf: Conf;
    export {};
}
declare namespace rpg {
    function render(): void;
}
declare namespace Basik {
    class Spr3 {
        static gerakX(s: ImgObj, n: number): void;
        static gerakY(s: ImgObj, n: number): void;
        static gerakXY(s: ImgObj, x: number, y: number): void;
        static gerakSudut(s: ImgObj, n: number, sudut: number): void;
        static gerakPutar(s: ImgObj, sudut: number, sx: number, sy: number): void;
        static menjauh(s: ImgObj, x: number, y: number, jml: number): void;
        static mendekat(s: ImgObj, x: number, y: number, jml: number): void;
    }
}
