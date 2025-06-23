"use strict";
///<reference path="./Route.ts"/>
/**
 * calculate distance between two angle
 * @param angleS {number} the first angle
 * @param angleT {number} the second angle
 * @param min {boolean} take the minimum or maximum distance
 * @returns {number}
 */
function degDist(angleS = 0, angleT, min = true) {
    return Basik.Transform.degDist(angleS, angleT, min);
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
function Clamp(n, min, max) {
    if (n < min)
        return min;
    if (n > max)
        return max;
    return n;
}
