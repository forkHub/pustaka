[Beranda]({{< ref "/" >}})

## 📝 Perintah Umum dan Gambar

### `mulai(pjg: number = 800, lbr: number = 600, kanvas: HTMLCanvasElement = null, mode: number = 1):void`  

Memulai aplikasi. Ini adalah perintah awal untuk memulai applikasi dengan BASIK.

**Parameters**

*	`pjg`: `number`, default 800  
	panjang kanvas
*	`lbr`: `number`, default 600  
	lebar kanvas
*	`kanvas`: `number`, default null  
	Kanvas yang akan dipakai bila ada.  
	Bila diisi null maka BASIK akan otomatis mencari kanvas yang ada di dokumen atau membuat baru bila tidak tersedia
*	`mode`: `number`, default 1  
	Mode yang dipakai: 1 bila ingin full-screen atau 0 bila ingin kanvas apa adanya. Gunakan 0 bila ingin mendapatkan kontrol penuh terhadap kanvas yang ingin dipakai.  

**Returns:** `void`

### `bersihkanLayar(x: number = 0, y: number = 0, pjg: number = 800, lbr: number = 600):void`

Membersihkan layar

**Parameters**

*	`x`: `number`, default 0
	posisi x dari posisi awal membersihkan layar
*	`y`: `number`, default 0
	posisi y dari posisi awal membersihkan layar
*	`pjg`: `number`, default 800
	panjang area untuk dibersihkan
*	`lbr`: `number`, default 600
	lebar area untuk dibersihkan

**Returns:** `void`

### `stempel(url = "roket", x?, y?):void`
Menstempel gambar ke layar pada posisi tertentu  

**Parameters**

*   `url`: `string` default "roket", atau object `Gambar` 
	`url` bisa diisi dengan alamat/url gambar yang akan di stempel atau object `Gambar` yang akan di stempel ke layar.  
	Bila hanya diisi menggunakan nama file ("kotak" atau "kotak.png") maka BASIK akan otomatis mencari di folder `asset`.  
 	`url` dengan type string ditujukan untuk penyederhanaan bagi pemula yang belum mengenal konsep `object` dengan fitur yang lebih sedikit.
	Untuk fitur yang lebih kompleks seperti mengatur ukuran gambar, rotasi, dll, maka dianjurkan untuk memuat gambar terlebih dahulu dengan perintah `muatGambar()`.
*	`x`: `number`, optional  
    Menentukan posisi x.  
    Parameter ini berifat opsional. Bila kosong dan url mereferensi pada object gambar, maka akan menggunakan property x dari gambar
*	`y`: `number`, optional
    Menentukan posisi y.  
    Parameter ini berifat opsional. Bila kosong dan url mereferensi pada object gambar, maka akan menggunkaan property y dari gambar    

**Returns:** `void`

### `muatGambar(url):Gambar`

Memuat gambar. Hasil dari perintah ini bisa digunakan dengan perintah `stempel()`, atau perintah lainnya.  
Dengan memuat gambar terlebih dahulu, kita akan punya lebih banyak fitur seperti mengatur panjang/lebar, rotasi, dsb. 

**Parameters**

*   `url`: `string` default "roket"  
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

Mengecek apakah sebuah poin pada lokasi tertentu ada di dalam gambar

**Parameters**

*	`img`: `Gambar`  
	Gambar yang akan di check
*	`x`: `number`  
	Posisi x point
*	`y`: `number`  
	Poisi y point

**Returns:** `boolean`. Bernilai `true` bila point berada di dalam gambar

### `semuaGambarSelesaiDimuat(): boolean`  

Mengecek apakah semua gambar sudah selesai dimuat. Gambar yang belum di muat masih bisa menerima perintah dan event.
Bila kita men-`stempel` gambar yang belum dimuat, maka gambarnya akan terlihat setelah gambar selesai di muat.
Perintah ini diperlukan kalau kita benar-benar ingin menunggu semua gambar selesai di muat sebelum melakukan sesuatu.

