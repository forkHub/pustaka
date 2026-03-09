# 📚 JavaScript Utility Library Documentation

**Version:** 1.0.0\
**Author:** *Nama Anda*\
**Last Updated:** *Tanggal*

***

## 📖 Overview

Library ini berisi kumpulan fungsi JavaScript yang dikelompokkan berdasarkan fungsionalitas seperti manipulasi string, operasi array, tanggal & waktu, validasi, dan lainnya.

Tujuan library:

*   Mempermudah penggunaan fungsi-fungsi umum
*   Meningkatkan reusability
*   Menghindari duplikasi kode

***

## 🚀 Instalasi

### Via `<script>`



### Via ES Module

```javascript
import * as Utils from './your-library.js';
```

***

# 📦 Library Structure

    your-library/
    │
    ├── string/
    │   ├── capitalize.js
    │   ├── truncate.js
    │   └── slugify.js
    │
    ├── array/
    │   ├── unique.js
    │   ├── chunk.js
    │   └── flatten.js
    │
    ├── date/
    │   ├── formatDate.js
    │   └── timeAgo.js
    │
    ├── number/
    │   ├── randomInt.js
    │   └── clamp.js
    │
    └── validation/
        ├── isEmail.js
        └── isEmpty.js

***

# 🧩 Function Groups & Documentation

> **Format Parameter**
>
> *   **Type:** tipe data (mis. `string`, `number`, `boolean`, `Date`, `Array<T>`, `Record<string, any>`)
> *   **Required:** `Ya` / `Tidak`
> *   **Default:** nilai default (jika ada)
> *   **Deskripsi:** kegunaan parameter
> *   **Catatan:** edge cases, batasan, atau perilaku khusus

***

## 1) 📝 String Utilities

### `capitalize(str)`

Mengubah huruf pertama string menjadi kapital, sisanya dibiarkan apa adanya.

```js
function capitalize(str) { /* ... */ }
```

**Parameters**

*   `str`
    *   **Type:** `string`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Teks input yang akan diubah huruf pertamanya.
    *   **Catatan:** Jika `str` kosong atau `null/undefined`, fungsi idealnya mengembalikan string kosong atau melempar error (sesuaikan kebijakan library).

**Returns:** `string`

**Example**

```js
capitalize("hello world"); // "Hello world"
capitalize("1abc");        // "1abc" (tidak berubah karena bukan huruf)
```

***

### `truncate(str, maxLength, options)`

Memotong string ke panjang maksimum dengan suffix opsional.

```js
function truncate(str, maxLength, options = { suffix: '…', preserveWords: false }) { /* ... */ }
```

**Parameters**

*   `str`
    *   **Type:** `string`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Teks yang akan dipotong.
*   `maxLength`
    *   **Type:** `number`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Panjang maksimum output (termasuk suffix).
    *   **Catatan:** Harus > 0; jika lebih kecil dari panjang `suffix`, hasil bisa hanya `suffix`.
*   `options`
    *   **Type:** `{ suffix?: string; preserveWords?: boolean }`
    *   **Required:** Tidak
    *   **Default:** `{ suffix: '…', preserveWords: false }`
    *   **Deskripsi:** Konfigurasi pemotongan.
    *   **Catatan:**
        *   `suffix` digunakan di ujung hasil, mis. `"..."`
        *   `preserveWords` jika `true`, potong di batas spasi terdekat.

**Returns:** `string`

**Example**

```js
truncate("lorem ipsum dolor sit amet", 10); 
// "lorem i…"

truncate("lorem ipsum dolor", 10, { preserveWords: true }); 
// "lorem…"

truncate("short", 10); 
// "short"
```

***

### `slugify(str, options)`

Mengubah teks menjadi slug URL-friendly.

```js
function slugify(str, options = { delimiter: '-', lower: true, trim: true }) { /* ... */ }
```

**Parameters**

*   `str`
    *   **Type:** `string`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Teks input yang akan diubah.
*   `options`
    *   **Type:** `{ delimiter?: string; lower?: boolean; trim?: boolean }`
    *   **Required:** Tidak
    *   **Default:** `{ delimiter: '-', lower: true, trim: true }`
    *   **Deskripsi:** Opsi penulisan slug.
    *   **Catatan:** Karakter non-alfanumerik akan dihapus/diubah.

**Returns:** `string`

**Example**

```js
slugify("Hello World!");                // "hello-world"
slugify("Produk: Edisi #2", { lower: false }); // "Produk-Edisi-2"
```

