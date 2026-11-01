[Beranda]({{< ref "/" >}})

# 📖 Interaksi

Pada tulisan sebelumnya kita sudah belajar cara memuat gambar dan menyetempelkannya ke layar.

Di tulisan kali ini kita akan membahas tentang interaksi.

BASIK mendukung banyak sekali interaksi, salah satunya adalah interaksi saat mouse digerakkan.

```javascript
mulai();
let roket = muatGambar("roket");

function mouseGerak() {
	stempel(roket, mouseX(), mouseY());
}

```

Bila kode di atas dijalankan, dan kita menggerakkan mouse, maka akan terlihat gambar roket di layar yang terus di gambar mengikuti posisi mouse.

Fungsi `mouseGerak()` adalah fungsi yang menangani saat mouse digerakkan. Di dalam fungsi ini kita memiliki satu perintah, yaitu perintah `stempel()`: yang akan menyetempel gambar roket. 

Perintah `mouseX()` dan `mouseY()` adalah perintah yang akan mengembalikan posisi x dan y dari mouse.

Baris perintah `stempel(roket, mouseX(), mouseY())` artinya kita memerintahkan komputer untuk menyetempel gambar roket ditempat dimana mouse berada.

Perhatikan contoh berikut:

```javascript
mulai();
let roket = muatGambar("roket");

function mouseGerak() {
	bl();
	stempel(roket, mouseX(), mouseY());
}

```

Jalankan lagi perintahnya, dan perhatikan hasilnya. Saat ini layar tampak lebih bersih, dan hanya tampak satu gambar roket saja. 

Kenapa begitu?  karena sekarang ada perintah `bl()` yang berfungsi untuk membersihkan layar. 

Setiap kali mouse digerakkan, maka layar akan dibersihkan terlebih dahulu kemudian gambar roket akan distempel di tempat dimana mouse berada.

**Latihan:**  
Coba ganti fungsi `mouseGerak()` dengan fungsi `mouseDitekan()`. Jalankan kodenya kemudian coba tekan mouse di sembarang tempat, perhatikan apa yang terjadi.
Apa bedanya bila ada perintah `bl()` dan tidak ada perintah tersebut.
