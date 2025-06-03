class GameMap {
	readonly tiles: Tile[] = [];

	fromArray2(ar: string[]) {
		for (let row = 0; row < ar.length; row++) {
			for (let col: number = 0; col < ar[row].length; col++) {
				let s: string = ar[row];
				s = s.charAt(col);
				if (s == '1') {
					let t = new Tile("./imgs/Box.png");
					t.frameW = 32;
					t.frameH = 32;
					t.frame = 0;
					t.width = 32;
					t.height = 32;
					t.x = col * 32;
					t.y = row * 32;
					t.type = Tile.TY_BLOCK;
					this.tiles.push(t);
				}
				else if (s == '2') {
					let t = new Tile("./imgs/Box.png");
					t.frameW = 32;
					t.frameH = 32;
					t.width = 32;
					t.height = 32;
					t.frame = 1;
					t.x = col * 32;
					t.y = row * 32;
					t.block = false;
					t.type = Tile.TY_LADDER;
					this.tiles.push(t);
				}
				else if (s == '3') {
					let t = new Tile("./imgs/Box.png");
					t.frameW = 32;
					t.frameH = 32;
					t.width = 32;
					t.height = 32;
					t.frame = 2;
					t.x = col * 32;
					t.y = row * 32;
					t.block = true;
					t.type = Tile.TY_LADDER_TOP;
					this.tiles.push(t);
				}
				else if (s == '4') {
					let t = new Tile("./imgs/Box.png");
					t.frameW = 32;
					t.frameH = 32;
					t.width = 32;
					t.height = 32;
					t.frame = 3;
					t.x = col * 32;
					t.y = row * 32;
					t.block = false;
					t.type = Tile.TY_COIN;
					this.tiles.push(t);

				}
			}
		}
	}

	// fromArray(ar: number[][]): void {
	// 	for (let row = 0; row < ar.length; row++) {
	// 		for (let col = 0; col < ar[row].length; col++) {
	// 			let n = ar[row][col];
	// 			if (n == 1) {
	// 				let t = new Tile("./imgs/Box.png");
	// 				t.frameW = 32;
	// 				t.frameH = 32;
	// 				t.frame = 0;
	// 				t.width = 32;
	// 				t.height = 32;
	// 				t.x = col * 32;
	// 				t.y = row * 32;
	// 				t.type = Tile.TY_BLOCK;
	// 				this.tiles.push(t);
	// 			}
	// 			else if (n == 2) {
	// 				let t = new Tile("./imgs/Box.png");
	// 				t.frameW = 32;
	// 				t.frameH = 32;
	// 				t.width = 32;
	// 				t.height = 32;
	// 				t.frame = 1;
	// 				t.x = col * 32;
	// 				t.y = row * 32;
	// 				t.block = false;
	// 				t.type = Tile.TY_LADDER;
	// 				this.tiles.push(t);
	// 			}
	// 			else if (n == 3) {
	// 				let t = new Tile("./imgs/Box.png");
	// 				t.frameW = 32;
	// 				t.frameH = 32;
	// 				t.width = 32;
	// 				t.height = 32;
	// 				t.frame = 2;
	// 				t.x = col * 32;
	// 				t.y = row * 32;
	// 				t.block = true;
	// 				t.type = Tile.TY_LADDER_TOP;
	// 				this.tiles.push(t);
	// 			}
	// 			else {

	// 			}
	// 		}
	// 	}
	// }

	render() {
		this.tiles.forEach((item) => {
			if (item.active) {
				DrawImage(item);
			}
		})
	}

}