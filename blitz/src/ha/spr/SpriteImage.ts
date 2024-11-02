namespace ha.be {

	/*
	export class SprObj {
		img: HTMLImageElement;
		canvas: HTMLCanvasElement;
		ctx: CanvasRenderingContext2D;
		isAnim: boolean = false;
		rect: Ikt = new Kotak();
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
			console.log('set panjang: ' + value);
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
	}
	*/

	export class SprImg {


		static buatBagiCanvas(canvas: HTMLCanvasElement, w: number = 32, h: number = 32, frameW: number = 32, frameH: number = 32): SprObj {
			let img: SprObj;

			canvas.width = w;
			canvas.height = h;

			let rect: Ikt = ha.be.Kotak.buat(0, 0, frameW, frameH);

			img = new SprObj();
			img.load = true;
			img.panjang = w;
			img.lebar = h;
			img.img = null;
			img.frameH = frameH;
			img.frameW = frameW;
			img.handleX = 0;
			img.handleY = 0;
			img.alpha = 1;
			img.isAnim = false;
			img.canvas = canvas;
			img.ctx = canvas.getContext('2d');
			img.rect = rect;
			img.load = true;
			img.panjangDiSet = true;
			img.lebarDiSet = true;

			return img;
		}

		static panjang(gbr: SprObj, pj?: number): number {
			if (typeof pj == 'number') {
				gbr.panjang = pj;
				gbr.panjangDiSet = true;
			}

			return gbr.panjang;
		};

		static lebar(gbr: SprObj, lb?: number): number {
			if (typeof lb == 'number') {
				gbr.lebar = lb;
				gbr.lebarDiSet = true;
			}

			return gbr.lebar;
		};

		static tabrakan(gbr1: SprObj, x1: number, y1: number, gbr2: SprObj, x2: number, y2: number): boolean {
			SprImg.resetRect(gbr1);
			SprImg.rectToImageTransform(gbr1, x1, y1);

			SprImg.resetRect(gbr2);
			SprImg.rectToImageTransform(gbr2, x2, y2);

			return ha.be.Kotak.collide(gbr1.rect, gbr2.rect);
		};

		static dotDidalamGambar(gbr1: SprObj, x1: number, y1: number, x2: number, y2: number): boolean {
			SprImg.resetRect(gbr1);
			SprImg.rectToImageTransform(gbr1, x1, y1);

			return ha.be.Kotak.collideDot(gbr1.rect, x2, y2);
		};

		static muatAnimAsync(url: string, fw: number, fh: number): SprObj {
			let canvas: HTMLCanvasElement = document.createElement('canvas');

			return SprImg.muatAnimAsyncCanvas(url, fw, fh, canvas);
		}

		static muatAnimAsyncCanvas(url: string, fw: number, fh: number, canvas: HTMLCanvasElement): SprObj {
			let img: HTMLImageElement = document.createElement('img'); //;
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: Ikt;

			rect = ha.be.Kotak.buat(0, 0, fw, fh);

			let gbr: SprObj = new SprObj();
			gbr.isAnim = true;
			gbr.img = img;
			gbr.panjang = img.naturalWidth;
			gbr.lebar = img.naturalHeight;
			gbr.frameH = fh;
			gbr.frameW = fw;
			gbr.isAnim = true;
			gbr.handleX = 0;
			gbr.handleY = 0;
			gbr.rotasi = 0;
			gbr.alpha = 1;
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
			}

			img.onerror = () => {
				console.warn('gagal load image, url ' + url);
				//TODO: default image
			}

			let img2: HTMLImageElement = ha.be.cache.getGbr(url);
			if (img2) {
				imgOnLoad(img2);
			}
			else {
				img.src = url;
			}

			function imgOnLoad(img: HTMLImageElement) {
				// console.log('img anim load ' + url);
				canvas.width = img.naturalWidth;
				canvas.height = img.naturalHeight;
				ctx.drawImage(img, 0, 0);
				gbr.load = true;

				if (!gbr.panjangDiSet) {
					gbr.panjang = fw;
					gbr.panjangDiSet = true;
				}

				if (!gbr.lebarDiSet) {
					gbr.lebarDiSet = true;
					gbr.lebar = fh;
				}

				ha.be.cache.setFile(url, img);
			}

			return gbr;
		}

		static muatAsync(url: string, onload: () => void): SprObj {
			let kanvas: HTMLCanvasElement = document.createElement('canvas');

			return SprImg.muatAsyncKanvas(url, kanvas, onload);
		}

		static muatAsyncKanvas(url: string, canvas: HTMLCanvasElement, onload: () => void): SprObj {
			let img: HTMLImageElement = document.createElement('img');
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: Ikt;

			rect = ha.be.Kotak.buat(0, 0, img.naturalWidth, img.naturalHeight);

			let gbr: SprObj;
			gbr = new SprObj();

			gbr.img = img;
			gbr.panjang = img.naturalWidth;
			gbr.lebar = img.naturalHeight;
			gbr.panjangDiSet = false;
			gbr.lebarDiSet = false;
			gbr.frameH = img.naturalHeight;
			gbr.frameW = img.naturalWidth;
			gbr.isAnim = false;
			gbr.handleX = 0;
			gbr.handleY = 0;
			gbr.rotasi = 0;
			gbr.alpha = 1;
			gbr.ctx = ctx;
			gbr.canvas = canvas;
			gbr.rect = rect;
			gbr.load = false;
			gbr.ctrIdx = 0

			img.onload = () => {
				onload();
				imgOnLoad(img);
			}

			img.onerror = () => {
				console.warn('gagal load image, url ' + url);
				//TODO: default image
				imgOnLoadDefault();
			}

			let img2: HTMLImageElement = ha.be.cache.getGbr(url);
			if (img2) {
				imgOnLoad(img2);
			}
			else {
				img.src = url;
			}

			function imgOnLoad(imgP: HTMLImageElement): void {
				canvas.width = imgP.naturalWidth;
				canvas.height = imgP.naturalHeight;

				ctx.drawImage(imgP, 0, 0);
				gbr.rect = ha.be.Kotak.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);

				gbr.load = true;
				gbr.img = imgP;

				if (!gbr.panjangDiSet) {
					gbr.panjangDiSet = true;
					gbr.panjang = imgP.naturalWidth;
				}

				if (!gbr.lebarDiSet) {
					gbr.lebar = imgP.naturalHeight;
					gbr.lebarDiSet = true;
				}

				gbr.frameH = imgP.naturalHeight;
				gbr.frameW = imgP.naturalWidth;

				ha.be.cache.setFile(url, imgP);
			}

			function imgOnLoadDefault(): void {
				console.log("img on load default");

				canvas.width = 32;
				canvas.height = 32;

				//TODO: draw rectangle, broken image
				// ctx = canvas.getContext('2d');
				gbr.img = document.createElement('img');
				// ctx.drawImage(gbr.img, 0, 0);

				gbr.rect = ha.be.Kotak.buat(0, 0, 32, 32);
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
					gbr.panjang = 32;
				}

				if (!gbr.lebarDiSet) {
					gbr.lebar = 32;
					gbr.lebarDiSet = true;
				}

				gbr.frameH = 32;
				gbr.frameW = 32;

				ha.be.cache.setFile(url, gbr.img);
			}

			console.log(gbr);
			return gbr;
		}

		static gambarUbin(gbr: SprObj, x: number = 0, y: number = 0, frame: number = 0) {
			let jmlH: number = 0;
			let jmlV: number = 0;

			if (gbr.load == false) return;

			let w2: number = Math.floor(gbr.panjang);
			let h2: number = Math.floor(gbr.lebar);

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

			jmlH = Math.ceil((Be.canvasAktif.panjang + Math.abs(x)) / w2);
			jmlV = Math.ceil((Be.canvasAktif.lebar + Math.abs(y)) / h2);

			for (let i: number = 0; i < jmlH; i++) {
				for (let j: number = 0; j < jmlV; j++) {
					SprImg.gambar(gbr, x + (i * w2), y + (j * h2), frame);
				}
			}
		}

		/**
		 * mengambil pixel di layar
		 * @param x posisi x
		 * @param y posisi y
		 * @returns (Uint8ClampedArray) 
		 */
		static AmbilPiksel(x: number = 0, y: number = 0): number[] {
			try {
				let data: Uint8ClampedArray = Be.canvasAktif.ctx.getImageData(x, y, 1, 1).data;

				let hasil: number[] = [];

				hasil.push(data[0]);
				hasil.push(data[1]);
				hasil.push(data[2]);
				hasil.push(data[3]);

				Be.merah = data[0];
				Be.hijau = data[1];
				Be.biru = data[2];
				Be.transparan = data[3];
				Be.Warna(Be.merah, Be.hijau, Be.biru, Be.transparan);

				return hasil;
			}
			catch (e) {
				// console.error(e);
			}

			return [0, 0, 0];
		}

		/**
		 * 
		 * @param x 
		 * @param y 
		 */
		static SetPiksel(x: number = 0, y: number = 0) {
			Be.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
		}

		static gambar(gbr: SprObj, x: number = 0, y: number = 0, frame: number = 0) {
			let ctx: CanvasRenderingContext2D = Be.canvasAktif.ctx;
			let jmlH: number = 0;
			// let jmlV: number = 0;
			let frameX: number = 0;
			let frameY: number = 0;

			// let rect: IRect = img.rect;

			if (gbr.load == false) return;

			gbr.ctrIdx = ha.be.SprObj.ctrDraw++;
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

			let x2: number = Math.floor(x);
			let y2: number = Math.floor(y);

			let w2: number = Math.floor(gbr.panjang);
			let h2: number = Math.floor(gbr.lebar);

			x2 -= (gbr.handleX);
			y2 -= (gbr.handleY);

			if (gbr.rotasi != 0) {
				ctx.save();
				ctx.translate(x, y);
				ctx.rotate(gbr.rotasi * (Math.PI / 180));
				ctx.globalAlpha = gbr.alpha / 100;
				ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, - gbr.handleX, -gbr.handleY, w2, h2);
				ctx.restore();
			}
			else {
				ctx.save();
				ctx.globalAlpha = gbr.alpha / 100;
				ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, x2, y2, w2, h2);
				ctx.restore();
			}

			// debugger;
		}

		/**
		 * Ubah Ukuran Gambar
		 * @param gbr 
		 * @param w 
		 * @param h 
		 */
		static ukuran(gbr: SprObj, w: number = 32, h: number = 32): void {
			gbr.panjang = w;
			gbr.lebar = h;
			gbr.panjangDiSet = true;
			gbr.lebarDiSet = true;
		}

		public static resetRect(img: SprObj): void {
			let rect: Ikt = img.rect;
			let p: IV2D;

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

		static rectToImageTransform(image: SprObj, x: number, y: number): void {
			let rect: Ikt = image.rect;
			let p: IV2D;
			let x2: number = image.panjang
			let y2: number = image.lebar;

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
			ha.be.Kotak.translate(rect, x, y);
			ha.be.Kotak.translate(rect, -image.handleX, -image.handleY);

			//rotate
			ha.be.Kotak.rotate(rect, image.rotasi, x, y, false);
		}

	}

}