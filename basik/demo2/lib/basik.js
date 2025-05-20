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
        static handleWindowResize() {
            if (!Basik.G._autoScale)
                return;
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
                let f = window["MouseMove"];
                if (typeof f === 'function')
                    f();
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
                let f = window["MouseDown"];
                if (typeof f === 'function')
                    f();
            }
            up(input) {
                input.isDown = false;
                input.isDrag = false;
                input.timerEnd = Date.now();
                let isTap = this.checkTap(input);
                input.isTap = (isTap == '');
                if (input.isTap) {
                    let f = window["MouseTap"];
                    if (typeof f === 'function')
                        f();
                }
                let f = window["MouseUp"];
                if (typeof f === 'function')
                    f();
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
                try {
                    window.MouseDownEvent(e.button);
                }
                catch (e) {
                    e;
                }
            });
            buffer.addEventListener("mousemove", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                Input.event.move(this.obj, buffer, e);
                Basik.sprInt.inputMove(pos, e.button);
                try {
                    window.MouseMoveEvent();
                }
                catch (e) {
                    e;
                }
            });
            buffer.addEventListener("mouseout", (e) => {
                e.stopPropagation();
                e.preventDefault();
                Input.event.up(Input.obj);
                Basik.Ip.daftar.forEach((img) => {
                    img.down = false;
                    img.dragged = false;
                });
            });
            buffer.addEventListener("mouseup", (e) => {
                e.stopPropagation();
                e.preventDefault();
                Input.event.up(this.obj);
                Basik.Ip.daftar.forEach((img) => {
                    img.down = false;
                    img.dragged = false;
                });
                try {
                    window.MouseUpEvent(e.button);
                }
                catch (e) {
                    e;
                }
            });
        }
        static buatInputDefault() {
            return {
                isDown: false,
                isDrag: false,
                isTap: false,
                key: 0,
                timerEnd: 0,
                timerStart: 0,
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
        static vecI(seg) {
            return seg.B.x - seg.A.x;
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
                Basik.Ip.DrawSingle(item);
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
            }
            catch (e) {
            }
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
                console.group('draw image');
                console.log("x:", x, "y:", y, "x2:", x2, "y2:", y2);
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
    class ImgObj {
        static _ctrDraw = 0;
        _url;
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
        _dragged = false;
        _down = false;
        _tipeDrag = 0;
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
    class SprInt {
        spriteDown(img, pos, id) {
            img.down = true;
            img.drgStartX = pos.x - img.x;
            img.drgStartY = pos.y - img.y;
            img.button = id;
            img.sudutTekanAwal = Basik.Tf.sudut(pos.x - img.x, pos.y - img.y);
            img.sudutAwal = img.rotasi;
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
            if (lastSprite) {
                this.spriteDown(lastSprite, pos, button);
            }
            console.groupEnd();
        }
        inputMove(pos, button) {
            Basik.Ip.daftar.forEach((item) => {
                if (item.down && item.dragable && (item.button == button)) {
                    item.dragged = true;
                    if (item.tipeDrag == TypeDrag.drag || (item.tipeDrag == 3)) {
                        item.x = pos.x - item.drgStartX;
                        item.y = pos.y - item.drgStartY;
                    }
                    else if (item.tipeDrag == TypeDrag.rotasi || (item.tipeDrag == 4)) {
                        let sudut2 = Basik.Tf.sudut(pos.x - item.x, pos.y - item.y);
                        let perbedaan = sudut2 - item.sudutTekanAwal;
                        item.rotasi = item.sudutAwal + perbedaan;
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
const G = Basik.G;
const T = Basik.Tk;
const Ip = Basik.Ip;
const In = Basik.In;
function MainBuffer() {
    return G.mainCtx;
}
function SetBuffer(b) {
    G.context = b;
}
function ClearArea(x, y, w, h) {
    G.context.clearRect(x, y, w, h);
}
function Graphics(w = 320, h = 240, canvas = null, fullScreen = true) {
    G.Graphics(w, h, canvas, fullScreen);
}
function Cls() {
    G.Cls();
}
function Green() {
    return G.hijau;
}
function Red() {
    return G.red;
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
function SetPiksel(x = 0, y = 0) {
    return Ip.SetPiksel(x, y);
}
function FillColor(r = 0, g = 0, b = 0, a = 1) {
    G.context.fillStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
}
function NoColor() {
    G.context.fillStyle = "none";
}
function StrokeColor(r = 0, g = 0, b = 0, a = 1) {
    G.context.strokeStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
}
function NoStroke() {
    G.context.strokeStyle = 'none';
}
function MouseIsDown() {
    return In.obj.isDown;
}
function MouseIsDragged() {
    return In.obj.isDrag;
}
function MouseDragXAmount() {
    return In.obj.xDrag;
}
function MouseDragYAmount() {
    return In.obj.yDrag;
}
function MouseX() {
    return In.obj.x;
}
function MouseY() {
    return In.obj.y;
}
function MouseDragStartX() {
    return In.obj.xStart;
}
function MouseDragStartY() {
    return In.obj.yStart;
}
const DistMin = Basik.Transform.degDist;
function Distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
function Dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
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
const LoadImage = Ip.Muat;
const LoadAnimImage = Ip.MuatAnimasi;
const DrawImage = Ip.Draw;
const ImageCollide = Ip.tabrakan;
const ImageCollidePoint = Ip.dotInsideImage;
const CreateImage = Ip.CreateImage;
function DrawAllImage() {
    Ip.GambarSemua();
}
const ImageBuffer = (img) => {
    return img.ctx;
};
const AllImageLoaded = Ip.AllImageLoaded;
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
