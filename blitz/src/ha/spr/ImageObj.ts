namespace Basik {

	/**
	 * 
	 */
	export class ImageObj {
		private static _ctrDraw: number = 0;
		private _url: string;

		//image
		img: HTMLImageElement;
		canvas: HTMLCanvasElement;
		ctx: CanvasRenderingContext2D;
		isAnim: boolean = false;
		rect: Kotak = new Kotak();
		load: boolean = false;
		ratioX?: number = 1;
		ratioY?: number = 1;

		private _panjangDiSet: boolean = false;
		private _lebarDiSet: boolean = false;
		private _ctrIdx: number = 0;

		private _x: number = 0;
		private _y: number = 0;
		private _alpha: number = 100;
		private _frameW: number = 32;
		private _frameH: number = 32;
		private _handleX: number = 0;
		private _handleY: number = 0;
		private _rotasi: number = 0;
		private _panjang: number = 0;
		private _lebar: number = 0;

		//interaktif even
		private _dragged: boolean = false;
		private _down: boolean = false;
		private _dragable: boolean = false;
		private _hitCount: number = 0;
		private _tipeDrag: number = 0;
		private _dragSelesaiJml: number = 0;

		//internal interatif
		private _dragStartY: number = 0;
		private _dragStartX: number = 0;
		private _sudutTekanAwal: number = 0;
		private _inputId: number;
		private _sudutAwal: number = 0;

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

		public get panjang(): number {
			return this._panjang;
		}
		public set panjang(value: number) {
			this._panjang = value;
			this._panjangDiSet = true;
		}

		public get lebar(): number {
			return this._lebar;
		}
		public set lebar(value: number) {
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
			// console.debug('set value: ' + value);
			this._rotasi = value;
		}

		constructor(dragable: boolean = false) {
			this.dragable = dragable;
		}

		public get dragSelesaiJml(): number {
			return this._dragSelesaiJml;
		}
		public set dragSelesaiJml(value: number) {
			this._dragSelesaiJml = value;
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
		// public get buff(): SprImgObj {
		// 	return this._buff;
		// }
		// public set buff(value: SprImgObj) {
		// 	this._buff = value;
		// }

		// public get x(): number {
		// 	return this._x;
		// }
		// public set x(value: number) {
		// 	this._x = value;
		// }
		// public get y(): number {
		// 	return this._y;
		// }
		// public set y(value: number) {
		// 	this._y = value;
		// }

		public get jmlHit(): number {
			return this._hitCount;
		}
		public set jmlHit(value: number) {
			this._hitCount = value;
		}
		public get down(): boolean {
			return this._down;
		}
		public set down(value: boolean) {
			this._down = value;
		}
		public get dragable(): boolean {
			return this._dragable;
		}
		public set dragable(value: boolean) {
			this._dragable = value;
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
			if (value > 0) {
				this._dragable = true;
			}
			else {
				this._dragable = false;
			}
		}

		public get url(): string {
			return this._url;
		}
		public set url(value: string) {
			this._url = value;
		}
		public static get ctrDraw(): number {
			return ImageObj._ctrDraw;
		}
		public static set ctrDraw(value: number) {
			ImageObj._ctrDraw = value;
		}

		public get inputId(): number {
			return this._inputId;
		}
		public set inputId(value: number) {
			this._inputId = value;
		}


	}
}