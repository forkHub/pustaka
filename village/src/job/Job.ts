import { store } from "../Data.js";
import { type resourceCountByType } from "../Resource.js";

export const jobType = {
	CUT_TREE: 'cut wood',
	PLAN_TREE: 'plan tree',
	WATER: 'water'
} as const;

export type jobType = typeof jobType[keyof typeof jobType];

export const jobStateTypeConst = {
	START: 'start',
	PROGRESS: 'progress',
	FINISH: 'finish'
} as const;

export type jobStateType = typeof jobStateTypeConst[keyof typeof jobStateTypeConst]

/**
 * Job - Pure data model representing a single job/task
 * Responsibilities: Hold job state, execute job logic per tick
 */
export class Job {
	private _type: jobType = jobType.CUT_TREE;
	private _state: jobStateType = jobStateTypeConst.START;
	private _counterMax: number = 100;
	private _counter: number = 0;
	private _id: number = 0;
	private _buildingId: number = 0;
	
	// Made public for JobFactory access
	public requiredResource: resourceCountByType[] = [];
	public produce: resourceCountByType[] = [];

	public get type(): jobType {
		return this._type;
	}
	public set type(value: jobType) {
		this._type = value;
	}

	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}

	public get counterMax(): number {
		return this._counterMax;
	}
	public set counterMax(value: number) {
		this._counterMax = value;
	}

	public get buildingId(): number {
		return this._buildingId;
	}
	public set buildingId(value: number) {
		this._buildingId = value;
	}

	public get state(): jobStateType {
		return this._state;
	}
	public set state(value: jobStateType) {
		this._state = value;
	}

	public get counter(): number {
		return this._counter;
	}
	public set counter(value: number) {
		this._counter = value;
	}

	constructor() {
		// ID is now assigned by JobFactory
	}

	cancel(): void {
		this.state = jobStateTypeConst.FINISH;
	}

	isFinished(): boolean {
		return this.state === jobStateTypeConst.FINISH;
	}

	tick(): void {
		if (this.state === jobStateTypeConst.START) {
			this.tryStart();
		}
		else if (this.state === jobStateTypeConst.PROGRESS) {
			this.tickProgress();
		}
		// Note: FINISH state is now handled by JobManager
	}

	private tryStart(): void {
		let canStart = true;

		// Check if we have required resources
		this.requiredResource.forEach((item) => {
			if (store.getResourceByType(item.resType).amount < item.amount) {
				canStart = false;
			}
		});

		if (canStart) {
			// Consume required resources
			this.requiredResource.forEach((item) => {
				store.getResourceByType(item.resType).amount -= item.amount;
			});
			this.state = jobStateTypeConst.PROGRESS;
			this.counter = this._counterMax;
		}
	}

	private tickProgress(): void {
		if (this.counter > 0) {
			this.counter--;
		}
		else {
			// Produce resources
			this.produce.forEach((item) => {
				store.getResourceByType(item.resType).amount += item.amount;
			});
			this.state = jobStateTypeConst.FINISH;
		}
	}

	destroy(): void {
		this.requiredResource = [];
		this.produce = [];
	}
}
