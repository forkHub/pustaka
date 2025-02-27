///<reference path="./Route.ts"/>

const Graphics = ha.be.Be.Grafis;

/**
 * Clear Screen and optionally use color
 * @param r number = 0 - 255 (optional) the red color
 * @param g 
 * @param b 
 * @param t 
 */
function Cls(r?: number, g?: number, b?: number, t?: number) {
    ha.be.Be.Bersih(r, g, b, t);
}

const Color = ha.be.Be.Warna;
const Stroke = ha.be.Be.StrokeColor;

// /**
//  * Mengembalikan warna merah dari perintah AmbilPixel terakhir
//  * @returns (number) warna merah
//  */
// };

const Red = ha.be.Be.Merah;
const Green = ha.be.Be.Hijau;
const Blue = ha.be.Be.Biru;
const Alpha = ha.be.Be.Transparan;

const GetPixel = ha.be.Img.AmbilPiksel;
const SetPixel = ha.be.Img.SetPiksel;

// const Kontek = ha.be.Be.Kontek;
// const Kanvas = ha.be.Be.Kanvas;

const Line = ha.be.Be.Garis;
const Rect = ha.be.Be.Kotak;
const Oval = ha.be.Be.Oval;


const CreateDict = ha.be.Dict.Create;
const DictGetValue = ha.be.Dict.GetValue;
const DictAddAttr = ha.be.Dict.AddAttr;
const DictGetKeyList = ha.be.Dict.GetKeyList;
const DictGetValueList = ha.be.Dict.GetValueList;   
