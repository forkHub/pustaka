import { BuildingManager } from "./BuildingManager.js";
import { gameData } from "../Data.js";
import { uiBuildingDetail } from "../ui/UIBuildingDetail.js";

const NO_BUILDING = 0;

export class BuildingInteractionHandler {
	static updatePlanMode(): boolean {
		if (gameData.buildingToBuild <= NO_BUILDING) return false;

		let b = BuildingManager.getById(gameData.buildingToBuild);
		if (b == null) throw Error('invalid building');

		b.x = mouseX();
		b.y = mouseY();

		return true;
	}

	static buildingMouseDown(): void {
		console.log("building image mouse down, test " + BuildingManager.getAll()[0].img.ditekan);
		console.log(BuildingManager.getAll().length);

		BuildingManager.getAll().forEach((item) => {
			if (item.img.ditekan) {
				console.log('Building, img pressed, id ' + item.id);
				uiBuildingDetail.buildingId = item.id;
				uiBuildingDetail.open();
			}
		});
	}

	static mouseDown(): void {
		if (BuildingInteractionHandler.updatePlanMode()) return;
		BuildingInteractionHandler.buildingMouseDown();
	}

	static mouseTap(): void {
		// Empty implementation
	}
}
