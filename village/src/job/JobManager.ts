import type { Building } from "../building/Building.js";
import { buildingState } from "../building/buildingData.js";
import { Job } from "./Job.js";
import { jobType } from "./JobData.js";
import { JobFactory } from "./JobFactory.js";

export class JobManager {
	private static list: Job[] = [];

	static getAll(): Job[] {
		return this.list;
	}

	static getById(id: number): Job | null {
		const jobs = this.list.filter(item => item.id === id);
		return jobs.length > 0 ? jobs[0] : null;
	}

	static getByBuilding(building: Building): Job[] {
		return this.list.filter(item => item.buildingRef == building);
	}

	static create(type: jobType, building: Building): Job {
		const job = JobFactory.create(type, building);
		this.list.push(job);
		return job;
	}

	static remove(job: Job): void {
		// console.log("job removed " + job.id + "/" + job.counter);
		job.remove();
		this.list = this.list.filter(item => item.id !== job.id);
	}

	static tick(): void {
		this.list.forEach(job => {
			if (job.buildingRef?.state == buildingState.PRODUCE) {
				job.tick();
			}
		});
	}
}
