///<reference path="./ImageObj.ts"/>
///<reference path="./ImageImpl.ts"/>

namespace Basik {
	export class Gbr extends GbrObj {
		static readonly props: string[] = [];
		static readonly daftar: GbrObj[] = [];

		private static _lastImg: GbrObj;

		public static get lastImg(): GbrObj {
			return Gbr._lastImg;
		}
		public static set lastImg(value: GbrObj) {
			Gbr._lastImg = value;
		}

		constructor(url: string = '', pf?: number, lf?: number) {
			super(url, pf, lf);
		}

		static Buat(width: number, height: number): GbrObj {
			let h: GbrObj = new Gbr();
			h.kanvas = document.createElement('canvas')
			h.kanvas.width = width;
			h.kanvas.height = height;
			h.lebarFrame = height;
			h.panjangFrame = width;
			h.panjang = width;
			h.lebar = height;
			h.dimuat = true;
			h.img = document.createElement('img');
			return h;
		}

		static MuatAnimasi(url: string, pf: number, lf: number): GbrObj {
			let gbr: GbrObj = Gbr.Muat(url);
			gbr.isAnim = true;
			gbr.panjangFrame = pf;
			gbr.lebarFrame = lf;
			gbr.panjang = pf;
			gbr.lebar = lf;
			return gbr;
		}

		static Muat(url: string): GbrObj {
			let imgUrl: string = url;

			//auto asset
			if (imgUrl.indexOf("/") >= 0) {
				//nothing
			}
			else {
				imgUrl = "asset/" + url;

				//auto extension
				if (imgUrl.indexOf(".") >= 0) {
					//nothing
				}
				else {
					imgUrl = imgUrl + ".png";
				}
			}

			return new Gbr(imgUrl);
		}

		static getByName(nama: string, buat: boolean): GbrObj {
			for (let i = 0; i < Gbr.daftar.length; i++) {
				let item = Gbr.daftar[i];
				if (item.nama == nama) return item;
			}

			if (buat) {
				return Gbr.Muat(nama);
			}

			return null;
		}

		static register(
			image: GbrObj,
			url: string,
			tipeDrag: number): GbrObj {

			let hasil: GbrObj;
			hasil = image;
			hasil.tipeDrag = tipeDrag;
			hasil.url = url;

			Gbr.daftar.push(hasil);

			return hasil;
		}

		static AmbilPiksel(x: number = 0, y: number = 0): void {
			try {
				let data: Uint8ClampedArray = G.Canvas().getContext('2d').getImageData(x, y, 1, 1).data;

				let hasil: number[] = [];

				hasil.push(data[0]);
				hasil.push(data[1]);
				hasil.push(data[2]);
				hasil.push(data[3]);

				G.red = data[0];
				G.green = data[1];
				G.blue = data[2];
				G.alpha = data[3];
				// G.FillColor(G.merah, G.hijau, G.biru, G.alpha);

			}
			catch (e) {
				// console.error(e);
			}

			// return [0, 0, 0];
		}

		static SetPiksel(x: number = 0, y: number = 0) {
			G.Canvas().getContext('2d').fillRect(Math.floor(x), Math.floor(y), 1, 1);
		}

		private DrawSingle(x: number = 0, y: number = 0, frame: number = 0) {
			let ctx: CanvasRenderingContext2D = G.Canvas().getContext('2d');
			let jmlH: number = 0;
			let frameX: number = 0;
			let frameY: number = 0;
			let imgW: number = 0;
			let self = this;

			// let imgH: number = 0;

			//TODO: dihapuss
			if (this.dimuat == false) {
				return;
			}

			imgW = this.img.naturalWidth;

			this.ctrIdx = GbrObj.ctrDraw++;
			frame = Math.floor(frame);

			jmlH = Math.floor(imgW / this.panjangFrame);

			frameX = (frame % jmlH);
			frameY = Math.floor(frame / jmlH);
			frameX *= this.panjangFrame;
			frameY *= this.lebarFrame;
			frameX = Math.floor(frameX);
			frameY = Math.floor(frameY);

			let x2: number = Math.floor(x);
			let y2: number = Math.floor(y);

			let w2: number = Math.floor(this.panjang);
			let h2: number = Math.floor(this.lebar);

			x2 -= (this.pusatX);
			y2 -= (this.pusatY);

			if (this.rotasi != 0) {
				ctx.save();
				ctx.translate(x, y);
				ctx.rotate(this.rotasi * (Math.PI / 180));

				drawImpl(-this.pusatX, -this.pusatY)

				ctx.restore();
			}
			else {
				ctx.save();

				drawImpl(x2, y2);

				ctx.restore();
			}

			function drawImpl(dx: number, dy: number) {

				//TODO: pindahin ke depan
				dx -= Camera.x;
				dy -= Camera.y;

				ctx.globalAlpha = self.alpha / 100;
				ctx.drawImage(self.kanvas, frameX, frameY, self.panjangFrame, self.lebarFrame, Math.floor(dx), Math.floor(dy), w2, h2);
				ctx.globalAlpha = 1;
				//console.log("draw image, frame x: " + frameX + "/frame y: " + frameY + "/jml H " + jmlH);
				// debugger;
			}

		}

