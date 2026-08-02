Oke, Fajar ✨ aku tambahkan penjelasan di bawah tiap contoh kode agar lebih mudah dipahami oleh pembaca pemula. Jadi bukan hanya melihat sintaks, tapi juga mengerti apa yang terjadi.

---

## 📖 Dokumentasi BASIK (versi dengan penjelasan)

### Contoh 1: Aplikasi paling sederhana
```js
mulai();
stempel("roket");
```
➡️ `mulai()` memulai aplikasi dan menyiapkan kanvas.  
➡️ `stempel("roket")` menempelkan gambar roket ke layar.  
👉 Hasilnya: gambar roket langsung muncul di kanvas.

---

### Contoh 2: Memuat gambar sebagai objek
```js
mulai();
let roket = muatGambar("roket");
roket.x = 400;
roket.y = 300;
roket.panjang = 90;
roket.lebar = 70;
stempel(roket);
```
➡️ `muatGambar("roket")` membuat objek gambar bernama `roket`.  
➡️ Properti `x` dan `y` mengatur posisi di layar.  
➡️ `panjang` dan `lebar` mengatur ukuran gambar.  
➡️ `stempel(roket)` menempelkan gambar sesuai pengaturan.  
👉 Hasilnya: roket muncul di posisi (400,300) dengan ukuran 90×70.

---

### Contoh 3: Menggunakan fungsi ringkas
```js
mulai();
let roket = muatGambar("roket");
posisiGambar(roket, 400, 300);
ukuranGambar(roket, 90, 70);
stempel(roket);
```
➡️ `posisiGambar()` langsung mengatur posisi tanpa perlu menulis `roket.x` dan `roket.y`.  
➡️ `ukuranGambar()` langsung mengatur ukuran tanpa menulis `roket.panjang` dan `roket.lebar`.  
👉 Hasilnya sama dengan contoh sebelumnya, tapi lebih ringkas.

---

### Contoh 4: Update otomatis (animasi)
```js
mulai();
let roket = muatGambar("roket");
pusatGambar(roket, 32, 46);
posisiGambar(roket, 400, 300);

function update() {
    bersihkanLayar();
    roket.rotasi++;
    stempel(roket);
}
```
➡️ `pusatGambar()` menentukan titik pusat rotasi.  
➡️ Fungsi `update()` dipanggil otomatis setiap frame.  
➡️ `bersihkanLayar()` menghapus gambar lama.  
➡️ `roket.rotasi++` menambah sudut rotasi setiap frame.  
👉 Hasilnya: roket berputar terus di posisi tetap.

---

### Contoh 5: Interaksi dengan mouse
```js
mulai();
let roket = muatGambar("roket");
pusatGambar(roket, 32, 46);

function update() {
    bersihkanLayar();
    roket.x = mouseX();
    roket.y = mouseY();
    roket.rotasi++;
    stempel(roket);
}
```
➡️ `mouseX()` dan `mouseY()` membaca posisi mouse.  
➡️ Posisi roket mengikuti pergerakan mouse.  
➡️ Rotasi bertambah setiap frame.  
👉 Hasilnya: roket berputar sambil mengikuti gerakan mouse.

---

### Contoh 6: Drag interaktif
```js
mulai();
let roket = muatGambar("roket");
pusatGambar(roket, 32, 46);
posisiGambar(roket, 400, 300);
roket.tipeDrag = 1;

function update() {
    bersihkanLayar();
    roket.rotasi++;
    stempel(roket);
}
```
➡️ `tipeDrag = 1` membuat roket bisa digeser dengan mouse atau sentuhan.  
➡️ Rotasi tetap berjalan otomatis.  
👉 Hasilnya: roket bisa dipindahkan dengan drag, sambil terus berputar.

---

Dengan penjelasan ini, setiap contoh kode jadi lebih jelas: pembaca tahu **apa yang dilakukan tiap baris** dan **apa hasil akhirnya di layar**.  

Kalau kamu mau, aku bisa lanjut bikin **cheatsheet visual** berisi daftar perintah inti BASIK dengan ilustrasi singkat (misalnya ikon untuk `mulai()`, `stempel()`, `muatGambar()`, dll). Itu akan jadi pegangan cepat yang lebih menarik. Mau aku buatkan versi itu?