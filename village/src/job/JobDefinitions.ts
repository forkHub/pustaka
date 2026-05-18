import { resourceType, type resourceCountByType } from "../Resource.js";
import { Scalar } from "../Skalar.js";
import { jobType } from "./JobData.js";

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
			counterMax: 1.30 * 60,
			requiredResources: [
				{ resType: resourceType.TREE, amount: new Scalar<number>(1) }
			],
			producedResources: [
				{ resType: resourceType.WOOD, amount: new Scalar<number>(2) }
			]
		}],
		[jobType.WATER, {
			type: jobType.WATER,
			counterMax: 3 * 60,
			requiredResources: [],
			producedResources: [
				{ resType: resourceType.WATER, amount: new Scalar<number>(1) }
			]
		}],
		[jobType.PLAN_TREE, {
			type: jobType.PLAN_TREE,
			counterMax: Math.floor(2.15 * 60),
			requiredResources: [
				{ resType: resourceType.WATER, amount: new Scalar<number>(1) }
			],
			producedResources: [
				{ resType: resourceType.TREE, amount: new Scalar<number>(1) }
			]
		}],
		[jobType.SAW_MILL, {
			type: jobType.SAW_MILL,
			counterMax: 3 * 60,
			requiredResources: [
				{ resType: resourceType.WOOD, amount: new Scalar<number>(1) }
			],
			producedResources: [
				{ resType: resourceType.PLANK, amount: new Scalar<number>(1) }
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
