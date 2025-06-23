"use strict";
var Basik;
(function (Basik) {
    let Evt;
    (function (Evt) {
        Evt["MOUSE_DOWN"] = "mousedown";
        Evt["MOUSE_UP"] = "mouseup";
        Evt["MOUSE_MOVE"] = "mousemove";
        Evt["MOUSE_TAP"] = "mousetap";
        Evt["MOUSE_START_DRAG"] = "mousestartdrag";
        Evt["MOUSE_END_DRAG"] = "mouseenddrag";
        Evt["KEYB_DOWN"] = "keybdown";
        Evt["KEYB_UP"] = "keybup";
    })(Evt = Basik.Evt || (Basik.Evt = {}));
    class Event {
        constructor(type, f) {
            this._type = '';
            this._type = type;
            this._f = f;
            //todo: filter
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
            // console.log(f);
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
