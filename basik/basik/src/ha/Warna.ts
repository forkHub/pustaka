namespace Basik {
	export class Warna {
		private static warnaAr: IWarna[] = [];

		static warna(idx: number = 0) {
			let item = Warna.warnaAr[idx];
			kanvas().getContext('2d').fillStyle = `rgba(${item.r}, ${item.g}, ${item.b}, 1)`;
		}

		static warnaGaris(idx: number = 0) {
			let item = Warna.warnaAr[idx];
			kanvas().getContext('2d').strokeStyle = `rgba(${item.r}, ${item.g}, ${item.b}, 1)`;
		}

		static init() {
			let s3 = Math.floor(256 / 6);
			let colM = 36;

			for (let r = 0; r <= 5; r++) {
				for (let g = 0; g <= 5; g++) {
					for (let b = 0; b <= 5; b++) {
						Warna.warnaAr.push({
							r: Math.floor(r * s3),
							g: Math.floor(g * s3),
							b: Math.floor(b * s3)
						})
					}
				}
			}

			for (let i = 0; i < colM; i++) {
				s3 = (i / colM) * 255;
				Warna.warnaAr.push({
					r: Math.floor(s3),
					g: Math.floor(s3),
					b: Math.floor(s3)
				})
			}
		}
	}
}
