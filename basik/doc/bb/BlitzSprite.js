"use strict";
///<reference path="./Route.ts"/>
///<reference path="./BlitzGraphics.ts"/>
/**
 * Load an image from url
 * @param url {string} the url of image to load
 * @returns {Basik.Image}
 */
function LoadImage(url) {
    return Ip.Muat(url);
}
/**
 * Load a sprite-sheet as an animated image
 * @param url {string} image url
 * @param frameWidth {number} preferred frame width
 * @param frameHeight {number} preferred frame height
 * @returns {Basik.Image}
 */
function LoadAnimImage(url, frameWidth, frameHeight) {
    return Ip.MuatAnimasi(url, frameWidth, frameHeight);
}
/**
 * Draw an image
 * @param img {Basik.Image} Image to draw
 */
function DrawImage(img) {
    Ip.Draw(img);
}
/**
 * Check if two images collide. Use box for collision detection. Also Take account the rotation
 *
 * @param img1 {Basik.Image} the first image
 * @param img2 {Basik.Image} the second image
 * @returns {boolean}
 */
function ImageCollide(img1, img2) {
    return Ip.tabrakan(img1, img1.x, img1.y, img2, img2.x, img2.y);
}
/**
 * Check if an image collides a point
 * @param img {Basik.Image}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function ImageCollidePoint(img, x, y) {
    return Ip.dotInsideImage(img, img.x, img.y, x, y);
}
/**
 * Create a blank image
 * @param width {number} width
 * @param height {number} height
 * @returns {Basik.Image}
 */
function CreateImage(width, height) {
    return Ip.CreateImage(width, height);
}
/**
 * Check if all images have been loaded
 * @returns {boolean}
 */
function AllImageLoaded() {
    return Ip.AllImageLoaded();
}
/**
 *
 * @param img
 */
function FreeImage(img) {
    Ip.free(img);
}
