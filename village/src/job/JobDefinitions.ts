import { resourceType, type resourceCountByType } from "../Resource.js";
import { jobType } from "./Job.js";

export interface JobDefinition {
	type: jobType;
	counterMax: number;
	requiredResources: resourceCountByType[];
	producedResources: resourceCountByType[];
}

export class JobDefinitions {
	private static definitions: Map<jobType, JobDefinition> = new Map([
		[jobType.CUT_TREE, {
			type: jobType.CUT_TREE,
			counterMax: 1000,
			requiredResources: [
				{ resType: resourceType.TREE, amount: 1 }
			],
			producedResources: [
				{ resType: resourceType.WOOD, amount: 2 }
			]
		}],
		[jobType.WATER, {
			type: jobType.WATER,
			counterMax: 100,
			requiredResources: [],
			producedResources: [
				{ resType: resourceType.WATER, amount: 1 }
			]
		}],
		[jobType.PLAN_TREE, {
			type: jobType.PLAN_TREE,
			counterMax: 1000,
			requiredResources: [
				{ resType:resourceType.WATER, amount: 1 }
			],
			producedResources: [
				{ resType: resourceType.TREE, amount: 1 }
			]
		}]
	]);

	static getDefinition(type: jobType): JobDefinition {
		const def = this.definitions.get(type);
		if (!def) {
			throw new Error(`Job definition not found for type: ${type}`);
		}
		return def;
	}

	static hasDefinition(type: jobType): boolean {
		return this.definitions.has(type);
	}
}
