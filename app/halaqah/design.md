# Auth
tidak ada tombol sign up.  
tidak ada forget password.  
tamu bisa masuk tanpa login.  
admin harus login.  
bila admin lupa password maka perbaikan akan dilakukan di database.  

# Role
- admin
  admin sudah tersimpan di database secara default dengan password admin123.  
  admin harus login dengan password.  
  admin bisa mengubah password setelah login ke applikasi.  
  admin bisa mengubah database.  

- tamu
  tamu bisa masuk tanpa login
  tamu hanya bisa membaca.  

# Entity
- admin (master)
- guru (master)
- murid (master)
- tugas hafalan (transaction)
- kelas (master)  
semua entity memiliki soft delete field, true bila sudah dihapus.  
entity dengan soft delete true tidak ditampilkan di list.  

# ERD
kelas bisa memiliki banyak murid.  
satu murid bisa memiliki banyak tugas hafalan  
tugas hafalan memiliki referensi ke guru

# Entity detail
## guru
- id
- nama
- soft delete

## kelas
- id
- nama
- soft delete

## murid
- id
- nama
- nama wali
- kelas (refensi ke kelas) 
- soft delete

## tugas hafalan
- id
- tanggal (tanggal di tugaskan hafalan)
- tanggal update (tanggal update terakhir)
- murid (referensi ke murid yang ditugaskan)
- guru (referensi ke guru yang menangani hafalan)
- status (aktif, batal, selesai), default aktif
- type hafalan (hafalan, murojaah), default hafalan
- komentar (komentar)
- nama surat (nama surat yang harus dihafalkan)
- nomor surat awal (nomor surat awal untuk dihafalkan)
- nomor surat akhir (nomor surat akhir untuk dihafalkan)
- jatuh tempo (kapan tugas harus diselesaikan)
- jumlah surat (auto calc, nomor akhir - nomor awal + 1)
- soft delete

# UI
## login
halaman pertama applikasi.  
tidak ada signup/registrasi.  
tidak ada forget password.  
ada tombol login untuk login.  
ada tombol 'masuk sebagai tamu' untuk masuk sebagai tamu.  

## tambah tugas hafalan ke murid
menambakan tugas hafalan ke murid.  
hanya bisa diakses oleh admin.  
ada tombol untuk kembali ke halaman sebelumnya.  
data yang diisikan:
- nama surat
- nomor surat awal
- nomor surat akhir
- jatuh tempo
- guru (referensi guru yang memberikan tugas, pilih dalam bentuk dialog yang menampilkan daftar guru yang bisa dipilih).    

automatis diisi:
- status (diisi aktif)
- tanggal update (diisi hari ini)
- tanggal (diisi hari ini)
- murid (referensi ke murid yang dipilih terakhir dari halaman sebelumnya)
- jumlah surat

## beranda
halaman yang dimasuki tamu/admin setelah masuk tanpa login
berisi daftar tab:

- tab dashboard:  
  ada tampilan murid dengan jumlah hafalan terbanyak.  
  jumlah hafalan terbanyak dihitung dengan menjumlahkan total jumlah surat dari tiap tugas hafalan yang sudah selesai.

- tab kelas:  
  berisi list daftar kelas.  
  kelas yang di klik di list akan masuk ke halaman detail kelas.
  ada tombol tambah kelas buat admin.

- tab murid:  
  berisi list daftar murid.  
  murid yang di klik di list akan masuk ke halaman detail murid.  
  ada tombol tambah murid buat admin.

- tab guru:  
  berisi list daftar guru.  
  guru yang di klik di list akan masuk ke halaman detail guru.
  ada tombol tambah guru buat admin.

di bagian bawah ada form untuk admin agar admin bisa mengganti password.

## tambah murid
halaman untuk tambah data murid.  
hanya bisa diakses oleh admin.  
data yang diisikan: nama, nama wali.  
ada tombol simpan dan batal.  
bila disimpan atau batal akan kembali ke halaman sebelumnya.  
ada tombol untuk kembali ke halaman sebelumnya.  
setelah sukses menyimpan data maka akan ada tampilan dialog informasi bahwa entity sudah disimpan, dan bila di klik tombol ok akan kembali ke halaman sebelumnya.  

