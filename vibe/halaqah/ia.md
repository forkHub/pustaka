### 🗺️ Peta Struktur Utama (Global Navigation & Structure)

```
Aplikasi Halaqoh (Day-1 MVP)
 ├── 1. Autentikasi & Akses Admin
 └── 2. Modul Admin (Mobile-First / Monitoring & Manajemen Data)
```

---

### 1. Autentikasi & Gerbang Masuk (Public Area)
* **1.1 Halaman Login Admin**
  * Input Form: Email/Username & Password.
  * Direct Redirect: Masuk langsung ke *Dasbor Utama Admin (2.1)*.

---

### 2. Modul Admin (*Mobile-First Dashboard*)

* **2.1 Dasbor Utama (Monitoring Operasional)**
  * **Metrik Agregat Hari Ini**: Total Santri Hadir vs. Tidak Hadir, Total Halaqah Lapor vs. Belum Lapor.

* **2.2 Manajemen Data Master**
  * **2.2.1 Master Data Guru (Muhaffiz/ah)**
    * Tabel Data Guru (Nama, No. Telp/WhatsApp, Username/Akun Login).
    * Form Tambah / Edit / Hapus Data Guru.
  * **2.2.2 Master Data Santri**
    * Tabel Data Santri (ID/NIS, Nama Lengkap, Kategori/Kelas, Kelompok Halaqah Aktif, **Pilihan Wali Santri Terhubung**).
    * Form Tambah / Edit / Hapus Data Santri.
  * **2.2.3 Master Data Orang Tua / Wali Santri *(Fitur Baru)***
    * **Tabel Data Orang Tua**: Nama Wali/Orang Tua, Nomor WhatsApp Utama, Alamat/Kontak Darurat, & Daftar Anak (Santri) yang Terhubung.
    * **Form Tambah / Edit / Hapus Data Orang Tua**: Input profil wali.
    * **Modul Relasi Santri (Mapping Anak)**: Fitur untuk menghubungkan 1 data Orang Tua dengan 1 atau lebih Santri (untuk penanganan wali yang memiliki beberapa anak di lembaga).
  * **2.2.4 Manajemen Kelompok Halaqah (Mapping)**
    * Daftar Kelompok Halaqah & Form Buat/Edit Kelompok (Penetapan Guru & Mapping Daftar Santri).
    * Modul **Mutasi Santri**: Pindah kelompok halaqah antar-guru.

* **2.3 Log Setoran Masuk**
  * **Live Feed / Tabel Log Master**: Log setoran/absensi real-time dengan filter tanggal, halaqah, santri, atau jenis setoran (*Ziyadah / Muraja'ah*).

* **2.4 Pengaturan Akun Admin**
  * Kelola Profil Admin, Ubah Password, & Logout.