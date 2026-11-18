# Applikasi halaqoh

## Modul admin
Dari sisi **Admin**, hampir seluruh aktivitas pencatatan manual, rekapitulasi, dan koordinasi dapat diotomatisasi melalui **Sistem Informasi Manajemen (SIM) Tahfidz** berbasis web. Aplikasi ini akan menggantikan tumpukan buku catatan atau file Excel yang terpisah menjadi satu dasbor terpusat.

Berikut adalah rincian modul dan fitur yang bisa dibuatkan ke dalam bentuk *web app* untuk mempermudah kerja admin:

---

### 1. Modul Administrasi Reguler (Operasional Harian & Bulanan)

* **Dasbor Monitoring Real-Time:**
* Menampilkan ringkasan hari ini: berapa total santri yang hadir, siapa saja yang absen, dan berapa total halaman yang disetorkan di seluruh halaqah secara *real-time* (data ditarik langsung dari inputan guru).


* **Manajemen Data Master & Penempatan Halaqah:**
* Database terpusat untuk profil santri, data guru, dan pembagian kelompok halaqah. Admin bisa dengan mudah memindahkan santri antar-halaqah (mutasi kelas) jika level hafalannya meningkat.


* **Sistem Keuangan & SPP (Billing Otomatis):**
* Pencatatan pembayaran SPP/infaq bulanan santri lengkap dengan status (*Lunas/Belum Lunas*).
* **Generator Tagihan & Kwitansi Otomatis:** Sekali klik, sistem bisa mengirim pesan pengingat tagihan atau bukti pembayaran digital (PDF) langsung ke WhatsApp wali santri.
* **Perhitungan Honorarium Guru:** Menghitung gaji/insentif guru secara otomatis berdasarkan jumlah kehadiran mengajar atau jumlah setoran santri yang dibimbing.


* **Generator Rapor & Laporan Wali Santri:**
* Admin tidak perlu mengetik ulang rapor bulanan. Sistem akan mengolah data setoran harian dari guru menjadi grafik perkembangan hafalan dan rapor PDF siap cetak/kirim.



---

### 2. Modul Administrasi Non-Reguler (Event & Tahunan)

* **Portal PPDB (Penerimaan Santri Baru) Online:**
* Formulir pendaftaran mandiri bagi calon wali santri, unggah dokumen, hingga pemilihan jadwal tes bacaan (*placement test*). Admin tinggal memantau pendaftar masuk dan melakukan verifikasi.


* **Manajemen Ujian / Munaqosyah & Tasmi':**
* Sistem pengajuan ujian: guru/santri mengajukan diri jika sudah siap ujian juz, lalu admin mengatur jadwal, menentukan penguji, dan menerbitkan jadwal ujian secara otomatis.
* **Generator Sertifikat / Syahadah Otomatis:** Setelah nilai ujian diinput, web app langsung membuatkan draf sertifikat kelulusan juz lengkap dengan nomor seri dan QR Code validasi.


* **Sistem Inventaris & Manajemen Fasilitas:**
* Pencatatan peminjaman ruangan, stok mushaf, meja belajar, serta jadwal penggunaan aula untuk acara besar (seperti Mabit atau Wisuda).



---

### 3. Fitur Tambahan untuk Efisiensi Tinggi (Integrasi)

* **Integrasi WhatsApp Gateway:** Notifikasi otomatis ke orang tua saat anak tidak hadir halaqah, saat anak berhasil menyelesaikan 1 juz, atau saat pengumuman libur/kegiatan insidental.
* **Sistem Multi-Role (Hak Akses Bertingkat):**
* **Super Admin:** Akses penuh ke keuangan, data master, dan laporan lembaga.
* **Admin Akademik:** Fokus pada jadwal ujian, rapor, dan pembagian halaqah.
* **Guru:** Hanya bisa mengakses halaman input setoran dan absensi kelompoknya sendiri (terhubung langsung ke dasbor admin).

---

