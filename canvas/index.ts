const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const ctx = canvas.getContext("2d")!;

type TPixel = {
    x:number,
    y:number,
    r:number,
    g:number,
    b:number,
    a:number
}

let lastPixel:TPixel = {
    x:0,
    y:0,
    r:0,
    g:0,
    b:0,
    a:0
}

fileInput.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    };

    img.src = URL.createObjectURL(file);
});

function drawFilledRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    r: number,
    g: number,
    b: number,
    a: number = 255
): void {
    // Convert alpha from 0–255 → 0–1
    const alpha = a / 255;

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fillRect(x, y, width, height);
}

function edit(canvas:HTMLCanvasElement) {
    const canvas2 = document.createElement('canvas');
    document.appendChild(canvas2);

    canvas2.width = canvas.width;
    canvas2.height = canvas.height;

    for (let i = 0; i < canvas.width; i += 2) {
        for (let j = 0; j < canvas.height; j += 2) {
            let p = getPixelEx(i, j, canvas);
            drawFilledRect(canvas2.getContext('2d')!, i, j, 2, 2, p.r, p.g, p.b);
        }
    }
}

function insideCanvas(x:number, y:number, canvas:HTMLCanvasElement):boolean {
    if (x < 0) return false;
    if (y < 0) return false;
    if (x >= canvas.width) return false;
    if (y >= canvas.height) return false;
    return true;
}

function getLuminance(r:number, g:number, b:number) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isMoreBlack(pixelA:TPixel, pixelB:TPixel) {
    return getLuminance(pixelA.r, pixelA.g, pixelA.b) < getLuminance(pixelB.r, pixelB.g, pixelB.b);
}

function findMostBlack(pixels:TPixel[]) {
    return pixels.reduce((darkest, current) => {
        return getLuminance(current.a, current.b, current.g) < getLuminance(darkest.a, current.b, current.b)
        ? current : darkest;
    })
}

function getPixelEx(x:number, y:number, canvas:HTMLCanvasElement):TPixel {
    let res:TPixel[] = [];

    res.push(getPixel(x, y, canvas));
    res.push(getPixel(x + 1, y, canvas));
    res.push(getPixel(x + 1, y + 1, canvas));
    res.push(getPixel(x, y + 1, canvas));

    return findMostBlack(res);
}

function getPixel(x:number, y:number, canvas:HTMLCanvasElement):TPixel {
    if (insideCanvas(x, y, canvas)) {
        const data: Uint8ClampedArray = ctx.getImageData(x, y, 1, 1).data;

        const pixel:TPixel = {
            x, 
            y,
            r: data[0]!,
            g: data[1]!,
            b: data[2]!,
            a: data[3]!
        }; 

        lastPixel = pixel;
    }
    
    return lastPixel;
}

function averageRGBA(pixels:TPixel[]) {
    const total = pixels.length;

    const sum = pixels.reduce(
        (acc, p) => {
            acc.r += p.r;
            acc.g += p.g;
            acc.b += p.b;
            acc.a += p.a;
            return acc;
        },
        { r: 0, g: 0, b: 0, a: 0 }
    );

    return {
        r: Math.round(sum.r / total),
        g: Math.round(sum.g / total),
        b: Math.round(sum.b / total),
        a: Math.round(sum.a / total)
    };
}
