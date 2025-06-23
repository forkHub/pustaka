"use strict";
var Basik;
(function (Basik) {
    class ImgImpl {
        static CreateImage(width, height) {
            let h = new Basik.Image();
            h.canvas = document.createElement('canvas');
            h.canvas.width = width;
            h.canvas.height = height;
            h.frameH = height;
            h.frameW = width;
            h.width = width;
            h.height = height;
            h.load = true;
            h.img = document.createElement('img');
            Basik.Ip.register(h, h.url, h.tipeDrag);
            return h;
        }
        static MuatAnimasi(url, pf, lf, tipeDrag = 0) {
            tipeDrag;
            let canvas = document.createElement('canvas');
            canvas;
            let gbr = new Basik.Image(url);
            gbr.isAnim = true;
            gbr.frameW = pf;
            gbr.frameH = lf;
            gbr.width = pf;
            gbr.height = lf;
            return gbr;
            // return Ip.muatAnimAsyncCanvas(url, pf, lf, canvas);
            // return Ip.muatAnimAsync(url, pf, lf);
            // return Ip.register(img, url, tipeDrag);
        }
        static register(image, url, tipeDrag) {
            let hasil;
            hasil = image;
            hasil.tipeDrag = tipeDrag;
            hasil.url = url;
            Basik.Ip.daftar.push(hasil);
            return hasil;
        }
        static free(img) {
            for (let i = 0; i < this.daftar.length; i++) {
                if (this.daftar[i] == img) {
                    img.canvas = null;
                    img.img = null;
                    Basik.Ktk.destroy(img.rect);
                    this.daftar.splice(i, 1);
                    return;
                }
            }
        }
        static Muat(url) {
            return new Basik.Image(url);
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
        static Draw(img) {
            if (img.tilable) {
                Basik.Ip.gambarUbin(img, img.x, img.y, img.frame);
            }
            else {
                Basik.Ip.DrawSingle(img, img.x, img.y, img.frame);
            }
        }
        static DrawSingle(gbr, x = 0, y = 0, frame = 0) {
            let ctx = Basik.G.Canvas().getContext('2d');
            let jmlH = 0;
            let frameX = 0;
            let frameY = 0;
            let imgW = 0;
            // let imgH: number = 0;
            if (gbr.load == false)
                return;
            if (!gbr.url) {
                imgW = gbr.width;
                // imgH = gbr.height;
            }
            else {
                imgW = gbr.img.naturalWidth;
                // imgH = gbr.img.naturalHeight;
            }
            gbr.ctrIdx = Basik.Image.ctrDraw++;
            frame = Math.floor(frame);
            jmlH = Math.floor(imgW / gbr.frameW);
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
            if (gbr.rotation != 0) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(gbr.rotation * (Math.PI / 180));
                drawImpl(-gbr.handleX, -gbr.handleY);
                ctx.restore();
            }
            else {
                ctx.save();
                drawImpl(x2, y2);
                ctx.restore();
            }
            function drawImpl(dx, dy) {
                //TODO: pindahin ke depan
                dx -= Basik.Camera.x;
                dy -= Basik.Camera.y;
                ctx.globalAlpha = gbr.alpha / 100;
                ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, Math.floor(dx), Math.floor(dy), w2, h2);
            }
        }
        static resetRect(img) {
            let rect = img.rect;
            let p;
            p = rect.vs[0];
            p.x = 0;
            p.y = 0;
            p = rect.vs[1];
            p.x = img.frameW - 1;
            p.y = 0;
            p = rect.vs[2];
            p.x = img.frameW - 1;
            p.y = img.frameH - 1;
            p = rect.vs[3];
            p.x = 0;
            p.y = img.frameH - 1;
        }
        static rectToImageTf(image, x, y) {
            let rect = image.rect;
            let p;
            let x2 = image.width - 1;
            let y2 = image.height - 1;
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
            Basik.Ktk.rotate(rect, image.rotation, x, y, false);
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
