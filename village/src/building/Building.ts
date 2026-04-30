import { id } from "../Id.js";
import { jobType } from "../job/Job.js";
import { JobManager } from "../job/JobManager.js";

export const buildingTypeConst = {
	FORESTER: 'FORESTER',
	WELL: 'WELL',
	SAWMILL: 'SAWMILL'
} as const;

export type buildingType = typeof buildingTypeConst[keyof typeof buildingTypeConst];

export const buildingState = {
	PLAN: 'plan',
	BUILD: 'build',
	PRODUCE: 'produce'
}
export type buildingState = typeof buildingState[keyof typeof buildingState];

export class Building {
	private _type: buildingType = buildingTypeConst.FORESTER;
	private _img: Basik.GbrObj;
	private _width: number = 1;
	private _height: number = 1;
	private _state: buildingState = buildingState.PLAN;

	private _id: number;
	private _x: number = 0;
	private _y: number = 0;
	private positionSet: boolean = false;

	//debug purpose
	private jobCtr:number=0;

	constructor(url: string, ty: buildingType) {
		this._type = ty;
		this._img = muatGambar(url);
		this._id = id.nextid;
	}

	private createJob() {
		if (this._state != buildingState.PRODUCE) return;
		if (this.jobCtr > 10) return;

		this.availableJobList().forEach((jobType) => {
			if (JobManager.getByBuildingIdAndType(this.id, jobType).length == 0) {
				JobManager.create(jobType, this.id);
				this.jobCtr++;
				console.log("job ctr " + this.jobCtr);
			}
		})
	}

	tick(): void {
		this.createJob();
	}

	availableJobList(): jobType[] {
		if (this._type === buildingTypeConst.FORESTER) {
			return [
				jobType.PLAN_TREE
			]
		}
		else if (this._type === buildingTypeConst.WELL) {
			return [
				jobType.WATER
			]
		}
		else if (this._type == buildingTypeConst.SAWMILL) {
			return [
				
			]
		}
		else {
			throw Error('no job defined yet');
		}
	}

	isPositionSet(): boolean {
		return this.positionSet;
	}

	public get y(): number {
		return this._y;
	}
	public set y(value: number) {
		this._y = value;
		this.img.y = value;
		this.positionSet = true;
	}

	public get x(): number {
		return this._x;
	}
	public set x(value: number) {
		this._x = value;
		this.img.x = value;
		this.positionSet = true;
	}

	public get id(): number {
		return this._id;
	}

	public get state(): buildingState {
		return this._state;
	}
	public set state(value: buildingState) {
		this._state = value;
	}
	public get width(): number {
		return this._width;
	}
	public set width(value: number) {
		this._width = value;
	}
	public get height(): number {
		return this._height;
	}
	public set height(value: number) {
		this._height = value;
	}

	public get type(): buildingType {
		return this._type;
	}

	public get img(): Basik.GbrObj {
		return this._img;
	}
}