
***



***



***



## 4) **Flow Admin: Buat Jadwal Pelajaran**

```text
== MENU JADWAL ==
       |
       v
 [Pilih Kelas]
       |
       v
 [Tambah Slot Jadwal]
       |
       v
 (subject, teacher, day_of_week, start_time, end_time, room)
       |
       v
 <Cek bentrok jadwal?>---Yes-->[Tampilkan konflik]-->[Ubah jam/guru]
       | No
       v
 [Simpan Jadwal] --> [Tampil daftar] --x
```

***

## 5) **Flow Guru: Absensi Harian**

```text
== DASHBOARD GURU ==
        |
        v
  [Kelas Hari Ini]
        |
        v
   [Absensi Kelas]
        |
        v
 (Date default: today)
        |
        v
[List siswa] -> [Set status P/S/I/A per siswa]
        |
        v
 [Submit Absensi]
        |
        v
 <Ada siswa belum terisi?>--Yes-->[Prompt lengkapi]-->[Lengkapi]
        | No
        v
 [Simpan] --> [Rekap hadir hari ini update] --x
```

***

## 6) **Flow Guru: Buat Penilaian & Input Nilai**

```text
== MENU PENILAIAN ==
        |
        v
   [Pilih Kelas]
        |
        v
 [Pilih Mapel]
        |
        v
[+ Tambah Penilaian]
        |
        v
 (title, type: UH/Tugas/PTS/PAS, date, weight, max_score)
        |
        v
 [Simpan Assessment]--><Valid?>--No-->[Error]-->[Perbaiki]-->[Simpan]
        | Yes
        v
 [Input Nilai per Siswa]
        |
        v
 (Masukkan score)
        |
        v
 [Simpan Nilai]
        |
        v
 [Hitung Rekap Otomatis (berat * skor)]
        |
        v
 [Tampil ringkasan nilai] --x
```

***

## 7) **Flow Admin: Generate Rapor (PDF)**

```text
== MENU RAPOR ==
       |
       v
 [Pilih Semester Aktif]
       |
       v
 [Pilih Kelas]
       |
       v
[Hitung Nilai Akhir per Siswa-Mapel]
       |
       v
 <Nilai lengkap?>---No-->[Tampilkan list incomplete]-->[Kembali ke nilai]
       | Yes
       v
 [Generate PDF per siswa]
       |
       v
[Unduh / Simpan / Kirim] --x
```

***

## 8) **Flow Admin: Master Biaya & Generate Tagihan SPP**

```text
== MENU KEUANGAN ==
        |
        v
 [Master Biaya]
        |
        v
[+ Tambah SPP] (amount, frequency=monthly)
        |
        v
 [Simpan] --> [Konfirmasi Generate Tagihan?]
        |
       <Yes>
        |
        v
 [Pilih Target: Semua siswa / Filter]
        |
        v
 [Generate Invoices]
        |
        v
 <Berhasil semua?>--No-->[Log gagal per siswa]-->[Review]
        | Yes
        v
 [Notifikasi tagihan (opsional)] --x
```

***

## 9) **Flow Pembayaran SPP**

```text
== KEUANGAN > PEMBAYARAN ==
         |
         v
 [Cari Siswa / Scan Invoice]
         |
         v
 [Pilih Invoice]
         |
         v
 [Input Pembayaran] (tanggal, amount, metode, ref)
         |
         v
 <amount <= sisa?>---No-->[Error: melebihi]-->[Ubah nilai]
         | Yes
         v
 [Simpan Pembayaran]
         |
         v
 [Update Status Invoice: partial/paid]
         |
         v
 [Cetak/Share Bukti (opsional)] --x
```

***

## 10) **Flow Pengumuman & Notifikasi**

```text
== MENU PENGUMUMAN ==
        |
        v
  [+ Buat Pengumuman]
        |
        v
 (title, content, audience: all/students/teachers/class:<id>)
        |
        v
 [Publish]
        |
        v
 [Buat Notifikasi per user target]
        |
        v
 <Kirim via channel?>--No-->[Simpan in-app saja]
        | Yes
        v
 [Kirim Email/WA/In-app]
        |
        v
 <Semua terkirim?>--No-->[Log failed]-->[Retry/abaikan]
        | Yes
        v
 [Selesai] --x
```

***

## 11) **Flow Siswa/Ortu: Lihat Jadwal, Nilai, Absensi, Tagihan**

```text
== DASHBOARD SISWA/ORTU ==
         |
         +--> [Jadwal Hari Ini] --x
         |
         +--> [Nilai] -> [List Mapel] -> [Detail per Mapel & Aktivitas] --x
         |
         +--> [Absensi] -> [Rekap Bulanan P/S/I/A] --x
         |
         +--> [Tagihan] -> [Daftar Invoice] -> [Detail & Status Pembayaran] --x
         |
         +--> [Pengumuman] -> [Detail] --x
```

***

## 12) **Flow Guru: Jadwal Mengajar & Akses Pintasan**

```text
== DASHBOARD GURU ==
       |
       v
 [Jadwal Hari Ini]
       |
       v
 [Pilih Sesi]
       |
       v
 <Aksi cepat?>--Absensi-->[Form Absensi]
             \--Nilai---->[Ke Penilaian kelas/mapel]
             \--Detail--->[Info kelas & siswa]
       |
       v
      --x
```

***

## 13) **Flow Admin: Manajemen User (Guru/Siswa/Ortu)**

```text
== MENU USERS ==
       |
       v
 [Filter: Role]
       |
       v
[+ Tambah User]
       |
       v
 (full_name, email/phone, role, password/temp)
       |
       v
 <Role student?>--Yes-->[Lengkapi profil siswa (NISN, dll)]
       | No
       v
 <Role teacher?>--Yes-->[Lengkapi profil guru (NIP, expertise)]
       | No
       v
 [Simpan User] --> [Kirim kredensial (opsional)] --x
```

***