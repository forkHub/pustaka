///<reference path="./Route.ts"/>

/**
 * muouse is down status
 * @returns {boolean}
 */
function mouseDitahan(): boolean {
	return In.getDownInput() != null;
}

/**
 * mouse is dragged
 * @returns {boolean}
 */
function mouseDidrag(): boolean {
	return In.getDraggedInput() != null;
}

/**
 * drag horizontal length calculated from the drag start position
 * @returns {number} 
 */
function mouseDragX(): number {
	return In.getDraggedInput()?.xDrag
}

/**
 * drag vertical length calculated from the drag end position
 * @returns {number}
 */
function mouseDragY(): number {
	return In.getDraggedInput()?.yDrag
}

/**
 * mouse x position
 * @returns {number}
 */
function mouseX(): number {
	return In.global?.x;
}

/**
 * mouse y position
 * @returns {number}
 */
function mouseY(): number {
	return In.global?.y;
}

/**
 * drag start x position
 * @returns {number}
 */
function mouseDragAwalX(): number {
	return In.getDraggedInput()?.xStart;
}

/**
 * drag start y position
 * @returns {number}
 */
function mouseDragAwalY(): number {
	return In.getDraggedInput()?.yStart;
}

/**
 * return last button pressed for mouseevent. For mobile device this can return any number
 * @returns {number}
 */
// function MouseButton(): number {
// 	return In.lastButton;
// }

/**
 * return last mouse horizontal movement
 * @returns {number}
 */
function mouseGerakX(): number {
	return In.global.moveX;
}

/**
 * return last mouse vertical movement
 * @returns {number}
 */
function mouseGerakY(): number {
	return In.global.moveY;
}

//TODO:
// mouseSudutB