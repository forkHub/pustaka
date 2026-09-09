///<reference path="./ImageObj.ts"/>

namespace Basik {

	export class ImgImpl {
		static readonly props: string[] = [];
		static readonly daftar: GbrObj[] = [];
		private static _lastImg: GbrObj;

		public static get lastImg(): GbrObj {
			return ImgImpl._lastImg;
		}
		public static set lastImg(value: GbrObj) {
			ImgImpl._lastImg = value;
		}

		static CreateImage(width: number, height: number): GbrObj {
			let h: GbrObj = new GbrObj();
			// h.kanvas = document.createElement('canvas')
			// h.kanvas.width = width;
			// h.kanvas.height = height;
			h.lebarFrame = height;
			h.panjangFrame = width;
			h.panjang = width;
			h.lebar = height;
			h.dimuat = true;
			h.img = document.createElement('img');
			return h;
		}

		static MuatAnimasi(url: string, pf: number, lf: number): GbrObj {
			let gbr: GbrObj = Ip.Muat(url);
			gbr.isAnim = true;
			gbr.panjangFrame = pf;
			gbr.lebarFrame = lf;
			gbr.panjang = pf;
			gbr.lebar = lf;
			return gbr;
		}

		//indempoten
		static resolveGbrUrl(url: string): string {
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


			return imgUrl;
		}

		static Muat(url: string): GbrObj {
			let imgUrl: string = ImgImpl.resolveGbrUrl(url);

			return new GbrObj(imgUrl);
		}

		static tabrakan(gbr1: GbrObj, x1: number, y1: number, gbr2: GbrObj, x2: number, y2: number): boolean {
			Ip.resetRect(gbr1);
			Ip.rectToImageTf(gbr1, x1, y1);

			Ip.resetRect(gbr2);
			Ip.rectToImageTf(gbr2, x2, y2);

			return Ktk.collide(gbr1.rect, gbr2.rect);
		};

		static getByName(nama: string, buat: boolean): GbrObj {
			nama = Basik.ImgImpl.resolveGbrUrl(nama);

			for (let i = 0; i < Ip.daftar.length; i++) {
				let item = Ip.daftar[i];
				if (item.nama == nama) return item;
			}

			if (buat) {
				console.log("buat item baru");
				return Ip.Muat(nama);
			}

			return null;
		}

		static register(
			gbr: GbrObj,
		): GbrObj {

			// let hasil: GbrObj;
			// hasil = gbr;
			// hasil.tipeDrag = tipeDrag;
			// hasil.url = url;

			Ip.daftar.push(gbr);

			return gbr;
		}

		static free(gbr: Basik.GbrObj) {
			for (let i = 0; i < this.daftar.length; i++) {
				if (this.daftar[i] == gbr) {
					// img.kanvas = null;
					gbr.img = null;
					Basik.Ktk.destroy(gbr.rect);
					this.daftar.splice(i, 1);
					gbr.rect = null;
					return;
				}
			}
		}

		/**
		 * 
		 * @param gbr1 
		 * @param x1 
		 * @param y1 
		 * @param x2 
		 * @param y2 
		 * @returns 
		 */
		static dotInsideImage(gbr1: GbrObj, x1: number, y1: number, x2: number, y2: number): boolean {
			Ip.resetRect(gbr1);
			Ip.rectToImageTf(gbr1, x1, y1);

			return Ktk.collideDot(gbr1.rect, x2, y2);
		};

		/*
		private static gambarUbin(gbr: GbrObj, x: number = 0, y: number = 0, frame: number = 0) {
			let jmlH: number = 0;
			let jmlV: number = 0;

			if (gbr.dimuat == false) return;

			let w2: number = Math.floor(gbr.panjang);
			let h2: number = Math.floor(gbr.lebar);

			while (x < 0) {
				x += w2;
			}

			while (x > 0) {
				x -= w2;
			}

			while (y < 0) {
				y += h2;
			}

			while (y > 0) {
				y -= h2;
			}

			x -= w2;
			y -= h2;

			frame = Math.floor(frame);

			jmlH = Math.ceil((G.Kanvas().width + Math.abs(x)) / w2);
			jmlV = Math.ceil((G.Kanvas().height + Math.abs(y)) / h2);

			for (let i: number = 0; i < jmlH; i++) {
				for (let j: number = 0; j < jmlV; j++) {
					gbr.x = x + (i * w2);
					gbr.y = y + (j * h2);
					Ip.GamberSingle(gbr);
				}
			}


		}
			*/

