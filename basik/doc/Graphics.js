"use strict";
var Basik;
(function (Basik) {
    class Graphic {
        static handleWindowResize() {
            if (!Basik.G._autoScale)
                return;
            let canvas = Basik.G.drawCanvas;
            let cp = Basik.G.drawCanvas.width;
            let cl = Basik.G.drawCanvas.height;
            let wp = window.innerWidth;
            let wl = window.innerHeight;
            let ratio = Math.min((wp / cp), (wl / cl));
            let cp2 = Math.floor(cp * ratio);
            let cl2 = Math.floor(cl * ratio);
            canvas.style.position = 'fixed';
            canvas.style.zIndex = '1';
            canvas.style.width = cp2 + 'px';
            canvas.style.height = cl2 + 'px';
            canvas.style.top = ((wl - cl2) / 2) + 'px';
            canvas.style.left = ((wp - cp2) / 2) + 'px';
        }
        static buildCanvas(w, h) {
            let canvas;
            canvas = document.body.querySelector('canvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                document.body.appendChild(canvas);
                if (w)
                    canvas.width = w;
                if (h)
                    canvas.height = h;
            }
            return canvas;
        }
        static Canvas() {
            return Basik.G.drawCanvas;
        }
        static MainCanvas() {
            return Basik.G.mainCanvas;
        }
        static SetCanvas(canvas) {
            Basik.G.drawCanvas = canvas;
        }
        static initComp() {
            Basik.In.init(Basik.G.drawCanvas);
            Basik.Keyboard.init();
            Basik.Camera.init();
            Basik.sprInt.init();
        }
        static Graphics(w, h, canvas = null, mode = 1) {
            console.log('init');
            if (!canvas)
                canvas = Basik.G.buildCanvas(w, h);
            Basik.G.mainCanvas = canvas;
            Basik.G.drawCanvas = canvas;
            Basik.G._autoScale = (mode == 1);
            Basik.G.setupMainCanvas(w, h, mode);
            Basik.G.initComp();
            function update() {
                // let updater = (window as any)["UpdateEvent"];
                // if (typeof updater === "function") {
                // 	updater();
                // }
                Basik.Event.dispatchEvent("update");
                window.requestAnimationFrame(update);
            }
            window.requestAnimationFrame(update);
            setTimeout(() => {
                Basik.G.handleWindowResize();
            }, 100);
            Basik.G.handleWindowResize();
            // NoStroke();
            Cls();
        }
        static setupMainCanvas(p, l, mode = 1) {
            Basik.G.mainCanvas.width = p;
            Basik.G.mainCanvas.height = l;
            if (mode == 1) {
                Basik.G.mainCanvas.style.width = p + 'px';
                Basik.G.mainCanvas.style.padding = '0px';
                Basik.G.mainCanvas.style.margin = '0px';
            }
            // if (Graphic.skalaOtomatis) {
            window.addEventListener("resize", () => {
                Basik.G.handleWindowResize();
            });
        }
        static Cls() {
            let ctx = Basik.G.drawCanvas.getContext('2d');
            ctx.clearRect(0, 0, (Basik.G.drawCanvas.width), (Basik.G.drawCanvas.height));
        }
        static get red() {
            return Basik.G._red;
        }
        static set red(value) {
            Basik.G._red = value;
        }
        static get green() {
            return Basik.G._green;
        }
        static set green(value) {
            Basik.G._green = value;
        }
        static get blue() {
            return Basik.G._blue;
        }
        static set blue(value) {
            Basik.G._blue = value;
        }
        static get alpha() {
            return Basik.G._transparan;
        }
        static set alpha(value) {
            Basik.G._transparan = value;
        }
    }
    Graphic._autoScale = true;
    Graphic._red = 0;
    Graphic._green = 0;
    Graphic._blue = 0;
    Graphic._transparan = 0;
    Basik.Graphic = Graphic;
    Basik.G = Graphic;
})(Basik || (Basik = {}));
