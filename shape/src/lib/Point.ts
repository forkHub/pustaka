///<reference path="./basePoint.ts"/>
namespace shape {
    /**
     * Extended Point Obj
     */
    export class Point {
        static readonly DEG2RAD: number = Math.PI / 180.0;
        static readonly result: Point = new Point();
        readonly obj: PointObj = new PointObj();

        constructor(x: number = 0, y: number = 0) {
            this.obj.x = x;
            this.obj.y = y;
        }

        clone(): Point {
            return new Point(this.x, this.y);
        }

        copyFrom(src: Point) {
            this.x = src.x;
            this.y = src.y;
        }

        rotateRel(src: Point, rot: number): void {
            this.rotateRelXY(this.x, this.y, src.x, src.y, rot);
        }

        rotateRelXY(x: number = 0, y: number = 0, xt: number = 0, yt: number = 0, deg: number = 0): void {
            let xr: number = x - xt;
            let yr: number = y - yt;
            let x1: number = 0;
            let y1: number = 0;

            deg *= Point.DEG2RAD;

            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);

            Point.result.x = x1 + xt;
            Point.result.y = y1 + yt;
        }

        position(p: Point): void {
            this.posXY(p.x, p.y);
        }

        private posXY(x: number, y: number): void {
            this.obj.x = x;
            this.obj.y = y;
        }

        move(p: Point): void {
            this.moveXY(p.x, p.y);
        }

        moveXY(x: number, y: number): void {
            this.obj.x += x;
            this.obj.y += y;
        }

        private scaleXY(x: number, y: number): void {
            this.obj.x *= x;
            this.obj.y *= y;
        }

        scale(p: Point): void {
            this.scaleXY(p.x, p.y);
        }

        applyTrans(trans: Trans, c: Point): void {
            this.scale(trans.scale);
            this.move(trans.pos);
            this.rotateRel(c, trans.rot);
        }

        public get x(): number {
            return this.obj.x;
        }
        public set x(value: number) {
            this.obj.x = value;
        }
        public get y(): number {
            return this.obj.y;
        }
        public set y(value: number) {
            this.obj.y = value;
        }
    }
}