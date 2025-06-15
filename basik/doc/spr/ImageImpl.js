"use strict";
var Basik;
(function (Basik) {
    class ImgImpl {
        static CreateImage(width, height) {
            let h = new Basik.ImgObj();
            h.canvas = document.createElement('canvas');
            h.canvas.width = width;
            h.canvas.height = height;
            h.ctx = h.canvas.getContext('2d');
            h.frameH = height;
            h.frameW = width;
            h.panjangDiSet = true;
            h.lebarDiSet = true;
            h.load = true;
            h.img = document.createElement('img');
            Basik.Ip.register(h, h.url, h.tipeDrag);
            return h;
        }
        static MuatAnimasi(url, pf, lf, tipeDrag = 0) {
            let img = Basik.Ip.muatAnimAsync(url, pf, lf);
            return Basik.Ip.register(img, url, tipeDrag);
        }
        static GambarSemua() {
            for (let i = 0; i < Basik.Ip.daftar.length; i++) {
                let item = Basik.Ip.daftar[i];
                Basik.Ip.Draw(item);
            }
        }
        static muatAnimasiAsyncKanvas(url, pf, lf, canvas, tipeDrag) {
            let img = Basik.Ip.muatAnimAsyncCanvas(url, pf, lf, canvas);
            return Basik.Ip.register(img, url, tipeDrag);
        }
        static muatAsyncBerbagiKanvas(url, canvas, tipeDrag) {
            let img = Basik.Ip.muatAsyncKanvas(url, canvas, () => { });
            return Basik.Ip.register(img, url, tipeDrag);
        }
        static register(image, url, tipeDrag) {
            let hasil;
            hasil = image;
            hasil.tipeDrag = tipeDrag;
            hasil.url = url;
            if (hasil.dragable) {
                if (hasil.tipeDrag == 0) {
                    hasil.tipeDrag = 1;
                }
            }
            Basik.Ip.daftar.push(hasil);
            return hasil;
        }
        static Muat(url, tipeDrag = 0, onload) {
            if (!onload)
                onload = () => { };
            let img = Basik.Ip.muatAsync(url, onload);
            let spr = Basik.Ip.register(img, url, tipeDrag);
            return spr;
        }
        static tabrakan(gbr1, x1, y1, gbr2, x2, y2) {
            Basik.Ip.resetRect(gbr1);
            Basik.Ip.rectToImageTf(gbr1, x1, y1);
            Basik.Ip.resetRect(gbr2);
            Basik.Ip.rectToImageTf(gbr2, x2, y2);
            return Basik.Ktk.collide(gbr1.rect, gbr2.rect);
        }
        ;
        static dotInsideImage(gbr1, x1, y1, x2, y2) {
            Basik.Ip.resetRect(gbr1);
            Basik.Ip.rectToImageTf(gbr1, x1, y1);
            return Basik.Ktk.collideDot(gbr1.rect, x2, y2);
        }
        ;
        static muatAnimAsync(url, fw, fh) {
            let canvas = document.createElement('canvas');
            return Basik.Ip.muatAnimAsyncCanvas(url, fw, fh, canvas);
        }
        static muatAnimAsyncCanvas(url, fw, fh, canvas) {
            let img = document.createElement('img'); //;
            let ctx = canvas.getContext('2d');
            let rect;
            rect = Basik.Ktk.buat(0, 0, fw, fh);
            let gbr = new Basik.ImgObj();
            gbr.isAnim = true;
            gbr.img = img;
            gbr.width = img.naturalWidth;
            gbr.height = img.naturalHeight;
            gbr.frameH = fh;
            gbr.frameW = fw;
            gbr.isAnim = true;
            gbr.handleX = 0;
            gbr.handleY = 0;
            gbr.rotasi = 0;
            gbr.alpha = 100;
            gbr.ctx = ctx;
            gbr.canvas = canvas;
            gbr.rect = rect;
            gbr.load = false;
            gbr.panjangDiSet = false;
            gbr.lebarDiSet = false;
            // let gbr: IGambar = {
            // 	img: img,
            // 	panjang: img.naturalWidth,
            // 	lebar: img.naturalHeight,
            // 	frameH: fh,
            // 	frameW: fw,
            // 	isAnim: true,
            // 	handleX: 0,
            // 	handleY: 0,
            // 	rotasi: 0,
            // 	alpha: 1,
            // 	ctx: ctx,
            // 	canvas: canvas,
            // 	rect: rect,
            // 	load: false,
            // 	panjangDiSet: false,
            // 	lebarDiSet: false
            // }
            img.onload = () => {
                imgOnLoad(img);
            };
            img.onerror = () => {
                console.warn('gagal load image, url ' + url);
            };
            let img2 = ha.be.cache.getGbr(url);
            if (img2) {
                imgOnLoad(img2);
            }
            else {
                img.src = url;
            }
            function imgOnLoad(img) {
                // console.log('img anim load ' + url);
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                gbr.load = true;
                if (!gbr.panjangDiSet) {
                    gbr.width = fw;
                    gbr.panjangDiSet = true;
                }
                if (!gbr.lebarDiSet) {
                    gbr.lebarDiSet = true;
                    gbr.height = fh;
                }
                ha.be.cache.setFile(url, img);
            }
            return gbr;
        }
        static muatAsync(url, onload) {
            let kanvas = document.createElement('canvas');
            return Basik.Ip.muatAsyncKanvas(url, kanvas, onload);
        }
        static def(img, ctx, canvas) {
            let rect;
            rect = Basik.Ktk.buat(0, 0, img.naturalWidth, img.naturalHeight);
            let gbr;
            gbr = new Basik.ImgObj();
            gbr.img = img;
            gbr.width = img.naturalWidth;
            gbr.height = img.naturalHeight;
            gbr.panjangDiSet = false;
            gbr.lebarDiSet = false;
            gbr.frameH = img.naturalHeight;
            gbr.frameW = img.naturalWidth;
            gbr.isAnim = false;
            gbr.handleX = 0;
            gbr.handleY = 0;
            gbr.rotasi = 0;
            gbr.alpha = 100;
            gbr.ctx = ctx;
            gbr.canvas = canvas;
            gbr.rect = rect;
            gbr.load = false;
            gbr.ctrIdx = 0;
            return gbr;
        }
        static muatAsyncKanvas(url, canvas, onload) {
            let img = document.createElement('img');
            let ctx = canvas.getContext('2d');
            let gbr;
            gbr = new Basik.ImgObj();
            gbr = Basik.Ip.def(img, ctx, canvas);
            img.onload = () => {
                onload();
                imgOnLoad(img);
            };
            img.onerror = () => {
                console.warn('gagal load image, url ' + url);
                imgOnLoadDefault();
            };
            let img2 = ha.be.cache.getGbr(url);
            if (img2) {
                imgOnLoad(img2);
            }
            else {
                img.src = url;
            }
            function imgOnLoad(imgP) {
                canvas.width = imgP.naturalWidth;
                canvas.height = imgP.naturalHeight;
                ctx.drawImage(imgP, 0, 0);
                gbr.rect = Basik.Ktk.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);
                gbr.load = true;
                gbr.img = imgP;
                if (!gbr.panjangDiSet) {
                    gbr.panjangDiSet = true;
                    gbr.width = imgP.naturalWidth;
                }
                if (!gbr.lebarDiSet) {
                    gbr.height = imgP.naturalHeight;
                    gbr.lebarDiSet = true;
                }
                gbr.frameH = imgP.naturalHeight;
                gbr.frameW = imgP.naturalWidth;
                ha.be.cache.setFile(url, imgP);
            }
            function imgOnLoadDefault() {
                console.log("img on load default");
                canvas.width = 32;
                canvas.height = 32;
                // ctx = canvas.getContext('2d');
                gbr.img = document.createElement('img');
                // ctx.drawImage(gbr.img, 0, 0);
                gbr.rect = Basik.Ktk.buat(0, 0, 32, 32);
                ctx.fillStyle = 'rgba(255, 255, 255, 100)';
                ctx.strokeStyle = 'rgba(255, 0, 0, 100)';
                ctx.beginPath();
                ctx.rect(0, 0, 32, 32);
                ctx.moveTo(0, 0);
                ctx.lineTo(31, 31);
                ctx.moveTo(0, 31);
                ctx.lineTo(31, 0);
                ctx.stroke();
                // ctx.setf
                // ctx.fillRect(0, 0, 32, 32);
                gbr.load = true;
                if (!gbr.panjangDiSet) {
                    gbr.panjangDiSet = true;
                    gbr.width = 32;
                }
                if (!gbr.lebarDiSet) {
                    gbr.height = 32;
                    gbr.lebarDiSet = true;
                }
                gbr.frameH = 32;
                gbr.frameW = 32;
                ha.be.cache.setFile(url, gbr.img);
            }
            // console.log(gbr);
            return gbr;
        }
        static gambarUbin(gbr, x = 0, y = 0, frame = 0) {
            let jmlH = 0;
            let jmlV = 0;
            if (gbr.load == false)
                return;
            let w2 = Math.floor(gbr.width);
            let h2 = Math.floor(gbr.height);
            while (x < 0) {
                x += w2;
            }
            while (x > 0) {
                x -= w2;
            }
            //posisi gambar dimulai dari sebelum titik 0,0
            while (y < 0) {
                y += h2;
            }
            while (y > 0) {
                y -= h2;
            }
            x -= w2;
            y -= h2;
            frame = Math.floor(frame);
            jmlH = Math.ceil((Basik.G.MainCanvas().width + Math.abs(x)) / w2);
            jmlV = Math.ceil((Basik.G.MainCanvas().height + Math.abs(y)) / h2);
            for (let i = 0; i < jmlH; i++) {
                for (let j = 0; j < jmlV; j++) {
                    Basik.Ip.DrawSingle(gbr, x + (i * w2), y + (j * h2), frame);
                }
            }
        }
        static AmbilPiksel(x = 0, y = 0) {
            try {
                let data = Basik.G.Canvas().getContext('2d').getImageData(x, y, 1, 1).data;
                let hasil = [];
                hasil.push(data[0]);
                hasil.push(data[1]);
                hasil.push(data[2]);
                hasil.push(data[3]);
                Basik.G.red = data[0];
                Basik.G.green = data[1];
                Basik.G.blue = data[2];
                Basik.G.alpha = data[3];
                // G.FillColor(G.merah, G.hijau, G.biru, G.alpha);
            }
            catch (e) {
                // console.error(e);
            }
            // return [0, 0, 0];
        }
        static SetPiksel(x = 0, y = 0) {
            Basik.G.Canvas().getContext('2d').fillRect(Math.floor(x), Math.floor(y), 1, 1);
        }
        static Draw(img, frame = 0) {
            if (img.tilable) {
                Basik.Ip.gambarUbin(img, img.x, img.y, frame);
            }
            else {
                Basik.Ip.DrawSingle(img, img.x, img.y, frame);
            }
        }
        static DrawSingle(gbr, x = 0, y = 0, frame = 0) {
            let ctx = Basik.G.Canvas().getContext('2d');
            let jmlH = 0;
            // let jmlV: number = 0;
            let frameX = 0;
            let frameY = 0;
            // let rect: IRect = img.rect;
            if (gbr.load == false)
                return;
            gbr.ctrIdx = Basik.ImgObj.ctrDraw++;
            frame = Math.floor(frame);
            jmlH = Math.floor(gbr.img.naturalWidth / gbr.frameW);
            // jmlV = Math.floor(gbr.img.naturalHeight / gbr.frameH);
            // console.log('jmlH ' + jmlH);
            // console.log('nw: ' + gbr.img.naturalWidth);
            // console.log('fw: ' + gbr.frameW);
            // debugger;
            frameX = (frame % jmlH);
            frameY = Math.floor(frame / jmlH);
            frameX *= gbr.frameW;
            frameY *= gbr.frameH;
            frameX = Math.floor(frameX);
            frameY = Math.floor(frameY);
            let x2 = Math.floor(x);
            let y2 = Math.floor(y);
            let w2 = Math.floor(gbr.width);
            let h2 = Math.floor(gbr.height);
            x2 -= (gbr.handleX);
            y2 -= (gbr.handleY);
            if (gbr.rotasi != 0) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(gbr.rotasi * (Math.PI / 180));
                // ctx.globalAlpha = gbr.alpha / 100;
                // ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, -gbr.handleX, -gbr.handleY, w2, h2);
                drawImpl(-gbr.handleX, -gbr.handleY);
                ctx.restore();
            }
            else {
                ctx.save();
                // ctx.globalAlpha = gbr.alpha / 100;
                // ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, x2, y2, w2, h2);
                drawImpl(x2, y2);
                ctx.restore();
            }
            function drawImpl(dx, dy) {
                ctx.globalAlpha = gbr.alpha / 100;
                ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, Math.floor(dx), Math.floor(dy), w2, h2);
                // console.group('draw image');
                // console.log("x:", x, "y:", y, "x2:", x2, "y2:", y2);
                // console.groupEnd();
            }
            // debugger;
        }
        // static ukuran(gbr: ImgObj, w: number = 32, h: number = 32): void {
        // 	gbr.panjang = w;
        // 	gbr.lebar = h;
        // 	gbr.panjangDiSet = true;
        // 	gbr.lebarDiSet = true;
        // }
        static resetRect(img) {
            let rect = img.rect;
            let p;
            p = rect.vs[0];
            p.x = 0;
            p.y = 0;
            p = rect.vs[1];
            p.x = img.frameW;
            p.y = 0;
            p = rect.vs[2];
            p.x = img.frameW;
            p.y = img.frameH;
            p = rect.vs[3];
            p.x = 0;
            p.y = img.frameH;
        }
        static rectToImageTf(image, x, y) {
            let rect = image.rect;
            let p;
            let x2 = image.width;
            let y2 = image.height;
            //scale
            p = rect.vs[1];
            p.x = x2;
            p.y = 0;
            p = rect.vs[2];
            p.x = x2;
            p.y = y2;
            p = rect.vs[3];
            p.x = 0;
            p.y = y2;
            //translate
            Basik.Ktk.translate(rect, x, y);
            Basik.Ktk.translate(rect, -image.handleX, -image.handleY);
            //rotate
            Basik.Ktk.rotate(rect, image.rotasi, x, y, false);
        }
        static AllImageLoaded() {
            for (let i = 0; i < Basik.Ip.daftar.length; i++) {
                let img = Basik.Ip.daftar[i];
                if (!img.load)
                    return false;
            }
            return true;
        }
    }
    ImgImpl.props = [];
    ImgImpl.daftar = [];
    Basik.ImgImpl = ImgImpl;
    Basik.Ip = ImgImpl;
})(Basik || (Basik = {}));
