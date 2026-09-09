## 📝 Perintah Matematika
perintah umum matematika.

#### `akar(n = 4): number`  

Mencari akar dari bilangan

**Parameters**

*	`n`: `number`, default 4
	bilangan yang ingin dicari akarnya

**Returns:** `number`. 

#### `pi(): number`

Mengembalikan nilai dari Pi, (3.14 ...)

**Returns:** `number`. 

#### `jarak(x: number = 0, y: number = 0): number`

Menghitung jarak

**Parameters**

*	`x`: `number`, default 0

*	`y`: `number`, default 0

**Returns:** `number`. 

#### `jarakSudut(sudut1: number = 0, sudut2: number, min: boolean = true)`

menghitung jarak antar dua sudut

**Parameters**

*	`sudut1`: `number`, default 0
	sudut pertama
*	`sudut2`: `number`, default 0
	sudut kedua
*	`min`: `boolean`, default true
	apakah mencari jarak terdekat, atau jarak terjauh dari dua sudut

**Returns:** `number`. 

#### `sudut(x: number, y: number)`

Menghitung sudut dari posisi x dan y terhadap posisi 0, 0

**Parameters**

*	`x`: `number`
	posisi x 
*	`y`: `number`
	posisi xy 

**Returns:** `number`. 

#### `polarX(panjang = 100, sudut = 0)`

Posisi X dari koordinat polar.

**Parameters**

*	`panjang`: `number`, default 100
	panjang radius
*	`sudut`: `number`, default 0
	sudut

**Returns:** `number`. 

#### `polarY(panjang = 100, sudut = 0)`

Posisi Y dari koordinat polar

**Parameters**

*	`panjang`: `number`, default 100
	panjang radius
*	`sudut`: `number`, default 0
	sudut


**Returns:** `number`. 

#### `abs(n: number): number`

Menghasilkan nilai absolute dari suatu bilangan

**Parameters**

*	`n`: `number`, default 0
	bilangan yang ingin dicari nilai absolutenya

**Returns:** `number`. 

#### `normalisasiSudut(sdt: number = 0): number`

Menghasilkan sudut yang nilainya antara 0 - 360, dari sebuah sudut

**Parameters**

*	`sdt`: `number`, default 0
	sudut yang ingin dicari nilai normalnya

**Returns:** `number`. 

#### `pembulatan(n: number, b: number = 1, type: number = 0): number`

Membulatkan bilangan 

**Parameters**

*	`x`: `number`, default 0
	posisi x dari tengah lingkaran