		static AmbilPiksel(x: number = 0, y: number = 0): void {
			try {
				let data: Uint8ClampedArray = G.Kanvas().getContext('2d').getImageData(x, y, 1, 1).data;

				let hasil: number[] = [];

				hasil.push(data[0]);
				hasil.push(data[1]);
				hasil.push(data[2]);
				hasil.push(data[3]);

				G.merah = data[0];
				G.hijau = data[1];
				G.biru = data[2];
				G.alpha = data[3];

			}
			catch (e) {
				console.error(e);
			}
		}

		static SetPiksel(x: number = 0, y: number = 0) {
			G.Kanvas().getContext('2d').fillRect(Math.floor(x), Math.floor(y), 1, 1);
		}

		//depecrated
		/*
		static Draw(img: GbrObj) {
			img.ctrIdx = (++GbrObj.ctrDraw);

			// console.group("draw");
			if (img.dimuat) {
				// console.log("gambar selesai dimuat");
				gambarSetelahDimuat();
			}
			else {
				if (G.isUpdating) {
					//ketika update maka akan dipanggil berkali2, tidak perlu menunggu dimuat
				}
				else {
					// console.log('pending gambar', img);
					img.pendingStempel = true;
				}
			}
			// console.groupEnd();

			function gambarSetelahDimuat() {
				if (img.ubin) {
					Ip.gambarUbin(img, img.x, img.y, img.frame);
				}
				else {
					Ip.GamberSingle(img);
				}
				// if (img.temp) {
				//hapus image
				// ImgImpl.free(img);
				// console.log('free image ' + img.url);
				// }
			}
		}
			*/

		// private static GamberSingle(gbr: GbrObj) {
		// 	let ctx: CanvasRenderingContext2D = G.Kanvas().getContext('2d');
		// 	let jmlH: number = 0;
		// 	let frameX: number = 0;
		// 	let frameY: number = 0;
		// 	let imgW: number = 0;

		// 	if (gbr.dimuat == false) {
		// 		console.log("gambar single, belum di muat: ", gbr);
		// 		return;
		// 	}

		// 	imgW = gbr.img.naturalWidth;

		// 	// gbr.ctrIdx = GbrObj.ctrDraw++;
		// 	let frame = Math.floor(gbr.frame);

		// 	jmlH = Math.floor(imgW / gbr.panjangFrame);

		// 	frameX = (frame % jmlH);
		// 	frameY = Math.floor(frame / jmlH);
		// 	frameX *= gbr.panjangFrame;
		// 	frameY *= gbr.lebarFrame;
		// 	frameX = Math.floor(frameX);
		// 	frameY = Math.floor(frameY);

		// 	let x2: number = Math.floor(gbr.x);
		// 	let y2: number = Math.floor(gbr.y);

		// 	let w2: number = Math.floor(gbr.panjang);
		// 	let h2: number = Math.floor(gbr.lebar);

		// 	x2 -= (gbr.pusatX);
		// 	y2 -= (gbr.pusatY);

		// 	if (gbr.rotasi != 0) {
		// 		ctx.save();
		// 		ctx.translate(gbr.x, gbr.y);
		// 		ctx.rotate(gbr.rotasi * (Math.PI / 180));

		// 		drawImpl(-gbr.pusatX, -gbr.pusatY)

		// 		ctx.restore();
		// 	}
		// 	else {
		// 		ctx.save();

		// 		drawImpl(x2, y2);

		// 		ctx.restore();
		// 	}

		// 	function drawImpl(posX: number, posY: number) {
		// 		//
		// 		ctx.globalAlpha = gbr.alpha / 100;
		// 		ctx.drawImage(gbr.img, frameX, frameY, gbr.panjangFrame, gbr.lebarFrame, Math.floor(posX), Math.floor(posY), w2, h2);
		// 		ctx.globalAlpha = 1;
		// 	}

		// }