Apakah Anda berencana membangun web app ini untuk lembaga tahfidz tertentu? Jika ya, kita bisa langsung membuatkan **prototipe interaktifnya (MVP)** di sini—misalnya fokus pada *Dasbor Monitoring Admin* atau *Sistem Input & Rapor Santri* terlebih dahulu.


## DAY 1 MVP

Pada hari pertama peluncuran (**Day-1 MVP**), fokus utama adalah **menggantikan pencatatan buku fisik/Excel harian** antara Guru dan Admin tanpa membebani pengguna dengan fitur yang rumit.

Berikut adalah rincian spesifikasi fungsional yang mutlak harus ada di hari pertama peluncuran:

### 1. Autentikasi & Pembatasan Akses (*Role-Based Access Control*)

* **Login Terpisah (Admin vs. Guru):** Sistem autentikasi sederhana menggunakan email/username dan password.
* **Isolasi Data Guru:** Guru hanya bisa melihat dan mengisi data santri yang berada di dalam kelompok halaqahnya sendiri, sedangkan Admin memiliki akses penuh ke seluruh kelompok.

### 2. Manajemen Data Master (Sisi Admin)

* **CRUD Data Guru (Muhaffiz/ah):** Input nama, nomor telepon/WhatsApp, dan akun login guru.
* **CRUD Data Santri:** Input nama lengkap, nomor induk/ID santri, kategori/kelas, dan nomor WhatsApp wali santri.
* **Manajemen Kelompok Halaqah (Mapping):** Fitur untuk membuat nama kelompok halaqah, menetapkan 1 guru penanggung jawab, dan memasukkan daftar santri ke dalam kelompok tersebut (termasuk fitur *mutasi/pindah kelompok* jika dibutuhkan).

### 3. Pencatatan Harian Halaqah (Sisi Guru - *Mobile-First UI*)

* **Absensi Harian Santri:** Daftar santri dalam satu halaqah dengan opsi status cepat (*Hadir, Izin, Sakit, Alpha*) beserta kolom catatan singkat (opsional).
* **Input Setoran Hafalan (*Ziyadah* & *Muraja'ah*):** Form input cepat dengan parameter:
* Jenis setoran (*Ziyadah* / *Muraja'ah*).
* Rentang hafalan: Pilihan **Juz**, **Surah**, serta **Ayat Awal – Ayat Akhir** (atau nomor halaman mushaf).
* Predikat/Nilai kelancaran & tajwid (misalnya: *Mumtaz / Jayyid Jiddan / Jayyid / Mengulang*).
* Kolom catatan perbaikan bacaan dari guru.


* **Riwayat Setoran Terakhir:** Tampilan ringkas di layar input agar guru langsung tahu batas setoran terakhir santri tersebut tanpa harus membuka buku catatan.

### 4. Dasbor Monitoring & Rekapitulasi (Sisi Admin)

* **Ringkasan Operasional Hari Ini:** Menampilkan angka agregat harian (Total santri hadir vs. tidak hadir, total halaqah yang sudah melakukan input, dan daftar halaqah yang belum melaporkan setoran).
* **Log Setoran Masuk (*Live Feed* / Tabel Filter):** Tabel data seluruh setoran dan absensi yang bisa difilter berdasarkan tanggal, nama halaqah, atau nama santri.
* **Ekspor Data Dasar (CSV/Excel):** Tombol unduh rekap harian/bulanan sederhana sebagai cadangan data (*backup*) fisik atau bahan laporan cepat ke pimpinan lembaga.

---

### Fitur yang Sengaja Ditunda (Out of Scope di Hari Pertama)

Agar jadwal pengembangan tetap ramping dan aplikasi cepat digunakan:

* Sistem keuangan/SPP dan perhitungan gaji guru.
* Notifikasi otomatis via WhatsApp Gateway (cukup gunakan fitur *copy-paste* teks laporan harian ke WA untuk sementara).
* Portal login khusus wali santri dan pendaftaran santri baru (PPDB).
* Manajemen ujian/munaqosyah dan generator sertifikat PDF.

Apakah Anda ingin melanjutkan ke tahap perancangan **struktur tabel database (ERD)** berdasarkan fitur-fitur *core scope* di atas?