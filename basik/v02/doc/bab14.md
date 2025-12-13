�� Gambar sebagai Object?
Gambar yang kita muat adalah object. Object itu seperti kotak ajaib yang punya:

· Property (sifat): seperti posisi, ukuran, rotasi

· Method (aksi): seperti bergerak, berputar, dll

Contoh mengatur posisi gambar:

let bg = muatImage("bg_bintang.jpg");

let matahari = muatImage("matahari.png");

let roket = muatImage("roket.png");

matahari.x = 142;

matahari.y = 142;

function update() {

gambarImage(bg);

gambarImage(matahari);

gambarImage(roket);

}

��Artinya: kita geser gambar matahari ke kanan dan ke bawah.
