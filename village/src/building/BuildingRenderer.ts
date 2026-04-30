import { BuildingManager } from "./BuildingManager.js";
import { buildingState } from "./Building.js";

export class BuildingRenderer {
	static render(): void {
		BuildingManager.getAll().forEach((item) => {
			if (item.state == buildingState.PLAN) {
				if (item.isPositionSet()) {
					stempel(item.img);
				}
			}
			else {
				stempel(item.img);
			}
		});
	}
}
