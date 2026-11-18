### 📌 Notasi & Keterangan Status SPA
Dalam aplikasi berbasis React SPA, navigasi antarmuka tidak memerlukan pemuatan ulang halaman (*full page reload*). Oleh karena itu, rute dipetakan menggunakan komponen navigasi dengan status sebagai berikut:
*   `[Public]` : Akses terbuka tanpa autentikasi.
*   `[Protected]` : Rute privat yang membutuhkan *Auth Guard* / pembatasan akses sesi admin.
*   `[Main View]` : Tampilan utama yang dipetakan langsung ke URL *React Router*.
*   `[Modal / Drawer]` : Komponen antarmuka melayang (*overlay*) tanpa mengubah rute URL utama.

---

### 🗺️ Struktur Diagram Sitemap (React SPA Hierarchy)

```text
Root App (React Router Container)
│
├── 🔑 PUBLIC ROUTES
│   └── 1.0 Auth Layout
│       └── 1.1 Login Page (`/login`)
│           └── 📄 Form Login Admin (Email/Username & Password)
│
└── 🔒 PROTECTED ROUTES (`/admin` Layout Wrapper)
    │
    ├── 2.1 Dasbor Utama (`/admin/dashboard`)
    │   ├── 📊 Panel Metrik Agregat Hari Ini (Santri Hadir/Absen, Status Halaqah)
    │   └── ⚠️ Tabel Peringatan / Alert Table (Daftar Kelompok Belum Lapor)
    │
    ├── 2.2 Manajemen Data Master (`/admin/master`)
    │   ├── 2.2.1 Data Guru (`/admin/master/guru`)
    │   │   ├── 📄 Tabel Data Guru (Muhaffiz/ah)
    │   │   └── 🗂️ Form Tambah / Edit / Hapus Guru [Modal / Drawer]
    │   │
    │   ├── 2.2.2 Data Santri (`/admin/master/santri`)
    │   │   ├── 📄 Tabel Data Santri (NIS, Nama, Kelompok, Relasi Wali)
    │   │   └── 🗂️ Form Tambah / Edit / Hapus Santri [Modal / Drawer]
    │   │
    │   ├── 2.2.3 Data Orang Tua / Wali (`/admin/master/orang-tua`)
    │   │   ├── 📄 Tabel Data Orang Tua & WhatsApp Utama
    │   │   ├── 🗂️ Form Input Profil Orang Tua [Modal / Drawer]
    │   │   └── 🔀 Modul Relasi Santri / Mapping Anak [Modal / Dialog]
    │   │
    │   └── 2.2.4 Kelompok Halaqah (`/admin/master/halaqah`)
    │       ├── 📄 Daftar Kelompok Halaqah & Mapping Guru-Santri
    │       ├── 🗂️ Form Buat / Edit Kelompok [Modal / Drawer]
    │       └── 🔄 Modul Mutasi Santri (Pindah Kelompok) [Modal / Dialog]
    │
    ├── 2.3 Log Setoran (`/admin/log-setoran`)
    │   └── ⚡ Live Feed / Tabel Log Master Real-time (Filter Tanggal/Halaqah/Jenis)
    │
    └── 2.4 Pengaturan Akun (`/admin/settings`)
        ├── 📄 Kelola Profil Admin & Ubah Password
        └── 🚪 Logout Action (Hapus Token Auth & Redirect ke `/login`)
```

---

### 🛠️ Penerapan Kriteria Sitemap & Arsitektur React

1. **Rute & Layout Wrapper (React Router)**:
   * **`PublicLayout`**: Membungkus rute `/login` tanpa navigasi internal.
   * **`ProtectedLayout`**: Membungkus seluruh modul admin di bawah jalur `/admin/*`, menerapkan komponen *Auth Guard* untuk memeriksa sesi autentikasi sebelum merender tampilan.

2. **Hirarki Dangkal (Shallow Hierarchy)**:
   * Pengguna dapat menjangkau seluruh fungsi operasional (Dasbor, Data Master, Log Setoran, dan Settings) dalam **2 hingga 3 tindakan klik** dari navigasi utama (Level 1: Layout Rute -> Level 2: Main View -> Level 3: Modal Action).

3. **Pengelompokan Logis (Logical Grouping)**:
   * Semua entitas manajemen data induk (Guru, Santri, Orang Tua, dan Kelompok Halaqah) disatukan secara terstruktur di bawah rute **Manajemen Data Master (`/admin/master/*`)**.
   * Aksi penambahan atau penyuntingan data dilakukan via **Modal / Drawer Component**, menjaga konteks halaman tanpa *reload* halaman atau pengalihan rute berlebih.

4. **Notasi Status Terintegrasi**:
   * Modul penambahan baru seperti **Master Data Orang Tua / Wali** dan **Mapping Anak** diberi penanda khusus agar pengembang React mengetahui adanya kebutuhan komponen relasi data baru pada tahap ini.

