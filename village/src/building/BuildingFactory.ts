import { Building } from "./Building.js";
import type { buildingType } from "./Building.js";
import { buildingTypeConst } from "./Building.js";

export class BuildingFactory {
	static buildByType(ty: buildingType): Building {
		let b: Building;

		if (ty == buildingTypeConst.FORESTER) {
			b = new Building("", buildingTypeConst.FORESTER);
		}
		else if (ty == buildingTypeConst.WELL) {
			b = new Building("well2", buildingTypeConst.WELL);
		}
		else {
			throw Error('invalid type');
		}

		return b;
	}
}
