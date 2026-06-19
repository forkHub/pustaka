# 📱 1. HOME SCREEN

```
+--------------------------+
|    🧠 MATH ADVENTURE     |
|                          |
|   ▶️ Mulai Petualangan   | 
|                          |
|--------------------------+
```

## 🎯 Tujuan:
Memulai atau melanjutkan permainan

## 🔁 Interaksi:
* Klik **Mulai Petualangan** → masuk ke Map (Level 1)

***

# 🗺️ 2. MAP / LEVEL SCREEN

(Grid berbasis card)

```
+-----------------------------+
|      🗺️ PILIH LEVEL         |
|-----------------------------|
|  [1 ✅]  [2 ✅]  [3 🔒]      |
|  [4 🔒]  [5 🔒]  [6 🔒]      |
|                             |
| ⭐ Bintang: 6               |
+-----------------------------+
```

✅ Selesai  
🔒 Terkunci

## 🎯 Tujuan:

Memilih level

## ✅ Rules:

* Level 1 selalu terbuka
* Level berikutnya terbuka jika:
  ```
  level_sebelumnya == selesai
  ```
* Status level:
  * ✅ Selesai → bisa dimainkan ulang
  * 🔒 Terkunci → tidak bisa diklik

## 🔁 Interaksi:

* Klik level terbuka → masuk ke Quiz
* Klik level terkunci → tampilkan pesan:
  ```
  "Selesaikan level sebelumnya dulu"
  ```

***

# ❓ 3. QUIZ SCREEN

```
+-----------------------------+
| ⏱️ 00:30      ❤️❤️❤️        |
|-----------------------------|
| Soal 3 / 10                |
|                             |
|   7 × 8 = ?                |
|                             |
|  [ 48 ]                    |
|  [ 56 ] ✅                 |
|  [ 63 ]                    |
|  [ 54 ]                    |
|                             |
| ███████░░░ 70%             |
+-----------------------------+
```

## 🎯 Tujuan:

Menjawab soal

## ✅ Rules core:

* Setiap level memiliki:
  * Jumlah soal tetap (misal: 10)
  * 1 jawaban benar
* User hanya bisa pilih **1 jawaban**

## ✅ Jawaban:

* Jika **benar**:
  * Tambah skor (+10 misalnya)
  * Lanjut otomatis ke soal berikutnya
* Jika **salah**:
  * Skor dikurangi (-5)
  * Tampilkan pesan kesalahan dan berikan jawaban yang benar
  * lanjut otomatis ke soal berikutnya


## ✅ Timer (opsional):

* Jika waktu habis:
  * dianggap salah
  * lanjut ke soal berikutnya

## ✅ Progress:

```
progress = (soal_ke / total_soal)
```

## 🔁 Interaksi:

* Klik jawaban → lock pilihan → tampilkan feedback
* Tidak bisa klik ulang jawaban


***

# ✅ 4. FEEDBACK (SETELAH JAWAB)

```
+----------------------------+
|         ✅ BENAR!          |
|                            |
|   Jawaban kamu tepat 🎉    |
|                            |
|      [+10 poin]           |
+----------------------------+
```

atau

```
+----------------------------+
|         ❌ SALAH           |
|                            |
|   Jawaban benar: 56       |
|                            |
|   Coba lagi! 💪           |
+----------------------------+
```

***

# 🎉 5. RESULT SCREEN

```
+----------------------------+
|       🎉 LEVEL SELESAI     |
|----------------------------|
|  ✅ Benar: 8              |
|  ❌ Salah: 2              |
|                            |
|  ⭐⭐ (2 Bintang)         |
|                            |
|  [ Lanjut Level ]          |
|  [ Ulangi ]                |
+----------------------------+
```
***

# 🔗 FLOW NAVIGASI

```
Home
  ↓
Map Level
  ↓
Quiz
  ↓
Result
  ↓
Kembali ke Map
```

***

# 🎨 CATATAN DESAIN

* Gunakan **Card / Button UI** (tanpa canvas)
* Warna:
  * Hijau = benar ✅
  * Merah = salah ❌
  * Abu = terkunci 🔒
* Gunakan:
  * Padding yang cukup (biar tidak sempit)
  * Font besar untuk soal
  * Animasi ringan (fade / scale)

***