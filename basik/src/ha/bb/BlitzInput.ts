///<reference path="./Route.ts"/>

/**
 * muouse is down status
 * @param btn {number} the button to check, for touch event this will be ignored
 * @returns {boolean}
 */
function MouseIsDown(btn: number = 0): boolean {
	return In.getByButton(btn).isDown;
}

/**
 * mouse is dragged
 * @param btn {number} the button to check, for touch event this will be ignored
 * @returns {boolean}
 */
function MouseIsDragged(btn: number = 0): boolean {
	return In.getByButton(btn).isDrag;
}

/**
 * drag horizontal length calculated from the drag start position
 * @param btn {number} the button to check, default to 0, for touch event this param is ignored
 * @returns {number} 
 */
function MouseDraggedX(btn: number = 0): number {
	return In.getByButton(btn).xDrag
}

/**
 * drag vertical length calculated from the drag end position
 * @param btn {number} the button to check, default to 0, for touch event this param is ignored
 * @returns {number}
 */
function MouseDraggedY(btn: number = 0): number {
	return In.getByButton(btn).yDrag
}

/**
 * mouse x position
 * @returns {number}
 */
function MouseX(): number {
	return In.getByButton().x;
}

/**
 * mouse y position
 * @returns {number}
 */
function MouseY(): number {
	return In.getByButton().y;
}

/**
 * drag start x position
 * @param btn {number} the button to check, for touch event this will be ignored
 * @returns {number}
 */
function MouseDragStartX(btn: number = 0): number {
	return In.getByButton(btn).xStart;
}

/**
 * drag start y position
 * @param btn {number} the button to check, for touch event this will be ignored
 * @returns {number}
 */
function MouseDragStartY(btn: number = 0): number {
	return In.getByButton(btn).yStart;
}

/**
 * return last button pressed for mouseevent. For mobile device this can return any number
 * @returns {number}
 */
function MouseButton(): number {
	return In.global.button;
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
 * @returns 
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