**Returns:** `boolean`. Bernilai `true` bila semua gambar selesai dimuat.

### `posisiGambar(gbr: Gambar, x:number = 0, y:number = 0): void`  

Mengubah posisi gambar. Kita juga bisa mengubah posisi gambar secara parsial dengan mengubah property `x` atau `y` secara langsung.

**Parameters**

*	`gbr`: `Gambar`  
	Gambar yang akan di pindah
*	`x`: `number`, default 0  
	Posisi x
*	`y`: `number`, default 0  
	Posisi y  

### `ukuranGambar(gbr: Gambar, pjg:number = 32, lbr:number = 32): void`  

Mengubah ukuran gambar. Kita juga bisa mengubah ukuran gambar melalui property `panjang` dan `lebar`.

**Parameters**

*	`gbr`: `Gambar`  
	Gambar yang akan di ubah ukurannya
*	`pjg`: `number`, default 32  
	panjang gambar
*	`lbr`: `number`, default 32
	Lebar gambar

### `geserGambar(gbr: Gambar, x:number = 0, y:number = 0): void`  

Menggeser gambar dengan mengubah property x dan y.

**Parameters**

*	`gbr`: `Gambar`  
	Gambar yang akan digeser
*	`x`: `number`, default 0  
	pergeseran horizontal
*	`y`: `number`, default 0
	pergeseran vertikal

### `putarGambar(gbr: Gambar, n:number = 0): void`  

Memutar gambar.

**Parameters**

*	`gbr`: `Gambar`  
	Gambar yang akan diputar
*	`n`: `number`, default 0  
	besar putaran

## 📝 Input
Perintah-perintah yang berhubungan dengan input seperti mouse, touch, dan keyboard.

### `mouseDitekan(): boolean`

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

### `tombolDitahan(key: string = '')`

mengecek apakah sebuah tombol keybord sedang ditahan

**Parameters**

*	`key`: `string`
	tombol yang sedang ditekan

### `tombolEvent():string `

Mengembalikan informasi tombol terakhir yang terlibat saat ada event keyboard

**Returns:** `string`. tombol yang sedang ditekan


## 📝 Perintah Teks

Perintah-perintah yang berhubungan dengan teks.

### `tulis(teks: string = "", x:number, y:number):void`

Menulis sesuatu di layar

**Parameters**

*	`teks`: `string`, default ""
	teks yang ingin di tulis
*	`x`: `number`, opsional
	posisi x dari tulisan, bila tidak disediakan maka akan sama dengan teks sebelumnya
*	`y`: `number`, optional
	posisi y dari tulisan, bila tidak disediakan maka posisinya adalah di bawah teks sebelumnya

### `ukuranTeks(n:number = 12):void`

Mengeset ukuran teks

**Parameters**

*	`n`: `number`, default 12
	ukuran teks

### `perataanTeks(n:number = 1):void`

Mengatur perataan teks

**Parameters**

*	`n`: `number`, default 1
	perataan: 1: kiri, 2: tengah, 3: kanan


## 📝 menggambar bentuk dasar
Berisi kumpulan perintah untuk menggambar dengan bangun geometri

### `warna(idx: number = 0, trans = 100)`

Mengeset warna isi dari bangun yang digambar

**Parameters**
*	`idx`: `number`, default 0
	nomor dari warna yang dipilih
*	`trans`: `number`, default 100
	transparansi (0 - 100)

### `warnaGaris(idx: number, trans = 100)`

Mengeset warna garis

**Parameters**
*	`idx`: `number`, default 0
	nomor dari warna yang dipilih
*	`trans`: `number`, default 100
	transparansi (0 - 100)

### `tebalGaris(n: number = 1)`

Mengatur ketbalan garis

**Parameters**
*	`n`: `number`, default 1
	tebal garis

