�� Object Gambar
Dalam dunia coding, kita bisa menampilkan gambar seperti latar belakang, karakter, atau benda-benda lain. Di dalam BASIK, gambar diwakili oleh object bernama Gambar, dan kita bisa mengatur posisi, ukuran, bahkan membuatnya bergerak atau berputar!

��️ Cara Memuat Gambar
Untuk menampilkan gambar, kita gunakan fungsi muatGambar():

let bg = muatImage("bg_bintang.jpg");

Artinya: kita memuat gambar bernama bg_bintang.jpg dan menyimpannya ke dalam variabel bg.

Gambar bg_bintang.jpg ini berada di folder bernama asset. Kamu bisa membuka folder ini untuk melihat gambar apa saja yang tersedia, kamu juga bisa menambahkan gambar kamu sendiri.

�� Menampilkan Gambar ke Layar
Setelah gambar dimuat, kita harus menggambarnya ke layar dengan:

stempel(bg);

Biasanya kita taruh ini di dalam function update() supaya gambar terus muncul saat program berjalan.

�� Menambahkan Banyak Gambar
Kita bisa memuat lebih dari satu gambar:

let bg = muatImage("bg_bintang.jpg");

let matahari = muatImage("matahari.png");

let roket = muatImage("roket.png");

function update() {

gambarImage(bg);

gambarImage(matahari);

gambarImage(roket);

}

�� Hasilnya:
