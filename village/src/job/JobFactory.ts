import { Job } from "./Job.js";
import { JobDefinitions } from "./JobDefinitions.js";
import { id } from "../Id.js";
import { jobType } from "./JobData.js";
import type { Building } from "../building/Building.js";

export class JobFactory {
	static create(type: jobType, building: Building): Job {
		const definition = JobDefinitions.getDefinition(type);
		
		const job = new Job();
		job.id = id.nextid;
		job.type = type;
		job.buildingRef = building;
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
		
		return job;
	}
}
