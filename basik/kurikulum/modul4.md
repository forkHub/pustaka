Berikut adalah draf susunan **Modul 4 Pembelajaran Koding Dasar**, yang merupakan modul penutup dari seri kurikulum ini. Modul ini berfokus pada integrasi seluruh konsep logika yang telah dipelajari, penerapan keterampilan *Higher Order Thinking Skills* (HOTS) tingkat tinggi (C5 Evaluasi & C6 Kreasi), serta pelatihan *debugging* yang terstruktur.

---

# **MODUL 4: INTEGRASI PROYEK & DEBUGGING**
### **"Merancang Produk Pertama"**

---

### **1. Identitas Modul & Tujuan Pembelajaran**
* **Target Pembelajar**: Pemula (Siswa SMP/SMA atau Pembelajar Awam).
* **Pilar *Computational Thinking***: Dekomposisi, Abstraksi, & Perancangan Algoritma Utuh.
* **Tingkat Kognitif (HOTS)**: C5 (Evaluasi Solusi & *Debugging*) dan C6 (Menciptakan Program Baru).
* **Prinsip Utama**: *Project-Based Learning*, *Logic-First*, Dekonstruksi Kode, dan Normalisasi *Error*.
* **Target Proyek Akhir Modul**: **Gim Mini Interaktif** (seperti gim *platformer* sederhana atau gim ketangkasan berbasis skor).

---

### **2. Pengenalan Konsep & Analogi Konkret**

Sebelum merakit proyek akhir utuh, pahami proses pembuatan program melalui dua analogi mendasar:

1. **Dekonstruksi Kode adalah "Membongkar Mesin Mainan"**
   * Menganalisis program bukan berarti menghafal baris kodenya, melainkan membongkar komponen-komponennya (variabel, percabangan, perulangan, dan grafik) untuk memahami bagaimana tiap suku cadang saling terhubung sebelum merakit mainan baru.
2. **_Debugging_ adalah "Mencari Teka-Teki Logika"**
   * *Bug* atau *error* bukan tanda kegagalan atau ketidakmampuan. Pesan *error* adalah petunjuk logis dari komputer yang memberitahu di mana letak alur pemikiran yang perlu diperbaiki.

---

### **3. Sesi 1: Dekonstruksi & Integrasi Kode Program**

Pada sesi ini, siswa diajak menganalisis bagaimana modul-modul sebelumnya disatukan ke dalam satu arsitektur program yang padu.

#### **Pemetaan Integrasi Komponen Koding**
Siswa mengidentifikasi empat pilar utama dalam aplikasi/gim:
* **Variabel (Modul 1)**: Menyimpan status internal (seperti `skor`, `nyawa`, atau `posisiKarakter`).
* **Percabangan `if-else` (Modul 2)**: Menentukan aturan main (misalnya: *"Jika menyentuh rintangan, mengurangi nyawa"*).
* **Perulangan & Grafis (Modul 3)**: Menggerakkan latar visual, animasi, dan merender objek secara efisien.
* **Penanganan Kejadian (*Event*)**: Merespons tombol kibor atau sentuhan pemain untuk mengendalikan karakter.

---

### **4. Sesi 2: Teknik *Debugging* Logis & *Peer Teaching***

Guna mengatasi rasa frustrasi saat menjumpai kesalahan kode, siswa dibekali langkah *debugging* sistematis:

#### **Panduan 3 Langkah *Debugging* Logis**
1. **Baca Pesan *Error* dengan Tenang**: Identifikasi baris berapa yang ditunjuk oleh editor.
2. **Lacak Nilai Variabel (*Tracing*)**: Periksa apakah isi variabel sesuai dengan yang diharapkan.
3. **Isolasi Masalah**: Matikan atau uji satu blok kode secara terpisah untuk menemukan letak kesalahan logika.

#### **Penerapan Tutor Sebaya (*Peer Teaching*)**
Siswa yang berhasil menemukan dan menyelesaikan *bug* pada programnya diajak menjadi "Dokter Koding" bagi temannya. Metode ini memperkuat pemahaman siswa yang membantu sekaligus mengurangi beban pemeriksaan mandiri oleh pengajar.

---

### **5. Proyek Praktis (*Hands-On*): Gim Mini Interaktif (*Platformer* / Ketangkasan)**

**Skenario Proyek**: Buatlah gim mini interaktif di platform **BASIK** di mana pemain mengendalikan karakter untuk mengumpulkan poin dan menghindari rintangan.

#### **Kode Lengkap Proyek (Panduan Siswa)**

