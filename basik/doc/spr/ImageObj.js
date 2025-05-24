"use strict";
var Basik;
(function (Basik) {
    /**
     * Image Object
     */
    class ImgObj {
        /**
         * @property {number} x - x position
         * @property {number} y - y position
         * @property {number} rotation - rotation in degree
         * @property {number} alpha - alpha (0 - 100)
         * @property {number} width -
         * @property {number} height -
         * @property {number} handleX - handle x position
         * @property {number} handleY - handle y position
         * @property {boolean} tilable - image rendered as tile
         * @property {boolean} dragged - image is dragged
         * @property {boolean} down - image is pressed
         */
        constructor() {
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
            this._frameW = 32;
            this._frameH = 32;
            this._dragged = false;
            this._down = false;
            //internal
            this.load = false;
            this._panjangDiSet = false;
            this._lebarDiSet = false;
            this._ctrIdx = 0;
            this.isAnim = false;
            this.rect = new Basik.Ktk();
            this.ratioX = 1;
            this.ratioY = 1;
            //interaktif even
            this._tipeDrag = 0;
            //internal interatif
            this._dragStartY = 0;
            this._dragStartX = 0;
            this._sudutTekanAwal = 0;
            this._sudutAwal = 0;
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
            return this._panjang;
        }
        set width(value) {
            this._panjang = value;
            this._panjangDiSet = true;
        }
        get height() {
            return this._lebar;
        }
        set height(value) {
            this._lebar = value;
            this._lebarDiSet = true;
        }
        get panjangDiSet() {
            return this._panjangDiSet;
        }
        set panjangDiSet(value) {
            this._panjangDiSet = value;
        }
        get lebarDiSet() {
            return this._lebarDiSet;
        }
        set lebarDiSet(value) {
            this._lebarDiSet = value;
        }
        get ctrIdx() {
            return this._ctrIdx;
        }
        set ctrIdx(value) {
            this._ctrIdx = value;
        }
        get rotasi() {
            return this._rotasi;
        }
        set rotasi(value) {
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
        get dragable() {
            return this._tipeDrag > 0 ? true : false;
        }
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
            return ImgObj._ctrDraw;
        }
        static set ctrDraw(value) {
            ImgObj._ctrDraw = value;
        }
        get button() {
            return this._button;
        }
        set button(value) {
            this._button = value;
        }
    }
    ImgObj._ctrDraw = 0;
    Basik.ImgObj = ImgObj;
})(Basik || (Basik = {}));
