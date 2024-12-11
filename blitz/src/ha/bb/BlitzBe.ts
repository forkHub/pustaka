///<reference path="./Route.ts"/>
///<reference path="../spr/ImageImpl.ts"/>
///<reference path="../spr/Image.ts"/>

const Graphics = Basik.Graphic.Start;
/**
 * Clear Screen and optionally use color
 * @param r number = 0 - 255 (optional) the red color
 * @param g 
 * @param b 
 * @param t 
 */
function Cls(r?: number, g?: number, b?: number, t?: number) {
	Basik.Graphic.Cls(r, g, b, t);
}

// const Color = Basik.Graphic.Warna;
const Stroke = Basik.Graphic.StrokeColor;

// /**
//  * Mengembalikan warna merah dari perintah AmbilPixel terakhir
//  * @returns (number) warna merah
//  */
// };
const Red = Basik.Graphic.Merah;
const Green = Basik.Graphic.Hijau;
const Blue = Basik.Graphic.Biru;
const Alpha = Basik.Graphic.Transparan;

const GetPixel = Basik.Image.GetPixel;
const SetPixel = Basik.Image.SetPiksel;

// const Kontek = Basik.Graphic.Kontek;
// const Kanvas = Basik.Graphic.Kanvas;

const Line = Basik.Graphic.Garis;
const Rect = Basik.Graphic.Kotak;
const Oval = Basik.Graphic.Oval;


const CreateDict = Dict.create;
// const DictGetValue = Dict.GetValue;
// const DictAddAttr = Dict.AddAttr;
// const DictGetKeyList = Dict.GetKeyList;
// const DictGetValueList = Dict.GetValueList;   
