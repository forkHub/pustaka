///<reference path="./ImageImpl.ts"/>

namespace Basik {

	export class Image {

		/**
		 * 
		 * @param width 
		 * @param height 
		 * @returns 
		 */
		static CreateImage(width: number, height: number): ImageObj {
			return ImgImpl.CreateImage(width, height)
		}

		/**
		 * 
		 * @param s {ISprObj} sprite 
		 * @param onload {() => void} optional, fungsi yang dipanggil sprite selesai dimuat
		 * @returns 
		 */
		static Copy(s: ImageObj, onload?: () => void): ImageObj {
			if (!onload) {
				onload = () => { };
			}

			if (s.isAnim) {
				console.debug('copy sprite anim');
				console.debug(s);
				return ImgImpl.muatAnimasiAsyncKanvas(s.url, s.frameW, s.frameH, s.dragable, s.canvas, s.tipeDrag);
			}
			else {
				return ImgImpl.muatAsyncBerbagiKanvas(s.url, s.dragable, s.canvas, s.tipeDrag, onload)
			}
		}

		/**
		 * 
		 */
		static DrawAll() {
			ImgImpl.GambarSemua();
		}

		/**
		 * 
		 * @param imgA 
		 * @param imgB 
		 * @returns 
		 */
		static Collide(imgA: ImageObj, imgB: ImageObj): boolean {
			return ImgImpl.tabrakan(imgA, imgA.x, imgA.y, imgB, imgB.x, imgB.y)
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
		static LoadAnim(url: string, fw: number, fh: number, dragable: boolean = false, dragType: number = 0): ImageObj {
			return ImgImpl.MuatAnimasi(url, fw, fh, dragable, dragType);
		}

		/**
		 * 
		 * @param url (string) url gambar
		 * @param dragable 
		 * @param dragType 
		 * @returns 
		 */
		static Load(url: string, dragable: boolean = false, dragType: number = 0): ImageObj {
			return ImgImpl.Muat(url, dragable, dragType, () => { });
		}

		/**
		 * Menggambar sprite ke layar
		 * @param img 
		 * @param frame 
		 */
		static Draw(img: ImageObj, frame?: number): void {
			ImgImpl.gambar(img, img.x, img.y, frame);
		}

		/**
		 * 
		 * @param img 
		 * @param x 
		 * @param y 
		 * @param frame 
		 * @returns 
		 */
		static DrawXY(img: ImageObj, x: number, y: number, frame?: number): void {
			ImgImpl.DrawImageXY(img, x, y, frame);
		}

		/**
		 * 
		 * @param img 
		 * @param angle 
		 * @param jarak 
		 * @param x2 
		 * @param y2 
		 * @param skalaX 
		 * @param skalaY 
		 */
		static PositionPolar(img: ImageObj, angle: number, jarak: number, x2: number, y2: number, skalaX: number = 1, skalaY: number = 1, tilt: number = 0): void {
			ImgImpl.PositionImagePolar(img, angle, jarak, x2, y2, skalaX, skalaY, tilt);
		}

		/**
		 * 
		 * @param img 
		 * @param x 
		 * @param y 
		 * @param frame 
		 */
		static DrawTile(img: ImageObj, x: number = 0, y: number = 0, frame: number = 0) {
			ImgImpl.gambarUbin(img, x, y, frame);
		}

		/**
		 * 
		 * @param x 
		 * @param y 
		 * @returns 
		 */
		static GetPixel(x: number = 0, y: number = 0): number[] {
			return ImgImpl.AmbilPiksel(x, y);
		}

		static SetPiksel(x: number = 0, y: number = 0) {
			return ImgImpl.AmbilPiksel(x, y);
		}

		/**
		 * 
		 * @returns boolean true if all image has been loaded
		 */
		static AllImageLoaded(): boolean {
			return ImgImpl.AllImageLoaded();
		}

	}

}
