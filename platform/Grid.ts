namespace Basik {
    export class Platformer {
        private gridWidth: number = 32;
        private gridHeight: number = 32;

        gridX(n: number): number {
            return Math.floor(n / this.gridWidth) * this.gridWidth;
        }

        gridY(n: number): number {
            return Math.floor(n / this.gridHeight) * this.gridHeight;
        }

        collideRight(obj: platformer.Obj, obj2: platformer.Obj) {

        }

        createObj(grid: Array<Array<number>>): platformer.Obj {
            return new platformer.Obj(grid);
        }
    }

    namespace platformer {
        export class Obj {
            private _x: number = 0;
            public get x(): number {
                return this._x;
            }
            public set x(value: number) {
                this._x = value;
            }
            private _y: number = 0;
            public get y(): number {
                return this._y;
            }
            public set y(value: number) {
                this._y = value;
            }
            private _grid: Array<Array<number>> = [[]];
            public get grid(): Array<Array<number>> {
                return this._grid;
            }

            constructor(grid: Array<Array<number>>) {
                this._grid = grid;
            }

            collidePos(x: number, y: number): boolean {
                for (let r = 0; r < this._grid.length; r++) {
                    let row = this._grid[r];
                    for (let c = 0; c < row.length; c++) {
                        let n = row[c];
                        if (this._x + c == x) {
                            if (this._y + r == y) {
                                if (n > 0) {
                                    return true;
                                }
                            }
                        }
                    }
                }

                return false;
            }

            collideObj(obj: Obj): boolean {
                let hasil: boolean = false;
                for (let r = 0; r < this._grid.length; r++) {
                    let row = this._grid[r];
                    for (let c = 0; c < row.length; c++) {
                        let n = row[c];
                        if (n != 0) {
                            hasil ||= obj.collidePos(r, c);
                        }
                    }
                }
                return hasil;
            }
        }
    }

}