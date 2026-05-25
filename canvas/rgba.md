Here’s a simple JavaScript function to extract the RGBA values of a pixel from an HTML `<canvas>`:

### ✅ Function to get RGBA from canvas

```javascript
function getPixelRGBA(canvas, x, y) {
  const ctx = canvas.getContext('2d');

  // Get image data for a single pixel
  const imageData = ctx.getImageData(x, y, 1, 1);

  const data = imageData.data; // [R, G, B, A]

  return {
    r: data[0], // Red (0–255)
    g: data[1], // Green (0–255)
    b: data[2], // Blue (0–255)
    a: data[3]  // Alpha (0–255)
  };
}
```

***

### 📌 Example usage

```javascript
const canvas = document.getElementById('myCanvas');

// Get RGBA at position (10, 20)
const pixel = getPixelRGBA(canvas, 10, 20);

console.log(pixel);
// Example output: { r: 255, g: 0, b: 0, a: 255 }
```

***

### ⚡ Notes

* `getImageData(x, y, 1, 1)` retrieves exactly one pixel.
* RGBA values are in the range **0–255**.
* Alpha (`a`) represents transparency:
  * `0` = fully transparent
  * `255` = fully opaque
* Make sure the canvas is not **tainted** (e.g., drawing cross-origin images without CORS), or `getImageData` will throw a security error.

***

If you want, I can also show how to extract multiple pixels efficiently or convert RGBA to hex/normalized values.
