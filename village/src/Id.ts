class Id {
	private _id: number = Date.now();

	get nextid(): number {
		this._id++;
		return this._id;
	}
}

export const id: Id = new Id();