import { BuildingManager } from "./BuildingManager.js";
import { gameData } from "../Data.js";
import { uiBuildingDetail } from "../ui/UIBuildingDetail.js";

const NO_BUILDING = 0;

export class BuildingInteractionHandler {
	static updatePlanMode(): void {
		let b = gameData.buildingRef;
		if (b == null) throw Error('invalid building');		

		b.gridX = Math.floor(mouseX()/32);
		b.gridY = Math.floor(mouseY()/32);

		if (b.collideBuilding()) {
			console.log("colliding other building");
		}
	}

	static buildingMouseDown(): void {
		BuildingManager.getAll().forEach((item) => {
			if (item.img.ditekan) {
				uiBuildingDetail.buildingId = item.id;
				uiBuildingDetail.buildingRef = item;
				uiBuildingDetail.open();
			}
		});
	}

	static mouseDown(): void {
		if (!gameData.buildingRef) {
			BuildingInteractionHandler.updatePlanMode();	
		} else {
			BuildingInteractionHandler.buildingMouseDown();
		}
	}

	static mouseTap(): void {
		//Empty implementation
	}
}
