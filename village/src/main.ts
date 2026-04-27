import { Building, buildingType } from "./Building.js";
// import { cursor } from "./Cursor.js";
import { gameData, GameState } from "./Data.js";
import { uiConfirmBuild } from "./ui/UIConfirmBuild.js";

Basik.Event.addEventListener(Basik.Evt.MOUSE_DOWN, () => {
	console.log("mouse down");
	// cursor.mouseDown();
	Building.mouseDown();
})

Basik.Event.addEventListener(Basik.Evt.UPDATE, () => {
	tick(gameData.tickCount);
	render();
});

function render() {
	bersihkanLayar();
	// cursor.render();
	Building.render();
}

function tick(n: number) {
	for (let i = 0; i < n; i++) {
		Building.tick();
	}
}

buatKanvas(400, 600);
document.body.appendChild(uiConfirmBuild.el);
uiConfirmBuild.el.style.zIndex = '1000px';
gameData.state = GameState.BUILD;
let b = Building.buildByType(buildingType.WELL);
gameData.buildingToBuild = b.id;
