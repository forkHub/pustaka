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
		}

		private down(img: Image, posCam: any, id: string) {
			let posAbs = {
				x: posCam.x - Camera.x,
				y: posCam.y - Camera.y
			}

			img.down = true;
			img.drgStartX = posAbs.x - img.x;
			img.drgStartY = posAbs.y - img.y;
			img.inputId = id;

			img.sudutTekanAwal = Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
			img.sudutAwal = img.rotation;
		}


		//TODO: call event
		private inputDown(posCam: any, id: string): void {
			console.group('input down');
			let posAbs = {
				x: posCam.x - Camera.x,
				y: posCam.y - Camera.y
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
						this.down(img, posCam, id);
					}
				}
			}

			//
			if (lastSprite) {
				this.down(lastSprite, posCam, id);
			}

			//
			console.groupEnd();
		}

		private inputMove(posCam: any, inputId: string): void {
			let posAbs = {
				x: posCam.x - Camera.x,
				y: posCam.y - Camera.y
			}

			Ip.daftar.forEach((img: Image) => {

				if (img.down && img.dragable && (img.inputId == inputId)) {
					img.dragged = true;

					if (img.tipeDrag == TypeDrag.drag || (img.tipeDrag == TypeDrag.remoteDrag)) {
						img.x = posAbs.x - img.drgStartX
						img.y = posAbs.y - img.drgStartY
						// console.debug('item drag move');
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