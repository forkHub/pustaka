"use strict";
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
