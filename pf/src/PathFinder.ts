///<reference path="./PFCell.ts"/>
namespace Basik {
	export class PathFinder {

		/**
		 * aksi yang diambil saat jalan terblock
		 * 1. berhenti
		 * 2. cari posisi terdekat dan ganti target ke posisi tersebut
		 */
		static readonly BL_STOPPED: number = 1;
		static readonly BL_NEAREST: number = 2;

		private _cells: Array<pf.PFCell> = [];
		private _maxCells: number = 100;

		//conf
		private _checkCanMoveToPos: Function;
		private _checkFinish: Function;

		//flag
		private _flBlocked: number = 0;
		private _flDiagonal: boolean = false;

		constructor() {
			this._cells = [];
			this._flBlocked = PathFinder.BL_STOPPED;
		}

		//dipakai saat algorithma selesai
		private getCellTerdekatKeTarget(tx: number, ty: number): pf.PFCell {
			let jarakTerdekat: number = 1000;
			let jarakSementara: number = 0;
			let cellRes: pf.PFCell;

			this._cells.forEach(cell => {
				jarakSementara = Math.abs(cell.x - tx) + Math.abs(cell.y - ty);
				if (jarakSementara < jarakTerdekat) {
					cellRes = cell;
					jarakTerdekat = jarakSementara;
				}
			});

			//tidak termasuk cell paling atas
			if (cellRes.parent == null) cellRes = null;

			return cellRes;
		}

		private buildPath(cell: pf.PFCell, res: Array<pf.PFCell>): void {
			let i: number = 0;
			let cellTemp: pf.PFCell;
			let cellParent: pf.PFCell = null;
			let len: number;

			//cari parent dari cell yang sedang di check
			len = this._cells.length;
			for (i = 0; i < len; i++) {
				cellTemp = this._cells[i];
				if (cell.parent && (cellTemp.idx == cell.parent.idx)) {
					cellParent = cellTemp;
				}
			}

			//parent gak ada, cell adalah cell awal, return;
			if (!cellParent) {
				// console.log("no parent");
				return;
			}

			//hasilnya di masukkan ke let res
			//urutan dibalik
			//bila parent adalah cell awal return
			res.unshift(cellParent);
			if (cellParent.idx == -1) {
				return
			} else {
				this.buildPath(cellParent, res);
			}

		}

		private cellCreate(parent: pf.PFCell, i: number, j: number, targetX: number, targetY: number): pf.PFCell {
			let cell: pf.PFCell;

			cell = new pf.PFCell();
			cell.x = i;
			cell.y = j;
			cell.open = true;
			cell.idx = this._cells.length;

			if (parent) {
				cell.parent = parent;
			}
			else {
				cell.parent = null;
			}

			cell.dist = Math.abs(targetX - i) + Math.abs(targetY - j);

			return cell;
		}

		private resToArray(res: Array<pf.PFCell>): Array<any> {
			let ar: Array<any> = [];

			res.forEach(cell => {
				ar.push([cell.x, cell.y]);
			})

			return ar;
		}

		find(sx: number, sy: number, tx: number, ty: number): Array<any> {
			let res: Array<pf.PFCell> = new Array<pf.PFCell>();
			let resAr: Array<any>;

			while (this._cells.length > 0) {
				this._cells.pop();
			}

			res = this.getPath(sx, sy, tx, ty);
			resAr = this.resToArray(res);

			while (res.length > 0) {
				res.pop();
			}

			return resAr;
		}

		private checkSampaiTujuan(i: number, j: number, tx: number, ty: number): boolean {
			if (this._checkFinish != null) {
				return this._checkFinish(i, j, tx, ty);
			}
			else {
				if ((i == tx) && (j == ty)) return true;
				return false;
			}
		}

		private getOpenCell(): pf.PFCell {
			let i: number;
			let cell: pf.PFCell;
			let maxLen: number;
			let cellTemp: pf.PFCell;
			let len: number = 0;

			maxLen = 10000;

			len = this._cells.length - 1;
			for (i = len; i >= 0; i--) {
				cell = this._cells[i];

				if (cell.open) {
					if (cell.dist < maxLen) {
						cellTemp = cell;
						maxLen = cell.dist;
					}
				}
			}

			return cellTemp;
		}

