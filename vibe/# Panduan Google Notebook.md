# Panduan Google Notebook

### 1. Sumber Konten Ilmiah (Untuk Akurasi Fakta)

Ini adalah bahan baku pengetahuan sainsnya. Jangan gunakan jurnal akademik yang terlalu rumit karena bahasanya akan sulit dicerna bahkan oleh AI saat mencoba menyederhanakannya.

* **Buku Teks / Modul Kurikulum SMP:** PDF buku IPA SMP (misalnya buku Kemendikbud atau kurikulum Cambridge Lower Secondary) sebagai patokan ruang lingkup materi agar sesuai dengan tingkat pemahaman mereka.
* **Ensiklopedia Sains Populer:** PDF atau artikel dari sumber terpercaya seperti *National Geographic Kids*, *DK (Dorling Kindersley) Science Encyclopedia*, atau *HowStuffWorks*.
* **Artikel Sains Terkini:** Tautan (URL) dari situs sains populer seperti *Science News Explores* (khusus remaja), *Kompas Sains*, atau *National Geographic Indonesia*.

### 2. Sumber "Gaya Bahasa & Penceritaan" (Agar Enak Dibaca & Tidak Membosankan)

AI cenderung menulis dengan gaya kaku seperti buku pelajaran jika tidak diberi contoh gaya bahasa yang baik. Masukkan sumber yang bisa ditiru gaya penyampaiannya:

* **Transkrip Video YouTube Edukasi Populer:** Salin tautan (URL) video YouTube yang sukses menjelaskan sains secara seru untuk remaja, seperti **Kok Bisa?**, **Kurzgesagt – In a Nutshell**, **Veritasium**, atau **Mark Rober**. *(NotebookLM bisa membaca transkrip YouTube secara otomatis).*
* **Contoh Buku Sains Populer/Fiksi Ilmiah Ringan:** Bab sampel (PDF/teks) dari buku seperti seri *Horrible Science* (sains yang dikemas dengan humor), *What If?* karya Randall Munroe, atau komik sains seperti *Why?* / *Kuark*.
* **Dokumen Panduan Gaya (*Style Guide*):** Buat satu file Google Docs berisi instruksi gaya penulisan Anda sendiri. Contoh isinya:
> *"Gunakan sapaan 'kamu'. Jelaskan konsep abstrak menggunakan analogi benda sehari-hari (misal: sel itu seperti pabrik, listrik itu seperti aliran air). Hindari paragraf lebih dari 4 baris. Sisipkan fakta unik (fun fact) di setiap sub-bab."*



### 3. Sumber Struktur & Kerangka Buku (Agar Tidak Membingungkan)

Anak SMP mudah bingung jika alur penjelasan melompat-lompat. Anda butuh sumber yang mengatur alur berpikir:

* **Daftar Isi / Silabus:** Dokumen teks yang berisi daftar topik yang ingin Anda bahas, diurutkan dari konsep paling dasar ke yang lebih kompleks.
* **Template Struktur Bab:** Buat dokumen berisi pola tetap untuk setiap bab. Misalnya:
1. *Hook* (Pertanyaan aneh atau cerita sehari-hari yang memancing rasa penasaran).
2. *Penjelasan Inti* (Konsep sainsnya dengan bahasa sederhana).
3. *Analogi* (Perumpamaan agar mudah dibayangkan).
4. *Eksperimen Mini / Coba di Rumah* (Praktik sederhana tanpa alat mahal).
5. *Mitos vs Fakta* (Meluruskan kesalahpahaman umum).



### 4. Sumber Pemicu Rasa Penasaran (Untuk Interaktivitas)

Anak SMP menyukai hal-hal yang relevan dengan hidup mereka, teknologi, atau fenomena aneh.

* **Kumpulan Pertanyaan "Kenapa/Bagaimana":** Kumpulkan pertanyaan-pertanyaan khas remaja (misalnya: *"Kenapa layar HP bisa mendeteksi sentuhan jari tapi tidak merespons ujung pensil?"*, *"Kenapa suara kita terdengar aneh di rekaman?"*). Masukkan daftar ini sebagai sumber teks agar AI selalu mengaitkan teori sains dengan fenomena nyata.

---

### Tips Praktis Mengolahnya di NotebookLM:

