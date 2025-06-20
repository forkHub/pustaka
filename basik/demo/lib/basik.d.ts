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
    class Camera {
        private static _x;
        static get x(): number;
        static set x(value: number);
        private static _y;
        static get y(): number;
        static set y(value: number);
        private static _img;
        static get img(): Basik.Image;
        static set img(value: Basik.Image);
        static init(): void;
    }
}
declare namespace Basik {
    enum Evt {
        MOUSE_DOWN = "mousedown",
        MOUSE_UP = "mouseup",
        MOUSE_MOVE = "mousemove",
        MOUSE_TAP = "mousetap",
        MOUSE_START_DRAG = "mousestartdrag",
        MOUSE_END_DRAG = "mouseenddrag",
        KEYB_DOWN = "keybdown",
        KEYB_UP = "keybup"
    }
    class Event {
        private static readonly list;
        private _type;
        private _f;
        get type(): string;
        get f(): () => void;
        constructor(type: string, f: () => void);
        static addEventListener(type: string, f: () => void): Event;
        static dispatchEvent(type: string): void;
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
        static destroy(r: Ktk): void;
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
        static readonly daftar: Image[];
        static CreateImage(width: number, height: number): Image;
        static MuatAnimasi(url: string, pf: number, lf: number, tipeDrag?: number): Image;
        static register(image: Image, url: string, tipeDrag: number): Image;
        static free(img: Basik.Image): void;
        static Muat(url: string): Image;
        static tabrakan(gbr1: Image, x1: number, y1: number, gbr2: Image, x2: number, y2: number): boolean;
        static dotInsideImage(gbr1: Image, x1: number, y1: number, x2: number, y2: number): boolean;
        private static gambarUbin;
        static AmbilPiksel(x?: number, y?: number): void;
        static SetPiksel(x?: number, y?: number): void;
        static Draw(img: Image): void;
        private static DrawSingle;
        private static resetRect;
        private static rectToImageTf;
        static AllImageLoaded(): boolean;
    }
    const Ip: typeof ImgImpl;
}
declare namespace Basik {
    class ImgIntHandler {
        init(): void;
        private down;
        private inputDown;
        private inputMove;
    }
    export const sprInt: ImgIntHandler;
    export {};
}
declare namespace Basik {
    class Input {
        private static _debug;
        private static readonly lst;
        private static _pointerEvent;
        private static _keyboardEvent;
        static get keyboardEvent(): KeyboardEvent;
        static set keyboardEvent(value: KeyboardEvent);
        static get pointerEvent(): PointerEvent;
        static readonly global: IInput;
        static get debug(): boolean;
        static set debug(value: boolean);
        private static evt;
        constructor();
        static getByButton(btn?: number): IInput;
        static getById(id: string): IInput;
        private static getId;
        private static getInput;
        private static checkTap;
        static init(buffer: HTMLCanvasElement): void;
        private static reg;
        static getPos: (cx: number, cy: number, c: HTMLCanvasElement) => {
            x: number;
            y: number;
        };
    }
    const In: typeof Input;
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
        static WriteLn(teks: string): void;
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
declare namespace Basik {
    class Keyboard {
        private static readonly list;
        private static _obj;
        static get obj(): KeyboardEvent;
        private static reg;
        private static setDown;
        static IsDown(key: string): boolean;
        static init(): void;
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
    interface IInput {
        id: string;
        pointerType: string;
        xStart: number;
        yStart: number;
        xDrag: number;
        yDrag: number;
        moveX: number;
        moveY: number;
        x: number;
        y: number;
        isDrag: boolean;
        isDown: boolean;
        isTap: boolean;
        evt: PointerEvent;
        button: number;
        timerStart: number;
        timerEnd: number;
        pointerId: number;
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
declare const S: typeof Basik.Sound;
declare function LoadSound(url: string): Basik.Sound;
declare function PlaySound(s: Basik.Sound): void;
declare function SoundLoaded(s: Basik.Sound): boolean;
declare const G: typeof Basik.Graphic;
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
declare function AddEventListener(type: string, f: () => void): void;
declare function DispatchEvent(evt: string): void;
declare function SetPiksel(x?: number, y?: number): void;
declare function Garis(Ax: number, Ay: number, Bx: number, By: number): void;
declare function Kotak(x1: number, y1: number, x2: number, y2: number, isi?: boolean, garis?: boolean, rotasi?: number): void;
declare function Oval(x: number, y: number, radius: number, skalaX?: number, skalaY?: number, rotasi?: number): void;
declare function MouseIsDown(btn?: number): boolean;
declare function MouseIsDragged(btn?: number): boolean;
declare function MouseDragXAmount(btn?: number): number;
declare function MouseDragYAmount(btn?: number): number;
declare function MouseX(): number;
declare function MouseY(): number;
declare function MouseDragStartX(btn?: number): number;
declare function MouseDragStartY(btn?: number): number;
declare function MouseButton(): number;
declare function MouseMoveX(): number;
declare function MouseMoveY(): number;
declare function degDist(angleS: number, angleT: number, min?: boolean): number;
declare function Angle(x: number, y: number): number;
declare function Clamp(n: number, min: number, max: number): number;
declare function LoadImage(url: string): Basik.Image;
declare function LoadAnimImage(url: string, frameWidth: number, frameHeight: number): Basik.Image;
declare function DrawImage(img: Basik.Image): void;
declare function ImageCollide(img1: Basik.Image, img2: Basik.Image): boolean;
declare function ImageCollidePoint(img: Basik.Image, x: number, y: number): boolean;
declare function CreateImage(width: number, height: number): Basik.Image;
declare const ImageCanvas: (img: Basik.Image) => HTMLCanvasElement;
declare function AllImageLoaded(): boolean;
declare function FreeImage(img: Basik.Image): void;
declare const TextPos: typeof Basik.Teks.Goto;
declare const Write: typeof Basik.Teks.Write;
declare const WriteLn: typeof Basik.Teks.WriteLn;
declare const TextFont: typeof Basik.Teks.Name;
declare const TextSize: typeof Basik.Teks.Size;
declare function KeyboardIsDown(key: string): boolean;
declare namespace Basik {
    class Image {
        constructor(url?: string);
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
        private _ctrIdx;
        private static _ctrDraw;
        private _url;
        img: HTMLImageElement;
        private _canvas;
        isAnim: boolean;
        rect: Ktk;
        private _tipeDrag;
        private _dragStartY;
        private _dragStartX;
        private _sudutTekanAwal;
        private _sudutAwal;
        private _inputId;
        get inputId(): string;
        set inputId(value: string);
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
        get ctrIdx(): number;
        set ctrIdx(value: number);
        get rotation(): number;
        set rotation(value: number);
        get drgStartX(): number;
        set drgStartX(value: number);
        get drgStartY(): number;
        set drgStartY(value: number);
        get dragged(): boolean;
        set dragged(value: boolean);
        get down(): boolean;
        set down(value: boolean);
        get sudutTekanAwal(): number;
        set sudutTekanAwal(value: number);
        get tipeDrag(): number;
        set tipeDrag(value: number);
        get url(): string;
        set url(value: string);
        static get ctrDraw(): number;
        static set ctrDraw(value: number);
    }
}
