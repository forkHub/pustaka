"use strict";
var Basik;
(function (Basik) {
    class Graphic {
        static get autoScale() {
            return Basik.G._autoScale;
        }
        static set autoScale(value) {
            Basik.G._autoScale = value;
        }
        // static Pause() {
        // 	debugger;
        // 	// this.canvasAktif.canvas.getcon
        // }
        static handleWindowResize() {
            if (!Basik.G._autoScale)
                return;
            // console.debug('window on resize');
            let canvas = Basik.G.canvas;
            let cp = Basik.G.canvas.width;
            let cl = Basik.G.canvas.height;
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
            // console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
        }
        static buildCanvas(w, h) {
            let canvas;
            canvas = document.body.querySelector('canvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                document.body.appendChild(canvas);
                canvas.width = w;
                canvas.height = h;
            }
            return canvas;
        }
        static Canvas() {
            return Basik.G.canvas;
        }
        static MainCanvas() {
            return Basik.G.mainCanvas;
        }
        static SetCanvas(canvas) {
            Basik.G.mainCanvas = canvas;
        }
        static Graphics(w = 320, h = 240, canvas = null, fullScreen = true) {
            if (!canvas)
                canvas = Basik.G.buildCanvas(w, h);
            Basik.G.mainCanvas = canvas;
            Basik.G.canvas = canvas;
            Basik.G.autoScale = fullScreen;
            console.log('inisialisasi');
            Basik.G.setupMainCanvas(w, h, Basik.G.autoScale);
            Basik.In.init(Basik.G.canvas);
            // if (Graphic.skalaOtomatis) {
            window.addEventListener("resize", () => {
                Basik.G.handleWindowResize();
            });
            function update() {
                // let updater = (window as any)["UpdateEvent"];
                // if (typeof updater === "function") {
                // 	updater();
                // }
                Basik.Event.call("update");
                window.requestAnimationFrame(update);
            }
            window.requestAnimationFrame(update);
            setTimeout(() => {
                Basik.G.handleWindowResize();
            }, 100);
            Basik.G.handleWindowResize();
            NoStroke();
            Cls();
        }
        static setupMainCanvas(p = 320, l = 240, fullScreen) {
            Basik.G.mainCanvas.width = p;
            Basik.G.mainCanvas.height = l;
            if (fullScreen) {
                Basik.G.mainCanvas.style.width = p + 'px';
                Basik.G.mainCanvas.style.padding = '0px';
                Basik.G.mainCanvas.style.margin = '0px';
            }
        }
        static Cls() {
            let ctx = Basik.G.canvas.getContext('2d');
            ctx.clearRect(0, 0, (Basik.G.canvas.width), (Basik.G.canvas.height));
        }
        static get red() {
            return Basik.G._merah;
        }
        static set red(value) {
            Basik.G._merah = value;
        }
        static get green() {
            return Basik.G._hijau;
        }
        static set green(value) {
            Basik.G._hijau = value;
        }
        static get blue() {
            return Basik.G._biru;
        }
        static set blue(value) {
            Basik.G._biru = value;
        }
        static get alpha() {
            return Basik.G._transparan;
        }
        static set alpha(value) {
            Basik.G._transparan = value;
        }
    }
    Graphic._autoScale = true;
    Graphic._merah = 0;
    Graphic._hijau = 0;
    Graphic._biru = 0;
    Graphic._transparan = 0;
    Basik.Graphic = Graphic;
    Basik.G = Graphic;
})(Basik || (Basik = {}));
