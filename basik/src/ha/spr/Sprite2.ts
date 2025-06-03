namespace Basik {
	enum TypeDrag {
		drag = 1,
		rotasi = 2
	}

	//Sprite interactivity
	class SprInt {

		private spriteDown(img: Image, posCam: any, id: number) {
			let posAbs = {
				x: posCam.x - Camera.x,
				y: posCam.y - Camera.y
			}

			img.down = true;
			img.drgStartX = posAbs.x - img.x;
			img.drgStartY = posAbs.y - img.y;
			img.button = id;

			img.sudutTekanAwal = Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
			img.sudutAwal = img.rotation;


			// console.group('sprite down event handler');
			// console.log("sudut tekan awal", s.sudutTekanAwal);
			// console.log("sudut awal", s.sudutAwal);
			// console.groupEnd();
		}

		inputDown(posCam: any, button: number): void {
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
					if (img.tipeDrag == 3 || img.tipeDrag == 4) {
						this.spriteDown(img, posCam, button);
					}
				}
			}

			//
			if (lastSprite) {
				this.spriteDown(lastSprite, posCam, button);
			}

			//
			console.groupEnd();
		}

		inputMove(posCam: any, button: number): void {
			let posAbs = {
				x: posCam.x - Camera.x,
				y: posCam.y - Camera.y
			}

			Ip.daftar.forEach((img: Image) => {

				if (img.down && img.dragable && (img.button == button)) {
					img.dragged = true;

					if (img.tipeDrag == TypeDrag.drag || (img.tipeDrag == 3)) {
						img.x = posAbs.x - img.drgStartX
						img.y = posAbs.y - img.drgStartY
						// console.debug('item drag move');
					}
					else if (img.tipeDrag == TypeDrag.rotasi || (img.tipeDrag == 4)) {
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

	export const sprInt: SprInt = new SprInt();
}