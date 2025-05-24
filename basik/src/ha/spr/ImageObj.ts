namespace Basik {

	/**
	 * Image Object
	 */
	export class ImgObj {

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
		}

		//
		private _x: number = 0;
		private _y: number = 0;
		private _alpha: number = 100;
		private _handleX: number = 0;
		private _handleY: number = 0;
		private _panjang: number = 0;
		private _lebar: number = 0;
		private _rotasi: number = 0;
		private _tilable: boolean = false;
		private _frameW: number = 32;
		private _frameH: number = 32;
		private _dragged: boolean = false;
		private _down: boolean = false;
		private _frame: number = 0;

		//internal
		load: boolean = false;
		private _panjangDiSet: boolean = false;
		private _lebarDiSet: boolean = false;
		private _ctrIdx: number = 0;
		private static _ctrDraw: number = 0;
		private _url: string;
		img: HTMLImageElement;
		private _canvas: HTMLCanvasElement;
		ctx: CanvasRenderingContext2D;
		isAnim: boolean = false;
		rect: Ktk = new Ktk();
		ratioX?: number = 1;
		ratioY?: number = 1;

		//interaktif even
		private _tipeDrag: number = 0;

		//internal interatif
		private _dragStartY: number = 0;
		private _dragStartX: number = 0;
		private _sudutTekanAwal: number = 0;
		private _button: number;
		private _sudutAwal: number = 0;

		public get frame(): number {
			return this._frame;
		}
		public set frame(value: number) {
			this._frame = value;
		}

		public get canvas(): HTMLCanvasElement {
			return this._canvas;
		}
		public set canvas(value: HTMLCanvasElement) {
			this._canvas = value;
		}

		public get tilable(): boolean {
			return this._tilable;
		}
		public set tilable(value: boolean) {
			this._tilable = value;
		}

		public get sudutAwal(): number {
			return this._sudutAwal;
		}
		public set sudutAwal(value: number) {
			this._sudutAwal = value;
		}

		public get frameW(): number {
			return this._frameW;
		}
		public set frameW(value: number) {
			this._frameW = value;
		}
		public get frameH(): number {
			return this._frameH;
		}
		public set frameH(value: number) {
			this._frameH = value;
		}

		public get x(): number {
			return this._x;
		}
		public set x(value: number) {
			this._x = value;
		}

		public get y(): number {
			return this._y;
		}
		public set y(value: number) {
			this._y = value;
		}

		public get alpha(): number {
			return this._alpha;
		}
		public set alpha(value: number) {
			this._alpha = value;
		}

		public get handleY(): number {
			return this._handleY;
		}
		public set handleY(value: number) {
			this._handleY = value;
		}

		public get handleX(): number {
			return this._handleX;
		}
		public set handleX(value: number) {
			this._handleX = value;
		}

		public get width(): number {
			return this._panjang;
		}
		public set width(value: number) {
			this._panjang = value;
			this._panjangDiSet = true;
		}

		public get height(): number {
			return this._lebar;
		}
		public set height(value: number) {
			this._lebar = value;
			this._lebarDiSet = true;
		}

		public get panjangDiSet(): boolean {
			return this._panjangDiSet;
		}
		public set panjangDiSet(value: boolean) {
			this._panjangDiSet = value;
		}

		public get lebarDiSet(): boolean {
			return this._lebarDiSet;
		}
		public set lebarDiSet(value: boolean) {
			this._lebarDiSet = value;
		}

		public get ctrIdx(): number {
			return this._ctrIdx;
		}
		public set ctrIdx(value: number) {
			this._ctrIdx = value;
		}

		public get rotasi(): number {
			return this._rotasi;
		}
		public set rotasi(value: number) {
			this._rotasi = value;
		}

		public get drgStartX(): number {
			return this._dragStartX;
		}
		public set drgStartX(value: number) {
			this._dragStartX = value;
		}
		public get drgStartY(): number {
			return this._dragStartY;
		}
		public set drgStartY(value: number) {
			this._dragStartY = value;
		}

		public get dragged(): boolean {
			return this._dragged;
		}
		public set dragged(value: boolean) {
			this._dragged = value;
		}
		public get down(): boolean {
			return this._down;
		}
		public set down(value: boolean) {
			this._down = value;
		}
		public get dragable(): boolean {
			return this._tipeDrag > 0 ? true : false;
		}

		public get sudutTekanAwal(): number {
			return this._sudutTekanAwal;
		}
		public set sudutTekanAwal(value: number) {
			this._sudutTekanAwal = value;
		}

		public get tipeDrag(): number {
			return this._tipeDrag;
		}

		public set tipeDrag(value: number) {
			this._tipeDrag = value;
		}

		public get url(): string {
			return this._url;
		}
		public set url(value: string) {
			this._url = value;
		}
		public static get ctrDraw(): number {
			return ImgObj._ctrDraw;
		}
		public static set ctrDraw(value: number) {
			ImgObj._ctrDraw = value;
		}

		public get button(): number {
			return this._button;
		}
		public set button(value: number) {
			this._button = value;
		}


	}
}