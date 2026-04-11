web applikasi e-commerce dengan multiple penjual.  
gunakan data dummy, dan database disimpan di local storage.  
upload foto bersifat dummy,  
gunakan gambar dummy dengan url https://forkhub.github.io/gbr/tas_thumb.png untuk thumbnail dan https://forkhub.github.io/gbr/tas.png untuk foto gambar.  
pengunjung bisa mengunjungi web tanpa login.  
aplikasi hanya berfungsi sebagai katalog, bukan marketplace penuh.

# role
- admin
- user (pemilik lapak)
- pengunjung

## admin
- admin bisa mengelola semua hal di applikasi (user, barang, foto)

## user (pemilik lapak)
- user harus di approve oleh admin sebelum bisa mengelola lapak
- satu user hanya bisa punya satu lapak
- satu lapak hanya bisa punya 10 barang
- maksimum user 100 user
- user bise mengubah setingan lapak:
  - nama lapak
  - background buat header (upload foto dumy)

## barang
- satu barang bisa memiliki referensi dua foto berupa thumbnail dan foto ukuran asli.
- barang bisa memiliki status draft dan publish
  - draft tidak akan muncul 
  - admin bisa melihat barang dengan status draft

## foto
- Satu barang hanya bisa punya satu foto untuk barang.
- user bisa mengupload foto (ada form walau masih dummy).
- barang punya referensi ke foto

## transaksi
- pengunjung membeli barang dengan memencet tombol beli yang akan terhubung ke whatsapp dan transaksi akan dilanjutkan oleh pemilik lapak dan pengunjung melalui whatsapp. 
