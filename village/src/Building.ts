import { gameData } from "./Data.js";
import { id } from "./Id.js";
import { Job, jobStateType } from "./Job.js";

export const buildingType = {
	FORESTER: 'FORESTER',
	WELL: 'WELL',
	SAWMILL: 'SAWMILL'
} as const;

export interface buildingDef {
	type: buildingType;
	width: number;
	height: number;
}

export type buildingType = typeof buildingType[keyof typeof buildingType];

export const buildingState = {
	PLAN: 'plan',
	BUILD: 'build',
	PRODUCE: 'produce'
}
export type buildingState = typeof buildingState[keyof typeof buildingState];

export class Building {
	private static list: Building[] = [];

	private _type: buildingType = buildingType.FORESTER;
	private _img!: Basik.GbrObj;
	private _width: number = 1;
	private _height: number = 1;
	private _state: buildingState = buildingState.PLAN;
	private jobs: number[] = [];
	private _id: number;
	private _x: number = 0;
	private _y: number = 0;
	private positionSet: boolean = false;

	constructor(url: string, ty: buildingType) {
		this._type = ty;
		this._img = muatGambar(url);
		this._id = id.id;
	}

	tick(): void {
		//TODO issue job

		//udate job
		Job.getByBuildingId(this.id).forEach((item) => {
			item.tick();
			if (item.state == jobStateType.FINISH) {
				Job.removeByJob(item);
				//TODO: remove UI
			}
		})
	}

	//TODO:
	collideBuilding(b: Building): boolean {
		b;
		return false;
	}

	remove(): void {
		while (this.jobs.length > 0) {
			let id = this.jobs.pop();
			if (id) {
				let j = Job.getById(id);
				if (!j) throw Error('invalid job to remove');
				j.cancel();
			}
		}
	}

	static tick(): void {
		Building.list.forEach((item) => {
			item.tick();
		})
	}

	static mouseDown() {
		if (gameData.buildingToBuild <= 0) return;

		let b = Building.getById(gameData.buildingToBuild);
		if (b == null) throw Error('invalid building');

		b.x = mouseX();
		b.y = mouseY();

		//TODO: invalid test for collapsing building
	}

	static mouseTap() {

	}

	static remove(id: number) {
		let b = Building.getById(id);
		if (!b) throw Error('invalid building to remove');

		Building.list = Building.list.filter(item => item.id != id);
	}

	static getById(id: number): Building | null {
		let b = Building.list.filter(item => item.id == id);
		return b.length > 0 ? b[0] : null;
	}

	static buildByType(ty: buildingType): Building {
		let b: Building;

		if (ty == buildingType.FORESTER) {
			b = new Building("", buildingType.FORESTER); //TODO:
		}
		else if (ty == buildingType.WELL) {
			b = new Building("well2", buildingType.WELL);
			// b.
		}
		else {
			throw Error('invalid type');
		}

		Building.list.push(b);
		return b;
	}

	static render() {
		//TODO: sorting
		Building.list.forEach((item) => {
			if (item.state == buildingState.PLAN) {
				//TODO: set alpha
			}

			if (item.positionSet) stempel(item.img);
		})
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

	public get type(): string {
		return this._type;
	}

	public get img(): Basik.GbrObj {
		return this._img;
	}
}