import { UIBase } from "./IUI";

export class UIH1 extends UIBase {

	constructor(label: string) {
		super();
		this._el = document.createElement('h1');
		this._el.innerText = label;
	}
}