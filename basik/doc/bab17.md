�� Membuat Gambar Berputar
Kita bisa buat gambar berputar dengan properti rotasi:

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

matahari.rotasi++;

gambarImage(bg);

gambarImage(matahari);

gambarImage(roket);

}

Tapi supaya rotasinya bagus, kita harus atur pusat rotasinya ke tengah gambar:

let bg = muatImage("bg_bintang.jpg");

let matahari = muatImage("matahari.png");

let roket = muatImage("roket.png");

matahari.x = 142;

matahari.y = 142;

matahari.panjang = 128;

matahari.lebar = 128;

matahari.pusatX = 64;

matahari.pusatY = 64

roket.pusatX = 32;

roket.pusatY = 46

function update() {

roket.x = mouseX();

roket.y = mouseY();

matahari.rotasi++;

gambarImage(bg);

gambarImage(matahari);

gambarImage(roket);

};

�� Kesimpulan
Dengan Image, kita bisa:

· Menampilkan gambar ke layar

· Mengatur posisi dan ukuran

· Membuat gambar bergerak dan berputar

· Membuat tampilan aplikasi jadi keren dan interaktif!
