///<reference path="./Route.ts"/>
///<reference path="../spr/Image.ts"/>
///<reference path="./BlitzGraphics.ts"/>

//operation
const LoadImage = Im.LoadImage; //
const LoadAnimImage = Im.LoadAnimImage;
const DrawImage = Im.DrawImage;
const Collide = Im.Collide;
const DrawAllImage = Im.DrawAllImage;
const ImageBuffer = (img: Basik.ImgObj): CanvasRenderingContext2D => {
    return img.ctx;
}
const Tile = Im.Tile; //TODO: diganti property
const AllImageLoaded = Im.AllImageLoaded;
const CopyImage = Im.CopyImage;
const PickImage = (x: number, y: number): Basik.ImgObj => {
    //TODO:
    x; y;
    return null;
}