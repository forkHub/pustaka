import { id } from "../../Id";
import { UIManager } from "./UIManager";

export interface IUi {
	id:number;
	parent: IUi | null;
	// appendChild: (p: IUi) => void;
	el: HTMLElement;
}

export class UIBase implements IUi {
	protected _el!: HTMLElement;
	protected _parent: UIBase | null = null;
	protected _id: number = 0;
	protected _type: string = '';

	// protected static allUI:UIBase[] = []; 

	// static add(ui:UIBase):void {
	// 	if (ui.constructor.name === 'UIJob') {
	// 		console.log("UI Base add UI " + ui);
	// 	}
	// 	else {
	// 		console.log("UI Base add any UI " + ui);
	// 	}
	// 	UIBase.allUI.push(ui); 
	// }

	remove() {
		this.parent =null;
	}

	render() {
		//Implemented by child
	}
	
	// static getById(id:number):UIBase|null {
	// 	let ui = UIBase.list.filter(item => item.id == id);
	// 	return ui.length>0?ui[0]:null;
	// }

	// static removeById(id:number):void {
	// 	let ui = UIBase.getById(id);
	// 	if (ui) ui.remove();
	// 	UIBase.allUI = UIBase.allUI.filter(item => item.id !== id);
	// }

	// static getByType<T>(classRef:new (...args: any[]) => T):T[] {
	// 	return UIBase.allUI.filter(item => item instanceof classRef) as T[];
	// }

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

	public set parent(i: UIBase | null) {
		this._parent = i;

		if (!i) {
			this._el.parentElement?.removeChild(this._el);
		} 
		else {
			i._el.appendChild(this._el);
		}
	}

	public appendChild(c:UIBase):void {
		c.parent=this;
	}

	public removeChild(c:UIBase):void {
		if (c.parent == this) c.parent=null;
	}

	get el(): HTMLElement {
		return this._el;
	}

	// static get list():UIBase[] {
		// return UIBase.allUI.slice(); 
	// }
	
	constructor() {
		this._id = id.nextid;
		UIManager.add(this);
	}

	// appendChild(p: IUi) {
	// 	p.parent = this;
	// };
}