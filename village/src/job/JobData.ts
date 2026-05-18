import type { Building } from "../building/Building";
import type { resourceCountByType } from "../Resource";

export const jobType = {
	CUT_TREE: 'cut wood',
	PLAN_TREE: 'planting tree',
	WATER: 'draw water',
	SAW_MILL: 'saw_mill'
} as const;

export type jobType = typeof jobType[keyof typeof jobType];

export const jobStateTypeConst = {
	START: 'start',
	PROGRESS: 'progress',
	COOL_DOWN: 'cool down',
	FINISH: 'finish'
} as const;

export type jobStateType = typeof jobStateTypeConst[keyof typeof jobStateTypeConst]

export class JobData {
	protected _type: jobType = jobType.CUT_TREE;
	protected _state: jobStateType = jobStateTypeConst.START;
	protected _counterMax: number = 100;
	protected _counter: number = 0;
	protected _id: number = 0;
	// protected _buildingId: number = 0;
	protected coolDownCtr: number = 20;
	protected readonly COOL_DOWN_MAX = 20;
	protected _buildingRef: Building | undefined;

	public get buildingRef(): Building | undefined {
		return this._buildingRef;
	}
	public set buildingRef(value: Building) {
		this._buildingRef = value;
	}

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

	// public get buildingId(): number {
	//     return this._buildingId;
	// }

	// public set buildingId(value: number) {
	//     this._buildingId = value;
	// }

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
}

