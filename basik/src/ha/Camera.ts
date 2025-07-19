namespace Basik {
	export class Camera {
		private static _x: number = 0;
		public static get x(): number {
			return Camera._x;
		}
		public static set x(value: number) {
			Camera._x = value;
		}
		private static _y: number = 0;
		public static get y(): number {
			return Camera._y;
		}
		public static set y(value: number) {
			Camera._y = value;
		}
		private static _img: Basik.Image;
		public static get img(): Basik.Image {
			return Camera._img;
		}
		public static set img(value: Basik.Image) {
			Camera._img = value;
		} 

		static init() {
			function update() {
				window.requestAnimationFrame(update);
			}
			window.requestAnimationFrame(update);
		}

	}
}