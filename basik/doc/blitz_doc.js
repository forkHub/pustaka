"use strict";
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Cache {
            files = [];
            getGbr(url) {
                for (let i = 0; i < this.files.length; i++) {
                    if (this.files[i].url == url) {
                        console.log('ambil dari cache: ' + url);
                        return this.files[i].img;
                    }
                }
                return null;
            }
            setFile(url, img) {
                let img2;
                img2 = this.getGbr(url);
                if (img2) {
                    return;
                }
                console.log('cache: ' + url);
                this.files.push({
                    url: url,
                    img: img
                });
            }
        }
        be.cache = new Cache();
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
// namespace Basik {
// 	// class Config {
// 	// 	readonly stroke = new Stroke();
// 	// 	readonly fill = new Stroke();
// 	// }
// 	// class RGB {
// 	// 	private _m = 0;
// 	// 	private _g: number = 0;
// 	// 	private _b: number = 0;
// 	// 	public get b(): number {
// 	// 		return this._b;
// 	// 	}
// 	// 	public set b(value: number) {
// 	// 		this._b = value;
// 	// 	}
// 	// 	public get g(): number {
// 	// 		return this._g;
// 	// 	}
// 	// 	public set g(value: number) {
// 	// 		this._g = value;
// 	// 	}
// 	// 	public get m() {
// 	// 		return this._m;
// 	// 	}
// 	// 	public set m(value) {
// 	// 		this._m = value;
// 	// 	}
// 	// }
// 	// class Stroke {
// 	// 	private _tebal: number = 1;
// 	// 	readonly rgb: RGB = new RGB();
// 	// 	private _aktif: boolean = false;
// 	// 	public get aktif(): boolean {
// 	// 		return this._aktif;
// 	// 	}
// 	// 	public set aktif(value: boolean) {
// 	// 		this._aktif = value;
// 	// 	}
// 	// 	public get tebal(): number {
// 	// 		return this._tebal;
// 	// 	}
// 	// 	public set tebal(value: number) {
// 	// 		this._tebal = value;
// 	// 	}
// 	// }
// 	// export var config: Config = new Config();
// }
// /**
//  *
//  */
// namespace Basik {
// 	/**
// 	 *
// 	 */
// 	export namespace Data {
// 		/**
// 		 *
// 		 */
// 		export class Obj {
// 			private _id: number = 0;
// 			private _entry: any[];
// 			private _nama: string = '';
// 			public get id(): number {
// 				return this._id;
// 			}
// 			public set id(value: number) {
// 				this._id = value;
// 			}
// 			public get entry(): any[] {
// 				return this._entry;
// 			}
// 			public set entry(value: any[]) {
// 				this._entry = value;
// 			}
// 			public get nama(): string {
// 				return this._nama;
// 			}
// 			public set nama(value: string) {
// 				this._nama = value;
// 			}
// 		}
// 	}
// }
var Basik;
(function (Basik) {
    class Graphic {
        static _autoScale = true;
        static _canvas;
        static get canvas() {
            return Graphic._canvas;
        }
        static _context;
        static get context() {
            return Graphic._context;
        }
        static set context(value) {
            Graphic._context = value;
        }
        static _mainCtx;
        static get mainCtx() {
            return Graphic._mainCtx;
        }
        static get autoScale() {
            return Basik.G._autoScale;
        }
        static set autoScale(value) {
            Basik.G._autoScale = value;
        }
        static _merah = 0;
        static _hijau = 0;
        static _biru = 0;
        static _transparan = 0;
        // static Pause() {
        // 	debugger;
        // 	// this.canvasAktif.canvas.getcon
        // }
        static handleWindowResize() {
            if (!Basik.G._autoScale)
                return;
            // console.debug('window on resize');
            let canvas = Basik.G._canvas;
            let cp = Basik.G._canvas.width;
            let cl = Basik.G._canvas.height;
            let wp = window.innerWidth;
            let wl = window.innerHeight;
            let ratio = Math.min((wp / cp), (wl / cl));
            let cp2 = Math.floor(cp * ratio);
            let cl2 = Math.floor(cl * ratio);
            canvas.style.position = 'fixed';
            canvas.style.zIndex = '1';
            canvas.style.width = cp2 + 'px';
            canvas.style.height = cl2 + 'px';
            canvas.style.top = ((wl - cl2) / 2) + 'px';
            canvas.style.left = ((wp - cp2) / 2) + 'px';
            // console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
        }
        static buildCanvas(w, h) {
            if (!Basik.G._canvas) {
                Basik.G._canvas = document.body.querySelector('canvas');
            }
            if (!Basik.G._canvas) {
                Basik.G._canvas = document.createElement('canvas');
                document.body.appendChild(Basik.G._canvas);
                Basik.G._canvas.width = w;
                Basik.G._canvas.height = h;
            }
        }
        static Graphics(w = 320, h = 240, canvas = null, fullScreen = true) {
            if (canvas) {
                Basik.G._canvas = canvas;
            }
            Basik.G.buildCanvas(w, h);
            this._mainCtx = Basik.G._canvas.getContext("2d");
            this._context = this._mainCtx;
            Basik.G.autoScale = fullScreen;
            console.log('inisialisasi');
            Basik.G.setupCanvas(w, h, Basik.G.autoScale);
            Basik.In.init(Basik.G._canvas);
            // if (Graphic.skalaOtomatis) {
            window.addEventListener("resize", () => {
                Basik.G.handleWindowResize();
            });
            function update() {
                let updater = window["Update"];
                if (typeof updater === "function") {
                    updater();
                }
                window.requestAnimationFrame(update);
            }
            window.requestAnimationFrame(update);
            setTimeout(() => {
                Basik.G.handleWindowResize();
            }, 100);
            Basik.G.handleWindowResize();
            NoStroke();
            Cls();
        }
        static setupCanvas(p = 320, l = 240, fullScreen) {
            Basik.G._canvas.width = p;
            Basik.G._canvas.height = l;
            if (fullScreen) {
                Basik.G._canvas.style.width = p + 'px';
                Basik.G._canvas.style.padding = '0px';
                Basik.G._canvas.style.margin = '0px';
            }
        }
        static Cls() {
            let ctx = Basik.G.context;
            ctx.clearRect(0, 0, (Basik.G._canvas.width), (Basik.G._canvas.height));
        }
        static get red() {
            return Basik.G._merah;
        }
        static set red(value) {
            Basik.G._merah = value;
        }
        static get hijau() {
            return Basik.G._hijau;
        }
        static set hijau(value) {
            Basik.G._hijau = value;
        }
        static get biru() {
            return Basik.G._biru;
        }
        static set biru(value) {
            Basik.G._biru = value;
        }
        static get alpha() {
            return Basik.G._transparan;
        }
        static set alpha(value) {
            Basik.G._transparan = value;
        }
    }
    Basik.Graphic = Graphic;
    Basik.G = Graphic;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let input;
    (function (input_1) {
        class EventHandler {
            move(input, buffer, e) {
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                input.x = pos.x;
                input.y = pos.y;
                input.key = e.button;
                if (input.isDown) {
                    input.isDrag = true;
                    input.xDrag = input.x - input.xStart;
                    input.yDrag = input.y - input.yStart;
                }
                try {
                    window.MouseMoveEvent();
                }
                catch (e) {
                    e;
                }
            }
            down(input, key, pos) {
                input.xStart = pos.x;
                input.yStart = pos.y;
                input.xDrag = 0;
                input.yDrag = 0;
                input.x = pos.x;
                input.y = pos.y;
                input.isDown = true;
                input.isTap = false;
                input.isDrag = false;
                input.key = key;
                input.timerStart = Date.now();
                try {
                    window.MouseDownEvent(key);
                }
                catch (e) {
                    e;
                }
            }
            up(input, key) {
                input.isDown = false;
                input.isDrag = false;
                input.timerEnd = Date.now();
                input.key = key;
                let isTap = this.checkTap(input);
                input.isTap = (isTap == '');
                if (input.isTap) {
                    try {
                        window.MouseClickEvent(input.key);
                    }
                    catch (e) {
                        e;
                    }
                }
                try {
                    window.MouseUpEvent(input.key);
                }
                catch (e) {
                    e;
                }
            }
            //check tap
            checkTap(input) {
                if (Math.abs(input.xDrag) > 5)
                    return "drag x " + input.xDrag;
                if (Math.abs(input.yDrag) > 5)
                    return "drag y " + input.xDrag;
                let timer = input.timerEnd - input.timerStart;
                if ((timer) > 500)
                    return "timer " + timer;
                return '';
            }
        }
        input_1.EventHandler = EventHandler;
    })(input || (input = {}));
    class Input {
        static _debug = false;
        static get debug() {
            return Input._debug;
        }
        static set debug(value) {
            Input._debug = value;
        }
        static _obj;
        static _evt = new input.EventHandler();
        constructor() {
        }
        static init(buffer) {
            console.log('Input init');
            Input._obj = this.buatInputDefault();
            buffer.style.touchAction = 'none';
            buffer.addEventListener("mousedown", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                let key = e.button;
                Input.event.down(Input._obj, key, pos);
                Basik.sprInt.inputDown(pos, e.button);
            });
            buffer.addEventListener("mousemove", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                Input.event.move(this.obj, buffer, e);
                Basik.sprInt.inputMove(pos, e.button);
            });
            buffer.addEventListener("mouseout", (e) => {
                e.stopPropagation();
                e.preventDefault();
                Input.event.up(Input.obj, e.button);
                Basik.Ip.daftar.forEach((img) => {
                    img.down = false;
                    img.dragged = false;
                });
                //gak ada event handler
            });
            buffer.addEventListener("mouseup", (e) => {
                e.stopPropagation();
                e.preventDefault();
                Input.event.up(this.obj, e.button);
                Basik.Ip.daftar.forEach((img) => {
                    img.down = false;
                    img.dragged = false;
                });
            });
        }
        static buatInputDefault() {
            return {
                isDown: false,
                isDrag: false,
                // isHit: false,
                isTap: false,
                key: 0,
                timerEnd: 0,
                timerStart: 0,
                // type: EInput.DEF,
                x: 0,
                xDrag: 0,
                xStart: 0,
                y: 0,
                yDrag: 0,
                yStart: 0,
            };
        }
        static getPos = (cx, cy, c) => {
            let r = c.getBoundingClientRect();
            let cSclX = parseInt(window.getComputedStyle(c).width) / c.width;
            let cSclY = parseInt(window.getComputedStyle(c).height) / c.height;
            let poslx = Math.floor((cx - r.x) / cSclX);
            let posly = Math.floor((cy - r.y) / cSclY);
            return {
                x: poslx,
                y: posly
            };
        };
        static get event() {
            return Input._evt;
        }
        static get obj() {
            return Input._obj;
        }
    }
    Basik.Input = Input;
    Basik.In = Input;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Keyboard {
        static init() {
            window.addEventListener("keydown", (e) => {
                try {
                    window.KeyDownEvent(e.key);
                }
                catch (e) {
                    e;
                }
            });
            window.addEventListener("keyup", (e) => {
                try {
                    window.KeyUpEvent(e.key);
                }
                catch (e) {
                    e;
                }
            });
        }
    }
    Basik.Keyboard = Keyboard;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    /**
     *
     */
    class Pt {
        _x;
        get x() {
            return this._x;
        }
        set x(value) {
            this._x = value;
        }
        _y;
        get y() {
            return this._y;
        }
        set y(value) {
            this._y = value;
        }
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        static create(x = 0, y = 0) {
            return new Pt(x, y);
        }
        static copy(p1, p2) {
            p2.x = p1.x;
            p2.y = p1.y;
        }
        static clone(p) {
            let h = Pt.create(p.x, p.y);
            return h;
        }
        // static sama(p1: Pt, p2: Pt): boolean {
        // 	if (false == Tf.equal(p1.x, p2.x)) return false;
        // 	if (false == Tf.equal(p1.y, p2.y)) return false;
        // 	return true;
        // }
        static putarPoros(p, xc = 0, yc = 0, deg = 0) {
            Basik.Tf.rotateRel(p.x, p.y, xc, yc, deg);
            p.x = Basik.Tf.lastX;
            p.y = Basik.Tf.lastY;
        }
    }
    Basik.Pt = Pt;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    /**
     *
     */
    class Seg {
        /**
         *
         */
        _A;
        get A() {
            return this._A;
        }
        set A(value) {
            this._A = value;
        }
        /**
         *
         */
        _B;
        get B() {
            return this._B;
        }
        set B(value) {
            this._B = value;
        }
        constructor(A = new Basik.Pt(), B = new Basik.Pt()) {
            this.A = A;
            this.B = B;
        }
        static create(v1 = new Basik.Pt(), v2 = new Basik.Pt()) {
            return new Basik.Sg(v1, v2);
        }
        static boundCollide(seg1, seg2) {
            if (Basik.Sg.maxX(seg1) < Basik.Sg.minX(seg2))
                return false;
            if (Basik.Sg.minX(seg1) > Basik.Sg.maxX(seg2))
                return false;
            if (Basik.Sg.maxY(seg1) < Basik.Sg.minY(seg2))
                return false;
            if (Basik.Sg.minY(seg1) > Basik.Sg.maxY(seg2))
                return false;
            return true;
        }
        static collide(seg1, seg2) {
            let bound = Basik.Sg.boundCollide(seg1, seg2);
            if (!bound)
                return false;
            // let deg: number = Sg.deg(seg2);
            let seg2Copy = Basik.Sg.clone(seg2);
            let seg1Copy = Basik.Sg.clone(seg1);
            let deg = Basik.Sg.deg(seg2);
            Basik.Sg.rotate(seg2Copy, -deg, seg2.A.x, seg2.A.y);
            Basik.Sg.rotate(seg1Copy, -deg, seg2.A.x, seg2.A.y);
            if (!Basik.Sg.boundCollide(seg1Copy, seg2Copy))
                return false;
            Basik.Sg.translate(seg1Copy, -seg2.A.x, -seg2.A.y);
            Basik.Sg.translate(seg2Copy, -seg2.A.x, -seg2.A.y);
            if (!Basik.Sg.crossHor(seg1Copy)) {
                return false;
            }
            let idx = Basik.Sg.xHorIdx(seg1Copy);
            let x = Basik.Sg.getXAtIdx(seg1Copy, idx);
            if (x > Basik.Sg.maxX(seg2Copy))
                return false;
            if (x < Basik.Sg.minX(seg2Copy))
                return false;
            return true;
        }
        static copy(seg1, seg2) {
            Basik.Pt.copy(seg1.A, seg2.B);
            Basik.Pt.copy(seg1.B, seg2.B);
        }
        static clone(seg) {
            return new Seg(Basik.Pt.clone(seg.A), Basik.Pt.clone(seg.B));
        }
        static crossHor(seg) {
            if (Basik.Sg.maxY(seg) > 0) {
                if (Basik.Sg.minY(seg) < 0) {
                    return true;
                }
            }
            return false;
        }
        static deg(line) {
            let j = line.B.y - line.A.y;
            let i = line.B.x - line.A.x;
            return Basik.Tf.sudut(i, j);
        }
        static getXAtIdx(seg, idx) {
            return seg.A.x + (idx * Basik.Sg.vecI(seg));
        }
        // static getYAtIdx(seg: Seg, idx: number): number {
        // 	return seg.A.y + (idx * Sg.vecJ(seg));
        // }
        static vecI(seg) {
            return seg.B.x - seg.A.x;
        }
        // static vecJ(seg: Seg): number {
        // 	return seg.B.y - seg.A.y;
        // }
        static rotate(seg, deg = 0, xc = 0, yc = 0) {
            Basik.Pt.putarPoros(seg.A, xc, yc, deg);
            Basik.Pt.putarPoros(seg.B, xc, yc, deg);
        }
        static minX(seg) {
            return Math.min(seg.A.x, seg.B.x);
        }
        static maxX(seg) {
            return Math.max(seg.A.x, seg.B.x);
        }
        static minY(seg) {
            return Math.min(seg.A.y, seg.B.y);
        }
        static maxY(seg) {
            return Math.max(seg.A.y, seg.B.y);
        }
        static translate(seg, x = 0, y = 0) {
            seg.A.x += x;
            seg.A.y += y;
            seg.B.x += x;
            seg.B.y += y;
        }
        static xHorIdx(seg) {
            if (!Seg.crossHor(seg))
                return NaN;
            let idx = 0;
            idx = (0 - seg.A.y) / (seg.B.y - seg.A.y);
            return idx;
        }
    }
    Basik.Seg = Seg;
    Basik.Sg = Seg;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    // internal class untuk menghandle geometri 
    // Kotak
    class Ktk {
        vs = [];
        segs = [];
        constructor() {
        }
        static buat(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
            let r = new Ktk();
            r.vs.push(Basik.Pt.create(x1, y1));
            r.vs.push(Basik.Pt.create(x2, y1));
            r.vs.push(Basik.Pt.create(x2, y2));
            r.vs.push(Basik.Pt.create(x1, y2));
            r.segs.push(Basik.Seg.create(r.vs[0], r.vs[1]));
            r.segs.push(Basik.Seg.create(r.vs[1], r.vs[2]));
            r.segs.push(Basik.Seg.create(r.vs[2], r.vs[3]));
            r.segs.push(Basik.Seg.create(r.vs[3], r.vs[0]));
            return r;
        }
        static copy(r) {
            // console.log('copy:');
            // console.log(r.vs);
            // let hasil: IRect = Rect.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
            let hasil = Ktk.buat();
            Ktk.copyInfo(r, hasil);
            // console.log(hasil.vs);
            return hasil;
        }
        static copyInfo(r1, r2) {
            for (let i = 0; i < r1.segs.length; i++) {
                Basik.Seg.copy(r1.segs[i], r2.segs[i]);
            }
        }
        static collideBound(r1, r2) {
            // console.debug('collide bound');
            if (Ktk.maxX(r1) < Ktk.minX(r2)) {
                // console.debug('maxX gagal');
                return false;
            }
            // console.log('maxx ' + Rect.maxX(r1));
            // console.log('minx ' + Rect.minX(r2));
            if (Ktk.minX(r1) > Ktk.maxX(r2)) {
                // console.debug('min x gagal');
                return false;
            }
            if (Ktk.maxY(r1) < Ktk.minY(r2)) {
                // console.debug('max y gagal');
                return false;
            }
            if (Ktk.minY(r1) > Ktk.maxY(r2)) {
                // console.debug('min y gagal');
                return false;
            }
            return true;
        }
        static collide(r1, r2) {
            let bound = Ktk.collideBound(r1, r2);
            if (!bound)
                return false;
            for (let i = 0; i < r1.segs.length; i++) {
                for (let j = 0; j < r2.segs.length; j++) {
                    if (Basik.Seg.collide(r1.segs[i], r2.segs[j])) {
                        return true;
                    }
                }
            }
            return false;
        }
        static collideDotBound(r, d) {
            if (d.x < Ktk.minX(r)) {
                // console.log('minx failed');
                return false;
            }
            if (d.x > Ktk.maxX(r)) {
                // console.log('maxX failed');
                // console.log(d);
                // console.log(Rect.maxX(r));
                // console.log(r.vs);
                return false;
            }
            if (d.y < Ktk.minY(r)) {
                // console.log('minY failed');
                return false;
            }
            if (d.y > Ktk.maxY(r)) {
                // console.log('maxY failed');
                return false;
            }
            return true;
        }
        static collideDot(r, x, y) {
            let r2 = Ktk.copy(r);
            let p = Basik.Pt.create(x, y);
            let d = Basik.Seg.deg(r2.segs[0]);
            let pRot = r2.vs[0];
            if (!Ktk.collideDotBound(r, p)) {
                return false;
            }
            Ktk.rotate(r2, -d, pRot.x, pRot.y, false);
            Basik.Pt.putarPoros(p, pRot.x, pRot.y, -d);
            if (!Ktk.collideDotBound(r2, p)) {
                // console.log('collide bound 2 failed');
                // console.log('deg ' + d);
                // console.log('rect');
                // console.log(r2);
                return false;
            }
            return true;
        }
        static minX(r) {
            let x = r.vs[0].x;
            r.vs.forEach((item) => {
                if (item.x < x)
                    x = item.x;
            });
            return x;
        }
        static maxX(r) {
            let x = r.vs[0].x;
            r.vs.forEach((item) => {
                if (item.x > x)
                    x = item.x;
            });
            return x;
        }
        static minY(r) {
            let y = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y < y)
                    y = item.y;
            });
            return y;
        }
        static maxY(r) {
            let y = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y > y)
                    y = item.y;
            });
            return y;
        }
        static translate(rect, x, y) {
            rect.vs.forEach((v) => {
                v.x += x;
                v.y += y;
            });
        }
        static rotate(r, deg, xc = 0, yc, copy = true) {
            let r2;
            if (copy) {
                r2 = Ktk.copy(r);
            }
            else {
                r2 = r;
            }
            r2.vs.forEach((p) => {
                Basik.Pt.putarPoros(p, xc, yc, deg);
            });
            return r2;
        }
    }
    Basik.Ktk = Ktk;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Transform {
        static RAD2DEG = 180.0 / Math.PI;
        static DEG2RAD = Math.PI / 180.0;
        static _lastX = 0;
        static _lastY = 0;
        static get lastX() {
            return Basik.Tf._lastX;
        }
        static get lastY() {
            return Basik.Tf._lastY;
        }
        // static equal(n1: number, n2: number, toleransi: number = 1): boolean {
        // 	if (Math.abs(n1 - n2) <= toleransi) return true;
        // 	return false;
        // }
        static quadDeg2(x, y, deg) {
            if (x == 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x > 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x < 0) {
                if (y == 0) {
                    return 180;
                }
                else if (y > 0) {
                    return 180 - Math.abs(deg);
                }
                else if (y < 0) {
                    return 180 + Math.abs(deg);
                }
            }
            throw Error();
        }
        /**
         * Menghitung sudut dari posisi relative ke posisi 0,0
         * @param x posisi x
         * @param y posisi y
         * @returns sudut relative ke posisi 0,0
         */
        static sudut(x, y) {
            let l;
            let sin;
            l = Math.sqrt(x * x + y * y);
            if (l == 0) {
                l = .00001;
            }
            sin = y / l;
            sin = Math.asin(sin);
            sin *= Basik.Tf.RAD2DEG;
            sin = Basik.Tf.quadDeg2(x, y, sin);
            sin = Basik.Tf.normalizeDeg(sin);
            return sin;
        }
        static normalizeDeg(deg) {
            while (deg >= 360) {
                deg -= 360;
            }
            while (deg <= -360) {
                deg += 360;
            }
            if (deg < 0)
                deg = 360 + deg;
            return deg;
        }
        static degDist(angleS = 0, angleT, min = true) {
            if (min) {
                return Transform.degDistMin(angleS, angleT);
            }
            else {
                return Transform.degDistMax(angleS, angleT);
            }
        }
        static degDistMax(angleS = 0, angleT) {
            angleS = Basik.Tf.normalizeDeg(angleS);
            angleT = Basik.Tf.normalizeDeg(angleT);
            let deg = Basik.Tf.degDistMin(angleS, angleT);
            if (deg >= 0) {
                return -(360 - deg);
            }
            else {
                return (360 - Math.abs(deg));
            }
        }
        static degDistMin(angleS = 0, angleT) {
            angleS = Basik.Tf.normalizeDeg(angleS);
            angleT = Basik.Tf.normalizeDeg(angleT);
            if (angleT >= angleS) {
                if (angleT - angleS > 180) {
                    return -(angleS + 360 - angleT);
                }
                else {
                    return angleT - angleS;
                }
            }
            else {
                if (angleS - angleT >= 180) {
                    return 360 + angleT - angleS;
                }
                else {
                    return angleT - angleS;
                }
            }
        }
        // static jarak(x: number, y: number, xt: number, yt: number): number {
        // 	let pjx: number = xt - x;
        // 	let pjy: number = yt - y;
        // 	return Math.sqrt(pjx * pjx + pjy * pjy);
        // }
        static rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
            let xr = x - xt;
            let yr = y - yt;
            let x1;
            let y1;
            deg *= Basik.Tf.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            Basik.Tf._lastX = x1 + xt;
            Basik.Tf._lastY = y1 + yt;
        }
    }
    Basik.Transform = Transform;
    Basik.Tf = Transform;
})(Basik || (Basik = {}));
///<reference path="./Point.ts"/>
///<reference path="./Segment.ts"/>
///<reference path="./Rect.ts"/>
///<reference path="./Transform.ts"/>
var Basik;
(function (Basik) {
    class ImgImpl {
        static props = [];
        static daftar = [];
        static CreateImage(width, height) {
            let h = new Basik.ImgObj();
            h.canvas = document.createElement('canvas');
            h.canvas.width = width;
            h.canvas.height = height;
            h.ctx = h.canvas.getContext('2d');
            h.frameH = height;
            h.frameW = width;
            h.panjangDiSet = true;
            h.lebarDiSet = true;
            h.load = true;
            h.img = document.createElement('img');
            Basik.Ip.register(h, h.url, h.tipeDrag);
            return h;
        }
        static MuatAnimasi(url, pf, lf, tipeDrag = 0) {
            let img = Basik.Ip.muatAnimAsync(url, pf, lf);
            return Basik.Ip.register(img, url, tipeDrag);
        }
        static GambarSemua() {
            for (let i = 0; i < Basik.Ip.daftar.length; i++) {
                let item = Basik.Ip.daftar[i];
                Basik.Ip.Draw(item, item.x, item.y);
            }
        }
        static muatAnimasiAsyncKanvas(url, pf, lf, canvas, tipeDrag) {
            let img = Basik.Ip.muatAnimAsyncCanvas(url, pf, lf, canvas);
            return Basik.Ip.register(img, url, tipeDrag);
        }
        static muatAsyncBerbagiKanvas(url, canvas, tipeDrag, onload) {
            let img = Basik.Ip.muatAsyncKanvas(url, canvas, onload);
            return Basik.Ip.register(img, url, tipeDrag);
        }
        static register(image, url, tipeDrag) {
            let hasil;
            hasil = image;
            hasil.tipeDrag = tipeDrag;
            hasil.url = url;
            if (hasil.dragable) {
                if (hasil.tipeDrag == 0) {
                    hasil.tipeDrag = 1;
                }
            }
            Basik.Ip.daftar.push(hasil);
            return hasil;
        }
        static Muat(url, tipeDrag = 0, onload) {
            if (!onload)
                onload = () => { };
            let img = Basik.Ip.muatAsync(url, onload);
            let spr = Basik.Ip.register(img, url, tipeDrag);
            return spr;
        }
        static tabrakan(gbr1, x1, y1, gbr2, x2, y2) {
            Basik.Ip.resetRect(gbr1);
            Basik.Ip.rectToImageTf(gbr1, x1, y1);
            Basik.Ip.resetRect(gbr2);
            Basik.Ip.rectToImageTf(gbr2, x2, y2);
            return Basik.Ktk.collide(gbr1.rect, gbr2.rect);
        }
        ;
        static dotInsideImage(gbr1, x1, y1, x2, y2) {
            Basik.Ip.resetRect(gbr1);
            Basik.Ip.rectToImageTf(gbr1, x1, y1);
            return Basik.Ktk.collideDot(gbr1.rect, x2, y2);
        }
        ;
        static muatAnimAsync(url, fw, fh) {
            let canvas = document.createElement('canvas');
            return Basik.Ip.muatAnimAsyncCanvas(url, fw, fh, canvas);
        }
        static muatAnimAsyncCanvas(url, fw, fh, canvas) {
            let img = document.createElement('img'); //;
            let ctx = canvas.getContext('2d');
            let rect;
            rect = Basik.Ktk.buat(0, 0, fw, fh);
            let gbr = new Basik.ImgObj();
            gbr.isAnim = true;
            gbr.img = img;
            gbr.panjang = img.naturalWidth;
            gbr.lebar = img.naturalHeight;
            gbr.frameH = fh;
            gbr.frameW = fw;
            gbr.isAnim = true;
            gbr.handleX = 0;
            gbr.handleY = 0;
            gbr.rotasi = 0;
            gbr.alpha = 100;
            gbr.ctx = ctx;
            gbr.canvas = canvas;
            gbr.rect = rect;
            gbr.load = false;
            gbr.panjangDiSet = false;
            gbr.lebarDiSet = false;
            // let gbr: IGambar = {
            // 	img: img,
            // 	panjang: img.naturalWidth,
            // 	lebar: img.naturalHeight,
            // 	frameH: fh,
            // 	frameW: fw,
            // 	isAnim: true,
            // 	handleX: 0,
            // 	handleY: 0,
            // 	rotasi: 0,
            // 	alpha: 1,
            // 	ctx: ctx,
            // 	canvas: canvas,
            // 	rect: rect,
            // 	load: false,
            // 	panjangDiSet: false,
            // 	lebarDiSet: false
            // }
            img.onload = () => {
                imgOnLoad(img);
            };
            img.onerror = () => {
                console.warn('gagal load image, url ' + url);
            };
            let img2 = ha.be.cache.getGbr(url);
            if (img2) {
                imgOnLoad(img2);
            }
            else {
                img.src = url;
            }
            function imgOnLoad(img) {
                // console.log('img anim load ' + url);
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                gbr.load = true;
                if (!gbr.panjangDiSet) {
                    gbr.panjang = fw;
                    gbr.panjangDiSet = true;
                }
                if (!gbr.lebarDiSet) {
                    gbr.lebarDiSet = true;
                    gbr.lebar = fh;
                }
                ha.be.cache.setFile(url, img);
            }
            return gbr;
        }
        static muatAsync(url, onload) {
            let kanvas = document.createElement('canvas');
            return Basik.Ip.muatAsyncKanvas(url, kanvas, onload);
        }
        static def(img, ctx, canvas) {
            let rect;
            rect = Basik.Ktk.buat(0, 0, img.naturalWidth, img.naturalHeight);
            let gbr;
            gbr = new Basik.ImgObj();
            gbr.img = img;
            gbr.panjang = img.naturalWidth;
            gbr.lebar = img.naturalHeight;
            gbr.panjangDiSet = false;
            gbr.lebarDiSet = false;
            gbr.frameH = img.naturalHeight;
            gbr.frameW = img.naturalWidth;
            gbr.isAnim = false;
            gbr.handleX = 0;
            gbr.handleY = 0;
            gbr.rotasi = 0;
            gbr.alpha = 100;
            gbr.ctx = ctx;
            gbr.canvas = canvas;
            gbr.rect = rect;
            gbr.load = false;
            gbr.ctrIdx = 0;
            return gbr;
        }
        static muatAsyncKanvas(url, canvas, onload) {
            let img = document.createElement('img');
            let ctx = canvas.getContext('2d');
            let gbr;
            gbr = new Basik.ImgObj();
            gbr = Basik.Ip.def(img, ctx, canvas);
            img.onload = () => {
                onload();
                imgOnLoad(img);
            };
            img.onerror = () => {
                console.warn('gagal load image, url ' + url);
                imgOnLoadDefault();
            };
            let img2 = ha.be.cache.getGbr(url);
            if (img2) {
                imgOnLoad(img2);
            }
            else {
                img.src = url;
            }
            function imgOnLoad(imgP) {
                canvas.width = imgP.naturalWidth;
                canvas.height = imgP.naturalHeight;
                ctx.drawImage(imgP, 0, 0);
                gbr.rect = Basik.Ktk.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);
                gbr.load = true;
                gbr.img = imgP;
                if (!gbr.panjangDiSet) {
                    gbr.panjangDiSet = true;
                    gbr.panjang = imgP.naturalWidth;
                }
                if (!gbr.lebarDiSet) {
                    gbr.lebar = imgP.naturalHeight;
                    gbr.lebarDiSet = true;
                }
                gbr.frameH = imgP.naturalHeight;
                gbr.frameW = imgP.naturalWidth;
                ha.be.cache.setFile(url, imgP);
            }
            function imgOnLoadDefault() {
                console.log("img on load default");
                canvas.width = 32;
                canvas.height = 32;
                // ctx = canvas.getContext('2d');
                gbr.img = document.createElement('img');
                // ctx.drawImage(gbr.img, 0, 0);
                gbr.rect = Basik.Ktk.buat(0, 0, 32, 32);
                ctx.fillStyle = 'rgba(255, 255, 255, 100)';
                ctx.strokeStyle = 'rgba(255, 0, 0, 100)';
                ctx.beginPath();
                ctx.rect(0, 0, 32, 32);
                ctx.moveTo(0, 0);
                ctx.lineTo(31, 31);
                ctx.moveTo(0, 31);
                ctx.lineTo(31, 0);
                ctx.stroke();
                // ctx.setf
                // ctx.fillRect(0, 0, 32, 32);
                gbr.load = true;
                if (!gbr.panjangDiSet) {
                    gbr.panjangDiSet = true;
                    gbr.panjang = 32;
                }
                if (!gbr.lebarDiSet) {
                    gbr.lebar = 32;
                    gbr.lebarDiSet = true;
                }
                gbr.frameH = 32;
                gbr.frameW = 32;
                ha.be.cache.setFile(url, gbr.img);
            }
            console.log(gbr);
            return gbr;
        }
        static gambarUbin(gbr, x = 0, y = 0, frame = 0) {
            let jmlH = 0;
            let jmlV = 0;
            if (gbr.load == false)
                return;
            let w2 = Math.floor(gbr.panjang);
            let h2 = Math.floor(gbr.lebar);
            while (x < 0) {
                x += w2;
            }
            while (x > 0) {
                x -= w2;
            }
            //posisi gambar dimulai dari sebelum titik 0,0
            while (y < 0) {
                y += h2;
            }
            while (y > 0) {
                y -= h2;
            }
            x -= w2;
            y -= h2;
            frame = Math.floor(frame);
            jmlH = Math.ceil((Basik.G.canvas.width + Math.abs(x)) / w2);
            jmlV = Math.ceil((Basik.G.canvas.height + Math.abs(y)) / h2);
            for (let i = 0; i < jmlH; i++) {
                for (let j = 0; j < jmlV; j++) {
                    Basik.Ip.DrawSingle(gbr, x + (i * w2), y + (j * h2), frame);
                }
            }
        }
        static AmbilPiksel(x = 0, y = 0) {
            try {
                let data = Basik.G.context.getImageData(x, y, 1, 1).data;
                let hasil = [];
                hasil.push(data[0]);
                hasil.push(data[1]);
                hasil.push(data[2]);
                hasil.push(data[3]);
                Basik.G.red = data[0];
                Basik.G.hijau = data[1];
                Basik.G.biru = data[2];
                Basik.G.alpha = data[3];
                // G.FillColor(G.merah, G.hijau, G.biru, G.alpha);
            }
            catch (e) {
                // console.error(e);
            }
            // return [0, 0, 0];
        }
        static SetPiksel(x = 0, y = 0) {
            Basik.G.context.fillRect(Math.floor(x), Math.floor(y), 1, 1);
        }
        static Draw(gbr, x = 0, y = 0, frame = 0) {
            if (gbr.tilable) {
                Basik.Ip.gambarUbin(gbr, x, y, frame);
            }
            else {
                Basik.Ip.DrawSingle(gbr, x, y, frame);
            }
        }
        static DrawSingle(gbr, x = 0, y = 0, frame = 0) {
            let ctx = Basik.G.context;
            let jmlH = 0;
            // let jmlV: number = 0;
            let frameX = 0;
            let frameY = 0;
            // let rect: IRect = img.rect;
            if (gbr.load == false)
                return;
            gbr.ctrIdx = Basik.ImgObj.ctrDraw++;
            frame = Math.floor(frame);
            jmlH = Math.floor(gbr.img.naturalWidth / gbr.frameW);
            // jmlV = Math.floor(gbr.img.naturalHeight / gbr.frameH);
            // console.log('jmlH ' + jmlH);
            // console.log('nw: ' + gbr.img.naturalWidth);
            // console.log('fw: ' + gbr.frameW);
            // debugger;
            frameX = (frame % jmlH);
            frameY = Math.floor(frame / jmlH);
            frameX *= gbr.frameW;
            frameY *= gbr.frameH;
            frameX = Math.floor(frameX);
            frameY = Math.floor(frameY);
            let x2 = Math.floor(x);
            let y2 = Math.floor(y);
            let w2 = Math.floor(gbr.panjang);
            let h2 = Math.floor(gbr.lebar);
            x2 -= (gbr.handleX);
            y2 -= (gbr.handleY);
            if (gbr.rotasi != 0) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(gbr.rotasi * (Math.PI / 180));
                // ctx.globalAlpha = gbr.alpha / 100;
                // ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, -gbr.handleX, -gbr.handleY, w2, h2);
                drawImpl(-gbr.handleX, -gbr.handleY);
                ctx.restore();
            }
            else {
                ctx.save();
                // ctx.globalAlpha = gbr.alpha / 100;
                // ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, x2, y2, w2, h2);
                drawImpl(x2, y2);
                ctx.restore();
            }
            function drawImpl(dx, dy) {
                ctx.globalAlpha = gbr.alpha / 100;
                ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, Math.floor(dx), Math.floor(dy), w2, h2);
                console.group('draw image');
                console.log("x:", x, "y:", y, "x2:", x2, "y2:", y2);
                console.groupEnd();
            }
            // debugger;
        }
        // static ukuran(gbr: ImgObj, w: number = 32, h: number = 32): void {
        // 	gbr.panjang = w;
        // 	gbr.lebar = h;
        // 	gbr.panjangDiSet = true;
        // 	gbr.lebarDiSet = true;
        // }
        static resetRect(img) {
            let rect = img.rect;
            let p;
            p = rect.vs[0];
            p.x = 0;
            p.y = 0;
            p = rect.vs[1];
            p.x = img.frameW;
            p.y = 0;
            p = rect.vs[2];
            p.x = img.frameW;
            p.y = img.frameH;
            p = rect.vs[3];
            p.x = 0;
            p.y = img.frameH;
        }
        static rectToImageTf(image, x, y) {
            let rect = image.rect;
            let p;
            let x2 = image.panjang;
            let y2 = image.lebar;
            //scale
            p = rect.vs[1];
            p.x = x2;
            p.y = 0;
            p = rect.vs[2];
            p.x = x2;
            p.y = y2;
            p = rect.vs[3];
            p.x = 0;
            p.y = y2;
            //translate
            Basik.Ktk.translate(rect, x, y);
            Basik.Ktk.translate(rect, -image.handleX, -image.handleY);
            //rotate
            Basik.Ktk.rotate(rect, image.rotasi, x, y, false);
        }
        static AllImageLoaded() {
            for (let i = 0; i < Basik.Ip.daftar.length; i++) {
                let img = Basik.Ip.daftar[i];
                if (!img.load)
                    return false;
            }
            return true;
        }
    }
    Basik.ImgImpl = ImgImpl;
    Basik.Ip = ImgImpl;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    /**
     *
     */
    class ImgObj {
        static _ctrDraw = 0;
        _url;
        //image
        img;
        canvas;
        ctx;
        isAnim = false;
        rect = new Basik.Ktk();
        load = false;
        ratioX = 1;
        ratioY = 1;
        _panjangDiSet = false;
        _lebarDiSet = false;
        _ctrIdx = 0;
        _x = 0;
        _y = 0;
        _alpha = 100;
        _frameW = 32;
        _frameH = 32;
        _handleX = 0;
        _handleY = 0;
        _rotasi = 0;
        _panjang = 0;
        _lebar = 0;
        _tilable = false;
        //interaktif even
        _dragged = false;
        _down = false;
        // private _dragable: boolean = false;
        _tipeDrag = 0;
        //internal interatif
        _dragStartY = 0;
        _dragStartX = 0;
        _sudutTekanAwal = 0;
        _button;
        _sudutAwal = 0;
        get tilable() {
            return this._tilable;
        }
        set tilable(value) {
            this._tilable = value;
        }
        get sudutAwal() {
            return this._sudutAwal;
        }
        set sudutAwal(value) {
            this._sudutAwal = value;
        }
        get frameW() {
            return this._frameW;
        }
        set frameW(value) {
            this._frameW = value;
        }
        get frameH() {
            return this._frameH;
        }
        set frameH(value) {
            this._frameH = value;
        }
        get x() {
            return this._x;
        }
        set x(value) {
            this._x = value;
        }
        get y() {
            return this._y;
        }
        set y(value) {
            this._y = value;
        }
        get alpha() {
            return this._alpha;
        }
        set alpha(value) {
            this._alpha = value;
        }
        get handleY() {
            return this._handleY;
        }
        set handleY(value) {
            this._handleY = value;
        }
        get handleX() {
            return this._handleX;
        }
        set handleX(value) {
            this._handleX = value;
        }
        get panjang() {
            return this._panjang;
        }
        set panjang(value) {
            this._panjang = value;
            this._panjangDiSet = true;
        }
        get lebar() {
            return this._lebar;
        }
        set lebar(value) {
            this._lebar = value;
            this._lebarDiSet = true;
        }
        get panjangDiSet() {
            return this._panjangDiSet;
        }
        set panjangDiSet(value) {
            this._panjangDiSet = value;
        }
        get lebarDiSet() {
            return this._lebarDiSet;
        }
        set lebarDiSet(value) {
            this._lebarDiSet = value;
        }
        get ctrIdx() {
            return this._ctrIdx;
        }
        set ctrIdx(value) {
            this._ctrIdx = value;
        }
        get rotasi() {
            return this._rotasi;
        }
        set rotasi(value) {
            this._rotasi = value;
        }
        constructor() {
        }
        get drgStartX() {
            return this._dragStartX;
        }
        set drgStartX(value) {
            this._dragStartX = value;
        }
        get drgStartY() {
            return this._dragStartY;
        }
        set drgStartY(value) {
            this._dragStartY = value;
        }
        get dragged() {
            return this._dragged;
        }
        set dragged(value) {
            this._dragged = value;
        }
        get down() {
            return this._down;
        }
        set down(value) {
            this._down = value;
        }
        get dragable() {
            return this._tipeDrag > 0 ? true : false;
        }
        get sudutTekanAwal() {
            return this._sudutTekanAwal;
        }
        set sudutTekanAwal(value) {
            this._sudutTekanAwal = value;
        }
        get tipeDrag() {
            return this._tipeDrag;
        }
        set tipeDrag(value) {
            this._tipeDrag = value;
        }
        get url() {
            return this._url;
        }
        set url(value) {
            this._url = value;
        }
        static get ctrDraw() {
            return ImgObj._ctrDraw;
        }
        static set ctrDraw(value) {
            ImgObj._ctrDraw = value;
        }
        get button() {
            return this._button;
        }
        set button(value) {
            this._button = value;
        }
    }
    Basik.ImgObj = ImgObj;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let TypeDrag;
    (function (TypeDrag) {
        TypeDrag[TypeDrag["drag"] = 1] = "drag";
        TypeDrag[TypeDrag["rotasi"] = 2] = "rotasi";
    })(TypeDrag || (TypeDrag = {}));
    //Sprite interactivity
    class SprInt {
        spriteDown(img, pos, id) {
            img.down = true;
            img.drgStartX = pos.x - img.x;
            img.drgStartY = pos.y - img.y;
            img.button = id;
            img.sudutTekanAwal = Basik.Tf.sudut(pos.x - img.x, pos.y - img.y);
            img.sudutAwal = img.rotasi;
            // console.group('sprite down event handler');
            // console.log("sudut tekan awal", s.sudutTekanAwal);
            // console.log("sudut awal", s.sudutAwal);
            // console.groupEnd();
        }
        inputDown(pos, button) {
            console.group('input down');
            let lastIdx = -1;
            let lastSprite = null;
            for (let i = Basik.Ip.daftar.length - 1; i >= 0; i--) {
                let img;
                img = Basik.Ip.daftar[i];
                if (Basik.Ip.dotInsideImage(img, img.x, img.y, pos.x, pos.y)) {
                    if (img.ctrIdx > lastIdx) {
                        lastIdx = img.ctrIdx;
                        lastSprite = img;
                    }
                }
                else {
                    if (img.tipeDrag == 3 || img.tipeDrag == 4) {
                        this.spriteDown(img, pos, button);
                    }
                }
            }
            //
            if (lastSprite) {
                this.spriteDown(lastSprite, pos, button);
            }
            //
            console.groupEnd();
        }
        inputMove(pos, button) {
            Basik.Ip.daftar.forEach((item) => {
                if (item.down && item.dragable && (item.button == button)) {
                    item.dragged = true;
                    if (item.tipeDrag == TypeDrag.drag || (item.tipeDrag == 3)) {
                        item.x = pos.x - item.drgStartX;
                        item.y = pos.y - item.drgStartY;
                        // console.debug('item drag move');
                    }
                    else if (item.tipeDrag == TypeDrag.rotasi || (item.tipeDrag == 4)) {
                        let sudut2 = Basik.Tf.sudut(pos.x - item.x, pos.y - item.y);
                        let perbedaan = sudut2 - item.sudutTekanAwal;
                        item.rotasi = item.sudutAwal + perbedaan;
                        // console.group();
                        // console.log("sudut", sudut2);
                        // console.log("beda", perbedaan);
                        // console.log("sudut tekan awal", item.sudutTekanAwal);
                        // console.log("sudut awal", item.sudutAwal);
                        // console.log("rotasi", item.rotasi);
                        // console.log("posisi", item.x, item.y);
                        // console.groupEnd();
                    }
                    else {
                    }
                }
            });
        }
    }
    Basik.sprInt = new SprInt();
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Teks {
        static _name = 'Arial';
        static _size = 12;
        static _x = 120;
        static _y = 10;
        static get size() {
            return Teks._size;
        }
        static set size(value) {
            Teks._size = value;
        }
        static Goto(x, y) {
            Teks._x = x;
            Teks._y = y;
        }
        static Name(name = 'cursive') {
            Teks._name = name;
        }
        static Size(n = 12) {
            Teks.size = n;
        }
        static Write(teks) {
            Basik.G.context.font = Teks.size + 'px ' + Teks._name;
            Basik.G.context.fillText(teks, Teks._x, Teks._y);
            Basik.G.context.strokeText(teks, Teks._x, Teks._y);
        }
    }
    Basik.Teks = Teks;
    Basik.Tk = Teks;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Sound {
        static list = [];
        static _lastSound;
        _src = '';
        _loaded = false;
        _sound;
        _playedCount;
        static get lastSound() {
            return Sound._lastSound;
        }
        static set lastSound(value) {
            Sound._lastSound = value;
        }
        get playedCount() {
            return this._playedCount;
        }
        set playedCount(value) {
            this._playedCount = value;
        }
        get sound() {
            return this._sound;
        }
        set sound(value) {
            this._sound = value;
        }
        get loaded() {
            return this._loaded;
        }
        set loaded(value) {
            this._loaded = value;
        }
        get src() {
            return this._src;
        }
        set src(value) {
            this._src = value;
        }
    }
    Basik.Sound = Sound;
    Basik.Sn = Sound;
})(Basik || (Basik = {}));
///<reference path="./geom/Route.ts"/>
///<reference path="./spr/ImageImpl.ts"/>
///<reference path="./spr/ImageObj.ts"/>
///<reference path="./spr/Sprite2.ts"/>
///<reference path="./Input.ts"/>
///<reference path="./Teks.ts"/>
///<reference path="./Sound.ts"/>
///<reference path="./Keyboard.ts"/>
///<reference path="../Route.ts"/>
///<reference path="./Route.ts"/>
const S = Basik.Sn;
function LoadSound(url) {
    let sound = document.createElement("audio");
    let s = new S();
    s.src = url;
    s.loaded = false;
    s.sound = sound;
    sound.onload = () => {
        s.loaded = true;
    };
    sound.onended = () => {
        s.playedCount++;
        try {
            window.SoundEnded(s);
        }
        catch (e) { }
    };
    sound.src = url;
    S.list.push(s);
    return s;
}
function PlaySound(s) {
    s.sound.play();
}
function SoundLoaded(s) {
    return s.loaded;
}
///<reference path="./Route.ts"/>
const G = Basik.G;
const T = Basik.Tk;
const Ip = Basik.Ip;
const In = Basik.In;
/**
 * return the main buffer/the context of canvas.
 * @returns {CanvasRenderingContext2D} - the active buffer
 */
