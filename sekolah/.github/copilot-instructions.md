# Copilot Instructions: Aplikasi Manajemen Sekolah

## 🔎 Project overview
- multi-page-app style UI with TypeScript.
- No framework, just use vanilla typescript
- Data backend: Supabase (terlihat dari perencanaan, meskipun implementasi belum lengkap dalam repo ini).
- Target deployment di `htdocs` XAMPP (Windows), URL lokal biasanya `http://localhost/pustaka/sekolah`.
- Fokus MVP: user management, kelas/akademik, absensi, penilaian, finance/SPP, pengumuman.

## 📁 Repository structure
- `src/` - source folders:
  - `components/` - UI component fragments (forms/shared/tables)
  - `lib/` - helper utilities
  - `modules/` - domain slices (academic, auth, attendance, assessment, announcements, finance)
  - `pages/` - route-oriented pages per role (admin/guru/orang-tua/siswa)
  - `shared/` - shared domain features (announcements/profile)
- `docs/` - desain, flow, ERD, fitur
- `tsconfig.json` - TypeScript compiler settings (strict mode, ES2016 target, no module/op module comments)

## 🛠 Build & run
- No `package.json` in this workspace. asumsi minimal:
  - run TypeScript build manually: `npx tsc -p tsconfig.json`
  - Jika butuh bundling/serve, gunakan tooling dari lingkungan (PHP + `htdocs`).
- Jika sudah tersedia script di luar repo, gunakan sesuai dokumentasi tim.

## 🧩 Conventions
- Gunakan struktur role-based pages (`pages/admin/*`, `pages/guru/*`, `pages/siswa/*`, `pages/orang-tua/*`).
- Gunakan `modules/*` untuk domain logic dengan nama fitur sesuai (misal: `modules/attendance`, `modules/assessment`).
- Lakukan input validation di komponen form, tangani error Supabase (auth/session, network, constraint).
- Keep UI mobile-friendly dan responsif (MVP dijelaskan sebagai mobile-friendly di desain).

## 📚 References (link, don’t embed)
- `docs/sekolah-fitur.md` - fitur prioritas MVP
- `docs/design.md` - ringkasan arsitektur
- `docs/**/*` - ERD, flow, wireframe, proses admin

## ⚠️ Best practices for Copilot requests
- Jika perubahan file besar: minta ringkas code diff (patch) dari top-level request.
- Untuk fitur baru, minta peran & alur (admin/guru/siswa/orang-tua) dulu.
- Jika kode/mapping belum ada, gunakan fake stub baru dengan `TODO` dan komentar inline.

## 💡 Recommended next prompts
- "Buat halaman `pages/admin/school/academic` dengan tabel kelas + tombol `Tambah kelas` dan form modal." 
- "Tambahkan helper Supabase di `lib/supabase.ts` untuk sign-in, sign-out, dan `getSession()`." 
- "Debug: kenapa `pages/guru/attendance` tidak menampilkan data absensi (validasi filter tanggal)?"

## 📎 Suggested agent customization next
- `/create-instruction test-setup` - panduan setup test environment (Vitest/Jest) khusus repos ini.
- `/create-skill ui-components` - helper generation untuk form/CRUD tabel di pattern sekolahan (responsive minimal).
- `/create-prompt php-deploy` - script dan checklist deploy XAMPP + Supabase untuk lingkungan Windows.
