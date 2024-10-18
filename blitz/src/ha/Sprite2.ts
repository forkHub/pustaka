namespace ha.be {
	enum TypeDrag {
		drag = 1,
		rotasi = 2
	}

	/**
	 * Handle interaksi sprite
	 */
	class SpriteInteraksi {

		spriteDown(lastSpr: ISpr, pos: any, id: number) {
			lastSpr.down = true;
			lastSpr.drgStartX = pos.x - lastSpr.x;
			lastSpr.drgStartY = pos.y - lastSpr.y;
			lastSpr.inputId = id;
			lastSpr.jmlHit++;

			lastSpr.sudutTekanAwal = Transform.sudut(pos.x - lastSpr.x, pos.y - lastSpr.y);
			lastSpr.sudutAwal = lastSpr.buff.rotasi;
			console.log('sprite down event handler');
		}

		inputDown(pos: any, id: number): void {
			//sprite down
			console.log('input down');

			let lastIdx: number = -1;
			let lastSprite: ISpr = null;

			for (let i: number = Spr.daftar.length - 1; i >= 0; i--) {
				let item: ISpr;

				item = Spr.daftar[i];

				if (Img.dotDidalamGambar(item.buff, item.x, item.y, pos.x, pos.y)) {
					if (item.buff.ctrIdx > lastIdx) {
						lastIdx = item.buff.ctrIdx;
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
			Spr.daftar.forEach((item: ISpr) => {

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
						item.buff.rotasi = item.sudutAwal + perbedaan;
					}
					else {
						//TODO:
					}

				}
			});
		}

		inputUp(): void {
			Spr.daftar.forEach((item: ISpr) => {
				if (item.down) {
					// item.hit++;
				}

				if (item.dragged) {
					console.log('input up: item rotasi ' + item.buff.rotasi)
				}

				item.down = false;
				item.dragged = false;
			});
		}
	}

	export const sprInteraksi: SpriteInteraksi = new SpriteInteraksi();
}