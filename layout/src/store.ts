class Store {
	private _aktifLayoutId: number = 0;

	public get aktifLayoutId(): number {
		return this._aktifLayoutId;
	}
	public set aktifLayoutId(value: number) {
		this._aktifLayoutId = value;
	}
}

export const store: Store = new Store();