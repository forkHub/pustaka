namespace ha.be {

	//Fungsi untuk pergerakan sprite
	export class Spr3 {

		static gerakX(s: ISpr, n: number) {
			s.x += n;
		}

		static gerakY(s: ISpr, n: number) {
			s.y += n;
		}

		static gerakXY(s: ISpr, x: number, y: number) {
			s.x += x;
			s.y += y;
		}

		static gerakSudut(s: ISpr, n: number, sudut: number) {
			sudut *= Math.PI / 180;
			ha.be.Spr3.gerakX(s, n * Math.cos(sudut));
			ha.be.Spr3.gerakY(s, n * Math.sin(sudut));
		}

		static gerakPutar(s: ISpr, sudut: number, sx: number, sy: number): void {
			Transform.rotateRel(s.x, s.y, sx, sy, sudut);
			s.x += Transform.lastX;
			s.y += Transform.lastY;
		}

		static menjauh(s: ISpr, x: number, y: number, jml: number) {
			let sudut = Transform.sudut(s.x - x, s.y - y);
			Spr3.gerakSudut(s, jml, sudut);
		}

		static mendekat(s: ISpr, x: number, y: number, jml: number) {
			let sudut = Transform.sudut(x - s.x, y - s.y);
			Spr3.gerakSudut(s, jml, sudut);
		}

	}
}