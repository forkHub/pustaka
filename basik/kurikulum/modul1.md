Berikut adalah draf susunan **Modul 1 Pembelajaran Koding Dasar** yang dirancang khusus untuk pemula. Modul ini disusun menggunakan pendekatan *logic-first*, penyampaian *bite-sized*, serta penekanan pada *Higher Order Thinking Skills* (HOTS) agar siswa dapat membangun alur pikir komputasional tanpa merasa terintimidasi oleh kerumitan sintaks.

---

# **MODUL 1: PERKENALAN & QUICK WIN**
### **"Membuat Komputer Berbicara & Bereaksi"**

---

### **1. Identitas Modul & Tujuan Pembelajaran**
* **Target Pembelajar**: Pemula (Siswa SMP/SMA atau Pembelajar Awam).
* **Pilar *Computational Thinking***: Perancangan Algoritma (*Algorithm Design*) & Dekomposisi.
* **Tingkat Kognitif (HOTS)**: C4 (Analisis Alur Perintah & Dekonstruksi Kode).
* **Prinsip Utama**: *Logic-First* (fokus alur pikir, bukan hafalan sintaks), *Quick Win* (berhasil dalam 5 menit pertama), dan *Bite-Sized*.
* **Target Proyek Akhir Modul**: **Aplikasi Kartu Ucapan Interaktif**.

---

### **2. Pengenalan Konsep & Analogi Konkret**

Sebelum menyentuh papan ketik, pahami dua konsep dasar koding melalui analogi sederhana:

1. **Kode adalah Resep Langkah demi Langkah (Algoritma)**
   * Komputer adalah asisten yang sangat patuh tetapi tidak bisa berpikir sendiri. Komputer membaca dan menjalankan perintah baris demi baris, tepat dari atas ke bawah secara berurutan. Jika urutan resep terbalik, hasilnya akan salah!
2. **Variabel adalah "Kotak Kardus Berlabel"**
   * Bayangkan Anda memiliki kardus kosong dan menempelkan label **`namaPenerima`** di luar kardus tersebut. Di dalam kardus itu, Anda memasukkan kertas bertuliskan **`"Budi"`**. Kapan pun komputer melihat label kardus tersebut, komputer akan membuka kardus dan mengambil isi di dalamnya.

---

### **3. Sesi 1: Quick Win (5 Menit Pertama)**

Pada sesi ini, siswa langsung berinteraksi dengan lingkungan belajar **BASIK** (editor luring/daring interaktif yang tidak memerlukan instalasi *server* dan memberikan umpan balik langsung).

#### **Aktivitas 1: Membuat Komputer Menyapa**
Buka editor BASIK, ketik dua baris perintah berikut di lembar kerja, lalu tekan tombol **Jalankan / Run**:

```javascript
// Langkah 1: Siapkan kotak variabel
let nama = "Budi";

// Langkah 2: Tampilkan pesan
tampilkan("Selamat Datang, " + nama + "!");
```

🎯 **Apa yang Terjadi?**
Dalam hitungan detik, layar akan menampilkan tulisan: **`Selamat Datang, Budi!`**. Siswa mendapatkan *Quick Win* pertama mereka tanpa perlu menginstal aplikasi rumit.

#### **Aktivitas 2: Eksperimen Mandiri (*Hands-On*)**
* Ubah teks `"Budi"` dengan nama Anda sendiri.
* Amati bagaimana tampilan di layar berubah secara langsung.

---

### **4. Sesi 2: Memahami Variabel & Instruksi Berurutan**

#### **Anatomi Kode Sederhana**
Mari bedah bagaimana instruksi bekerja secara bertahap (*scaffolded*):

```javascript
// 1. Deklarasi Variabel (Membuat Kotak & Mengisi Data)
let ucapan = "Selamat Ulang Tahun!";
let warnaLatar = "merah";

// 2. Mengubah Tampilan Visual
buatTeks(ucapan);
ubahWarnaLatar(warnaLatar);
```

* **Urutan Eksekusi**: Komputer selalu membaca dari baris 1, lalu baris 2, hingga selesai.
* **Menghadapi *Error* Tanpa Panik**: Jika lupa menutup tanda petik `"` atau salah mengetik huruf, komputer akan menampilkan pesan kesalahan (*error*). Dalam modul ini, **_error_ diartikan sebagai petunjuk teka-teki logika yang seru untuk dipecahkan**, bukan sebuah kegagalan!

