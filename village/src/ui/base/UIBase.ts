import { id } from "../../Id";
import { UIManager } from "./UIManager";

export interface IUi {
	id:number;
	parent: IUi | null;
	el: HTMLElement;
}

export class UIBase implements IUi {
	protected _el!: HTMLElement;
	protected _parent: UIBase | null = null;
	protected _id: number = 0;
	protected isOpen:boolean = false;

	static create<T>(classRef: new (...args: any[]) => T): T {
		return new classRef();
	}

	destroy() {
		this.remove();
		this.removeAllChildren();
	}

	event<T extends Event = Event>(str: string, f: (e: T) => void, options?: boolean | AddEventListenerOptions): UIBase {
		this._el.addEventListener(str, (e) => {
			f(e as T);
		}, options);
		return this;
	}

	remove() {
		this.parent =null;
	}

	render() {
		//Implemented by child
	}

	open() {
		if (this._el instanceof HTMLDialogElement) {
			(this._el as HTMLDialogElement).showModal();
			this.isOpen = true;
		}
		else {
			console.warn("close for non modal ui");
		}
	}

	close() {
		if (this._el instanceof HTMLDialogElement) {
			(this._el as HTMLDialogElement).close();
			this.isOpen = false;
		}
		else {
			console.warn("close for non modal ui");
		}
	}

	appendToDocument() {
		document.body.appendChild(this._el);
	}

	getByTypeRec<T>(classRef: new (...args: any[]) => T): T | null {
		for (const item of UIManager.getByParentId(this.id)) {
			if (item instanceof classRef) return item as T;
			const found = item.getByTypeRec(classRef);
			if (found) return found;
		}
		return null;
	}

	innerText(str:string):UIBase {
		this._el.innerText = str;
		return this;
	}

	innerHtml(str:string):UIBase {
		this._el.innerHTML = str;
		return this;
	}

	addClass(...token: string[]): UIBase {
		this._el.classList.add(...token);
		return this;
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

	public appendChild(c:UIBase):UIBase {
		c.parent=this;
		return this;
	}

	public removeChild(c:UIBase):void {
		if (c.parent == this) c.parent=null;
	}

	public removeAllChildren():void {
		UIManager.getByParentId(this.id).forEach((item) => {
			item.parent = null;
		})
	}

	get el(): HTMLElement {
		return this._el;
	}
	
	constructor(tag:string = 'div') {
		this._id = id.nextid;
		this._el = document.createElement(tag);
		UIManager.add(this);
	}
}

export function p(str:string):UIBase {
	let p =  new UIBase('p').innerText(str);
	return p;
}