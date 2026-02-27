Berikut penjelasan **N-gram** dengan cara yang sederhana, jelas, dan mudah dibayangkan.

***

# 🔍 Apa Itu N-gram?

**N-gram adalah potongan urutan (sequence) yang terdiri dari *N* elemen**, dan elemen tersebut bisa berupa:

*   huruf (character)
*   kata (word)
*   token lain (simbol, fonem, dll.)

N-gram digunakan untuk **mengukur pola kemunculan** huruf/kata dalam sebuah teks.  
Semakin besar *N*, semakin besar konteks yang bisa dipahami.

***

# 🎯 Contoh N-gram (Berbasis Kata)

Misalnya kalimat:

> **"saya makan nasi goreng"**

Berikut hasil *word n-gram*:

### 1️⃣ **Unigram (N = 1)**

Kata diambil satu-satu.

*   saya
*   makan
*   nasi
*   goreng

### 2️⃣ **Bigram (N = 2)**

Dua kata berurutan.

*   saya makan
*   makan nasi
*   nasi goreng

### 3️⃣ **Trigram (N = 3)**

Tiga kata berurutan.

*   saya makan nasi
*   makan nasi goreng

Semakin besar *N*, pola semakin spesifik—tapi jumlah kemungkinan meningkat.

***

# 🎯 Contoh N-gram (Berbasis Huruf)

Kata: **"buku"**

### Bigram karakter:

*   bu
*   uk
*   ku

### Trigram karakter:

*   buk
*   uku

N-gram karakter bagus untuk mendeteksi **typo**, karena pola huruf tetap mirip meskipun ada kesalahan.

Contoh typo: **"bukku"**

Bigram:

*   bu
*   uk
*   kk
*   ku

Huruf "kk" terlihat tidak umum → bisa dideteksi sebagai anomali.

***

# 🧠 Kenapa N-gram Dipakai?

### 1️⃣ **Spell Checking & Typo Detection**

Jika sebuah kata memiliki pola n-gram yang **tidak mirip** dengan kata umum → kemungkinan typo.

### 2️⃣ **Prediksi Kata**

Smart keyboard / autocomplete memakai probabilitas bigram/trigram.  
Misal bigram "saya mau" → kata berikut yang paling sering adalah "makan", "tidur", dll.

### 3️⃣ **Pemodelan Bahasa (Language Model)**

Sebelum era AI modern (Transformer), n-gram adalah cara paling umum.

***

# 📊 Bagaimana Cara Kerjanya? (Konsep Inti)

Tujuan N-gram biasanya:

### ✔️ Menghitung frekuensi

Misal:  
Bigram "makan nasi" muncul 120 kali dalam dataset.

### ✔️ Menghitung probabilitas

Untuk memprediksi kata berikut:

    P(kata3 | kata1, kata2)

Contoh:
Jika trigram "saya makan nasi" sering muncul, maka model akan percaya itu adalah kalimat yang wajar.

***

# ⚖️ Kelebihan & Kelemahan

## 👍 Kelebihan

*   ✓ Mudah dimengerti
*   ✓ Cepat diimplementasikan
*   ✓ Cocok untuk typo detection (n-gram karakter)
*   ✓ Cocok untuk prediksi kata sederhana

## 👎 Kekurangan

*   ✗ Tidak memahami makna
*   ✗ Semakin besar N → data yang dibutuhkan meledak (sparse)
*   ✗ Tidak bekerja baik pada teks panjang

***

# 📝 Intinya

**N-gram = potongan urutan dari teks untuk mempelajari pola kemunculan.**  
Digunakan untuk spell-checking, text prediction, dan model bahasa dasar.

Jika kamu mau, saya bisa jelaskan:

*   bagaimana N-gram dipakai untuk *typo correction*
*   contoh perhitungan probabilitas
*   atau membuat flowchart N-gram detection

Mau lanjut ke bagian mana? 😊