		tabrakan(gbr2: Gbr, x2: number, y2: number): boolean {
			this.resetRect();
			this.rectToImageTf(this.x, this.y);


			gbr2.resetRect();
			gbr2.rectToImageTf(x2, y2);

			return Ktk.collide(this.rect, gbr2.rect);
		}

		free(img: Basik.GbrObj) {
			for (let i = 0; i < Gbr.daftar.length; i++) {
				if (Gbr.daftar[i] == img) {
					img.kanvas = null;
					img.img = null;
					Basik.Ktk.destroy(img.rect);
					Gbr.daftar.splice(i, 1);
					return;
				}
			}
		}

		dotInsideImage(gbr1: GbrObj, x1: number, y1: number, x2: number, y2: number): boolean {
			this.resetRect();
			this.rectToImageTf(x1, y1);

			return Ktk.collideDot(gbr1.rect, x2, y2);
		};

		private gambarUbin(x: number = 0, y: number = 0, frame: number = 0) {
			let jmlH: number = 0;
			let jmlV: number = 0;

			if (this.dimuat == false) return;

			let w2: number = Math.floor(this.panjang);
			let h2: number = Math.floor(this.lebar);

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

			jmlH = Math.ceil((G.Canvas().width + Math.abs(x)) / w2);
			jmlV = Math.ceil((G.Canvas().height + Math.abs(y)) / h2);

			for (let i: number = 0; i < jmlH; i++) {
				for (let j: number = 0; j < jmlV; j++) {
					this.DrawSingle(x + (i * w2), y + (j * h2), frame);
				}
			}
		}

		stempel(): void {
			const gambarSetelahDimuat = () => {
				if (this.ubin) {
					this.gambarUbin(this.x, this.y, this.frame);
				}
				else {
					this.DrawSingle(this.x, this.y, this.frame);
				}
			}

			if (this.dimuat) {
				gambarSetelahDimuat();
			}
			else {
				if (G.isUpdating) {
					//ketika update maka akan dipanggil berkali2, tidak perlu menunggu dimuat
				}
				else {
					this.pendingStempel = true;
				}
			}

		}

		public resetRect(): void {
			let rect: Ktk = this.rect;
			let p: IV2D;

			p = rect.vs[0];
			p.x = 0;
			p.y = 0;

			p = rect.vs[1];
			p.x = this.panjangFrame - 1;
			p.y = 0;

			p = rect.vs[2];
			p.x = this.panjangFrame - 1;
			p.y = this.lebarFrame - 1;

			p = rect.vs[3];
			p.x = 0;
			p.y = this.lebarFrame - 1;

		}

		private rectToImageTf(x: number, y: number): void {
			let rect: Ktk = this.rect;
			let p: IV2D;
			let x2: number = this.panjang - 1;
			let y2: number = this.lebar - 1;

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
			Ktk.translate(rect, x, y);
			Ktk.translate(rect, -this.pusatX, -this.pusatY);

			//rotate
			Ktk.rotate(rect, this.rotasi, x, y, false);
		}

		static AllImageLoaded(): boolean {
			for (let i = 0; i < Gbr.daftar.length; i++) {
				let img = Gbr.daftar[i];
				if (!img.dimuat) return false;
			}

			return true;
		}

	}
}