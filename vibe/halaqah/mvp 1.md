Pada hari pertama peluncuran (**Day-1 MVP**), fokus utama adalah **menggantikan pencatatan buku fisik/Excel harian** antara Guru dan Admin tanpa membebani pengguna dengan fitur yang rumit.

Berikut adalah rincian spesifikasi fungsional yang mutlak harus ada di hari pertama peluncuran:

### 1. Autentikasi & Pembatasan Akses (*Role-Based Access Control*)

* **Login Terpisah (Admin vs. Guru):** Sistem autentikasi sederhana menggunakan email/username dan password.
* **Isolasi Data Guru:** Guru hanya bisa melihat dan mengisi data santri yang berada di dalam kelompok halaqahnya sendiri, sedangkan Admin memiliki akses penuh ke seluruh kelompok.

### 2. Manajemen Data Master (Sisi Admin)

* **CRUD Data Guru (Muhaffiz/ah):** Input nama, nomor telepon/WhatsApp, dan akun login guru.
* **CRUD Data Santri:** Input nama lengkap, nomor induk/ID santri, kategori/kelas, dan nomor WhatsApp wali santri.
* **Manajemen Kelompok Halaqah (Mapping):** Fitur untuk membuat nama kelompok halaqah, menetapkan 1 guru penanggung jawab, dan memasukkan daftar santri ke dalam kelompok tersebut (termasuk fitur *mutasi/pindah kelompok* jika dibutuhkan).

* **Riwayat Setoran Terakhir:** Tampilan ringkas di layar input agar guru langsung tahu batas setoran terakhir santri tersebut tanpa harus membuka buku catatan.

### 4. Dasbor Monitoring & Rekapitulasi (Sisi Admin)

* **Ringkasan Operasional Hari Ini:** Menampilkan angka agregat harian (Total santri hadir vs. tidak hadir, total halaqah yang sudah melakukan input, dan daftar halaqah yang belum melaporkan setoran).
* **Log Setoran Masuk (*Live Feed* / Tabel Filter):** Tabel data seluruh setoran dan absensi yang bisa difilter berdasarkan tanggal, nama halaqah, atau nama santri.

---

### Fitur yang Sengaja Ditunda (Out of Scope di Hari Pertama)

Agar jadwal pengembangan tetap ramping dan aplikasi cepat digunakan:

* Sistem keuangan/SPP dan perhitungan gaji guru.
* Notifikasi otomatis via WhatsApp Gateway (cukup gunakan fitur *copy-paste* teks laporan harian ke WA untuk sementara).
* Portal login khusus wali santri dan pendaftaran santri baru (PPDB).
* Manajemen ujian/munaqosyah dan generator sertifikat PDF.

Apakah Anda ingin melanjutkan ke tahap perancangan **struktur tabel database (ERD)** berdasarkan fitur-fitur *core scope* di atas?