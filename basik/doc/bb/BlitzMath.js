"use strict";
///<reference path="./Route.ts"/>
const DistMin = Basik.Transform.degDist;
/**
 * Calculate distance between two points
 * @param x1 x position of the first point
 * @param y1 y position of the first point
 * @param x2 x position of the second point
 * @param y2 y position of the second point
 * @returns {number}
 */
function Distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
/**
 * Calculae the angle of a point relative to the horizontal line
 * @param x {number} the x position
 * @param y {number} the y position
 * @returns {number} the angle in degrees
 */
function Angle(x, y) {
    return Basik.Tf.sudut(x, y);
}
/**
 * Calculate the Sin of an angle
 * @param n {number} the angle in degrees
 * @returns {number}
 */
function Sin(n) { return Math.sin(n * Math.PI / 180); }
/**
 * Calculate the Cos of an angle
 * @param n {number} the angle in degrees
 * @returns {number}
 */
function Cos(n) { return Math.cos(n * Math.PI / 180); }
/**
 * Calculate the Tan of an angle
 * @param n {number} the angle in degrees
 * @returns {number}
 */
function Tan(n) { return Math.tan(n * Math.PI / 180); }
/**
 * Restrict a value within a specified range
 * @param n {number} the number to clamp
 * @param min {number} preferred minimum vaue
 * @param max {number} preferred maximum value
 * @returns {number}
 */
function Clamp(n, min, max) {
    if (n < min)
        return min;
    if (n > max)
        return max;
    return n;
}
