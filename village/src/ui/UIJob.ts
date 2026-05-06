// import type { Building } from "../building/Building";
import type { Building } from "../building/Building";
import { Job } from "../job/Job";
import { JobManager } from "../job/JobManager";
import { UIBase } from "./base/UIBase";
import type { UICont } from "./base/UICont";
import { UIMeter } from "./base/UIGauge";
import { UIManager } from "./base/UIManager";
import { UISpan } from "./base/UISpan";

export class UIJob extends UIBase {
	// private _jobId: number = 0;
	private jobName: UISpan = new UISpan('');
	private meter:UIMeter = new UIMeter();
	private jobRef: Job | null;

	// public get jobId(): number {
	// 	return this._jobId;
	// }
	// public set jobId(value: number) {
	// 	this._jobId = value;
	// }

	constructor(jobRef:Job) {
		super();
		this._el = document.createElement('div');
		this.appendChild(this.jobName);
		this.appendChild(this.meter);

		this.jobRef = jobRef;
		this.meter.max = jobRef.counterMax;

		console.log("ui job created");
		console.log(this._el);
	}

	remove(): void {
		super.remove();
		this.jobRef = null;
	}

	render() {
		if (!this.parent) return;

		if (this.jobRef) {
			this.jobName.label = this.jobRef?.type || ""; 
			this.meter.value = (this.jobRef?.counterMax - this.jobRef?.counter);
		}
	}

	static getOrCreate(job:Job): UIJob {

		let uis:UIJob[] = UIManager.getFree(UIJob) as UIJob[];
		let ui:UIJob

		if (uis.length > 0) {
			ui = uis[0];
		} else {
			ui = new UIJob(job);
		}

		return ui;
	}

	static createByBuilding(building:Building, cont:UICont):void {
		JobManager.getByBuilding(building).forEach((job) => {
			let ui = UIJob.getOrCreate(job);
			ui.jobName.label = job.type
			cont.appendChild(ui);
		})
	}

	// static createByBuildingId(buildingId:number, cont:UICont):void {
	// 	JobManager.getByBuildingId(buildingId).forEach((job) => {
	// 		let ui = UIJob.getOrCreate(job.id, job);
	// 		ui.jobName.label = job.type
	// 		cont.appendChild(ui);
	// 	})
	// }

	// static getByJobId(jobId: number): UIJob | null {
	// 	for (const ui of UIManager.getByType(UIJob)) {
	// 		if (ui.jobId === jobId) return ui;
	// 	}
	// 	return null;
	// }
}