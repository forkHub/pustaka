///<reference path="./Route.ts"/>

/**
 * muouse is down status
 * @param btn {number}
 * @returns {boolean}
 */
function MouseIsDown(btn: number = 0): boolean {
	return In.getInput(btn).isDown;
}

/**
 * mouse is dragged
 * @param btn {number}
 * @returns {boolean}
 */
function MouseIsDragged(btn: number = 0): boolean {
	return In.getInput(btn).isDrag;
}


/**
 * drag horizontal length
 * @param btn {number}
 * @returns {number}
 */
function MouseDragXAmount(btn: number = 0): number {
	return In.getInput(btn).xDrag
}

/**
 * drag vertical length * 
 * @param btn {number}
 * @returns {number}
 */
function MouseDragYAmount(btn: number = 0): number {
	return In.getInput(btn).yDrag
}

/**
 * mouse x position
 * @param btn {number}
 * @returns {number}
 */
function MouseX(btn: number = 0): number {
	return In.getInput(btn).x;
}

/**
 * mouse y position
 * @param btn {number}
 * @returns {number}
 */
function MouseY(btn: number = 0): number {
	return In.getInput(btn).y;
}

/**
 * drag start x position
 * @param btn {number}
 * @returns {number}
 */
function MouseDragStartX(btn: number = 0): number {
	return In.getInput(btn).xStart;
}

/**
 * drag start y position
 * @param btn {number}
 * @returns {number}
 */
function MouseDragStartY(btn: number = 0): number {
	return In.getInput(btn).yStart;
}


