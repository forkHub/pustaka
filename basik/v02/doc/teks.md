# Teks

Di bagian ini kita akan belajar menggunakan perintah untuk menulis. Ada beberapa perintah yang akan kita pelajari.

## tulis()

Perintah `tulis()` adalah perintah untuk menulis dilayar. Perintah ini memiliki parameter bertipe `string` atau teks.

Contoh:

```
tulis("Bismillah")
```

Perintah ini akan menampilkan tulisan "bismillah" di layar. Perhatikan parameter ini diawali dan diakhiri dengan tanda petik dua ("). String di javascript selalu di awali dan di akhiri dengan tanda petik dua (").

Mari kita lanjutkan lagi perintahnya:

```
tulis("Bismillah");
tulis("Hari ini saya sedang belajar koding dengan menggunakan BASIK");
```

Perhatikan bahwa tampilan teks di layar terdiri dari dua baris. Perintah tulis() akan otomatis menulis di baris berikutnya setelah perintah tulis() terakhir.

## posisiTeks(x, y)

Perintah `posisiTeks()` mengatur posisi dimana kita akan menulis. Perintah ini mempengaruhi perintah `tulis()` berikutnya.

```
posisiTeks(100, 4s00);
tulis("Bismillah");
tulis("Hari ini saya sedang belajar koding dengan menggunakan BASIK");
```

Perhatikan sekarang tulisan di mulai pada posisi lebih ke bawah dan ke kanan.

## ukuranTeks()

perintah ini akan mengubah ukuran teks. Perintah ini mempengaruhi perintah `tulis()` berikutnya.

```
posisiTeks(100, 4s00);
tulis("Bismillah");
ukuranTeks(10)
tulis("Hari ini saya sedang belajar koding dengan menggunakan BASIK");
```

Perhatikan bahwa tulisan di baris kedua memiliki ukuran lebih kecil. Hal ini karena perintah `ukuranTeks()` berlaku untuk perintah setelahnya dan tidak mempengaruhi perintah sebelumnya.

# Latihan

Pada pelajaran sebelumnya, kamu telah belajar menggambar masjid.  
Sekarang coba beri nama masjid itu dengan menuliskan namanya di tembok masjid.
[gambar masjid dengan nama]
