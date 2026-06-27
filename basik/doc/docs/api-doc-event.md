# Event

Basik memiliki cara untuk menghandle event yang disederhanakan.  
Ketika sebuah event terjadi, maka Basik akan mencari deklarasi fungsi yang berhubungan dengan event tersebut, dan memanggilnya.

Contoh: 
Ketika terjadi event mouse ditekan, maka Basik akan mencari deklarasi fungsi mouseDitekan. Bila tersedia, maka fungsi ini akan dipanggil secara otomatis.

```
mulai();

function mouseDitekan() {
	stempel("roket", mouseX(), mouseY());
}
```

Bila contoh diatas dijalankan, ketika user menekan tombol mouse maka gambar roket akan di gambar pada posisi dimana mouse berada.

Berikut adalah daftar fungsi yang akan dipanggil secara otomatis dan event yang berkaitan dengan fungsi tersebut

- mouseDitekan: ketika mouse mulai ditekan
- mouseDilepas: ketika mouse mulai dilepaskan
- mouseGerak: ketika mouse digerakkan
- mouseDitap: ketika mouse di tap
- mouseMulaiDrag: ketika mouse mulai di drag
- mouseSelesaiDrag: ketika mouse selesai di drag
- keyboardDitekan: ketika keyboard di tekan
- keyboardDilepas: ketika keyboard di lepas
- update: ketika aplikasi di update

Data yang berhubungan dengan event dipanggil melalui fungsi terpisah. Contohnya: mouseX() yang menghasilkan posisi x dari mouse, dsb.
