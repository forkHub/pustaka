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
var Basik;
(function (Basik) {
    class Config {
        stroke = new Stroke();
        fill = new Stroke();
    }
    class RGB {
        _m = 0;
        _g = 0;
        _b = 0;
        get b() {
            return this._b;
        }
        set b(value) {
            this._b = value;
        }
        get g() {
            return this._g;
        }
        set g(value) {
            this._g = value;
        }
        get m() {
            return this._m;
        }
        set m(value) {
            this._m = value;
        }
    }
    class Stroke {
        _tebal = 1;
        rgb = new RGB();
        _aktif = false;
        get aktif() {
            return this._aktif;
        }
        set aktif(value) {
            this._aktif = value;
        }
        get tebal() {
            return this._tebal;
        }
        set tebal(value) {
            this._tebal = value;
        }
    }
    Basik.config = new Config();
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let Data;
    (function (Data) {
        class Obj {
            _id = 0;
            _entry;
            _nama = '';
            get id() {
                return this._id;
            }
            set id(value) {
                this._id = value;
            }
            get entry() {
                return this._entry;
            }
            set entry(value) {
                this._entry = value;
            }
            get nama() {
                return this._nama;
            }
            set nama(value) {
                this._nama = value;
            }
        }
        Data.Obj = Obj;
    })(Data = Basik.Data || (Basik.Data = {}));
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class RGBA {
        color(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        _r = 0;
        get r() {
            return this._r;
        }
        set r(value) {
            this._r = value;
        }
        _g = 0;
        get g() {
            return this._g;
        }
        set g(value) {
            this._g = value;
        }
        _b = 0;
        get b() {
            return this._b;
        }
        set b(value) {
            this._b = value;
        }
        _a = 0;
        get a() {
            return this._a;
        }
        set a(value) {
            if (value > 100)
                value = 100;
            if (value > 1)
                value /= 100;
            this._a = value;
        }
    }
    Basik.RGBA = RGBA;
    class Graphic {
        static _skalaOtomatis = true;
        static get skalaOtomatis() {
            return Basik.G._skalaOtomatis;
        }
        static set skalaOtomatis(value) {
            Basik.G._skalaOtomatis = value;
        }
        static _canvas;
        static get context() {
            return Basik.G.canvas.getContext('2d');
        }
        static get canvas() {
            if (!Basik.G._canvas) {
                Basik.G._canvas = document.body.querySelector('canvas');
            }
            if (!Basik.G._canvas) {
                Basik.G._canvas = document.createElement('canvas');
                document.body.appendChild(Basik.G._canvas);
            }
            return Basik.G._canvas;
        }
        static set canvas(c) {
            Basik.G._canvas = c;
        }
        static _merah = 0;
        static _hijau = 0;
        static _biru = 0;
        static _transparan = 0;
        static Pause() {
            debugger;
        }
        static handleWindowResize() {
            if (!Basik.G._skalaOtomatis)
                return;
            let canvas = Basik.G.canvas;
            let cp = Basik.G.canvas.width;
            let cl = Basik.G.canvas.height;
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
        }
        static buatCanvas(canvasEl) {
            let canvas = new Basik.ImgObj();
            canvas.canvas = canvasEl;
            canvas.ctx = canvasEl.getContext('2d');
            canvas.lebar = canvasEl.height;
            canvas.panjang = canvasEl.width;
            canvas.frameH = canvasEl.height;
            canvas.frameW = canvasEl.width;
            canvas.rect = Basik.Ktk.buat();
            canvas.load = true;
            canvas.panjangDiSet = true;
            canvas.lebarDiSet = true;
            return canvas;
        }
        static init(p = 320, l = 240, fullScreen) {
            let canvas = Basik.G.canvas;
            canvas.width = p;
            canvas.height = l;
            if (fullScreen) {
                canvas.style.width = p + 'px';
                canvas.style.height = l + 'px';
                canvas.style.padding = '0px';
                canvas.style.margin = '0px';
            }
        }
        static get merah() {
            return Basik.G._merah;
        }
        static set merah(value) {
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
    let EInput;
    (function (EInput) {
        EInput["TOUCH"] = "touch";
        EInput["MOUSE"] = "mouse";
        EInput["KEYB"] = "keyb";
        EInput["DEF"] = "";
    })(EInput = Basik.EInput || (Basik.EInput = {}));
    class EventHandler {
        move(input, buffer, e) {
            let pos = Input.getPos(e.clientX, e.clientY, buffer);
            input.x = pos.x;
            input.y = pos.y;
            input.id = e.pointerId;
            if (input.isDown) {
                if (input.isDrag == false) {
                    input.dragJml++;
                }
                input.isDrag = true;
                input.xDrag = input.x - input.xStart;
                input.yDrag = input.y - input.yStart;
            }
        }
        down(input, key, type, pos) {
            if (!input.isDown) {
                input.hit++;
            }
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
            input.type = type;
            input.timerStart = Date.now();
        }
        up(input) {
            if (input.isDrag) {
                input.dragSelesaiJml++;
            }
            input.isDown = false;
            input.isDrag = false;
            input.timerEnd = Date.now();
            let isTap = this.checkTap(input);
            input.isTap = (isTap == '');
            if (input.isTap) {
                if (Input.debug) {
                    console.debug('tap ok');
                }
                input.tapJml++;
            }
            else {
                input.upJml++;
                if (Input.debug) {
                    console.debug('tap failed');
                    console.debug(isTap);
                }
            }
        }
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
    class Input {
        static _inputs = [];
        static _debug = false;
        static get debug() {
            return Input._debug;
        }
        static set debug(value) {
            Input._debug = value;
        }
        static _inputGlobal;
        static _evt = new EventHandler();
        constructor() {
        }
        static InputTapCount() {
            let tap = Input.global.tapJml;
            Input.global.tapJml = 0;
            return tap;
        }
        static JmlUp() {
            let up = Input.global.upJml;
            Input.global.tapJml = 0;
            return up;
        }
        static InputDragEndCount() {
            let s = Input.global.dragSelesaiJml;
            Input.global.dragSelesaiJml = 0;
            return s;
        }
        static InputType() {
            return Input.global.type;
        }
        static InputHit() {
            let hit = Input.global.hit;
            Input.global.hit = 0;
            return hit;
        }
        static InputDragStartX() {
            return Input.global.xStart;
        }
        static InputDragStartY() {
            return Input.global.yStart;
        }
        static InputX() {
            return Input.global.x;
        }
        static InputY() {
            return Input.global.y;
        }
        static InputDragX() {
            return Input.global.xDrag;
        }
        static InputDragY() {
            return Input.global.yDrag;
        }
        static FlushInput() {
            Input.flush();
        }
        static InputDragStartCount() {
            let hasil = Input.global.dragJml;
            Input.global.dragJml = 0;
            return hasil;
        }
        static InputIsDown() {
            return Input.global.isDown;
        }
        static InputIsDragged() {
            return Input.global.isDrag;
        }
        static getMouseKeyId(e) {
            if (e.pointerType == 'touch') {
                return e.pointerId + '';
            }
            else if (e.pointerType == 'mouse') {
                return e.button + '';
            }
            throw Error('');
        }
        static init(buffer) {
            console.log('input init');
            Input._inputGlobal = this.buatInputDefault();
            buffer.style.touchAction = 'none';
            buffer.addEventListener("pointerdown", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                let key = Input.getMouseKeyId(e);
                let input = Input.baru(key, e.pointerType);
                Input.event.down(input, key, e.pointerType, pos);
                Input.event.down(Input._inputGlobal, key, e.pointerType, pos);
                Basik.sprInt.inputDown(pos, e.pointerId);
                let f = window["MouseHit"];
                if (typeof f === "function")
                    f();
            });
            buffer.addEventListener("pointermove", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                let key = this.getMouseKeyId(e);
                let input = this.baru(key, e.pointerType);
                Input.event.move(input, buffer, e);
                Input.event.move(this.global, buffer, e);
                Basik.sprInt.inputMove(pos, e.pointerId);
            });
            buffer.addEventListener("pointerout", (e) => {
                e.stopPropagation();
                e.preventDefault();
            });
            buffer.addEventListener("pointercancel", (e) => {
                e.stopPropagation();
                e.preventDefault();
            });
            buffer.addEventListener("pointerup", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let key = this.getMouseKeyId(e);
                let input = this.baru(key, e.pointerType);
                Input.event.up(input);
                Input.event.up(this.global);
                Basik.Ip.daftar.forEach((item) => {
                    if (e.pointerId == item.inputId) {
                        if (item.down) {
                            item.jmlHit++;
                        }
                        item.down = false;
                        item.dragged = false;
                    }
                });
            });
        }
        static buatInputDefault() {
            return {
                id: 0,
                isDown: false,
                isDrag: false,
                isTap: false,
                key: '',
                timerEnd: 0,
                timerStart: 0,
                type: EInput.DEF,
                x: 0,
                xDrag: 0,
                xStart: 0,
                y: 0,
                yDrag: 0,
                yStart: 0,
                hit: 0,
                dragJml: 0,
                dragSelesaiJml: 0,
                tapJml: 0,
                upJml: 0
            };
        }
        static flush() {
            while (Input.inputs.length > 0) {
                Input.inputs.pop();
            }
            Input.flushByInput(Input._inputGlobal);
        }
        static flushByInput(input) {
            input.isDown = false;
            input.isDrag = false;
            input.isTap = false;
            input.hit = 0;
            input.tapJml = 0;
            input.dragJml = 0;
            input.dragSelesaiJml = 0;
        }
        static getInput(key, inputType) {
            let inputHasil;
            for (let i = 0; i < Input.inputs.length; i++) {
                let input = Input.inputs[i];
                if (input.type == inputType && input.key == key) {
                    inputHasil = input;
                    return inputHasil;
                }
            }
            return inputHasil;
        }
        static baru(keyId, inputType) {
            let input = Input.getInput(keyId, inputType);
            if (!input) {
                input = {
                    key: keyId,
                    type: inputType,
                    isDown: false,
                    isDrag: false,
                    isTap: false,
                    timerEnd: 0,
                    timerStart: 0,
                    x: 0,
                    xDrag: 0,
                    xStart: 0,
                    y: 0,
                    yDrag: 0,
                    yStart: 0,
                    id: 0,
                    hit: 0,
                    dragJml: 0,
                    dragSelesaiJml: 0,
                    tapJml: 0,
                    upJml: 0
                };
                Input.inputs.push(input);
            }
            return input;
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
        static get inputs() {
            return Input._inputs;
        }
        static get event() {
            return Input._evt;
        }
        static get global() {
            return Input._inputGlobal;
        }
    }
    Basik.Input = Input;
    Basik.In = Input;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Mat {
        static Dist(x1, y1, x2, y2) {
            return Math.hypot(x2 - x1, y2 - y1);
        }
        static Angle(x, y) {
            return Basik.Tf.sudut(x, y);
        }
        static Sin(n) { return Math.sin(n * Math.PI / 180); }
        static Cos(n) { return Math.cos(n * Math.PI / 180); }
        static Tan(n) { return Math.tan(n * Math.PI / 180); }
        static Clamp(n, min, max) {
            if (n < min)
                return min;
            if (n > max)
                return max;
            return n;
        }
    }
    Basik.Mat = Mat;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
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
        static sama(p1, p2) {
            if (false == Basik.Tf.equal(p1.x, p2.x))
                return false;
            if (false == Basik.Tf.equal(p1.y, p2.y))
                return false;
            return true;
        }
        static putarPoros(p, xc = 0, yc = 0, deg = 0) {
            Basik.Tf.rotateRel(p.x, p.y, xc, yc, deg);
            p.x = Basik.Tf.lastX;
            p.y = Basik.Tf.lastY;
        }
        static posDist(p, xt, yt, jrk) {
            let jrkA;
            let i;
            let j;
            let rasio;
            let hasil = Pt.create();
            jrkA = Basik.Tf.jarak(p.x, p.y, xt, yt);
            i = xt - p.x;
            j = yt - p.y;
            rasio = jrkA / jrk;
            hasil.x = i * rasio;
            hasil.y = j * rasio;
            hasil.x = xt - hasil.x;
            hasil.y = yt - hasil.y;
            return hasil;
        }
        static posPolar(jarak, sudut, xt, yt) {
            let hasil = Pt.create();
            hasil.x = jarak * Math.cos(sudut * Basik.Tf.DEG2RAD);
            hasil.y = jarak * Math.sin(sudut * Basik.Tf.DEG2RAD);
            hasil.x += xt;
            hasil.y += yt;
            return hasil;
        }
    }
    Basik.Pt = Pt;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Seg {
        _A;
        get A() {
            return this._A;
        }
        set A(value) {
            this._A = value;
        }
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
        static getYAtIdx(seg, idx) {
            return seg.A.y + (idx * Basik.Sg.vecJ(seg));
        }
        static vecI(seg) {
            return seg.B.x - seg.A.x;
        }
        static vecJ(seg) {
            return seg.B.y - seg.A.y;
        }
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
            let hasil = Ktk.buat();
            Ktk.copyInfo(r, hasil);
            return hasil;
        }
        static copyInfo(r1, r2) {
            for (let i = 0; i < r1.segs.length; i++) {
                Basik.Seg.copy(r1.segs[i], r2.segs[i]);
            }
        }
        static collideBound(r1, r2) {
            if (Ktk.maxX(r1) < Ktk.minX(r2)) {
                return false;
            }
            if (Ktk.minX(r1) > Ktk.maxX(r2)) {
                return false;
            }
            if (Ktk.maxY(r1) < Ktk.minY(r2)) {
                return false;
            }
            if (Ktk.minY(r1) > Ktk.maxY(r2)) {
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
                return false;
            }
            if (d.x > Ktk.maxX(r)) {
                return false;
            }
            if (d.y < Ktk.minY(r)) {
                return false;
            }
            if (d.y > Ktk.maxY(r)) {
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
        static equal(n1, n2, toleransi = 1) {
            if (Math.abs(n1 - n2) <= toleransi)
                return true;
            return false;
        }
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
        static jarak(x, y, xt, yt) {
            let pjx = xt - x;
            let pjy = yt - y;
            return Math.sqrt(pjx * pjx + pjy * pjy);
        }
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
            Basik.Ip.register(h, h.dragable, h.url, h.tipeDrag);
            return h;
        }
        static MuatAnimasi(url, pf, lf, bisaDiDrag = false, tipeDrag = 0) {
            let img = Basik.Ip.muatAnimAsync(url, pf, lf);
            return Basik.Ip.register(img, bisaDiDrag, url, tipeDrag);
        }
        static GambarSemua() {
            for (let i = 0; i < Basik.Ip.daftar.length; i++) {
                let item = Basik.Ip.daftar[i];
                Basik.Im.DrawImage(item);
            }
        }
        static Bound(s) {
            Basik.Ip.resetRect(s);
            Basik.Ip.rectToImageTf(s, s.x, s.y);
            return s.rect;
        }
        static muatAnimasiAsyncKanvas(url, pf, lf, bisaDiDrag, canvas, tipeDrag) {
            let img = Basik.Ip.muatAnimAsyncCanvas(url, pf, lf, canvas);
            return Basik.Ip.register(img, bisaDiDrag, url, tipeDrag);
        }
        static muatAsyncBerbagiKanvas(url, dragable = false, canvas, tipeDrag, onload) {
            let img = Basik.Ip.muatAsyncKanvas(url, canvas, onload);
            return Basik.Ip.register(img, dragable, url, tipeDrag);
        }
        static register(image, dragable = false, url, tipeDrag) {
            let hasil;
            hasil = image;
            hasil.dragable = dragable;
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
        static Muat(url, bisaDiDrag = false, tipeDrag = 0, onload) {
            if (!onload)
                onload = () => { };
            let img = Basik.Ip.muatAsync(url, onload);
            let spr = Basik.Ip.register(img, bisaDiDrag, url, tipeDrag);
            return spr;
        }
        static buatBagiCanvas(canvas, w = 32, h = 32, frameW = 32, frameH = 32) {
            let img;
            canvas.width = w;
            canvas.height = h;
            let rect = Basik.Ktk.buat(0, 0, frameW, frameH);
            img = new Basik.ImgObj();
            img.load = true;
            img.panjang = w;
            img.lebar = h;
            img.img = null;
            img.frameH = frameH;
            img.frameW = frameW;
            img.handleX = 0;
            img.handleY = 0;
            img.alpha = 100;
            img.isAnim = false;
            img.canvas = canvas;
            img.ctx = canvas.getContext('2d');
            img.rect = rect;
            img.load = true;
            img.panjangDiSet = true;
            img.lebarDiSet = true;
            return img;
        }
        static panjang(gbr, pj) {
            if (typeof pj == 'number') {
                gbr.panjang = pj;
                gbr.panjangDiSet = true;
            }
            return gbr.panjang;
        }
        ;
        static lebar(gbr, lb) {
            if (typeof lb == 'number') {
                gbr.lebar = lb;
                gbr.lebarDiSet = true;
            }
            return gbr.lebar;
        }
        ;
        static tabrakan(gbr1, x1, y1, gbr2, x2, y2) {
            Basik.Ip.resetRect(gbr1);
            Basik.Ip.rectToImageTf(gbr1, x1, y1);
            Basik.Ip.resetRect(gbr2);
            Basik.Ip.rectToImageTf(gbr2, x2, y2);
            return Basik.Ktk.collide(gbr1.rect, gbr2.rect);
        }
        ;
        static dotDidalamGambar(gbr1, x1, y1, x2, y2) {
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
            let img = document.createElement('img');
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
                gbr.img = document.createElement('img');
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
                    Basik.Ip.gambar(gbr, x + (i * w2), y + (j * h2), frame);
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
                Basik.G.merah = data[0];
                Basik.G.hijau = data[1];
                Basik.G.biru = data[2];
                Basik.G.alpha = data[3];
            }
            catch (e) {
            }
        }
        static SetPiksel(x = 0, y = 0) {
            Basik.G.context.fillRect(Math.floor(x), Math.floor(y), 1, 1);
        }
        static gambar(gbr, x = 0, y = 0, frame = 0) {
            let ctx = Basik.G.context;
            let jmlH = 0;
            let frameX = 0;
            let frameY = 0;
            if (gbr.load == false)
                return;
            gbr.ctrIdx = Basik.ImgObj.ctrDraw++;
            frame = Math.floor(frame);
            jmlH = Math.floor(gbr.img.naturalWidth / gbr.frameW);
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
                drawImpl(-gbr.handleX, -gbr.handleY);
                ctx.restore();
            }
            else {
                ctx.save();
                drawImpl(x2, y2);
                ctx.restore();
            }
            function drawImpl(dx, dy) {
                ctx.globalAlpha = gbr.alpha / 100;
                ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, Math.floor(dx), Math.floor(dy), w2, h2);
                console.groupEnd();
            }
        }
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
            p = rect.vs[1];
            p.x = x2;
            p.y = 0;
            p = rect.vs[2];
            p.x = x2;
            p.y = y2;
            p = rect.vs[3];
            p.x = 0;
            p.y = y2;
            Basik.Ktk.translate(rect, x, y);
            Basik.Ktk.translate(rect, -image.handleX, -image.handleY);
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
    class Img {
        static CreateImage(width, height) {
            return Basik.Ip.CreateImage(width, height);
        }
        static CopyImage(s, onload) {
            if (!onload) {
                onload = () => { };
            }
            if (s.isAnim) {
                console.debug('copy sprite anim');
                console.debug(s);
                return Basik.Ip.muatAnimasiAsyncKanvas(s.url, s.frameW, s.frameH, s.dragable, s.canvas, s.tipeDrag);
            }
            else {
                return Basik.Ip.muatAsyncBerbagiKanvas(s.url, s.dragable, s.canvas, s.tipeDrag, onload);
            }
        }
        static DrawAllImage() {
            Basik.Ip.GambarSemua();
        }
        static Collide(imgA, imgB) {
            return Basik.Ip.tabrakan(imgA, imgA.x, imgA.y, imgB, imgB.x, imgB.y);
        }
        static LoadAnimImage(url, fw, fh, dragable = false, dragType = 0) {
            return Basik.Ip.MuatAnimasi(url, fw, fh, dragable, dragType);
        }
        static LoadImage(url, dragable = false, dragType = 0) {
            return Basik.Ip.Muat(url, dragable, dragType, () => { });
        }
        static DrawImage(img, frame) {
            Basik.Ip.gambar(img, img.x, img.y, frame);
        }
        static Tile(img, x = 0, y = 0, frame = 0) {
            Basik.Ip.gambarUbin(img, x, y, frame);
        }
        static GetPixel(x = 0, y = 0) {
            Basik.Ip.AmbilPiksel(x, y);
        }
        static SetPiksel(x = 0, y = 0) {
            return Basik.Ip.AmbilPiksel(x, y);
        }
        static AllImageLoaded() {
            return Basik.Ip.AllImageLoaded();
        }
    }
    Basik.Img = Img;
    Basik.Im = Img;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class ImgObj {
        static _ctrDraw = 0;
        _url;
        listeners = [];
        executeEvent(type) {
            this.listeners.forEach((item) => {
                if (item.type === type) {
                    item.handle();
                }
            });
        }
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
        _dragged = false;
        _down = false;
        _dragable = false;
        _hitCount = 0;
        _tipeDrag = 0;
        _dragSelesaiJml = 0;
        _dragStartY = 0;
        _dragStartX = 0;
        _sudutTekanAwal = 0;
        _inputId;
        _sudutAwal = 0;
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
        constructor(dragable = false) {
            this.dragable = dragable;
        }
        get dragSelesaiJml() {
            return this._dragSelesaiJml;
        }
        set dragSelesaiJml(value) {
            this._dragSelesaiJml = value;
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
        get jmlHit() {
            return this._hitCount;
        }
        set jmlHit(value) {
            this._hitCount = value;
        }
        get down() {
            return this._down;
        }
        set down(value) {
            this._down = value;
        }
        get dragable() {
            return this._dragable;
        }
        set dragable(value) {
            this._dragable = value;
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
            if (value > 0) {
                this._dragable = true;
            }
            else {
                this._dragable = false;
            }
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
        get inputId() {
            return this._inputId;
        }
        set inputId(value) {
            this._inputId = value;
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
    class SprInt {
        spriteDown(s, pos, id) {
            s.down = true;
            s.drgStartX = pos.x - s.x;
            s.drgStartY = pos.y - s.y;
            s.inputId = id;
            s.jmlHit++;
            s.sudutTekanAwal = Basik.Tf.sudut(pos.x - s.x, pos.y - s.y);
            s.sudutAwal = s.rotasi;
            s.executeEvent("down");
        }
        inputDown(pos, id) {
            console.group('input down');
            let lastIdx = -1;
            let lastSprite = null;
            for (let i = Basik.Ip.daftar.length - 1; i >= 0; i--) {
                let item;
                item = Basik.Ip.daftar[i];
                if (Basik.Ip.dotDidalamGambar(item, item.x, item.y, pos.x, pos.y)) {
                    if (item.ctrIdx > lastIdx) {
                        lastIdx = item.ctrIdx;
                        lastSprite = item;
                    }
                }
                else {
                    if (item.tipeDrag == 3 || item.tipeDrag == 4) {
                        this.spriteDown(item, pos, id);
                    }
                }
            }
            if (lastSprite) {
                this.spriteDown(lastSprite, pos, id);
            }
            console.groupEnd();
        }
        inputMove(pos, pointerId) {
            Basik.Ip.daftar.forEach((item) => {
                if (item.down && item.dragable && (item.inputId == pointerId)) {
                    item.dragged = true;
                    if (item.tipeDrag == TypeDrag.drag || (item.tipeDrag == 3)) {
                        item.x = pos.x - item.drgStartX;
                        item.y = pos.y - item.drgStartY;
                        item.executeEvent("drag");
                    }
                    else if (item.tipeDrag == TypeDrag.rotasi || (item.tipeDrag == 4)) {
                        let sudut2 = Basik.Tf.sudut(pos.x - item.x, pos.y - item.y);
                        let perbedaan = sudut2 - item.sudutTekanAwal;
                        item.rotasi = item.sudutAwal + perbedaan;
                        item.executeEvent("drag");
                    }
                    else {
                    }
                }
            });
        }
        inputUp() {
            Basik.Ip.daftar.forEach((item) => {
                if (item.down) {
                    item.executeEvent('up');
                }
                if (item.dragged) {
                    console.log('input up: item rotasi ' + item.rotasi);
                    item.executeEvent('up');
                }
                item.down = false;
                item.dragged = false;
            });
        }
    }
    Basik.sprInt = new SprInt();
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Spr3 {
        static gerakX(s, n) {
            s.x += n;
        }
        static gerakY(s, n) {
            s.y += n;
        }
        static gerakXY(s, x, y) {
            s.x += x;
            s.y += y;
        }
        static gerakSudut(s, n, sudut) {
            sudut *= Math.PI / 180;
            Spr3.gerakX(s, n * Math.cos(sudut));
            Spr3.gerakY(s, n * Math.sin(sudut));
        }
        static gerakPutar(s, sudut, sx, sy) {
            Basik.Tf.rotateRel(s.x, s.y, sx, sy, sudut);
            s.x += Basik.Tf.lastX;
            s.y += Basik.Tf.lastY;
        }
        static menjauh(s, x, y, jml) {
            let sudut = Basik.Tf.sudut(s.x - x, s.y - y);
            Spr3.gerakSudut(s, jml, sudut);
        }
        static mendekat(s, x, y, jml) {
            let sudut = Basik.Tf.sudut(x - s.x, y - s.y);
            Spr3.gerakSudut(s, jml, sudut);
        }
    }
    Basik.Spr3 = Spr3;
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
        static Size(n = 30) {
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
        _src = '';
        _loaded = false;
        _sound;
        _playedCount;
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
    };
    sound.src = url;
    S.list.push(s);
}
function PlaySound(s) {
    s.sound.play();
}
function SoundEnded(s) {
    let h = s.playedCount;
    s.playedCount = 0;
    return (h > 0);
}
function SoundLoaded(s) {
    return s.loaded;
}
const G = Basik.G;
const T = Basik.Tk;
const Im = Basik.Im;
const Ip = Basik.Ip;
const In = Basik.In;
function MainBuffer() {
    return G.context;
}
function ClearArea(x, y, w, h) {
    G.context.clearRect(x, y, w, h);
}
function Graphics(w = 320, h = 240, canvas = null, fullScreen = true, input = true) {
    if (canvas) {
        G.canvas = canvas;
    }
    G.skalaOtomatis = fullScreen;
    console.log('inisialisasi');
    G.init(w, h, G.skalaOtomatis);
    if (input) {
        In.init(G.canvas);
    }
    window.addEventListener("resize", () => {
        G.handleWindowResize();
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
        G.handleWindowResize();
    }, 100);
    G.handleWindowResize();
    NoStroke();
    Cls();
}
function Cls() {
    let ctx = G.context;
    ctx.fillRect(0, 0, (G.canvas.width), (G.canvas.height));
    ctx.clearRect(0, 0, (G.canvas.width), (G.canvas.height));
}
function Green() {
    return G.hijau;
}
function Red() {
    return G.merah;
}
function Blue() {
    return G.biru;
}
function Alpha() {
    return Math.floor(G.alpha * 100);
}
function GetPixel(x = 0, y = 0) {
    return Ip.AmbilPiksel(x, y);
}
function SetPiksel(x = 0, y = 0, r = 0, g = 0, b = 0) {
    r;
    g;
    b;
    return Ip.SetPiksel(x, y);
}
function FillColor(r = 0, g = 0, b = 0, a = 1) {
    G.context.fillStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
}
function NoColor() {
    FillColor(0, 0, 0, 0);
}
function StrokeColor(r = 0, g = 0, b = 0, a = 1) {
    G.context.strokeStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
}
function NoStroke() {
    StrokeColor(0, 0, 0, 0);
}
const InputX = Basik.Input.InputX;
const InputY = Basik.Input.InputY;
const InputIsDown = Basik.Input.InputIsDown;
const InputIsDragged = Basik.Input.InputIsDragged;
const InputDragX = Basik.Input.InputDragX;
const InputDragY = Basik.Input.InputDragY;
const InputDragStartX = Basik.Input.InputDragStartX;
const InputDragStartY = Basik.Input.InputDragStartY;
const DistMin = Basik.Transform.degDistMin;
function Distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
const LoadImage = Im.LoadImage;
const LoadAnimImage = Im.LoadAnimImage;
const DrawImage = Im.DrawImage;
const Collide = Im.Collide;
const ImageBuffer = (img) => {
    return img.ctx;
};
const Tile = Im.Tile;
const AllImageLoaded = Im.AllImageLoaded;
const DrawAllImage = Im.DrawAllImage;
const CopyImage = Im.CopyImage;
const TextPos = Basik.Teks.Goto;
const Write = Basik.Teks.Write;
const TextFont = Basik.Teks.Name;
const TextSize = (size) => {
    Basik.Teks.size = size;
};
