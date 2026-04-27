Kalau kamu punya library yang ditulis sebagai **ES6 module** (`export` / `import`), tapi ingin bisa dipakai di lingkungan **non‑module** (misalnya `<script>` biasa di browser, atau project lama yang tidak pakai `type="module"`), ada beberapa pendekatan:

---

### 1. Ubah menjadi UMD / IIFE bundle
Cara paling umum adalah membungkus library jadi format **UMD** (Universal Module Definition) atau **IIFE** (Immediately Invoked Function Expression). Format ini bisa dipakai baik di `import` maupun di `<script>` biasa.

Contoh dengan **Rollup**:

```js
// rollup.config.js
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/mylib.umd.js',
      format: 'umd',
      name: 'MyLib', // nama global di window
    },
    {
      file: 'dist/mylib.esm.js',
      format: 'es',
    }
  ]
};
```

Setelah dibuild, kamu bisa pakai:
```html
<script src="dist/mylib.umd.js"></script>
<script>
  MyLib.someFunction(); // langsung dipanggil
</script>
```

---

### 2. Manual expose ke `window`
Kalau tidak mau pakai bundler, bisa langsung di file modul:

```js
// mylib.js (ES6 module)
export function hello(name) {
  return `Hello, ${name}`;
}

// expose ke global jika tidak pakai module
if (typeof window !== "undefined") {
  window.MyLib = { hello };
}
```

Lalu di HTML biasa:
```html
<script src="mylib.js"></script>
<script>
  console.log(MyLib.hello("Fajar"));
</script>
```

Tapi hati‑hati: file ini tetap dianggap module kalau dipanggil dengan `type="module"`. Untuk non‑module, pastikan hasil build sudah berupa script biasa.

---

### 3. Gunakan bundler lain (Webpack, esbuild, dll.)
Semua bundler modern bisa output ke format **UMD** atau **IIFE**. Prinsipnya sama: library kamu tetap ditulis dengan `export`, lalu bundler yang mengubahnya jadi script global.

---

📌 **Rekomendasi praktis:**  
Kalau library kamu cukup besar atau dipakai banyak orang, gunakan bundler (Rollup/Webpack/esbuild) dan output ke **UMD**. Kalau hanya internal kecil, cukup tambahkan `window.MyLib = {...}` di akhir file.

---

Mau saya tunjukkan contoh konfigurasi **Webpack** juga, supaya kamu bisa bandingkan dengan Rollup?

---

Kalau pakai **Vite**, kamu bisa tetap menulis library dalam format ES module, lalu meng‑output versi **UMD/IIFE** supaya bisa dipakai di `<script>` biasa. Caranya:

---

### 1. Konfigurasi `vite.config.js`
Tambahkan opsi `build.lib`:

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',   // file utama library kamu
      name: 'MyLib',           // nama global di window
      formats: ['es', 'umd', 'iife'], // output ke beberapa format
      fileName: (format) => `mylib.${format}.js`
    }
  }
});
```

- `formats: ['es', 'umd', 'iife']` → menghasilkan versi ESM, UMD, dan IIFE.
- `name: 'MyLib'` → di browser non‑module, library akan tersedia sebagai `window.MyLib`.

---

### 2. Build
Jalankan:
```bash
vite build
```

Output akan ada di folder `dist/`:
- `mylib.es.js` → untuk `import`
- `mylib.umd.js` → untuk Node/UMD
- `mylib.iife.js` → untuk `<script>` biasa

---

### 3. Pemakaian di HTML biasa
```html
<script src="dist/mylib.iife.js"></script>
<script>
  console.log(MyLib.hello("Fajar"));
</script>
```

---

📌 **Tips praktis:**
- Kalau target utama kamu adalah browser lama/non‑module, cukup pakai format `iife`.
- Kalau ingin library fleksibel (bisa dipakai di Node, bundler, atau browser), tambahkan `umd` juga.
- Vite otomatis pakai Rollup di belakang, jadi konfigurasi ini sebenarnya sama dengan Rollup config, hanya lebih ringkas.

---

Mau saya tunjukkan contoh isi `src/index.js` dengan `export` lalu hasilnya diakses lewat `window.MyLib` setelah build?