import { Job, jobType } from "./Job.js";
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

	static getByBuildingId(buildingId: number): Job[] {
		return this.list.filter(item => item.buildingId === buildingId);
	}

	static getByBuildingIdAndType(buildingId: number, type: jobType): Job[] {
		return this.getByBuildingId(buildingId).filter(item => item.type === type);
	}

	static create(type: jobType, buildingId: number): Job {
		const job = JobFactory.create(type, buildingId);
		this.list.push(job);
		return job;
	}

	static remove(job: Job): void {
		console.log("job removed " + job.id + "/" + job.counter);
		job.destroy();
		this.list = this.list.filter(item => item.id !== job.id);
	}

	static tick(): void {
		// Process all jobs
		this.list.forEach(job => {
			job.tick();
		});

		// Remove finished jobs
		const finishedJobs = this.list.filter(job => job.isFinished());
		finishedJobs.forEach(job => {
			this.remove(job);
		});
	}
}
