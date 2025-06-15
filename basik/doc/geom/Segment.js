"use strict";
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
            // let deg: number = Sg.deg(seg2);
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
        // static getYAtIdx(seg: Seg, idx: number): number {
        // 	return seg.A.y + (idx * Sg.vecJ(seg));
        // }
        static vecI(seg) {
            return seg.B.x - seg.A.x;
        }
        // static vecJ(seg: Seg): number {
        // 	return seg.B.y - seg.A.y;
        // }
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
