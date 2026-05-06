import { buildingState } from "./buildingData.js";
import { BuildingManager } from "./BuildingManager.js";

export class BuildingRenderer {
	static render(): void {
		BuildingManager.getAll().forEach((item) => {
			if (item.state == buildingState.PLAN) {
				if (item.isPosisionSet) {
					stempel(item.img);
				}
			}
			else {
				stempel(item.img);
			}
		});
	}
}
