"use strict";
function logError(msg) {
    throw new Error(msg);
}
window.onload = () => {
    var _a;
    let canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    let s = shape
        .segment(50, 50)
        .position(new shape.Point(50, 0));
    shape.addShape(s.addShape(shape
        .segment(50, 0)
        .position(new shape.Point(50, 50))));
    let ctx = (_a = canvas.getContext("2d")) !== null && _a !== void 0 ? _a : (() => { throw new Error("Failed to get 2D context"); })();
    document.body.appendChild(canvas);
    shape.update();
    shape.render(ctx);
    s.scale(new shape.Point(2, 2));
    s.rotation(10);
    shape.update();
    shape.render(ctx);
    // shape.root.trans.scale.x = 2;
    // render(0);
};
var shape;
(function (shape) {
    /**
 * Simple Point Object
 * For simplicity this will not exposed
 */
    class PointObj {
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
    shape.PointObj = PointObj;
    /**
     * Point with local and global Info
     */
    class TPoint {
        constructor(x = 0, y = 0) {
            this.localPos = new shape.Point();
            this.globalPos = new shape.Point();
            this.localPos.x = x;
            this.localPos.y = y;
            this.globalPos.x = x;
            this.globalPos.y = y;
        }
    }
    shape.TPoint = TPoint;
})(shape || (shape = {}));
///<reference path="./basePoint.ts"/>
var shape;
(function (shape) {
    /**
     * Extended Point Obj
     */
    class Point {
        constructor(x = 0, y = 0) {
            this.obj = new shape.PointObj();
            this.obj.x = x;
            this.obj.y = y;
        }
        clone() {
            return new Point(this.x, this.y);
        }
        copyFrom(src) {
            this.x = src.x;
            this.y = src.y;
        }
        rotateRel(src, rot) {
            this.rotateRelXY(this.x, this.y, src.x, src.y, rot);
        }
        rotateRelXY(x = 0, y = 0, xt = 0, yt = 0, deg = 0) {
            let xr = x - xt;
            let yr = y - yt;
            let x1 = 0;
            let y1 = 0;
            deg *= Point.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            Point.result.x = x1 + xt;
            Point.result.y = y1 + yt;
        }
        position(p) {
            this.posXY(p.x, p.y);
        }
        posXY(x, y) {
            this.obj.x = x;
            this.obj.y = y;
        }
        move(p) {
            this.moveXY(p.x, p.y);
        }
        moveXY(x, y) {
            this.obj.x += x;
            this.obj.y += y;
        }
        scaleXY(x, y) {
            this.obj.x *= x;
            this.obj.y *= y;
        }
        scale(p) {
            this.scaleXY(p.x, p.y);
        }
        applyTrans(trans, c) {
            this.scale(trans.scale);
            this.move(trans.pos);
            this.rotateRel(c, trans.rot);
        }
        get x() {
            return this.obj.x;
        }
        set x(value) {
            this.obj.x = value;
        }
        get y() {
            return this.obj.y;
        }
        set y(value) {
            this.obj.y = value;
        }
    }
    Point.DEG2RAD = Math.PI / 180.0;
    Point.result = new Point();
    shape.Point = Point;
})(shape || (shape = {}));
///<reference path="./Point.ts"/>
var shape;
(function (shape) {
    class Trans {
        constructor() {
            this.pos = new shape.Point();
            this.scale = new shape.Point(1, 1);
            this.center = new shape.Point();
            this._rot = 0;
        }
        mergeWith(target) {
            let t = this.clone();
            t.pos.move(target.pos);
            t.scale.scale(target.scale);
            t.rot += target.rot;
            return t;
        }
        clone() {
            let t = new Trans();
            t.pos.copyFrom(this.pos);
            t.scale.copyFrom(this.scale);
            t.center.copyFrom(this.center);
            t.rot = this.rot;
            return t;
        }
        get rot() {
            return this._rot;
        }
        set rot(value) {
            this._rot = value;
        }
    }
    shape.Trans = Trans;
    let _defTrans = new Trans();
    function defTrans() {
        return _defTrans;
    }
    shape.defTrans = defTrans;
})(shape || (shape = {}));
///<reference path="./Trans.ts"/>
var shape;
(function (shape) {
    /**
     * Empty shape
     */
    class Shape {
        constructor(w = 10, h = 10) {
            this.vs = [];
            this.trans = new shape.Trans();
            this.childs = [];
            this._parent = null;
            this._w = 0;
            this._h = 0;
            this._w = w;
            this._h = h;
            Shape.shapes.push(this);
        }
        get parent() {
            return this._parent;
        }
        set parent(value) {
            this._parent = value;
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
        addShape(c) {
            this.childs.push(c);
            return this;
        }
        /**
         *
         * @param pt parent transform info
         */
        update(pt, parentPos) {
            pt = pt ? pt : shape.defTrans();
            console.group("update");
            //merge trans from parent to local
            let mTrans = this.trans.mergeWith(pt);
            let firstPoint;
            console.log("this", this);
            console.log("this trans", this.trans.clone());
            console.log("merged trans ", mTrans.clone());
            this.vs.forEach((item, idx) => {
                console.group("update item");
                console.log("idx", idx, "item", item.globalPos.clone());
                //reset position
                item.globalPos.position(item.localPos);
                if (idx == 0) {
                    console.group("first point");
                    console.log("initial", item.globalPos.clone().obj);
                    firstPoint = item;
                    let pos = this.trans.pos.clone();
                    console.log("trans pos", pos.clone().obj);
                    pos.scale(pt.scale);
                    console.log("trans pos scaled", pos.clone().obj);
                    //update origin position relative to parent trans
                    item.globalPos.position(parentPos);
                    console.log("parent pos", item.globalPos.clone().obj);
                    item.globalPos.move(pos);
                    console.log("move ", item.globalPos.clone().obj);
                    //scale
                    // item.global.scale(mTrans.scale);
                    // console.log("scale ", item.global.clone().obj);
                    // console.log("trans scale ", pt.scale.clone().obj);
                    //update rot
                    item.globalPos.rotateRel(parentPos, pt.rot);
                    item.globalPos.position(shape.Point.result);
                    console.log("rotate ", item.globalPos.clone().obj);
                    console.log("parent rotation ", pt.rot);
                    console.groupEnd();
                }
                else {
                    console.log("next point");
                    console.log("initial ", item.globalPos.clone());
                    let p = this.vs[0];
                    //position
                    let pos = item.globalPos;
                    pos.scale(mTrans.scale);
                    console.log("scaled ", item.globalPos.clone());
                    pos.move(p.globalPos);
                    console.log("move ", item.globalPos.clone());
                    //scale
                    //item.globalPos.scale(mTrans.scale);
                    //console.log("scale ", item.globalPos.clone());
                    //rotation
                    item.globalPos.rotateRel(p.globalPos, mTrans.rot);
                    item.globalPos.position(shape.Point.result);
                }
                console.log("item after trans", item.globalPos.clone());
                console.groupEnd();
                //children
            });
            //update child
            this.childs.forEach((item) => {
                item.update(mTrans, firstPoint ? firstPoint.globalPos : new shape.Point());
            });
            console.groupEnd();
        }
        render(ctx, single = true) {
            // this.update();
            ctx;
            single;
            this.childs.forEach((item) => {
                item.render(ctx, single);
            });
        }
        position(p) {
            this.trans.pos.copyFrom(p);
            return this;
        }
        scale(p) {
            this.trans.scale.copyFrom(p);
            return this;
        }
        rotation(n) {
            this.trans.rot = n;
        }
    }
    Shape.shapes = [];
    shape.Shape = Shape;
    var _root = new Shape(0, 0);
    function root() {
        return _root;
    }
    shape.root = root;
    function update() {
        _root.update(shape.defTrans(), new shape.Point());
    }
    shape.update = update;
    function render(ctx) {
        _root.render(ctx);
    }
    shape.render = render;
    function addShape(s) {
        return _root.addShape(s);
    }
    shape.addShape = addShape;
})(shape || (shape = {}));
///<reference path="./shape.ts"/>
var shape;
(function (shape) {
    /**
     * Segment
     */
    class Segment extends shape.Shape {
        constructor(w = 10, h = 10) {
            super(w, h);
            this.vs.push(new shape.TPoint());
            this.vs.push(new shape.TPoint(w, h));
        }
        render(ctx, single = true) {
            if (single)
                ctx.beginPath();
            ctx.moveTo(this.vs[0].globalPos.x, this.vs[0].globalPos.y);
            ctx.lineTo(this.vs[1].globalPos.x, this.vs[1].globalPos.y);
            if (single)
                ctx.stroke();
            this.childs.forEach((item) => {
                item.render(ctx);
            });
        }
    }
    function segment(w = 10, h = 10) {
        return new Segment(w, h);
    }
    shape.segment = segment;
})(shape || (shape = {}));
