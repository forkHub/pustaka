///<reference path="./ImageImpl.ts"/>

namespace Basik {

	export class Img {

		/**
		 * 
		 * @param width 
		 * @param height 
		 * @returns 
		 */
		static CreateImage(width: number, height: number): ImgObj {
			return Ip.CreateImage(width, height)
		}

		/**
		 * 
		 * @param s {ISprObj} sprite 
		 * @param onload {() => void} optional, fungsi yang dipanggil sprite selesai dimuat
		 * @returns 
		 */
		static CopyImage(s: ImgObj, onload?: () => void): ImgObj {
			if (!onload) {
				onload = () => { };
			}

			if (s.isAnim) {
				console.debug('copy sprite anim');
				console.debug(s);
				return Ip.muatAnimasiAsyncKanvas(s.url, s.frameW, s.frameH, s.dragable, s.canvas, s.tipeDrag);
			}
			else {
				return Ip.muatAsyncBerbagiKanvas(s.url, s.dragable, s.canvas, s.tipeDrag, onload)
			}
		}

		/**
		 * 
		 */
		static DrawAllImage() {
			Ip.GambarSemua();
		}

		/**
		 * 
		 * @param imgA 
		 * @param imgB 
		 * @returns 
		 */
		static Collide(imgA: ImgObj, imgB: ImgObj): boolean {
			return Ip.tabrakan(imgA, imgA.x, imgA.y, imgB, imgB.x, imgB.y)
		}

		/**
		 * 
		 * @param url 
		 * @param fw 
		 * @param fh 
		 * @param dragable 
		 * @param dragType 
		 * @returns 
		 */
		static LoadAnimImage(url: string, fw: number, fh: number, dragable: boolean = false, dragType: number = 0): ImgObj {
			return Ip.MuatAnimasi(url, fw, fh, dragable, dragType);
		}

		/**
		 * 
		 * @param url (string) url gambar
		 * @param dragable 
		 * @param dragType 
		 * @returns 
		 */
		static LoadImage(url: string, dragable: boolean = false, dragType: number = 0): ImgObj {
			return Ip.Muat(url, dragable, dragType, () => { });
		}

		/**
		 * Menggambar sprite ke layar
		 * @param img 
		 * @param frame 
		 */
		static DrawImage(img: ImgObj, frame?: number): void {
			Ip.gambar(img, img.x, img.y, frame);
		}

		// /**
		//  * 
		//  * @param img 
		//  * @param x 
		//  * @param y 
		//  * @param frame 
		//  * @returns 
		//  */
		// static DrawImageXY(img: ImgObj, x: number, y: number, frame?: number): void {
		// 	Ip.DrawImageXY(img, x, y, frame);
		// }

		/**
		 * 
		 * @param img 
		 * @param x 
		 * @param y 
		 * @param frame 
		 */
		static Tile(img: ImgObj, x: number = 0, y: number = 0, frame: number = 0) {
			Ip.gambarUbin(img, x, y, frame);
		}

		/**
		 * 
		 * @param x 
		 * @param y 
		 */
		static GetPixel(x: number = 0, y: number = 0) {
			Ip.AmbilPiksel(x, y);
		}

		static SetPiksel(x: number = 0, y: number = 0) {
			return Ip.AmbilPiksel(x, y);
		}

		/**
		 * 
		 * @returns boolean true if all image has been loaded
		 */
		static AllImageLoaded(): boolean {
			return Ip.AllImageLoaded();
		}

	}
	export const Im = Img;

}
