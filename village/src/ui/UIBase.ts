import { id } from "../Id";

export interface IUi {
	id:number;
	parent: IUi | null;
	appendChild: (p: IUi) => void;
	el: HTMLElement;
}

export class UIBase implements IUi {
	protected _el!: HTMLElement;
	protected _parent: IUi | null = null;
	protected _id: number = 0;
	protected _type: string = '';

	protected static allUI:UIBase[] = []; 

	static add(ui:UIBase):void {
		UIBase.allUI.push(ui);
	}

	static remove(ui:number):void {
		UIBase.allUI = UIBase.allUI.filter(item => item.id !== ui);
	}

	static getByType<T>(classRef:new (...args: any[]) => T):T[] {
		return UIBase.allUI.filter(item => item instanceof classRef) as T[];
	}

	public get type(): string {
		return this._type;
	}
	public set type(value: string) {
		this._type = value;
	}

	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}

	public get parent(): IUi | null {
		return this._parent;
	}

	public set parent(i: IUi | null) {
		this._parent = i;
		if (!this._parent) {
			this._el.parentElement?.removeChild(this._el);
			UIBase.remove(this.id);
		}
	}

	get el(): HTMLElement {
		return this._el;
	}
	
	constructor() {
		this._id = id.nextid;
	}

	appendChild(p: IUi) {
		p.parent = this;
		this._el.appendChild(p.el);
		UIBase.add(this);
	};
}

export class UICont extends UIBase {
	constructor() {
		super();
		this._el = document.createElement('div');
	}
}