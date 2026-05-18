import type { Building } from "../building/Building";
import { Job } from "../job/Job";
import { JobManager } from "../job/JobManager";
import { UIBase } from "./base/UIBase";
import type { UICont } from "./base/UICont";
import { UIMeter } from "./base/UIGauge";
import { UIImage } from "./base/UIImage";
import { UIManager } from "./base/UIManager";
// import { UISpan } from "./base/UISpan";

export class UIJob extends UIBase {
	// private jobName: UISpan = new UISpan('');
	private image: UIImage = new UIImage('');
	private meter: UIMeter = new UIMeter();
	private jobRef: Job | null;

	constructor(jobRef: Job) {
		super();
		this._el = document.createElement('div');
		this.appendChild(this.image);
		this.appendChild(this.meter);

		this.image.addClass("vertical-align-center");
		this.image.attr("width", "32px");
		this.image.attr("height", "32px");

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
			// this.image.src = this.jobRef.produce[0].resType || "";
			let value = (this.jobRef.counterMax - this.jobRef.counter);
			value = Math.floor((value / this.jobRef.counterMax) * 100);

			this.meter.value = value;
		}
		else {
			console.log(this);
			throw Error("no job reference");

		}
	}

	static getOrCreate(job: Job): UIJob {

		let uis: UIJob[] = UIManager.getFree(UIJob) as UIJob[];
		let ui: UIJob

		if (uis.length > 0) {
			ui = uis[0];
			ui.jobRef = job;
			console.log('reuse ui job');
		} else {
			ui = new UIJob(job);
			console.log('new ui job')
		}

		//setup min and max for job
		ui.meter.min = 0;
		ui.meter.max = 100;

		return ui;
	}

	static createByBuilding(building: Building, cont: UICont): void {
		JobManager.getByBuilding(building).forEach((job) => {
			let ui = UIJob.getOrCreate(job);
			ui.image.src = job.produce[0].resType + ".png";
			// ui.jobName.label = job.type
			cont.appendChild(ui);
			// console.log('create ui job', ui.el);
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