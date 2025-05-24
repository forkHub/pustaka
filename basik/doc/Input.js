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
                input.key = e.button;
                if (input.isDown) {
                    input.isDrag = true;
                    input.xDrag = input.x - input.xStart;
                    input.yDrag = input.y - input.yStart;
                    // try {
                    // 	let f = (window as any)["MouseDragEvent"];
                    // 	if (typeof f == "function") (window as any).MouseDragEvent();
                    // }
                    // catch (e) { e; }
                    Basik.Event.call("mousedrag");
                }
                // try {
                // 	let f = (window as any)["MouseMoveEvent"];
                // 	if (typeof f == "function") (window as any).MouseMoveEvent();
                // }
                // catch (e) { e; }
                Basik.Event.call("mousemove");
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
                // try {
                // 	(window as any).MouseDownEvent(key);
                // }
                // catch (e) { e; }
                Basik.Event.call("mousedown");
            }
            up(input, key) {
                input.isDown = false;
                input.isDrag = false;
                input.timerEnd = Date.now();
                input.key = key;
                let isTap = this.checkTap(input);
                input.isTap = (isTap == '');
                if (input.isTap) {
                    // try {
                    // 	(window as any).MouseClickEvent(input.key);
                    // }
                    // catch (e) { e; }
                    Basik.Event.call("mouseclick");
                }
                // try {
                // 	(window as any).MouseUpEvent(input.key);
                // }
                // catch (e) { e; }
                Basik.Event.call("mouseup");
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
        constructor() {
        }
        static get debug() {
            return Input._debug;
        }
        static set debug(value) {
            Input._debug = value;
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
        static get event() {
            return Input._evt;
        }
        static get obj() {
            return Input._obj;
        }
    }
    Input._debug = false;
    Input._evt = new input.EventHandler();
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
