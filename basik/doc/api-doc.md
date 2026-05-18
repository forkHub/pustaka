# 📚 Dokumentasi BASIK (DRAFT)

## 📖 Gambaran Umum

BASIK adalah kumpulan perintah/fungsi javascript yang bisa dipakai sebagai media pembelajaran pengenalan koding untuk pemula. BASIK mengenalkan pemrograman kepada pemula dengan membuat aplikasi interaktif berbasis kanvas sederhana. Cocok untuk siswa, guru, atau siapa saja yang ingin belajar dasar pemrograman visual.

Prinsip-prinsip BASIK
- Semua perintah bisa langsung dilihat hasilnya tanpa dibingungkan dengan struktur yang kompleks. 
- Tidak perlu install aplikasi tambahan. BASIK berjalan sepenuhnya di browser.
- Bisa jalan secara daring ataupun luring.

## Cara pemakaian

Buka file `editor.html` di broser untuk memulai.  
BASIK bisa dipakai dengan cara sederhana seperti berikut:

```
buatKanvas(800, 600);
stempel("roket");
```

`buatKanvas()` adalah perintah pertama yang berfungsi untuk memulai semua perintah BASIK. Fungsinya adalah untuk membuat kanvas tempat untuk menggambar.
`stempel("roket")` adalah perintah untuk men-stempel gambar ke kanvas. "roket" adalah nama file dari gambar yang ingin distempel. Perintah `stempel()` bisa menerima perintah berupa nama file langsung atau alamat file secara absolut. Bila dijalankan maka akan terlihat sebuah gambar roket di layar.

Pada contoh ini kita menggunakan gambar "roket" yang sudah tersedia di folder asset. Anda bisa menambahkan sendiri gambar yang dimau, atau bisa juga memuat gambar dengan url yang penuh.

perintah `stempel()` adalah perintah sederhana untuk menempel gambar. Perintah ini sangat terbatas fungsinya. Untuk mendapatkan fungsi yang lebih kompleks seperti memutar gambar, mengubah posisi, dll maka kita harus memuat gambar terlebih dahulu.

```
buatKanvas(800, 600);
let roket = muatGambar("roket");
roket.x = 400;
roket.y = 300;
roket.panjang = 90;
roket.lebar = 70;
stempel(roket);
```

Pada contoh di atas, kita memuat gambar terlebih dahulu, kemudian kita ubah posisi dan ukuran dari gambar tersebut dengan merubah property secara langsung, kemudian menempelkannya ke kanvas.

Kita juga bisa merubah property dengan perintah yang lebih ringkas.

```
buatKanvas(800, 600);
let roket = muatGambar("roket");
posisiGambar(roket, 400, 300);
ukuranGambar(roket, 90, 70);
stempel(roket);
```

BASIK mendukung aplikasi interaktif dan dinamis dengan menyediakan fungsi bawaan yang menangani mouse, keyboard, dan update applikasi.
Untuk menangani update aplikasi, maka user harus menyediakan fungsi update() yang akan dipanggil secara otomatis saat aplikasi di update.

```
buatKanvas(800, 600);
let roket = muatGambar("roket");
pusatGambar(roket, 32, 46);
posisiGambar(roket, 400, 300);

function update() {
	bersihkanLayar();
	roket.rotasi++;
	stempel(roket);
}
```

BASIK menyediakan fungsi bawaan untuk menangani event-event yang berhubungan dengan mouse, touch dan keyboard.

```
buatKanvas(800, 600);
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

BASIK juga menyediakan fungsi bawaan untuk menangani drag. Ada 4 tipe drag yang didukung. Memungkinkan pengguna untuk membuat aplikasi interaktif dengan mudah tanpa memikirkan struktur dan alogrithma yang rumit.

```
buatKanvas(800, 600);
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

Contoh yang lebih kompleks tersedia di halaman resmi BASIK.


### 📄 Lisensi

GNU license

***