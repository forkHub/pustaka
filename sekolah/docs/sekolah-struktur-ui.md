Siap Fajar! Berikut **struktur halaman + flow user** untuk **Aplikasi Manajemen Sekolah (MVP)** yang selaras dengan fitur & database yang sudah kita susun sebelumnya.  
Struktur ini disusun agar mudah diimplementasikan ke **Web App** (Admin/Guru) dan **Mobile/Web Lite** (Siswa/Ortu).

***

# 🧭 **1. Role dan User Flow Utama**

Aplikasi ini minimal punya 4 role:

| Role          | Core Activities                                              |
| ------------- | ------------------------------------------------------------ |
| **Admin**     | Mengelola sekolah, user, kelas, jadwal, keuangan, pengumuman |
| **Guru**      | Absensi kelas, input nilai, lihat jadwal, lihat siswa        |
| **Siswa**     | Lihat jadwal, nilai, absensi, tagihan                        |
| **Orang Tua** | Monitor nilai, absensi, tagihan                              |

Flow setiap role akan berbeda, tapi sebagian halaman berbagi data.

***

# 🗂️ **2. Struktur Halaman per Role**

***

# 🟦 **A. ADMIN**

## **Dashboard**

*   Ringkasan siswa, guru, total kelas
*   Kehadiran hari ini
*   Tagihan SPP outstanding
*   Pengumuman terbaru

***

## **Manajemen Sekolah**

1.  **Data Sekolah**
    *   Profil sekolah
    *   Tahun ajaran & semester
2.  **Users**
    *   Guru
    *   Siswa
    *   Orang tua
    *   Admin/operator
3.  **Kelas**
    *   Rombel
    *   Wali kelas
    *   Anggota kelas

***

## **Akademik**

1.  **Mata Pelajaran**
2.  **Jadwal Pelajaran**
3.  **Penugasan Guru -> Mapel -> Kelas**
4.  **Absensi Rekap**
    *   Siswa
    *   Guru

***

## **Penilaian**

1.  Data Nilai per kelas
2.  Rekap nilai per mapel
3.  Rekap rapor per semester
4.  Cetak/Generate raport (PDF)

***

## **Keuangan**

1.  Master biaya (SPP / lain)
2.  Tagihan siswa (invoice)
3.  Pembayaran (input manual)
4.  Riwayat pembayaran
5.  Outstanding per siswa

***

## **Pengumuman & Notifikasi**

1.  Buat pengumuman
2.  Target audien (semua / siswa / guru / kelas)
3.  Distribusi notifikasi
4.  Log pengiriman

***

# 🟩 **B. GURU**

## **Dashboard Guru**

*   Jadwal hari ini
*   Kelas yang diampu
*   Shortcut absensi
*   Pengumuman dari sekolah

***

## **Kelas Saya**

1.  Daftar kelas yang diampu
2.  Detail kelas:
    *   Daftar siswa
    *   Jadwal kelas
    *   Akses absensi
    *   Akses penilaian

***

## **Absensi**

1.  Pilih kelas
2.  Pilih tanggal (default hari ini)
3.  Input status hadir/sakit/izin/alpha
4.  Simpan

***

## **Penilaian**

1.  Pilih kelas
2.  Pilih mata pelajaran
3.  Buat kegiatan penilaian (UH/Tugas/PTS/PAS)
4.  Input nilai siswa
5.  Rekap nilai otomatis

***

## **Jadwal Mengajar**

*   Tampilkan jadwal harian/mingguan

***

## **Pengumuman**

*   Baca pengumuman sekolah
*   Kirim pengumuman internal ke kelas (opsional)

***

# 🟧 **C. SISWA**

## **Dashboard siswa**

*   Jadwal hari ini
*   Absen hari ini
*   Nilai terbaru
*   Tagihan SPP

***

## **Jadwal Pelajaran**

*   Harian/mingguan
*   Kode mapel + guru + jam

***

## **Nilai**

