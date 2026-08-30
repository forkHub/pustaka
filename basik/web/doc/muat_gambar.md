Pada tulisan sebelumnya kita menggunakan stempel untuk menempel gambar di layar.

Perintah ini punya banyak kekurangan, misal kita tidak bisa mengatur ukuran gambar, merotasi gambar, dll.

Pada pelajaran kali ini, kita akan menggunakan metode lain, yaitu memuat gambar terlebih dahulu.

Untuk memuat gambar kita gunakan perintah `muatGambar()`.

```
mulai();
let gambar = muatGambar('roket');
stempel(gambar);
```

Perhatikan perbedaan dengan pelajaran sebelumnya, dimana kita bisa langsung menulis `stempel("roket")`, sekarang kita perlu memuat gambar terlebih dahulu dengan perintah `muatGambar()` dan menyimpan hasilnya ke variable `roket`.

Setelah dimuat baru kita stempel gambarnya. Perintah `stempel()` sekarang tidak lagi menggunakan parameter string seperti sebelumnya, melainkan kita menggunakan parameter variable `gambar`.

Keunggulan dari metode ini adalah kita bisa memanipulasi roket, misal dengan mengubah ukuran:

```
mulai();
let gambar = muatGambar('roket');
gambar.panjang = 400;
gambar.lebar = 400;
stempel(gambar);
```

Jalankan kodenya, dan sekarang terlihat roket menjadi tampak lebih besar. Kita juga bisa mengubah sudut.

```
mulai();
let gambar = muatGambar('roket');
gambar.panjang = 400;
gambar.lebar = 400;
gambar.rotasi = 45;
stempel(gambar);
```

Pada latihan sebelumnya kita sudah menggunakan perintah stempel untuk menggambar berbagai benda, sekarang kita akan menggambar lagi hal yang sama dengan perintah yang baru.

Kode sebelumnya:
```
mulai();
stempel("bg_bintang");
stempel("roket", 300, 300);
stempel("astronot", 100, 100);
stempel("bintang", 500, 300);
stempel("bintang", 400, 50);
stempel("bintang", 40, 40);
```

Kode baru:
```
mulai();
stempel("bg_bintang");

let roket = muatGambar("roket");
roket.panjang = 300;
roket.lebar = 300;
stempel(roket, 300, 300);

let astro = muatGambar("astronot.png");
astro.rotasi = 45;
stempel(astro, 100, 100);

stempel("bintang", 500, 300);
stempel("bintang", 400, 50);
stempel("bintang", 40, 40);
```