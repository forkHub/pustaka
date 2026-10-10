Berikut adalah draf susunan **Modul 2 Pembelajaran Koding Dasar** yang dirancang secara bertingkat (*scaffolded*). Modul ini menekankan pembentukan alur pikir percabangan (*conditional logic*) dan kemampuan analisis *Higher Order Thinking Skills* (HOTS) tanpa membebankan pemula dengan sintaks yang kaku.

---

# **MODUL 2: LOGIKA PERCABANGAN**
### **"Pintu Keputusan Logis"**

---

### **1. Identitas Modul & Tujuan Pembelajaran**
* **Target Pembelajar**: Pemula (Siswa SMP/SMA atau Pembelajar Awam).
* **Pilar *Computational Thinking***: Dekomposisi & Pengondisian (*If-Else*).
* **Tingkat Kognitif (HOTS)**: C4 (Analisis Percabangan) & C5 (Evaluasi Solusi Logika).
* **Prinsip Utama**: *Logic-First* (memahami alur keputusan), *Analogi Konkret*, dan *Normalisasi Error*.
* **Target Proyek Akhir Modul**: **Gim Tebak Angka Sederhana** atau **Kuis Pilihan Interaktif**.

---

### **2. Pengenalan Konsep & Analogi Konkret**

Sebelum menulis sintaks `if` dan `else`, pahami logika percabangan melalui analogi keputusan dalam kehidupan sehari-hari:

1. **Pintu Keputusan Logis (`If-Else`)**
   * Komputer tidak bisa mengira-ngira; komputer membutuhkan syarat yang jelas untuk mengambil keputusan.
   * **Analogi Sehari-Hari**: *"**Jika** cuaca hujan, **maka** bawa payung; **jika tidak** (cuaca cerah), **maka** pakai topi"*.
2. **Pengecekan Syarat (Kondisi Logis)**
   * Komputer akan memeriksa apakah syarat yang diberikan bernilai **BENAR** atau **SALAH**.
   * Jika **BENAR**, komputer masuk ke "pintu A". Jika **SALAH**, komputer secara otomatis berpindah ke "pintu B".

---

### **3. Sesi 1: Dasar Percabangan (`if` dan `else`)**

Pada sesi ini, siswa diajak memahami bagaimana komputer memilih tindakan berdasarkan masukan data.

#### **Anatomi Kode Percabangan Sederhana**
Gunakan editor **BASIK** untuk menguji alur keputusan berikut:

```javascript
// 1. Menyimpan data jawaban pengguna dalam variabel
let nilaiTebakan = 7;
let angkaRahasia = 7;

// 2. Memeriksa kondisi logika (Percabangan)
if (nilaiTebakan === angkaRahasia) {
    // Dijalankan hanya jika syarat BENAR
    tampilkanPesan("Selamat! Tebakan Anda Tepat!");
    ubahWarnaLatar("hijau");
} else {
    // Dijalankan jika syarat SALAH
    tampilkanPesan("Maaf, tebakan Anda belum tepat.");
    ubahWarnaLatar("merah");
}
```

* **Uji Coba Mandiri (*Hands-On*)**:
  1. Jalankan kode di atas dengan `nilaiTebakan = 7` dan amati layar berubah menjadi **hijau**.
  2. Ubah `nilaiTebakan = 3`, jalankan kembali, dan amati bagaimana komputer secara otomatis beralih mengeksekusi blok `else` (layar menjadi **merah**).

---

### **4. Sesi 2: Penanganan Kejadian (*Event Handling*) & Kondisi Majemuk**

Aplikasi yang interaktif merespons tindakan fisik pengguna, seperti klik mouse atau penekanan tombol (*Event Handling*). Selain itu, keputusan sering kali membutuhkan lebih dari dua pilihan (Kondisi Majemuk).

#### **Struktur Logika Banyak Pintu (`else if`)**

```javascript
let tebakan = 4;
let angkaRahasia = 8;

if (tebakan === angkaRahasia) {
    tampilkanPesan("Tepat sekali!");
} else if (tebakan < angkaRahasia) {
    // Kondisi tambahan jika tebakan terlalu kecil
    tampilkanPesan("Tebakan Anda terlalu KECIL!");
} else {
    // Kondisi jika tebakan terlalu besar
    tampilkanPesan("Tebakan Anda terlalu BESAR!");
}
```

---

### **5. Proyek Praktis (*Hands-On*): Gim Tebak Angka Interaktif**

