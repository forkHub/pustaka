"use strict";
var Basik;
(function (Basik) {
    class Keyboard {
        static get key() {
            return Keyboard._key;
        }
        static set key(value) {
            Keyboard._key = value;
        }
        static init() {
            window.addEventListener("keydown", (e) => {
                // try {
                // 	(window as any).KeyDownEvent(e.key);
                // }
                // catch (e) { e; }
                Keyboard.key = e.key;
                Basik.Event.call("keydown");
            });
            window.addEventListener("keyup", (e) => {
                // try {
                // 	(window as any).KeyUpEvent(e.key);
                // }
                // catch (e) { e; }
                Keyboard.key = e.key;
                Basik.Event.call("keyup");
            });
        }
    }
    Basik.Keyboard = Keyboard;
})(Basik || (Basik = {}));
