import { Building } from "../Building";
import { Job } from "../Job";
import { UIBase, UICont } from "./IUI";
import { UIH1 } from "./UIH1";
import { UIJob } from "./UIJob";

class UIBuildingDetail extends UIBase {
	private _buildingId: number = 0;
	private cont: UICont = new UICont();

	constructor() {
		super();
		this._el = document.createElement('dialog');
		this.appendChild(new UIH1("Building Detail"));
		this.appendChild(this.cont);

		(this._el as HTMLDialogElement).showModal();

		//image foto

		this.render();
	}

	static render() {

	}

	destroy() {
		this.parent = null;
		UIJob.list.forEach(item => {
			item.parent = null
		});
	}

	render() {
		if (!Building.getById(this.buildingId)) {
			this.destroy();
			return;
		}

		if (!this.parent) {
			this.destroy();
		}


		this.renderJob();
	}

	private renderJob(): void {
		Job.getByBuildingId(this.buildingId).forEach((j) => {
			UIJob.getOrCreate(j.id).parent = this.cont;
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
