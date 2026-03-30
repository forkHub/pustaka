
***



***



***





n
***


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