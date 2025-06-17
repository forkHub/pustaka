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
				// this.down();
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
				console.log("clear image mouse status")
				Ip.daftar.forEach((img: Image) => {
					img.down = false;
					img.dragged = false;
				});
			})
		}

		private down(img: Image, posCanvas: any, id: string) {
			let posAbs = {
				x: posCanvas.x - Camera.x,
				y: posCanvas.y - Camera.y
			}

			img.down = true;
			img.drgStartX = posAbs.x - img.x;
			img.drgStartY = posAbs.y - img.y;
			img.inputId = id;

			img.sudutTekanAwal = Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
			img.sudutAwal = img.rotation;
		}


		//TODO: call event
		private inputDown(posCanvas: any, id: string): void {
			console.group('input down');
			let posAbs = {
				x: posCanvas.x - Camera.x,
				y: posCanvas.y - Camera.y
			}

			let lastIdx: number = -1;
			let lastSprite: Image = null;

			for (let i: number = Ip.daftar.length - 1; i >= 0; i--) {
				let img: Image;

				img = Ip.daftar[i];

				if (Ip.dotInsideImage(img, img.x, img.y, posAbs.x, posAbs.y)) {
					if (img.ctrIdx > lastIdx) {
						lastIdx = img.ctrIdx;
						lastSprite = img;
					}
				}
				else {
					//remote drag
					if (img.tipeDrag == 3 || img.tipeDrag == 4) {
						this.down(img, posCanvas, id);
					}
				}
			}

			//
			if (lastSprite) {
				console.log("img pressed, id: " + id);
				this.down(lastSprite, posCanvas, id);
			}

			//
			console.groupEnd();
		}

		private inputMove(posCanvas: any, inputId: string): void {
			let posAbs = {
				x: posCanvas.x - Camera.x,
				y: posCanvas.y - Camera.y
			}

			Ip.daftar.forEach((img: Image) => {

				if (img.down && (img.tipeDrag != 0) && (img.inputId == inputId)) {
					img.dragged = true;

					if (img.tipeDrag == TypeDrag.drag || (img.tipeDrag == TypeDrag.remoteDrag)) {
						img.x = posAbs.x - img.drgStartX
						img.y = posAbs.y - img.drgStartY
						console.debug('item drag move');
					}
					else if (img.tipeDrag == TypeDrag.rotasi || (img.tipeDrag == TypeDrag.remoteRotation)) {
						let sudut2: number = Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
						let perbedaan: number = sudut2 - img.sudutTekanAwal;
						img.rotation = img.sudutAwal + perbedaan;
					}
					else {

					}

				}
			});
		}
	}

	export const sprInt: ImgIntHandler = new ImgIntHandler();
}