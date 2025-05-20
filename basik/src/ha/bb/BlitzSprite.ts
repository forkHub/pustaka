///<reference path="./Route.ts"/>
///<reference path="./BlitzGraphics.ts"/>

//operation
const LoadImage = Ip.Muat; //
const LoadAnimImage = Ip.MuatAnimasi;
const DrawImage = Ip.Draw;
const ImageCollide = Ip.tabrakan;
const ImageCollidePoint = Ip.dotInsideImage;
const CreateImage = Ip.CreateImage;

/**
 * 
 */
function DrawAllImage() {
    Ip.GambarSemua();
}

const ImageBuffer = (img: Basik.ImgObj): CanvasRenderingContext2D => {
    return img.ctx;
}

const AllImageLoaded = Ip.AllImageLoaded;

/**
 * 
 * @param s {ISprObj} sprite 
 * @param onload {() => void} optional, call back after image is copied
 * @returns 
 */
function CopyImage(s: Basik.ImgObj, onload?: () => void): Basik.ImgObj {
    if (!onload) {
        onload = () => { };
    }

    if (s.isAnim) {
        console.debug('copy sprite anim');
        console.debug(s);
        return Ip.muatAnimasiAsyncKanvas(s.url, s.frameW, s.frameH, s.canvas, s.tipeDrag);
    }
    else {
        return Ip.muatAsyncBerbagiKanvas(s.url, s.canvas, s.tipeDrag, onload)
    }
}
