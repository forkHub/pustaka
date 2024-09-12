/**
 * JS Wrapper for blockly
 */
namespace ha.js {

	export class List {
		static push(l: any[], v: any) {
			l.push(v);
		}

		static pop(l: any[]): any {
			return l.pop();
		}
	}

	export class Grid {

		static create(w: number, h: number): any[][] {
			let hs = new Array(w);

			for (let i = 0; i < w; i++) {
				hs[i] = new Array(h);
			}

			return hs;
		}

		static setV(g: any[][], x: number, y: number, v: any) {
			g[x][y] = v;
		}

		static getV(g: any[][], x: number, y: number): any {
			return g[x][y];
		}
	}
}