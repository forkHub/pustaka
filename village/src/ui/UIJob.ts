import { id } from "../Id";
import { Job } from "../Job";
import { UIBase } from "./IUI";
import { UISpan } from "./UISpan";

export class UIJob extends UIBase {
	private static uiList: UIJob[] = [];
	private jobId: number;
	private id: number;
	private label: UISpan = new UISpan('');
	private jobName: UISpan = new UISpan('');

	constructor(jobId: number) {
		super();
		this._el = document.createElement('div');
		this.appendChild(this.jobName);
		this.appendChild(this.label);

		this.id = id.id;
		UIJob.uiList.push(this);
		this.jobId = jobId;
	}

	render() {
		if (!this.parent) return;

		let j = Job.getById(this.jobId);
		if (!j) {
			this.parent = null;
			return;
		}

		this.jobName.label = j.type;
		this.label.label = j.counter + '';
	}

	static get list() {
		return UIJob.uiList.slice();
	}

	static render() {
		UIJob.uiList.forEach((item) => {
			item.render();
		})
	}

	static getFree(): UIJob | null {
		let j = UIJob.uiList.filter(item => item.parent === null);
		return j.length > 0 ? j[0] : null;
	}

	static getOrCreate(jobId: number): UIJob {
		let j = UIJob.getByJobId(jobId);

		if (j !== null) return j;

		j = UIJob.getFree();

		if (j) {
			j.jobId = jobId;
		} else {
			j = new UIJob(jobId);
		}

		return j;
	}

	static getByJobId(jobId: number): UIJob | null {
		let j = UIJob.uiList.filter(item => item.jobId == jobId);
		return j.length > 0 ? j[0] : null;
	}

	static getById(id: number): UIJob | null {
		let j = UIJob.uiList.filter(item => item.id === id);
		return j.length > 0 ? j[0] : null
	}
}