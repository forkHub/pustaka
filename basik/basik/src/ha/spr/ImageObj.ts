namespace Basik {

	/**
	 * Image Object
	 */
	export class Image {

		//TODO: proofread
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
		constructor(url: string = '') {
			// console.log("create new image, url " + url);

			let img: HTMLImageElement = document.createElement('img');
			let canvas: HTMLCanvasElement = document.createElement('canvas');
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let self = this;

			let gbr: Image;
			gbr = this;
			let rect = Ktk.buat(0, 0, img.naturalWidth, img.naturalHeight);

			Ip.register(this, url, 0);

			gbr.img = img;
			gbr.kanvas = canvas;
			gbr.rect = rect;
			gbr.dimuat = false;

			if (!gbr.url) {
				gbr.dimuat = true;
				imgOnLoad(img);
			}

			img.onload = () => {
				imgOnLoad(img);
			}

			img.onerror = () => {
				console.warn('gagal load image, url ' + url);
				imgOnLoadDefault();
			}

			img.src = url;

			// let img2: HTMLImageElement = ha.be.cache.getGbr(url);
			// if (img2) {
			// 	imgOnLoad(img2);
			// }
			// else {
			// 	if (url) {
			// 		img.src = url;
			// 	} else {
			// 		//TODO: logika belum selesai
			// 	}
			// }

			function imgOnLoad(imgP: HTMLImageElement): void {
				// console.log("img on load");
				canvas.width = imgP.naturalWidth;
				canvas.height = imgP.naturalHeight;

				ctx.drawImage(imgP, 0, 0);
				gbr.rect = Ktk.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);

				gbr.dimuat = true;
				gbr.img = imgP;

				if (!gbr.panjang) {
					// gbr.panjangDiSet = true;
					gbr.panjang = imgP.naturalWidth;
				}

				if (!gbr.lebar) {
					gbr.lebar = imgP.naturalHeight;
					// gbr.lebarDiSet = true;
				}

				if (!gbr._frameH) gbr.lebarFrame = imgP.naturalHeight;
				if (!gbr._frameW) gbr.panjangFrame = imgP.naturalWidth;

				// ha.be.cache.setFile(url, imgP);

				ImgImpl.lastImg = self;
				Event.dispatchEvent(Evt.GAMBAR_DILOAD);
			}

			function imgOnLoadDefault(): void {
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

			this.nama = url;
		}

		//
		private _x: number = 0;
		private _y: number = 0;
		private _alpha: number = 100;
		private _pusatX: number = 0;
		private _pusatY: number = 0;
		private _panjang: number = 0;
		private _lebar: number = 0;
		private _rotasi: number = 0;
		private _tilable: boolean = false;
		private _frameW: number = 0;
		private _frameH: number = 0;
		private _dragged: boolean = false;
		private _down: boolean = false;
		private _frame: number = 0;
		private _pendingStempel: boolean = false;
		private _nama: string;

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

		//internal
		private _dimuat: boolean = false;
		public get dimuat(): boolean {
			return this._dimuat;
		}
		public set dimuat(value: boolean) {
			this._dimuat = value;
		}
		private _ctrIdx: number = 0;
		private static _ctrDraw: number = 0;
		private _url: string;
		img: HTMLImageElement;
		private _canvas: HTMLCanvasElement;
		isAnim: boolean = false;
		rect: Ktk = new Ktk();

		private _tipeDrag: number = 0;
		private _dragStartY: number = 0;
		private _dragStartX: number = 0;
		private _sudutTekanAwal: number = 0;
		private _sudutAwal: number = 0;
		private _inputId: string;

		public get inputId(): string {
			return this._inputId;
		}
		public set inputId(value: string) {
			this._inputId = value;
		}

		public get frame(): number {
			return this._frame;
		}
		public set frame(value: number) {
			this._frame = value;
		}

		public get kanvas(): HTMLCanvasElement {
			return this._canvas;
		}
		public set kanvas(value: HTMLCanvasElement) {
			this._canvas = value;
		}

		public get ubin(): boolean {
			return this._tilable;
		}
		public set ubin(value: boolean) {
			this._tilable = value;
		}

		public get panjangFrame(): number {
			return this._frameW;
		}
		public set panjangFrame(value: number) {
			this._frameW = value;
		}
		public get lebarFrame(): number {
			return this._frameH;
		}
		public set lebarFrame(value: number) {
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

		public get pusatY(): number {
			return this._pusatY;
		}
		public set pusatY(value: number) {
			this._pusatY = value;
		}

		public get pusatX(): number {
			return this._pusatX;
		}
		public set pusatX(value: number) {
			this._pusatX = value;
		}

		public get panjang(): number {
			if (this._panjang) return this._panjang;
			if (this.img) return this.img.naturalWidth;
			return 0;
		}

		public set panjang(value: number) {
			this._panjang = value;
			// this._panjangDiSet = true;
		}

		public get lebar(): number {
			if (this._lebar) return this._lebar;
			if (this.img) return this.img.naturalHeight;
			return 0;
		}
		public set lebar(value: number) {
			this._lebar = value;
		}

		public get ctrIdx(): number {
			return this._ctrIdx;
		}
		public set ctrIdx(value: number) {
			this._ctrIdx = value;
		}

		public get rotasi(): number {
			return normalisasiSudut(this._rotasi);
		}
		public set rotasi(value: number) {
			this._rotasi = value;
		}

		public get dragAwalX(): number {
			return this._dragStartX;
		}
		public set dragAwalX(value: number) {
			this._dragStartX = value;
		}
		public get dragAwalY(): number {
			return this._dragStartY;
		}
		public set dragAwalY(value: number) {
			this._dragStartY = value;
		}

		public get diDrag(): boolean {
			return this._dragged;
		}
		public set diDrag(value: boolean) {
			this._dragged = value;
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
			return Image._ctrDraw;
		}
		public static set ctrDraw(value: number) {
			Image._ctrDraw = value;
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