# Menengal bentuk perintah di javascript

Secara umum, perintah di JavaScript punya bentuk seperti ini:

```
perintah(parameter1, parameter2, ...);
```

Penjelasan bentuk perintah:

Bagian pertama adalah nama perintah. Nama perintah biasanya berupa kata kerja yang terdiri dari satu atau dua kata, contohnya:

```
garis
kotak
tulis
update
prompt
```

jika perintah terdiri dari dua kata, penulisannya disambung dan huruf pertama kata kedua pakai huruf kapital, contohnya:

```
muatImage
buatKanvas
bersihkanLayar
```

Tidak boleh ada spasi di nama perintah! Contoh yang salah: `buat kanvas`

Nama perintah diikuti oleh Kurung buka dan tutup `( )`. Ini adalah tempat untuk menaruh parameter. Parameter itu seperti “info tambahan” yang kita berikan ke perintah.

Contoh:

```
garis(100, 100, 200, 400);
```

Di sini, `100, 100, 200, 400` adalah parameter yang memberi tahu posisi awal dan akhir dari garis yang akan kita buat.
Posisi di buat dalam bentuk koordinat `x, y`. Dua parameter di awal `100, 100` menunjukkan posisi awal, dua parameter terakhir menunjukkan posisi akhir `200, 400`.

Kalau kita baca perintah ini dengan bahasa manusia, maka jadinya akan seperti ini: "Buatlah garis dari posisi koordinat `100,100` ke koordinat `200,400`".

Perintah bisa punya 0, 1, atau lebih banyak parameter. Jika lebih dari satu, pisahkan dengan tanda koma `,`

Parameter bisa bertipe angka (number) atau teks (string). Contoh parameter bertipe angka (number) seperti pada perintah di atas adalah angka 100, 200, 400 dsb.
Parameter bertipe teks (string) biasanya diberi tanda kutip `""`, seperti: "Bismillah", "Nama Saya Umair", dsb.

Contoh:

```
buatKanvas(300, 200);
tulisXY(100, 100, "Bismillah, saya sedang belajar coding");
stempel("gambar", 32, 32);
```

Di akhir perintah biasanya ada titik koma; Ini seperti tanda “selesai”. Tapi tidak apa-apa, kalau kamu lupa, JavaScript kadang masih bisa jalan. Tetap disarankan untuk dibiasakan ya!
