namespace rpg {
	class Conf {
		private _roomUrl: string;
		private _npc: NPC[] = [];
		private _trig: Trig = new Trig();

		public get roomUrl(): string {
			return this._roomUrl;
		}
		public set roomUrl(value: string) {
			this._roomUrl = value;
		}
		public get npc(): NPC[] {
			return this._npc;
		}
		public set npc(value: NPC[]) {
			this._npc = value;
		}
		public get trig(): Trig {
			return this._trig;
		}
		public set trig(value: Trig) {
			this._trig = value;
		}
	}

	class Trig {
		readonly p: Point = new Point();
		private _id: string = '';
		static readonly list: Trig[] = [];

		public get id(): string {
			return this._id;
		}
		public set id(value: string) {
			this._id = value;
		}

		private static baru(n: string): Trig {
			for (let i = 0; i < Trig.list.length; i++) {
				let item = Trig.list[i];
				if (item.id == n) return item;
			}

			return new Trig();
		}


		static buat(n: string, x: number, y: number) {
			let t = Trig.baru(n);
			t.id = n;
			t.p.x = x;
			t.p.y = y;
		}
	}

	class Point {
		private _x: number = 0;
		private _y: number = 0;

		public get x(): number {
			return this._x;
		}
		public set x(value: number) {
			this._x = value;
		}
		public get y(): number {
			return this._y;
		}
		public set y(value: number) {
			this._y = value;
		}
	}

	class NPC {
		private _p: Point = new Point();
		private _url: string = '';
		private _id: string = '';
		private static list: NPC[] = [];

		private static baru(n: string): NPC {
			for (let i = 0; i < NPC.list.length; i++) {
				let item = NPC.list[i];
				if (item.id == n) return item;
			}

			return new NPC();
		}

		static buat(n: string, url: string, x: number, y: number) {
			let npc: NPC = NPC.baru(n);
			npc.url = url
			npc.id = n;
			npc.p.x = x;
			npc.p.y = y;
			return npc;
		}

		public get id(): string {
			return this._id;
		}
		public set id(value: string) {
			this._id = value;
		}

		public get url(): string {
			return this._url;
		}
		public set url(value: string) {
			this._url = value;
		}

		public get p(): Point {
			return this._p;
		}
		public set p(value: Point) {
			this._p = value;
		}
	}

	//task

	export var conf = new Conf();
}