---

### **5. Proyek Praktis (*Hands-On*): Kartu Ucapan Interaktif**

**Skenario Proyek**: Buatlah sebuah kartu ucapan digital interaktif di mana nama penerima disimpan dalam variabel, dan warna serta teks ucapan dapat berubah secara otomatis saat pengguna melakukan interaksi.

#### **Kode Lengkap Proyek (Panduan Siswa)**

```javascript
// === PENGATURAN DATA KARTU (VARIABEL) ===
let penerima = "Siti";
let pengirim = "Andi";
let pesanUcapan = "Selamat Hari Ulang Tahun!";
let warnaFavorit = "biru Muda";

// === TAMPILAN VISUAL ===
buatTeks("Untuk: " + penerima);
buatTeks(pesanUcapan);
buatTeks("Dari: " + pengirim);
ubahWarnaLatar(warnaFavorit);

// === INTERAKSI REAKSI (EVENT) ===
saatDiklik(function() {
    // Ubah pesan dan warna saat kartu diklik
    ubahWarnaLatar("kuning");
    tampilkanPesan("Kartu berhasil dibuka oleh " + penerima + "!");
});
```

#### **Instruksi Praktik Siswa**:
1. Salin dan jalankan kode di atas pada editor BASIK.
2. **Uji Coba Interaksi**: Klik tampilan kartu ucapan dan amati perubahan warna serta munculnya pesan baru.
3. **Tantangan Modifikasi**:
   * Ubah nilai variabel `penerima` dan `pengirim` dengan nama teman sebangku Anda.
   * Ganti `warnaFavorit` dari `"biru Muda"` menjadi warna kesukaan Anda.

---

### **6. Asesmen & Tantangan HOTS (*Higher Order Thinking Skills*)**

Guna menguji pemahaman logika (bukan sekadar menghafal sintaks atau *copy-paste*), selesaikan dua tantangan analisis berikut:

#### **Tantangan 1: Dekonstruksi Kode (C4 - Analisis Alur)**
Seorang siswa menyusun kode berikut untuk kartu ucapannya, namun urutannya berantakan sehingga program mengalami kesalahan:

```javascript
// --- KODE BERANTAK (ACAK) ---
tampilkan(pesan); // Baris A
let pesan = "Semoga Panjang Umur!"; // Baris B
ubahWarnaLatar("hijau"); // Baris C
```

👉 **Pertanyaan Analisis**:
1. Mengapa baris `tampilkan(pesan)` mengalami kesalahan (*error*) jika diletakkan sebelum `let pesan`?
2. Susun kembali urutan baris kode di atas agar komputer dapat mengeksekusi instruksi secara logis dari atas ke bawah!

#### **Tantangan 2: *Debugging Puzzle* (C5 - Evaluasi)**
Cermati potongan kode ini:
```javascript
let namaSiswa = "Budi";
buatTeks("Halo namaSiswa");
```
👉 **Masalah**: Tampilan di layar menunjukkan teks `"Halo namaSiswa"`, bukan `"Halo Budi"`. Jelaskan letak kekeliruan logikanya dan bagaimana cara memperbaikinya!

---

### **7. Panduan Guru & Fasilitasi Kelas**

* **Menciptakan Suasana Bebas Frustrasi**: Dorong siswa untuk membaca pesan kesalahan (*error message*) saat kode tidak berjalan.
* **Aktivasi Tutor Sebaya (*Peer Teaching*)**: Pasangkan siswa yang sudah berhasil menyelesaikan proyek lebih cepat untuk menjadi "Asisten Koding" bagi temannya yang masih mengalami kendala (*bug*). Hal ini mengurangi beban pemeriksaan mandiri oleh guru di kelas besar.
* **Penilaian Logika**: Fokuskan rubrik penilaian pada alur logika algoritma dan keberhasilan interaksi aplikasi, bukan pada kerapihan ejaan atau hafalan istilah.

---

💡 Apakah Anda ingin kita melanjutkan penyusunan **Modul 2 (Logika Percabangan / *If-Else*)** dengan format yang sama, atau ingin menyesuaikan bagian tertentu dari Modul 1 ini terlebih dahulu?