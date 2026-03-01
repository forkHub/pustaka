Oke, mari kita lengkapi round-trip penuh: dari **JSON → string `d` SVG**. Dengan begitu kamu bisa parse string ke JSON, lalu generate ulang string dari JSON.

---

## Fungsi JSON → String `d` SVG

```ts
type PathCommand =
  | { type: "M"; x: number; y: number }
  | { type: "L"; x: number; y: number }
  | {
      type: "C";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      x: number;
      y: number;
    }
  | { type: "Q"; cx: number; cy: number; x: number; y: number }
  | { type: "Z" };

function jsonToSVGPath(commands: PathCommand[]): string {
  return commands
    .map((cmd) => {
      switch (cmd.type) {
        case "M":
          return `M${cmd.x} ${cmd.y}`;
        case "L":
          return `L${cmd.x} ${cmd.y}`;
        case "C":
          return `C${cmd.x1} ${cmd.y1}, ${cmd.x2} ${cmd.y2}, ${cmd.x} ${cmd.y}`;
        case "Q":
          return `Q${cmd.cx} ${cmd.cy}, ${cmd.x} ${cmd.y}`;
        case "Z":
          return "Z";
        default:
          return "";
      }
    })
    .join(" ");
}

// Contoh penggunaan
const pathJSON: PathCommand[] = [
  { type: "M", x: 10, y: 80 },
  { type: "C", x1: 40, y1: 10, x2: 140, y2: 10, x: 180, y: 80 },
  { type: "Z" },
];

const svgPathString = jsonToSVGPath(pathJSON);
console.log(svgPathString); // "M10 80 C40 10, 140 10, 180 80 Z"
```

---

## Hasil

Dari JSON:

```json
[
  { "type": "M", "x": 10, "y": 80 },
  { "type": "C", "x1": 40, "y1": 10, "x2": 140, "y2": 10, "x": 180, "y": 80 },
  { "type": "Z" }
]
```

Menjadi string `d` SVG:

```
M10 80 C40 10, 140 10, 180 80 Z
```

---

✨ Dengan dua fungsi ini (`parseSVGPathToJSON` dan `jsonToSVGPath`), kamu bisa melakukan round-trip penuh:

- **String → JSON → String**
- Bisa dipakai untuk manipulasi path secara terstruktur (misalnya edit titik, simpan ke database, dll).

Apakah kamu ingin saya tambahkan **fungsi builder Path2D langsung dari JSON** (jadi JSON → Path2D tanpa harus lewat string lagi)?
