namespace Basik {

	//Fungsi untuk pergerakan sprite
	export class Spr3 {

		static gerakX(s: ImgObj, n: number) {
			s.x += n;
		}

		static gerakY(s: ImgObj, n: number) {
			s.y += n;
		}

		static gerakXY(s: ImgObj, x: number, y: number) {
			s.x += x;
			s.y += y;
		}

		static gerakSudut(s: ImgObj, n: number, sudut: number) {
			sudut *= Math.PI / 180;
			Spr3.gerakX(s, n * Math.cos(sudut));
			Spr3.gerakY(s, n * Math.sin(sudut));
		}

		static gerakPutar(s: ImgObj, sudut: number, sx: number, sy: number): void {
			Tf.rotateRel(s.x, s.y, sx, sy, sudut);
			s.x += Tf.lastX;
			s.y += Tf.lastY;
		}

		static menjauh(s: ImgObj, x: number, y: number, jml: number) {
			let sudut = Tf.sudut(s.x - x, s.y - y);
			Spr3.gerakSudut(s, jml, sudut);
		}

		static mendekat(s: ImgObj, x: number, y: number, jml: number) {
			let sudut = Tf.sudut(x - s.x, y - s.y);
			Spr3.gerakSudut(s, jml, sudut);
		}

	}
}