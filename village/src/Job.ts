import { store } from "./Data";
import { id } from "./Id";
import { type resourceCountByType, resourceType } from "./Resource";

export const jobType = {
	CUT_TREE: 'cut wood',
	PLAN_TREE: 'plan tree',
	WATER: 'water'
} as const;

export type jobType = typeof jobType[keyof typeof jobType];

export interface jobDef {

}

export const jobStateType = {
	START: 'start',
	PROGRESS: 'progress',
	FINISH: 'finish'
} as const;
export type jobStateType = typeof jobStateType[keyof typeof jobStateType]

export class JobState {
	private _type: jobStateType = jobStateType.START;
	readonly res: number[] = [];

	public get type(): jobStateType {
		return this._type;
	}
	public set type(value: jobStateType) {
		this._type = value;
	}
}

export class Job {
	private static list: Job[] = [];

	private _type: jobType = jobType.CUT_TREE;
	private _state: jobStateType = jobStateType.START;
	private _counterMax: number = 100;
	private _counter: number = 0;
	private _id: number = 0;
	private _buildingId: number = 0;
	private requiredResource: resourceCountByType[] = [];
	private produce: resourceCountByType[] = [];

	public get type(): jobType {
		return this._type;
	}

	public set type(value: jobType) {
		this._type = value;
	}

	public get id(): number {
		return this._id;
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
		this._id = id.id;
	}

	cancel() {
		this.state = jobStateType.FINISH;
	}

	tick(): void {
		if (this.state == jobStateType.START) {
			let canStart: boolean = true;

			this.requiredResource.forEach((item) => {
				if (store.getResourceByType(item.resType).amount < item.amount) {
					canStart = false;
				}
			});

			if (canStart) {
				this.requiredResource.forEach((item) => {
					store.getResourceByType(item.resType).amount -= item.amount;
				});
				this.state = jobStateType.PROGRESS;
				this.counter = this._counterMax;
				// console.log("Job: start");
			}
		}
		else if (this.state == jobStateType.PROGRESS) {
			if (this.counter > 0) {
				this.counter--;
			}
			else {
				this.produce.forEach((item) => {
					store.getResourceByType(item.resType).amount += item.amount;
				})
				this.state = jobStateType.FINISH;
			}
		}
		else if (this.state == jobStateType.FINISH) {
			Job.removeByJob(this);
			// console.log('job finish');
			//TODO: remove ui if necesary
		}
		else {
			throw new Error('invalid state');
		}
	}

	destroy(): void {
		// console.log('Job destroyed, type ' + this._type);
		this.requiredResource = [];
		this.produce = [];
	}

	static getById(id: number): Job | null {
		let j = Job.list.filter(item => item.id == id);

		return j.length > 0 ? j[0] : null;
	}

	static getByBuildingId(buildingId: number): Job[] {
		return Job.list.filter(item => item.buildingId == buildingId);
	}

	static getByBuildingIdAndType(id: number, type: jobType): Job[] {
		return this.getByBuildingId(id).filter((item) => item.type === type);
	}

	static createIfDoesntExists() {

	}

	static create(type: jobType, buildingId: number): Job {
		let j: Job = new Job();

		if (type == jobType.CUT_TREE) {
			j.requiredResource.push({
				resType: resourceType.TREE,
				amount: 1
			})
			j.produce.push({
				resType: resourceType.WOOD,
				amount: 2
			});
		}
		else if (type === jobType.WATER) {
			j.produce.push({
				resType: resourceType.WATER,
				amount: 1
			})
		}
		else {
			throw Error('undefined type');
		}

		j.type = type;
		j.buildingId = buildingId;
		Job.list.push(j);

		return j;
	}

	static removeByJob(j: Job): void {
		// console.log("Job: remove by job, id " + j.id);
		j.destroy();
		Job.list = this.list.filter((item) => item.id != j.id);
		// console.log(Job.list.length);
	}

	static tick() {
		Job.list.forEach((item) => {
			item.tick();
		})
	}


}
