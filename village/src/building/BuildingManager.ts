import { JobManager } from "../job/JobManager";
import { Building } from "./Building";
import { buildingTypeConst, type buildingDbo, type buildingType } from "./buildingData";

export class BuildingManager {
	private static list: Building[] = [];

	static toDbo(): buildingDbo[] {
		let r: buildingDbo[] = [];

		BuildingManager.list.forEach((item) => {
			r.push(item.toDbo());
		})

		return r;
	}

	static add(building: Building): void {
		BuildingManager.list.push(building);
	}

	static remove(id: number): void {
		BuildingManager.getById(id)?.remove();
		BuildingManager.list = BuildingManager.list.filter(item => item.id != id);
	}

	static getById(id: number): Building | null {
		let b = BuildingManager.list.filter(item => item.id == id);
		return b.length > 0 ? b[0] : null;
	}

	static buildByType(ty: buildingType): Building {
		let b: Building;

		if (ty == buildingTypeConst.FORESTER) {
			b = new Building("forester3", buildingTypeConst.FORESTER);
			b.width = 3;
			b.height = 3;
			b.offsetY = 32;
			b.offsetX = 32;
		}
		else if (ty == buildingTypeConst.WOOD_CUTTER) {
			b = new Building("wood_cutter3", buildingTypeConst.WOOD_CUTTER);
			b.width = 3;
			b.height = 3;
			b.offsetY = 32;
			b.offsetX = 32;
		}
		else if (ty == buildingTypeConst.WELL) {
			b = new Building("well3", buildingTypeConst.WELL);
			b.width = 2;
			b.height = 3;
			b.offsetY = 64;
		}
		else if (ty == buildingTypeConst.SAW_MILL) {
			b = new Building("sawmill3", buildingTypeConst.SAW_MILL);
			b.width = 3;
			b.height = 3;
			b.offsetY = 32;
			b.offsetX = 32;
		}
		else {
			throw Error('invalid type');
		}

		for (const jobType of b.availableJobList()) {
			console.log("job created " + jobType);
			JobManager.create(jobType, b);
		}

		BuildingManager.add(b);
		return b;
	}

	static getAll(): Building[] {
		return BuildingManager.list;
	}

	static tick(): void {
		BuildingManager.list.forEach((item) => {
			item.tick();
		});
	}
}
