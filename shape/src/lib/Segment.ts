///<reference path="./shape.ts"/>
namespace shape {

    /**
     * Segment
     */
    class Segment extends Shape {

        constructor(w: number = 10, h: number = 10) {
            super(w, h);
            this.vs.push(new TPoint());
            this.vs.push(new TPoint(w, h));
        }

        render(ctx: CanvasRenderingContext2D, single: boolean = true) {
            if (single) ctx.beginPath();
            ctx.moveTo(this.vs[0].globalPos.x, this.vs[0].globalPos.y);
            ctx.lineTo(this.vs[1].globalPos.x, this.vs[1].globalPos.y);
            if (single) ctx.stroke();

            this.childs.forEach((item) => {
                item.render(ctx);
            })
        }
    }

    export function segment(w: number = 10, h: number = 10): Segment {
        return new Segment(w, h);
    }
}