*   List nilai per mapel
*   Nilai per aktivitas (UH,Tugas,PTS,PAS)
*   Rapor semester

***

## **Absensi**

*   Rekap hadir/sakit/izin/alpha per bulan

***

## **Tagihan**

*   Tagihan aktif / jatuh tempo
*   Riwayat pembayaran
*   Sisa tunggakan

***

## **Pengumuman**

*   List pengumuman terbaru

***

# 🟨 **D. ORANG TUA**

(Hampir sama dengan siswa, tapi lebih ke monitoring)

*   Dashboard (info anak)
*   Nilai → per mapel & rekap
*   Absensi → bulanan
*   Tagihan → outstanding + riwayat
*   Pengumuman sekolah

***

# 🔄 **3. Flow User per Fitur Utama**

***

# **FLOW 1 – User Login**

    User → Login → Validasi role
     IF admin → dashboard admin
     IF guru → dashboard guru
     IF siswa → dashboard siswa
     IF ortu → dashboard ortu

***

# **FLOW 2 – Admin Menambah Tahun Ajaran & Semester**

    Admin → Menu Tahun Ajaran → Tambah TA
         → Tambah Semester 1
         → Tambah Semester 2

***

# **FLOW 3 – Admin Membuat Kelas (Rombel)**

    Admin → Kelas → Tambah Kelas (X IPA 1)
          → Pilih wali kelas
          → Tambah siswa ke rombel

***

# **FLOW 4 – Admin Buat Jadwal**

    Admin → Jadwal Pelajaran
          → Pilih kelas
          → Pilih mapel → pilih guru
          → Tentukan hari & jam

***

# **FLOW 5 – Guru Mengisi Absensi**

    Guru → Dashboard → Kelas Hari Ini → Absensi
         → Pilih status tiap siswa
         → Submit

***

# **FLOW 6 – Guru Input Nilai**

    Guru → Penilaian → Pilih Kelas
         → Pilih Mapel
         → Tambah Assessment (UH/Tugas/PTS/PAS)
         → Input nilai siswa
         → Sistem menghitung rekap otomatis

***

# **FLOW 7 – Admin Men-generate Rapor**

    Admin → Penilaian → Rapor Semester
          → Pilih kelas
          → Generate PDF per siswa
          → Download / distribusi

***

# **FLOW 8 – Admin Membuat Tagihan SPP**

    Admin → Keuangan → Master Biaya
          → Tambah SPP (nominal)
          → Generate invoice otomatis per siswa

***

# **FLOW 9 – Pembayaran SPP**

    Admin → Keuangan → Pembayaran
          → Input pembayaran → Update status invoice

***

# **FLOW 10 – Pengumuman**

    Admin/Guru → Pengumuman → Buat Baru
               → Pilih audience (all/siswa/guru/kelas)
               → Publish → Notifikasi terkirim

***

# 🧱 **4. Struktur Navigasi (Sitemap)**

***

## **ADMIN**

    /dashboard
    /school
    /academic-year
    /semester
    /users
    /users/students
    /users/teachers
    /class-groups
    /subjects
    /schedules
    /attendance/students
    /attendance/teachers
    /assessments
    /report-cards
    /finance/fees
    /finance/invoices
    /finance/payments
    /announcements
    /notifications
    /settings

***

## **GURU**

    /dashboard
    /classes
    /classes/{id}
    /attendance
    /assessments
    /schedule
    /announcements
    /profile

***

## **SISWA**

    /dashboard
    /schedule
    /scores
    /attendance
    /invoices
    /announcements
    /profile

## **ORANG TUA**

    /dashboard
    /child/{id}/scores
    /child/{id}/attendance
    /child/{id}/invoices
    /announcements
    /profile

***

# 🚀 Mau saya buatkan **diagram flow bentuk visual (flowchart)** atau **wireframe**?

Tinggal kasih tahu:

*   Format (PNG / SVG / Text)
*   Level detail (high-level atau per halaman)
