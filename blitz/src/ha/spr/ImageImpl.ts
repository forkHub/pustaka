namespace Basik {

	export class ImgImpl {
		static readonly props: string[] = [];
		static readonly daftar: ImgObj[] = [];

		static CreateImage(width: number, height: number): ImgObj {
			let h: ImgObj = new ImgObj();
			h.canvas = document.createElement('canvas')
			h.canvas.width = width;
			h.canvas.height = height;
			h.ctx = h.canvas.getContext('2d');
			h.frameH = height;
			h.frameW = width;
			h.panjangDiSet = true;
			h.lebarDiSet = true;
			h.load = true;
			h.img = document.createElement('img');
			Ip.register(h, h.dragable, h.url, h.tipeDrag);
			return h;
		}

		static MuatAnimasi(url: string, pf: number, lf: number, bisaDiDrag: boolean = false, tipeDrag: number = 0): ImgObj {

			let img: ImgObj = Ip.muatAnimAsync(url, pf, lf);
			return Ip.register(img, bisaDiDrag, url, tipeDrag);
		}

		static GambarSemua() {
			for (let i: number = 0; i < Ip.daftar.length; i++) {
				let item: ImgObj = Ip.daftar[i];
				Im.DrawImage(item);
			}
		}

		static Bound(s: ImgObj): Ktk {
			Ip.resetRect(s);
			Ip.rectToImageTf(s, s.x, s.y);
			return s.rect;
		}

		static muatAnimasiAsyncKanvas(
			url: string,
			pf: number,
			lf: number,
			bisaDiDrag: boolean,
			canvas: HTMLCanvasElement,
			tipeDrag: number): ImgObj {

			let img: ImgObj = Ip.muatAnimAsyncCanvas(url, pf, lf, canvas);
			return Ip.register(img, bisaDiDrag, url, tipeDrag);
		}

		static muatAsyncBerbagiKanvas(
			url: string,
			dragable = false,
			canvas: HTMLCanvasElement,
			tipeDrag: number,
			onload: () => void): ImgObj {

			let img: ImgObj = Ip.muatAsyncKanvas(url, canvas, onload);
			return Ip.register(img, dragable, url, tipeDrag);
		}

		private static register(
			image: ImgObj,
			dragable: boolean = false,
			url: string,
			tipeDrag: number): ImgObj {

			let hasil: ImgObj;
			hasil = image;
			hasil.dragable = dragable;
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

		static Muat(url: string, bisaDiDrag: boolean = false, tipeDrag: number = 0, onload?: () => void): ImgObj {
			if (!onload) onload = () => { };
			let img: ImgObj = Ip.muatAsync(url, onload);
			let spr: ImgObj = Ip.register(img, bisaDiDrag, url, tipeDrag);
			return spr;
		}

		static DrawImageXY(s: ImgObj, x: number, y: number, frame?: number): void {
			s.x = x;
			s.y = y;
			Ip.gambar(s, x, y, frame);
		}

		static PositionImagePolar(img: ImgObj, angle: number, jarak: number, x2: number, y2: number, skalaX: number = 1, skalaY: number = 1, tilt: number = 0): void {
			let p: Basik.Pt = Pt.posPolar(jarak, angle, x2, y2);
			p.y -= y2;
			p.y *= skalaY;
			p.y += y2;

			p.x -= x2;
			p.x *= skalaX;
			p.x += x2;

			//tilt
			Tf.rotateRel(p.x, p.y, x2, y2, tilt);
			p.x = Tf.lastX;
			p.y = Tf.lastY;

			img.x = p.x;
			img.y = p.y;
		}

		static buatBagiCanvas(canvas: HTMLCanvasElement, w: number = 32, h: number = 32, frameW: number = 32, frameH: number = 32): ImgObj {
			let img: ImgObj;

			canvas.width = w;
			canvas.height = h;

			let rect: Ktk = Ktk.buat(0, 0, frameW, frameH);

			img = new ImgObj();
			img.load = true;
			img.panjang = w;
			img.lebar = h;
			img.img = null;
			img.frameH = frameH;
			img.frameW = frameW;
			img.handleX = 0;
			img.handleY = 0;
			img.alpha = 100;
			img.isAnim = false;
			img.canvas = canvas;
			img.ctx = canvas.getContext('2d');
			img.rect = rect;
			img.load = true;
			img.panjangDiSet = true;
			img.lebarDiSet = true;

			return img;
		}

		//depecrated
		static panjang(gbr: ImgObj, pj?: number): number {
			if (typeof pj == 'number') {
				gbr.panjang = pj;
				gbr.panjangDiSet = true;
			}

			return gbr.panjang;
		};

		//depecrated
		static lebar(gbr: ImgObj, lb?: number): number {
			if (typeof lb == 'number') {
				gbr.lebar = lb;
				gbr.lebarDiSet = true;
			}

			return gbr.lebar;
		};

		static tabrakan(gbr1: ImgObj, x1: number, y1: number, gbr2: ImgObj, x2: number, y2: number): boolean {
			Ip.resetRect(gbr1);
			Ip.rectToImageTf(gbr1, x1, y1);

			Ip.resetRect(gbr2);
			Ip.rectToImageTf(gbr2, x2, y2);

			return Ktk.collide(gbr1.rect, gbr2.rect);
		};

		static dotDidalamGambar(gbr1: ImgObj, x1: number, y1: number, x2: number, y2: number): boolean {
			Ip.resetRect(gbr1);
			Ip.rectToImageTf(gbr1, x1, y1);

			return Ktk.collideDot(gbr1.rect, x2, y2);
		};

		static muatAnimAsync(url: string, fw: number, fh: number): ImgObj {
			let canvas: HTMLCanvasElement = document.createElement('canvas');

			return Ip.muatAnimAsyncCanvas(url, fw, fh, canvas);
		}

		static muatAnimAsyncCanvas(url: string, fw: number, fh: number, canvas: HTMLCanvasElement): ImgObj {
			let img: HTMLImageElement = document.createElement('img'); //;
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: Ktk;

			rect = Ktk.buat(0, 0, fw, fh);

			let gbr: ImgObj = new ImgObj();
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
			gbr.alpha = 100;
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

		static muatAsync(url: string, onload: () => void): ImgObj {
			let kanvas: HTMLCanvasElement = document.createElement('canvas');

			return Ip.muatAsyncKanvas(url, kanvas, onload);
		}

		static def(img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): ImgObj {
			let rect: Ktk;

			rect = Ktk.buat(0, 0, img.naturalWidth, img.naturalHeight);

			let gbr: ImgObj;
			gbr = new ImgObj();

			//TODO: refaktor
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
			gbr.alpha = 100;
			gbr.ctx = ctx;
			gbr.canvas = canvas;
			gbr.rect = rect;
			gbr.load = false;
			gbr.ctrIdx = 0

			return gbr;
		}

		static muatAsyncKanvas(url: string, canvas: HTMLCanvasElement, onload: () => void): ImgObj {
			let img: HTMLImageElement = document.createElement('img');
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

			let gbr: ImgObj;
			gbr = new ImgObj();
			gbr = Ip.def(img, ctx, canvas);

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
				gbr.rect = Ktk.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);

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

				gbr.rect = Ktk.buat(0, 0, 32, 32);
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

		static gambarUbin(gbr: ImgObj, x: number = 0, y: number = 0, frame: number = 0) {
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

			jmlH = Math.ceil((G.canvas.width + Math.abs(x)) / w2);
			jmlV = Math.ceil((G.canvas.height + Math.abs(y)) / h2);

			for (let i: number = 0; i < jmlH; i++) {
				for (let j: number = 0; j < jmlV; j++) {
					Ip.gambar(gbr, x + (i * w2), y + (j * h2), frame);
				}
			}
		}

		static AmbilPiksel(x: number = 0, y: number = 0): number[] {
			try {
				let data: Uint8ClampedArray = G.context.getImageData(x, y, 1, 1).data;

				let hasil: number[] = [];

				hasil.push(data[0]);
				hasil.push(data[1]);
				hasil.push(data[2]);
				hasil.push(data[3]);

				G.merah = data[0];
				G.hijau = data[1];
				G.biru = data[2];
				G.transparan = data[3];
				G.FillColor(G.merah, G.hijau, G.biru, G.transparan);

				return hasil;
			}
			catch (e) {
				// console.error(e);
			}

			return [0, 0, 0];
		}

		static SetPiksel(x: number = 0, y: number = 0) {
			G.context.fillRect(Math.floor(x), Math.floor(y), 1, 1);
		}

		static gambar(gbr: ImgObj, x: number = 0, y: number = 0, frame: number = 0) {
			let ctx: CanvasRenderingContext2D = G.context;
			let jmlH: number = 0;
			// let jmlV: number = 0;
			let frameX: number = 0;
			let frameY: number = 0;

			// let rect: IRect = img.rect;

			if (gbr.load == false) return;

			gbr.ctrIdx = ImgObj.ctrDraw++;
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
				ctx.globalAlpha = gbr.alpha / 100;
				ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, dx, dy, w2, h2);
				// console.group('gmbar image');
				// console.log("x:", x, "y:", y, "x2:", x2, "y2:", y2);
				console.groupEnd();
			}

			// debugger;
		}

		static ukuran(gbr: ImgObj, w: number = 32, h: number = 32): void {
			gbr.panjang = w;
			gbr.lebar = h;
			gbr.panjangDiSet = true;
			gbr.lebarDiSet = true;
		}

		public static resetRect(img: ImgObj): void {
			let rect: Ktk = img.rect;
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

		static rectToImageTf(image: ImgObj, x: number, y: number): void {
			let rect: Ktk = image.rect;
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
			Ktk.translate(rect, x, y);
			Ktk.translate(rect, -image.handleX, -image.handleY);

			//rotate
			Ktk.rotate(rect, image.rotasi, x, y, false);
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