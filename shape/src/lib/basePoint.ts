namespace shape {
    /**
 * Simple Point Object
 * For simplicity this will not exposed
 */
    export class PointObj {
        constructor(x: number = 0, y: number = 0) {
            this._x = 0;
            this._y = 0;
        }

        private _x: number = 0;
        public get x(): number {
            return this._x;
        }
        public set x(value: number) {
            this._x = value;
        }
        private _y: number = 0;
        public get y(): number {
            return this._y;
        }
        public set y(value: number) {
            this._y = value;
        }
    }

    /**
     * Point with local and global Info
     */
    export class TPoint {
        constructor(x: number = 0, y: number = 0) {
            this.localPos.x = x;
            this.localPos.y = y;
            this.globalPos.x = x;
            this.globalPos.y = y;
        }

        readonly localPos: Point = new Point();
        readonly globalPos: Point = new Point();
    }
}