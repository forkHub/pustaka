import { JobManager } from "../job/JobManager";
import { UIBase, UICont } from "./UIBase";
import { UISpan } from "./UISpan";

export class UIJob extends UIBase {
	private _jobId: number = 0;
	public get jobId(): number {
		return this._jobId;
	}
	public set jobId(value: number) {
		this._jobId = value;
	}
	private label: UISpan = new UISpan('');
	private jobName: UISpan = new UISpan('');

	constructor(jobId: number) {
		super();
		this._el = document.createElement('div');
		this.appendChild(this.jobName);
		this.appendChild(this.label);

		this.jobId = jobId;
	}

	static removeByBuildingId(buildingId: number) {
		JobManager.getByBuildingId(buildingId).forEach((item) => {
			const uiJob = UIJob.getByJobId(item.id);
			if (uiJob) uiJob.parent = null;
		})
	}

	render() {
		if (!this.parent) return;

		let j = JobManager.getById(this.jobId);
		if (!j) {
			this.parent = null; 
			console.log("ui job removed, ui id " + this.id + "/job id " + this.jobId);
			// debugger;
			// debugger;
			return;
		}

		this.jobName.label = j.type;
		this.label.label = j.counter + '';
	}

	static get list():UIJob[] {
		return UIBase.getByType(UIJob);
	}

	static getFree(): UIJob | null {
		let j = UIJob.list.filter(item => item.parent === null);
		return j.length > 0 ? j[0] as UIJob : null;
	}

	static getOrCreate(jobId: number): UIJob {

		let j = UIJob.getFree();

		if (j) {
			j.jobId = jobId;
		} else {
			j = new UIJob(jobId);
			j.jobId = jobId;
		}

		return j;
	}

	static renderByBuildingId(buildingId:number, cont:UICont):void {
		JobManager.getByBuildingId(buildingId).forEach((job) => {
			if (UIJob.getByJobId(job.id) !== null) return;

			UIJob.getOrCreate(job.id).parent = cont;
			console.log("build new job ui for " + job.id);
		})
	}

	static render() {
		UIBase.getByType(UIJob).forEach((ui) => {
			ui.render();
		});
	}

	static getByJobId(jobId: number): UIJob | null {
		let j = UIJob.list.filter(item => item.jobId == jobId);
		return j.length > 0 ? j[0] : null;
	}

	static getById(id: number): UIJob | null {
		let j = UIJob.list.filter(item => item.id === id);
		return j.length > 0 ? j[0] : null
	}
}