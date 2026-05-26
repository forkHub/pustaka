function rgbToXyz(r:number, g:number, b:number) {
  // normalize to 0–1
  r /= 255;
  g /= 255;
  b /= 255;

  // gamma correction
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // convert
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  return [x, y, z];
}

function xyzToLab(x:number, y:number, z:number) {
  // D65 reference white
  const refX = 0.95047;
  const refY = 1.00000;
  const refZ = 1.08883;

  x /= refX;
  y /= refY;
  z /= refZ;

  const f = (t:any) =>
    t > 0.008856 ? Math.pow(t, 1 / 3) : (7.787 * t) + (16 / 116);

  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  const L = (116 * fy) - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return [L, a, b];
}

function rgbToLab(r:number, g:number, b:number) {
    const [x, y, z] = rgbToXyz(r, g, b);
    return xyzToLab(x!, y!, z!);
}