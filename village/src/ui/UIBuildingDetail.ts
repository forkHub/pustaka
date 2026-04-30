import { JobManager } from "../job/JobManager";
import { UIBase, UICont } from "./UIBase";
import { UIButton } from "./UIButton";
import { UIH1 } from "./UIH1";
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
		this.appendChild(new UIH1("Building Detail"));
		this.appendChild(this.cont);
		this.appendChild(this.btn);
		this.appendChild(this.debugCont);

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
		UIJob.removeByBuildingId(this.buildingId);
		this.isOpen=false;
	}

	render() {
		if (!this.isOpen) return;

		UIJob.renderByBuildingId(this.buildingId, this.cont);

		//debug
		JobManager.getByBuildingId(this.buildingId).forEach((j) => {
			this.debugCont.el.innerHTML = j.counter + '<br/>';
		})

		UIBase.getByType(UIJob).forEach((ui) => {
			this.debugCont.el.innerHTML += ui.id + '/job Id' + ui.jobId;
		})
	}

	public get buildingId(): number {
		return this._buildingId;
	}
	public set buildingId(value: number) {
		this._buildingId = value;
	}
}

export const uiBuildingDetail = new UIBuildingDetail();
