///<reference path="./Route.ts"/>
///<reference path="./BlitzGraphics.ts"/>

/**
 * Load an image from url 
 * @param url {string} the url of image to load
 * @returns {Basik.Image}
 */
function muatGambar(url: string): Basik.Image {
	return Ip.Muat(url);
}

function muatAnimasi(url: string, fw: number = 32, fh: number = 32) {
	return Ip.MuatAnimasi(url, fw, fh);
}

function stempel(img: Basik.Image | string, x: number, y: number) {
	if (typeof img == "string") {
		let img2 = Ip.getByName(img, true);
		posisi(img2, x, y);
		Ip.Draw(img2);
	}
	else {
		posisi(img, x, y);
		Ip.Draw(img);
	}

	function posisi(img: Basik.Image, x: number, y: number) {
		if (x != undefined) {
			img.x = x;
		}

		if (y != undefined) {
			img.y = y;
		}
	}
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

function posisiGambar(img: Basik.Image, x = 0, y = 0) {
	img.x = x;
	img.y = y;
}

function ukuranGambar(img: Basik.Image, p = 32, l = 32) {
	img.panjang = p;
	img.lebar = l;
}

function pusatGambar(img: Basik.Image, x = 0, y = 0) {
	img.pusatX = x;
	img.pusatY = y;
}
