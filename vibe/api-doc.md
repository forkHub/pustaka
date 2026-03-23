# 📚 Dokumentasi BASIK

## 📖 Overview

Library ini berisi kumpulan fungsi JavaScript yang dikelompokkan berdasarkan fungsionalitas seperti manipulasi gambar, operasi menggambar bentuk, interaktif dan lainnya.

## 📝 Gambar

### `stempel(url, x, y)`
Menstempel gambar ke layar pada posisi tertentu  

**Parameters**

*   `url`: `string` atau `Gambar` default "kotak"  
	`url` bisa diisi dengan alamat gambar yang akan di stempel atau object `Gambar` yang akan di stempel ke layar.  
	Alamat  bisa berupa nama file tanpa ekstensi ("kotak"), dengan ekstensi ("kotak.png"), alamat relatif ("./assets/kotak.png"), atau alamat absolute ("http://www.alamat.com/kotak.png").
	Bila alamat hanya menggunakan nama ("kotak" atau "kotak.png") maka BASIK akan otomatis mencari di folder asset.  
 	`url` dengan type string ditujukan untuk penyederhanaan bagi pemula yang belum mengenal konsep `object` dengan fitur yang lebih sedikit.
	Untuk fitur yang lebih kompleks seperti mengatur ukuran gambar, rotasi, dll, maka dianjurkan untuk memuat gambar terlebih dahulu dengan perintah `muatGambar()`.
*	`x`: `number`  
    Menentukan posisi x.  
    Parameter ini berifat opsional.  
*	`y`: `number`  
    Menentukan posisi y.  
    Parameter ini berifat opsional.    
**Returns:** `void`

### `muatGambar(url)`

Memuat gambar. Hasil dari perintah ini bisa digunakan dengan perintah `stempel()`, atau perintah lainnya. Dengan memuat gambar terlebih dahulu, kita akan punya lebih banyak fitur seperti mengatur panjang/lebar, rotasi, dsb. 
Kita tidak perlu menunggu hingga gambar selesai di muat sepenuhnya untuk memulai operasi selanjutnya, semua di handle secara otomatis. Hal ini untuk memudahkan pemula dan menghindari perintah yang kompleks seperti event, dll.

**Parameters**

*   `url`: `string` default "kotak"  
    Alamat Gambar yang akan di dimuat.  
	Alamat  bisa berupa nama file tanpa ekstensi ("kotak"), dengan ekstensi ("kotak.png"), alamat relatif ("./assets/kotak.png"), atau alamat absolut ("http://www.alamat.com/kotak.png").
	Bila alamat hanya menggunakan nama ("kotak" atau "kotak.png") maka BASIK akan otomatis mencari di folder asset.

**Returns:** `Gambar`  

### `gambarTabrakan(img1: Gambar, img2: Gambar): boolean`  

Mengecek apakah dua gambar bertabrakan. Pengecekan dilakukan dengan mengecek bounding box dari kedua `Gambar`.
Pengecekan mensupport gambar yang di rotasi.

**Parameters**

*   `img1`: `Gambar`   
	Gambar pertama yang akan di check
*   `img2`: `Gambar`   
	Gambar kedua yang akan di check

**Returns:** `boolean`. bernilai true bila terjadi tabrakan, atau false bila tidak terjadi tabrakan

### `poinDidalamGambar(img: Gambar, x: number, y: number): boolean`  

Mengecek apakah sebuah point pada lokasi tertentu ada di dalam gambar

**Parameters**
*	`img`: `Gambar`  
	Gambar yang akan di check
*	`x`: `number`  
	Posisi x point
*	`y`: `number`  
	Poisi y point

**Returns:** `boolean`. Bernilai True bila point berada di dalam gambar

### `semuaGambarSelesaiDimuat(): boolean`  

Mengecek apakah semua gambar sudah selesai di muat. Gambar yang belum di muat masih bisa menerima perintah dan event.
Bila kita men-`stempel` gambar yang belum di muat, maka gambarnya akan terlihat setelah gambar selesai di muat.
Perintah ini diperlukan kalau kita benar-benar ingin menunggu semua gambar selesai di muat sebelum melakukan sesuatu.

**Returns:** `boolean`. Bernilai true bila semua gambar selesai dimuat.

### `hapusGAmbar(gbr: Gambar): void`  

Menghapus gambar dari memori. Gambar yang sudah dihapus tidak akan bisa menerima perintah dan akan menghasilkan error.

**Parameters**
*	`gbr`: `Gambar`  
	Gambar yang akan di hapus

### `posisiGambar(gbr: Gambar, x:number = 0, y:number = 0):void`  

Mengubah posisi gambar, kita juga bisa mengubah posisi gambar secara parsial dengan mengubah property `x` atau `y`.

**Parameters**
*	`gbr`: `Gambar`  
	Gambar yang akan di pindah
*	`x`: `number`, default 0  
	Posisi x
