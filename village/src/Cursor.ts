// import { gameData, GameState } from "./Data";

// class Cursor {
// 	private img: Basik.GbrObj = muatAnimasi('tile', 48, 76);
// 	private posX: number = -1;
// 	private posY: number = -1;

// 	public mouseDown(): void {
// 		console.log("Cursor.mousedown");
// 		if (gameData.state != GameState.BUILD) return;

// 		this.posX = mouseX();
// 		this.posY = mouseY();
// 	};

// 	render(): void {
// 		if (this.posX < 0) return;
// 		if (this.posY < 0) return;

// 		this.img.x = this.posX;
// 		this.img.y = this.posY;
// 		stempel(this.img);
// 	}
// }

// export const cursor: Cursor = new Cursor();