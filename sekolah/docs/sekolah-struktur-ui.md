# 🧭 **1. Role dan User Flow Utama**

Aplikasi ini minimal punya 4 role:

| Role          | Core Activities                                              |
| ------------- | ------------------------------------------------------------ |
| **Admin**     | Mengelola sekolah, user, kelas, jadwal, keuangan, pengumuman |
| **Guru**      | Absensi kelas, input nilai, lihat jadwal, lihat siswa        |
| **Siswa**     | Lihat jadwal, nilai, absensi, tagihan                        |
| **Orang Tua** | Monitor nilai, absensi, tagihan                              |

Flow setiap role akan berbeda, tapi sebagian halaman berbagi data.

# 🗂️ **2. Struktur Halaman per Role**

# 🟦 **A. ADMIN**

## **Dashboard**

*   Ringkasan siswa, guru, total kelas
*   Kehadiran hari ini
*   Tagihan SPP outstanding
*   Pengumuman terbaru

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

## **Akademik**

1.  **Mata Pelajaran**
2.  **Jadwal Pelajaran**
3.  **Penugasan Guru -> Mapel -> Kelas**
4.  **Absensi Rekap**
    *   Siswa
    *   Guru

## **Penilaian**

1.  Data Nilai per kelas
2.  Rekap nilai per mapel
3.  Rekap rapor per semester
4.  Cetak/Generate raport (PDF)

## **Keuangan**

1.  Master biaya (SPP / lain)
2.  Tagihan siswa (invoice)
3.  Pembayaran (input manual)
4.  Riwayat pembayaran
5.  Outstanding per siswa

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