		private cellOpen(cellCr: pf.PFCell, tx: number, ty: number): void {
			//up
			if (this.cellPosPossible(cellCr.x, cellCr.y - 1)) {
				this._cells.push(this.cellCreate(cellCr, cellCr.x, cellCr.y - 1, tx, ty));
			}

			//right
			if (this.cellPosPossible(cellCr.x + 1, cellCr.y)) {
				this._cells.push(this.cellCreate(cellCr, cellCr.x + 1, cellCr.y, tx, ty));
			}

			//down
			if (this.cellPosPossible(cellCr.x, cellCr.y + 1)) {
				this._cells.push(this.cellCreate(cellCr, cellCr.x, cellCr.y + 1, tx, ty));
			}

			//left
			if (this.cellPosPossible(cellCr.x - 1, cellCr.y)) {
				this._cells.push(this.cellCreate(cellCr, cellCr.x - 1, cellCr.y, tx, ty));
			}

			//kanan atas
			if (this.cellPosPossible(cellCr.x + 1, cellCr.y - 1)) {
				this._cells.push(this.cellCreate(cellCr, cellCr.x + 1, cellCr.y - 1, tx, ty));
			}

			//kanan bawah
			if (this.cellPosPossible(cellCr.x + 1, cellCr.y + 1)) {
				this._cells.push(this.cellCreate(cellCr, cellCr.x + 1, cellCr.y + 1, tx, ty));
			}

			//kiri atas
			if (this.cellPosPossible(cellCr.x - 1, cellCr.y - 1)) {
				this._cells.push(this.cellCreate(cellCr, cellCr.x - 1, cellCr.y - 1, tx, ty));
			}

			//kiri bawah
			if (this.cellPosPossible(cellCr.x - 1, cellCr.y + 1)) {
				this._cells.push(this.cellCreate(cellCr, cellCr.x - 1, cellCr.y + 1, tx, ty));
			}
		}

		private getPath(sx: number, sy: number, tx: number, ty: number): Array<pf.PFCell> {
			let cellCr: pf.PFCell;
			let res: Array<pf.PFCell> = new Array<pf.PFCell>();

			if ((sx == tx) && (sy == ty)) {
				return res;
			}

			//cell pertama
			this._cells.push(this.cellCreate(null, sx, sy, tx, ty));

			while (true) {
				if ((this._cells.length >= this._maxCells)) {

					if (this._flBlocked == PathFinder.BL_STOPPED) {
						return [];
					}
					else if (this._flBlocked == PathFinder.BL_NEAREST) {
						cellCr = this.getCellTerdekatKeTarget(tx, ty);
					}
					else {
						throw new Error();
					}

					if (cellCr) {
						res.unshift(cellCr);
						this.buildPath(cellCr, res);
					}

					return res;
				}

				cellCr = this.getOpenCell();
				if (cellCr) {
					cellCr.open = false;

					if (this.checkSampaiTujuan(cellCr.x, cellCr.y, tx, ty)) {
						res.unshift(cellCr);

						this.buildPath(cellCr, res);

						return res;
					}

					this.cellOpen(cellCr, tx, ty);
				}
				else {

					if (this._flBlocked == PathFinder.BL_STOPPED) {
						return [];
					}
					else if (this._flBlocked == PathFinder.BL_NEAREST) {
						cellCr = this.getCellTerdekatKeTarget(tx, ty);
					}
					else {
						throw new Error();
					}

					if (cellCr) {
						res.unshift(cellCr);
						this.buildPath(cellCr, res);
					}

					return res;
				}
			}

		}

		private cellExistsAtPos(ix: number, jx: number): boolean {
			let res: boolean = false;

			this._cells.forEach(cell => {
				if (cell.x == ix && cell.y == jx) {
					res = true;
				}
			});

			return res;
		}

		private cellPosPossible(ix: number, jx: number): boolean {
			if (this.cellExistsAtPos(ix, jx)) {
				return false;
			}

			//check block
			if (this._checkCanMoveToPos) {
				if (this._checkCanMoveToPos(ix, jx) == false) {
					return false;
				}
			}

			return true;
		}

		set checkCanMoveToPos(f: Function) {
			this._checkCanMoveToPos = f;
		}

		get maxCells(): number {
			return this._maxCells;
		}

		set maxCells(value: number) {
			this._maxCells = value;
		}

		public set flBlocked(value: number) {
			this._flBlocked = value;
		}

		public get flDiagonal(): boolean {
			return this._flDiagonal;
		}
		public set flDiagonal(value: boolean) {
			this._flDiagonal = value;
		}
		public set checkSampai(value: Function) {
			this._checkFinish = value;
		}

	}

}