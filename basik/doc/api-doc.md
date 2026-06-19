## 📖 Gambaran Umum

BASIK adalah kumpulan perintah/fungsi javascript yang bisa dipakai sebagai media pembelajaran pengenalan koding untuk pemula. BASIK mengenalkan pemrograman kepada pemula dengan membuat aplikasi interaktif berbasis kanvas sederhana. Cocok untuk siswa, guru, atau siapa saja yang ingin belajar dasar pemrograman visual.

Prinsip-prinsip dasar BASIK
- Semua perintah bisa langsung dilihat hasilnya tanpa dibingungkan dengan struktur yang kompleks. 
- Tidak perlu install aplikasi tambahan. BASIK berjalan sepenuhnya di browser.
- Bisa jalan secara daring ataupun luring.
- Format perintah bersifat procedural, menghindari penggunaan format yang kompleks seperti callback, class, dll.

## 📖 Cara pemakaian

Untuk pengguna daring, BASIK bisa di buka melalui alamat berikut: ...  
Untuk pengguna luring, BASIK bisa di buka dengan membuka file `editor.html` di broser untuk memulai.  

Contoh applikasi sederhana:

```
mulai();
stempel("roket");
```

`mulai()` adalah perintah pertama yang berfungsi untuk memulai aplikasi. Perintah ini harus dipanggil pertama kali sebelum memanggil perintah yang lain.  
`stempel("roket")` adalah perintah untuk men-stempel gambar ke kanvas. "roket" adalah gambar yang ingin distempel. 

Untuk mengetahui gambar apa saja yang bisa distempel, Anda bisa membuka folder `asset`. Gunakan nama file sebagai parameter dari perintah `stempel()`.

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

Pada contoh di atas, kita memuat gambar terlebih dahulu, kemudian kita ubah posisi dan ukuran dari gambar tersebut dengan merubah property secara langsung, kemudian menempelkannya ke kanvas. Saat kita memuat gambar terlebih dahulu, maka kita tidak lagi menggunakan nama file sebagai parameter dari perintah `stempel()`. Kita menggunakan nama variable yang dijadikan referensi saat memuat gambar.

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

Di contoah di bawah ini menunjukkan bagaimana kita menghandle event update secara sederhana. Anda cukup membuat fungsi update(), dan fungsi ini akan dipanggil secara otomatis saat applikasi diupdate.

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

BASIK juga menyediakan fungsi bawaan untuk menangani event-event yang berhubungan dengan mouse, touch dan keyboard.

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
	Tulis("");
	roket.rotasi++;
	stempel(roket);
}
```

Pada contoh di atas, kita menggunakan drag dengan tipe 1. User bisa mendrag gambar menggunakan mouse atau touch (bila di handphone). 

Dokumentasi lengkap mengenai cara menghandle event bisa dilihat di [sini](api-doc-event.md)

## 📖 Lisensi

GNU license

***