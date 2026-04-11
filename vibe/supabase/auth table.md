**Supabase menyimpan data autentikasi (auth) di dalam database PostgreSQL yang menjadi inti setiap proyek Supabase. Informasi pengguna seperti email, hashed password, metadata, serta token dikelola melalui tabel sistem khusus bernama `auth.users`.**  

---

## 📌 Detail Penyimpanan Auth di Supabase
- **Database inti:** Semua proyek Supabase menggunakan **PostgreSQL** sebagai backend utama.
- **Tabel auth:**  
  - Data pengguna disimpan di tabel **`auth.users`**.  
  - Kolom penting mencakup: `id` (UUID unik), `email`, `encrypted_password`, `created_at`, `last_sign_in_at`, dan `raw_app_meta_data`.
- **Token autentikasi:**  
  - Supabase menggunakan **JSON Web Tokens (JWTs)** untuk autentikasi.  
  - JWT berisi klaim tentang identitas pengguna dan hak akses, yang diverifikasi menggunakan kunci rahasia proyek.
- **Integrasi dengan RLS (Row Level Security):**  
  - Supabase Auth terhubung langsung dengan fitur **Row Level Security** di PostgreSQL.  
  - Hal ini memungkinkan developer mengatur aturan akses berdasarkan identitas pengguna yang login.
- **Metode login yang didukung:**  
  - Email/password  
  - Magic link  
  - OTP (One-Time Password)  
  - Social login (Google, GitHub, Facebook, dll.)  
  - Single Sign-On (SSO)  [Supabase](https://supabase.com/docs/guides/auth)  

---

## 🔒 Keamanan Data Auth
- **Password hashing:** Supabase menggunakan algoritma hashing modern (misalnya bcrypt) untuk menyimpan password dengan aman.  
- **Metadata pengguna:** Informasi tambahan (misalnya role, preferensi) disimpan di kolom metadata, bisa diakses oleh aplikasi sesuai kebutuhan.  
- **Isolasi proyek:** Setiap proyek Supabase memiliki database auth sendiri, sehingga data antar proyek tidak bercampur.  [redskydigital.com](https://redskydigital.com/us/secure-authentication-and-storage-solutions-with-supabase/)  

---

## ⚙️ Praktis untuk Developer
- **Akses via API/SDK:** Developer dapat mengelola user (signup, login, reset password) melalui **Supabase client SDK** atau REST API.  
- **Sinkronisasi dengan tabel custom:** Data dari `auth.users` bisa dihubungkan dengan tabel lain di database untuk menyimpan profil tambahan (misalnya nama lengkap, foto, preferensi).  [DEV Community](https://dev.to/kaleb110/supabase-setting-up-auth-and-database-4606)  

---

## 📊 Ringkasan
| Komponen              | Lokasi Penyimpanan | Fungsi Utama |
|-----------------------|--------------------|--------------|
| Email & Password      | `auth.users` table | Identitas dasar pengguna |
| Metadata              | `raw_app_meta_data` & `raw_user_meta_data` | Informasi tambahan pengguna |
| Token (JWT)           | Server-side, dikirim ke client | Autentikasi & otorisasi |
| Aturan akses          | PostgreSQL RLS     | Membatasi data sesuai user |

---

👉 Jadi, **data auth di Supabase tersimpan di tabel sistem `auth.users` dalam PostgreSQL**, dengan keamanan berbasis hashing dan token JWT. Developer bisa memperluasnya dengan tabel profil tambahan sesuai kebutuhan aplikasi.  

Apakah kamu ingin saya tunjukkan **contoh struktur tabel `auth.users`** supaya lebih jelas bagaimana data disimpan?