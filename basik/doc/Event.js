"use strict";
var Basik;
(function (Basik) {
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
        static addListener(type, f) {
            let e = new Event(type.toLowerCase(), f);
            Event.list.push(e);
            return e;
        }
        static call(type) {
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
