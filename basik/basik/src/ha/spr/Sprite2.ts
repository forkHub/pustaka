namespace Basik {
	enum TypeDrag {
		drag = 1,
		rotasi = 2,
		remoteDrag = 3,
		remoteRotation = 4
	}

	//Sprite interactivity
	class ImgIntHandler {

		init() {
			Event.addEventListener(Evt.MOUSE_DOWN, () => {
				this.inputDown({
					x: Input.global.x,
					y: Input.global.y
				},
					Input.global.id
				)
			});

			Event.addEventListener(Evt.MOUSE_MOVE, () => {
				this.inputMove({
					x: Input.global.x,
					y: Input.global.y
				},
					Input.global.id)
			})

			Event.addEventListener(Evt.MOUSE_UP, () => {
				Ip.daftar.forEach((img: GbrObj) => {
					img.ditekan = false;
					img.diDrag = false;
				});
			})
		}

		private down(img: GbrObj, posCanvas: { x: number, y: number }, id: string) {
			let posAbs = {
				x: posCanvas.x - Camera.x,
				y: posCanvas.y - Camera.y
			}

			img.ditekan = true;
			img.dragAwalX = posAbs.x - img.x;
			img.dragAwalY = posAbs.y - img.y;
			img.inputId = id;

			img.initialMouseAngle = Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
			img.initialAngle = img.rotasi;
		}

		private inputDown(posCanvas: { x: number, y: number }, id: string): void {
			let posAbs = {
				x: posCanvas.x - Camera.x,
				y: posCanvas.y - Camera.y
			}

			let lastIdx: number = -1;
			let lastSprite: GbrObj = null;

			for (let i: number = Ip.daftar.length - 1; i >= 0; i--) {
				const img = Ip.daftar[i];

				if (Ip.dotInsideImage(img, img.x, img.y, posAbs.x, posAbs.y)) {
					if (img.ctrIdx > lastIdx) {
						lastIdx = img.ctrIdx;
						lastSprite = img;
					}
				}
				else {
					if (img.tipeDrag === TypeDrag.remoteDrag || img.tipeDrag === TypeDrag.remoteRotation) {
						if (img.ctrIdx > lastIdx) {
							lastIdx = img.ctrIdx;
							lastSprite = img;
						}
						// this.down(img, posCanvas, id);
					}
				}
			}

			if (lastSprite) {
				this.down(lastSprite, posCanvas, id);
			}
		}

		private inputMove(posCanvas: any, inputId: string): void {
			let posAbs = {
				x: posCanvas.x - Camera.x,
				y: posCanvas.y - Camera.y
			}

			Ip.daftar.forEach((img: GbrObj) => {

				if (img.ditekan && (img.tipeDrag != 0) && (img.inputId == inputId)) {
					img.diDrag = true;

					if (img.tipeDrag == TypeDrag.drag || (img.tipeDrag == TypeDrag.remoteDrag)) {
						img.x = posAbs.x - img.dragAwalX
						img.y = posAbs.y - img.dragAwalY
					}
					else if (img.tipeDrag == TypeDrag.rotasi || (img.tipeDrag == TypeDrag.remoteRotation)) {
						let sudut2: number = Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
						let perbedaan: number = sudut2 - img.initialMouseAngle;
						img.rotasi = img.initialAngle + perbedaan;
					}
					else {

					}

				}
			});
		}
	}

	export const sprInt: ImgIntHandler = new ImgIntHandler();
}