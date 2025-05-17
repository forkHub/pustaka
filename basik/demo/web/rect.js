"use strict";
window.onload = () => {
    Graphics(640, 480);
    class Rect {
        constructor() {
            this._c = Basik.Point.create();
            this._p = Basik.Point.create();
            this.cImg = LoadAnimImage("./web/balls.png", 32, 32);
            this.pImage = LoadAnimImage("./web/balls.png", 32, 32);
            this.dots = [
                Basik.Point.create(),
                Basik.Point.create(),
                Basik.Point.create(),
                Basik.Point.create(),
            ];
        }
        updateData() {
            let radius = this.pImage.x - this._c.x;
            radius; //TODO
            this.dots;
        }
        update() {
            DrawImage(this.cImg);
            DrawImage(this.pImage);
        }
        get p() {
            return this._p;
        }
        get c() {
            return this._c;
        }
    }
    let r = new Rect();
    function Update() {
        Cls();
        r.update();
        requestAnimationFrame(Update);
    }
    requestAnimationFrame(Update);
};
