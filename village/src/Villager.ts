import { BuildingManager } from "./building/BuildingManager";
import { BuildingRenderer } from "./building/BuildingRenderer";
// import { camera } from "./Camera";
import { gameData } from "./Data";
import { JobManager } from "./job/JobManager";
import { UIManager } from "./ui/base/UIManager";
import { uiHeader } from "./ui/UIHeader";
import { uiMainMenu } from "./ui/UIMainMenu";

export function log(msg: string) {
	gameData.maxLog--;
	if (gameData.maxLog > 0) {
		console.log(msg);
	}
}

export function resize() {
	let canvas = document.querySelector("canvas");
	if (canvas) {
		canvas.style.width = '100vw';
		canvas.style.height = '100vh';

		// Get the computed width as a number (in pixels)
		const width = parseInt(getComputedStyle(canvas).width, 10);
		const height = parseInt(getComputedStyle(canvas).height, 10);

		let ratio = Math.min(width / 480, height / 480);

		canvas.width = width / ratio;
		canvas.height = height / ratio;

		console.log("radio", ratio);
	}
}

export function tick(n: number) {
	for (let i = 0; i < n; i++) {
		BuildingManager.tick();
		JobManager.tick();
	}
}

export function render() {
	bersihkanLayar();
	BuildingRenderer.render();
	UIManager.render();

	// tulis("camera x " + camera.x + "/camera.y " + camera.y, 20, 120);
}

export function start() {
	buatKanvas(480, 480, undefined, 0);
	uiMainMenu.open();
	uiHeader.appendToDocument();
	gameData.loadingImg = muatGambar("loading");

	setTimeout(() => {
		resize();
	}, 10);

}
