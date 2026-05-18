import { BuildingInteractionHandler } from "./building/BuildingInteractionHandler.js";
import { gameData } from "./Data.js";
import { camera } from "./Camera.js";
import { render, resize, start, tick } from "./Villager.js";

start();

window.addEventListener("resize", () => {
	resize();
})

Basik.Event.addEventListener(Basik.Evt.MOUSE_MOVE, () => {
	camera.mouseMove();
})

Basik.Event.addEventListener(Basik.Evt.MOUSE_UP, () => {
	camera.mouseUp();
})

Basik.Event.addEventListener(Basik.Evt.MOUSE_DOWN, () => {
	console.log("mouse down");
	BuildingInteractionHandler.mouseDown();
	camera.mouseDown();
})

Basik.Event.addEventListener(Basik.Evt.MOUSE_TAP, () => {
	BuildingInteractionHandler.mouseTap();
})

Basik.Event.addEventListener(Basik.Evt.UPDATE, () => {
	tick(gameData.tickCount);
	render();
});
