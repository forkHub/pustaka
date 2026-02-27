# Kotak

Pada tulisan sebelumnya kita telah belajar menggunakan perintah garis. Sekarang kita akan belajar perintah selanjutnya yaitu `kotak()`.

Perintah kotak memiliki bentuk seperti ini:

```
kotak(100, 150, 300, 250);
```

Artinya kita membuat kotak dari posisi pojok kiri atas 100, 150 hingga ke posisi pojok kanan bawah 300, 250.
Jumlah parameter sama dengan garis yaitu 4. Yang berbeda adalah hasil akhirnya.

Jika dijalankan hasilnya akan tampak seperti berikut:  
[gambar kotak]

Sekarang mari kita ubah latihan sebelumnya dengan mengganti perintah `garis()` dengan `kotak()`:

```
//atap
garis(200, 50, 300, 150);
garis(200, 50, 100, 150);
garis(100, 150, 300, 150);

//bawah
kotak(100, 150, 300, 250);

//pintu
kotak(120, 170, 150, 250);

//jendela
kotak(200, 170, 220, 190);
```

Kita mengganti perintah `garis()` dengan `kotak()`. Jumlah baris sekarang jauh lebih sedikit. Walaupun kita punya perintah `kotak()` yang membutuhkan lebih sedikit perintah, namun kita masih butuh perintah `garis()` untuk menggambar bentuk yang lain seperti atap rumah yang bentuknya segitiga.
