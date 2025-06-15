"use strict";
///<reference path="./Route.ts"/>
/**
 * muouse is down status
 * @returns {boolean}
 */
function MouseIsDown() {
    return In.obj.isDown;
}
/**
 * mouse is dragged
 * @returns {boolean}
 */
function MouseIsDragged() {
    return In.obj.isDrag;
}
/**
 * drag horizontal length
 * @returns {number}
 */
function MouseDragXAmount() {
    return In.obj.xDrag;
}
/**
 * drag vertical length
 * @returns {number}
 */
function MouseDragYAmount() {
    return In.obj.yDrag;
}
/**
 * mouse x position
 * @returns {number}
 */
function MouseX() {
    return In.obj.x;
}
/**
 * mouse y position
 * @returns {number}
 */
function MouseY() {
    return In.obj.y;
}
/**
 * drag start x position
 * @returns {number}
 *
 * */
function MouseDragStartX() {
    return In.obj.xStart;
}
/**
 * drag start y position
 * @returns {number}
 */
function MouseDragStartY() {
    return In.obj.yStart;
}