1. **Pisahkan Notebook per Tema Besar (Jika Bukunya Tebal):**
Jika buku membahas banyak cabang sains (Fisika, Biologi, Astronomi), buatlah 1 Notebook khusus untuk menyusun kerangka utama, dan Notebook terpisah untuk masing-masing bab/tema agar sumber tidak tercampur aduk.
2. **Gunakan Fitur *Audio Overview* untuk Menguji "Enak Dibaca":**
Setelah memasukkan sumber dan meminta NotebookLM membuat draf bab, masukkan draf tersebut kembali sebagai sumber, lalu klik **Audio Overview** (fitur diskusi podcast dua host AI). Dengarkan hasilnya—jika pembahasannya terdengar seru, mengalir, dan mudah dipahami saat didengarkan, berarti tulisan tersebut sudah cukup ramah untuk anak SMP.
3. **Contoh Prompt untuk Menyusun Bab:**
> *"Berdasarkan [Nama Sumber Konten Ilmiah], tuliskan draf Bab 1 tentang [Topik]. Ikuti struktur bab dari dokumen [Template Struktur] dan terapkan gaya bahasa yang santai, penuh analogi, serta tidak menggurui seperti pada [Dokumen Style Guide] dan transkrip video [Kok Bisa?]."*

Untuk mengisi placeholder tersebut, Anda cukup mencocokkannya dengan **nama *display name* (label) sumber** yang sudah Anda unggah ke dalam NotebookLM, atau langsung merujuk pada topik spesifik yang ada di dalam *source* tersebut.

Berikut adalah panduan praktis dan contoh pengisiannya agar AI di NotebookLM tidak bingung:

---

### Cara Mengisi Masing-Masing Placeholder:

1. **`[Nama Sumber Konten Ilmiah]`**
* **Isi dengan:** Judul dokumen, buku, atau artikel sains yang menjadi sumber materi utama Anda di notebook.
* *Contoh:* `Buku_IPA_Kelas_7_Kemendikbud.pdf` atau `Artikel_Science_News_Ecosystem.txt`.


2. **`[Topik]`**
* **Isi dengan:** Sub-bab atau materi spesifik yang ingin ditulis pada sesi tersebut.
* *Contoh:* `Sistem Pencernaan Manusia: Kenapa Makanan Bisa Hancur Sendiri?`


3. **`[Template Struktur]`**
* **Isi dengan:** Nama file dokumen teks/panduan struktur bab yang sudah Anda buat di notebook.
* *Contoh:* `Template_Struktur_Bab_Standar.docx` atau `Panduan_Pola_Penulisan.txt`.


4. **`[Dokumen Style Guide]`**
* **Isi dengan:** Nama file catatan gaya bahasa atau *style guide* Anda.
* *Contoh:* `Catatan_Gaya_Bahasa_Remaja.txt`.


5. **`[Kok Bisa?]`**
* **Isi dengan:** Judul atau tautan sumber transkrip video YouTube yang sudah Anda masukkan sebagai referensi gaya penceritaan.
* *Contoh:* `Transkrip_YouTube_Kok_Bisa_Tentang_Otak.txt` atau langsung sebutkan sumber videonya jika sudah di-upload.

---

### Contoh Penerapan Nyata (Prompt Siap Pakai):

Misalkan Anda sudah mengunggah file-file tersebut ke NotebookLM, prompt akhirnya akan tampak seperti ini:

> *"Berdasarkan **Buku_IPA_Kelas_8_Bab_Listrik.pdf**, tuliskan draf Bab 1 tentang **Listrik Statis dan Kenapa Rambut Bisa Berdiri Sendiri**. Ikuti struktur bab dari dokumen **Template_Struktur_Bab_Standar.txt** dan terapkan gaya bahasa yang santai, penuh analogi, serta tidak menggurui seperti pada **Panduan_Gaya_Bahasa.txt** dan transkrip video **Kok_Bisa_Listrik_Statis.txt**."*

---

### 💡 Tips Ekstra di NotebookLM:

Jika Anda ingin NotebookLM **hanya** mengambil data dari file-file tertentu saja dan mengabaikan file lain yang tidak relevan, Anda bisa menggunakan fitur filter sumber saat mengetik *chat*, atau cukup sebutkan nama file secara spesifik di dalam prompt agar AI langsung melakukan *retrieval* secara akurat dari file tersebut.