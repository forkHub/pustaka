�� Percabangan IF
Dalam pemrograman, kita biasanya menulis perintah dari atas ke bawah. Tapi kadang-kadang, kita ingin komputer memilih perintah yang dijalankan berdasarkan kondisi tertentu. Nah, di sinilah kita pakai percabangan IF.

Bayangkan kamu punya robot. Kamu bilang ke robot:

"Kalau jam masih pagi, bilang 'Selamat pagi'. Kalau tidak, bilang 'Selamat siang'."

Robot akan mengecek dulu jamnya, lalu memilih perintah yang sesuai.

�� Bentuk Dasar IF

if (kondisi) {

// perintah yang dijalankan kalau kondisi benar

}

Kondisi biasanya berupa perbandingan, seperti:

l Apakah jam kurang dari 12?

l Apakah cuaca sama dengan "hujan"?

�� Contoh Sederhana

let jam = 8;

if (jam < 12) {

tulis("Hari masih pagi");

}

�� Karena jam = 8, maka kondisi jam < 12 adalah benar, jadi yang dijalankan adalah:

Hari masih pagi

�� IF + ELSE
Kalau kondisi tidak benar, kita bisa tambahkan else untuk memberi pilihan lain.

let jam = 15;

if (jam < 12) {

tulis("Hari masih pagi");

} else {

tulis("Hari sudah sore");

}

�� Karena jam = 15, maka kondisi jam < 12 adalah salah, jadi yang dijalankan adalah:

Hari sudah sore

��️ IF + ELSE IF + ELSE
Kalau ada lebih dari dua pilihan, kita bisa pakai else if:

let cuaca = "mendung";

if (cuaca == "hujan") {

tulis("Bawa payung");

} else if (cuaca == "mendung") {

tulis("Siap-siap payung");

} else {

tulis("Jalan santai");

}

�� Karena cuaca = "mendung", maka yang dijalankan adalah:

Siap-siap payung

�� Kesimpulan
l IF = kalau kondisi benar, jalankan perintah tertentu

l ELSE = kalau kondisi salah, jalankan perintah lain

l ELSE IF = kalau ada banyak kondisi, pilih yang sesuai
