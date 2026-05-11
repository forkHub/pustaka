### 📱 **Wireframe Dashboard Admin**

```
+----------------------------------+
|  [☰]   Dashboard Admin   [🔔]    |
+----------------------------------+
|  Hello, Admin [Nama]!            |
|  Today: Thu, 27 Mar 2026         |
+----------------------------------+

| [📊 Ringkasan Sekolah]           |
|  Siswa Aktif: 500                |
|  Guru Aktif: 30                  |
|  Total Kelas: 20                 |
|  Tahun Ajaran: 2025/2026         |
+----------------------------------+

| [💸 Tagihan SPP Outstanding]     |
|  Total Tunggakan: Rp 15.000.000  |
|  Siswa Belum Bayar: 50           |
|  [Kelola Tagihan]                |
+----------------------------------+

| [📣 Pengumuman Terbaru]          |
|  - Ujian PTS dimulai 1 Apr 2026  |
|  - Pembayaran SPP jatuh tempo... |
|  [Kelola Pengumuman]             |
+----------------------------------+

| [🚀 Navigasi Cepat]              |
| [👥 Users] [🏫 Kelas] [📚 Akademik] |
| [⭐ Penilaian] [💰 Keuangan]     |
+----------------------------------+
```

### 🧩 **Deskripsi Komponen dan Alur**

1. **Header (Navigasi Atas)**:
   - Hamburger menu (☰): Membuka sidebar dengan menu utama admin (Dashboard, Manajemen Sekolah, Akademik, Penilaian, Keuangan, dll.).
   - Judul: "Dashboard Admin" untuk konteks role.
   - Bell icon (🔔): Notifikasi (pengumuman baru, alert tagihan, dll.). Klik untuk melihat list notifikasi.

2. **Greeting dan Tanggal**:
   - Pesan sambutan: "Hello, Admin [Nama]!" (ambil dari session Supabase).
   - Tanggal hari ini: Dinamis, gunakan `new Date().toLocaleDateString()` di kode.

3. **Card Ringkasan Sekolah**:
   - Data statis/real-time: Jumlah siswa, guru, kelas, dan tahun ajaran aktif.
   - Sumber data: Query Supabase untuk tabel `users`, `classes`, `school_settings`.
   - Interaksi: Klik card untuk navigasi ke halaman detail (e.g., Manajemen Sekolah).

5. **Card Tagihan SPP Outstanding**:
   - Total tunggakan: Sum dari tabel `invoices` dengan status "unpaid".
   - Jumlah siswa terpengaruh.
   - Tombol: "Kelola Tagihan" → Navigasi ke pages/admin/finance.

6. **Card Pengumuman Terbaru**:
   - List 2-3 pengumuman terbaru dari tabel `announcements`.
   - Tombol: "Kelola Pengumuman" → Navigasi ke pages/admin/announcements.

7. **Navigasi Cepat (Shortcut)**:
   - Button grid untuk akses cepat ke halaman utama admin.
   - Icon dan label: Users (👥), Kelas (🏫), Akademik (📚), Penilaian (⭐), Keuangan (💰).
   - Klik untuk routing ke halaman terkait (e.g., pages/admin/users).