function MainBuffer() {
    return G.mainCtx;
}
/**
 * Set the active buffer. Usefull if you want to change the buffer.
 *
 * @param buff {CanvasRenderingContext2D} - the new active buffer
 */
function SetBuffer(buff) {
    G.context = buff;
}
/**
 * Clear part of the canvas
 * @param x {number} - the start x position
 * @param y {number} - the start y position
 * @param w {number} - the width of the area
 * @param h {number} - the height of the area
 */
function ClearArea(x, y, w, h) {
    G.context.clearRect(x, y, w, h);
}
/**
 * Start the application. You have to call this method before other method.
 * @param w {number} - prefered width of the canvas.
 * @param h {number}- prefered height of the canvas.
 * @param canvas {HTMLCanvasElement} - (optional) the canvas element.
 *   If canvas is not available, a new one will be created and the size will follow the preferred size
 * @param fullScreen {boolean} - (default to true) Use full screen
 * When in full screen mode, the canvas will automatically fill the screen and maintain the aspect ratio.
 *
 */
function Graphics(w = 320, h = 240, canvas = null, fullScreen = true) {
    G.Graphics(w, h, canvas, fullScreen);
}
/**
 * Clear the canvas
 */
function Cls() {
    G.Cls();
}
/**
 * Return the green color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} - the green color
 */
