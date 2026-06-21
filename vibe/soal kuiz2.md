Berikut adalah revisi **Spesifikasi Teknis (Spec) Game Math Adventure** yang telah diperbaiki untuk mengatasi celah logika, ambiguitas skor, status level, serta integrasi penyimpanan (*state persistence*).

---

# 📱 1. HOME SCREEN

```
+--------------------------+
|    🧠 MATH ADVENTURE     |
|                          |
|    ▶️ Mulai Petualangan   | 
|                          |
+--------------------------+

```

## 🎯 Tujuan

Memulai atau melanjutkan permainan.

## 🔁 Interaksi

* Klik **Mulai Petualangan** → Masuk ke **2. MAP / LEVEL SCREEN**.

---

# 🗺️ 2. MAP / LEVEL SCREEN

```
+-----------------------------+
|        🗺️ PILIH LEVEL         |
|-----------------------------|
|  [1 ✅]  [2 ✅]  [3 ▶️]      |
|  [4 🔒]  [5 🔒]  [6 🔒]      |
|                             |
|    [ 🏠 Kembali ke Home ]   |
+-----------------------------+

```

* **Status Indikator:** `✅ Selesai (Lulus)` | `▶️ Aktif (Terbuka/Belum Lulus)` | `🔒 Terkunci`

## 🎯 Tujuan

Memilih level yang ingin dimainkan atau kembali ke Home.

## ✅ Aturan (Rules)

1. **Level 1** otomatis terbuka (`▶️ Aktif`) saat pertama kali game dimainkan.
2. **Kondisi Unlock Level:** Level $N$ akan terbuka (`▶️ Aktif`) hanya jika `Level N-1` memiliki status `✅ Selesai` (Lulus).
3. **Perilaku Klik:**
* `✅ Selesai` & `▶️ Aktif` → Bisa diklik untuk masuk/mengulang **3. QUIZ SCREEN**.
* `🔒 Terkunci` → Tidak bisa diklik. Menampilkan toast/pesan: *"Selesaikan level sebelumnya dengan nilai lulus terlebih dahulu!"*



---

# ❓ 3. QUIZ SCREEN

```
+-----------------------------+
| Soal 3 / 10                 |
|                             |
| 7 × 8 = ?                   |
|                             |
| [ 48 ]                      |
| [ 56 ]                      |
| [ 63 ]                      |
| [ 54 ]                      |
|                             |
+-----------------------------+

```

## 🎯 Tujuan

Menjawab soal satu per satu untuk mengumpulkan poin.

## ✅ Aturan Core & State Reset

1. Setiap kali masuk ke Quiz Screen, state berikut **wajib di-reset**:
* `currentQuestionIndex = 0`
* `jumlahBenar = 0`
* `jumlahSalah = 0`
* `skorLevelSekerang = 0`


2. Setiap level memiliki jumlah soal dinamis berdasarkan data JSON.
3. User hanya bisa memilih **1 jawaban** per soal.

## ✅ Mekanisme Jawaban & Skor

* **Jawaban BENAR:**
* `skorLevelSekarang` bertambah $+10$ poin.
* `jumlahBenar` bertambah $+1$.
* Tampilkan **Popup Feedback Benar**.


* **Jawaban SALAH:**
* `skorLevelSekarang` bertambah $+0$ poin (Skor tidak di-reset ke 0 total, melainkan tidak mendapat poin di soal tersebut).
* `jumlahSalah` bertambah $+1$.
* Tampilkan **Popup Feedback Salah** disertai kunci jawaban yang benar.


* **Lock Pilihan:** Setelah opsi diklik, seluruh pilihan jawaban di soal tersebut otomatis *disabled* untuk mencegah manipulasi.

---

# ✅ 4. POPUP FEEDBACK (SETELAH JAWAB)

```
+----------------------------+
|          ✅ BENAR!         |
|                            |
|    Jawaban kamu tepat 🎉   |
|                            |
|         [+10 poin]         |
|       [Selanjutnya]        |
+----------------------------+

```

atau

```
+----------------------------+
|          ❌ SALAH          |
|                            |
|     Jawaban benar: 56      |
|                            |
|          [+0 poin]         |
|       [Selanjutnya]        |
+----------------------------+

```

## 🔁 Interaksi

* Klik **[Selanjutnya]**:
* Tombol langsung *disabled* setelah diklik 1x (mencegah *double-click bypass*).
* Jika belum soal terakhir → Sembunyikan popup, render soal berikutnya.
* Jika sudah soal terakhir → Pindah ke **5. RESULT SCREEN**.



---

# 🎉 5. RESULT SCREEN

```
+----------------------------+
|       🎉 LEVEL SELESAI     |
|----------------------------|
|  ✅ Benar: 8               |
|  ❌ Salah: 2               |
|  ⭐ Skor Sesi Ini: 80      |
|  🏆 Skor Tertinggi: 100    |
|                            |
|    [ 🗺️ Kembali ke Map ]   |
+----------------------------+

```

## ✅ Aturan Kelulusan & Penyimpanan Progres

1. **Syarat Lulus:** $\frac{\text{jumlahBenar}}{\text{totalSoal}} \ge 0.6$ (Minimal $60\%$ jawaban benar).
2. **Konsekuensi Status:**
* Jika **Lulus**: Status level saat ini berubah/tetap `✅ Selesai`. Level berikutnya di-unlock (berubah dari `🔒 Terkunci` menjadi `▶️ Aktif`).
* Jika **Gagal**: Status level saat ini tetap `▶️ Aktif` (harus diulang). Level berikutnya **tetap** `🔒 Terkunci`.


3. **Pencatatan Skor:**
* Jika `skorLevelSekarang > skorTertinggiSebelumnya`, update nilai tertinggi untuk level tersebut di database/penyimpanan.


4. **State Persistence (Local Storage):**
* Setiap kali Result Screen dimuat, simpan data progres (`statusLevel` dan `skorTertinggi`) ke `localStorage` agar data tidak hilang saat browser di-refresh.



---

# 🔗 FLOW NAVIGASI (DENGAN REVISI)

```
       [ Home Screen ]
             ↕
     [ Map Level Screen ] 
             ↓
       [ Quiz Screen ]
             ↓
    [ Popup Feedback ] (Looping per soal)
             ↓
      [ Result Screen ]
             ↓
     (Kembali ke Map)

```

---

# 🎨 SPESIFIKASI TEKNIS & UI/UX

* **Tech Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+), tanpa Canvas, berbasis DOM elemen.
* **Layout:** Fluid & responsive layout berorientasi *mobile-first max-width 480px*.
* **Manajemen Data:** File `soal.js` terpisah mengekspor objek `gameData`.
* **Desain Tombol & Feedback Warna:**
* Hijau (`#2ecc71` / sejenis) = Jawaban benar / Level selesai lulus ✅
* Merah (`#e74c3c` / sejenis) = Jawaban salah / Gagal ❌
* Abu-abu (`#bdc3c7` / sejenis) = Level terkunci 🔒


* **User Experience:**
* Font berukuran besar untuk soal matematika ($\ge 24px$).
* Sentuhan transisi CSS ringan (`transition: all 0.2s ease`) untuk efek *hover*, *scale*, dan *fade-in* pada popup.