namespace ha.be {
	enum TypeDrag {
		drag = 1,
		rotasi = 2
	}

	/**
	 * Handle interaksi sprite
	 */
	class SpriteInteraksi {

		private spriteDown(s: SprObj, pos: any, id: number) {
			s.down = true;
			s.drgStartX = pos.x - s.x;
			s.drgStartY = pos.y - s.y;
			s.inputId = id;
			s.jmlHit++;

			s.sudutTekanAwal = Transform.sudut(pos.x - s.x, pos.y - s.y);
			s.sudutAwal = s.rotasi;
			console.log('sprite down event handler');
		}

		inputDown(pos: any, id: number): void {
			//sprite down
			console.log('input down');

			let lastIdx: number = -1;
			let lastSprite: SprObj = null;

			for (let i: number = Spr.daftar.length - 1; i >= 0; i--) {
				let item: SprObj;

				item = Spr.daftar[i];

				if (SprImg.dotDidalamGambar(item, item.x, item.y, pos.x, pos.y)) {
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
				// lastSprite.down = true;
				// lastSprite.dragStartX = pos.x - lastSprite.x;
				// lastSprite.dragStartY = pos.y - lastSprite.y;
				// lastSprite.inputId = id;
				// lastSprite.jmlHit++;

				// lastSprite.sudutTekanAwal = Transform.sudut(pos.x - lastSprite.x, pos.y - lastSprite.y);
				// lastSprite.sudutAwal = lastSprite.buff.rotasi;
			}

			//

		}

		inputMove(pos: any, pointerId: number): void {
			Spr.daftar.forEach((item: SprObj) => {

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
					}
					else {
						//TODO:
					}

				}
			});
		}

		inputUp(): void {
			Spr.daftar.forEach((item: SprObj) => {
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

	export const sprInteraksi: SpriteInteraksi = new SpriteInteraksi();
}