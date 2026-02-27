# Lingkaran

Perintah `lingkaran()` berfungsi untuk menggambar lingkaran di kanvas

Perintah lingkaran memiliki bentuk seperti ini:

```
lingkaran();
```

Bila dijalankan maka kamu akan melihat gambar lingkaran di layar. Lingkaran ini berada pada posisi 100, 100.

Kita bisa mengubah posisinya dengan menambahkan parameter posisi.

```
lingkaran(400, 200);
```

Bila dijalankan maka kamu akan melihat gambar lingkaran di layar pada posisi yang baru.

Kita bisa juga mengubah radiusnya dengan menambah satu parameter lagi.

```
lingkaran(400, 200, 100);
```

Sekarang lingkarannya berukuran lebih besar.

Parameter selanjutnya adalah untuk menentukan sudut awal dan akhir dari lingkaran. Perhatikan contoh berikut.

```
lingkaran(400, 200, 100, 0, 180);
```

Ini adalah bentuk lengkap perintah `lingkaran()`. Bila dijalankan, kita akan melihat gambar setengah lingkaran bagian bawah.

Kita menggambar lingkaran dari sudut 0 derajat ke sudut 180.

Sudut di javascript berjalan searah jarum jam,
berkebalikan dengan sudut yang kita pelajari di pelajaran matematika di sekolah.
Itulah sebabnya lingkaran yang dihasilkan adalah bagian bawah.

Awalnya mungkin agak bingung, tapi kita harus membiasakannya.

Bila ingin menggambar setengah lingkaran bagian atas kita bisa mulai dari sudut 180 ke sudut 360.

```
lingkaran(400, 200, 100, 180, 360);
```

Perintah `lingkaran()` memiliki parameter lebih banyak dari perintah `kotak()` maupun `garis()`, tapi kita tidak perlu menulis semuanya.
Javascript adalah bahasa pemrograman yang fleksibel.

## Latihan:

Cobalah untuk membuat gambar sebuah masjid. Gunakan perintah `kotak()` dan `lingkaran()`.

hasilnya adalah seperti ini:
[gambar masjid]
