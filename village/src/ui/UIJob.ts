import { JobManager } from "../job/JobManager";
import { UIBase } from "./base/UIBase";
import type { UICont } from "./base/UICont";
import { UIMeter } from "./base/UIGauge";
import { UIManager } from "./base/UIManager";
import { UISpan } from "./base/UISpan";

export class UIJob extends UIBase {
	private _jobId: number = 0;
	private jobName: UISpan = new UISpan('');
	private meter:UIMeter = new UIMeter();

	public get jobId(): number {
		return this._jobId;
	}
	public set jobId(value: number) {
		this._jobId = value;
	}

	constructor(jobId: number) {
		super();
		this._el = document.createElement('div');
		this.appendChild(this.jobName);
		this.appendChild(this.meter);

		this.jobId = jobId;
		console.log("ui job created");
		console.log(this._el);
	}

	render() {
		if (!this.parent) return;

		let j = JobManager.getById(this.jobId);
		if (!j) {
			this.parent = null; 
			this.jobId = 0;
			return;
		}

		this.jobName.label = j.type + " = " + j.counter+ "/" + j.counterMax; 
		this.meter.value = (j.counterMax - j.counter);
	}

	static getOrCreate(jobId: number): UIJob {

		let js:UIJob[] = UIManager.getFree(UIJob) as UIJob[];
		let j:UIJob

		if (js.length>0) {
			j = js[0];
			// console.log('reuse ui job');
		} else {
			j = new UIJob(jobId);
			// console.log('crete new ui job');
		}

		j.jobId = jobId;
		j.meter.max = JobManager.getById(jobId)?.counterMax || 100;
		return j;
	}

	static createByBuildingId(buildingId:number, cont:UICont):void {
		JobManager.getByBuildingId(buildingId).forEach((job) => {
			if (UIJob.getByJobId(job.id) !== null) return;

			let ui = UIJob.getOrCreate(job.id);
			ui.jobName.label = job.type
			cont.appendChild(ui);
		})
	}

	static getByJobId(jobId: number): UIJob | null {
		let j = UIManager.getByType(UIJob).filter(item => item.jobId == jobId);
		return j.length > 0 ? j[0] : null;
	}
}