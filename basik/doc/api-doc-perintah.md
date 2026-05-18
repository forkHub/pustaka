## Kumpulan perintah
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

Mengecek apakah dua gambar bertabrakan. Pengecekan dilakukan dengan mengecek bounding box dari kedua objek `Gambar`.
Pengecekan mensupport gambar yang di rotasi.

**Parameters**

*   `img1`: `Gambar`   
	objek gambar pertama yang akan di check
*   `img2`: `Gambar`   
	objek gambar kedua yang akan di check

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

### `hapusGambar(gbr: Gambar): void`  

Menghapus gambar dari memori. Gambar yang sudah dihapus tidak akan bisa menerima perintah dan akan menghasilkan error.

**Parameters**
*	`gbr`: `Gambar`  
	objek gambar yang akan di hapus

### `posisiGambar(gbr: Gambar, x:number = 0, y:number = 0):void`  

Mengubah posisi gambar. Kita juga bisa mengubah posisi gambar secara parsial dengan mengubah property `x` atau `y` secara langsung.

**Parameters**
*	`gbr`: `Gambar`  
	Gambar yang akan di pindah
*	`x`: `number`, default 0  
	Posisi x
*	`y`: `number`, default 0  
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

### `mouseDitekan():boolean`

Mengecek apakah mouse sedang di tekan  

**Returns:** `boolean`. Bernilai true bila mouse sedang ditekan

### `mouseDidrag(): boolean`  

Mengecek apakah mouse sedang di drag

**Returns:** `boolean`. Bernilai true bila mouse sedang di drag

### `mouseDragX(): number`  

Mengembalikan jarak vertikal mouse saat di drag, dihitung dari posisi awal saat drag dimulai

**Returns:** `number`. besaran drag horizontal

### `mouseDragY(): number`  

Mengembalikan jarak vertikal mouse saat di drag, dihitung dari posisi awal saat drag dimulai

**Returns:** `number`. besaran drag vertikal

### `mouseX(): number`  

Mengembalikan posisi X dari mouse

**Returns:** `number`. posisi x dari mouse

### `mouseY(): number`  

Mengembalikan posisi Y dari mouse

**Returns:** `number`. posisi y dari mouse

### `mouseDragAwalX(): number`  

Mengembalikan Posisi awal mouse saat mulai di drag

**Returns:** `number`. posisi x saat mulai di drag

### `mouseDragAwalY(): number`  

Mengembalikan Posisi awal mouse saat mulai di drag

**Returns:** `number`. posisi y saat mulai di drag

### `mouseGerakX(): number`  

Mengembalikan besar pergerakan horizontal saat mouse bergerak

**Returns:** `number`. besar pergerakan horizontal saat mouse digerakkan

### `mouseGerakY(): number`

Mengembalikan besar pergerakan vertikal saat mouse bergerak

**Returns:** `number`. besar pergerakan vertikal saat mouse digerakkan

## 📝 Perintah menggambar bentuk dasar
Berisi kumpulan perintah untuk menggambar dengan bangun geometri

### `bukaPath(x: number = 0, y: number = 0): void`  

Perintah ini berfungsi untuk memulai menggambar bentuk yang kompleks. 
Perintah ini bisa di ikuti dengan perintah `garisKe()`, `kurvaKe()` dan `lingkaranKe()`

**Parameters**
*	`x`: `number`  
	Posisi X mulai menggambar
*	`y`: `number`, default 32  
	Posisi Y mulai menggambar

### `garisKe(x: number, y: number): void`  

Membuat garis ke posisi tertentu dari posisi terakhir

**Parameters**
*	`x`: `number`  
	Posisi x ujung garis
*	`y`: `number`, default 32  
	Posisi y ujung garis

### `kurvaKe(cx: number, cy: number, x: number, y: number): void`  

Membuat kurva yang berakhir ke posisi x dan y, dengan kontrol point ditentukan oleh cx dan cy

**Parameters**
*	`cx`: `number`  
	posisi x kontrol point
*	`cy`: `number`  
	posisi y kontrol point
*	`x`: `number`  
	posisi x ujung kurva
*	`y`: `number`  
	posisi y ujung kurva

### `lingkaranKe(tx: number, ty: number, sudut: number, searahJarumJam = false)`  

Membuat lingkaran dari posisi terakhir sebesar sudut tertentu

**Parameters**
*	`tx`: `number`  
	posisi x dari tengah lingkaran
*	`ty`: `number`  
	posisi y dari tengah lingkaran
*	`sudut`: `number`  
	sudut akhir lingkaran di hitung dari posisi akhir x dan y 
*	`searahJarumJam`: `boolean`  
	apakah lingkaran digambar searah jarum jam

### `tutupPath()`  

Menutup Path. Perintah ini harus dipanggil untuk mengakhiri perintah dari `bukaPath()`.

### `elip(x: number = 0, y: number = 0, radiusX: number = 0, radiusY: number = 0, awal: number = 0, akhir: number = 360, searahJarumJam:boolean = false): void`  

