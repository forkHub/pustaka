[Beranda]({{< ref "/" >}})

## 📖 Memulai BASIK

Untuk pengguna daring, BASIK bisa dibuka melalui [alamat ini](https://forkhub.github.io/basik/pg/editor.html). 

Untuk pengguna luring, silakan download dahulu, kemudian ekstrak dan buka file `basik.html` di browser untuk memulai.

Contoh aplikasi sederhana:

```javascript

mulai();
stempel("roket");
  
```

`mulai()` adalah perintah pertama yang berfungsi untuk memulai aplikasi. Perintah ini harus dipanggil pertama kali sebelum memanggil perintah yang lain.

`stempel("roket")` adalah perintah untuk men-stempel gambar ke kanvas. "roket" adalah gambar yang ingin distempel.

Tekan tombol `Jalankan` untuk menjalankan aplikasi. Kita akan melihat gambar roket di pojok kiri atas layar.

Tekan tombol `edit` untuk mengedit kembali.

Selamat!

Kamu telah berhasil membuat aplikasi untuk menampilkan gambar roket. Mari kita lanjutkan lagi.

Ganti kodenya dengan kode berikut:

```javascript

mulai();
stempel("astronot");
  
```

Jalankan lagi (dengan menekan tombol `Jalankan`), maka sekarang akan terlihat gambar astronot di layar.

Jika ingin tahu gambar apa saja yang bisa distempel ke layar, maka bisa dilihat di folder asset. Di situ sudah tersedia banyak gambar untuk dipakai.

Saat ini gambar kita masih di pojok kiri atas layar. Kita akan mengubah posisinya:

Perhatikan kode berikut:

```javascript

mulai();
stempel("astronot", 100, 100);
  
```

Jalankan lagi aplikasinya (Jangan lupa tombol `Jalankan`), maka sekarang posisi astronot tidak di pojok lagi.

Cobalah untuk mengubah-ubah posisi gambarnya, dan lihat perbedaannya.

Gambar astronot saja mungkin kurang menarik, bagaimana kalau astronot dan roket, ditambah dengan background?

Perhatikan kode berikut:

```javascript

mulai();
stempel("bg_bintang");
stempel("roket", 300, 300);
stempel("astronot", 100, 100);
  
```

Jalankan aplikasinya maka akan terlihat gambar roket, astronot dengan background langit.

Coba tambahkan bintang:

```javascript

mulai();
stempel("bg_bintang");
stempel("roket", 300, 300);
stempel("astronot", 100, 100);
stempel("bintang", 500, 300);
stempel("bintang", 400, 50);
stempel("bintang", 40, 40);
  
```

Sekarang langitnya dipenuhi dengan bintang.

Pada tahap ini, kita sudah belajar menggunakan BASIK untuk menempel gambar di layar. Untuk latihan berikutnya bisa dilihat di demo-demo yang sudah disediakan.