[Beranda]({{< ref "/" >}})

# 📖 fungsi Update

Fungsi update adalah fungsi bawaan dari BASIK untuk menangani apa yang terjadi saat applikasi di update. 
Perhatikan contoh berikut:

```Javascript
mulai();
let astro = muatGambar('astronot');
posisiGambar(astro, 400, 300);

function update() {
	bl();
	putarGambar(astro, 5);
	stempel(astro);
}

```

Jalankan aplikasi ini maka akan terlihat di layar gambar astronot yang berputar tanpa henti.

BASIK akan di update secara terus menerus, dan setiap kali update terjadi maka semua perintah yang ada di dalam fungsi `update()` akan terus dijalankan.

Bila fungsi `update()` tidak ada, maka otomatis tidak akan ada yang dijalankan.

Fungsi update() adalah fungsi yang sangat penting di dalam BASIK.

Berikut ini adalah contoh animasi yang lain.

```Javascript
mulai();
let astro = muatGambar('astronot');
posisiGambar(astro, 400, 300);

function update() {
	bl();
	geserGambar(astro, 5,0);
	if (astro.x > 800) {
		astro.x =0;
	}
	stempel(astro);
}

```

Jalankan applikasinya, maka akan terlihat gambar astronot yang bergerak ke kanan dan akan muncul kembali di sebelah kiri setelah astronot melewati batas layar.

