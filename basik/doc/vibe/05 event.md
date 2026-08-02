Baik, Fajar ✨. Mari kita bahas **event handling di BASIK** dengan gaya cerita, supaya lebih mudah dipahami. Intinya: kamu cukup menulis fungsi tertentu (`update()`, `tekanMouse()`, `lepasMouse()`, dll), lalu BASIK akan otomatis memanggil fungsi itu setiap kali event terjadi. Jadi kamu tidak perlu repot membuat listener manual seperti di JavaScript murni.

---

### 🔄 Event `update()`
```js
mulai();
let roket = muatGambar("roket");

function update() {
    bersihkanLayar();
    roket.rotasi++;
    stempel(roket);
}
```
Cerita: setiap frame, BASIK memanggil `update()`. Seolah-olah ada jam berdetik, dan setiap detik roket berputar sedikit. Kamu tidak perlu memanggil `update()` sendiri — BASIK yang melakukannya.

---

### 🖱️ Event mouse
```js
mulai();
let roket = muatGambar("roket");

function tekanMouse() {
    roket.x = mouseX();
    roket.y = mouseY();
}
```
Cerita: saat kamu menekan mouse, BASIK otomatis memanggil `tekanMouse()`. Di dalamnya, kamu bisa menulis logika apa pun. Misalnya, roket langsung pindah ke posisi mouse. Jadi roket terasa seperti mengikuti klikmu.

---

### 🖐️ Event drag
```js
mulai();
let roket = muatGambar("roket");
roket.tipeDrag = 1;

function update() {
    bersihkanLayar();
    stempel(roket);
}
```
Cerita: dengan `tipeDrag = 1`, BASIK menambahkan kemampuan drag ke roket. Kamu tidak perlu menulis fungsi tambahan — cukup atur tipe drag, lalu BASIK otomatis menangani interaksi. Seolah-olah roket jadi mainan yang bisa digeser dengan jari atau mouse.

---

### 🎹 Event keyboard
```js
mulai();
let roket = muatGambar("roket");

function tekanKeyboard(kode) {
    if (kode === 37) roket.x -= 10; // panah kiri
    if (kode === 39) roket.x += 10; // panah kanan
}
```
Cerita: saat kamu menekan tombol di keyboard, BASIK memanggil `tekanKeyboard(kode)`. Kamu bisa memeriksa kode tombol, lalu menggerakkan roket sesuai arah panah. Jadi roket bisa dikendalikan layaknya game klasik.

---

### ✨ Inti Keuntungan Event Handling di BASIK
- **Sederhana** → cukup tulis fungsi, BASIK yang memanggil.  
- **Otomatis** → tidak perlu binding manual seperti `addEventListener`.  
- **Interaktif** → mudah membuat aplikasi/game yang merespons input.  
- **Konsisten** → semua event ditangani dengan pola yang sama.  

---

Dengan cara ini, BASIK membuat event handling terasa seperti **menulis cerita interaksi**: “Jika mouse ditekan, lakukan ini. Jika keyboard dipencet, lakukan itu. Jika update berjalan, putar roket.”  

Mau aku buatkan **contoh mini-game lengkap** (misalnya roket bisa dikendalikan dengan keyboard, lalu bisa di-drag dengan mouse) supaya terlihat bagaimana beberapa event bekerja bersama?