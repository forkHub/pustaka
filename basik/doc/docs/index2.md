Perintah `stempel()` adalah perintah sederhana untuk menstempel gambar. Perintah ini sangat terbatas fungsinya. Untuk mendapatkan fungsi yang lebih kompleks seperti memutar gambar, mengubah posisi, dll maka kita harus memuat gambar terlebih dahulu.

```
mulai();
let roket = muatGambar("roket");
roket.x = 400;
roket.y = 300;
roket.panjang = 90;
roket.lebar = 70;
stempel(roket);
```

Pada contoh di atas, kita memuat gambar terlebih dahulu, kemudian kita ubah posisi dan ukuran dari gambar tersebut dengan merubah property secara langsung, kemudian menempelkannya ke kanvas. Dengan kita tidak lagi menggunakan nama file sebagai parameter dari perintah `stempel()`. Kita menggunakan nama variable yang dijadikan referensi saat memuat gambar.

Kita juga bisa merubah property dengan perintah yang lebih ringkas.

```
mulai();
let roket = muatGambar("roket");
posisiGambar(roket, 400, 300);
ukuranGambar(roket, 90, 70);
stempel(roket);
```

Daftar perintah lengkap bisa di lihat di [sini](api-doc-gambar.md)

BASIK mendukung aplikasi interaktif dan dinamis dengan menyediakan fungsi bawaan yang menangani mouse, keyboard, update applikasi, dll.

Contoh ini menunjukkan bagaimana kita menghandle event update secara sederhana. Anda cukup membuat fungsi `update()`, maka fungsi ini akan dipanggil secara otomatis saat applikasi diupdate.

```
mulai();
let roket = muatGambar("roket");
pusatGambar(roket, 32, 46);
posisiGambar(roket, 400, 300);

function update() {
	bersihkanLayar();
	roket.rotasi++;
	stempel(roket);
}
```

BASIK juga menyediakan fungsi bawaan untuk menangani event-event yang berhubungan dengan mouse, touch dan keyboard, contoh:

```
mulai();
let roket = muatGambar("roket");
pusatGambar(roket, 32, 46);

function update() {
	bersihkanLayar();
	roket.x = mouseX();
	roket.y = mouseY();
	roket.rotasi++;
	stempel(roket);
}
```

Bila contoh di atas dijalankan, maka Anda akan melihat gambar roket yang berputar sambil bergerak mengikuti mouse.

BASIK juga menyediakan fungsi bawaan untuk menangani interaksi drag. Ada 4 tipe drag yang didukung. Memungkinkan pengguna untuk membuat aplikasi interaktif dengan mudah tanpa memikirkan struktur dan alogrithma yang rumit.

```
mulai();
let roket = muatGambar("roket");
pusatGambar(roket, 32, 46);
posisiGambar(roket, 400, 300);
roket.tipeDrag = 1;

function update() {
	bersihkanLayar();
	roket.rotasi++;
	stempel(roket);
}
```

Pada contoh di atas, kita menggunakan drag dengan tipe 1. User bisa mendrag gambar menggunakan mouse atau touch (bila di handphone). 

Dokumentasi lengkap mengenai cara menghandle event bisa dilihat di [sini](api-doc-event.md)

## 📝 Gambar sebagai object
BASIK memiliki object bawaan `Gambar`.
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


## 📖 Lisensi

GNU license

***