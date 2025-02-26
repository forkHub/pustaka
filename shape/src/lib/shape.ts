///<reference path="./Trans.ts"/>
namespace shape {

    /**
     * Empty shape
     */
    export class Shape {
        static readonly shapes: Shape[] = [];

        readonly vs: TPoint[] = [];
        readonly trans: Trans = new Trans();
        readonly childs: Shape[] = [];

        protected _parent: Shape | null = null;
        protected _w: number = 0;
        protected _h: number = 0;

        protected get parent(): Shape | null {
            return this._parent;
        }
        protected set parent(value: Shape | null) {
            this._parent = value;
        }

        public get w(): number {
            return this._w;
        }
        public set w(value: number) {
            this._w = value;
        }
        public get h(): number {
            return this._h;
        }
        public set h(value: number) {
            this._h = value;
        }

        constructor(w: number = 10, h: number = 10) {
            this._w = w;
            this._h = h;
            Shape.shapes.push(this);
        }

        addShape(c: Shape): Shape {
            this.childs.push(c);
            return this;
        }

        /**
         * 
         * @param pt parent transform info
         */
        update(pt: Trans, parentPos: Point) {
            pt = pt ? pt : defTrans();
            console.group("update");

            //merge trans from parent to local
            let mTrans: Trans = this.trans.mergeWith(pt);
            let firstPoint: TPoint | null;

            console.log("this", this);
            console.log("this trans", this.trans.clone());
            console.log("merged trans ", mTrans.clone());

            this.vs.forEach((item: TPoint, idx: number) => {

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
                    item.globalPos.position(Point.result);

                    console.log("rotate ", item.globalPos.clone().obj);
                    console.log("parent rotation ", pt.rot);
                    console.groupEnd();

                } else {
                    console.log("next point");
                    console.log("initial ", item.globalPos.clone());
                    let p: TPoint = this.vs[0];

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
                    item.globalPos.position(Point.result);
                }

                console.log("item after trans", item.globalPos.clone());
                console.groupEnd();

                //children
            })

            //update child
            this.childs.forEach((item) => {
                item.update(mTrans, firstPoint ? firstPoint.globalPos : new Point());
            })

            console.groupEnd();
        }

        render(ctx: CanvasRenderingContext2D, single: boolean = true) {
            // this.update();
            ctx;
            single;
            this.childs.forEach((item) => {
                item.render(ctx, single);
            })
        }

        position(p: Point): Shape {
            this.trans.pos.copyFrom(p);
            return this;
        }

        scale(p: Point): Shape {
            this.trans.scale.copyFrom(p);
            return this;
        }

        rotation(n: number) {
            this.trans.rot = n;
        }
    }

    var _root: Shape = new Shape(0, 0);
    export function root(): Shape {
        return _root;
    }

    export function update() {
        _root.update(defTrans(), new Point());
    }

    export function render(ctx: CanvasRenderingContext2D) {
        _root.render(ctx);
    }

    export function addShape(s: Shape): Shape {
        return _root.addShape(s);
    }
} 