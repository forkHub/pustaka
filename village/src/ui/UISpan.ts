import { UIBase } from "./UIBase";

export class UISpan extends UIBase {
	public set label(value: string) {
		this._el.innerHTML = value;
	}

	constructor(label: string) {
		super();
		this._el = document.createElement('span');
		this._el.innerHTML = label;
	}
}