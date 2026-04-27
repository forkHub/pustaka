export interface IUi {
	parent: IUi | null;
	appendChild: (p: IUi) => void;
	el: HTMLElement;
}

export class UIBase implements IUi {
	protected _el!: HTMLElement;
	protected _parent!: IUi | null;

	get parent(): IUi | null {
		return this._parent;
	}

	set parent(i: IUi | null) {
		this._parent = i;
		if (!this._parent) {
			this._el.parentElement?.removeChild(this._el);
		}
	}

	get el(): HTMLElement {
		return this._el;
	}

	constructor() {

	}

	appendChild(p: IUi) {
		p.parent = this;
		this._el.appendChild(p.el);
	};
}

export class UICont extends UIBase {
	constructor() {
		super();
		this._el = document.createElement('div');
	}
}