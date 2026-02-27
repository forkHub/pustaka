�� Event

Event itu seperti kejadian yang terjadi saat aplikasi berjalan. Contohnya:

· Kamu gerakkan mouse ��️

· Kamu klik layar ��

· Gambar selesai dimuat ��️

Nah, saat kejadian itu terjadi, kita bisa membuat program merespons secara otomatis. Seru, kan?

�� Cara Menangani Event di BASIC
Di BASIC, kita bisa menangani event dengan cara membuat function khusus. Nama function-nya sudah ditentukan, jadi tinggal kita isi dengan perintah yang ingin dijalankan.

�� Contoh Event: update
Event Update terjadi berulang kali setiap detik (sekitar 30–60 kali). Cocok banget untuk membuat animasi atau efek yang terus bergerak.

Contoh:

function update() {

bersihkanLayar(); // Bersihkan layar

posisiTeks(mouseX(), mouseY()); // Ambil posisi mouse

tulis("Halo saya sedang belajar pemrograman JavaScript");

}

�� Hasilnya: Tulisan akan mengikuti posisi mouse ke mana pun kamu gerakkan!

��️ Contoh Event: Klik Mouse
Kalau kamu ingin program merespons saat kamu klik layar, kamu bisa pakai function tombolDitekan.

Contoh:

function mouseDitekan() {

posisiTeks(mouseX(), mouseY());

tulis("Bismillah, Saya sedang belajar pemrograman JavaScript");

}

�� Hasilnya: Saat kamu klik, tulisan muncul di tempat kamu klik! Klik sebanyak mungkin dimana saja dan lihat hasilnya.

�� Kesimpulan
Event membuat aplikasi jadi interaktif dan hidup. Kamu bisa:

· Menangani gerakan mouse

· Menangani klik

· Menangani update layar

· Dan banyak lagi!

Kalau kamu suka bikin game atau aplikasi interaktif, belajar event itu wajib banget!