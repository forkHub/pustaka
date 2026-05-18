import { BuildingManager } from "./BuildingManager.js";
import { gameData } from "../Data.js";
import { uiBuildingDetail } from "../ui/UIBuildingDetail.js";
import { camera } from "../Camera.js";
// import { camera } from "../Camera.js";

// const NO_BUILDING = 0;

export class BuildingInteractionHandler {
	static updatePlanMode(): void {
		let b = gameData.buildingRef;

		if (b) {
			b.gridX = Math.floor((mouseX() + camera.x) / 32);
			b.gridY = Math.floor((mouseY() + camera.y) / 32);

			if (b.collideBuilding()) {
				console.log("colliding other building");
				b.message.value = "building sould be separated by one tile from others";
				gameData.buildingCollide = true;
			}
			else {
				gameData.buildingCollide = false;
				b.message.value = "";
			}

			b.isPosisionSet = true;
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
		// if (gameData.buildingRef) {
		// 	BuildingInteractionHandler.updatePlanMode();
		// } else {
		// 	// BuildingInteractionHandler.buildingMouseDown();
		// }
	}

	static mouseTap(): void {
		if (gameData.buildingRef) {
			BuildingInteractionHandler.updatePlanMode();
		} else {
			BuildingInteractionHandler.buildingMouseDown();
		}
	}
}
