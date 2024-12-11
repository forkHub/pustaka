///<reference path="./Route.ts"/>
///<reference path="../spr/Image.ts"/>
///<reference path="../spr/SpriteDep.ts"/>

//operation
const LoadImage = Basik.Image.Load; //
const LoadAnimImage = Basik.Image.LoadAnim;
const ResizeImage = Basik.SprDep.Ukuran;
const DrawImage = Basik.Image.Draw;
const DrawImageXY = Basik.Image.DrawXY;
const Collide = Basik.Image.Collide;
// const CollideXY = Basik.Image.Collide;
const Tile = Basik.Image.DrawTile; //TODO: diganti property

const AllImageLoaded = Basik.Image.AllImageLoaded;
const PositionImageXY = Basik.SprDep.PositionImage;
const PositionImagePolar = Basik.Image.PositionPolar;
const DrawAllImage = Basik.Image.DrawAll;
const CopyImage = Basik.Image.Copy;

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
// const ImageBound = Basik.SprDep.Bound;

/**
 * @memberof Image
 * 
 * return Distance between 2 images
 * @param s first Image
 * @param s2 second Image
 */
function Dist2Image(s: Basik.ImageObj, s2: Basik.ImageObj): number {
	return Math.hypot(s.x - s2.x, s2.y - s.y);
}
