Berikut adalah draf susunan **Modul 3 Pembelajaran Koding Dasar** yang dirancang dengan pendekatan *logic-first*, pengenalan pola (*pattern recognition*), serta manipulasi objek visual interaktif agar konsep perulangan (*looping*) yang abstrak menjadi nyata dan menyenangkan bagi pemula.

---

# **MODUL 3: PERULANGAN & MANIPULASI VISUAL**
### **"Efisiensi & Animasi"**

---

### **1. Identitas Modul & Tujuan Pembelajaran**
* **Target Pembelajar**: Pemula (Siswa SMP/SMA atau Pembelajar Awam).
* **Pilar *Computational Thinking***: Pengenalan Pola (*Pattern Recognition*) & Abstraksi.
* **Tingkat Kognitif (HOTS)**: C4 (Analisis Efisiensi Kode) & C5 (Evaluasi & Optimalisasi Alur Visual).
* **Prinsip Utama**: *Logic-First* (mengidentifikasi proses berulang), *Visual-First* (mengubah konsep perulangan menjadi gerakan visual), dan *Bite-Sized*.
* **Target Proyek Akhir Modul**: **Papan Gambar Interaktif (*Doodle App*)** atau **Simulasi Gerakan Objek Visual**.

---

### **2. Pengenalan Konsep & Analogi Konkret**

Sebelum mempelajari sintaks *looping* dan manipulasi gambar, pahami dua konsep utamanya melalui analogi kehidupan sehari-hari:

1. **Perulangan (*Looping*) adalah "Mesin Cetak Otomatis" atau "Putaran Jarum Jam"**
   * Daripada menuliskan instruksi yang sama sebanyak 50 kali secara manual, kita memberi tahu komputer: *"Kerjakan perintah A sebanyak 50 kali!"*. Kemampuan mengidentifikasi hal yang berulang ini disebut **pengenalan pola (*pattern recognition*)**.
2. **Manipulasi Objek Visual adalah "Bermain Stiker Digital"**
   * Gambar di layar diibaratkan sebagai stiker interaktif yang memiliki posisi koordinat, sudut putaran (*rotation*), serta kemampuan untuk digeser (*drag and drop*).

---

### **3. Sesi 1: Dasar Perulangan (`Looping`) & Pengenalan Pola**

Pada sesi ini, siswa diajak melihat bagaimana perulangan dapat menghemat waktu dan menjadikan kode jauh lebih ringkas.

#### **Anatomi Kode Perulangan Sederhana**
Uji coba perintah perulangan pada platform **BASIK** untuk mencetak elemen secara otomatis:

```javascript
// Mengulangi instruksi tanpa menulis ulang baris kode berkali-kali
ulangi(5, function(i) {
    // Parameter 'i' menyimpan nomor urutan perulangan (0, 1, 2, 3, 4)
    buatTeks("Mencetak stiker ke-" + (i + 1));
});
```

* **Uji Coba Mandiri (*Hands-On*)**:
  1. Jalankan kode di atas dan amati 5 baris teks muncul secara otomatis di layar.
  2. Ubah angka `5` menjadi `50` dan rasakan bagaimana komputer mengeksekusi instruksi berulang dalam sekejap tanpa membuat kode menjadi panjang!

---

### **4. Sesi 2: Manipulasi Objek Visual (Geser, Putar, & Animasi)**

Melalui fungsi bawaan platform **BASIK**, siswa dapat mengelola gambar sebagai objek visual interaktif seperti memuat gambar, menggeser (*drag*), dan memutar posisi objek.

#### **Mengelola Gambar sebagai Objek Interaktif**

```javascript
// 1. Memuat gambar objek dari media
let stikerKarakter = muatGambar("karakter.png");

// 2. Menjadikan gambar dapat digeser dengan mouse/sentuhan (Drag)
aktifkanDrag(stikerKarakter);

// 3. Memutar objek visual
putarGambar(stikerKarakter, 45); // Memutar posisi 45 derajat
```

---

### **5. Proyek Praktis (*Hands-On*): Papan Gambar Interaktif (*Doodle App*)**

**Skenario Proyek**: Buatlah aplikasi papan gambar (*doodle app*) interaktif. Saat pengguna menggeser mouse di layar, program akan melakukan perulangan penempelan stiker visual secara otomatis dan memutar posisi stiker agar hasil lukisan terlihat artistik.