Menggambar elip atau lingkaran

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran
*	`y`: `number`, default 0
	posisi y dari tengah lingkaran
*	`radiusX`: `number`, default 32  
	radius horizontal 
*	`radiusY`: `number`, default 64
	radius vertikal
*	`awal`: `number`, default 0  
	sudut awal elip
*	`akhir`: `number`, default 360  
	sudut akhir elip
*	`searahJarumJam`: `boolean`, default false  
	apakah elips searah jarum jam

### `kotak(x: number = 10, y: number = 10, pjg: number = 100, lbr: number = 100)`  

**Parameters**
*	`x`: `number`, default 10  
	posisi x dari awal kotak
*	`y`: `number`, default 10  
	posisi y dari awal kotak
*	`pjg`: `number`, default 100  
	panjang kotak
*	`lbr`: `number`, default 100  
	lebar kotak

## 📝 Perintah Umum

Berisi perintah umum yang tidak masuk kategori manapun

### `buatKanvas(pjg: number = 800, lbr: number = 600, kanvas: HTMLCanvasElement = null, mode: number = 1)`  

Membuat kanvas. Ini adalah perintah awal yang harus dipanggil untuk memulai applikasi dengan BASIK

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


### `bersihkanLayar(x: number = 0, y: number = 0, pjg: number = 0, lbr: number = 0)`

Membersihkan layar

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### `warna(idx: number = 0, trans = 100)`

Mengeset warna fill

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### `warnaGaris(idx: number, trans = 100)`

Mengeset warna garis

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran


#### `tebalGaris(n: number)`

Mengatur ketbalan garis

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran


### 📝 Perintah Matematika
perintah umum matematika.

#### `akar(n = 4): number`  

Mencari akar dari bilangan

**Parameters**
*	`x`: `number`, default 4
	bilangan yang ingin dicari akarnya

**Returns:** `number`. 

#### `pi(): number`

Mengembalikan nilai dari Pi, (3.14 ...)

**Returns:** `number`. 

#### `jarak(x: number = 0, y: number = 0): number`

Menghitung jarak

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

**Returns:** `number`. 

#### `jarakSudut(angleS: number = 0, angleT: number, min: boolean = true)`

menghitung jarak antar dua sudut

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

**Returns:** `number`. 

#### `sudut(x: number, y: number)`

Menghitung sudut

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

**Returns:** `number`. 

#### `polarX(panjang = 100, sudut = 0)`

Posisi X polar

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

**Returns:** `number`. 

#### `polarY(panjang = 100, sudut = 0)`

Posisi Y polar

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

**Returns:** `number`. 

#### `abs(n: number): number`

menghasilkan nilai absolute dari suatu bilangan

**Parameters**
*	`n`: `number`, default 0
	bilangan yang ingin dicari nilai absolutenya

**Returns:** `number`. 

#### `normalisasiSudut(sdt: number = 0): number`

Menghasilkan sudut antara 0 - 360, berguna bila ingin mengubah sudut yang lebih dari 360 atau kurang dari 0 menjadi sudut antara 0 - 360 

**Parameters**
*	`sdt`: `number`, default 0
	sudut yang ingin dicari nilai normalnya

**Returns:** `number`. 

#### `pembulatan(n: number, b: number = 1, type: number = 0): number`

Membulatkan bilangan 

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

### 📝 Perintah Teks

Perintah-perintah yang berhubungan dengan teks.

#### `tulis`

Menulis sesuatu 

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### `fontTeks`

Mengatur jenis font

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### `ukuranTeks`

Mengatur ukuran teks

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### `perataanTeks`

Mengatur perataan teks. 

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

### 📝Event Input Keyboard

#### `tombolDitahan(key: string = '')`

mengecek apakah tombol ditahan

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### ` tombolEvent():string `

Mengembalikan informasi tombol terakhir yang terlibat saat ada event keyboard

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

## 📝 Gambar sebagai object
BASIK memiliki object bawaan bernama object Gambar.
object ini dibuat dengan perintah `muatGambar()`.

object `Gambar` memiliki property sebagai berikut:
*   `x`: number  
	posisi x 
*   `y`: number  
	posisi y 
*   `alpha`: number  
	transparansi (0 - 100)
*   `pusatX`: number  
	posisi pusat x
*   `pusatY`: number  
	posisi y 
*   `panjang`: number  
	panjang
*   `lebar`: number  
	lebar
*   `rotasi`: number  
	rotasi (0 - 360)
*   `ubin`: boolean  
	apakah gambar akan digambar sebagai ubin yang memenuhi layar
*   `diDrag`: boolean  
	apakah gamba sedang di drag
*   `diTekan`: boolean  
	apakah gambar sedang di tekan oleh mouse/jari
*   `tipeDrag`: number  
	tipe drag: 1 = geser, 2 = rotasi, 3 = geser tanpa sentuh, 4 = rotasi tanpa sentuh
*   `x`: number  
	Posisi x dari gambar
*   `x`: number  
	Posisi x dari gambar
*   `x`: number  
	Posisi x dari gambar
