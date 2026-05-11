# Entity

**Warga**
- ID Warga (unik)
- Nama
- Alamat
- Nomor Kontak
- Status Aktif

**Iuran**
- ID Iuran (unik)
- Nama
- Deskripsi Iuran
- Jumlah Tagihan
- Tanggal Tagihan
- Tanggal jatuh tempo

**Role**
- ID (unique)
- nama

**Transaksi Iuran**
- ID 
- tanggal
- ID iuran
- ID warga

Warga bisa punya banyak Iuran
Warga bisa punya banyak role
Iuran bisa di enroll ke banyak warga
