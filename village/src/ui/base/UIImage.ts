import { UIBase } from "./UIBase";

export class UIImage extends UIBase {
	private _src: string = '';

	public get src(): string {
		return this._src;
	}
	public set src(value: string) {
		this._src = value;
		(this._el as HTMLImageElement).src = "./asset/" + value;
		this._el.setAttribute('align', 'middle');
	}

	constructor(src: string) {
		super('img');
		this.src = src;
		console.log("create new ui image, src " + src);
		console.log(this._el);
	}
}