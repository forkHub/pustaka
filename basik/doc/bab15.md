�� Mengubah Ukuran Gambar
Kita bisa ubah ukuran gambar dengan:

let bg = muatImage("bg_bintang.jpg");

let matahari = muatImage("matahari.png");

let roket = muatImage("roket.png");

matahari.x = 142;

matahari.y = 142;

matahari.panjang = 128;

matahari.lebar = 128;

function update() {

gambarImage(bg);

gambarImage(matahari);

gambarImage(roket);

}