*	`y`: `number`  
	Posisi y


### `ukuranGambar(gbr: Gambar, p:number = 32, l:number = 32):void`  

Mengubah ukuran gambar. Kita juga bisa mengubah ukuran gambar melalui property `panjang` dan `lebar`.

**Parameters**
*	`gbr`: `Gambar`  
	Gambar yang akan di ubah ukurannya
*	`p`: `number`, default 32  
	panjang gambar
*	`l`: `number`, default 32
	Lebar gambar


## 📝 Perintah Input
Perintah-perintah yang berhubungan dengan input seperti mouse, touch, dan keyboard.
Perintah mouse secara otomatis akan bisa dipakai untuk touch.

### `mouseDitekan():boolean`

Mengecek apakah mouse sedang di tekan

### `mouseDidrag(): boolean`  


### `mouseDragX(): number`  
Mengembalikan posisi horizontal mouse saat di drag, dihitung dari posisi awal saat drag dimulai

### `mouseDragY(): number`  

Mengembalikan posisi vertikal mouse saat di drag, dihitung dari posisi awal saat drag dimulai

Mengembalikan posisi X dari mouse
### `mouseY(): number`  

Mengembalikan posisi Y dari mouse

### `mouseDragAwalX(): number`  
### `mouseDragAwalY(): number`  


### `mouseGerakX(): number`  

Mengembalikan pergerakan horizontal saat mouse bergerak

Mengembalikan pergerakan vertikal saat mouse bergerak

### `bukaPath(x: number = 0, y: number = 0): void`  

Perintah ini berfungsi untuk memulai menggambar bentuk yang kompleks. 
Perintah ini di ikuti dengan perintah garisKe(), kurvaKe() dan lingkaranKe()


Membuat garis

### `kurvaKe(cx: number, cy: number, x: number, y: number): void`  


### `lingkaranKe(cx: number, cy: number, sweepAngleDeg: number, counterClockwise = false)`  
Membuat lingkaran

### `tutupPath()`  

Menutup Path

Menggambar lingkaran
### `elip(x: number = 0, y: number = 0, radiusX: number = 0, radiusY: number = 0, awal: number = 0, akhir: number = 360): void`  

Menggambar elip

### `kotak(x1: number = 10, y1: number = 10, x2: number = 100, y2: number = 100)`  
### `segitiga(x: number, y: number, base: number, height: number, position: number): void`  


### `pie(x: number, y: number, radius: number, startAngleDeg: number, endAngleDeg: number): void`  

Menggambar pie


### `bintang(ctx: CanvasRenderingContext2D, x: number, y: number, spikes: number, outerRadius: number, innerRadius: number): void`
Menggambar bintang

## 📝 Perintah Umum
### `buatKanvas(w: number = 320, h: number = 240, canvas: HTMLCanvasElement = null, mode: number = 1)`  

Membuat kanvas

### `setKanvas(c: HTMLCanvasElement)`

Mengeset kanvas

### `kanvas(): HTMLCanvasElement`

Mengembalikan kanvas yang aktif

### `bersihkanLayar(x: number = 0, y: number = 0, w: number = 0, h: number = 0)`

Membersihkan layar

### `hijau(): number`

Komponent hijau

### `merah(): number`

Komponent merah

### `biru(): number`

Komponent biru

### `alpha(): number`

Komponent alpha

### `ambilPiksel(x: number = 0, y: number = 0): void`

ambil piksel

### `setPiksel(x: number = 0, y: number = 0): void`

set piksel

### `warna(idx: number = 0, trans = 100)`

Mengeset warna fill

### `warnaGaris(idx: number, trans = 100)`

Mengeset warna garis

### `tebalGaris(n: number)`

Mengatur ketbalan garis

## 📝 Perintah Matematika


### `akar(n = 4)`  

Akar

### `pi()`

Pi

### `jarak(x: number = 0, y: number = 0)`

Menghitung jarak

### `jarakSudut(angleS: number = 0, angleT: number, min: boolean = true)`

menghitung jarak antar dua sudut

### `sudut(x: number, y: number)`

Menghitung sudut

### `polarX(panjang = 100, sudut = 0)`

Posisi X polar

### `polarY(panjang = 100, sudut = 0)`

Posisi Y polar

### `abs(n: number)`

absolut

### `normalisasiSudut(sdt: number = 0)`

Membuat sudut antara 0 - 360

### `pembulatan(n: number, b: number = 1, type: number = 0)`

Membulatkan bilangan 

## 📝 Perintah Teks


### `posisiTeks`

Mengatur posisi teks

### `tulis`

Menulis

### `fontTeks`

Mengatur font

### `ukuranTeks`

ukuran teks

### `perataanTeks`

Perataan teks

## Event Keyboard

### `tombolDitahan(key: string = '')`

apakah tombol ditahan

### `tombolEvent()`

informasi tombol di event terakhir

## 📄 Lisensi

GNU license

***