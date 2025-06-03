class Char extends Basik.Image {
	private velX: number = 2;
	private _velY: number = 1;
	private _ladder: boolean = false;

	public get ladder(): boolean {
		return this._ladder;
	}
	public set ladder(value: boolean) {
		this._ladder = value;
	}

	public get velY(): number {
		return this._velY;
	}
	public set velY(value: number) {
		this._velY = value;
	}
	private accY: number = .1;
	private _onFloor: boolean = false;
	public get onFloor(): boolean {
		return this._onFloor;
	}
	public set onFloor(value: boolean) {
		this._onFloor = value;
	}

	constructor(url: string) {
		super(url);

		this.x = 32;
		this.y = 32;
	}


	update() {
		this.gravity();
		this.onKeyIsDown();
		this.updateCam();

		// this.updateLadder();
	}



	gravity() {
		if (this._ladder) return;

		this.velY += this.accY;
		this.y += this.velY;
		if (this.velY > 0) {
			this.resolveDown([]);
		}
		else {
			this.resolveUp();
		}
	}

	ladderCanQuit(): boolean {
		let collideLadder: boolean = false;
		gMap.tiles.forEach((tile) => {
			if (collideDot2(tile, this.x + 16, this.y + 16)) {
				collideLadder = true;
			}
		})

		return !collideLadder;
	}

	ladderEntry() {
		let collideLadder: boolean = false;
		gMap.tiles.forEach((tile) => {
			if (collideDot2(tile, this.x + 16, this.y + 16)) {
				if (tile.type == Tile.TY_LADDER) {
					collideLadder = true;
				}
			}
		})

		//update ladder state
		if (this._ladder == false) {
			if (collideLadder) {
				this._ladder = true;
				this.x = Math.floor((this.x + 16) / 32) * 32;
				// this.y = Math.floor((this.y + 16) / 32) * 32;
			}
		}

		//ladder entry from top


	}

	updateCam() {
		//horizontal
		let xmin = 32 * 3;
		let xmax = 32 * 7;

		let gapX = this.x - Basik.Camera.x;
		if (gapX < xmin) {
			let posPref = this.x - xmin;
			let gapCam = (posPref - Basik.Camera.x) / 10;
			if (Math.abs(gapCam) > 1) {
				Basik.Camera.x += gapCam;
			}
		}

		if (gapX > xmax) {
			let posPref = this.x - xmax;
			let gapCam = (posPref - Basik.Camera.x) / 10;
			if (Math.abs(gapCam) > 1) {
				Basik.Camera.x += gapCam;
			}
			// Basik.Camera.x = this.x - xmax;
		}

		//vertical

		//min max
		if (Basik.Camera.x < 0) Basik.Camera.x = 0;

		// Basik.Camera.x = this.x - 96;
		Basik.Camera.y = this.y - 96;
	}

	/**
	 * check wether main char's bottom is colilided with any tile
	 * @param item {Basik.Image} item to test
	 * @param includeNonBlocked {boolean} include non blocking item
	 * @returns 
	 */
	collideDown(item: Tile, excludedType: string[]): boolean {
		// if (this._ladder) console.log("collide down, excluded type ", excludedType);
		if (!item.block) return false;
		if (excludedType.indexOf(item.type) > -1) {
			console.log("excluded");
			return false;
		}
		if (collideDot2(item, this.x, this.y + 31)) return true;
		if (collideDot2(item, this.x + 31, this.y + 31)) return true;
		return false;
	}

	collideUp(item: Tile): boolean {
		if (!item.block) return false;
		if (collideDot2(item, this.x, this.y)) return true;
		if (collideDot2(item, this.x + 31, this.y)) return true;
		return false;
	}

	collideRight(item: Tile, excludedType: string[]): boolean {
		if (!item.block) return false;
		if (excludedType.indexOf(item.type) > -1) {
			return false;
		}

		if (collideDot2(item, this.x + 31, this.y)) return true;
		if (collideDot2(item, this.x + 31, this.y + 16)) return true;
		if (collideDot2(item, this.x + 31, this.y + 31)) return true;

		return false;
	}

	collideRight2(item: Tile, excludedType: string[]): number {
		if (!item.block) return 0;
		if (excludedType.indexOf(item.type) > -1) {
			return 0;
		}

		let r = 0;

		if (collideDot2(item, this.x + 31, this.y)) r |= 1;
		if (collideDot2(item, this.x + 31, this.y + 16)) r |= 2;
		if (collideDot2(item, this.x + 31, this.y + 31)) r |= 4;

		return r;
	}


	collideLeft(item: Tile, excludedType: string[]): boolean {
		if (!item.block) return false;
		if (excludedType.indexOf(item.type) > -1) {
			return false;
		}
		if (collideDot2(item, this.x, this.y)) return true;
		if (collideDot2(item, this.x, this.y + 31)) return true;
		return false;
	}

	/**
	 * resolve collision vertically
	 */
	// resolveVertical(includeNonBlocked: boolean) {
	// 	includeNonBlocked = false;
	// 	this.onFloor = false;
	// 	gMap.tiles.forEach((item) => {

	// 		if (this.collideDown(item, includeNonBlocked)) {
	// 			this.y = item.y - 32;
	// 			this.velY = 1;
	// 			this.onFloor = true;
	// 		}

	// 		if (this.collideUp(item)) {
	// 			this.y = item.y + 32;
	// 			this.velY = 1;
	// 		}
	// 	})
	// }

	resolveDown(excludedType: string[]) {
		this.onFloor = false;
		gMap.tiles.forEach((item) => {
			if (this.collideDown(item, excludedType)) {
				this.y = item.y - 32;
				this.velY = 1;
				this.onFloor = true;
			}
		})
	}

	resolveUp() {
		gMap.tiles.forEach((item) => {
			if (this.collideUp(item)) {
				this.y = item.y + 32;
				this.velY = 1;
			}
		})
	}

	resolveLeft(excludedType: string[]) {
		gMap.tiles.forEach((item) => {
			if (this.collideLeft(item, excludedType)) {
				this.x = item.x + 32;
			}
		})
	}

	resolveRight(excludedType: string[]) {
		gMap.tiles.forEach((item) => {
			
			if (this.collideRight(item, excludedType)) {
				// console.log(this.x, this.y);
				this.x = item.x - 32;
				// item.x = this.x + 34;
			}
		})
	}

	canEnterLadderStateDown(): boolean {
		let r: boolean = false;
		// console.group();

		gMap.tiles.forEach((tile) => {
			if (collideDot2(tile, this.x + 16, this.y + 32)) {
				if (tile.type == "ladder_top") {
					r = true;
					// console.log("check can enter ladder state true");
				}
			}
		})

		// console.log("can enter ladder state " + r);
		// console.groupEnd();
		return r;
	}

	onKeyIsDown() {
		if (KeyboardDown("ArrowRight")) {
			this.x += this.velX;
			let ex: string[] = this.ladder ? [Tile.TY_LADDER_TOP] : [];
			this.resolveRight(ex);
			if (this.ladderCanQuit()) {
				this._ladder = false;
			};
		} else {

		}

		if (KeyboardDown("ArrowLeft")) {
			this.x -= this.velX;
			let ex: string[] = this.ladder ? [Tile.TY_LADDER_TOP] : [];
			this.resolveLeft(ex);
			if (this.ladderCanQuit()) {
				this._ladder = false;
			};
		}

		if (KeyboardDown("ArrowDown")) {
			if (this._ladder) {
				this.y += 2;
				this.resolveDown([Tile.TY_LADDER_TOP]);
				if (this.ladderCanQuit()) {
					this._ladder = false;
					console.log("quit from ladder state");
				}
			}
			else {
				this.y += 2;
				if (this.canEnterLadderStateDown()) {
					this._ladder = true;
					this.y += 16;
					this.x = gridPos(this.x + 16) * 32;
					// this.y = gridPos(this.y + 32) * 32;
					console.log("enter ladder state, y " + this.y);
				}
				else {
					this.y -= 2;
				}
			}
		}

		if (KeyboardDown('ArrowUp')) {
			this.ladderEntry();

			if (this._ladder) {
				this.y -= 2;
				this.x = gridPos(this.x + 16) * 32;
				if (this.ladderCanQuit()) {
					this._ladder = false;
					this.y = gridPos(this.y) * 32;
					// this.startJump(-2);
				};
			}

			if (this.onFloor) {
				if (this._ladder == false) {
					this.startJump(-5);
				}
				else {
					//arrow up
					//ladder state true
					//on floor
				}
			} else {
				//not on floor
				//arrow up
				// console.log("arrow up", "not on floor");
			}
		}
	}

	startJump(v: number) {
		this.velY = v;
		this.y += this.velY;
		this.resolveUp();
		this.onFloor = false;
	}

	onKeyPress(key: string): void {
		if (key == "ArrowUp") {

		} else if (key == "ArrowDown") {

			//console.log("invalid keys");
		}
	}
}