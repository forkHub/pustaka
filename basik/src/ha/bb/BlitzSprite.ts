///<reference path="./Route.ts"/>
///<reference path="./BlitzGraphics.ts"/>

/**
 * Load an image from url 
 * @param url {string} the url of image to load
 * @returns {Basik.Image}
 */
function LoadImage(url: string): Basik.Image {
	return Ip.Muat(url);
}

/**
 * Load a sprite-sheet as an animated image
 * @param url {string} image url
 * @param frameWidth {number} preferred frame width
 * @param frameHeight {number} preferred frame height
 * @returns {Basik.Image}
 */
function LoadAnimImage(url: string, frameWidth: number, frameHeight: number): Basik.Image {
	return Ip.MuatAnimasi(url, frameWidth, frameHeight);
}

/**
 * Draw an image
 * @param img {Basik.Image} Image to draw
 */
function DrawImage(img: Basik.Image) {
	Ip.Draw(img);
}

/**
 * Check if two images collide. Use box for collision detection. Also Take account the rotation
 * 
 * @param img1 {Basik.Image} the first image
 * @param img2 {Basik.Image} the second image
 * @returns {boolean}
 */
function ImageCollide(img1: Basik.Image, img2: Basik.Image): boolean {
	return Ip.tabrakan(img1, img1.x, img1.y, img2, img2.x, img2.y);
}

/**
 * Check if an image collides a point
 * @param img {Basik.Image}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function ImageCollidePoint(img: Basik.Image, x: number, y: number): boolean {
	return Ip.dotInsideImage(img, img.x, img.y, x, y);
}

/**
 * Create a blank image
 * @param width {number} width
 * @param height {number} height
 * @returns {Basik.Image}
 */
function CreateImage(width: number, height: number): Basik.Image {
	return Ip.CreateImage(width, height);
}

/**
 * return the canvas of an image
 * @param img {Basik.Image} the image
 * @returns {HTMLCanvasElement}
 */
const ImageCanvas = (img: Basik.Image): HTMLCanvasElement => {
	return img.canvas;
}

/**
 * Check if all images have been loaded
 * @returns {boolean} 
 */
function AllImageLoaded(): boolean {
	return Ip.AllImageLoaded();
}

/**
 * 
 * @param img 
 */
function FreeImage(img: Basik.Image): void {
	Ip.free(img);
}
