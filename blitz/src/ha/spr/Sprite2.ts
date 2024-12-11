namespace Basik {
	enum TypeDrag {
		drag = 1,
		rotasi = 2
	}

	class SprInt {

		spriteDown(s: ImageObj, pos: any, id: number) {
			s.down = true;
			s.drgStartX = pos.x - s.x;
			s.drgStartY = pos.y - s.y;
			s.inputId = id;
			s.jmlHit++;

			s.sudutTekanAwal = Transform.sudut(pos.x - s.x, pos.y - s.y);
			s.sudutAwal = s.rotasi;
			console.group('sprite down event handler');
			console.log("sudut tekan awal", s.sudutTekanAwal);
			console.log("sudut awal", s.sudutAwal);
			console.groupEnd();
		}

		inputDown(pos: any, id: number): void {
			//sprite down
			console.group('input down');

			let lastIdx: number = -1;
			let lastSprite: ImageObj = null;

			for (let i: number = ImgImpl.daftar.length - 1; i >= 0; i--) {
				let item: ImageObj;

				item = ImgImpl.daftar[i];

				if (ImgImpl.dotDidalamGambar(item, item.x, item.y, pos.x, pos.y)) {
					if (item.ctrIdx > lastIdx) {
						lastIdx = item.ctrIdx;
						lastSprite = item;
					}
				}
				else {
					if (item.tipeDrag == 3 || item.tipeDrag == 4) {
						this.spriteDown(item, pos, id);
					}
				}
			}

			//
			if (lastSprite) {
				this.spriteDown(lastSprite, pos, id);
			}

			//
			console.groupEnd();
		}

		inputMove(pos: any, pointerId: number): void {
			ImgImpl.daftar.forEach((item: ImageObj) => {

				if (item.down && item.dragable && (item.inputId == pointerId)) {
					item.dragged = true;

					if (item.tipeDrag == TypeDrag.drag || (item.tipeDrag == 3)) {
						item.x = pos.x - item.drgStartX
						item.y = pos.y - item.drgStartY
						console.debug('item drag move');
					}
					else if (item.tipeDrag == TypeDrag.rotasi || (item.tipeDrag == 4)) {
						let sudut2: number = Transform.sudut(pos.x - item.x, pos.y - item.y);
						let perbedaan: number = sudut2 - item.sudutTekanAwal;
						item.rotasi = item.sudutAwal + perbedaan;
						console.group();
						console.log("sudut", sudut2);
						console.log("beda", perbedaan);
						console.log("sudut tekan awal", item.sudutTekanAwal);
						console.log("sudut awal", item.sudutAwal);
						console.log("rotasi", item.rotasi);
						console.log("posisi", item.x, item.y);
						console.groupEnd();
					}
					else {
						//TODO:
					}

				}
			});
		}

		inputUp(): void {
			ImgImpl.daftar.forEach((item: ImageObj) => {
				if (item.down) {
					// item.hit++;
				}

				if (item.dragged) {
					console.log('input up: item rotasi ' + item.rotasi)
				}

				item.down = false;
				item.dragged = false;
			});
		}
	}

	export const sprInt: SprInt = new SprInt();
}