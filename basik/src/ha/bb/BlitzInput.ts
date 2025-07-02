///<reference path="./Route.ts"/>

/**
 * muouse is down status
 * @returns {boolean}
 */
function MouseIsDown(): boolean {
	return In.getDownInput() != null;
}

/**
 * mouse is dragged
 * @returns {boolean}
 */
function MouseIsDragged(): boolean {
	return In.getDraggedInput() != null;
}

/**
 * drag horizontal length calculated from the drag start position
 * @returns {number} 
 */
function MouseDraggedX(): number {
	return In.getDraggedInput()?.xDrag
}

/**
 * drag vertical length calculated from the drag end position
 * @returns {number}
 */
function MouseDraggedY(): number {
	return In.getDraggedInput()?.yDrag
}

/**
 * mouse x position
 * @returns {number}
 */
function MouseX(): number {
	return In.global?.x;
}

/**
 * mouse y position
 * @returns {number}
 */
function MouseY(): number {
	return In.global?.y;
}

/**
 * drag start x position
 * @returns {number}
 */
function MouseDragStartX(): number {
	return In.getDraggedInput()?.xStart;
}

/**
 * drag start y position
 * @returns {number}
 */
function MouseDragStartY(): number {
	return In.getDraggedInput()?.yStart;
}

/**
 * return last button pressed for mouseevent. For mobile device this can return any number
 * @returns {number}
 */
function MouseButton(): number {
	return In.lastButton;
}

/**
 * return last mouse horizontal movement
 * @returns {number}
 */
function MouseMoveX(): number {
	return In.global.moveX;
}

/**
 * return last mouse vertical movement
 * @returns {number}
 */
function MouseMoveY(): number {
	return In.global.moveY;
}

//TODO:
// const InputHit = Basik.Input.InputHit;

// // //extended
// const FlushInput = Basik.Input.FlushInput;
// const InputTapCount = Basik.Input.InputTapCount;
// const InputDragStartCount = Basik.Input.InputDragStartCount;
// const InputDragEndCount = Basik.Input.InputDragEndCount;
