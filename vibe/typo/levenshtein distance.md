Berikut penjelasan **Levenshtein Distance** dengan cara yang sederhana, jelas, dan tanpa kode—cocok untuk memahami konsepnya secara intuitif.

***

# 🔍 Apa Itu Levenshtein Distance?

**Levenshtein Distance** adalah *ukuran perbedaan* antara dua kata, dihitung berdasarkan **berapa banyak operasi minimum** yang diperlukan untuk mengubah satu kata menjadi kata lainnya.

Tiga jenis operasi yang diperbolehkan:

1.  **Substitusi** → mengganti 1 huruf  
    Contoh: *buku → b**a**ku*
2.  **Insert** → menambah 1 huruf  
    Contoh: *buku → buk**u***
3.  **Delete** → menghapus 1 huruf  
    Contoh: *buku → buk*

> **Levenshtein Distance = jumlah minimum operasi yang diperlukan.**

***

# 🎯 Kenapa Algoritma Ini Penting?

Levenshtein Distance digunakan di:

*   spell checker (deteksi & koreksi typo)
*   sistem pencarian “did you mean?”
*   autocomplete
*   fuzzy matching (pencocokan mirip)
*   analisis linguistik

Karena **semakin kecil jaraknya**, semakin mirip dua kata tersebut.

***

# ✨ Contoh Paling Sederhana

## Contoh 1

Bandingkan:  
**“buku”** dan **“baku”**

Perubahan:

*   *u* → *a* (1 substitusi)

Jadi:
**distance = 1**

***

## Contoh 2

Bandingkan:  
**“kucing”** dan **“kucig”**

Perubahan:

*   hapus huruf *n* (1 delete)

**distance = 1**

***

## Contoh 3

Bandingkan:  
**“makan”** dan **“makanan”**

Perubahan:

*   tambah huruf *a*
*   tambah huruf *n*

**distance = 2**

***

# 🧠 Contoh Detail Lebih Kompleks

Bandingkan:  
**“bukku”** dan **“buku”**

Langkah optimal:

*   hapus satu huruf *k* → “buku”

**distance = 1**

Bandingkan:  
**“salahh”** dan **“salah”**

Langkah optimal:

*   hapus *h* terakhir → 1 operasi  
    **distance = 1**

Bandingkan:  
**“kantor”** dan **“kantong”**

Perubahan minimal:

*   insert *g* setelah *n* (1 operasi)
*   insert *o* (1 operasi)

**distance = 2**

***

# 📏 Intuisi Singkat

Levenshtein mencari **jalan tercepat** mengubah satu kata menjadi kata lain.  
Seperti menghitung:

*   berapa huruf salah?
*   berapa huruf hilang?
*   berapa huruf berlebih?

Semua dihitung sebagai **1 poin**.

***

# 🧩 Kenapa Levenshtein Bagus untuk Koreksi Typo?

Karena typo manusia biasanya:

*   salah ketik 1 huruf → substitusi
*   lupa 1 huruf → delete
*   menekan huruf dua kali → delete
*   kurang satu huruf → insert

Sehingga **kata typo biasanya memiliki jarak kecil** ke kata yang benar.

Contoh kasus koreksi otomatis:

Anda mengetik: **"bukuq"**  
Kandidat:

*   buku → distance 1
*   baku → distance 2
*   bunyi → distance 3

Kata dengan distance terkecil → **paling mungkin benar**

***

# 📝 Ringkasan Inti

| Operasi    | Contoh          | Nilai |
| ---------- | --------------- | ----- |
| Substitusi | buku → baku     | +1    |
| Insert     | makan → makanan | +1    |
| Delete     | kucing → kucig  | +1    |

**Levenshtein Distance = total operasi minimal**.

Semakin kecil nilai → semakin mirip.

***

# 🎁 Mau Penjelasan Tambahan?

Saya bisa bantu kalau mau:

*   ilustrasi langkah demi langkah dalam bentuk tabel
*   perbandingan Levenshtein vs. Damerau–Levenshtein
*   contoh penggunaan dalam spell checker
*   flowchart proses penghitungan distance

Mau lanjut ke bagian mana? 😊
