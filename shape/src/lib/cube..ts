///<reference path="./shape.ts"/>
namespace shape {

    /**
     * Segment
     */
    class CubeCurve extends Shape {

        constructor(x: number = 10, y: number = 10, cpx: number = 5, cpy: number = 5) {
            super(x, y);
            this.vs.push(new TPoint());
            this.vs.push(new TPoint(cpx / 2, cpy / 2));
            this.vs.push(new TPoint(x, 0));
            this.vs.push(new TPoint((x - cpx) / 2 + cpx, (y - cpy) / 2 - cpy));
            this.vs.push(new TPoint(x, y));
        }

        render(ctx: CanvasRenderingContext2D) {
            ctx.moveTo(this.vs[0].globalPos.x, this.vs[0].globalPos.y);
            ctx.bezierCurveTo(
                this.vs[1].globalPos.x, this.vs[1].globalPos.y,
                this.vs[2].globalPos.x, this.vs[2].globalPos.y,
                this.vs[3].globalPos.x, this.vs[3].globalPos.y
            )
        }
    }

    export function curve(w: number = 10, h: number = 10): CubeCurve {
        return new CubeCurve(w, h);
    }
}