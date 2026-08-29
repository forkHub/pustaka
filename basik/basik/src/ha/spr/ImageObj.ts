namespace Basik {

	export class GbrTransform {
		static fromGbr(gbr: GbrObj): GbrTransform {
			let h = new GbrTransform();
			h.x = gbr.t.x;
			h.y = gbr.t.y;
			h.panjang = gbr.t.panjang;
			h.lebar = gbr.t.lebar;
			h.frame = gbr.t.frame;
			h.panjangFrame = gbr.t.panjangFrame;
			h.lebarFrame = gbr.t.lebarFrame;
			h.alpha = gbr.t.alpha;
			h.pusatX = gbr.t.pusatX;
			h.pusatY = gbr.t.pusatY;
			h.rotasi = gbr.t.rotasi;
			h.ubin = gbr.t.ubin;

			return h;
		}

		private _panjangOri: number = undefined;
		private _lebarOri: number = undefined;
		private _x: number = 0;
		private _y: number = 0;
		private _alpha: number = 100;
		private _pusatX: number = 0;
		private _pusatY: number = 0;
		private _panjang: number = undefined;
		private _lebar: number = undefined;
		private _rotasi: number = 0;
		private _tilable: boolean = false;
		private _panjangFrame: number = 0;
		private _lebarFrame: number = 0;
		private _frame: number = 0;

		public get panjangOri(): number {
			return this._panjangOri;
		}
		public set panjangOri(value: number) {
			this._panjangOri = value;
		}

		public get lebarOri(): number {
			return this._lebarOri;
		}
		public set lebarOri(value: number) {
			this._lebarOri = value;
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
		public get pusatX(): number {
			return this._pusatX;
		}
		public set pusatX(value: number) {
			this._pusatX = value;
		}
		public get pusatY(): number {
			return this._pusatY;
		}
		public set pusatY(value: number) {
			this._pusatY = value;
		}
		public get panjang(): number {
			return this._panjang;
		}
		public set panjang(value: number) {
			this._panjang = value;
		}
		public get lebar(): number {
			return this._lebar;
		}
		public set lebar(value: number) {
			this._lebar = value;
		}
		public get rotasi(): number {
			return this._rotasi;
		}
		public set rotasi(value: number) {
			this._rotasi = value;
		}
		public get ubin(): boolean {
			return this._tilable;
		}
		public set ubin(value: boolean) {
			this._tilable = value;
		}
		public get panjangFrame(): number {
			return this._panjangFrame;
		}
		public set panjangFrame(value: number) {
			this._panjangFrame = value;
		}
		public get lebarFrame(): number {
			return this._lebarFrame;
		}
		public set lebarFrame(value: number) {
			this._lebarFrame = value;
		}
		public get frame(): number {
			return this._frame;
		}
		public set frame(value: number) {
			this._frame = value;
		}
	}

	/**
	 * Image Object
	 */
	export class GbrObj {

		/**
		 * 
		 * @param url 
		 * @param pf 
		 * @param lf 
		 */
		constructor(url: string = '', pf?: number, lf?: number) {
			let gbr: GbrObj = this;
			gbr.t.lebarFrame = pf;
			gbr.t.panjangFrame = lf;

			ImageCache.get(Ip.resolveGbrUrl(url), (img) => {
				Ip.register(gbr, url, 0);

				gbr.img = img;
				gbr.dimuat = true;

				gbr.rect = Ktk.buat(0, 0, img.naturalWidth, img.naturalHeight);

				ImgImpl.lastImg = gbr;
				BEvent.dispatchEvent(Evt.GAMBAR_DILOAD);
			}, () => {
				gbr.error = true;
			})

		}


		readonly t: GbrTransform = new GbrTransform();

		private _diDrag: boolean = false;
		private _down: boolean = false;
		private _pendingStempel: boolean = false;
		private _nama: string;
		private _img: HTMLImageElement;
		private _tipeDrag: number = 0;
		private _diRender: boolean = true;
		private _temp: boolean = false;
		private _error: boolean = false;
		private _dimuat: boolean = false;

		public get lebarOri(): number {
			return this.t.lebarOri;
		}
		public set lebarOri(value: number) {
			this.t.lebarOri = value;;
		}
		public get panjangOri(): number {
			return this.t.panjangOri;
		}
		public set panjangOri(value: number) {
			this.t.panjangOri = value;
		}

		public get error(): boolean {
			return this._error;
		}
		public set error(value: boolean) {
			this._error = value;
		}

		public get temp(): boolean {
			return this._temp;
		}
		public set temp(value: boolean) {
			this._temp = value;
		}

		public get diRender(): boolean {
			return this._diRender;
		}
		public set diRender(value: boolean) {
			this._diRender = value;
		}

		public get layarX(): number {
			return this.t.x - Camera.x;
		}
		public get layarY(): number {
			return this.t.y - Camera.y;
		}

		public get img(): HTMLImageElement {
			return this._img;
		}
		public set img(value: HTMLImageElement) {
			this._img = value;
		}

		//internal only
		private _ctrIdx: number = 0;
		private static _ctrDraw: number = 0;
		private _url: string;
		// private _canvas: HTMLCanvasElement;
		private _isAnim: boolean = false;
		private _dragAwalY: number = 0;
		private _dragAwalX: number = 0;
		private _sudutTekanAwal: number = 0;
		private _sudutAwal: number = 0;
		private _inputId: string;

		public get isAnim(): boolean {
			return this._isAnim;
		}
		public set isAnim(value: boolean) {
			this._isAnim = value;
		}
		private _rect: Ktk = new Ktk();
		public get rect(): Ktk {
			return this._rect;
		}
		public set rect(value: Ktk) {
			this._rect = value;
		}

		public get dimuat(): boolean {
			return this._dimuat;
		}
		public set dimuat(value: boolean) {
			this._dimuat = value;
		}

		public get nama(): string {
			return this._nama;
		}
		public set nama(value: string) {
			this._nama = value;
		}

		public get pendingStempel(): boolean {
			return this._pendingStempel;
		}
		public set pendingStempel(value: boolean) {
			this._pendingStempel = value;
		}

		public get inputId(): string {
			return this._inputId;
		}
		public set inputId(value: string) {
			this._inputId = value;
		}

		// public get kanvas(): HTMLCanvasElement {
		// 	return this._canvas;
		// }

		// public set kanvas(value: HTMLCanvasElement) {
		// 	this._canvas = value;
		// }

		public get frame(): number {
			return this.t.frame;
		}
		public set frame(value: number) {
			this.t.frame = value;
		}

		public get ubin(): boolean {
			return this.t.ubin;
		}
		public set ubin(value: boolean) {
			this.t.ubin = value;
		}

		public get panjangFrame(): number {
			return this.t.panjangFrame;
		}
		public set panjangFrame(value: number) {
			this.t.panjangFrame = value;
		}

		public get lebarFrame(): number {
			return this.t.lebarFrame;
		}
		public set lebarFrame(value: number) {
			this.t.lebarFrame = value;
		}

		public get x(): number {
			return this.t.x;
		}
		public set x(value: number) {
			this.t.x = value;
		}

		public get y(): number {
			return this.t.y;
		}
		public set y(value: number) {
			this.t.y = value;
		}

		public get alpha(): number {
			return this.t.alpha;
		}
		public set alpha(value: number) {
			this.t.alpha = value;
		}

		public get pusatY(): number {
			return this.t.pusatY;
		}
		public set pusatY(value: number) {
			this.t.pusatY = value;
		}

		public get pusatX(): number {
			return this.t.pusatX;
		}
		public set pusatX(value: number) {
			this.t.pusatX = value;
		}

		public get panjang(): number {
			if (this.t.panjang != undefined) return this.t.panjang;
			if (this.img) return this.img.naturalWidth;
			return 0;
		}

		public set panjang(value: number) {
			this.t.panjang = value;
		}

		public get lebar(): number {
			if (this.t.lebar != undefined) return this.t.lebar;
			if (this.img) return this.img.naturalHeight;
			return 0;
		}
		public set lebar(value: number) {
			this.t.lebar = value;
		}

		public get rotasi(): number {
			return normalisasiSudut(this.t.rotasi);
		}
		public set rotasi(value: number) {
			this.t.rotasi = value;
		}

		public get ctrIdx(): number {
			return this._ctrIdx;
		}
		public set ctrIdx(value: number) {
			this._ctrIdx = value;
		}

		public get dragAwalX(): number {
			return this._dragAwalX;
		}
		public set dragAwalX(value: number) {
			this._dragAwalX = value;
		}
		public get dragAwalY(): number {
			return this._dragAwalY;
		}
		public set dragAwalY(value: number) {
			this._dragAwalY = value;
		}

		public get diDrag(): boolean {
			return this._diDrag;
		}
		public set diDrag(value: boolean) {
			this._diDrag = value;
		}
		public get ditekan(): boolean {
			return this._down;
		}
		public set ditekan(value: boolean) {
			this._down = value;
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
			return GbrObj._ctrDraw;
		}
		public static set ctrDraw(value: number) {
			GbrObj._ctrDraw = value;
		}

		public get initialMouseAngle(): number {
			return this._sudutTekanAwal;
		}
		public set initialMouseAngle(value: number) {
			this._sudutTekanAwal = value;
		}
		public get initialAngle(): number {
			return this._sudutAwal;
		}
		public set initialAngle(value: number) {
			this._sudutAwal = value;
		}


	}
}