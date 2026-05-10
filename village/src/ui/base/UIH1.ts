import { UIBase } from "./UIBase";

export class UIH1 extends UIBase {

	setLabel(s:string):UIH1 {
		this._el.innerText = s;
		return this;
	}

	constructor(label: string) {
		super();
		this._el = document.createElement('h1');
		this._el.innerText = label;
	}
}

export function h1(str:string):UIH1 {
	return new UIH1(str);
}