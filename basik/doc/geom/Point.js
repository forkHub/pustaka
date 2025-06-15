"use strict";
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
