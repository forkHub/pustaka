## 📝 menggambar bentuk dasar
Berisi kumpulan perintah untuk menggambar dengan bangun geometri

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