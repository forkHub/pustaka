import { Spider } from "./Spider2.js";

window.onload = () => {
	const spider = new Spider(100, 50);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;
	if (!ctx) throw Error("no context");

	canvas.width = 800;
	canvas.height = 550;

	document.body.appendChild(canvas);

	function update() {
		ctx.clearRect(0, 0, 800, 550);
		spider.update();
		spider.render(ctx);
		requestAnimationFrame(() => {
			update();
		})
	}

	window.onclick = (e) => {
		spider.setTarget(e.clientX, e.clientY);
	}

	update();
}
