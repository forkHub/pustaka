"use strict";
///<reference path="./Route.ts"/>
const G = Basik.G;
const T = Basik.Tk;
const Ip = Basik.Ip;
const In = Basik.In;
/**
 * return the main canvas. Main canvas is the one defined when application starts
 * @returns {HTMLCanvasElement} the main canvas object
 */
function MainCanvas() {
    return G.MainCanvas();
}
/**
 * Set the active canvas.
 * @param c {HTMLCanvasElement} the new active canvas
 */
function SetCanvas(c) {
    G.SetCanvas(c);
}
/**
 * Clear part of the canvas
 * @param x {number} the start x position
 * @param y {number} the start y position
 * @param w {number} the width of the area
 * @param h {number} the height of the area
 */
function ClearArea(x, y, w, h) {
    G.Canvas().getContext('2d').clearRect(x, y, w, h);
}
/**
 * Start the application. You have to call this method before other method.
 * @param w {number} prefered width of the canvas.
 * @param h {number} prefered height of the canvas.
 * @param canvas {HTMLCanvasElement} (optional) the canvas element.<br/>
 *   If canvas is not available, a new one will be created and the size will follow the preferred size
 * @param fullScreen {boolean} (default to true) Use full screen
 * When in full screen mode, the canvas will automatically fill the screen and maintain the aspect ratio.
 *
 */
function Graphics(w = 320, h = 240, canvas = null, fullScreen = true) {
    G.Graphics(w, h, canvas, fullScreen);
}
/**
 * Clear the canvas
 */
function Cls() {
    G.Cls();
}
/**
 * Return the green color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the green color (0 - 255)
 */
function Green() {
    return G.green;
}
/**
 * Return the red color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the red color (0 - 255)
 */
function Red() {
    return G.red;
}
/**
 * Return the blue color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the blue color (0 - 255)
 */
function Blue() {
    return G.blue;
}
/**
 * Return the alpha color component of the last color command. eg: GetPixel, FillColor, StrokeColor
 * @returns {number} the alpha color (0 - 100)
 */
function Alpha() {
    return Math.floor(G.alpha * 100);
}
/**
 * Get color information at the specific position.<br/>
 * You can read the red, green, blue, alpha component of the color by calling Red(), Green(), Blue(), Alpha() function respectively
 * @param x {number} the x position
 * @param y {number} the y position
 */
function GetPixel(x = 0, y = 0) {
    Ip.AmbilPiksel(x, y);
}
/**
 * Set pixel using the color set by FillColor()
 * @param x {number} - the x position
 * @param y {number} - the y position
 */
function SetPixel(x = 0, y = 0) {
    Ip.SetPiksel(x, y);
}
/**
 * Set fill-color for the next graphics command
 * @param r {number} - the red color (0 - 255)
 * @param g {number} - the green color (0 - 255)
 * @param b {number} - the blue color (0 - 255)
 * @param a {number} - the alpha color (0 - 100)
 */
function FillColor(r = 0, g = 0, b = 0, a = 100) {
    G.Canvas().getContext('2d').fillStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
    G.red = r;
    G.green = g;
    G.blue = b;
    G.alpha = a;
}
/**
 * Set fill color to none
 */
function NoColor() {
    G.Canvas().getContext('2d').fillStyle = "none";
}
/**
 * Set stroke color
 * @param r {number} - the red color (0 - 255)
 * @param g {number} - the green color (0 - 255)
 * @param b {number} - the blue color (0 - 255)
 * @param a {number} - the alpha color (0 - 100)
 */
function StrokeColor(r = 0, g = 0, b = 0, a = 1) {
    G.Canvas().getContext('2d').strokeStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
    G.red = r;
    G.green = g;
    G.blue = b;
    G.alpha = a;
}
/**
 * Set stroke to none
 */
function NoStroke() {
    G.Canvas().getContext('2d').strokeStyle = 'none';
}
/**
 * Add Listener for certain event
 * @param type {string} the event type, available are: mousedown, mouseup, mousemove, mousedrag, keydown, keyup
 * @param f {callback}
 */
function AddListener(type, f) {
    Basik.Event.addListener(type, f);
}
/**
 * return the last keyboard event key
 * @returns {string}
 */
function KeyboardKey() {
    return Basik.Keyboard.key;
}
/**
 * return the last mouse event button
 * @returns {number}
 */
function MouseButton() {
    return Basik.Input.obj.key;
}
