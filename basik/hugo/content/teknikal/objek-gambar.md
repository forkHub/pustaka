[Beranda]({{< ref "/" >}})

# 📝 Gambar sebagai object

BASIK memiliki object bawaan `Gambar`. Object ini dibuat dengan perintah `muatGambar()`.

Object `Gambar` memiliki property sebagai berikut:

* **x** (`number`): Posisi x
* **y** (`number`): Posisi y
* **alpha** (`number`): Transparansi (0 - 100)
* **pusatX** (`number`): Posisi pusat x
* **pusatY** (`number`): Posisi pusat y
* **panjang** (`number`): Panjang
* **lebar** (`number`): Lebar
* **rotasi** (`number`): Rotasi (0 - 360)
* **diDrag** (`boolean`): Apakah gambar sedang di-drag
* **diTekan** / **ditekan** (`boolean`): Apakah gambar sedang ditekan oleh mouse/jari
* **tipeDrag** (`number`): Tipe drag (1 = geser, 2 = rotasi, 3 = geser tanpa sentuh, 4 = rotasi tanpa sentuh)
* **dimuat** (`boolean`): Apakah gambar sudah selesai dimuat
* **frame** (`number`): Nomor frame aktif, bila gambar berupa animasi spritesheet
* **panjangFrame** (`number`): Panjang dari tiap frame dalam animasi, bila gambar berupa animasi spritesheet
* **lebarFrame** (`number`): Lebar dari tiap frame, bila gambar berupa animasi spritesheet
* **dragAwalX** (`number`): Posisi awal x saat gambar mulai di-drag
* **dragAwalY** (`number`): Posisi awal y saat gambar mulai di-drag