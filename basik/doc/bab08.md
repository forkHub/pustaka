�� Belajar Perulangan dengan Perintah `for`
Kadang-kadang, kita ingin melakukan sesuatu berulang kali. Misalnya, menulis kalimat sebanyak 10 kali atau menghitung dari 1 sampai 100. Kalau kita menulis satu per satu, pasti capek dan lama, kan?

Nah, di JavaScript, ada cara pintar untuk mengulang perintah secara otomatis. Namanya perulangan atau looping. Salah satu jenis perulangan adalah for.

Dengan for, kita bisa membuat kode yang lebih pendek dan rapi!

�� Contoh Perulangan

for (let i = 1; i <= 10; i++) {

tulis("Bismillah, saya sedang belajar pemrograman");

}

�� Hasilnya, perintah tulis() di atas akan ditulis sebanyak 10 kali!

Yuk kita pahami bagian-bagian dari perintah `for` ini:

l let i = 1 → Kita membuat sebuah **variabel** bernama `i`, dan kita isi dengan angka 1.

l i <= 10 → Selama nilai `i` masih kurang dari atau sama dengan 10, perulangan akan terus berjalan.

l i++ → Setelah satu kali perulangan selesai, nilai i akan bertambah 1. Ini sama seperti
i = i + 1.

l tulis(...) → Ini adalah perintah yang akan dijalankan setiap kali perulangan terjadi.

�� Menambahkan Lebih Banyak Perintah

Kita bisa menambahkan lebih dari satu perintah di dalam perulangan. Semua perintah itu harus ditulis di antara tanda { dan }.

for (let i = 1; i <= 5; i++) {

tulis("Bismillah, saya sedang belajar pemrograman");

tulis("Saya senang belajar pemrograman");

}

�� Setiap kali perulangan berjalan, kedua perintah tulis() akan dijalankan.

�� Menampilkan Nilai i
Kita juga bisa menampilkan nilai dari variabel i agar tahu sudah berapa kali perulangan berjalan.

for (let i = 1; i <= 5; i++) {

tulis("Nilai i saat ini: " + i);

tulis("Bismillah, saya sedang belajar pemrograman");

tulis("Saya senang belajar pemrograman");

}

�� Hasilnya:

✨ Indentasi (Menjorok ke Dalam)

Kalau kamu perhatikan, semua perintah di dalam {} ditulis agak menjorok ke kanan. Ini disebut indentasi.

Indentasi membuat kode lebih rapi dan mudah dibaca. Walaupun tidak wajib, sebaiknya kamu biasakan menulis seperti ini.

Kalau kamu pakai editor seperti VS Code atau Notepad++, biasanya indentasi akan dibuat otomatis.
