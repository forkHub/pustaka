# Copilot Instructions for IPL Project

## Goal
- Bantu penulisan kode yang mudah dipelihara, aman, dan konsisten untuk aplikasi manajemen IPL.
- Prioritaskan dependensi minimal, deployment di XAMPP/Windows, typescript murni.

## Aturan gaya (style rules)
- Gunakan komentar Bahasa Indonesia ketika menjelaskan perilaku domain di kode aplikasi.
- Gunakan style sederhana (PSR-12 untuk PHP, hindari sintaks yang kompleks/OOP berat kecuali perlu).
- Untuk UI, pakai HTML semantik dan utility CSS.

## Larangan (what to avoid)
- Jangan pakai toolchain Node-only (Webpack, Vite, Babel) kecuali diminta eksplisit.
- Jangan sarankan framework berat (Laravel, React, Angular) kecuali diminta.
- Hindari SQL tidak aman; gunakan prepared statement / parameter binding secara default.

## Saat menulis dokumentasi
- Utamakan heading pendek (H2-H4) dan daftar poin.
- Sisipkan bagian “Catatan” dan “Langkah-langkah” untuk fitur.

## Pertanyaan klarifikasi (klarifikasi)
- "Apakah ini ditujukan untuk satu fitur atau seluruh aplikasi?" seluruh aplikasi
- "Bolehkah saya asumsikan hosting lokal XAMPP dengan PHP 8.1?" ya

## Contoh prompt yang sesuai
- `Tolong buat controller PHP untuk halaman input IPL baru, dengan validasi server dan prepared statement.`
- `Buat tampilan daftar kontrak IPL dengan pagination statis 10 item per halaman.`
- `Tuliskan dokumentasi UI fitur input meteran dalam format markdown singkat.`
