import { jobType } from "../job/JobData.js";
// import { JobManager } from "../job/JobManager.js";
import { BuildingData, type buildingType, buildingState, buildingTypeConst, type buildingDbo } from "./buildingData.js";
import { BuildingManager } from "./BuildingManager.js";

export class Building extends BuildingData {
	constructor(url: string, ty: buildingType) {
		super(url, ty);
	}

	toDbo(): buildingDbo {
		return {
			id: this._id,
			type: this._type
		}
	}

	collideBuilding(): boolean {
		let startX = this._gridX;
		let startY = this._gridY;
		let endX = startX + this._width;
		let endY = startY + this._height;

		const buildings = BuildingManager.getAll();
		for (const b of buildings) {
			if (b !== this) {
				for (let i = startX; i < endX; i++) {
					for (let j = startY; j < endY; j++) {
						if (b.collidePoint(true, i, j)) {
							return true;
						}
					}
				}
			}
		}

		return false;
	}

	collidePoint(pad: boolean, px: number, py: number): boolean {
		let startX = this._gridX;
		let startY = this._gridY;

		let endX = startX + this._width;
		let endY = startY + this._height;

		if (pad) {
			startX--;
			startY--;
			endX++;
			endY++;
		}

		return px >= startX && px < endX && py >= startY && py < endY;
	}

	tick(): void {
		if (this._state === buildingState.PRODUCE) {
			// JobManager.getByBuilding(this).forEach((job) => {
			// 	job.tick();
			// })
		}
		else if (this._state === buildingState.BUILD) {
			this.state = buildingState.PRODUCE;
			console.log("building state transition to producing");
		}
		else if (this._state === buildingState.PLAN) {
			//empty impementation
		}
		else {
			throw Error("invalid building state " + this._state);
		}
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
		else if (this._type == buildingTypeConst.WOOD_CUTTER) {
			return [

			]
		}
		else {
			throw Error('no job defined yet');
		}
	}
}