**Skenario Proyek**: Buatlah aplikasi gim mini tebak angka. Komputer menyimpan angka rahasia dan memberikan umpan balik otomatis (terlalu besar, terlalu kecil, atau benar) setiap kali pemain melakukan interaksi.

#### **Kode Lengkap Proyek (Panduan Siswa)**

```javascript
// === PENGATURAN DATA GIM ===
let angkaRahasia = 7;
let skor = 100;

buatTeks("=== GIM TEBAK ANGKA ===");
buatTeks("Klik tombol untuk menebak angka!");

// === PENANGANAN KEJADIAN (EVENT KLIK) ===
saatDiklik(function() {
    // Simulasi input tebakan dari pemain
    let tebakanPemain = 5; 

    // PERCABANGAN LOGIKA (IF - ELSE IF - ELSE)
    if (tebakanPemain === angkaRahasia) {
        tampilkanPesan("🎉 BENAR! Anda menang dengan skor: " + skor);
        ubahWarnaLatar("hijau");
    } else if (tebakanPemain < angkaRahasia) {
        tampilkanPesan("💡 Tebakan terlalu KECIL! Coba angka lebih besar.");
        skor = skor - 10; // Mengurangi skor saat tebakan salah
    } else {
        tampilkanPesan("💡 Tebakan terlalu BESAR! Coba angka lebih kecil.");
        skor = skor - 10;
    }
});
```

#### **Instruksi Praktik Siswa**:
1. Jalankan kode di atas pada platform BASIK.
2. **Tantangan Modifikasi**:
   * Ubah nilai `angkaRahasia` dan batas pengurangan `skor` sesuai keinginan Anda.
   * Tambahkan pesan khusus jika skor pemain habis (`skor === 0`).

---

### **6. Asesmen & Tantangan HOTS (*Higher Order Thinking Skills*)**

Uji pemahaman alur berpikir logis siswa melalui dua tantangan analisis dan evaluasi berikut:

#### **Tantangan 1: Dekonstruksi Logika Diskon (C4 - Analisis Alur)**
Seorang siswa merancang program penentu diskon toko sebagai berikut:

```javascript
let totalBelanja = 150000;

if (totalBelanja > 50000) {
    tampilkanPesan("Anda mendapat Diskon 10%!"); // Baris A
} else if (totalBelanja > 100000) {
    tampilkanPesan("Anda mendapat Diskon 20%!"); // Baris B
} else {
    tampilkanPesan("Tidak mendapat diskon."); // Baris C
}
```

👉 **Pertanyaan Analisis**:
1. Saat `totalBelanja = 150000`, mengapa program justru memberikan diskon 10% (Baris A) dan tidak pernah mencapai Baris B (Diskon 20%)?
2. Perbaiki urutan pengondisian `if` di atas agar pembeli dengan belanja Rp150.000 mendapatkan diskon 20% yang tepat!

#### **Tantangan 2: *Debugging Puzzle* Operator (C5 - Evaluasi)**
Amatilah potongan kode penentu kelulusan kuis ini:
```javascript
let nilai = 80;

if (nilai = 100) {
    tampilkanPesan("Nilai Sempurna!");
} else {
    tampilkanPesan("Tetap Semangat!");
}
```
👉 **Masalah**: Mengapa kode di atas selalu menampilkan tulisan `"Nilai Sempurna!"` meskipun variabel `nilai` diubah menjadi `50` atau `0`? Temukan kesalahan penggunaan operator penugasan (`=`) dan ganti dengan operator perbandingan yang benar (`===`)!

---

### **7. Panduan Guru & Fasilitasi Kelas**

* **Mencegah Jebakan *Syntax-First***: Jangan terlalu berfokus pada hafalan tanda kurung atau titik koma; fokuskan perhatian siswa pada alur percabangan keputusan (*logic-first*).
* **Normalisasi kesalahan (*Error as a Puzzle*)**: Saat siswa menjumpai hasil kuis/gim yang tidak sesuai harapan, ajak mereka merunut baris `if-else` satu per satu menggunakan diagram alur (*flowchart*) sederhana di papan tulis.
* **Penerapan Tutor Sebaya (*Peer Teaching*)**: Pasangkan siswa yang lebih cepat menguasai percabangan untuk mendampingi temannya dalam menganalisis kesalahan pada Tantangan HOTS.

---

💡 Apakah Anda ingin kita melanjutkan ke **Modul 3 (Perulangan & Manipulasi Visual / *Looping & Graphics*)**?