function Green() {
    return G.hijau;
}
/**
 * Return the red color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} - the red color
 */
function Red() {
    return G.red;
}
/**
 * Return the blue color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} - the blue color
 */
function Blue() {
    return G.biru;
}
/**
 * Return the alpha color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} - the alpha color
 */
function Alpha() {
    return Math.floor(G.alpha * 100);
}
/**
 * Get color information at the specific area
 * You can get the red, green, blue, alpha component of the color by calling Red(), Green(), Blue(), Alpha() function respectively
 * @param x {number} - the x position
 * @param y {number} - the y position
 */
function GetPixel(x = 0, y = 0) {
    Ip.AmbilPiksel(x, y);
}
/**
 * Set pixel using the color set by FillColor()
 * @param x {number} - the x position
 * @param y {number} - the y position
 */
function SetPiksel(x = 0, y = 0) {
    Ip.SetPiksel(x, y);
}
/**
 * Set fill-color for the next graphics command
 * @param r {number} - the red color
 * @param g {number} - the green color
 * @param b {number} - the blue color
 * @param a {number} - the alpha color
 */
function FillColor(r = 0, g = 0, b = 0, a = 1) {
    G.context.fillStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
    G.red = r;
    G.hijau = g;
    G.biru = b;
    G.alpha = a;
}
function NoColor() {
    G.context.fillStyle = "none";
}
function StrokeColor(r = 0, g = 0, b = 0, a = 1) {
    G.context.strokeStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
    G.red = r;
    G.hijau = g;
    G.biru = b;
    G.alpha = a;
}
function NoStroke() {
    G.context.strokeStyle = 'none';
}
///<reference path="./Route.ts"/>
/**
 * Mouse Function
 */
