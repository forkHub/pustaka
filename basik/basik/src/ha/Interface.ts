namespace Basik {
	export interface IInput {
		id: string;
		pointerType: string;
		xStart: number;
		yStart: number;
		xDrag: number;
		yDrag: number;
		moveX: number;
		moveY: number;
		x: number;
		y: number;
		isDrag: boolean;
		isDown: boolean;
		isTap: boolean;
		evt: PointerEvent;
		button: number;
		timerStart: number;
		timerEnd: number;
		pointerId: number;
	}

	export interface IWarna {
		r: number;
		g: number;
		b: number;
	}

	export interface IV2D {
		x: number,
		y: number
	}

	export interface IAudio {
		src: string;
		loaded: boolean;
		sound: HTMLAudioElement;
		playedCount: number;
	}
}