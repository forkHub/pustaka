import { UIBase } from "./UIBase";

export class UIH1 extends UIBase {

	set label(s:string) {
		this._el.innerText = s;
	}

	constructor(label: string) {
		super();
		this._el = document.createElement('h1');
		this._el.innerText = label;
	}
}