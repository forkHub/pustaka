///<reference path="./Route.ts"/>
///<reference path="./BlitzGraphics.ts"/>

/**
 * Load an image from url 
 * @param url {string} the url of image to load
 * @returns {Basik.Image}
 */
function muatGambar(url: string): Basik.Image {
	return Ip.Muat("asset/" + url);
}

function stempel(img: Basik.Image) {
	Ip.Draw(img);
}

/**
 * Check if two images collide. Use box for collision detection. Also Take account the rotation
 * 
 * @param img1 {Basik.Image} the first image
 * @param img2 {Basik.Image} the second image
 * @returns {boolean}
 */
function gambarTabrakan(img1: Basik.Image, img2: Basik.Image): boolean {
	return Ip.tabrakan(img1, img1.x, img1.y, img2, img2.x, img2.y);
}

/**
 * Check if an image collides a point
 * @param img {Basik.Image}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function poinDidalamGambar(img: Basik.Image, x: number, y: number): boolean {
	return Ip.dotInsideImage(img, img.x, img.y, x, y);
}

/**
 * Create a blank image
 * @param width {number} width
 * @param height {number} height
 * @returns {Basik.Image}
 */
function buatGambar(width: number, height: number): Basik.Image {
	return Ip.CreateImage(width, height);
}

/**
 * Check if all images have been loaded
 * @returns {boolean} 
 */
function semuaGambarSelesaiDimuat(): boolean {
	return Ip.AllImageLoaded();
}
//TODO: event

/**
 * 
 * @param img 
 */
function hapusGAmbar(img: Basik.Image): void {
	Ip.free(img);
}

//TODO: refactor to not return Image
// function CopyFromCanvas(img: Basik.Image, x: number, y: number): void {
// 	let ctx = img.canvas.getContext('2d');
// 	ctx.clearRect(0, 0, img.canvas.width, img.canvas.height);
// 	ctx.drawImage(Kanvas(), -x, -y);
// }
