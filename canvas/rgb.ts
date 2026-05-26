function getLuminance(rgb:TRgb) {
    return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
}

function findMostBlack(pixels:TPixel[]) {
    return pixels.reduce((darkest, current) => {
        return getLuminance(current.rgb) < getLuminance(darkest.rgb)
        ? current : darkest;
    })
}

function findMostWhite(pixels:TPixel[]) {
    return pixels.reduce((darkest, current) => {
        return getLuminance(current.rgb) > getLuminance(darkest.rgb)
        ? current : darkest;
    })
}

function averageRGBA(pixels:TPixel[]):TPixel {
    const total = pixels.length;

    const sum = pixels.reduce(
        (acc, p) => {
            acc.r += p.rgb.r;
            acc.g += p.rgb.g;
            acc.b += p.rgb.b;
            acc.a += p.rgb.a;
            return acc;
        },
        { r: 0, g: 0, b: 0, a: 0 }
    );

    return {
        x: 0,
        y: 0,
        rgb: {
            r: Math.round(sum.r / total),
            g: Math.round(sum.g / total),
            b: Math.round(sum.b / total),
            a: Math.round(sum.a / total)
        }
    };
}

function weightedRgbDistance(c1: number[], c2: number[]): number {
  return Math.sqrt(
    2 * Math.pow(c1[0]! - c2[0]!, 2) +
    4 * Math.pow(c1[1]! - c2[1]!, 2) +
    3 * Math.pow(c1[2]! - c2[2]!, 2)
  );
}