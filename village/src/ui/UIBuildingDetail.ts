import type { Building } from "../building/Building";
import { UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";
import { UICont } from "./base/UICont";
import { UIH1 } from "./base/UIH1";
import { UIManager } from "./base/UIManager";
import { UIJob } from "./UIJob";

class UIBuildingDetail extends UIBase {
	private _buildingId: number = 0;
	private _buildingRef: Building | undefined;
	private jobCont: UICont = new UICont();
	private btn:UIButton = new UIButton('close');
	private debugCont:UICont = new UICont();
	private title:UIH1 = new UIH1("");

	public get buildingRef(): Building | undefined {
		return this._buildingRef;
	}
	public set buildingRef(value: Building) {
		this._buildingRef = value;
	}

	constructor() {
		super();
		this._el = document.createElement('dialog');
		this.appendChild(this.title);
		this.jobCont.parent = this;
		this.btn.parent = this;
		this.debugCont.parent = this;
		
		this.btn.el.addEventListener("click", () => {
			this.close();
		})

		document.body.appendChild(this._el);
	}

	open() {
		super.open();

		if (this._buildingRef) {
			this.title.label = this._buildingRef.type;
			UIJob.createByBuilding(this._buildingRef, this.jobCont);
		}
	}

	close() {
		super.close();
		this.jobCont.removeAllChildren();
		UIManager.getByType(UIJob).forEach((ui) => {
			ui.remove();
		})
	}

	render() {
		if (!this.isOpen) return;

		let el = this.debugCont.el;
		el.innerHTML='';
	}

	public get buildingId(): number {
		return this._buildingId;
	}
	public set buildingId(value: number) {
		this._buildingId = value;
	}
}

export const uiBuildingDetail = new UIBuildingDetail();
