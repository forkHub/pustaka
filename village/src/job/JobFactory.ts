import { Job, jobType } from "./Job.js";
import { JobDefinitions } from "./JobDefinitions.js";
import { id } from "../Id.js";

export class JobFactory {
	static create(type: jobType, buildingId: number): Job {
		const definition = JobDefinitions.getDefinition(type);
		
		const job = new Job();
		job.id = id.nextid;
		job.type = type;
		job.buildingId = buildingId;
		job.counterMax = definition.counterMax;
		
		// Deep copy required resources
		job.requiredResource = definition.requiredResources.map(res => ({
			resType: res.resType,
			amount: res.amount
		}));
		
		// Deep copy produced resources
		job.produce = definition.producedResources.map(res => ({
			resType: res.resType,
			amount: res.amount
		}));

		// console.log("job created " + job.id + "/building id " + job.buildingId);
		
		return job;
	}
}
