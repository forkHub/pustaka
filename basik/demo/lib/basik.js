"use strict";
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Cache {
            constructor() {
                this.files = [];
            }
            getGbr(url) {
                for (let i = 0; i < this.files.length; i++) {
                    if (this.files[i].url == url) {
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
    class Camera {
        static get x() {
            return Camera._x;
        }
        static set x(value) {
            Camera._x = value;
        }
        static get y() {
            return Camera._y;
        }
        static set y(value) {
            Camera._y = value;
        }
        static get img() {
            return Camera._img;
        }
        static set img(value) {
            Camera._img = value;
        }
        static init() {
            function update() {
                window.requestAnimationFrame(update);
            }
            window.requestAnimationFrame(update);
        }
    }
    Camera._x = 0;
    Camera._y = 0;
    Basik.Camera = Camera;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let Evt;
    (function (Evt) {
        Evt["MOUSE_DOWN"] = "mousedown";
        Evt["MOUSE_UP"] = "mouseup";
        Evt["MOUSE_MOVE"] = "mousemove";
        Evt["MOUSE_CLICK"] = "mouseclick";
        Evt["MOUSE_START_DRAG"] = "mousestartdrag";
        Evt["MOUSE_END_DRAG"] = "mouseenddrag";
        Evt["KEYB_DOWN"] = "keybdown";
        Evt["KEYB_UP"] = "keybup";
        Evt["SOUND_LOADED"] = "soundloaded";
        Evt["SOUND_ENDED"] = "soundended";
    })(Evt = Basik.Evt || (Basik.Evt = {}));
    class Event {
        constructor(type, f) {
            this._type = '';
            this._type = type;
            this._f = f;
        }
        get type() {
            return this._type;
        }
        get f() {
            return this._f;
        }
        static addEventListener(type, f) {
            let e = new Event(type.toLowerCase(), f);
            Event.list.push(e);
            console.log("add listener: type ", type);
            return e;
        }
        static dispatchEvent(type) {
            Event.list.forEach((item) => {
                if (item.type === type.toLowerCase()) {
                    item.f();
                }
            });
        }
    }
    Event.list = [];
    Basik.Event = Event;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Graphic {
        static handleWindowResize() {
            if (!Basik.G._autoScale)
                return;
            let canvas = Basik.G.drawCanvas;
            let cp = Basik.G.drawCanvas.width;
            let cl = Basik.G.drawCanvas.height;
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
            let canvas;
            canvas = document.body.querySelector('canvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                document.body.appendChild(canvas);
                if (w)
                    canvas.width = w;
                if (h)
                    canvas.height = h;
            }
            return canvas;
        }
        static Canvas() {
            return Basik.G.drawCanvas;
        }
        static SetCanvas(canvas) {
            Basik.G.drawCanvas = canvas;
        }
        static initComp() {
            Basik.In.init(Basik.G.drawCanvas);
            Basik.Keyboard.init();
            Basik.Camera.init();
            Basik.sprInt.init();
        }
        static initEvent() {
            function callFunc(str) {
                let w = window;
                if (w[str] && (typeof w[str] == 'function')) {
                    w[str]();
                }
            }
            Basik.Event.addEventListener(Basik.Evt.KEYB_DOWN, () => {
                callFunc("KeyboardDown");
            });
            Basik.Event.addEventListener(Basik.Evt.KEYB_UP, () => {
                callFunc("KeyboardUp");
            });
            Basik.Event.addEventListener(Basik.Evt.MOUSE_DOWN, () => {
                callFunc("MouseDown");
            });
            Basik.Event.addEventListener(Basik.Evt.MOUSE_END_DRAG, () => {
                callFunc("MouseEndDrag");
            });
            Basik.Event.addEventListener(Basik.Evt.MOUSE_MOVE, () => {
                callFunc("MouseMove");
            });
            Basik.Event.addEventListener(Basik.Evt.MOUSE_START_DRAG, () => {
                callFunc("MouseStartDrag");
            });
            Basik.Event.addEventListener(Basik.Evt.MOUSE_CLICK, () => {
                callFunc("MouseClick");
            });
            Basik.Event.addEventListener(Basik.Evt.MOUSE_UP, () => {
                callFunc("MouseUp");
            });
            Basik.Event.addEventListener("update", () => {
                callFunc("Update");
            });
            Basik.Event.addEventListener(Basik.Evt.SOUND_ENDED, () => {
                callFunc("SoundEnded");
            });
            Basik.Event.addEventListener(Basik.Evt.SOUND_LOADED, () => {
                callFunc("SoundLoaded");
            });
        }
        static Start(canvas) {
            Basik.G.Graphics(0, 0, canvas, 0);
        }
        static Graphics(w, h, canvas = null, mode = 1) {
            console.log('init');
            if (!canvas)
                canvas = Basik.G.buildCanvas(w, h);
            Basik.G.drawCanvas = canvas;
            Basik.G._autoScale = (mode == 1);
            Basik.G.setupMainCanvas(w, h, mode);
            Basik.G.initComp();
            Basik.G.initEvent();
            function update() {
                Basik.Event.dispatchEvent("update");
                window.requestAnimationFrame(update);
            }
            window.requestAnimationFrame(update);
            setTimeout(() => {
                Basik.G.handleWindowResize();
            }, 100);
            Basik.G.handleWindowResize();
            Cls();
            StrokeColor(0, 0, 0, 0);
            TextPos(0, 10);
            TextSize(10);
        }
        static setupMainCanvas(p, l, mode = 1) {
            if (p)
                Basik.G.drawCanvas.width = p;
            if (l)
                Basik.G.drawCanvas.height = l;
            if (mode == 1) {
                Basik.G.drawCanvas.style.width = p + 'px';
                Basik.G.drawCanvas.style.padding = '0px';
                Basik.G.drawCanvas.style.margin = '0px';
                window.addEventListener("resize", () => {
                    Basik.G.handleWindowResize();
                });
            }
        }
        static Cls(x = 0, y = 0, w = 0, h = 0) {
            let ctx = Basik.G.drawCanvas.getContext('2d');
            w = w || Basik.G.drawCanvas.width;
            h = h || Basik.G.drawCanvas.height;
            ctx.clearRect(x, y, w, h);
        }
        static get red() {
            return Basik.G._red;
        }
        static set red(value) {
            Basik.G._red = value;
        }
        static get green() {
            return Basik.G._green;
        }
        static set green(value) {
            Basik.G._green = value;
        }
        static get blue() {
            return Basik.G._blue;
        }
        static set blue(value) {
            Basik.G._blue = value;
        }
        static get alpha() {
            return Basik.G._transparan;
        }
        static set alpha(value) {
            Basik.G._transparan = value;
        }
    }
    Graphic._autoScale = true;
    Graphic._red = 0;
    Graphic._green = 0;
    Graphic._blue = 0;
    Graphic._transparan = 0;
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
                input.moveX = e.movementX;
                input.moveY = e.movementY;
            }
            down(input, pos) {
                input.xStart = pos.x;
                input.yStart = pos.y;
                input.xDrag = 0;
                input.yDrag = 0;
                input.x = pos.x;
                input.y = pos.y;
                input.isDown = true;
                input.isTap = false;
                input.isDrag = false;
                input.timerStart = Date.now();
            }
            up(input) {
                input.isDown = false;
                input.isDrag = false;
                input.timerEnd = Date.now();
            }
        }
        input_1.EventHandler = EventHandler;
        class InpuObj {
            constructor() {
                this.id = '';
                this.pointerType = '';
                this.xStart = 0;
                this.yStart = 0;
                this.xDrag = 0;
                this.yDrag = 0;
                this.moveX = 0;
                this.moveY = 0;
                this.x = 0;
                this.y = 0;
                this._isDrag = false;
                this.isDown = false;
                this.isTap = false;
                this.evt = null;
                this.button = -1;
                this.timerStart = 0;
                this.timerEnd = 0;
                this.pointerId = 0;
            }
            get isDrag() {
                return this._isDrag;
            }
            set isDrag(value) {
                this._isDrag = value;
            }
        }
        input_1.InpuObj = InpuObj;
    })(input || (input = {}));
    class Input {
        constructor() {
        }
        static get lastButton() {
            return Input._lastButton;
        }
        static get keyboardEvent() {
            return Input._keyboardEvent;
        }
        static set keyboardEvent(value) {
            Input._keyboardEvent = value;
        }
        static get pointerEvent() {
            return Input._pointerEvent;
        }
        static get debug() {
            return Input._debug;
        }
        static set debug(value) {
            Input._debug = value;
        }
        static getMouse() {
            for (let i = 0; i < Input.lst.length; i++) {
                let inp = Input.lst[i];
                if (inp.pointerType == 'mouse') {
                    return inp;
                }
            }
            return null;
        }
        static getByDraggedStatus(btn) {
            for (let i = 0; i < Input.lst.length; i++) {
                let inp = Input.lst[i];
                if (inp.isDrag && (inp.pointerType == 'mouse') && inp.button == btn) {
                    return inp;
                }
                if (inp.isDrag && (inp.pointerType == 'touch')) {
                    return inp;
                }
            }
            return null;
        }
        static getByButton(btn) {
            for (let i = 0; i < Input.lst.length; i++) {
                let inp = Input.lst[i];
                if (inp.pointerType == 'mouse') {
                    if (inp.button == btn) {
                        return inp;
                    }
                }
            }
            return null;
        }
        static getById(id) {
            for (let i = 0; i < Input.lst.length; i++) {
                let inp = Input.lst[i];
                if (inp.id == id) {
                    return inp;
                }
            }
            return null;
        }
        static getId(e) {
            return e.pointerType == "mouse" ? e.pointerType + e.button : e.pointerType + e.pointerId;
        }
        static getInput(e) {
            let lst = Input.lst;
            let id = Input.getId(e);
            for (let i = 0; i < lst.length; i++) {
                let o = lst[i];
                if (o.id == id) {
                    return o;
                }
            }
            return this.reg(e);
        }
        static checkTap(input) {
            if (Math.abs(input.xDrag) > 5)
                return "drag x " + input.xDrag;
            if (Math.abs(input.yDrag) > 5)
                return "drag y " + input.xDrag;
            let timer = input.timerEnd - input.timerStart;
            if ((timer) > 500)
                return "timer " + timer;
            return '';
        }
        static init(buffer) {
            console.log('Input init');
            buffer.style.touchAction = 'none';
            buffer.addEventListener("pointerdown", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                let inp = Input.getInput(e);
                let downState = inp.isDown;
                Input.evt.down(inp, pos);
                Input.evt.down(Input.global, pos);
                Input._pointerEvent = e;
                Input._lastButton = e.button;
                if (downState == false) {
                    console.log("dispatch mouse down event, id " + inp.id);
                    Basik.Event.dispatchEvent(Basik.Evt.MOUSE_DOWN);
                }
            });
            buffer.addEventListener("pointermove", (e) => {
                e.stopPropagation();
                e.preventDefault();
                Basik.Event.dispatchEvent(Basik.Evt.MOUSE_MOVE);
                move(Input.global);
                Input.lst.forEach((input) => {
                    move(input);
                });
                function move(input) {
                    Input.evt.move(input, buffer, e);
                    Input._pointerEvent = e;
                    if (input.isDown) {
                        if (!input.isDrag) {
                            console.log("dispatch mouse drag, id " + input.id);
                            input.isDrag = true;
                            input.xStart = input.x;
                            input.yStart = input.y;
                            if (input != Input.global) {
                                Basik.Event.dispatchEvent(Basik.Evt.MOUSE_START_DRAG);
                            }
                        }
                        input.xDrag = input.x - input.xStart;
                        input.yDrag = input.y - input.yStart;
                    }
                }
            });
            buffer.addEventListener("pointerout", (e) => {
                pointerUp(e);
            });
            buffer.addEventListener("pointerup", (e) => {
                this._lastButton = e.button;
                pointerUp(e);
            });
            function pointerUp(e) {
                e.stopPropagation();
                e.preventDefault();
                console.group("pointer up " + Input.getId(e));
                let input = Input.getInput(e);
                Input.evt.up(input);
                Input.evt.up(Input.global);
                Input._pointerEvent = e;
                let isTap = Input.checkTap(input);
                input.isTap = (isTap == '');
                if (input.isTap) {
                    Basik.Event.dispatchEvent(Basik.Evt.MOUSE_CLICK);
                }
                Input.lst.forEach((item) => {
                    if (item.isDrag) {
                        console.log("dispatch mouse drag end id " + input.id);
                        Basik.Event.dispatchEvent(Basik.Evt.MOUSE_END_DRAG);
                    }
                    Input.evt.up(item);
                });
                Basik.Event.dispatchEvent(Basik.Evt.MOUSE_UP);
                console.groupEnd();
            }
        }
        static reg(e) {
            console.log("reg input type " + e.pointerType + "/button " + e.button + "/id " + e.pointerId);
            let inp = new input.InpuObj();
            inp.id = Input.getId(e);
            inp.pointerType = e.pointerType;
            inp.isDown = false;
            inp.isDrag = false;
            inp.isTap = false;
            inp.button = e.button;
            inp.timerEnd = 0;
            inp.timerStart = 0;
            inp.x = 0;
            inp.xDrag = 0;
            inp.xStart = 0;
            inp.y = 0;
            inp.yDrag = 0;
            inp.yStart = 0;
            inp.evt = null;
            inp.pointerId = e.pointerId;
            inp.moveX = 0;
            inp.moveY = 0;
            Input.lst.push(inp);
            return inp;
        }
    }
    Input._debug = false;
    Input.lst = [];
    Input.global = new input.InpuObj();
    Input.evt = new input.EventHandler();
    Input.getPos = (cx, cy, c) => {
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
    Basik.Input = Input;
    Basik.In = Input;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let keyb;
    (function (keyb) {
        class KeybObj {
            constructor(key, isDown) {
                this.key = '';
                this.isDown = false;
                this.key = key;
                this.isDown = isDown;
            }
        }
        keyb.KeybObj = KeybObj;
    })(keyb || (keyb = {}));
    class Keyboard {
        static get lastKey() {
            return Keyboard._lastKey;
        }
        static get obj() {
            return Keyboard._obj;
        }
        static getByKey(key) {
            for (let i = 0; i < Keyboard.list.length; i++) {
                if (Keyboard.list[i].key == key)
                    return Keyboard.list[i];
            }
            return Keyboard.reg(key, false);
        }
        static reg(key, isDown) {
            console.log('new key registered: ' + key);
            let k = new keyb.KeybObj(key, isDown);
            Keyboard.list.push(k);
            return k;
        }
        static setDown(key, downState) {
            let lst = Keyboard.list;
            for (let i = 0; i < lst.length; i++) {
                let o = lst[i];
                if (o.key == key) {
                    o.isDown = downState;
                    return o;
                }
            }
            return Keyboard.reg(key, downState);
        }
        static IsDown(key = '') {
            let lst = Keyboard.list;
            for (let i = 0; i < lst.length; i++) {
                let o = lst[i];
                if (o.key == key) {
                    return o.isDown;
                }
            }
            this.reg(key, false);
            return false;
        }
        static init() {
            window.addEventListener("keydown", (e) => {
                Keyboard.anyKey.isDown = true;
                Keyboard._lastKey = e.key;
                Keyboard._obj = e;
                let k = Keyboard.getByKey(e.key);
                if (k.isDown == false) {
                    Keyboard.setDown(e.key, true);
                    Keyboard.setDown('', true);
                    Basik.Event.dispatchEvent(Basik.Evt.KEYB_DOWN);
                }
            });
            window.addEventListener("keyup", (e) => {
                Keyboard.anyKey.isDown = false;
                Keyboard._lastKey = e.key;
                Keyboard._obj = e;
                Keyboard.setDown(e.key, false);
                Keyboard.setDown('', false);
                Basik.Event.dispatchEvent(Basik.Evt.KEYB_UP);
            });
        }
    }
    Keyboard.list = [];
    Keyboard.anyKey = new keyb.KeybObj('', false);
    Keyboard._lastKey = '';
    Basik.Keyboard = Keyboard;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Pt {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
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
        constructor(A = new Basik.Pt(), B = new Basik.Pt()) {
            this.A = A;
            this.B = B;
        }
        get A() {
            return this._A;
        }
        set A(value) {
            this._A = value;
        }
        get B() {
            return this._B;
        }
        set B(value) {
            this._B = value;
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
        constructor() {
            this.vs = [];
            this.segs = [];
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
        static destroy(r) {
            while (r.vs.length > 0) {
                r.vs.pop();
            }
            while (r.segs.length > 0) {
                let s = r.segs.pop();
                s.A = null;
                s.B = null;
            }
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
    Transform.RAD2DEG = 180.0 / Math.PI;
    Transform.DEG2RAD = Math.PI / 180.0;
    Transform._lastX = 0;
    Transform._lastY = 0;
    Basik.Transform = Transform;
    Basik.Tf = Transform;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class ImgImpl {
        static CreateImage(width, height) {
            let h = new Basik.Image();
            h.canvas = document.createElement('canvas');
            h.canvas.width = width;
            h.canvas.height = height;
            h.frameH = height;
            h.frameW = width;
            h.width = width;
            h.height = height;
            h.load = true;
            h.img = document.createElement('img');
            Basik.Ip.register(h, h.url, h.dragType);
            return h;
        }
        static MuatAnimasi(url, pf, lf, tipeDrag = 0) {
            tipeDrag;
            let canvas = document.createElement('canvas');
            canvas;
            let gbr = new Basik.Image(url);
            gbr.isAnim = true;
            gbr.frameW = pf;
            gbr.frameH = lf;
            gbr.width = pf;
            gbr.height = lf;
            return gbr;
        }
        static register(image, url, tipeDrag) {
            let hasil;
            hasil = image;
            hasil.dragType = tipeDrag;
            hasil.url = url;
            Basik.Ip.daftar.push(hasil);
            return hasil;
        }
        static free(img) {
            for (let i = 0; i < this.daftar.length; i++) {
                if (this.daftar[i] == img) {
                    img.canvas = null;
                    img.img = null;
                    Basik.Ktk.destroy(img.rect);
                    this.daftar.splice(i, 1);
                    return;
                }
            }
        }
        static Muat(url) {
            return new Basik.Image(url);
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
        static gambarUbin(gbr, x = 0, y = 0, frame = 0) {
            let jmlH = 0;
            let jmlV = 0;
            if (gbr.load == false)
                return;
            let w2 = Math.floor(gbr.width);
            let h2 = Math.floor(gbr.height);
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
            jmlH = Math.ceil((Basik.G.Canvas().width + Math.abs(x)) / w2);
            jmlV = Math.ceil((Basik.G.Canvas().height + Math.abs(y)) / h2);
            for (let i = 0; i < jmlH; i++) {
                for (let j = 0; j < jmlV; j++) {
                    Basik.Ip.DrawSingle(gbr, x + (i * w2), y + (j * h2), frame);
                }
            }
        }
        static AmbilPiksel(x = 0, y = 0) {
            try {
                let data = Basik.G.Canvas().getContext('2d').getImageData(x, y, 1, 1).data;
                let hasil = [];
                hasil.push(data[0]);
                hasil.push(data[1]);
                hasil.push(data[2]);
                hasil.push(data[3]);
                Basik.G.red = data[0];
                Basik.G.green = data[1];
                Basik.G.blue = data[2];
                Basik.G.alpha = data[3];
            }
            catch (e) {
            }
        }
        static SetPiksel(x = 0, y = 0) {
            Basik.G.Canvas().getContext('2d').fillRect(Math.floor(x), Math.floor(y), 1, 1);
        }
        static Draw(img) {
            if (img.tilable) {
                Basik.Ip.gambarUbin(img, img.x, img.y, img.frame);
            }
            else {
                Basik.Ip.DrawSingle(img, img.x, img.y, img.frame);
            }
        }
        static DrawSingle(gbr, x = 0, y = 0, frame = 0) {
            let ctx = Basik.G.Canvas().getContext('2d');
            let jmlH = 0;
            let frameX = 0;
            let frameY = 0;
            let imgW = 0;
            if (gbr.load == false)
                return;
            if (!gbr.url) {
                imgW = gbr.width;
            }
            else {
                imgW = gbr.img.naturalWidth;
            }
            gbr.ctrIdx = Basik.Image.ctrDraw++;
            frame = Math.floor(frame);
            jmlH = Math.floor(imgW / gbr.frameW);
            frameX = (frame % jmlH);
            frameY = Math.floor(frame / jmlH);
            frameX *= gbr.frameW;
            frameY *= gbr.frameH;
            frameX = Math.floor(frameX);
            frameY = Math.floor(frameY);
            let x2 = Math.floor(x);
            let y2 = Math.floor(y);
            let w2 = Math.floor(gbr.width);
            let h2 = Math.floor(gbr.height);
            x2 -= (gbr.handleX);
            y2 -= (gbr.handleY);
            if (gbr.rotation != 0) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(gbr.rotation * (Math.PI / 180));
                drawImpl(-gbr.handleX, -gbr.handleY);
                ctx.restore();
            }
            else {
                ctx.save();
                drawImpl(x2, y2);
                ctx.restore();
            }
            function drawImpl(dx, dy) {
                dx -= Basik.Camera.x;
                dy -= Basik.Camera.y;
                ctx.globalAlpha = gbr.alpha / 100;
                ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, Math.floor(dx), Math.floor(dy), w2, h2);
            }
        }
        static resetRect(img) {
            let rect = img.rect;
            let p;
            p = rect.vs[0];
            p.x = 0;
            p.y = 0;
            p = rect.vs[1];
            p.x = img.frameW - 1;
            p.y = 0;
            p = rect.vs[2];
            p.x = img.frameW - 1;
            p.y = img.frameH - 1;
            p = rect.vs[3];
            p.x = 0;
            p.y = img.frameH - 1;
        }
        static rectToImageTf(image, x, y) {
            let rect = image.rect;
            let p;
            let x2 = image.width - 1;
            let y2 = image.height - 1;
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
            Basik.Ktk.rotate(rect, image.rotation, x, y, false);
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
    ImgImpl.props = [];
    ImgImpl.daftar = [];
    Basik.ImgImpl = ImgImpl;
    Basik.Ip = ImgImpl;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let TypeDrag;
    (function (TypeDrag) {
        TypeDrag[TypeDrag["drag"] = 1] = "drag";
        TypeDrag[TypeDrag["rotasi"] = 2] = "rotasi";
        TypeDrag[TypeDrag["remoteDrag"] = 3] = "remoteDrag";
        TypeDrag[TypeDrag["remoteRotation"] = 4] = "remoteRotation";
    })(TypeDrag || (TypeDrag = {}));
    class ImgIntHandler {
        init() {
            Basik.Event.addEventListener(Basik.Evt.MOUSE_DOWN, () => {
                this.inputDown({
                    x: Basik.Input.global.x,
                    y: Basik.Input.global.y
                }, Basik.Input.global.id);
            });
            Basik.Event.addEventListener(Basik.Evt.MOUSE_MOVE, () => {
                this.inputMove({
                    x: Basik.Input.global.x,
                    y: Basik.Input.global.y
                }, Basik.Input.global.id);
            });
            Basik.Event.addEventListener(Basik.Evt.MOUSE_UP, () => {
                console.log("clear image mouse status");
                Basik.Ip.daftar.forEach((img) => {
                    img.down = false;
                    img.dragged = false;
                });
            });
        }
        down(img, posCanvas, id) {
            let posAbs = {
                x: posCanvas.x - Basik.Camera.x,
                y: posCanvas.y - Basik.Camera.y
            };
            img.down = true;
            img.dragStartX = posAbs.x - img.x;
            img.dragStartY = posAbs.y - img.y;
            img.inputId = id;
            img.initialMouseAngle = Basik.Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
            img.initialAngle = img.rotation;
        }
        inputDown(posCanvas, id) {
            console.group('input down');
            let posAbs = {
                x: posCanvas.x - Basik.Camera.x,
                y: posCanvas.y - Basik.Camera.y
            };
            let lastIdx = -1;
            let lastSprite = null;
            for (let i = Basik.Ip.daftar.length - 1; i >= 0; i--) {
                let img;
                img = Basik.Ip.daftar[i];
                if (Basik.Ip.dotInsideImage(img, img.x, img.y, posAbs.x, posAbs.y)) {
                    if (img.ctrIdx > lastIdx) {
                        lastIdx = img.ctrIdx;
                        lastSprite = img;
                    }
                }
                else {
                    if (img.dragType == 3 || img.dragType == 4) {
                        this.down(img, posCanvas, id);
                    }
                }
            }
            if (lastSprite) {
                console.log("img pressed, id: " + id);
                this.down(lastSprite, posCanvas, id);
            }
            else {
                console.log("no image pressed");
            }
            console.groupEnd();
        }
        inputMove(posCanvas, inputId) {
            let posAbs = {
                x: posCanvas.x - Basik.Camera.x,
                y: posCanvas.y - Basik.Camera.y
            };
            Basik.Ip.daftar.forEach((img) => {
                if (img.down && (img.dragType != 0) && (img.inputId == inputId)) {
                    img.dragged = true;
                    if (img.dragType == TypeDrag.drag || (img.dragType == TypeDrag.remoteDrag)) {
                        img.x = posAbs.x - img.dragStartX;
                        img.y = posAbs.y - img.dragStartY;
                        console.debug('item drag move');
                    }
                    else if (img.dragType == TypeDrag.rotasi || (img.dragType == TypeDrag.remoteRotation)) {
                        let sudut2 = Basik.Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
                        let perbedaan = sudut2 - img.initialMouseAngle;
                        img.rotation = img.initialAngle + perbedaan;
                    }
                    else {
                    }
                }
            });
        }
    }
    Basik.sprInt = new ImgIntHandler();
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Teks {
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
        static Align(s = "left") {
            Basik.G.Canvas().getContext('2d').textAlign = s;
        }
        static WriteLn(teks) {
            Basik.G.Canvas().getContext('2d').font = Teks.size + 'px ' + Teks._name;
            Basik.G.Canvas().getContext('2d').fillText(teks, Teks._x, Teks._y);
            Basik.G.Canvas().getContext('2d').strokeText(teks, Teks._x, Teks._y);
            Teks._y += Teks.size + 2;
        }
        static Write(teks) {
            Basik.G.Canvas().getContext('2d').font = Teks.size + 'px ' + Teks._name;
            Basik.G.Canvas().getContext('2d').fillText(teks, Teks._x, Teks._y);
            Basik.G.Canvas().getContext('2d').strokeText(teks, Teks._x, Teks._y);
        }
    }
    Teks._name = 'Arial';
    Teks._size = 12;
    Teks._x = 120;
    Teks._y = 10;
    Basik.Teks = Teks;
    Basik.Tk = Teks;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Sound {
        constructor() {
            this._src = '';
            this._loaded = false;
        }
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
    Sound.list = [];
    Basik.Sound = Sound;
    Basik.Sn = Sound;
})(Basik || (Basik = {}));
const S = Basik.Sn;
function LoadSound(url) {
    let sound = document.createElement("audio");
    sound.onload = () => {
        Basik.Sound.lastSound = sound;
        Basik.Event.dispatchEvent(Basik.Evt.SOUND_LOADED);
        console.log("sound loaded");
    };
    sound.onended = () => {
        try {
            Basik.Sound.lastSound = sound;
            Basik.Event.dispatchEvent(Basik.Evt.SOUND_ENDED);
            console.log("sound ended");
        }
        catch (e) {
        }
    };
    sound.src = url;
    return sound;
}
function PlaySound(s) {
    s.play();
}
function LastSound() {
    return Basik.Sound.lastSound;
}
const G = Basik.G;
const Ip = Basik.Ip;
const In = Basik.In;
function SetCanvas(c) {
    G.SetCanvas(c);
}
function Canvas() {
    return G.Canvas();
}
function ClearArea(x, y, w, h) {
    G.Canvas().getContext('2d').clearRect(x, y, w, h);
}
function Graphics(w = 320, h = 240, canvas = null, mode = 1) {
    G.Graphics(w, h, canvas, mode);
}
function Cls(x = 0, y = 0, w = 0, h = 0) {
    G.Cls(x, y, w, h);
}
function Green() {
    return G.green;
}
function Red() {
    return G.red;
}
function Blue() {
    return G.blue;
}
function Alpha() {
    return Math.floor(G.alpha * 100);
}
function GetPixel(x = 0, y = 0) {
    Ip.AmbilPiksel(x, y);
}
function SetPixel(x = 0, y = 0) {
    Ip.SetPiksel(x, y);
}
function FillColor(r = 0, g = 0, b = 0, a = 100) {
    G.Canvas().getContext('2d').fillStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
    G.red = r;
    G.green = g;
    G.blue = b;
    G.alpha = a;
}
function StrokeColor(r = 0, g = 0, b = 0, a = 1) {
    G.Canvas().getContext('2d').strokeStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
    G.red = r;
    G.green = g;
    G.blue = b;
    G.alpha = a;
}
function Line(Ax, Ay, Bx, By) {
    let ctx = Canvas().getContext('2d');
    Ax = Math.floor(Ax);
    Ay = Math.floor(Ay);
    Bx = Math.floor(Bx);
    By = Math.floor(By);
    ctx.beginPath();
    ctx.moveTo(Ax, Ay);
    ctx.lineTo(Bx, By);
    ctx.stroke();
}
function Rect(x1, y1, x2, y2) {
    let ctx = Canvas().getContext('2d');
    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
}
function Circle(x = 0, y = 0, radius) {
    let ctx = Canvas().getContext('2d');
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    ctx.restore();
    ctx.stroke();
}
window.addEventListener("load", () => {
    let w = window;
    if (w["Start"] && (typeof w["Start"] == 'function')) {
        w["Start"]();
    }
    else {
        console.log("Start not found");
    }
});
function MouseIsDown(btn = 0) {
    return In.getByButton(btn)?.isDown;
}
function MouseIsDragged(btn = 0) {
    return In.getByButton(btn)?.isDrag;
}
function MouseDraggedX(btn = 0) {
    return In.getByDraggedStatus(btn)?.xDrag;
}
function MouseDraggedY(btn = 0) {
    return In.getByDraggedStatus(btn)?.yDrag;
}
function MouseX() {
    return In.global?.x;
}
function MouseY() {
    return In.global?.y;
}
function MouseDragStartX(btn = 0) {
    return In.getByButton(btn)?.xStart;
}
function MouseDragStartY(btn = 0) {
    return In.getByButton(btn)?.yStart;
}
function MouseButton() {
    return In.lastButton;
}
function MouseMoveX() {
    return In.global.moveX;
}
function MouseMoveY() {
    return In.global.moveY;
}
function AngleDist(angleS = 0, angleT, min = true) {
    return Basik.Transform.degDist(angleS, angleT, min);
}
function Angle(x, y) {
    return Basik.Tf.sudut(x, y);
}
function Clamp(n, min, max) {
    if (n < min)
        return min;
    if (n > max)
        return max;
    return n;
}
function LoadImage(url) {
    return Ip.Muat(url);
}
function DrawImage(img) {
    Ip.Draw(img);
}
function ImageCollide(img1, img2) {
    return Ip.tabrakan(img1, img1.x, img1.y, img2, img2.x, img2.y);
}
function ImageCollidePoint(img, x, y) {
    return Ip.dotInsideImage(img, img.x, img.y, x, y);
}
function CreateImage(width, height) {
    return Ip.CreateImage(width, height);
}
function AllImageLoaded() {
    return Ip.AllImageLoaded();
}
function FreeImage(img) {
    Ip.free(img);
}
function CopyFromCanvas(img, x, y) {
    let ctx = img.canvas.getContext('2d');
    ctx.clearRect(0, 0, img.canvas.width, img.canvas.height);
    ctx.drawImage(Canvas(), -x, -y);
}
const TextPos = Basik.Teks.Goto;
const Write = Basik.Teks.Write;
const WriteLn = Basik.Teks.WriteLn;
const TextFont = Basik.Teks.Name;
const TextSize = Basik.Teks.Size;
const Align = Basik.Teks.Align;
function KeyboardIsDown(key = '') {
    return Basik.Keyboard.IsDown(key);
}
function LastKey() {
    return Basik.Keyboard.lastKey;
}
var Basik;
(function (Basik) {
    class Image {
        constructor(url = '') {
            this._x = 0;
            this._y = 0;
            this._alpha = 100;
            this._handleX = 0;
            this._handleY = 0;
            this._panjang = 0;
            this._lebar = 0;
            this._rotasi = 0;
            this._tilable = false;
            this._frameW = 0;
            this._frameH = 0;
            this._dragged = false;
            this._down = false;
            this._frame = 0;
            this.load = false;
            this._ctrIdx = 0;
            this.isAnim = false;
            this.rect = new Basik.Ktk();
            this._tipeDrag = 0;
            this._dragStartY = 0;
            this._dragStartX = 0;
            this._sudutTekanAwal = 0;
            this._sudutAwal = 0;
            let img = document.createElement('img');
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let gbr;
            gbr = this;
            let rect = Basik.Ktk.buat(0, 0, img.naturalWidth, img.naturalHeight);
            Basik.Ip.register(this, url, 0);
            gbr.img = img;
            gbr.canvas = canvas;
            gbr.rect = rect;
            gbr.load = false;
            if (!gbr.url) {
                gbr.load = true;
            }
            img.onload = () => {
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
                if (url)
                    img.src = url;
            }
            function imgOnLoad(imgP) {
                canvas.width = imgP.naturalWidth;
                canvas.height = imgP.naturalHeight;
                ctx.drawImage(imgP, 0, 0);
                gbr.rect = Basik.Ktk.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);
                gbr.load = true;
                gbr.img = imgP;
                if (!gbr.width) {
                    gbr.width = imgP.naturalWidth;
                }
                if (!gbr.height) {
                    gbr.height = imgP.naturalHeight;
                }
                if (!gbr._frameH)
                    gbr.frameH = imgP.naturalHeight;
                if (!gbr._frameW)
                    gbr.frameW = imgP.naturalWidth;
                ha.be.cache.setFile(url, imgP);
            }
            function imgOnLoadDefault() {
            }
        }
        get inputId() {
            return this._inputId;
        }
        set inputId(value) {
            this._inputId = value;
        }
        get frame() {
            return this._frame;
        }
        set frame(value) {
            this._frame = value;
        }
        get canvas() {
            return this._canvas;
        }
        set canvas(value) {
            this._canvas = value;
        }
        get tilable() {
            return this._tilable;
        }
        set tilable(value) {
            this._tilable = value;
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
        get width() {
            if (this._panjang)
                return this._panjang;
            if (this.img)
                return this.img.naturalWidth;
            return 0;
        }
        set width(value) {
            this._panjang = value;
        }
        get height() {
            if (this._lebar)
                return this._lebar;
            if (this.img)
                return this.img.naturalHeight;
            return 0;
        }
        set height(value) {
            this._lebar = value;
        }
        get ctrIdx() {
            return this._ctrIdx;
        }
        set ctrIdx(value) {
            this._ctrIdx = value;
        }
        get rotation() {
            return this._rotasi;
        }
        set rotation(value) {
            this._rotasi = value;
        }
        get dragStartX() {
            return this._dragStartX;
        }
        set dragStartX(value) {
            this._dragStartX = value;
        }
        get dragStartY() {
            return this._dragStartY;
        }
        set dragStartY(value) {
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
        get dragType() {
            return this._tipeDrag;
        }
        set dragType(value) {
            this._tipeDrag = value;
        }
        get url() {
            return this._url;
        }
        set url(value) {
            this._url = value;
        }
        static get ctrDraw() {
            return Image._ctrDraw;
        }
        static set ctrDraw(value) {
            Image._ctrDraw = value;
        }
        get initialMouseAngle() {
            return this._sudutTekanAwal;
        }
        set initialMouseAngle(value) {
            this._sudutTekanAwal = value;
        }
        get initialAngle() {
            return this._sudutAwal;
        }
        set initialAngle(value) {
            this._sudutAwal = value;
        }
    }
    Image._ctrDraw = 0;
    Basik.Image = Image;
})(Basik || (Basik = {}));