/**
 * mengecek apakah pointer sedang ditekan
 * @returns (boolean)
 */
function MouseIsDown() {
    return In.obj.isDown;
}
/**
 * mengecheck apakah pointer sedang di drag
 * @returns (boolean)
 */
function MouseIsDragged() {
    return In.obj.isDrag;
}
/**
 * berapa jauh pointer digeser sejajar sumbu x
 * @returns (number)
 */
function MouseDragXAmount() {
    return In.obj.xDrag;
}
/**
 * berapa jauh pointer di drag sejajar sumbu y
 * @returns (number)
 */
function MouseDragYAmount() {
    return In.obj.yDrag;
}
/**
 * posisi x pointer
 * @returns (number)
 */
function MouseX() {
    return In.obj.x;
}
/**
 * posisi y pointer
 * @returns
 */
function MouseY() {
    return In.obj.y;
}
/**
 * posisi x awal drag
 * @returns (number)
 *
 * */
function MouseDragStartX() {
    return In.obj.xStart;
}
/**
 * posisi y awal drag
 * @returns (number)
 */
function MouseDragStartY() {
    return In.obj.yStart;
}
///<reference path="./Route.ts"/>
const DistMin = Basik.Transform.degDist;
/**
 *
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */
function Distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
function Dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
/**
 * Menghitung sudut dari posisi relative ke posisi 0,0
 * @param x posisi x
 * @param y posisi y
 * @returns sudut relative ke posisi 0,0
 */
