namespace Basik {
	enum tipeDrag {
		drag = 1,
		rotasi = 2,
		remoteDrag = 3,
		remoteRotation = 4
	}

	//Sprite interactivity
	class GbrInter {

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

		private handleGbrDitekan(img: GbrObj, posCanvas: { x: number, y: number }, id: string) {
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
				const gbr = Ip.daftar[i];

				if (gbr.tipeDrag === tipeDrag.remoteDrag || gbr.tipeDrag === tipeDrag.remoteRotation) {
					this.handleGbrDitekan(gbr, posCanvas, id);
				}
				else {
					if (Ip.dotInsideImage(gbr, gbr.x, gbr.y, posAbs.x, posAbs.y)) {
						if (gbr.ctrIdx > lastIdx) {
							lastIdx = gbr.ctrIdx;
							lastSprite = gbr;
						}
					}
				}
			}

			if (lastSprite) {
				this.handleGbrDitekan(lastSprite, posCanvas, id);
			}
		}

		private inputMove(posCanvas: { x: number, y: number }, inputId: string): void {
			let posAbs = {
				x: posCanvas.x - Camera.x,
				y: posCanvas.y - Camera.y
			}

			Ip.daftar.forEach((img: GbrObj) => {

				if (img.ditekan && (img.tipeDrag !== 0) && (img.inputId === inputId)) {
					img.diDrag = true;

					if (img.tipeDrag === tipeDrag.drag || (img.tipeDrag === tipeDrag.remoteDrag)) {
						img.x = posAbs.x - img.dragAwalX
						img.y = posAbs.y - img.dragAwalY
					}
					else if (img.tipeDrag == tipeDrag.rotasi || (img.tipeDrag == tipeDrag.remoteRotation)) {
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

	export const sprInt: GbrInter = new GbrInter();
}