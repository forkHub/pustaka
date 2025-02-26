"use strict";
var shape;
(function (shape) {
    class Trans {
        constructor() {
            this.pos = new Point();
            this.scale = new Point();
            this._rot = 0;
        }
        get rot() {
            return this._rot;
        }
        set rot(value) {
            this._rot = value;
        }
    }
    class Point {
        constructor(x = 0, y = 0) {
            this._x = 0;
            this._y = 0;
            this._x = 0;
            this._y = 0;
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
    }
    class TPoint {
        constructor(x = 0, y = 0) {
            this.local = new Point();
            this.global = new Point();
            this.local.x = x;
            this.local.y = y;
            this.global.x = x;
            this.global.y = y;
        }
    }
    class Segment {
        constructor(w = 10, h = 0) {
            this.vs = [];
            this.trans = new Trans();
            this._w = 10;
            this._h = 10;
            this.vs.push(new TPoint());
            this.vs.push(new TPoint(w, h));
        }
        get w() {
            return this._w;
        }
        set w(value) {
            this._w = value;
        }
        get h() {
            return this._h;
        }
        set h(value) {
            this._h = value;
        }
        render(ctx) {
            if (!ctx)
                throw Error("ctx is null");
            ctx.beginPath();
            ctx.moveTo(this.vs[0].global.x, this.vs[0].global.y);
            ctx.lineTo(this.vs[1].global.y, this.vs[1].global.y);
            ctx.stroke();
        }
    }
    shape.Segment = Segment;
})(shape || (shape = {}));
