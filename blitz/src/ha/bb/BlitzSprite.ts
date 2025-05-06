///<reference path="./Route.ts"/>
///<reference path="../spr/Image.ts"/>
///<reference path="../spr/SpriteDep.ts"/>

//operation
const LoadImage = Im.LoadImage; //
const LoadAnimImage = Im.LoadAnimImage;
const ResizeImage = Basik.SprDep.ResizeImage;
const DrawImage = Im.DrawImage;
const Collide = Im.Collide;
const Tile = Im.Tile; //TODO: diganti property

const AllImageLoaded = Im.AllImageLoaded;
const PositionImageXY = Basik.SprDep.PositionImageXY;
const PositionImagePolar = Im.PositionImagePolar;
const DrawAllImage = Im.DrawAllImage;
const CopyImage = Im.CopyImage;

//depecrated
// const SpriteKontek = Basik.Image.kontek;
const Handle = Basik.SprDep.Handle;
const Rotation = Basik.SprDep.Rotasi;
const Width = Basik.SprDep.Panjang;	//depecrated
const Height = Basik.SprDep.Lebar;		//depecrated
const ImageLoaded = Basik.SprDep.Dimuat;
const ImageXPosition = Basik.SprDep.PosisiX;
const ImageYPosition = Basik.SprDep.PosisiY;
const ImageAlpha = Basik.SprDep.Alpha;
const ImageIsDragged = Basik.SprDep.StatusDrag;
const DrawImageXY = Im.DrawImageXY;


/**
 * 
 * return Distance between 2 images
 * @param s first Image
 * @param s2 second Image
 */
function Dist2Image(s: Basik.ImgObj, s2: Basik.ImgObj): number {
	return Math.hypot(s.x - s2.x, s2.y - s.y);
}
