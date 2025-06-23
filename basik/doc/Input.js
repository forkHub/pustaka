"use strict";
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
        // {
        // 	id: '',
        // 	pointerType: "",
        // 	xStart: 0,
        // 	yStart: 0,
        // 	xDrag: 0,
        // 	yDrag: 0,
        // 	x: 0,
        // 	y: 0,
        // 	isDrag: false,
        // 	isDown: false,
        // 	isTap: false,
        // 	evt: undefined,
        // 	button: 0,
        // 	timerStart: 0,
        // 	timerEnd: 0,
        // 	pointerId: 0,
        // 	moveX: 0,
        // 	moveY: 0
        // }
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
            // if (Input.global.pointerType == 'touch') return Input.global;
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
        //check tap
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
                //each input
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
                // Input.global.id = Input.getId(e);
                // Input.global.pointerType = e.pointerType;
                let isTap = Input.checkTap(input);
                input.isTap = (isTap == '');
                if (input.isTap) {
                    Basik.Event.dispatchEvent(Basik.Evt.MOUSE_TAP);
                }
                //clear up all input status
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
    //for touch event that is not consistent and does not have button
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
