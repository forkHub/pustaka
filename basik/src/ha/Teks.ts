namespace Basik {

	export class Teks {
		private static _name: string = 'Arial';
		private static _size: number = 12;
		private static _x: number = 120;
		private static _y: number = 10;


		public static get size(): number {
			return Teks._size;
		}
		public static set size(value: number) {
			Teks._size = value;
		}

		static Goto(x: number, y: number): void {
			Teks._x = x;
			Teks._y = y;
		}

		static Name(name: string = 'cursive'): void {
			Teks._name = name;
		}

		static Size(n: number = 12): void {
			Teks.size = n;
		}

		static Write(teks: string): void {
			G.Canvas().getContext('2d').font = Teks.size + 'px ' + Teks._name;
			G.Canvas().getContext('2d').fillText(teks, Teks._x, Teks._y);
			G.Canvas().getContext('2d').strokeText(teks, Teks._x, Teks._y);
		}

	}
	export const Tk = Teks;
}