# Kumpulan perintah Basik

## 📝 Perintah Umum

#### `mulai(pjg: number = 800, lbr: number = 600, kanvas: HTMLCanvasElement = null, mode: number = 1)`  

Memulai aplikasi. Ini adalah perintah awal untuk memulai applikasi dengan BASIK. Perintah ini akan otomatis dipanggil bila tidak ada dalam kode

**Parameters**

*	`pjg`: `number`, default 800  
	panjang kanvas
*	`lbr`: `number`, default 600  
	lebar kanvas
*	`kanvas`: `number`, default null  
	Kanvas yang akan dipakai bila ada.  
	Bila diisi null maka BASIK akan otomatis mencari kanvas yang ada di dokumen atau membuat baru bila tidak tersedia
*	`mode`: `number`, default 1  
	Mode yang dipakai: 1 bila ingin full screen atau 0 bila ingin kanvas apa adanya. Gunakan 0 bila ingin full kontrol terhadap kanvas yang ingin dipakai.  

#### `bersihkanLayar(x: number = 0, y: number = 0, pjg: number = 0, lbr: number = 0)`

Membersihkan layar

**Parameters**

*	`x`: `number`, default 0
	posisi x dari posisi awal membersihkan layar
*	`y`: `number`, default 0
	posisi x dari posisi awal membersihkan layar
*	`pjg`: `number`, default 0
	panjang area untuk dibersihkan
*	`lbr`: `number`, default 0
	lebar area untuk dibersihkan

#### `stempel(url = "roket", x, y)`
Menstempel gambar ke layar pada posisi tertentu  

**Parameters**

*   `url`: `string` atau `Gambar` default "roket"  
	`url` bisa diisi dengan alamat/url gambar yang akan di stempel atau object `Gambar` yang akan di stempel ke layar.  
	Bila hanya diisi menggunakan nama file ("kotak" atau "kotak.png") maka BASIK akan otomatis mencari di folder asset.  
 	`url` dengan type string ditujukan untuk penyederhanaan bagi pemula yang belum mengenal konsep `object` dengan fitur yang lebih sedikit.
	Untuk fitur yang lebih kompleks seperti mengatur ukuran gambar, rotasi, dll, maka dianjurkan untuk memuat gambar terlebih dahulu dengan perintah `muatGambar()`.
*	`x`: `number`  
    Menentukan posisi x.  
    Parameter ini berifat opsional. Bila kosong dan url mereferensi pada object gambar, maka akan menggunakan property x dari gambar
*	`y`: `number`  
    Menentukan posisi y.  
    Parameter ini berifat opsional. Bila kosong dan url mereferensi pada object gambar, maka akan menggunkaan property y dari gambar    

**Returns:** `void`

#### `muatGambar(url)`

Memuat gambar. Hasil dari perintah ini bisa digunakan dengan perintah `stempel()`, atau perintah lainnya. Dengan memuat gambar terlebih dahulu, kita akan punya lebih banyak fitur seperti mengatur panjang/lebar, rotasi, dsb. 
Kita tidak perlu menunggu hingga gambar selesai di muat sepenuhnya untuk memulai operasi selanjutnya, semua di handle secara otomatis. Hal ini untuk memudahkan pemula dan menghindari perintah yang kompleks seperti event, dll.

**Parameters**

*   `url`: `string` default "roket"  
    Alamat Gambar yang akan di dimuat.  
	Alamat  bisa berupa nama file tanpa ekstensi ("kotak"), dengan ekstensi ("kotak.png"), alamat relatif ("./assets/kotak.png"), atau alamat absolut ("http://www.alamat.com/kotak.png").
	Bila alamat hanya menggunakan nama ("kotak" atau "kotak.png") maka BASIK akan otomatis mencari di folder asset.

**Returns:** `Gambar`  

#### `gambarTabrakan(img1: Gambar, img2: Gambar): boolean`  

Mengecek apakah dua gambar bertabrakan. Pengecekan dilakukan dengan mengecek bounding box dari kedua objek `Gambar`.
Pengecekan mensupport gambar yang di rotasi.

**Parameters**

*   `img1`: `Gambar`   
	objek gambar pertama yang akan di check
*   `img2`: `Gambar`   
	objek gambar kedua yang akan di check

**Returns:** `boolean`. bernilai true bila terjadi tabrakan, atau false bila tidak terjadi tabrakan

#### `poinDidalamGambar(img: Gambar, x: number, y: number): boolean`  

