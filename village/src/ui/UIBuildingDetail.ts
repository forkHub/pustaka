import { UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";
import { UICont } from "./base/UICont";
import { UIH1 } from "./base/UIH1";
import { UIJob } from "./UIJob";

class UIBuildingDetail extends UIBase {
	private _buildingId: number = 0;
	private cont: UICont = new UICont();
	private btn:UIButton = new UIButton('close');
	private debugCont:UICont = new UICont();
	private isOpen:boolean=false;

	constructor() {
		super();
		this._el = document.createElement('dialog');
		(new UIH1("Building Detail")).parent = this;
		this.cont.parent = this;
		this.btn.parent = this;
		this.debugCont.parent = this;

		this.btn.el.addEventListener("click", () => {
			this.close();
		})

		document.body.appendChild(this._el);
	}

	open() {
		(this._el as HTMLDialogElement).showModal();
		this.isOpen=true;
	}

	close() {
		(this._el as HTMLDialogElement).close();
		this.isOpen=false;
	}

	render() {
		if (!this.isOpen) return;

		let el = this.debugCont.el;
		el.innerHTML='';

		UIJob.createByBuildingId(this.buildingId, this.cont);
	}

	public get buildingId(): number {
		return this._buildingId;
	}
	public set buildingId(value: number) {
		this._buildingId = value;
	}
}

export const uiBuildingDetail = new UIBuildingDetail();
