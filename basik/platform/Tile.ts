class Tile extends Basik.Image {
	static readonly TY_BLOCK = 'box';				//1
	static readonly TY_LADDER = 'ladder';			//2
	static readonly TY_LADDER_TOP = 'ladder_top';	//3
	static readonly TY_COIN = 'coin';				//4

	private _type: string = 'box';
	private _block: boolean = true;
	private _active: boolean = true;

	public get active(): boolean {
		return this._active;
	}
	public set active(value: boolean) {
		this._active = value;
	}

	public get block(): boolean {
		return this._block;
	}
	public set block(value: boolean) {
		this._block = value;
	}

	public get type(): string {
		return this._type;
	}
	public set type(value: string) {
		this._type = value;
	}

}