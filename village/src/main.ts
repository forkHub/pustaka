import { Building, buildingType } from "./Building.js";
import { gameData, GameState } from "./Data.js";
import { Job } from "./Job.js";
import { uiBuildingDetail } from "./ui/UIBuildingDetail.js";
import { uiConfirmBuild } from "./ui/UIConfirmBuild.js";
import { UIJob } from "./ui/UIJob.js";

function render() {
	bersihkanLayar();
	Building.render();
	UIJob.render();
	uiBuildingDetail.render();
}

function tick(n: number) {
	for (let i = 0; i < n; i++) {
		Building.tick();
		Job.tick();
	}
}

buatKanvas(400, 600);
Basik.Event.addEventListener(Basik.Evt.MOUSE_DOWN, () => {
	console.log("mouse down");
	// cursor.mouseDown();
	Building.mouseDown();
})

Basik.Event.addEventListener(Basik.Evt.MOUSE_TAP, () => {
	Building.mouseTap();
})

Basik.Event.addEventListener(Basik.Evt.UPDATE, () => {
	tick(gameData.tickCount);
	render();
});

document.body.appendChild(uiConfirmBuild.el);
uiConfirmBuild.el.style.zIndex = '1000px';
gameData.state = GameState.BUILD;
let b = Building.buildByType(buildingType.WELL);
gameData.buildingToBuild = b.id;
