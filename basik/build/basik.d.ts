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
    class Event {
        private static readonly list;
        private _type;
        private _f;
        get type(): string;
        get f(): () => void;
        constructor(type: string, f: () => void);
        static addListener(type: string, f: () => void): Event;
        static call(type: string): void;
    }
}
declare namespace Basik {
    class Graphic {
        private static _autoScale;
        private static canvas;
        private static mainCanvas;
        static get autoScale(): boolean;
        static set autoScale(value: boolean);
        private static _merah;
        private static _hijau;
        private static _biru;
        private static _transparan;
        static handleWindowResize(): void;
        private static buildCanvas;
        static Canvas(): HTMLCanvasElement;
        static MainCanvas(): HTMLCanvasElement;
        static SetCanvas(canvas: HTMLCanvasElement): void;
        static Graphics(w?: number, h?: number, canvas?: HTMLCanvasElement, fullScreen?: boolean): void;
        private static setupMainCanvas;
        static Cls(): void;
        static get red(): number;
        static set red(value: number);
        static get green(): number;
        static set green(value: number);
        static get blue(): number;
        static set blue(value: number);
        static get alpha(): number;
        static set alpha(value: number);
    }
    const G: typeof Graphic;
}
declare namespace Basik {
    namespace input {
        class EventHandler {
            move(input: IInput, buffer: HTMLCanvasElement, e: MouseEvent): void;
            down(input: IInput, key: number, pos: IV2D): void;
            up(input: IInput, key: number): void;
            private checkTap;
        }
    }
    export class Input {
        private static _debug;
        static get debug(): boolean;
        static set debug(value: boolean);
        private static _obj;
        private static _evt;
        constructor();
        static init(buffer: HTMLCanvasElement): void;
        private static buatInputDefault;
        static getPos: (cx: number, cy: number, c: HTMLCanvasElement) => {
            x: number;
            y: number;
        };
        static get event(): input.EventHandler;
        static get obj(): IInput;
    }
    export const In: typeof Input;
    export {};
}
declare namespace Basik {
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
        key: number;
        timerStart: number;
        timerEnd: number;
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
}
declare namespace Basik {
    class Keyboard {
        private static _key;
        static get key(): string;
        static set key(value: string);
        static init(): void;
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
        static putarPoros(p: Pt, xc?: number, yc?: number, deg?: number): void;
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
        private static boundCollide;
        static collide(seg1: Seg, seg2: Seg): boolean;
        static copy(seg1: Seg, seg2: Seg): void;
        private static clone;
        private static crossHor;
        static deg(line: Seg): number;
        private static getXAtIdx;
        private static vecI;
        private static rotate;
        private static minX;
        private static maxX;
        private static minY;
        private static maxY;
        private static translate;
        private static xHorIdx;
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
        private static minX;
        private static maxX;
        private static minY;
        private static maxY;
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
        private static quadDeg2;
        static sudut(x: number, y: number): number;
        private static normalizeDeg;
        static degDist(angleS: number, angleT: number, min?: boolean): number;
        private static degDistMax;
        private static degDistMin;
        static rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): void;
    }
    const Tf: typeof Transform;
}
declare namespace Basik {
    class ImgImpl {
        static readonly props: string[];
        static readonly daftar: ImgObj[];
        static CreateImage(width: number, height: number): ImgObj;
        static MuatAnimasi(url: string, pf: number, lf: number, tipeDrag?: number): ImgObj;
        static GambarSemua(): void;
        static muatAnimasiAsyncKanvas(url: string, pf: number, lf: number, canvas: HTMLCanvasElement, tipeDrag: number): ImgObj;
        static muatAsyncBerbagiKanvas(url: string, canvas: HTMLCanvasElement, tipeDrag: number): ImgObj;
        private static register;
        static Muat(url: string, tipeDrag?: number, onload?: () => void): ImgObj;
        static tabrakan(gbr1: ImgObj, x1: number, y1: number, gbr2: ImgObj, x2: number, y2: number): boolean;
        static dotInsideImage(gbr1: ImgObj, x1: number, y1: number, x2: number, y2: number): boolean;
        private static muatAnimAsync;
        private static muatAnimAsyncCanvas;
        private static muatAsync;
        private static def;
        private static muatAsyncKanvas;
        private static gambarUbin;
        static AmbilPiksel(x?: number, y?: number): void;
        static SetPiksel(x?: number, y?: number): void;
        static Draw(img: ImgObj): void;
        private static DrawSingle;
        private static resetRect;
        private static rectToImageTf;
        static AllImageLoaded(): boolean;
    }
    const Ip: typeof ImgImpl;
}
declare namespace Basik {
    class ImgObj {
        constructor();
        private _x;
        private _y;
        private _alpha;
        private _handleX;
        private _handleY;
        private _panjang;
        private _lebar;
        private _rotasi;
        private _tilable;
        private _frameW;
        private _frameH;
        private _dragged;
        private _down;
        private _frame;
        load: boolean;
        private _panjangDiSet;
        private _lebarDiSet;
        private _ctrIdx;
        private static _ctrDraw;
        private _url;
        img: HTMLImageElement;
        private _canvas;
        ctx: CanvasRenderingContext2D;
        isAnim: boolean;
        rect: Ktk;
        ratioX?: number;
        ratioY?: number;
        private _tipeDrag;
        private _dragStartY;
        private _dragStartX;
        private _sudutTekanAwal;
        private _button;
        private _sudutAwal;
        get frame(): number;
        set frame(value: number);
        get canvas(): HTMLCanvasElement;
        set canvas(value: HTMLCanvasElement);
        get tilable(): boolean;
        set tilable(value: boolean);
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
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get panjangDiSet(): boolean;
        set panjangDiSet(value: boolean);
        get lebarDiSet(): boolean;
        set lebarDiSet(value: boolean);
        get ctrIdx(): number;
        set ctrIdx(value: number);
        get rotasi(): number;
        set rotasi(value: number);
        get drgStartX(): number;
        set drgStartX(value: number);
        get drgStartY(): number;
        set drgStartY(value: number);
        get dragged(): boolean;
        set dragged(value: boolean);
        get down(): boolean;
        set down(value: boolean);
        get dragable(): boolean;
        get sudutTekanAwal(): number;
        set sudutTekanAwal(value: number);
        get tipeDrag(): number;
        set tipeDrag(value: number);
        get url(): string;
        set url(value: string);
        static get ctrDraw(): number;
        static set ctrDraw(value: number);
        get button(): number;
        set button(value: number);
    }
}
declare namespace Basik {
    class SprInt {
        private spriteDown;
        inputDown(pos: any, button: number): void;
        inputMove(pos: any, button: number): void;
    }
    export const sprInt: SprInt;
    export {};
}
declare namespace Basik {
    class Teks {
        private static _name;
        private static _size;
        private static _x;
        private static _y;
        static get size(): number;
        static set size(value: number);
        static Goto(x: number, y: number): void;
        static Name(name?: string): void;
        static Size(n?: number): void;
        static Write(teks: string): void;
    }
    const Tk: typeof Teks;
}
declare namespace Basik {
    class Sound implements IAudio {
        static readonly list: IAudio[];
        private static _lastSound;
        private _src;
        private _loaded;
        private _sound;
        private _playedCount;
        static get lastSound(): Sound;
        static set lastSound(value: Sound);
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
declare function LoadSound(url: string): Basik.Sound;
declare function PlaySound(s: Basik.Sound): void;
declare function SoundLoaded(s: Basik.Sound): boolean;
declare const G: typeof Basik.Graphic;
declare const T: typeof Basik.Teks;
declare const Ip: typeof Basik.ImgImpl;
declare const In: typeof Basik.Input;
declare function MainCanvas(): HTMLCanvasElement;
declare function SetCanvas(c: HTMLCanvasElement): void;
declare function ClearArea(x: number, y: number, w: number, h: number): void;
declare function Graphics(w?: number, h?: number, canvas?: HTMLCanvasElement, fullScreen?: boolean): void;
declare function Cls(): void;
declare function Green(): number;
declare function Red(): number;
declare function Blue(): number;
declare function Alpha(): number;
declare function GetPixel(x?: number, y?: number): void;
declare function SetPixel(x?: number, y?: number): void;
declare function FillColor(r?: number, g?: number, b?: number, a?: number): void;
declare function StrokeColor(r?: number, g?: number, b?: number, a?: number): void;
declare function AddListener(type: string, f: () => void): void;
declare function KeyboardKey(): string;
declare function MouseButton(): number;
declare function MouseIsDown(): boolean;
declare function MouseIsDragged(): boolean;
declare function MouseDragXAmount(): number;
declare function MouseDragYAmount(): number;
declare function MouseX(): number;
declare function MouseY(): number;
declare function MouseDragStartX(): number;
declare function MouseDragStartY(): number;
declare function degDist(angleS: number, angleT: number, min?: boolean): number;
declare function Angle(x: number, y: number): number;
declare function LoadImage(url: string): Basik.ImgObj;
declare function LoadAnimImage(url: string, frameWidth: number, frameHeight: number): Basik.ImgObj;
declare function DrawImage(img: Basik.ImgObj): void;
declare function ImageCollide(img1: Basik.ImgObj, img2: Basik.ImgObj): boolean;
declare function ImageCollidePoint(img: Basik.ImgObj, x: number, y: number): boolean;
declare function CreateImage(width: number, height: number): Basik.ImgObj;
declare const ImageCanvas: (img: Basik.ImgObj) => HTMLCanvasElement;
declare function AllImageLoaded(): boolean;
declare function CopyImage(img: Basik.ImgObj): Basik.ImgObj;
