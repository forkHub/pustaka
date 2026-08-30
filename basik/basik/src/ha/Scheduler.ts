namespace Basik {

	export interface ItemRender {
		gbr: GbrObj
		trans: GbrTransform;
	}

	class Scheduler {
		private ls: ItemRender[] = [];

		reg(obj: GbrObj) {
			this.ls.push({
				gbr: obj,
				trans: GbrTransform.fromGbr(obj)
			})
			this.render();
		}

		render() {
			while (this.ls.length > 0) {
				const item = this.ls[0];
				if (item.gbr.dimuat) {
					Ip.GamberTransSingle(item);
					this.ls.shift();
				}
				else {
					if (item.gbr.error) {
						this.ls.shift();
					} else {
						//tunggu image di muat
						requestAnimationFrame(this.render);
						return;
					}
				}
			}
		}

	}

	export const scheduler: Scheduler = new Scheduler();
}