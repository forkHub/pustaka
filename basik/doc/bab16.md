�� Membuat Gambar Bergerak Ikuti Mouse
Kita bisa buat gambar roket mengikuti posisi mouse:

let bg = muatImage("bg_bintang.jpg");

let matahari = muatImage("matahari.png");

let roket = muatImage("roket.png");

matahari.x = 142;

matahari.y = 142;

matahari.panjang = 128;

matahari.lebar = 128;

function update() {

roket.x = mouseX();

roket.y = mouseY();

gambarImage(bg);

gambarImage(matahari);

gambarImage(roket);

}

��Jika dijalankan, maka roket akan mengikuti kemana mouse bergerak.

Tapi... posisi roket mungkin tidak pas karena pusat gambarnya ada di pojok. Kita bisa ubah pusatnya ke tengah:

let bg = muatImage("bg_bintang.jpg");

let matahari = muatImage("matahari.png");

let roket = muatImage("roket.png");

matahari.x = 142;

matahari.y = 142;

matahari.panjang = 128;

matahari.lebar = 128;

roket.pusatX = 32;

roket.pusatY = 46

function update() {

roket.x = mouseX();

roket.y = mouseY();

gambarImage(bg);

gambarImage(matahari);

gambarImage(roket);

};

�� Sekarang roketnya berada di tengah-tengah kursor