		//depecrated, kemungkinan fitur ini dihapus
		/*
		private static GambarTransUbin(trans: ItemRender) {
			let jmlH: number = 0;
			let jmlV: number = 0;
			let t: GbrTransform = trans.trans;

			if (trans.gbr.dimuat == false) return;

			let w2: number = Math.floor(t.panjang);
			let h2: number = Math.floor(t.lebar);

			while (t.x < 0) {
				t.x += w2;
			}

			while (t.x > 0) {
				t.x -= w2;
			}

			while (t.y < 0) {
				t.y += h2;
			}

			while (t.y > 0) {
				t.y -= h2;
			}

			t.x -= w2;
			t.y -= h2;

			// let frame = Math.floor(t.frame);//TODO

			jmlH = Math.ceil((G.Kanvas().width + Math.abs(t.x)) / w2);
			jmlV = Math.ceil((G.Kanvas().height + Math.abs(t.y)) / h2);

			// for (let i: number = 0; i < jmlH; i++) {
			// 	for (let j: number = 0; j < jmlV; j++) {
			// 		gbr.x = x + (i * w2);
			// 		gbr.y = y + (j * h2);
			// 		Ip.GamberTransSingle(trans);
			// 	}
			// }


		}
			*/

		static GambarTrans(t: ItemRender) {
			// if (t.trans.ubin) {
			// Ip.gambarUbin(img, img.x, img.y, img.frame);
			// ImgImpl.GambarTransUbin(t);
			// }
			// else {
			ImgImpl.GamberTransSingle(t);
			// }
		}

		static GamberTransSingle(t: ItemRender) {
			let ctx: CanvasRenderingContext2D = G.Kanvas().getContext('2d');
			let jmlH: number = 0;
			let frameX: number = 0;
			let frameY: number = 0;
			let imgW: number = 0;
			let trans = t.trans;
			let img = t.gbr.img;

			trans.update(t.gbr);

			imgW = trans.panjangOri;

			let frame = Math.floor(trans.frame);

			jmlH = Math.floor(imgW / trans.panjangFrame);

			frameX = (frame % jmlH);
			frameY = Math.floor(frame / jmlH);
			frameX *= trans.panjangFrame;
			frameY *= trans.lebarFrame;
			frameX = Math.floor(frameX);
			frameY = Math.floor(frameY);

			let x2: number = Math.floor(trans.x);
			let y2: number = Math.floor(trans.y);

			let w2: number = Math.floor(trans.panjang);
			let h2: number = Math.floor(trans.lebar);

			x2 -= (trans.pusatX);
			y2 -= (trans.pusatY);

			if (trans.rotasi != 0) {
				ctx.save();
				ctx.translate(trans.x, trans.y);
				ctx.rotate(trans.rotasi * (Math.PI / 180));

				drawImpl(-trans.pusatX, -trans.pusatY)

				ctx.restore();
			}
			else {
				ctx.save();

				drawImpl(x2, y2);

				ctx.restore();
			}

			function drawImpl(posX: number, posY: number) {
				const { panjangFrame, lebarFrame, alpha } = trans;

				// console.log({
				// 	frameX,
				// 	frameY,
				// 	panjangFrame,
				// 	lebarFrame,
				// 	posX,
				// 	posY,
				// 	w2,
				// 	h2,
				// 	alpha
				// });
				//

				ctx.globalAlpha = alpha / 100;
				ctx.drawImage(img, frameX, frameY, panjangFrame, lebarFrame, Math.floor(posX), Math.floor(posY), w2, h2);
				ctx.globalAlpha = 1;
			}

		}

		private static resetRect(img: GbrObj): void {
			let rect: Ktk = img.rect;
			let p: IV2D;

			p = rect.vs[0];
			p.x = 0;
			p.y = 0;

			p = rect.vs[1];
			p.x = img.panjangFrame - 1;
			p.y = 0;

			p = rect.vs[2];
			p.x = img.panjangFrame - 1;
			p.y = img.lebarFrame - 1;

			p = rect.vs[3];
			p.x = 0;
			p.y = img.lebarFrame - 1;

		}

		private static rectToImageTf(image: GbrObj, x: number, y: number): void {
			let rect: Ktk = image.rect;
			let p: IV2D;
			let x2: number = image.panjang - 1;
			let y2: number = image.lebar - 1;

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
			Ktk.translate(rect, -image.pusatX, -image.pusatY);

			//rotate
			Ktk.rotate(rect, image.rotasi, x, y, false);
		}

		static AllImageLoaded(): boolean {
			for (let i = 0; i < Ip.daftar.length; i++) {
				let img = Ip.daftar[i];
				if (!img.dimuat) return false;
			}

			return true;
		}

	}
}