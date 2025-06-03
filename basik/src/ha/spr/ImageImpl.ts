namespace Basik {

	export class ImgImpl {
		static readonly props: string[] = [];
		static readonly daftar: Image[] = [];

		static CreateImage(width: number, height: number): Image {
			let h: Image = new Image();
			h.canvas = document.createElement('canvas')
			h.canvas.width = width;
			h.canvas.height = height;
			// h.ctx = h.canvas.getContext('2d');
			h.frameH = height;
			h.frameW = width;
			// h.panjangDiSet = true;
			// h.lebarDiSet = true;
			h.load = true;
			h.img = document.createElement('img');
			Ip.register(h, h.url, h.tipeDrag);
			return h;
		}

		static MuatAnimasi(url: string, pf: number, lf: number, tipeDrag: number = 0): Image {
			tipeDrag;
			return Ip.muatAnimAsync(url, pf, lf);
			// return Ip.register(img, url, tipeDrag);

		}

		static GambarSemua() {
			for (let i: number = 0; i < Ip.daftar.length; i++) {
				let item: Image = Ip.daftar[i];
				Ip.Draw(item);
			}
		}

		static muatAnimasiAsyncKanvas(
			url: string,
			pf: number,
			lf: number,
			canvas: HTMLCanvasElement,
			tipeDrag: number): Image {

			let img: Image = Ip.muatAnimAsyncCanvas(url, pf, lf, canvas);
			return Ip.register(img, url, tipeDrag);
		}

		// static muatAsyncBerbagiKanvas(
		// 	url: string,
		// 	canvas: HTMLCanvasElement,
		// 	tipeDrag: number): Image {

		// 	let img: Image = Ip.muatAsyncKanvas(url, canvas, () => { });
		// 	return Ip.register(img, url, tipeDrag);
		// }

		static register(
			image: Image,
			url: string,
			tipeDrag: number): Image {

			let hasil: Image;
			hasil = image;
			hasil.tipeDrag = tipeDrag;
			hasil.url = url;
			if (hasil.dragable) {
				if (hasil.tipeDrag == 0) {
					hasil.tipeDrag = 1;
				}
			}

			Ip.daftar.push(hasil);

			return hasil;
		}

		static free(img: Basik.Image) {
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

		static Muat(url: string, tipeDrag: number = 0, onload?: () => void): Image {
			if (!onload) onload = () => { };
			let img: Image = Ip.muatAsync(url, onload);
			tipeDrag;
			// let spr: Image = Ip.register(img, url, tipeDrag);
			return img;
		}

		static tabrakan(gbr1: Image, x1: number, y1: number, gbr2: Image, x2: number, y2: number): boolean {
			Ip.resetRect(gbr1);
			Ip.rectToImageTf(gbr1, x1, y1);

			Ip.resetRect(gbr2);
			Ip.rectToImageTf(gbr2, x2, y2);

			return Ktk.collide(gbr1.rect, gbr2.rect);
		};

		static dotInsideImage(gbr1: Image, x1: number, y1: number, x2: number, y2: number): boolean {
			Ip.resetRect(gbr1);
			Ip.rectToImageTf(gbr1, x1, y1);

			return Ktk.collideDot(gbr1.rect, x2, y2);
		};

		private static muatAnimAsync(url: string, fw: number, fh: number): Image {
			let canvas: HTMLCanvasElement = document.createElement('canvas');

			return Ip.muatAnimAsyncCanvas(url, fw, fh, canvas);
		}

		private static muatAnimAsyncCanvas(url: string, fw: number, fh: number, canvas: HTMLCanvasElement): Image {
			// let img: HTMLImageElement = document.createElement('img'); //;
			// let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			// let rect: Ktk;

			// rect = Ktk.buat(0, 0, fw, fh);
			canvas;

			let gbr: Image = new Image(url);
			gbr.isAnim = true;
			gbr.frameW = fw;
			gbr.frameH = fh;
			gbr.width = fw;
			gbr.height = fh;
			return gbr;

			// gbr.img = img;
			// gbr.width = img.naturalWidth;
			// gbr.height = img.naturalHeight;
			// gbr.frameH = fh;
			// gbr.frameW = fw;
			// gbr.isAnim = true;
			// gbr.handleX = 0;
			// gbr.handleY = 0;
			// gbr.rotasi = 0;
			// gbr.alpha = 100;
			// // gbr.ctx = ctx;
			// gbr.canvas = canvas;
			// gbr.rect = rect;
			// gbr.load = false;
			// // gbr.panjangDiSet = false;
			// // gbr.lebarDiSet = false;

			// // let gbr: IGambar = {
			// // 	img: img,
			// // 	panjang: img.naturalWidth,
			// // 	lebar: img.naturalHeight,
			// // 	frameH: fh,
			// // 	frameW: fw,
			// // 	isAnim: true,
			// // 	handleX: 0,
			// // 	handleY: 0,
			// // 	rotasi: 0,
			// // 	alpha: 1,
			// // 	ctx: ctx,
			// // 	canvas: canvas,
			// // 	rect: rect,
			// // 	load: false,
			// // 	panjangDiSet: false,
			// // 	lebarDiSet: false
			// // }

			// img.onload = () => {
			// 	imgOnLoad(img);
			// }

			// img.onerror = () => {
			// 	console.warn('gagal load image, url ' + url);
			// }

			// let img2: HTMLImageElement = ha.be.cache.getGbr(url);
			// if (img2) {
			// 	imgOnLoad(img2);
			// }
			// else {
			// 	img.src = url;
			// }

			// function imgOnLoad(img: HTMLImageElement) {
			// 	// console.log('img anim load ' + url);
			// 	canvas.width = img.naturalWidth;
			// 	canvas.height = img.naturalHeight;
			// 	ctx.drawImage(img, 0, 0);
			// 	gbr.load = true;

			// 	if (!gbr.width) {
			// 		gbr.width = fw;
			// 		// gbr.panjangDiSet = true;
			// 	}

			// 	if (!gbr.height) {
			// 		// gbr.lebarDiSet = true;
			// 		gbr.height = fh;
			// 	}

			// 	ha.be.cache.setFile(url, img);
			// }

			// return gbr;
		}

		private static muatAsync(url: string, onload: () => void): Image {
			let kanvas: HTMLCanvasElement = document.createElement('canvas');

			return Ip.muatAsyncKanvas(url, kanvas, onload);
		}


		// private static def(img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): Image {
		// 	let rect: Ktk;

		// 	rect = Ktk.buat(0, 0, img.naturalWidth, img.naturalHeight);

		// 	let gbr: Image;
		// 	gbr = new Image();

		// 	gbr.img = img;
		// 	gbr.width = img.naturalWidth;
		// 	gbr.height = img.naturalHeight;
		// 	// gbr.panjangDiSet = false;
		// 	// gbr.lebarDiSet = false;
		// 	gbr.frameH = img.naturalHeight;
		// 	gbr.frameW = img.naturalWidth;
		// 	gbr.isAnim = false;
		// 	gbr.handleX = 0;
		// 	gbr.handleY = 0;
		// 	gbr.rotasi = 0;
		// 	gbr.alpha = 100;
		// 	gbr.ctx = ctx;
		// 	gbr.canvas = canvas;
		// 	gbr.rect = rect;
		// 	gbr.load = false;
		// 	gbr.ctrIdx = 0

		// 	return gbr;
		// }

		static muatAsyncKanvas(url: string, canvas: HTMLCanvasElement, onload?: () => void): Image {
			// let img: HTMLImageElement = document.createElement('img');
			// let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

			canvas;
			onload;
			let gbr: Image;
			gbr = new Image(url);
			return gbr;

			// gbr = Ip.def(img, ctx, canvas);

			// img.onload = () => {
			// 	onload();
			// 	imgOnLoad(img);
			// }

			// img.onerror = () => {
			// 	console.warn('gagal load image, url ' + url);
			// 	imgOnLoadDefault();
			// }

			// let img2: HTMLImageElement = ha.be.cache.getGbr(url);
			// if (img2) {
			// 	imgOnLoad(img2);
			// }
			// else {
			// 	img.src = url;
			// }

			// function imgOnLoad(imgP: HTMLImageElement): void {
			// 	canvas.width = imgP.naturalWidth;
			// 	canvas.height = imgP.naturalHeight;

			// 	ctx.drawImage(imgP, 0, 0);
			// 	gbr.rect = Ktk.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);

			// 	gbr.load = true;
			// 	gbr.img = imgP;

			// 	if (!gbr.width) {
			// 		// gbr.panjangDiSet = true;
			// 		gbr.width = imgP.naturalWidth;
			// 	}

			// 	if (!gbr.height) {
			// 		gbr.height = imgP.naturalHeight;
			// 		// gbr.lebarDiSet = true;
			// 	}

			// 	gbr.frameH = imgP.naturalHeight;
			// 	gbr.frameW = imgP.naturalWidth;

			// 	ha.be.cache.setFile(url, imgP);
			// }

			// function imgOnLoadDefault(): void {
			// 	// console.log("img on load default");

			// 	// canvas.width = 32;
			// 	// canvas.height = 32;

			// 	// // ctx = canvas.getContext('2d');
			// 	// gbr.img = document.createElement('img');
			// 	// // ctx.drawImage(gbr.img, 0, 0);

			// 	// gbr.rect = Ktk.buat(0, 0, 32, 32);
			// 	// ctx.fillStyle = 'rgba(255, 255, 255, 100)';
			// 	// ctx.strokeStyle = 'rgba(255, 0, 0, 100)';
			// 	// ctx.beginPath();
			// 	// ctx.rect(0, 0, 32, 32);
			// 	// ctx.moveTo(0, 0);
			// 	// ctx.lineTo(31, 31);
			// 	// ctx.moveTo(0, 31);
			// 	// ctx.lineTo(31, 0);
			// 	// ctx.stroke();

			// 	// // ctx.setf
			// 	// // ctx.fillRect(0, 0, 32, 32);

			// 	// gbr.load = true;

			// 	// if (!gbr.panjangDiSet) {
			// 	// 	gbr.panjangDiSet = true;
			// 	// 	gbr.width = 32;
			// 	// }

			// 	// if (!gbr.lebarDiSet) {
			// 	// 	gbr.height = 32;
			// 	// 	gbr.lebarDiSet = true;
			// 	// }

			// 	// gbr.frameH = 32;
			// 	// gbr.frameW = 32;

			// 	// ha.be.cache.setFile(url, gbr.img);
			// }

			// // console.log(gbr);
			// return gbr;
		}

		private static gambarUbin(gbr: Image, x: number = 0, y: number = 0, frame: number = 0) {
			let jmlH: number = 0;
			let jmlV: number = 0;

			if (gbr.load == false) return;

			let w2: number = Math.floor(gbr.width);
			let h2: number = Math.floor(gbr.height);

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

			jmlH = Math.ceil((G.MainCanvas().width + Math.abs(x)) / w2);
			jmlV = Math.ceil((G.MainCanvas().height + Math.abs(y)) / h2);

			for (let i: number = 0; i < jmlH; i++) {
				for (let j: number = 0; j < jmlV; j++) {
					Ip.DrawSingle(gbr, x + (i * w2), y + (j * h2), frame);
				}
			}
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

		static Draw(img: Image) {
			if (img.tilable) {
				Ip.gambarUbin(img, img.x, img.y, img.frame);
			}
			else {
				Ip.DrawSingle(img, img.x, img.y, img.frame);
			}
		}

		private static DrawSingle(gbr: Image, x: number = 0, y: number = 0, frame: number = 0) {
			let ctx: CanvasRenderingContext2D = G.Canvas().getContext('2d');
			let jmlH: number = 0;
			// let jmlV: number = 0;
			let frameX: number = 0;
			let frameY: number = 0;

			// let rect: IRect = img.rect;

			if (gbr.load == false) return;

			gbr.ctrIdx = Image.ctrDraw++;
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

			let w2: number = Math.floor(gbr.width);
			let h2: number = Math.floor(gbr.height);

			x2 -= (gbr.handleX);
			y2 -= (gbr.handleY);

			if (gbr.rotation != 0) {
				ctx.save();
				ctx.translate(x, y);
				ctx.rotate(gbr.rotation * (Math.PI / 180));

				// ctx.globalAlpha = gbr.alpha / 100;
				// ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, -gbr.handleX, -gbr.handleY, w2, h2);
				drawImpl(-gbr.handleX, -gbr.handleY)

				ctx.restore();
			}
			else {
				ctx.save();

				// ctx.globalAlpha = gbr.alpha / 100;
				// ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, x2, y2, w2, h2);
				drawImpl(x2, y2);

				ctx.restore();
			}

			function drawImpl(dx: number, dy: number) {

				dx -= Camera.x;
				dy -= Camera.y;

				ctx.globalAlpha = gbr.alpha / 100;
				ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, Math.floor(dx), Math.floor(dy), w2, h2);
				// console.group('draw image');
				// console.log("x:", x, "y:", y, "x2:", x2, "y2:", y2);
				// console.groupEnd();
			}

			// debugger;
		}

		// static ukuran(gbr: ImgObj, w: number = 32, h: number = 32): void {
		// 	gbr.panjang = w;
		// 	gbr.lebar = h;
		// 	gbr.panjangDiSet = true;
		// 	gbr.lebarDiSet = true;
		// }

		private static resetRect(img: Image): void {
			let rect: Ktk = img.rect;
			let p: IV2D;

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

		private static rectToImageTf(image: Image, x: number, y: number): void {
			let rect: Ktk = image.rect;
			let p: IV2D;
			let x2: number = image.width - 1;
			let y2: number = image.height - 1;

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
			Ktk.translate(rect, -image.handleX, -image.handleY);

			//rotate
			Ktk.rotate(rect, image.rotation, x, y, false);
		}


		static AllImageLoaded(): boolean {
			for (let i = 0; i < Ip.daftar.length; i++) {
				let img = Ip.daftar[i];
				if (!img.load) return false;
			}

			return true;
		}

	}
	export const Ip = ImgImpl;
}