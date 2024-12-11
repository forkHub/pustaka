declare namespace Basik {
    class Graphic {
        private static _skalaOtomatis;
        private static _canvas;
        static get context(): CanvasRenderingContext2D;
        static get canvas(): HTMLCanvasElement;
        private static _merah;
        private static _hijau;
        private static _biru;
        private static _transparan;
        private static warnaBackup;
        static Pause(): void;
        private static handleWindowResize;
        static buatCanvas(canvasEl: HTMLCanvasElement): ImageObj;
        private static backupWarna;
        private static restoreWarna;
        static Cls(red?: number, hijau?: number, biru?: number, transparan?: number): void;
        static FillColor(r?: number, g?: number, b?: number, a?: number): void;
        static StrokeColor(r?: number, g?: number, b?: number, a?: number): void;
        static NoColor(): void;
        private static updateStyleWarna;
        static Hijau(): number;
        static Merah(): number;
        static Biru(): number;
        static Transparan(): number;
        static Start(panjang?: number, lebar?: number, canvas?: HTMLCanvasElement, fullScreen?: boolean, input?: boolean): void;
        private static Grafis2;
        static Garis(Ax: number, Ay: number, Bx: number, By: number): void;
        static Kotak(x1: number, y1: number, x2: number, y2: number, isi?: boolean, garis?: boolean, rotasi?: number): void;
        static Oval(x: number, y: number, radius: number, skalaX?: number, skalaY?: number, rotasi?: number): void;
        static get merah(): number;
        static set merah(value: number);
        static get hijau(): number;
        static set hijau(value: number);
        static get biru(): number;
        static set biru(value: number);
        static get transparan(): number;
        static set transparan(value: number);
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
        static JmlTap(): number;
        static JmlUp(): number;
        static JmlDragSelesai(): number;
        static InputType(): EInput;
        static InputHit(): number;
        static InputXAwal(): number;
        static InputYAwal(): number;
        static InputX(): number;
        static InputY(): number;
        static GeserX(): number;
        static GeserY(): number;
        static FlushInput(): void;
        static JmlDragMulai(): number;
        static Pencet(): boolean;
        static Geser(): boolean;
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
    export {};
}
interface Ikt {
    vs?: IV2D[];
    segs?: ISegment[];
}
interface ISegment {
    v1: IV2D;
    v2: IV2D;
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
    interface IPoint2D {
        x: number;
        y: number;
    }
    class Point {
        static create(x?: number, y?: number): IPoint2D;
        static copy(p1: IPoint2D, p2: IPoint2D): void;
        static clone(p: IPoint2D): IPoint2D;
        static sama(p1: IPoint2D, p2: IPoint2D): boolean;
        static putarPoros(p: IPoint2D, xc?: number, yc?: number, deg?: number): void;
        static posDist(p: IPoint2D, xt: number, yt: number, jrk: number): IPoint2D;
        static posPolar(jarak: number, sudut: number, xt: number, yt: number): IPoint2D;
    }
}
declare namespace Basik {
    class Segment {
        static create(v1?: IPoint2D, v2?: IPoint2D): ISegment;
        static boundCollide(seg1: ISegment, seg2: ISegment): boolean;
        static collide(seg1: ISegment, seg2: ISegment): boolean;
        static copy(seg1: ISegment, seg2: ISegment): void;
        static clone(seg: ISegment): ISegment;
        static crossHor(seg: ISegment): boolean;
        static deg(line: ISegment): number;
        static getXAtIdx(seg: ISegment, idx: number): number;
        static getYAtIdx(seg: ISegment, idx: number): number;
        static vecI(seg: ISegment): number;
        static vecJ(seg: ISegment): number;
        static rotate(seg: ISegment, deg?: number, xc?: number, yc?: number): void;
        static minX(seg: ISegment): number;
        static maxX(seg: ISegment): number;
        static minY(seg: ISegment): number;
        static maxY(seg: ISegment): number;
        static translate(seg: ISegment, x?: number, y?: number): void;
        static xHorIdx(seg: ISegment): number;
    }
}
declare namespace Basik {
    class Kotak {
        static buat(x1?: number, y1?: number, x2?: number, y2?: number): Ikt;
        private static copy;
        private static copyInfo;
        private static collideBound;
        static collide(r1: Ikt, r2: Ikt): boolean;
        private static collideDotBound;
        static collideDot(r: Ikt, x: number, y: number): boolean;
        static minX(r: Ikt): number;
        static maxX(r: Ikt): number;
        static minY(r: Ikt): number;
        static maxY(r: Ikt): number;
        static translate(rect: Ikt, x: number, y: number): void;
        static rotate(r: Ikt, deg: number, xc: number, yc: number, copy?: boolean): Ikt;
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
}
declare namespace ha.be {
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
        static Load(url: string): void;
        static Play(s: IAudio): void;
        static SoundEnded(s: IAudio): boolean;
        static SoundLoaded(s: IAudio): boolean;
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
}
declare const LoadSound: typeof ha.be.Sound.Load;
declare const PlaySound: typeof ha.be.Sound.Play;
declare const SoundEnded: typeof ha.be.Sound.SoundEnded;
declare const SoundLoaded: typeof ha.be.Sound.SoundLoaded;
declare namespace Basik {
    class ImgImpl {
        static readonly props: string[];
        static readonly daftar: ImageObj[];
        static CreateImage(width: number, height: number): ImageObj;
        static MuatAnimasi(url: string, pf: number, lf: number, bisaDiDrag?: boolean, tipeDrag?: number): ImageObj;
        static GambarSemua(): void;
        static Bound(s: ImageObj): Ikt;
        static muatAnimasiAsyncKanvas(url: string, pf: number, lf: number, bisaDiDrag: boolean, canvas: HTMLCanvasElement, tipeDrag: number): ImageObj;
        static muatAsyncBerbagiKanvas(url: string, dragable: boolean, canvas: HTMLCanvasElement, tipeDrag: number, onload: () => void): ImageObj;
        private static register;
        static Muat(url: string, bisaDiDrag?: boolean, tipeDrag?: number, onload?: () => void): ImageObj;
        static DrawImageXY(s: ImageObj, x: number, y: number, frame?: number): void;
        static PositionImagePolar(img: ImageObj, angle: number, jarak: number, x2: number, y2: number, skalaX?: number, skalaY?: number, tilt?: number): void;
        static buatBagiCanvas(canvas: HTMLCanvasElement, w?: number, h?: number, frameW?: number, frameH?: number): ImageObj;
        static panjang(gbr: ImageObj, pj?: number): number;
        static lebar(gbr: ImageObj, lb?: number): number;
        static tabrakan(gbr1: ImageObj, x1: number, y1: number, gbr2: ImageObj, x2: number, y2: number): boolean;
        static dotDidalamGambar(gbr1: ImageObj, x1: number, y1: number, x2: number, y2: number): boolean;
        static muatAnimAsync(url: string, fw: number, fh: number): ImageObj;
        static muatAnimAsyncCanvas(url: string, fw: number, fh: number, canvas: HTMLCanvasElement): ImageObj;
        static muatAsync(url: string, onload: () => void): ImageObj;
        static def(img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): ImageObj;
        static muatAsyncKanvas(url: string, canvas: HTMLCanvasElement, onload: () => void): ImageObj;
        static gambarUbin(gbr: ImageObj, x?: number, y?: number, frame?: number): void;
        static AmbilPiksel(x?: number, y?: number): number[];
        static SetPiksel(x?: number, y?: number): void;
        static gambar(gbr: ImageObj, x?: number, y?: number, frame?: number): void;
        static ukuran(gbr: ImageObj, w?: number, h?: number): void;
        static resetRect(img: ImageObj): void;
        static rectToImageTransform(image: ImageObj, x: number, y: number): void;
        static AllImageLoaded(): boolean;
    }
}
declare namespace Basik {
    class Image {
        static CreateImage(width: number, height: number): ImageObj;
        static Copy(s: ImageObj, onload?: () => void): ImageObj;
        static DrawAll(): void;
        static Collide(imgA: ImageObj, imgB: ImageObj): boolean;
        static LoadAnim(url: string, fw: number, fh: number, dragable?: boolean, dragType?: number): ImageObj;
        static Load(url: string, dragable?: boolean, dragType?: number): ImageObj;
        static Draw(img: ImageObj, frame?: number): void;
        static DrawXY(img: ImageObj, x: number, y: number, frame?: number): void;
        static PositionPolar(img: ImageObj, angle: number, jarak: number, x2: number, y2: number, skalaX?: number, skalaY?: number, tilt?: number): void;
        static DrawTile(img: ImageObj, x?: number, y?: number, frame?: number): void;
        static GetPixel(x?: number, y?: number): number[];
        static SetPiksel(x?: number, y?: number): number[];
        static AllImageLoaded(): boolean;
    }
}
declare const Graphics: typeof Basik.Graphic.Start;
declare function Cls(r?: number, g?: number, b?: number, t?: number): void;
declare const Stroke: typeof Basik.Graphic.StrokeColor;
declare const Red: typeof Basik.Graphic.Merah;
declare const Green: typeof Basik.Graphic.Hijau;
declare const Blue: typeof Basik.Graphic.Biru;
declare const Alpha: typeof Basik.Graphic.Transparan;
declare const GetPixel: typeof Basik.Image.GetPixel;
declare const SetPixel: typeof Basik.Image.SetPiksel;
declare const Line: typeof Basik.Graphic.Garis;
declare const Rect: typeof Basik.Graphic.Kotak;
declare const Oval: typeof Basik.Graphic.Oval;
declare const CreateDict: typeof Dict.create;
declare const InputHit: typeof Basik.Input.InputHit;
declare const InputX: typeof Basik.Input.InputX;
declare const InputY: typeof Basik.Input.InputY;
declare const InputIsDown: typeof Basik.Input.Pencet;
declare const FlushInput: typeof Basik.Input.FlushInput;
declare const InputDragX: typeof Basik.Input.GeserX;
declare const InputDragY: typeof Basik.Input.GeserY;
declare const InputIsDragged: typeof Basik.Input.Geser;
declare const InputType: typeof Basik.Input.InputType;
declare const InputTapCount: typeof Basik.Input.JmlTap;
declare const InputDragStartCount: typeof Basik.Input.JmlDragMulai;
declare const InputDragEndCount: typeof Basik.Input.JmlDragSelesai;
declare const InputDragStartX: typeof Basik.Input.InputXAwal;
declare const InputDragStartY: typeof Basik.Input.InputYAwal;
declare const DistMin: typeof Basik.Transform.degDistMin;
declare function Distance(x1: number, y1: number, x2: number, y2: number): number;
declare namespace Basik {
    class SprDep {
        static HandleX(s: ImageObj): number;
        static HandleY(s: ImageObj): number;
        static Handle(img: ImageObj, x?: number, y?: number): void;
        static Ukuran(s: ImageObj, w: number, h: number): void;
        static PositionImage(img: ImageObj, x?: number, y?: number): void;
        static StatusMuat(spr?: ImageObj): boolean;
        static TabrakanXY(spr: ImageObj, x1: number, y1: number, spr2: ImageObj, x2: number, y2: number): boolean;
        static PosisiX(s: ImageObj, x?: number | null | undefined): number;
        static PosisiY(s: ImageObj, y?: number | null | undefined): number;
        static DragMode(s: ImageObj, n: number): void;
        static Dimuat(s: ImageObj): boolean;
        static StatusDrag(s: ImageObj): boolean;
        static kontek(s: ImageObj): CanvasRenderingContext2D;
        static Panjang(s: ImageObj, pj?: number): number;
        static Lebar(s: ImageObj, lb?: number): number;
        static Alpha(s: ImageObj, alpha?: number): number;
        static Rotasi(s: ImageObj, sudut?: number): number;
    }
}
declare const LoadImage: typeof Basik.Image.Load;
declare const LoadAnimImage: typeof Basik.Image.LoadAnim;
declare const ResizeImage: typeof Basik.SprDep.Ukuran;
declare const DrawImage: typeof Basik.Image.Draw;
declare const DrawImageXY: typeof Basik.Image.DrawXY;
declare const Collide: typeof Basik.Image.Collide;
declare const Tile: typeof Basik.Image.DrawTile;
declare const AllImageLoaded: typeof Basik.Image.AllImageLoaded;
declare const PositionImageXY: typeof Basik.SprDep.PositionImage;
declare const PositionImagePolar: typeof Basik.Image.PositionPolar;
declare const DrawAllImage: typeof Basik.Image.DrawAll;
declare const CopyImage: typeof Basik.Image.Copy;
declare const Handle: typeof Basik.SprDep.Handle;
declare const Rotation: typeof Basik.SprDep.Rotasi;
declare const Width: typeof Basik.SprDep.Panjang;
declare const Height: typeof Basik.SprDep.Lebar;
declare const ImageLoaded: typeof Basik.SprDep.Dimuat;
declare const ImageXPosition: typeof Basik.SprDep.PosisiX;
declare const ImageYPosition: typeof Basik.SprDep.PosisiY;
declare const ImageAlpha: typeof Basik.SprDep.Alpha;
declare const ImageIsDragged: typeof Basik.SprDep.StatusDrag;
declare function Dist2Image(s: Basik.ImageObj, s2: Basik.ImageObj): number;
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
    class ImageObj {
        private static _ctrDraw;
        private _url;
        img: HTMLImageElement;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        isAnim: boolean;
        rect: Ikt;
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
        spriteDown(s: ImageObj, pos: any, id: number): void;
        inputDown(pos: any, id: number): void;
        inputMove(pos: any, pointerId: number): void;
        inputUp(): void;
    }
    export const sprInt: SprInt;
    export {};
}
declare namespace Basik {
    class Spr3 {
        static gerakX(s: ImageObj, n: number): void;
        static gerakY(s: ImageObj, n: number): void;
        static gerakXY(s: ImageObj, x: number, y: number): void;
        static gerakSudut(s: ImageObj, n: number, sudut: number): void;
        static gerakPutar(s: ImageObj, sudut: number, sx: number, sy: number): void;
        static menjauh(s: ImageObj, x: number, y: number, jml: number): void;
        static mendekat(s: ImageObj, x: number, y: number, jml: number): void;
    }
}
