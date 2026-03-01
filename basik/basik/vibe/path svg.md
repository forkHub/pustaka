Baik, mari kita buat **parser sederhana** untuk mengubah string `d` dari SVG path menjadi **object JSON**. Dengan begitu, kamu bisa menyimpan instruksi path dalam format terstruktur, lalu membangun kembali `Path2D` dari JSON tersebut.

---

## Contoh Parser di TypeScript

```ts
type PathCommand =
  | { type: "M"; x: number; y: number }
  | { type: "L"; x: number; y: number }
  | { type: "C"; x1: number; y1: number; x2: number; y2: number; x: number; y: number }
  | { type: "Q"; cx: number; cy: number; x: number; y: number }
  | { type: "Z" };

function parseSVGPathToJSON(pathString: string): PathCommand[] {
  const commands: PathCommand[] = [];
  const regex = /([MLCQZ])([^MLCQZ]*)/gi;
  let match;

  while ((match = regex.exec(pathString)) !== null) {
    const [_, cmd, params] = match;
    const numbers = params.trim().split(/[\s,]+/).map(Number);

    switch (cmd) {
      case "M":
        commands.push({ type: "M", x: numbers[0], y: numbers[1] });
        break;
      case "L":
        commands.push({ type: "L", x: numbers[0], y: numbers[1] });
        break;
      case "C":
        commands.push({
          type: "C",
          x1: numbers[0],
          y1: numbers[1],
          x2: numbers[2],
          y2: numbers[3],
          x: numbers[4],
          y: numbers[5],
        });
        break;
      case "Q":
        commands.push({
          type: "Q",
          cx: numbers[0],
          cy: numbers[1],
          x: numbers[2],
          y: numbers[3],
        });
        break;
      case "Z":
        commands.push({ type: "Z" });
        break;
    }
  }

  return commands;
}

// Contoh penggunaan
const svgPath = "M10 80 C 40 10, 140 10, 180 80 Z";
const json = parseSVGPathToJSON(svgPath);
console.log(JSON.stringify(json, null, 2));
```

---

## Output JSON
Untuk string `"M10 80 C 40 10, 140 10, 180 80 Z"`, hasilnya:

```json
[
  { "type": "M", "x": 10, "y": 80 },
  { "type": "C", "x1": 40, "y1": 10, "x2": 140, "y2": 10, "x": 180, "y": 80 },
  { "type": "Z" }
]
```

---

## Catatan
- Parser ini mendukung perintah dasar: `M`, `L`, `C`, `Q`, `Z`.  
- Bisa diperluas untuk perintah lain (`H`, `V`, `A`, dll).  
- JSON hasilnya bisa dipakai untuk membangun kembali `Path2D` atau disimpan sebagai data.

---

Mau saya lanjutkan dengan fungsi **kebalikannya** (dari JSON → string `d` SVG lagi), supaya kamu bisa round-trip penuh (parse dan generate ulang)?