```javascript
// === 1. PENGATURAN STATUS (VARIABEL) ===
let skor = 0;
let nyawa = 3;
let posisiX = 50;

// === 2. MEMUAT OBJEK VISUAL ===
let pemain = muatGambar("karakter.png");
let koin = muatGambar("koin.png");

buatTeks("=== GIM KETANGKASAN MINI ===");
buatTeks("Gunakan Tombol Panah untuk Menggerakkan Karakter!");

// === 3. KONTROL KEJADIAN (EVENT MOVEMENT) ===
saatTombolDitekan("PanahKanan", function() {
    posisiX = posisiX + 20;
    pindahkanGambar(pemain, posisiX, 200);
});

saatTombolDitekan("PanahKiri", function() {
    posisiX = posisiX - 20;
    pindahkanGambar(pemain, posisiX, 200);
});

// === 4. ATURAN GIM & INTEGRASI LOGIKA (IF-ELSE) ===
saatBertabrakan(pemain, koin, function() {
    // Tambah skor saat mengumpulkan koin
    skor = skor + 10;
    tampilkanPesan("⭐ Koin Didapat! Skor: " + skor);
    
    // Pindahkan koin ke posisi baru secara acak
    pindahkanGambar(koin, acak(50, 300), 200);
    
    // Cek Kondisi Kemenangan (C6)
    if (skor >= 50) {
        ubahWarnaLatar("hijau");
        tampilkanPesan("🏆 SELAMAT! Anda Menang dengan Skor: " + skor);
    }
});
```

#### **Instruksi Praktik Siswa**:
1. Salin dan jalankan kode di atas pada editor BASIK.
2. **Uji Coba & Eksperimen**: Jalankan gim, gerakkan karakter menggunakan tombol panah, dan kumpulkan koin hingga skor mencapai 50.
3. **Tantangan Kreasi Mandiri (C6)**:
   * Tambahkan objek rintangan (seperti `bom.png`) yang akan mengurangi `nyawa` jika tersentuh.
   * Buat pesan *"Game Over"* jika `nyawa` habis menjadi 0.

---

### **6. Asesmen & Tantangan HOTS (*Higher Order Thinking Skills*)**

Uji kemampuan tingkat tinggi siswa melalui tantangan evaluasi logika dan presentasi karya mandiri:

#### **Tantangan 1: *Debugging Puzzle* Pergerakan Karakter (C5 - Evaluasi)**
Seorang siswa membuat kode agar karakternya tidak bisa keluar dari batas layar kanan (maksimal `x = 300`):

```javascript
saatTombolDitekan("PanahKanan", function() {
    posisiX = posisiX + 20;
    
    // KESALAHAN LOGIKA
    if (posisiX = 300) { 
        posisiX = 0;
    }
    pindahkanGambar(pemain, posisiX, 200);
});
```

👉 **Pertanyaan Analisis**:
1. Mengapa karakter langsung melompat ke posisi `0` saat tombol ditekan sekali saja? (Petunjuk: Periksa penggunaan operator `=`).
2. Perbaiki kode di atas menggunakan perbandingan bernilai tepat (`>=`) agar batas layar berfungsi dengan logis!

#### **Tantangan 2: Presentasi & Unjuk Karya (*Showcase & Defense*) (C6 - Kreasi)**
Siswa mempresentasikan gim mini buatan sendiri di depan kelas atau kelompok kecil:
* **Penjelasan Alur**: Menjelaskan bagaimana variabel, `if-else`, dan kejadian (*event*) saling terhubung.
* **Cerita *Debugging***: Membagikan satu pengalaman *error* menarik yang sempat dialami dan bagaimana cara mereka memecahkannya secara logis.

---

### **7. Panduan Guru & Fasilitasi Kelas**

* **Rubrik Penilaian Berbasis Logika (HOTS)**: Nilai siswa berdasarkan alur berpikir algoritma, kreativitas pemecahan masalah, dan kemampuan *debugging*, bukan pada hafalan sintaks.
* **Pemberdayaan Asisten *Peer Tutor***: Kelompokkan siswa secara heterogen agar siswa yang sudah mahir dapat membimbing temannya dalam menangani pesan kesalahan.
* **Apresiasi Proses, Bukan Hanya Hasil**: Puji keberhasilan siswa dalam melacak kesalahan (*debugging*) untuk membangun rasa percaya diri dan ketahanan mental dalam belajar koding.

---

💡 Apakah Anda ingin saya buatkan draf silabus ringkas 4 modul ini dalam bentuk tabel jadwal atau rangkuman lembar asesmen guru?