///<reference path="./Route.ts"/>
///<reference path="../spr/Sprite.ts"/>

//TODO: dibuat lebih modern, setter dan getter ambil dari object

const LoadImage = ha.be.Spr.Muat; //
const LoadAnimImage = ha.be.Spr.MuatAnimasi;
const ResizeImage = ha.be.Spr.Ukuran;
const DrawImage = ha.be.Spr.Gambar;
const DrawImageXY = ha.be.Spr.GambarXY;
const Handle = ha.be.Spr.Handle;
const Rotation = ha.be.Spr.Rotasi;
const Collide = ha.be.Spr.Tabrakan;
const CollideXY = ha.be.Spr.TabrakanXY;
const SpriteKontek = ha.be.Spr.kontek;

const Width = ha.be.Spr.Panjang;
const Height = ha.be.Spr.Lebar;
const Tile = ha.be.Spr.Ubin;

const ImageLoaded = ha.be.Spr.Dimuat;
const AllImageLoaded = ha.be.Spr.StatusMuat;
const PositionImageXY = ha.be.Spr.Posisi;
const PositionImagePolar = ha.be.Spr.posisiPolar;
const DrawAllImage = ha.be.Spr.GambarSemua;
const ImageXPosition = ha.be.Spr.PosisiX;
const ImageYPosition = ha.be.Spr.PosisiY;
const ImageAlpha = ha.be.Spr.Alpha;
const ImageIsDragged = ha.be.Spr.StatusDrag;
const CopyImage = ha.be.Spr.Copy;
const ImageBound = ha.be.Spr.Bound;

/**
 * return Distance between 2 images
 * @param s first Image
 * @param s2 second Image
 */
function Dist2Image(s: ha.be.SprObj, s2: ha.be.SprObj): number {
	return Math.hypot(s.x - s2.x, s2.y - s.y);
}