***

## 2) 📊 Array Utilities

### `unique(arr, by)`

Menghapus elemen duplikat dari array.

```js
function unique(arr, by) { /* ... */ }
```

**Parameters**

*   `arr`
    *   **Type:** `Array<any>`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Array sumber.
*   `by`
    *   **Type:** `(item: any) => any`
    *   **Required:** Tidak
    *   **Default:** `undefined`
    *   **Deskripsi:** Selector untuk menentukan kunci keunikan (mis. `item.id`).
    *   **Catatan:** Jika tidak disediakan, perbandingan ketat (`===`) digunakan.

**Returns:** `Array<any>`

**Example**

```js
unique([1,2,2,3]); 
// [1,2,3]

unique([{id:1},{id:1},{id:2}], x => x.id);
// [{id:1},{id:2}]
```

***

### `chunk(arr, size)`

Memecah array menjadi beberapa bagian dengan ukuran tertentu.

```js
function chunk(arr, size) { /* ... */ }
```

**Parameters**

*   `arr`
    *   **Type:** `Array<any>`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Array sumber.
*   `size`
    *   **Type:** `number`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Ukuran tiap chunk.
    *   **Catatan:** `size` harus bilangan bulat > 0.

**Returns:** `Array<Array<any>>`

**Example**

```js
chunk([1,2,3,4,5], 2); // [[1,2],[3,4],[5]]
```

***

### `flatten(arr, depth)`

Meratakan nested array hingga kedalaman tertentu.

```js
function flatten(arr, depth = 1) { /* ... */ }
```

**Parameters**

*   `arr`
    *   **Type:** `Array<any>`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Array berisi item dan/atau array.
*   `depth`
    *   **Type:** `number | 'infinity'`
    *   **Required:** Tidak
    *   **Default:** `1`
    *   **Deskripsi:** Kedalaman perataan.
    *   **Catatan:** Pakai `'infinity'` atau angka besar untuk perataan penuh.

**Returns:** `Array<any>`

**Example**

```js
flatten([1,[2,[3,[4]]]], 2); // [1,2,[3,[4]]]
flatten([1,[2,[3]]], 'infinity'); // [1,2,3]
```

***

## 3) 🗓️ Date & Time Utilities

### `formatDate(date, format, locale)`

Memformat tanggal sesuai pola.

```js
function formatDate(date, format = 'YYYY-MM-DD', locale = 'en') { /* ... */ }
```

**Parameters**

*   `date`
    *   **Type:** `Date | number | string`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Objek `Date`, timestamp (ms), atau string parseable.
    *   **Catatan:** Validasi disarankan—tanggal invalid -> error/empty string.
*   `format`
    *   **Type:** `string`
    *   **Required:** Tidak
    *   **Default:** `'YYYY-MM-DD'`
    *   **Deskripsi:** Pola output, mis. `YYYY`, `MM`, `DD`, `HH`, `mm`, `ss`.
*   `locale`
    *   **Type:** `string`
    *   **Required:** Tidak
    *   **Default:** `'en'`
    *   **Deskripsi:** Kode bahasa untuk nama bulan/hari jika didukung.

**Returns:** `string`

**Example**

```js
formatDate(new Date(2026, 2, 9), "YYYY-MM-DD");     // "2026-03-09"
formatDate(Date.now(), "DD/MM/YYYY", "id");         // "09/03/2026"
```

***

### `timeAgo(input, options)`

Mengubah waktu menjadi format “x minutes ago”.

```js
function timeAgo(input, options = { now: Date.now(), locale: 'en' }) { /* ... */ }
```

**Parameters**

*   `input`
    *   **Type:** `Date | number | string`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Tanggal target (Date/timestamp/string).
*   `options`
    *   **Type:** `{ now?: number; locale?: string }`
    *   **Required:** Tidak
    *   **Default:** `{ now: Date.now(), locale: 'en' }`
    *   **Deskripsi:** Konfigurasi waktu acuan dan lokal.
    *   **Catatan:** Jika `input` di masa depan, kembalikan “in x …” (opsional).

**Returns:** `string`

**Example**

```js
timeAgo(Date.now() - 90_000); // "1 minute ago" atau "2 minutes ago" tergantung pembulatan
```

***

## 4) 🔢 Number Utilities

### `randomInt(min, max)`

Menghasilkan integer acak inklusif antara `min` dan `max`.

