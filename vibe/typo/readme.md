Berikut adalah **algoritma/pendekatan untuk mendeteksi kesalahan typo** (*spelling errors*) **dimulai dari yang paling sederhana**, tanpa menggunakan kode. Saya urutkan dari yang paling mudah hingga yang lebih canggih.

***

## 🔹 1. **Pencocokan Langsung Kamus (Dictionary Lookup) – Paling Sederhana**

**Cara kerja:**

*   Setiap kata diperiksa apakah ada di dalam daftar kata (kamus).
*   Jika tidak ditemukan → dianggap typo.

**Kelebihan:**

*   Sangat mudah.
*   Cepat.

**Kekurangan:**

*   Tidak mengenali nama orang, singkatan, variasi informal, atau bahasa gaul.
*   Tidak memberi saran perbaikan otomatis—hanya mendeteksi.

***

## 🔹 2. **Pencocokan dengan *Stopword* + Kamus**

**Cara kerja:**

*   Gabungkan daftar kata baku + daftar kata umum (stopword).
*   Istilah tidak baku tetapi sering muncul tetap ditoleransi.

**Kelebihan:**

*   Lebih sedikit false negative.
*   Cocok untuk teks umum.

**Kekurangan:**

*   Masih tidak memberi saran perbaikan.
*   Perlu dataset stopword yang cukup lengkap.

***

## 🔹 3. **Algoritma *Edit Distance* (Levenshtein Distance)**

**Cara kerja:**

*   Menghitung seberapa banyak operasi (tambah/hapus/ganti huruf) yang diperlukan untuk mengubah kata salah menjadi kata benar.
*   Semakin kecil jaraknya → semakin mirip.

Contoh:

*   "bukuu" → "buku" = 1 edit

**Kelebihan:**

*   Memberi saran kata terdekat.
*   Akurat untuk kesalahan sederhana.

**Kekurangan:**

*   Tidak tahu konteks kalimat.
*   Bisa memberi saran yang tidak relevan.

***

## 🔹 4. **Algoritma N-Gram (karakter atau kata)**

**Cara kerja:**

*   Kata dipecah menjadi potongan pendek (misal bigram atau trigram).
*   Kemiripan dihitung berdasarkan kesamaan potongan tersebut dengan kata-kata dalam kamus.

Contoh:

*   "buku" → “bu”, “uk”, “ku”

**Kelebihan:**

*   Bagus untuk typo akibat salah tekan keyboard.
*   Lebih toleran terhadap kesalahan besar.

**Kekurangan:**

*   Membutuhkan perhitungan lebih rumit.
*   Tidak mengenali konteks.

***

## 🔹 5. **Model Probabilistik (*Noisy Channel Model*)**

**Cara kerja:**

*   Menganggap kata typo sebagai "sinyal rusak".
*   Mencari kata asli yang paling *mungkin* menyebabkan typo tersebut.

Rumus:  
`kata paling mungkin = kata baku × probabilitas salah ketik`

**Kelebihan:**

*   Lebih realistis (memperhitungkan frekuensi kesalahan umum).
*   Akurat untuk bahasa dengan pola typo spesifik.

**Kekurangan:**

*   Membutuhkan data statistik kesalahan manusia.

***

## 🔹 6. **Koreksi Konteks Kalimat (N-gram Language Model)**

**Cara kerja:**

*   Tidak hanya mengecek kata, tetapi mengecek *kombinasi kata* yang paling masuk akal.

Contoh:

*   "Saya mau makan nasi goreng enak" ✔
*   "Saya mau makan nasi goreng anak" ❌ → perbaikan konteks.

**Kelebihan:**

*   Bisa memperbaiki kata yang benar tetapi salah konteks.
*   Lebih “pintar”.

**Kekurangan:**

*   Butuh banyak data training.

***

## 🔹 7. **Pemodelan AI Modern (Transformer / LLM) — Paling Canggih**

**Cara kerja:**

*   Model bahasa besar memahami struktur bahasa dan konteks global.
*   Memperbaiki typo sekaligus memperbaiki grammar.

**Kelebihan:**

*   Paling akurat.
*   Memahami makna, sinonim, konteks.

**Kekurangan:**

*   Kompleks.
*   Membutuhkan komputasi besar.

***

## 🌟 Ringkasan Urutan Kerumitan

1.  **Kamus** → paling sederhana
2.  **Kamus + stopword**
3.  **Edit Distance (Levenshtein)**
4.  **N-gram karakter**
5.  **Noisy Channel Model**
6.  **Language Model berbasis statistik (N-gram kata)**
7.  **Model AI (Transformer / LLM)** → paling canggih

***

Kalau mau, saya bisa bantu:  
✔ menjelaskan setiap algoritma lebih dalam  
✔ membandingkan akurasi masing-masing  
✔ membuat flowchart langkah demi langkah  
✔ atau menuliskan versi pseudocode (tanpa bahasa pemrograman tertentu)

Mau dilanjutkan ke mana? 😊
