import { BuildingManager } from "./building/BuildingManager.js";
import { BuildingRenderer } from "./building/BuildingRenderer.js";
import { BuildingInteractionHandler } from "./building/BuildingInteractionHandler.js";
import { gameData } from "./Data.js";
import { JobManager } from "./job/JobManager.js";
import { UIManager } from "./ui/base/UIManager.js";
import { uiHeader } from "./ui/UIHeader.js";
import { uiMainMenu } from "./ui/UIMainMenu.js";

buatKanvas(480, 480, undefined, 0);
uiMainMenu.open();
uiHeader.appendToDocument();

function render() {
	bersihkanLayar();
	BuildingRenderer.render();
	UIManager.render();
}

export function log(msg:string) {
	gameData.maxLog--;
	if (gameData.maxLog > 0) {
		console.log(msg);
	}
}

function tick(n: number) {
	for (let i = 0; i < n; i++) {
		BuildingManager.tick();
		JobManager.tick();
	}
}

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

window.addEventListener("resize", () => {
	resize();
})

function resize() {
	let canvas = document.querySelector("canvas");
	if (canvas) {
		canvas.style.width = '100vw';
		canvas.style.height = '100vh';

        // Get the computed width as a number (in pixels)
        const width = parseInt(getComputedStyle(canvas).width, 10);
		const height = parseInt(getComputedStyle(canvas).height, 10);

        let ratio = Math.min(width/480, height/480);

		canvas.width = width / ratio;
		canvas.height = height / ratio;

		console.log("radio", ratio);
	}
}
setTimeout(() => {
	resize();
}, 10);

//debug
// uiMenu.debug();
// uiSelectBuildingToBuild.debug();
// uiConfirmBuild.debug();