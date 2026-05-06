import type { Building } from "./building/Building";
import { resourceType, type resourceCountByType } from "./Resource";
import { Scalar } from "./Skalar";

export const GameState = {
	LOGO: 'LOGO',
	BUILD: 'BUILD',
	GAME: 'GAME'
} as const;

type GameState = typeof GameState[keyof typeof GameState];

class Store {
	private readonly res: resourceCountByType[] = [];

	constructor() {
		for (const key of Object.values(resourceType)) {
			this.addRes(key);
		}
	}

	private addRes(ty: resourceType): void {
		this.res.push({
			resType: ty,
			amount: new Scalar<number>(0)
		})
	}

	getResourceByType(ty: resourceType): resourceCountByType {
		return this.res.filter(item => item.resType == ty)[0];
	}
}
export const store: Store = new Store();

class Data {
	private _state: GameState = GameState.LOGO;
	private _tickCount: number = 1;
	// private _buildingToBuild: number = 0;
	private _buildingRef: Building | undefined;

	public get buildingRef(): Building | undefined{
		return this._buildingRef;
	
	}
	public set buildingRef(value: Building | undefined) {
		this._buildingRef = value;
	}

	private _maxLog: number = 10;
	
	public get maxLog(): number {
		return this._maxLog;
	}
	public set maxLog(value: number) {
		this._maxLog = value;
	}
	readonly GRID_WIDTH:number=32;

	// public get buildingToBuildId(): number {
	// 	return this._buildingToBuild;
	// }
	// public set buildingToBuildId(value: number) {
	// 	this._buildingToBuild = value;
	// }

	public get tickCount(): number {
		return this._tickCount;
	}
	public set tickCount(value: number) {
		this._tickCount = value;
	}
	public get state(): GameState {
		return this._state;
	}
	public set state(value: GameState) {
		this._state = value;
	}

	constructor() {

	}
}

export const gameData: Data = new Data();