Mengecek apakah sebuah point pada lokasi tertentu ada di dalam gambar

**Parameters**

*	`img`: `Gambar`  
	Gambar yang akan di check
*	`x`: `number`  
	Posisi x point
*	`y`: `number`  
	Poisi y point

**Returns:** `boolean`. Bernilai True bila point berada di dalam gambar

#### `semuaGambarSelesaiDimuat(): boolean`  

Mengecek apakah semua gambar sudah selesai dimuat. Gambar yang belum di muat masih bisa menerima perintah dan event.
Bila kita men-`stempel` gambar yang belum dimuat, maka gambarnya akan terlihat setelah gambar selesai di muat.
Perintah ini diperlukan kalau kita benar-benar ingin menunggu semua gambar selesai di muat sebelum melakukan sesuatu.

**Returns:** `boolean`. Bernilai true bila semua gambar selesai dimuat.

#### `posisiGambar(gbr: Gambar, x:number = 0, y:number = 0): void`  

Mengubah posisi gambar. Kita juga bisa mengubah posisi gambar secara parsial dengan mengubah property `x` atau `y` secara langsung.

**Parameters**

*	`gbr`: `Gambar`  
	Gambar yang akan di pindah
*	`x`: `number`, default 0  
	Posisi x
*	`y`: `number`, default 0  
	Posisi y  

#### `ukuranGambar(gbr: Gambar, p:number = 32, l:number = 32): void`  

Mengubah ukuran gambar. Kita juga bisa mengubah ukuran gambar melalui property `panjang` dan `lebar`.

**Parameters**

*	`gbr`: `Gambar`  
	Gambar yang akan di ubah ukurannya
*	`p`: `number`, default 32  
	panjang gambar
*	`l`: `number`, default 32
	Lebar gambar

## 📝 Input
Perintah-perintah yang berhubungan dengan input seperti mouse, touch, dan keyboard.

#### `mouseDitekan(): boolean`

Mengecek apakah mouse sedang di tekan  

**Returns:** `boolean`. Bernilai true bila mouse sedang ditekan

#### `mouseDidrag(): boolean`  

Mengecek apakah mouse sedang di drag

**Returns:** `boolean`. Bernilai true bila mouse sedang di drag

#### `mouseDragX(): number`  

Mengembalikan jarak vertikal mouse saat di drag, dihitung dari posisi awal saat drag dimulai

**Returns:** `number`. besaran drag horizontal

#### `mouseDragY(): number`  

Mengembalikan jarak vertikal mouse saat di drag, dihitung dari posisi awal saat drag dimulai

**Returns:** `number`. besaran drag vertikal

#### `mouseX(): number`  

Mengembalikan posisi X dari mouse

**Returns:** `number`. posisi x dari mouse

#### `mouseY(): number`  

Mengembalikan posisi Y dari mouse

**Returns:** `number`. posisi y dari mouse

#### `mouseDragAwalX(): number`  

Mengembalikan Posisi awal mouse saat mulai di drag

**Returns:** `number`. posisi x saat mulai di drag

#### `mouseDragAwalY(): number`  

Mengembalikan Posisi awal mouse saat mulai di drag

**Returns:** `number`. posisi y saat mulai di drag

#### `mouseGerakX(): number`  

Mengembalikan besar pergerakan horizontal saat mouse bergerak

**Returns:** `number`. besar pergerakan horizontal saat mouse digerakkan

#### `mouseGerakY(): number`

Mengembalikan besar pergerakan vertikal saat mouse bergerak

**Returns:** `number`. besar pergerakan vertikal saat mouse digerakkan

#### `tombolDitahan(key: string = '')`

mengecek apakah sebuah tombol sedang ditahan

**Parameters**

*	`key`: `string`
	tombol yang sedang ditekan

#### ` tombolEvent():string `

Mengembalikan informasi tombol terakhir yang terlibat saat ada event keyboard

## 📝 Perintah Teks

Perintah-perintah yang berhubungan dengan teks.

##### `tulis()`

Menulis sesuatu di layar

**Parameters**

*	`teks`: `string`, default ""
	teks yang ingin di tulis
*	`x`: `number`, opsional
	posisi x dari tulisan, bila tidak disediakan maka akan sama dengan teks sebelumnya
*	`y`: `number`, optional
	posisi y dari tulisan, bila tidak disediakan maka posisinya adalah di bawah teks sebelumnyas
s