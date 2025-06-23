"use strict";
var Basik;
(function (Basik) {
    /**
     * Image Object
     */
    class Image {
        /**
         * @typedef {Object} Image
         * @property {number} x - x position
         * @property {number} y - y position
         * @property {number} rotation - rotation in degree
         * @property {number} alpha - alpha (0 - 100)
         * @property {number} width - preferred width
         * @property {number} height - preferred height
         * @property {number} handleX - handle x position
         * @property {number} handleY - handle y position
         * @property {boolean} tilable - image rendered as tile
         * @property {boolean} dragged - image is dragged
         * @property {boolean} down - image is pressed
         */
        /**
         * Create image from URL
         * @param url {string}
         */
        constructor(url = '') {
            // console.log("create new image, url " + url);
            //
            this._x = 0;
            this._y = 0;
            this._alpha = 100;
            this._handleX = 0;
            this._handleY = 0;
            this._panjang = 0;
            this._lebar = 0;
            this._rotasi = 0;
            this._tilable = false;
            this._frameW = 0;
            this._frameH = 0;
            this._dragged = false;
            this._down = false;
            this._frame = 0;
            //internal
            this.load = false;
            this._ctrIdx = 0;
            this.isAnim = false;
            this.rect = new Basik.Ktk();
            this._tipeDrag = 0;
            this._dragStartY = 0;
            this._dragStartX = 0;
            this._sudutTekanAwal = 0;
            // private _button: number;
            this._sudutAwal = 0;
            let img = document.createElement('img');
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let gbr;
            gbr = this;
            let rect = Basik.Ktk.buat(0, 0, img.naturalWidth, img.naturalHeight);
            Basik.Ip.register(this, url, 0);
            gbr.img = img;
            gbr.canvas = canvas;
            gbr.rect = rect;
            gbr.load = false;
            if (!gbr.url) {
                gbr.load = true;
            }
            img.onload = () => {
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
                if (url)
                    img.src = url;
            }
            function imgOnLoad(imgP) {
                // console.log("img on load");
                canvas.width = imgP.naturalWidth;
                canvas.height = imgP.naturalHeight;
                ctx.drawImage(imgP, 0, 0);
                gbr.rect = Basik.Ktk.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);
                gbr.load = true;
                gbr.img = imgP;
                if (!gbr.width) {
                    // gbr.panjangDiSet = true;
                    gbr.width = imgP.naturalWidth;
                }
                if (!gbr.height) {
                    gbr.height = imgP.naturalHeight;
                    // gbr.lebarDiSet = true;
                }
                if (!gbr._frameH)
                    gbr.frameH = imgP.naturalHeight;
                if (!gbr._frameW)
                    gbr.frameW = imgP.naturalWidth;
                ha.be.cache.setFile(url, imgP);
            }
            function imgOnLoadDefault() {
                // console.log("img on load default");
                // canvas.width = 32;
                // canvas.height = 32;
                // // ctx = canvas.getContext('2d');
                // gbr.img = document.createElement('img');
                // // ctx.drawImage(gbr.img, 0, 0);
                // gbr.rect = Ktk.buat(0, 0, 32, 32);
                // ctx.fillStyle = 'rgba(255, 255, 255, 100)';
                // ctx.strokeStyle = 'rgba(255, 0, 0, 100)';
                // ctx.beginPath();
                // ctx.rect(0, 0, 32, 32);
                // ctx.moveTo(0, 0);
                // ctx.lineTo(31, 31);
                // ctx.moveTo(0, 31);
                // ctx.lineTo(31, 0);
                // ctx.stroke();
                // // ctx.setf
                // // ctx.fillRect(0, 0, 32, 32);
                // gbr.load = true;
                // if (!gbr.width) {
                // 	// gbr.panjangDiSet = true;
                // 	gbr.width = 32;
                // }
                // if (!gbr.height) {
                // 	gbr.height = 32;
                // 	// gbr.lebarDiSet = true;
                // }
                // gbr.frameH = 32;
                // gbr.frameW = 32;
                // ha.be.cache.setFile(url, gbr.img);
            }
        }
        get inputId() {
            return this._inputId;
        }
        set inputId(value) {
            this._inputId = value;
        }
        get frame() {
            return this._frame;
        }
        set frame(value) {
            this._frame = value;
        }
        get canvas() {
            return this._canvas;
        }
        set canvas(value) {
            this._canvas = value;
        }
        get tilable() {
            return this._tilable;
        }
        set tilable(value) {
            this._tilable = value;
        }
        get sudutAwal() {
            return this._sudutAwal;
        }
        set sudutAwal(value) {
            this._sudutAwal = value;
        }
        get frameW() {
            return this._frameW;
        }
        set frameW(value) {
            this._frameW = value;
        }
        get frameH() {
            return this._frameH;
        }
        set frameH(value) {
            this._frameH = value;
        }
        get x() {
            return this._x;
        }
        set x(value) {
            this._x = value;
        }
        get y() {
            return this._y;
        }
        set y(value) {
            this._y = value;
        }
        get alpha() {
            return this._alpha;
        }
        set alpha(value) {
            this._alpha = value;
        }
        get handleY() {
            return this._handleY;
        }
        set handleY(value) {
            this._handleY = value;
        }
        get handleX() {
            return this._handleX;
        }
        set handleX(value) {
            this._handleX = value;
        }
        get width() {
            if (this._panjang)
                return this._panjang;
            if (this.img)
                return this.img.naturalWidth;
            return 0;
        }
        set width(value) {
            this._panjang = value;
            // this._panjangDiSet = true;
        }
        get height() {
            if (this._lebar)
                return this._lebar;
            if (this.img)
                return this.img.naturalHeight;
            return 0;
        }
        set height(value) {
            this._lebar = value;
            // this._lebarDiSet = true;
        }
        get ctrIdx() {
            return this._ctrIdx;
        }
        set ctrIdx(value) {
            this._ctrIdx = value;
        }
        get rotation() {
            return this._rotasi;
        }
        set rotation(value) {
            this._rotasi = value;
        }
        get drgStartX() {
            return this._dragStartX;
        }
        set drgStartX(value) {
            this._dragStartX = value;
        }
        get drgStartY() {
            return this._dragStartY;
        }
        set drgStartY(value) {
            this._dragStartY = value;
        }
        get dragged() {
            return this._dragged;
        }
        set dragged(value) {
            this._dragged = value;
        }
        get down() {
            return this._down;
        }
        set down(value) {
            this._down = value;
        }
        // public get dragable(): boolean {
        // 	return this._tipeDrag > 0 ? true : false;
        // }
        get sudutTekanAwal() {
            return this._sudutTekanAwal;
        }
        set sudutTekanAwal(value) {
            this._sudutTekanAwal = value;
        }
        get tipeDrag() {
            return this._tipeDrag;
        }
        set tipeDrag(value) {
            this._tipeDrag = value;
        }
        get url() {
            return this._url;
        }
        set url(value) {
            this._url = value;
        }
        static get ctrDraw() {
            return Image._ctrDraw;
        }
        static set ctrDraw(value) {
            Image._ctrDraw = value;
        }
    }
    Image._ctrDraw = 0;
    Basik.Image = Image;
})(Basik || (Basik = {}));