```js
function randomInt(min, max) { /* ... */ }
```

**Parameters**

*   `min`
    *   **Type:** `number`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Batas bawah (inklusif).
*   `max`
    *   **Type:** `number`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Batas atas (inklusif).
    *   **Catatan:** Jika `min > max`, bisa ditukar otomatis atau lempar error (jelaskan kebijakan).

**Returns:** `number`

**Example**

```js
randomInt(1, 3); // 1, 2, atau 3
```

***

### `clamp(value, min, max)`

Membatasi angka dalam rentang tertentu.

```js
function clamp(value, min, max) { /* ... */ }
```

**Parameters**

*   `value`
    *   **Type:** `number`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Angka yang akan dibatasi.
*   `min`
    *   **Type:** `number`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Batas bawah.
*   `max`
    *   **Type:** `number`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Batas atas.
    *   **Catatan:** Jika `min > max`, tentukan perilaku (swap/throw).

**Returns:** `number`

**Example**

```js
clamp(10, 0, 5); // 5
clamp(-1, 0, 5); // 0
```

***

## 5) ✔️ Validation Utilities

### `isEmail(str, mode)`

Validasi format email sederhana/ketat.

```js
function isEmail(str, mode = 'simple') { /* ... */ }
```

**Parameters**

*   `str`
    *   **Type:** `string`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Email yang akan divalidasi.
*   `mode`
    *   **Type:** `'simple' | 'strict'`
    *   **Required:** Tidak
    *   **Default:** `'simple'`
    *   **Deskripsi:** Mode regex validasi.
    *   **Catatan:** `strict` mungkin tidak 100% RFC 5322—jelaskan limitasi.

**Returns:** `boolean`

**Example**

```js
isEmail("user@example.com");        // true
isEmail("user@localhost", "strict"); // false (tergantung regex)
```

***

### `isEmpty(value, options)`

Cek apakah value dianggap “kosong”.

```js
function isEmpty(value, options = { trim: true, zeroAsEmpty: false }) { /* ... */ }
```

**Parameters**

*   `value`
    *   **Type:** `any`
    *   **Required:** Ya
    *   **Default:** –
    *   **Deskripsi:** Nilai yang akan diuji.
*   `options`
    *   **Type:** `{ trim?: boolean; zeroAsEmpty?: boolean }`
    *   **Required:** Tidak
    *   **Default:** `{ trim: true, zeroAsEmpty: false }`
    *   **Deskripsi:** Aturan penilaian “kosong”.
    *   **Catatan:**
        *   Jika `trim` true: `"   "` dianggap kosong.
        *   `zeroAsEmpty` jika true: `0` dianggap kosong.

**Returns:** `boolean`

**Example**

```js
isEmpty("");                   // true
isEmpty("   ");                // true (default trim)
isEmpty(0);                    // false (default), true jika zeroAsEmpty: true
isEmpty([]);                   // true
isEmpty({});                   // true
```

***

## 📌 Rekomendasi JSDoc (opsional tapi sangat berguna)

Contoh konsisten untuk dokumentasi + IntelliSense:

```js
/**
 * Mengubah huruf pertama string menjadi kapital.
 * @param {string} str - Teks input yang akan diubah huruf pertamanya.
 * @returns {string} String hasil dengan huruf pertama kapital.
 */
export function capitalize(str) { /* ... */ }

/**
 * Memotong string ke panjang maksimum dengan suffix opsional.
 * @param {string} str - Teks yang akan dipotong.
 * @param {number} maxLength - Panjang maksimum output (termasuk suffix).
 * @param {{ suffix?: string, preserveWords?: boolean }} [options={ suffix: '…', preserveWords: false }]
 * @returns {string}
 */
export function truncate(str, maxLength, options = { suffix: '…', preserveWords: false }) { /* ... */ }
```

> Jika kamu pakai TypeScript, sarankan menambahkan tipe di signature dan menghasilkan `.d.ts` untuk DX yang lebih baik.

***

## 🧪 Testing (Optional)

    npm test

***

## 📄 License

MIT License (or your preferred license)

***

Kalau kamu mau, aku bisa **generate file README.md** otomatis berisi template ini + **skeleton JSDoc** untuk semua fungsi yang kamu pakai. Tinggal bilang daftar fungsi apa saja (atau share repo strukturnya), nanti aku susun lengkap. Mau sekalian dibuatkan versi **TypeScript definition (`.d.ts`)** juga?
