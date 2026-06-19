# 📝 Gambar sebagai object
BASIK memiliki object bawaan bernama object Gambar.
Object ini dibuat dengan perintah `muatGambar()`.

Object `Gambar` memiliki property sebagai berikut:
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
	apakah gambar sedang di drag
*   `diTekan`: boolean  
	apakah gambar sedang di tekan oleh mouse/jari
*   `tipeDrag`: number  
	tipe drag: 1 = geser, 2 = rotasi, 3 = geser tanpa sentuh, 4 = rotasi tanpa sentuh
*   `dimuat`: boolean  
	apakah gambar sudah selesai di muat
*   `frame`: number  
	nomor frame aktif, bila gambar berupa animasi spritesheet
*   `panjangFrame`: number  
	panjang dari tiap frame dalam animasi, bila gambar berupa animasi spritesheet. 
*   `lebarFrame`: number  
	lebar dari tiap frame, bila gambar berupa animasi spritesheet
*   `dragAwalX`: number  
	posisi awal x saat gambar mulai di drag
*   `dragAwalY`: number  
	posisi awal y saat gambar mulai di drag
*   `ditekan`: boolean  
	apakah gambar sedang di tekan