### `bukaPath(x: number = 0, y: number = 0): void`  

Perintah ini berfungsi untuk memulai menggambar bentuk yang kompleks.   
Perintah ini bisa di ikuti dengan perintah lain, yaitu: `garisKe()`, `kurvaKe()` dan `lingkaranKe()`.  
Setelah selesai membuat bangun, bisa di akhiri dengan perintah `tutupPath()`  

**Parameters**
*	`x`: `number`  
	Posisi X mulai menggambar.
*	`y`: `number`, default 32  
	Posisi Y mulai menggambar.

### `garisKe(x: number, y: number): void`  

Membuat garis ke posisi tertentu dari posisi terakhir.

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

### `garis(x: number = 100, y: number = 100, x2: number = 500, y2: number = 500): void`  

Membuat garis.

**Parameters**
*	`x`: `number`, defalt 100  
	Posisi x awal garis
*	`y`: `number`, default 100  
	Posisi y awal garis
*	`x2`: `number`, default 500  
	Posisi x akhir garis
*	`y2`: `number`, default 500  
	Posisi y akhir garis

## 📝 Perintah Matematika
perintah umum matematika.

### `akar(n = 4): number`  

Mencari akar dari bilangan

**Parameters**

*	`n`: `number`, default 4
	bilangan yang ingin dicari akarnya

**Returns:** `number`. 

### `pi(): number`

Mengembalikan nilai dari Pi, (3.14 ...)

**Returns:** `number`. 

### `jarak(x: number = 0, y: number = 0): number`

Menghitung jarak dari titik (0, 0) ke suatu titik tertentu 

**Parameters**

*	`x`: `number`, default 0  
	posisi titik x
*	`y`: `number`, default 0  
	posisi titik x

**Returns:** `number`. 

### `jarakSudut(sudut1: number = 0, sudut2: number, min: boolean = true)`

menghitung jarak antar dua sudut

**Parameters**

*	`sudut1`: `number`, default 0
	sudut pertama
*	`sudut2`: `number`, default 0
	sudut kedua
*	`min`: `boolean`, default true
	apakah mencari jarak terdekat, atau jarak terjauh dari dua sudut

**Returns:** `number`. 

### `sudut(x: number, y: number)`

Menghitung sudut dari posisi x dan y terhadap posisi 0, 0

**Parameters**

*	`x`: `number`
	posisi x 
*	`y`: `number`
	posisi xy 

**Returns:** `number`. 

### `polarX(panjang = 100, sudut = 0)`

Posisi X dari koordinat polar.

**Parameters**

*	`panjang`: `number`, default 100
	panjang radius
*	`sudut`: `number`, default 0
	sudut

**Returns:** `number`. 

### `polarY(panjang = 100, sudut = 0)`

Posisi Y dari koordinat polar

**Parameters**

*	`panjang`: `number`, default 100
	panjang radius
*	`sudut`: `number`, default 0
	sudut


**Returns:** `number`. 

### `abs(n: number): number`

Menghasilkan nilai absolute dari suatu bilangan

**Parameters**

*	`n`: `number`, default 0
	bilangan yang ingin dicari nilai absolutenya

**Returns:** `number`. 

### `normalisasiSudut(sdt: number = 0): number`

Menghasilkan sudut yang nilainya antara 0 - 360, dari sebuah sudut

**Parameters**

*	`sdt`: `number`, default 0
	sudut yang ingin dicari nilai normalnya

**Returns:** `number`. 

### `pembulatan(n: number, b: number = 1, type: number = 0): number`

Membulatkan bilangan 

**Parameters**

*	`n`: `number  
	nilai yang ingin dibulatkan
*	`b`: `number`, default 1  
	dasar pembulatan
*	`type`: `number`, default 0  
	type pembulatan: 0: terdekat, 1: pembulatan ke atas, 2: pembulatan ke bawah

