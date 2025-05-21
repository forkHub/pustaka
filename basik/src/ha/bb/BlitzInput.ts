///<reference path="./Route.ts"/>

/**
 * Mouse Function
 */

/**
 * mengecek apakah pointer sedang ditekan
 * @returns (boolean) 
 */
function MouseIsDown(): boolean {
    return In.obj.isDown;
}

/**
 * mengecheck apakah pointer sedang di drag
 * @returns (boolean)
 */
function MouseIsDragged(): boolean {
    return In.obj.isDrag;
}


/**
 * berapa jauh pointer digeser sejajar sumbu x
 * @returns (number)
 */
function MouseDragXAmount(): number {
    return In.obj.xDrag
}

/**
 * berapa jauh pointer di drag sejajar sumbu y
 * @returns (number)
 */
function MouseDragYAmount(): number {
    return In.obj.yDrag
}

/**
 * posisi x pointer
 * @returns (number)
 */
function MouseX(): number {
    return In.obj.x;
}

/**
 * posisi y pointer
 * @returns 
 */
function MouseY(): number {
    return In.obj.y;
}


/**
 * posisi x awal drag
 * @returns (number)
 * 
 * */
function MouseDragStartX(): number {
    return In.obj.xStart;
}

/**
 * posisi y awal drag
 * @returns (number)
 */
function MouseDragStartY(): number {
    return In.obj.yStart;
}


