import { UIBase } from "./UIBase";

export class UICont extends UIBase {
	constructor() {
		super();
		this._el = document.createElement('div');
	}
}