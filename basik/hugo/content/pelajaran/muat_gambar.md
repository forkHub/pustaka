[Beranda]({{< ref "/" >}})

# 📖 Memuat Gambar

Pada tulisan sebelumnya kita sudah belajar cara menyetempel gambar ke layar.

Pada tulisan kali ini kia akan membahas bagaimana caranya untuk memuat gambar terlebih dahulu sebelum menyetempelnya ke layar.

Perhatikan kode berikut:

```javascript
mulai();
let roket = muatGambar("roket");
stempel(roket);

```

`muatGambar()` adalah perintah untuk memuat gambar, di contoh ini kita memuat gambar "roket",
menyimpannya ke variable roket, kemudian menyetempelkan ke layar dengan perintah `stempel()`.

Perhatikan disini kita menggunakan variable `roket` sebagai parameter perintah `stempel()` dan tidak menggunakan nama file: "stempel";

Dengan memuat gambar terlebih dahulu dan menyimpannya ke variable, kita akan mendapatkan banyak manfaat, antara lain: kita bisa memutar gambar, mengubah ukuran gambar, dan masih banyak fungsi yang lain lagi.

Perhatikan kode berikut:

```javascript
mulai();
let roket = muatGambar("roket");
putarGambar(roket, 45);
ukuranGambar(roket, 200, 300);
stempel(roket, 220, 120);

```

Bila kode di atas dijalankan, akan terlihat gambar roket dengan ukuran yang lebih besar dengan sudut yang berbeda.

Berikut kode dari latihan sebelumnya yang diganti dengan memuat gambar terlebih dahulu sebelum di stempel ke layar.

```javascript
mulai();
let roket = muatGambar("roket");
let bg = muatGambar("bg_bintang");
let bintang = muatGambar("bintang");

putarGambar(roket, 45);
ukuranGambar(roket, 200, 300);
stempel(bg);
stempel(roket, 220, 120);
stempel(bintang, 500, 300);
stempel(bintang, 400, 50);
stempel(bintang, 40, 40);

```