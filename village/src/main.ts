import { buildingTypeConst } from "./building/Building.js";
import { BuildingManager } from "./building/BuildingManager.js";
import { BuildingRenderer } from "./building/BuildingRenderer.js";
import { BuildingInteractionHandler } from "./building/BuildingInteractionHandler.js";
import { gameData, GameState } from "./Data.js";
import { JobManager } from "./job/JobManager.js";
import { uiBuildingDetail } from "./ui/UIBuildingDetail.js";
import { uiConfirmBuild } from "./ui/UIConfirmBuild.js";
import { UIJob } from "./ui/UIJob.js";

function render() {
	bersihkanLayar();
	BuildingRenderer.render();
	uiBuildingDetail.render();
	UIJob.render();
}

function tick(n: number) {
	for (let i = 0; i < n; i++) {
		BuildingManager.tick();
		JobManager.tick();
	}
}

buatKanvas(400, 600);
Basik.Event.addEventListener(Basik.Evt.MOUSE_DOWN, () => {
	console.log("mouse down");
	BuildingInteractionHandler.mouseDown();
})

Basik.Event.addEventListener(Basik.Evt.MOUSE_TAP, () => {
	BuildingInteractionHandler.mouseTap();
})

Basik.Event.addEventListener(Basik.Evt.UPDATE, () => {
	tick(gameData.tickCount);
	render();
});

document.body.appendChild(uiConfirmBuild.el);
gameData.state = GameState.BUILD;
let b = BuildingManager.buildByType(buildingTypeConst.WELL);
gameData.buildingToBuild = b.id;

