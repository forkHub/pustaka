import { Building } from "./Building.js";
import { BuildingFactory } from "./BuildingFactory.js";
import type { buildingType } from "./Building.js";

export class BuildingManager {
	private static list: Building[] = [];

	static add(building: Building): void {
		BuildingManager.list.push(building);
	}

	static remove(id: number): void {
		let b = BuildingManager.getById(id);
		if (!b) throw Error('invalid building to remove');

		BuildingManager.list = BuildingManager.list.filter(item => item.id != id);
	}

	static getById(id: number): Building | null {
		let b = BuildingManager.list.filter(item => item.id == id);
		return b.length > 0 ? b[0] : null;
	}

	static buildByType(ty: buildingType): Building {
		let b = BuildingFactory.buildByType(ty);
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
