"use strict";
///<reference path="./Route.ts"/>
///<reference path="./BlitzGraphics.ts"/>
/**
 * Load an image from url
 * @param url {string} the url of image to load
 * @returns {Basik.ImgObj}
 */
function LoadImage(url) {
    return Ip.Muat(url);
}
/**
 * Load a sprite-sheet as an animated image
 * @param url {string} image url
 * @param frameWidth {number} preferred frame width
 * @param frameHeight {number} preferred frame height
 * @returns {Basik.ImgObj}
 */
function LoadAnimImage(url, frameWidth, frameHeight) {
    return Ip.MuatAnimasi(url, frameWidth, frameHeight);
}
/**
 * Draw an image
 * @param img {Basik.ImgObj} Image to draw
 */
function DrawImage(img) {
    Ip.Draw(img);
}
/**
 * Check if two images collide. Use box for collision detection. Also Take account the rotation
 *
 * @param img1 {Basik.ImgObj} the first image
 * @param img2 {Basik.ImgObj} the second image
 * @returns {boolean}
 */
function ImageCollide(img1, img2) {
    return Ip.tabrakan(img1, img1.x, img1.y, img2, img2.x, img2.y);
}
/**
 * Check if an image collides a point
 * @param img {Basik.ImgObj}
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
 * @returns {Basik.ImgObj}
 */
function CreateImage(width, height) {
    return Ip.CreateImage(width, height);
}
/**
 * return the canvas of an image
 * @param img {Basik.ImgObj} the image
 * @returns {HTMLCanvasElement}
 */
const ImageCanvas = (img) => {
    return img.canvas;
};
/**
 * Check if all images have been loaded
 * @returns {boolean}
 */
function AllImageLoaded() {
    return Ip.AllImageLoaded();
}
/**
 * Copy image
 * @param img {Basik.ImgObj} the image to copy
 * @returns {Basik.ImgObj}
 */
function CopyImage(img) {
    if (!onload) {
        onload = () => { };
    }
    if (img.isAnim) {
        console.debug('copy sprite anim');
        console.debug(img);
        return Ip.muatAnimasiAsyncKanvas(img.url, img.frameW, img.frameH, img.canvas, img.tipeDrag);
    }
    else {
        return Ip.muatAsyncBerbagiKanvas(img.url, img.canvas, img.tipeDrag);
    }
}
