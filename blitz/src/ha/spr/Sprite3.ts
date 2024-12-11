namespace Basik {

	//Fungsi untuk pergerakan sprite
	export class Spr3 {

		static gerakX(s: ImageObj, n: number) {
			s.x += n;
		}

		static gerakY(s: ImageObj, n: number) {
			s.y += n;
		}

		static gerakXY(s: ImageObj, x: number, y: number) {
			s.x += x;
			s.y += y;
		}

		static gerakSudut(s: ImageObj, n: number, sudut: number) {
			sudut *= Math.PI / 180;
			Spr3.gerakX(s, n * Math.cos(sudut));
			Spr3.gerakY(s, n * Math.sin(sudut));
		}

		static gerakPutar(s: ImageObj, sudut: number, sx: number, sy: number): void {
			Transform.rotateRel(s.x, s.y, sx, sy, sudut);
			s.x += Transform.lastX;
			s.y += Transform.lastY;
		}

		static menjauh(s: ImageObj, x: number, y: number, jml: number) {
			let sudut = Transform.sudut(s.x - x, s.y - y);
			Spr3.gerakSudut(s, jml, sudut);
		}

		static mendekat(s: ImageObj, x: number, y: number, jml: number) {
			let sudut = Transform.sudut(x - s.x, y - s.y);
			Spr3.gerakSudut(s, jml, sudut);
		}

	}
}