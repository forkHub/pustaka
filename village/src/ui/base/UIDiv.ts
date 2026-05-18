import { UIBase } from "./UIBase";

class UIDiv extends UIBase {
	constructor() {
		super();
	}
}

export function div(...child: UIBase[]): UIBase {
	let d = new UIDiv();
	child.forEach((item) => {
		d.appendChild(item);
	})

	return d;
}