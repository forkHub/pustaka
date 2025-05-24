///<reference path="./Route.ts"/>

/**
 * muouse is down status
 * @returns {boolean}
 */
function MouseIsDown(): boolean {
	return In.obj.isDown;
}

/**
 * mouse is dragged
 * @returns {boolean}
 */
function MouseIsDragged(): boolean {
	return In.obj.isDrag;
}


/**
 * drag horizontal length
 * @returns {number}
 */
function MouseDragXAmount(): number {
	return In.obj.xDrag
}

/**
 * drag vertical length
 * @returns {number}
 */
function MouseDragYAmount(): number {
	return In.obj.yDrag
}

/**
 * mouse x position
 * @returns {number}
 */
function MouseX(): number {
	return In.obj.x;
}

/**
 * mouse y position
 * @returns {number}
 */
function MouseY(): number {
	return In.obj.y;
}


/**
 * drag start x position
 * @returns {number}
 * 
 * */
function MouseDragStartX(): number {
	return In.obj.xStart;
}

/**
 * drag start y position
 * @returns {number}
 */
function MouseDragStartY(): number {
	return In.obj.yStart;
}


