import { Building } from "../Building";
import { Job } from "../Job";
import { UIBase, UICont } from "./IUI";
import { UIH1 } from "./UIH1";

export class UIBuildingDetail extends UIBase {
	private buildingId: number = 0;
	private b: Building | null;
	private cont: UICont = new UICont();

	constructor(id: number) {
		super();
		this.buildingId = id;
		this.b = Building.getById(this.buildingId);
		if (!this.b) throw Error("invalid building for view");
		this._el = document.createElement('dialog');
		this.appendChild(new UIH1("Building Detail"));
		this.appendChild(this.cont);

		//image
		//jobs
		this.render();
	}

	private render() {
		window.requestAnimationFrame(() => {
			this.b = Building.getById(this.buildingId);
			if (!this.b) {
				this.parent = null;
			}

			if (!this.parent) return;
			this.renderJob();

			//loop
			this.render();
		});
	}

	private renderJob(): void {
		//check expired job
		//check new job
	}
}

export class UIJob extends UIBase {
	private id: number;

	constructor(id: number) {
		super();
		this._el = document.createElement('meter');
		this.id = id;

		let j = Job.getById(this.id);
		if (!j) throw Error("invalid job for view, id: " + this.id);

		window.requestAnimationFrame(() => {

		})
	}
}