��LAMPIRAN: Daftar Perintah BASIK
Perintah Umum
buatKanvas(panjang, lebar, kanvas, mode)
Mulai aplikasi. Anda harus memanggil perintah ini sebelum perintah lain.

Parameter:
Nama

Tipe

Default

Deskripsi

panjang

angka

320

Panjang kanvas yang diinginkan. nilai 0 akan diabaikan

lebar

angka

240

Lebar kanvas yang diinginkan. Nilai 0 akan diabaikan

kanvas

HTMLCanvasElement

null

(opsional) elemen kanvas.
Jika kanvas tidak tersedia, kanvas baru akan dibuat dan ukurannya mengikuti ukuran yang diinginkan

mode

boolean

1

(default true) Gunakan mode layar penuh. Pada mode layar penuh, kanvas akan otomatis memenuhi layar dan menjaga rasio aspek.

kanvas() → { HTMLCanvasElement }
Mengembalikan referensi ke kanvas yang sedang aktif

setKanvas(c)
Set kanvas aktif.

Parameter:
Nama

Tipe

Deskripsi

c

HTMLCanvasElement

kanvas aktif yang baru

bersihkanLayar(x, y, x2, y2)
Membersihkan kanvas

Parameter:
Nama

Tipe

Default

Deskripsi

x

number

0

(opsional) posisi x pertama

y

number

0

(opsional) posisi y pertama

x2

number

lebar-kanvas

(opsional) posisi x kedua

y2

number

tinggi kanvas

(opsional) posisi y kedua

Perintah Gambar
semuaGambarSelesaiDimuat() → {boolean}
Cek apakah semua gambar sudah dimuat

buatGambar(panjang, lebar) → {Gambar}
Membuat gambar kosong

Parameter:
Nama

Tipe

Deskripsi

panjang

number

lebar

lebar

number

tinggi

stempel(gbr)
Menggambar gambar ke layar

Parameter:
Nama

Tipe

Deskripsi

gbr

Gambar

Gambar yang akan di stempel ke layar

hapusGambar(gbr)
Hapus gambar dan semua sumber daya yang digunakan

Parameter:
Nama

Tipe

Deskripsi

gbr

Gambar

gambar yang akan dihapus

gambarTabrakan(gbr1, gbr2) → {boolean}
Cek apakah dua gambar bertabrakan. Menggunakan box untuk deteksi tabrakan. Memperhitungkan rotasi juga.

Parameter:
Nama

Tipe

Deskripsi

gbr1

Image

gambar pertama

gbr2

Image

gambar kedua

poinDidalamGambar(gbr, x, y) → {boolean}
Cek apakah gambar bertabrakan dengan titik tertentu

Parameter:
Nama

Tipe

Deskripsi

gbr

Gambar

gambar

x

number

posisi x yang diuji

y

number

posisi y yang diuji

muatGambar(namaFile) → {Gambar}
Muat gambar dari nama file

Parameter:
Nama

Tipe

Deskripsi

namaFile

string

Nama file gambar yang akan dimuat

Keyboard
tombolDitahan(tombol) → {boolean}
Cek apakah sebuah tombol sedang ditekan

Parameter:
Nama

Tipe

Deskripsi

tombol

string

tombol yang dicek

tombolEvent() → {string}
Mengembalikan tombol terakhir pada event tombol

Mouse
mouseDragAwalX() → {number}
posisi x awal drag

mouseDragAwalY() → {number}
posisi y awal drag

mouseDragX() → {number}
panjang drag horizontal dihitung dari posisi awal drag

mouseDragY() → {number}
panjang drag vertikal dihitung dari posisi awal drag

mouseDitahan() → {boolean}
status mouse ditekan

mouseDidrag() → {boolean}
mouse sedang didrag

mouseGerakX() → {number}
mengembalikan pergerakan mouse horizontal terakhir

mouseGerakY() → {number}
mengembalikan pergerakan mouse vertikal terakhir

MouseX() → {number}
posisi x mouse

MouseY() → {number}
posisi y mouse

Event
Fungsi ini akan dieksekusi otomatis ketika tersedia dan event tertentu terjadi

Nama

Deskripsi

keyboardDitekan

Pengguna mulai menekan keyboard

keyboardDilepas

Keyboard dilepas

mouseDitekan

Pengguna mulai menekan tombol mouse

mouseDilepas

Tombol mouse dilepas

mouseMulaiDrag

Drag dimulai

mouseSelesaiDrag

Drag selesai

mouseGerak

Mouse bergerak

mouseKlik

Klik

update

Update aplikasi

suaraSelesai

Suara selesai dimainkan

Objek
Gambar
Properti:

Nama

Tipe

Deskripsi

x

number

posisi x

y

number

posisi y

rotasi

number

rotasi dalam derajat

alpha

number

alpha (0 - 100)

panjang

number

lebar yang diinginkan

lebar

number

tinggi yang diinginkan

pusatX

number

posisi handle x

pusatY

number

posisi handle y

ubin

boolean

gambar dirender sebagai ubin

didrag

boolean

gambar sedang didrag

ditekan

boolean

gambar ditekan

dimuat

boolean

gambar sudah selesai dimuat
