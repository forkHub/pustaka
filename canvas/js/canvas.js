"use strict";
function drawFilledRect(ctx, x, y, width, height, r, g, b, a = 255) {
    // Convert alpha from 0–255 → 0–1
    const alpha = a / 255;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fillRect(x, y, width, height);
}
function insideCanvas(x, y, canvas) {
    if (x < 0)
        return false;
    if (y < 0)
        return false;
    if (x >= canvas.width)
        return false;
    if (y >= canvas.height)
        return false;
    return true;
}
function getPixelEx(x, y, canvas) {
    let res = [];
    res.push(getPixel(x, y, canvas));
    res.push(getPixel(x + 1, y, canvas));
    res.push(getPixel(x + 1, y + 1, canvas));
    res.push(getPixel(x, y + 1, canvas));
    return res;
}
function getPixel(x, y, canvas) {
    if (insideCanvas(x, y, canvas)) {
        let ctx = canvas.getContext('2d');
        const data = ctx.getImageData(x, y, 1, 1).data;
        const pixel = {
            x,
            y,
            rgb: {
                r: data[0],
                g: data[1],
                b: data[2],
                a: data[3]
            }
        };
        lastPixel = pixel;
    }
    // console.groupEnd();
    return lastPixel;
}
