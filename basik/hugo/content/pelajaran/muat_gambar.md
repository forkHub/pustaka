[Beranda]({{< ref "/" >}})

# 📖 Memuat Gambar

Pada tulisan sebelumnya kita sudah belajar cara menempel gambar ke layar.

Pada tulisan kali ini kia akan membahas bagaimana caranya untuk memuat gambar terlebih dahulu sebelum menempelkan ke layar.

Perhatikan kode berikut:

```
mulai();
let roket = muatGambar("roket");
stempel(roket);
```

`muatGambar()` adalah perintah untuk memuat gambar, di contoh ini kita memuat gambar dengan nama "roket".
Kita menyimpannya ke variable roket, kemudian kita menggunakan variable ini untuk dipakai sebagai parameter perintah `stempel()`.

Disini kita tidak menggunakan parameter "string", melainkan kita menggunakan parameter berupa variable.

Apa keunggulan dari metode ini, dibanding metode sebelumnya?

Dengan memuat gambar terlebih dahulu dan menyimpannya ke variable maka kita akan mendapatkan banyak manfaat, antara lain adalah kita bisa memutar gambar, dan mengubah ukuran gambar.

Sebelumnya kita hanya bisa menentukan posisi gambar.

```
mulai();
let roket = muatGambar("roket");
putarGambar(roket, 45);
ukuranGambar(roket, 200, 300);
stempel(roket, 220, 120);
```

Jalankan kode di atas, maka akan terlihat gambar roket dengan ukuran yang lebih besar dan sudut yang berbeda.

Memuat gambar terlebih dahulu memiliki banyak kelebihan lain, karena sebagian besar perintah BASIK akan membutuhkan gambar untuk dimuat terlebih dahulu.

```
mulai();
let roket = muatGambar("roket");
putarGambar(roket, 45);
ukuranGambar(roket, 200, 300);
stempel("bg_bintang");
stempel(roket, 220, 120);
stempel("bintang", 500, 300);
stempel("bintang", 400, 50);
stempel("bintang", 40, 40);

```