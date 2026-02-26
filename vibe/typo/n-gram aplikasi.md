Berikut penjelasan **bagaimana N‑gram digunakan untuk melakukan koreksi typo**, dengan alur yang runtut dan contoh praktis agar mudah dipahami.

***

# 🔧 Konsep Dasar: N‑gram untuk Koreksi Typo

Dalam koreksi typo, **N‑gram (biasanya karakter N‑gram)** digunakan untuk:

1.  **Mendeteksi kata yang terasa “aneh”** karena pola hurufnya tidak umum.
2.  **Membandingkan kata typo dengan kata-kata valid** untuk melihat kata mana yang paling mirip pola N‑gram-nya.
3.  **Memberi saran kata yang paling masuk akal** berdasarkan kemiripan pola N‑gram.

Jadi idenya:

> **Jika pola huruf kata tertentu sangat berbeda dari pola umum dalam kamus / corpus, kemungkinan itu typo.**

***

# 🧠 1. DETEKSI typo menggunakan N‑gram karakter

Misal kata dalam teks:

> **“bukku”**  
> (tujuannya mungkin “buku”)

## ✔️ Langkah 1 — Buat karakter N‑gram (biasanya bigram)

Contoh **bigram** kata umum *"buku"*:

*   bu
*   uk
*   ku

Contoh bigram kata typo *"bukku"*:

*   bu
*   uk
*   kk ← **tidak umum**
*   ku

## ✔️ Langkah 2 — Cek apakah n‑gram tadi sering muncul dalam corpus bahasa

Bigram **“kk”** biasanya memiliki frekuensi sangat rendah → sinyal bahwa kata mengandung kesalahan.

***

# 🧠 2. Mencari Kandidat Perbaikan (“Candidate Generation”)

Asumsikan kata “bukku” salah. Sistem harus mencari kata-kata mirip dari kamus.

Cara kerja:

*   Bandingkan N‑gram kata typo dengan N‑gram setiap kata di dalam kamus.
*   Hitung **skor kemiripan** (misalnya Dice coefficient, Jaccard, Cosine similarity).

Contoh kata kandidat:

*   buku
*   baku
*   batu
*   bukit

Bandingkan bigram tiap kata dengan “bukku”.

### Bigram "bukku"

{bu, uk, kk, ku}

### Bigram "buku"

{bu, uk, ku}

Bagian yang cocok:

*   bu
*   uk
*   ku

Kecocokan sangat tinggi → “buku” akan mendapat skor tertinggi.

***

# 🧮 3. Menghitung Skor Kemiripan (Similarity Scoring)

Salah satu cara terkenal: **Dice Coefficient**.

Formula:

    Skor = 2 × |intersect| / (|ngram_typo| + |ngram_kata|)

Misalnya:

| Kata | Intersect        | Skor          |
| ---- | ---------------- | ------------- |
| buku | {bu, uk, ku} → 3 | Sangat tinggi |
| baku | {bu, ku} → 2     | Sedang        |
| batu | {bu} → 1         | Rendah        |

Kata dengan skor tertinggi → kandidat utama untuk koreksi.

***

# 🧠 4. Memilih Koreksi Terbaik Menggunakan Frekuensi

Jika ada beberapa kandidat dengan skor mirip, sistem memilih:

*   kata yang paling **sering** muncul dalam bahasa
*   atau kata yang paling cocok secara **konteks kalimat**

Contoh:
“saya membaca bukku di perpustakaan”

Kandidat:

*   buku (paling mirip + paling sering digunakan → dipilih)
*   baku → tidak cocok dalam konteks

***

# 📌 Ringkasan Proses N‑gram untuk Koreksi Typo

1.  **Buat n‑gram** dari kata input (biasanya bigram/trigram karakter).
2.  **Bandingkan frekuensi n‑gram** input dengan n‑gram yang dikenal dalam corpus.
3.  Jika pola langka → kata dicurigai typo.
4.  **Cari kata-kata mirip** dari kamus berdasarkan kesamaan N‑gram.
5.  **Hitung skor kemiripan** antara kata salah dan kandidat.
6.  Pilih hasil terbaik → saran koreksi.

***

# 🎯 Kenapa N‑gram Efektif untuk Typo?

*   Kesalahan ketik biasanya hanya mengubah **beberapa huruf**.
*   N‑gram karakter sangat sensitif terhadap perubahan lokal.
*   Tidak perlu paham arti kata untuk mengenali pola salah.

***

# 📘 Contoh Lain

Kata typo:

> **"kantog"**

N‑gram trigram:

*   kan
*   ant
*   nto
*   tog ← tidak umum

Dari kamus:

*   kantor → {kan, ant, nto, tor}
*   kantong → {kan, ant, nto, ton, ong}

“Kantor” lebih dekat → kemungkinan koreksi.

***

# 🧩 Bonus: Kapan N‑gram Dipilih daripada Levenshtein?

N‑gram lebih kuat ketika:

*   Typo **berada di tengah** kata.
*   Banyak calon perbaikan perlu dipertimbangkan cepat.
*   Bahasa memiliki struktur huruf yang khas (contoh: Indonesia, Inggris).

***

Kalau kamu mau, saya bisa lanjutkan dengan:

📌 contoh lengkap langkah per langkah  
📌 penjelasan similarity metrics yang umum digunakan  
📌 diagram alur (flowchart) N‑gram typo correction  
📌 atau perbandingan N‑gram vs Levenshtein vs Noisy Channel

Mau yang mana? 😊
