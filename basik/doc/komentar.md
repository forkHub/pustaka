# Komentar

Pada latihan sebelumnya, kita sudah belajar bagaimana menggambar rumah dengan menggunakan beberapa perintah garis.

Total perintah yang kita gunakan ada 6 baris, jumlahnya akan lebih banyak lagi kalau ditambah dengan pintu dan jendela.

Perintah yang banyak membuat kita bingung membacanya. Untuk membuatnya mudah dibaca, kita akan menambahkan komentar.

Di dalam Javascript komentar ditulis dengan tanda `//` (dua buah garis miring) diikuti dengan komentar yang ingin kita tulis.

```
//atap
garis(200, 50, 300, 150);
garis(200, 50, 100, 150);
garis(100, 150, 300, 150);

//bawah
garis(100, 150, 100, 250);
garis(100, 250, 300, 250);
garis(300, 250, 300, 150);

//pintu
garis(120, 170, 150, 170);
garis(120, 170, 120, 250);
garis(150, 170, 150, 250);

//jendela
garis(200, 170, 220, 170);
garis(200, 170, 200, 190);
garis(220, 170, 220, 190);
garis(200, 190, 220, 190);
```

Pada contoh di atas, kita sudah menambahkan pintu dan jendela. Total garisnya jadi banyak, namun kita bisa membacanya lebih mudah karena kode nya dibagi dalam beberapa bagian dan diberi komentar untuk memberi tahu setiap bagiannya.

Komentar tidak akan dibaca oleh komputer, kita bisa menulis apa saja.