function Angle(x, y) {
    return Basik.Tf.sudut(x, y);
}
function Sin(n) { return Math.sin(n * Math.PI / 180); }
function Cos(n) { return Math.cos(n * Math.PI / 180); }
function Tan(n) { return Math.tan(n * Math.PI / 180); }
function Clamp(n, min, max) {
    if (n < min)
        return min;
    if (n > max)
        return max;
    return n;
}
///<reference path="./Route.ts"/>
///<reference path="./BlitzGraphics.ts"/>
//operation
const LoadImage = Ip.Muat; //
const LoadAnimImage = Ip.MuatAnimasi;
const DrawImage = Ip.Draw;
const ImageCollide = Ip.tabrakan;
const ImageCollidePoint = Ip.dotInsideImage;
const CreateImage = Ip.CreateImage;
/**
 *
 */
function DrawAllImage() {
    Ip.GambarSemua();
}
const ImageBuffer = (img) => {
    return img.ctx;
};
const AllImageLoaded = Ip.AllImageLoaded;
/**
 *
 * @param s {ISprObj} sprite
 * @param onload {() => void} optional, call back after image is copied
 * @returns
 */
function CopyImage(s, onload) {
    if (!onload) {
        onload = () => { };
    }
    if (s.isAnim) {
        console.debug('copy sprite anim');
        console.debug(s);
        return Ip.muatAnimasiAsyncKanvas(s.url, s.frameW, s.frameH, s.canvas, s.tipeDrag);
    }
    else {
        return Ip.muatAsyncBerbagiKanvas(s.url, s.canvas, s.tipeDrag, onload);
    }
}
const TextPos = Basik.Teks.Goto;
const Write = Basik.Teks.Write;
const TextFont = Basik.Teks.Name;
const TextSize = Basik.Teks.Size;
/**
 * This function will be automatically called when available and there is a mousemove event.
 * Put any logic for mouse move event here
 */
function MouseMoveEvent() {
}
/**
 * This function will be automatically called when available and there is a mousedown event.
 * Put any logic for mouse move event here
 */
function MouseDownEvent(btn) {
    btn;
}
/**
 * This function will be automatically called when available and there is a mouseup event.
 * Put any logic for mouse move event here
 */
function MouseUpEvent(btn) {
    btn;
}
/**
 * This function will be automatically called when available and there is a mouse click event.
 * Put any logic for mouse move event here
 */
function MouseClickEvent(btn) {
    btn;
}
/**
 * This function will be automatically called when available and there is a keydown event.
 * Put any logic for mouse move event here
 */
function KeyDownEvent(key) {
    key;
}
/**
 * This function will be automatically called when available and there is a keyup event.
 * Put any logic for mouse move event here
 */
function KeyUpEvent(key) {
    key;
}