#### **Kode Lengkap Proyek (Panduan Siswa)**

```javascript
// === PENGATURAN AWAL PAPAN ===
ubahWarnaLatar("putih");
buatTeks("🎨 PAPAN DOODLE INTERAKTIF - Geser Mouse untuk Menggambar!");

// === MEMUAT GAMBAR STIKER ===
let stiker = muatGambar("bintang.png");

// === PERULANGAN VISUAL SAAT DRAG (PAPAN GAMBAR) ===
saatMouseDigeser(function(x, y) {
    // Duplikasi stiker secara berulang mengikuti koordinat cursor (x, y)
    let jejakStiker = duplikasiGambar(stiker, x, y);
    
    // Memberikan rotasi acak otomatis agar lukisan bervariasi
    putarGambar(jejakStiker, acak(0, 360));
});

// === TOMBOL BERSIHKAN PAPAN ===
saatTombolDitekan("Space", function() {
    bersihkanLayar();
    buatTeks("🎨 Papan Gambar Dibersihkan! Mulai Menggambar Lagi.");
});
```

#### **Instruksi Praktik Siswa**:
1. Jalankan kode di atas pada platform BASIK.
2. **Uji Coba Interaksi**: Geser kursor mouse di atas area kerja dan amati pola stiker berulang yang membentuk lukisan digital. Tekan tombol *Space* untuk membersihkan papan.
3. **Tantangan Modifikasi**:
   * Ubah gambar `bintang.png` dengan stiker favorit Anda.
   * Modifikasi skala ukuran stiker agar membesar atau mengecil saat digeser.

---

### **6. Asesmen & Tantangan HOTS (*Higher Order Thinking Skills*)**

Uji kemampuan pengenalan pola dan evaluasi efisiensi logika siswa melalui dua tantangan analisis berikut:

#### **Tantangan 1: Analisis Efisiensi Kode (C4 - Analisis Pola)**
Seorang siswa ingin membuat 10 baris pagar visual secara berurutan dan menuliskan kodenya secara manual:

```javascript
// --- KODE MANUAL (TANPA PERULANGAN) ---
buatGambar("pagar.png", 10, 50);
buatGambar("pagar.png", 20, 50);
buatGambar("pagar.png", 30, 50);
// ... ditulis berulang hingga 10 baris ...
```

👉 **Pertanyaan Analisis**:
1. Mengapa cara penulisan manual di atas tidak efisien jika jumlah pagar yang ingin dibuat bertambah menjadi 100 buah?
2. Ubah kode manual di atas menggunakan perintah perulangan (`ulangi`) agar menjadi ringkas dan mudah dikelola (maksimal 4 baris kode)!

#### **Tantangan 2: *Debugging Puzzle* Animasi / Perulangan (C5 - Evaluasi)**
Cermati potongan kode animasi yang dirancang untuk menggerakkan objek visual ini:
```javascript
let posisiX = 10;

ulangi(10, function() {
    posisiX = posisiX + 20;
    // Lupa memperbarui posisi tampilan objek visual di layar
});
```
👉 **Masalah**: Mengapa gambar objek di layar tampak "comet/diam" dan tidak berpindah posisi secara mulus padahal nilai `posisiX` sudah diulang bertambah 10 kali? Jelaskan letak perintah pembaruan posisi visual yang terlewat!

---

### **7. Panduan Guru & Fasilitasi Kelas**

* **Menghindari Contoh Matematika Kering**: Jelaskan manfaat perulangan melalui aplikasi nyata seperti pembuatan animasi, efek stiker, atau pergerakan objek gim, bukan melalui deret angka atau rumus teoretis.
* **Menekankan *Abstraksi***: Tunjukkan bahwa perulangan membantu menyembunyikan detail instruksi yang membosankan sehingga kode menjadi bersih (*clean code*) dan mudah dibaca.
* **Aktivasi Tutor Sebaya (*Peer Teaching*)**: Ajak siswa yang telah berhasil menyelesaikan *Doodle App* lebih awal untuk mendampingi temannya yang masih kesulitan mengatur posisi koordinat gambar.

---

💡 Apakah Anda siap untuk melanjutkan ke **Modul 4 (Integrasi Proyek & Debugging / *Final Project*)**?