namespace Basik {

	export class ImgImpl {
		static readonly props: string[] = [];
		static readonly daftar: Image[] = [];

		static init() {
			Event.addEventListener(Evt.MOUSE_UP, () => {
				Ip.daftar.forEach((img: Image) => {
					img.down = false;
					img.dragged = false;
				});
			})
		}

		static CreateImage(width: number, height: number): Image {
			let h: Image = new Image();
			h.canvas = document.createElement('canvas')
			h.canvas.width = width;
			h.canvas.height = height;
			h.frameH = height;
			h.frameW = width;
			h.width = width;
			h.height = height;
			h.load = true;
			h.img = document.createElement('img');
			Ip.register(h, h.url, h.dragType);
			return h;
		}

		static MuatAnimasi(url: string, pf: number, lf: number, tipeDrag: number = 0): Image {
			tipeDrag;

			let canvas: HTMLCanvasElement = document.createElement('canvas');

			canvas;

			let gbr: Image = new Image(url);
			gbr.isAnim = true;
			gbr.frameW = pf;
			gbr.frameH = lf;
			gbr.width = pf;
			gbr.height = lf;
			return gbr;

			// return Ip.muatAnimAsyncCanvas(url, pf, lf, canvas);
			// return Ip.muatAnimAsync(url, pf, lf);
			// return Ip.register(img, url, tipeDrag);

		}

		static register(
			image: Image,
			url: string,
			tipeDrag: number): Image {

			let hasil: Image;
			hasil = image;
			hasil.dragType = tipeDrag;
			hasil.url = url;

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

		static Muat(url: string): Image {
			return new Image(url);
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

		private static gambarUbin(img: Image, x: number = 0, y: number = 0, frame: number = 0) {
			let jmlH: number = 0;
			let jmlV: number = 0;

			if (img.load == false) return;

			let w2: number = Math.floor(img.width);
			let h2: number = Math.floor(img.height);

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
					Ip.DrawSingle(img, x + (i * w2), y + (j * h2), frame);
				}
			}
		}

		static GetPixel(x: number = 0, y: number = 0): void {
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
			let dx = img.x - Camera.x;
			let dy = img.y - Camera.y;
			if (img.load == false) return;
			img.ctrIdx = Image.ctrDraw++;

			if (img.tilable) {
				Ip.gambarUbin(img, dx, dy, img.frame);
			}
			else {
				Ip.DrawSingle(img, dx, dy, img.frame);
			}
		}

		private static DrawSingle(img: Image, x: number = 0, y: number = 0, frame: number = 0) {
			let ctx: CanvasRenderingContext2D = G.Canvas().getContext('2d');
			let jmlH: number = 0;
			let frameX: number = 0;
			let frameY: number = 0;

			frame = Math.floor(frame);
			jmlH = Math.floor(img.img.naturalWidth / img.frameW);

			frameX = (frame % jmlH);
			frameY = Math.floor(frame / jmlH);

			frameX *= img.frameW;
			frameY *= img.frameH;

			frameX = Math.floor(frameX);
			frameY = Math.floor(frameY);

			let x2: number = Math.floor(x);
			let y2: number = Math.floor(y);

			let w2: number = Math.floor(img.width);
			let h2: number = Math.floor(img.height);

			x2 -= (img.handleX);
			y2 -= (img.handleY);

			if (img.rotation != 0) {
				ctx.save();
				ctx.translate(x, y);
				ctx.rotate(img.rotation * (Math.PI / 180));

				drawImpl(-img.handleX, -img.handleY)

				ctx.restore();
			}
			else {
				ctx.save();

				drawImpl(x2, y2);

				ctx.restore();
			}

			function drawImpl(dx: number, dy: number) {
				ctx.globalAlpha = img.alpha / 100;
				ctx.drawImage(img.canvas, frameX, frameY, img.frameW, img.frameH, Math.floor(dx), Math.floor(dy), w2, h2);
			}
		}

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