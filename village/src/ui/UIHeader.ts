import { store } from "../Data";
import { resourceType } from "../Resource";
import { UIBase } from "./base/UIBase";
import { UIImage } from "./base/UIImage";
import { UISpan } from "./base/UISpan";

class UIHeader extends UIBase {
	private list: UIInfo[] = [];

	constructor() {
		super();
		for (const key of Object.values(resourceType)) {
			this.addInfo(key);
		}
		this._el.classList.add('fixed-top', 'disp-flex', 'align-items-center', 'justify-content-center');
	}

	render() {
		this.list.forEach((item) => {
			let am = store.getResourceByType(item.key).amount.value;
			item.amount = am;
		})
	}

	getInfoByRes(key: resourceType): UIInfo | null {
		let l = this.list.filter(item => item.key == key);
		return l.length > 0 ? l[0] : null;
	}

	addInfo(key: resourceType) {
		let info = new UIInfo(key + ".png");
		info.key = key;
		info.amount = 100;
		this.appendChild(info)
		this.list.push(info);
	}
}

class UIInfo extends UIBase {
	private _key: resourceType = resourceType.WATER;
	private _amount: number = 0;
	private image: UIImage;
	private span: UISpan = new UISpan('0');

	constructor(url: string) {
		super();
		this.image = new UIImage(url);
		this.appendChild(this.image);
		this.appendChild(this.span);
	}

	public get amount(): number {
		return this._amount;
	}
	public set amount(value: number) {
		this._amount = value;
		this.span.label = value + '';
	}

	public get key(): resourceType {
		return this._key;
	}
	public set key(value: resourceType) {
		this._key = value;
	}
}

export const uiHeader = new UIHeader();