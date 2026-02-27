Baik, saya akan berikan **ilustrasi langkah Levenshtein Distance** yang *benar‑benar sederhana*, *pelan‑pelan*, dan *visual*, dengan **contoh baru** supaya tidak repetitif.

Kali ini kita gunakan contoh:

# 🔍 Contoh:

Hitung Levenshtein Distance antara:

**"sekolah"** → **"skolah"**

(Satu huruf “e” hilang.)

Jaraknya nanti = **1**, tapi kita hitung lengkap dengan tabel.

***

# 🪜 LANGKAH 1 — Buat Tabel Dasar

Tulis kata pertama di atas (horizontal), kata kedua di samping kiri (vertikal).  
Tambahkan kolom/baris kosong di awal.

             s  e  k  o  l  a  h
           -----------------------
           |
    s      |
    k      |
    o      |
    l      |
    a      |
    h      |

***

# 🪜 LANGKAH 2 — Isi Baris & Kolom Pertama

Ini adalah jumlah operasi insert/delete dasar.

               s  e  k  o  l  a  h
             -----------------------
          0 | 1  2  3  4  5  6  7
    s     1 |
    k     2 |
    o     3 |
    l     4 |
    a     5 |
    h     6 |

***

# 🪜 LANGKAH 3 — Isi Tabel Menggunakan Aturan Levenshtein

Aturan setiap sel = minimum dari:

1.  **Diagonal (↖)** + 0 jika huruf sama, atau +1 jika beda
2.  **Kiri (←)** +1  (insert)
3.  **Atas (↑)** +1  (delete)

Kita isi pelan‑pelan, baris demi baris.

***

# 🪜 LANGKAH 4 — Isi Tabel

### **Baris untuk huruf 's'**

Bandingkan “s” dengan tiap huruf di atas:

*   s vs s → sama → nilai diagonal = 0
*   s vs e → beda → 1
*   s vs k → beda → 2
*   s vs o → beda → 3
*   s vs l → beda → 4
*   s vs a → beda → 5
*   s vs h → beda → 6

Hasil sementara:

               s  e  k  o  l  a  h
             -----------------------
          0 | 1  2  3  4  5  6  7
    s     1 | 0  1  2  3  4  5  6
    k     2 |
    o     3 |
    l     4 |
    a     5 |
    h     6 |

***

### **Baris untuk huruf 'k'**

*   k vs s → beda → 1
*   k vs e → beda → 2
*   k vs k → sama → diagonal = 1
*   k vs o → beda → 2
*   k vs l → beda → 3
*   k vs a → beda → 4
*   k vs h → beda → 5

<!---->

               s  e  k  o  l  a  h
             -----------------------
          0 | 1  2  3  4  5  6  7
    s     1 | 0  1  2  3  4  5  6
    k     2 | 1  1  1  2  3  4  5
    o     3 |
    l     4 |
    a     5 |
    h     6 |

***

### **Baris untuk huruf 'o'**

*   o vs s → 2
*   o vs e → 2
*   o vs k → 2
*   o vs o → diagonal = 1
*   o vs l → 2
*   o vs a → 3
*   o vs h → 4

<!---->

               s  e  k  o  l  a  h
             -----------------------
          0 | 1  2  3  4  5  6  7
    s     1 | 0  1  2  3  4  5  6
    k     2 | 1  1  1  2  3  4  5
    o     3 | 2  2  2  1  2  3  4
    l     4 |
    a     5 |
    h     6 |

***

### **Baris untuk huruf 'l'**

*   l vs s → 3
*   l vs e → 3
*   l vs k → 3
*   l vs o → 2
*   l vs l → diagonal = 1
*   l vs a → 2
*   l vs h → 3

<!---->

               s  e  k  o  l  a  h
             -----------------------
          0 | 1  2  3  4  5  6  7
    s     1 | 0  1  2  3  4  5  6
    k     2 | 1  1  1  2  3  4  5
    o     3 | 2  2  2  1  2  3  4
    l     4 | 3  3  3  2  1  2  3
    a     5 |
    h     6 |

***

### **Baris untuk huruf 'a'**

*   a vs s → 4
*   a vs e → 4
*   a vs k → 4
*   a vs o → 3
*   a vs l → 2
*   a vs a → diagonal = 1
*   a vs h → 2

<!---->

               s  e  k  o  l  a  h
             -----------------------
          0 | 1  2  3  4  5  6  7
    s     1 | 0  1  2  3  4  5  6
    k     2 | 1  1  1  2  3  4  5
    o     3 | 2  2  2  1  2  3  4
    l     4 | 3  3  3  2  1  2  3
    a     5 | 4  4  4  3  2  1  2
    h     6 |

***

### **Baris untuk huruf 'h'**

*   h vs s → 5
*   h vs e → 5
*   h vs k → 5
*   h vs o → 4
*   h vs l → 3
*   h vs a → 2
*   h vs h → diagonal = 1

<!---->

               s  e  k  o  l  a  h
             -----------------------
          0 | 1  2  3  4  5  6  7
    s     1 | 0  1  2  3  4  5  6
    k     2 | 1  1  1  2  3  4  5
    o     3 | 2  2  2  1  2  3  4
    l     4 | 3  3  3  2  1  2  3
    a     5 | 4  4  4  3  2  1  2
    h     6 | 5  5  5  4  3  2  1

***

# 🎉 HASIL AKHIR

Nilai di pojok kanan bawah:

# ✅ **Levenshtein Distance = 1**

Karena:

> “sekolah” → “skolah”  
> Hanya perlu **1 operasi delete** (hapus huruf “e”).

***

# Mau versi lain?

Saya bisa buat:

🔹 ilustrasi tabel full warna  
🔹 contoh dengan jarak 2 atau 3  
🔹 contoh dengan huruf tertukar (“tngah” → “tengah”)  
🔹 perbandingan visual Levenshtein vs N‑gram

Mau coba contoh apa selanjutnya? 😊