## detail murid 
halaman untuk detail untuk seorang murid.  
ada list untuk menampilkan daftar tugas hafalan, yang bisa di filter: status dan type.  
bila tugas hafalan di klik akan masuk ke halaman detail tugas hafalan.  
ada tombol untuk menambahkan tugas hafalan ke murid (masuk ke halaman tambah tugas hafalan murid), tombol hanya tampil untuk admin.  
ada tombol edit untuk admin untuk mengedit murid, masuk ke halaman edit murid, tombol hanya tampil untuk admin.  
ada tombol untuk kembali ke halaman sebelumnya.  

## edit murid
halaman untuk edit murid.  
hanya bisa diakses oleh admin.  
data yang di edit: nama, nama wali.  
ada tombol simpan dan batal.  
ada tombol hapus murid, bila ditekan akan muncul dialog konfirmasi, dan bila di confirm akan menonaktifkan murid (soft delete)
dan kembali ke halaman sebelumnya setelah tombol simpan atau batal di tekan.  
ada tombol untuk kembali ke halaman sebelumnya.  
setelah sukses menyimpan data maka akan ada tampilan dialog informasi bahwa entity sudah disimpan, dan bila di klik tombol ok akan kembali ke halaman sebelumnya.  

## tambah guru
hanya bisa diakses oleh admin.  
ada tombol untuk kembali ke halaman sebelumnya.  
data yang diisikan: nama  
ada tombol simpan dan batal.  
setelah sukses menyimpan data maka akan ada tampilan dialog informasi bahwa entity sudah disimpan, dan bila di klik tombol ok akan kembali ke halaman sebelumnya.  

## edit guru
hanya bisa diakses oleh admin.  
ada tombol untuk kembali ke halaman sebelumnya.  
yang diedit: nama.  
ada tombol simpan dan batal.    
ada tombol hapus, butuh konfirmasi pakai dialog, dan bila di konfirm akan menonatifkan guru (soft delete).
setelah sukses menyimpan data maka akan ada tampilan dialog informasi bahwa entity sudah disimpan, dan bila di klik tombol ok akan kembali ke halaman sebelumnya.  

## edit kelas
hanya bisa diakses oleh admin.  
yang diedit: nama  
ada tombol untuk kembali ke halaman sebelumnya.  
ada tombol hapus, ada konfirmasi dialog untuk menghapus, bila di konfirm maka akan soft delete, dan kembali ke halaman sebelumnya.  
tidak bisa menghapus kelas yang masih ada muridnya, akan muncul dialog peringatan, dan aksi akan ditolak.    
hapus bersifat soft delete dan butuh konfirmasi dialog.  
setelah sukses menyimpan data maka akan ada tampilan dialog informasi bahwa entity sudah disimpan, dan bila di klik tombol ok akan kembali ke halaman sebelumnya.  

## detail kelas
ada tombol edit kelas untuk admin, akan masuk ke halaman edit kelas.  
ada tombol untuk kembali ke halaman sebelumnya.  

## detail tugas hafalan
ada tombol untuk kembali ke halaman sebelumnya.  
informasi yang ditampilkan: 
- nama surat
- nomor surat awal
- nomor surat akhir
- guru (referensi ke guru yang memberikan tugas, tampilkan nama guru)
- murid (referensi ke murid yang diberikan tugas, tampilkan nama murid)
- type
- status
- tanggal (tampilan di label sebagai tanggal penugasan)
- jatuh tempo
- komentar
- ada tombol group yang berisi:
  - batal (update status ke batal, update tanggal update dan merefresh tampilan)
  - selesai (update status ke selesai, update tanggal update dan merefresh tampilan)
  tombol group hanya untuk admin, tamu tidak akan melihat tombol group ini.  
- ada form komentar untuk admin yang dilengkapi tombol simpan, bila selesai akan merefresh tampilan, dan mengupdate tanggal update.

